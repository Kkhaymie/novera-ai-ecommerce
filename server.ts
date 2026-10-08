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
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

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
 * Normalizes varied n8n multi-agent webhook responses into safe, human-readable reply text
 * and optional structured product cards without exposing raw workflow internals.
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
        id: typeof item.id === 'string' ? item.id : undefined,
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

    // Check if products array exists inside object
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

    // Sometimes n8n wraps inside { json: { output: "..." } } or { data: ... }
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
        reply: 'Novera AI processed your request, but returned an empty response. Please try rephrasing your question.',
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
        reply: 'Novera AI returned an empty response. Please try asking your shopping question again.',
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

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '32kb' }));

  /**
   * POST /api/novera-ai
   * Dedicated server-side proxy forwarding customer messages to the live n8n workflow.
   */
  app.post('/api/novera-ai', async (req: Request, res: Response) => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';

    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        ok: false,
        error: 'Too many requests sent in a short period. Please wait a moment before sending another message.',
      });
      return;
    }

    const rawMessage = req.body?.message;
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

    const webhookUrl = (process.env.NOVERA_N8N_WEBHOOK_URL || DEFAULT_N8N_WEBHOOK_URL).trim();

    // Prevent accidental usage of /webhook-test/
    if (webhookUrl.includes('/webhook-test/')) {
      res.status(500).json({
        ok: false,
        error: 'Production webhook configuration error: test webhook endpoints are disabled.',
      });
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 28000);

    try {
      const upstreamResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          message: sanitizedMessage,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const rawText = await upstreamResponse.text();

      if (!upstreamResponse.ok) {
        const isWebhookInactive = upstreamResponse.status === 404;
        res.status(502).json({
          ok: false,
          statusCode: upstreamResponse.status,
          error: isWebhookInactive
            ? 'The Novera AI n8n production webhook (HTTP 404) is currently inactive or awaiting workflow activation in n8n Cloud. Please ensure the Novera_AI workflow is toggled Active in n8n and retry.'
            : `Novera AI returned HTTP ${upstreamResponse.status}. Please retry in a few seconds.`,
        });
        return;
      }

      let parsedBody: unknown = rawText;
      try {
        parsedBody = JSON.parse(rawText);
      } catch {
        // Keep as text if response is plain prose
      }

      const normalized = normalizeN8nPayload(parsedBody);

      res.status(200).json({
        ok: true,
        reply: normalized.reply,
        products: normalized.products.length > 0 ? normalized.products : undefined,
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof Error && err.name === 'AbortError';
      res.status(504).json({
        ok: false,
        error: isAbort
          ? 'Novera AI took longer than expected to respond. Please retry your request.'
          : 'Unable to reach the Novera AI service right now. Please check your connection and retry.',
      });
    }
  });

  /**
   * GET /api/catalogue/status
   * Reports whether live Google Sheets direct synchronization is configured or if the
   * frontend should display clearly labeled sample showcase items while Novera AI queries live n8n data.
   */
  app.get('/api/catalogue/status', async (_req: Request, res: Response) => {
    const sheetsUrl = (process.env.NOVERA_GOOGLE_SHEETS_CSV_URL || '').trim();
    if (!sheetsUrl) {
      res.json({
        ok: true,
        source: 'sample_showcase_fallback',
        lastCheckedAt: new Date().toISOString(),
        notice:
          'Direct Google Sheets API synchronization requires NOVERA_GOOGLE_SHEETS_CSV_URL or OAuth authorization. Displaying labeled Sample Showcase records for layout demonstration. Ask Novera AI for live catalogue inventory, pricing, and currency conversions via our connected n8n workflow.',
      });
      return;
    }

    res.json({
      ok: true,
      source: 'google_sheets_live',
      lastCheckedAt: new Date().toISOString(),
      notice: 'Connected to authorized Google Sheets catalogue source.',
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
