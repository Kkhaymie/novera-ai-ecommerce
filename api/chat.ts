
import { randomUUID } from 'node:crypto';

// ============================================================
// NOVERA AI — SERVERLESS CHAT API
// ============================================================
// This endpoint securely connects the Novera website to the
// existing n8n AI shopping and customer-support workflow.
//
// Production webhook configuration:
// NOVERA_AI_WEBHOOK_URL
//
// The webhook URL must be configured as a server-side
// environment variable in Vercel.
//
// IMPORTANT:
// - No hardcoded production webhook URL
// - No API keys exposed in frontend code
// - One n8n request per customer message
// - Unique fallback session IDs
// - Supports existing n8n response formats
// ============================================================

// ------------------------------------------------------------
// REQUEST TYPES
// ------------------------------------------------------------

interface ServerlessRequest {
  method?: string;
  body?: {
    message?: unknown;
    sessionId?: unknown;
  };
}

// ------------------------------------------------------------
// RESPONSE TYPES
// ------------------------------------------------------------

interface ServerlessResponse {
  status: (code: number) => {
    json: (payload: Record<string, unknown>) => void;
  };
}

// ------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------

const N8N_TIMEOUT_MS = 45000;
const MAX_MESSAGE_LENGTH = 1500;
const MAX_SESSION_ID_LENGTH = 128;

// ------------------------------------------------------------
// SEND ONE REQUEST TO N8N
// ------------------------------------------------------------
// Automatic retries are intentionally disabled.
//
// The Novera AI workflow can perform actions such as customer
// support escalation and email delivery.
//
// Retrying the same request automatically could execute
// those actions more than once.
// ------------------------------------------------------------

async function fetchN8nOnce(
  webhookUrl: string,
  payload: {
    message: string;
    sessionId: string;
  }
): Promise<{
  status: number;
  ok: boolean;
  rawText: string;
}> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, N8N_TIMEOUT_MS);

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      },

      body: JSON.stringify(payload),

      signal: controller.signal,
    });

    const rawText = await upstream.text();

    return {
      status: upstream.status,
      ok: upstream.ok,
      rawText,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

// ------------------------------------------------------------
// MAIN SERVERLESS HANDLER
// ------------------------------------------------------------

export default async function handler(
  req: ServerlessRequest,
  res: ServerlessResponse
): Promise<void> {

  // ----------------------------------------------------------
  // 1. ALLOW POST REQUESTS ONLY
  // ----------------------------------------------------------

  if (req.method !== 'POST') {
    res.status(405).json({
      ok: false,
      error: 'Method not allowed. Use POST.',
    });

    return;
  }

  // ----------------------------------------------------------
  // 2. READ CUSTOMER MESSAGE AND SESSION ID
  // ----------------------------------------------------------

  const rawMessage = req.body?.message;
  const rawSessionId = req.body?.sessionId;

  // ----------------------------------------------------------
  // 3. VALIDATE CUSTOMER MESSAGE
  // ----------------------------------------------------------

  if (
    typeof rawMessage !== 'string' ||
    !rawMessage.trim()
  ) {
    res.status(400).json({
      ok: false,
      error: 'Please provide a valid message.',
    });

    return;
  }

  // ----------------------------------------------------------
  // 4. SANITIZE MESSAGE
  // ----------------------------------------------------------

  const sanitizedMessage = rawMessage
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);

  // ----------------------------------------------------------
  // 5. MANAGE CONVERSATION SESSION
  // ----------------------------------------------------------
  // Use the session ID supplied by the website when valid.
  //
  // If none is provided, generate a unique session ID rather
  // than sharing one default session across customers.
  //
  // The frontend should create and reuse its own session ID
  // for all messages within the same customer conversation.
  // ----------------------------------------------------------

  const sessionId =
    typeof rawSessionId === 'string' &&
    rawSessionId.trim()
      ? rawSessionId
          .trim()
          .slice(0, MAX_SESSION_ID_LENGTH)
      : randomUUID();

  // ----------------------------------------------------------
  // 6. READ N8N WEBHOOK FROM ENVIRONMENT VARIABLES
  // ----------------------------------------------------------
  // The preferred variable is:
  //
  // NOVERA_AI_WEBHOOK_URL
  //
  // The alternate name is supported for compatibility
  // with earlier Novera configurations.
  //
  // No hardcoded fallback URL is permitted.
  // ----------------------------------------------------------

  const webhookUrl = (
    process.env.NOVERA_AI_WEBHOOK_URL ||
    process.env.NOVERA_N8N_WEBHOOK_URL ||
    ''
  ).trim();

  // ----------------------------------------------------------
  // 7. VERIFY WEBHOOK CONFIGURATION
  // ----------------------------------------------------------

  if (!webhookUrl) {
    res.status(503).json({
      ok: false,
      error:
        'Novera AI is temporarily unavailable. Please try again later.',
    });

    return;
  }

  // ----------------------------------------------------------
  // 8. CALL NOVERA AI WORKFLOW
  // ----------------------------------------------------------

  try {
    const upstream = await fetchN8nOnce(
      webhookUrl,
      {
        message: sanitizedMessage,
        sessionId,
      }
    );

    // --------------------------------------------------------
    // 9. HANDLE N8N HTTP ERRORS
    // --------------------------------------------------------

    if (!upstream.ok) {
      res.status(502).json({
        ok: false,
        statusCode: upstream.status,
        error:
          'Novera AI is temporarily busy. Please click Retry in a moment.',
      });

      return;
    }

    // --------------------------------------------------------
    // 10. PARSE N8N RESPONSE
    // --------------------------------------------------------
    // Supports JSON and plain-text responses.
    // --------------------------------------------------------

    let parsed: unknown = upstream.rawText;

    try {
      parsed = JSON.parse(upstream.rawText);
    } catch {
      // Keep the original response if it is plain text.
    }

    // --------------------------------------------------------
    // 11. EXTRACT THE AI RESPONSE
    // --------------------------------------------------------

    let reply = '';

    // Format A:
    // [
    //   {
    //     "output": "AI response"
    //   }
    // ]

    if (
      Array.isArray(parsed) &&
      parsed.length > 0
    ) {
      const first = parsed[0] as Record<
        string,
        unknown
      >;

      reply =
        (typeof first?.output === 'string' &&
          first.output) ||
        (typeof first?.reply === 'string' &&
          first.reply) ||
        (typeof first?.text === 'string' &&
          first.text) ||
        '';
    }

    // Format B:
    // {
    //   "output": "AI response"
    // }

    else if (
      parsed &&
      typeof parsed === 'object'
    ) {
      const obj = parsed as Record<
        string,
        unknown
      >;

      reply =
        (typeof obj.output === 'string' &&
          obj.output) ||
        (typeof obj.reply === 'string' &&
          obj.reply) ||
        (typeof obj.text === 'string' &&
          obj.text) ||
        '';
    }

    // Format C:
    // "AI response"

    else if (typeof parsed === 'string') {
      reply = parsed;
    }

    // --------------------------------------------------------
    // 12. CHECK FOR AN EMPTY OR UNRECOGNIZED RESPONSE
    // --------------------------------------------------------

    const finalReply = reply.trim();

    if (!finalReply) {
      res.status(502).json({
        ok: false,
        error:
          'Novera AI returned an unexpected response. Please try again later.',
      });

      return;
    }

    // --------------------------------------------------------
    // 13. RETURN SUCCESSFUL RESPONSE TO THE WEBSITE
    // --------------------------------------------------------

    res.status(200).json({
      ok: true,
      reply: finalReply,
    });

    return;

  } catch (error: unknown) {

    // --------------------------------------------------------
    // 14. HANDLE TIMEOUTS AND NETWORK ERRORS
    // --------------------------------------------------------

    const isTimeout =
      error instanceof Error &&
      error.name === 'AbortError';

    if (isTimeout) {
      res.status(504).json({
        ok: false,
        error:
          'Novera AI is taking longer than expected. Please try again later.',
      });

      return;
    }

    res.status(502).json({
      ok: false,
      error:
        'Unable to reach Novera AI right now. Please check your connection and click Retry.',
    });

    return;
  }
}
