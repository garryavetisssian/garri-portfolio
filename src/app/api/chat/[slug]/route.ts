import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { buildSystemPrompt } from "@/lib/chat/context";
import { rateLimit } from "@/lib/chat/rate-limit";

// Fluid Compute / Node runtime so we get instance reuse for the in-memory rate limit.
export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_HISTORY = 6;
const MAX_INPUT_CHARS = 1500;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error("[chat] GOOGLE_GEMINI_API_KEY env var is not set");
    return NextResponse.json(
      { error: "Chat is not configured on this deployment." },
      { status: 503 }
    );
  }

  const ip = getClientIp(req);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    const retryAfterSec = Math.max(
      1,
      Math.ceil((limit.resetAt - Date.now()) / 1000)
    );
    const message =
      limit.scope === "day"
        ? "Daily chat limit reached — try again tomorrow."
        : "Too many messages in a short time — give it a minute.";
    return NextResponse.json(
      { error: message },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  // Cap the last user message length to keep token cost predictable.
  const last = messages[messages.length - 1];
  const lastText = last?.parts
    ?.filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join(" ");
  if (lastText && lastText.length > MAX_INPUT_CHARS) {
    return NextResponse.json(
      { error: `Message too long. Keep it under ${MAX_INPUT_CHARS} characters.` },
      { status: 413 }
    );
  }

  // Trim history to the last N messages so token usage stays bounded.
  const trimmed = messages.slice(-MAX_HISTORY);

  const systemPrompt = buildSystemPrompt(slug);
  if (!systemPrompt) {
    return NextResponse.json({ error: "Unknown project." }, { status: 404 });
  }

  const modelMessages = await convertToModelMessages(trimmed);

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    messages: modelMessages,
    temperature: 0.6,
    maxOutputTokens: 700,
  });

  return result.toUIMessageStreamResponse();
}
