"use client";

/**
 * ChatButton — floating action button that opens the per-case AI chat.
 *
 * Lives bottom-right on every case study, fixed position. Matches the brut
 * aesthetic (mono label, acid accent ring, paper-elev fill). Lazy-loads the
 * heavier ChatPanel client component only on first open.
 */

import { useState, lazy, Suspense } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ChatPanel = lazy(() => import("./ChatPanel"));

export default function ChatButton({
  slug,
  caseTitle,
}: {
  slug: string;
  caseTitle: string;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  function handleOpen() {
    setMounted(true);
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label={t.chat.fabAria}
        className="chat-fab group/fab fixed z-40 flex items-center gap-2.5 transition-all duration-300"
        style={{
          right: "1.25rem",
          bottom: "1.25rem",
          padding: "0.6rem 1rem 0.6rem 0.85rem",
          borderRadius: "999px",
          background: "var(--paper-elev)",
          border: "1px solid var(--line-strong)",
          color: "var(--ink)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.45)",
        }}
      >
        <span
          aria-hidden
          className="chat-fab-icon flex items-center justify-center transition-transform duration-500 group-hover/fab:rotate-[8deg]"
          style={{
            width: 22,
            height: 22,
            borderRadius: "999px",
            background: "var(--acid)",
            color: "var(--paper)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 2.5C2 2.22 2.22 2 2.5 2h7c.28 0 .5.22.5.5v5c0 .28-.22.5-.5.5H5l-2 2v-2H2.5C2.22 8 2 7.78 2 7.5v-5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span
          className="mono uppercase whitespace-nowrap"
          style={{ fontSize: "0.72rem", letterSpacing: "0.06em" }}
        >
          {t.chat.fabLabel}
        </span>
      </button>

      {mounted && (
        <Suspense fallback={null}>
          <ChatPanel
            slug={slug}
            caseTitle={caseTitle}
            open={open}
            onClose={() => setOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
