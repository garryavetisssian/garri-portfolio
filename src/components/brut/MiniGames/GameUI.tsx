"use client";

/**
 * Shared game-feel UI primitives (zero assets):
 *  - ProgressHUD: an objective progress bar so a board reads as a game, not a form.
 *  - BoardFrame: a "game board" surface — dotted field, soft accent glow, and
 *    accent corner brackets — to sit a grid on.
 */

import { motion } from "framer-motion";

export function ProgressHUD({
  label,
  value,
  total,
  accent = "var(--acid)",
}: {
  label: string;
  value: number;
  total: number;
  accent?: string;
}) {
  const pct = total > 0 ? Math.min(value / total, 1) : 0;
  const done = total > 0 && value >= total;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          className="mono uppercase"
          style={{ color: "var(--ink-faint)", fontSize: "0.62rem", letterSpacing: "0.1em" }}
        >
          {label}
        </span>
        <span
          className="mono tabular-nums"
          style={{ color: done ? accent : "var(--ink-mute)", fontSize: "0.74rem", fontWeight: 700 }}
        >
          {value}/{total}
        </span>
      </div>
      <div style={{ height: 8, background: "var(--line)", overflow: "hidden" }}>
        <motion.div
          initial={false}
          animate={{ width: `${pct * 100}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          style={{
            height: "100%",
            background: accent,
            boxShadow: done ? `0 0 12px ${accent}` : "none",
          }}
        />
      </div>
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 14,
    height: 14,
    borderColor: "var(--acid)",
    pointerEvents: "none",
  };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: -1, left: -1, borderTop: "2px solid", borderLeft: "2px solid" },
    tr: { top: -1, right: -1, borderTop: "2px solid", borderRight: "2px solid" },
    bl: { bottom: -1, left: -1, borderBottom: "2px solid", borderLeft: "2px solid" },
    br: { bottom: -1, right: -1, borderBottom: "2px solid", borderRight: "2px solid" },
  };
  return <span aria-hidden style={{ ...base, ...map[pos] }} />;
}

export function BoardFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background:
          "radial-gradient(circle at 50% 35%, rgba(155,107,255,0.07), transparent 62%), var(--paper)",
        border: "1px solid var(--line-strong)",
        boxShadow: "inset 0 0 50px rgba(0,0,0,0.45)",
        padding: 18,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--line) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
        aria-hidden
      />
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      <div className="relative">{children}</div>
    </div>
  );
}
