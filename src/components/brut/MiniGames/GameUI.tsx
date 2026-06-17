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
      <div style={{ height: 9, background: "var(--line)", overflow: "hidden", borderRadius: 999 }}>
        <motion.div
          initial={false}
          animate={{ width: `${pct * 100}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          style={{
            height: "100%",
            background: accent,
            borderRadius: 999,
            boxShadow: done ? `0 0 12px ${accent}` : "none",
          }}
        />
      </div>
    </div>
  );
}

/**
 * A clean, rounded "game board" panel (LinkedIn-games style) to sit a chunky
 * tile grid on. Soft elevation, generous radius, no techy hairlines.
 */
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
        background: "var(--paper-elev)",
        border: "1px solid var(--line)",
        borderRadius: 18,
        boxShadow: "0 14px 34px rgba(0,0,0,0.42)",
        padding: 16,
      }}
    >
      {children}
    </div>
  );
}
