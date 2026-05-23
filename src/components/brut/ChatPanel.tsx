"use client";

/**
 * ChatPanel — slide-in drawer that hosts the per-case AI chat.
 *
 * • Streams messages via the AI SDK v6 useChat + DefaultChatTransport
 * • Posts to /api/chat/[slug] (per-case context built server-side)
 * • Brut aesthetic: paper-elev panel, line-strong borders, mono chrome,
 *   acid accent for AI messages and the send affordance
 * • Mobile: full-screen sheet. Desktop: 400px wide × 600px tall card.
 * • Esc closes; click outside closes; Enter sends, Shift+Enter newlines
 */

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function messageText(parts: { type: string; text?: string }[] | undefined) {
  if (!parts) return "";
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export default function ChatPanel({
  slug,
  caseTitle,
  open,
  onClose,
}: {
  slug: string;
  caseTitle: string;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: `/api/chat/${slug}` }),
    [slug]
  );

  const { messages, sendMessage, status, error, stop } = useChat({
    transport,
  });

  const isStreaming = status === "submitted" || status === "streaming";

  // Auto-scroll to the latest message.
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isStreaming]);

  // Focus the textarea when the panel opens.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  }

  const starters = [t.chat.starter1, t.chat.starter2, t.chat.starter3];

  return (
    <>
      {/* Backdrop — click to close */}
      <div
        onClick={onClose}
        aria-hidden
        className="chat-backdrop fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.55)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label={t.chat.heading}
        aria-modal="true"
        className="chat-panel fixed z-50 flex flex-col transition-transform duration-400"
        style={{
          right: 0,
          bottom: 0,
          width: "min(100vw, 420px)",
          height: "min(100dvh, 640px)",
          maxHeight: "100dvh",
          background: "var(--paper-elev)",
          border: "1px solid var(--line-strong)",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          boxShadow: "0 -10px 40px rgba(0,0,0,0.55)",
          transform: open ? "translateY(0)" : "translateY(105%)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <header
          className="flex items-start justify-between gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid var(--line-strong)" }}
        >
          <div className="flex flex-col gap-1 min-w-0">
            <span
              className="mono text-ink-mute uppercase whitespace-nowrap"
              style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
            >
              — {t.chat.heading}
            </span>
            <h3
              className="text-ink truncate"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "-0.015em",
              }}
            >
              {caseTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.chat.close}
            className="chat-close shrink-0 flex items-center justify-center transition-colors duration-200"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: "1px solid var(--line-strong)",
              color: "var(--ink-mute)",
              background: "transparent",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M2 2L12 12M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.length === 0 && (
            <div className="flex flex-col gap-3 mt-2">
              <p
                className="text-ink"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {t.chat.emptyTitle}
              </p>
              <p
                className="text-ink-mute"
                style={{ fontSize: "0.88rem", lineHeight: 1.5 }}
              >
                {t.chat.emptyBody}
              </p>
              <div className="flex flex-col gap-2 mt-2">
                {starters.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    disabled={isStreaming}
                    className="chat-starter text-left transition-colors duration-200"
                    style={{
                      padding: "0.7rem 0.85rem",
                      border: "1px solid var(--line-strong)",
                      borderRadius: 8,
                      color: "var(--ink)",
                      background: "transparent",
                      fontSize: "0.88rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = messageText(m.parts as { type: string; text?: string }[]);
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`chat-msg flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="chat-bubble"
                  style={{
                    maxWidth: "85%",
                    padding: isUser ? "0.6rem 0.85rem" : "0.5rem 0 0.5rem 0.85rem",
                    background: isUser ? "var(--paper-soft)" : "transparent",
                    border: isUser ? "1px solid var(--line-strong)" : "none",
                    borderRadius: isUser ? 10 : 0,
                    borderLeft: isUser ? "1px solid var(--line-strong)" : "2px solid var(--acid)",
                    color: "var(--ink)",
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {text || (isStreaming && !isUser ? <TypingDots /> : null)}
                </div>
              </div>
            );
          })}

          {error && (
            <div
              className="chat-error mono"
              style={{
                fontSize: "0.78rem",
                color: "var(--ink-mute)",
                border: "1px solid var(--line-strong)",
                borderLeft: "2px solid #ef4444",
                padding: "0.5rem 0.75rem",
                borderRadius: 6,
              }}
            >
              {error.message?.includes("429")
                ? t.chat.rateLimitBurst
                : t.chat.errorGeneric}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 px-5 pt-3 pb-4"
          style={{ borderTop: "1px solid var(--line-strong)" }}
        >
          <div
            className="chat-composer flex items-end gap-2"
            style={{
              border: "1px solid var(--line-strong)",
              borderRadius: 10,
              padding: "0.5rem 0.6rem 0.5rem 0.75rem",
              background: "var(--paper-soft)",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chat.placeholder}
              rows={1}
              maxLength={1500}
              className="flex-1 bg-transparent resize-none outline-none"
              style={{
                color: "var(--ink)",
                fontSize: "0.92rem",
                lineHeight: 1.4,
                maxHeight: 120,
                minHeight: 22,
              }}
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={() => stop()}
                aria-label="Stop"
                className="chat-stop shrink-0 flex items-center justify-center transition-colors duration-200"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  background: "var(--paper-elev)",
                  border: "1px solid var(--line-strong)",
                  color: "var(--ink)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    display: "block",
                    width: 10,
                    height: 10,
                    background: "currentColor",
                    borderRadius: 2,
                  }}
                />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label={t.chat.send}
                className="chat-send shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  background: input.trim() ? "var(--acid)" : "var(--paper-elev)",
                  border: "1px solid var(--line-strong)",
                  color: input.trim() ? "var(--paper)" : "var(--ink-faint)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                  <path
                    d="M1.5 6.5h9.5M7 2.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          <p
            className="mono text-ink-faint"
            style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}
          >
            {t.chat.disclaimer}
          </p>
        </form>
      </aside>
    </>
  );
}

function TypingDots() {
  return (
    <span className="chat-typing inline-flex items-center gap-1" aria-label="…">
      <span className="typing-dot" />
      <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
      <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
    </span>
  );
}
