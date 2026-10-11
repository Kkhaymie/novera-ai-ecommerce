import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DEFAULT_N8N_WEBHOOK_URL = 'https://geephixs.app.n8n.cloud/webhook/Novera_AI';

// Simple in-memory rate limiting per IP for abuse prevention
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 25;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  record.count += 1;
  return true;
}

interface ExtractedChatResult {
  reply: string;
  products: Array<{
    id?: string;
    name: string;
    brand?: string;
    price?: number | string;
    currency?: string;
    category?: string;
    description?: string;
    imageUrl?: string;
  }>;
}

/**
 * Normalizes varied n8n multi-agent webhook responses (including `[{"output": "..."}]`)
 * into safe, human-readable reply text and optional structured product cards.
 */
function normalizeN8nPayload(payload: unknown): ExtractedChatResult {
  const products: ExtractedChatResult['products'] = [];

  const extractProductIfValid = (item: Record<string, unknown>) => {
    const name =
      (typeof item.name === 'string' && item.name) ||
      (typeof item.product_name === 'string' && item.product_name) ||
      (typeof item.title === 'string' && item.title) ||
      (typeof item.Product === 'string' && item.Product);

    if (name) {
      products.push({
        id:
          typeof item.id === 'string'
            ? item.id
            : typeof item.product_id === 'string'
              ? item.product_id
              : undefined,
        name: name.trim(),
        brand:
          typeof item.brand === 'string'
            ? item.brand
            : typeof item.Brand === 'string'
              ? item.Brand
              : undefined,
        price:
          typeof item.price === 'number' || typeof item.price === 'string'
            ? item.price
            : typeof item.price_ngn === 'string'
              ? item.price_ngn
              : typeof item.Price === 'number' || typeof item.Price === 'string'
                ? item.Price
                : undefined,
        currency:
          typeof item.currency === 'string'
            ? item.currency
            : typeof item.Currency === 'string'
              ? item.Currency
              : undefined,
        category:
          typeof item.category === 'string'
            ? item.category
            : typeof item.Category === 'string'
              ? item.Category
              : undefined,
        description:
          typeof item.description === 'string'
            ? item.description
            : typeof item.Description === 'string'
              ? item.Description
              : undefined,
        imageUrl:
          typeof item.imageUrl === 'string'
            ? item.imageUrl
            : typeof item.image === 'string'
              ? item.image
              : undefined,
      });
    }
  };

  const extractTextFromObject = (obj: Record<string, unknown>): string | null => {
    const candidateKeys = [
      'output',
      'reply',
      'response',
      'message',
      'text',
      'answer',
      'content',
      'result',
      'chatResponse',
    ];

    if (Array.isArray(obj.products)) {
      for (const p of obj.products) {
        if (p && typeof p === 'object') {
          extractProductIfValid(p as Record<string, unknown>);
        }
      }
    }
    if (Array.isArray(obj.recommendations)) {
      for (const p of obj.recommendations) {
        if (p && typeof p === 'object') {
          extractProductIfValid(p as Record<string, unknown>);
        }
      }
    }

    for (const key of candidateKeys) {
      const val = obj[key];
      if (typeof val === 'string' && val.trim().length > 0) {
        return val.trim();
      }
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        const nested = extractTextFromObject(val as Record<string, unknown>);
        if (nested) return nested;
      }
    }

    if (obj.json && typeof obj.json === 'object' && !Array.isArray(obj.json)) {
      const fromJson = extractTextFromObject(obj.json as Record<string, unknown>);
      if (fromJson) return fromJson;
    }
    if (obj.data && typeof obj.data === 'object' && !Array.isArray(obj.data)) {
      const fromData = extractTextFromObject(obj.data as Record<string, unknown>);
      if (fromData) return fromData;
    }

    return null;
  };

  if (typeof payload === 'string') {
    const trimmed = payload.trim();
    if (!trimmed) {
      return {
        reply:
          'Novera AI processed your request, but returned an empty response. Please try rephrasing your question.',
        products,
      };
    }
    try {
      const parsed = JSON.parse(trimmed);
      return normalizeN8nPayload(parsed);
    } catch {
      return { reply: trimmed, products };
    }
  }

  if (Array.isArray(payload)) {
    if (payload.length === 0) {
      return {
        reply:
          'Novera AI returned an empty response. Please try asking your shopping question again.',
        products,
      };
    }
    const textParts: string[] = [];
    for (const item of payload) {
      if (typeof item === 'string' && item.trim()) {
        textParts.push(item.trim());
      } else if (item && typeof item === 'object') {
        const extracted = extractTextFromObject(item as Record<string, unknown>);
        if (extracted) {
          textParts.push(extracted);
        } else {
          extractProductIfValid(item as Record<string, unknown>);
        }
      }
    }
    if (textParts.length > 0) {
      return { reply: textParts.join('\n\n'), products };
    }
    if (products.length > 0) {
      return {
        reply: 'Here are the matching products from the Novera catalogue:',
        products,
      };
    }
  }

  if (payload && typeof payload === 'object') {
    const extracted = extractTextFromObject(payload as Record<string, unknown>);
    if (extracted) {
      return { reply: extracted, products };
    }
  }

  return {
    reply:
      'Novera AI received your message, but the response format could not be displayed directly. Please try asking again.',
    products,
  };
}

async function fetchN8nWithRetry(
  webhookUrl: string,
  payload: { message: string; sessionId: string }
): Promise<{ status: number; ok: boolean; rawText: string }> {
  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const upstreamResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const rawText = await upstreamResponse.text();

      // Retry once if upstream returns a transient 5xx error on the first attempt
      if (!upstreamResponse.ok && upstreamResponse.status >= 500 && attempt < maxAttempts) {
        console.warn(
          `[Novera AI Proxy] Transient upstream HTTP ${upstreamResponse.status} on attempt ${attempt}; retrying...`
        );
        await new Promise((r) => setTimeout(r, 800));
        continue;
      }

      return {
        status: upstreamResponse.status,
        ok: upstreamResponse.ok,
        rawText,
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const errName = err instanceof Error ? err.name : 'UnknownError';
      console.warn(
        `[Novera AI Proxy] Network/fetch error (${errName}) on attempt ${attempt}/${maxAttempts}`
      );
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 800));
        continue;
      }
      throw err;
    }
  }

  throw new Error('Exhausted retry attempts');
}

async function handleChatProxy(req: Request, res: Response) {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      ok: false,
      error:
        'Too many requests sent in a short period. Please wait a moment before sending another message.',
    });
    return;
  }

  const rawMessage = req.body?.message;
  const rawSessionId = req.body?.sessionId;

  if (typeof rawMessage !== 'string') {
    res.status(400).json({
      ok: false,
      error: 'Please enter a valid shopping question or message.',
    });
    return;
  }

  const sanitizedMessage = rawMessage.trim();
  if (sanitizedMessage.length === 0) {
    res.status(400).json({
      ok: false,
      error: 'Message cannot be empty.',
    });
    return;
  }

  if (sanitizedMessage.length > 1500) {
    res.status(400).json({
      ok: false,
      error: 'Your message exceeds the 1,500 character limit. Please shorten your enquiry.',
    });
    return;
  }

  const sessionId =
    typeof rawSessionId === 'string' && rawSessionId.trim().length > 0
      ? rawSessionId.trim().slice(0, 128)
      : 'novera-web-session-default';

  const webhookUrl = (
    process.env.NOVERA_AI_WEBHOOK_URL ||
    process.env.NOVERA_N8N_WEBHOOK_URL ||
    DEFAULT_N8N_WEBHOOK_URL
  ).trim();

  if (webhookUrl.includes('/webhook-test/')) {
    res.status(500).json({
      ok: false,
      error: 'Production webhook configuration error: test webhook endpoints are disabled.',
    });
    return;
  }

  try {
    const upstreamResult = await fetchN8nWithRetry(webhookUrl, {
      message: sanitizedMessage,
      sessionId,
    });

    if (!upstreamResult.ok) {
      console.error(
        `[Novera AI Proxy] Upstream n8n webhook returned HTTP ${upstreamResult.status}`
      );
      res.status(502).json({
        ok: false,
        statusCode: upstreamResult.status,
        error:
          'Novera AI is temporarily busy processing your request. Please click Retry in a moment.',
      });
      return;
    }

    let parsedBody: unknown = upstreamResult.rawText;
    try {
      parsedBody = JSON.parse(upstreamResult.rawText);
    } catch {
      // Keep as plain text if response is prose
    }

    const normalized = normalizeN8nPayload(parsedBody);

    res.status(200).json({
      ok: true,
      reply: normalized.reply,
      products: normalized.products.length > 0 ? normalized.products : undefined,
    });
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    console.error(
      `[Novera AI Proxy] Upstream connection failed:`,
      err instanceof Error ? err.message : 'Unknown error'
    );
    res.status(504).json({
      ok: false,
      error: isAbort
        ? 'Novera AI took a little longer than expected to respond. Please click Retry.'
        : 'Unable to reach Novera AI right now. Please check your connection and click Retry.',
    });
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '32kb' }));

  app.post('/api/chat', handleChatProxy);
  app.post('/api/novera-ai', handleChatProxy);

  app.get('/api/catalogue/status', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      totalProducts: 178,
      categoriesCount: 11,
      source: 'novera_catalogue_snapshot_178',
      lastCheckedAt: new Date().toISOString(),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NOVERA Commerce Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
