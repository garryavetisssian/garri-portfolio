"use client";

/**
 * MyRole — per-case role breakdown band.
 *
 * Renders an editorial 10-segment progress bar per discipline track
 * (Research / UX / UI / Design System / PM / etc.), with:
 *   • Brutalist hatched empty cells (diagonal stripe pattern)
 *   • Acid-filled occupied cells
 *   • Scroll-triggered stagger: rows reveal in sequence; within each row
 *     filled segments paint left-to-right; the value ticks up from 0
 *   • Mono labels, display-weight value numbers, top hairline scrub
 *   • Hover: row slides 4px right, value scales up
 *
 * All motion collapses to opacity-only fades under prefers-reduced-motion.
 */

import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";
import { useEffect, useRef } from "react";
import type { RoleBreakdown } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SEGMENTS = 10;

const sectionStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const linePaint: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.05, ease: [0.65, 0, 0.35, 1] },
  },
};

const rowReveal: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ─── Value count-up — animates 0 → target once row is in view ─────── */

function ValueCounter({ value, active }: { value: number; active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    if (reduce) {
      ref.current.textContent = String(value);
      return;
    }
    if (!active) {
      ref.current.textContent = "0";
      return;
    }
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.05,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, active, reduce]);

  return <span ref={ref}>{reduce ? value : 0}</span>;
}

/* ─── Single discipline row ──────────────────────────────────────── */

function RoleRow({
  label,
  value,
  rowIndex,
  active,
}: {
  label: string;
  value: number;
  rowIndex: number;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.round((clamped / 100) * SEGMENTS);
  const rowDelay = 0.15 + rowIndex * 0.09;

  return (
    <motion.div
      variants={rowReveal}
      className="role-row group/role grid items-center gap-5 md:gap-7 py-4 md:py-5 border-t border-line-strong transition-transform duration-500"
      style={{
        gridTemplateColumns:
          "minmax(110px, 1.2fr) minmax(0, 5fr) minmax(64px, auto)",
      }}
      whileHover={reduce ? undefined : { x: 4 }}
    >
      <span
        className="mono text-ink uppercase tracking-[0.04em]"
        style={{ fontSize: "0.78rem", lineHeight: 1.25 }}
      >
        {label}
      </span>

      <div
        className="role-bar"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SEGMENTS}, 1fr)`,
          gap: 4,
          height: 22,
        }}
        aria-label={`${value} out of 100`}
        role="img"
      >
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const isFilled = i < filled;
          return (
            <motion.span
              key={i}
              className={isFilled ? "role-seg-filled" : "role-seg-empty"}
              initial={
                isFilled ? { scaleY: 0, opacity: 0 } : { opacity: 0 }
              }
              animate={
                active
                  ? isFilled
                    ? { scaleY: 1, opacity: 1 }
                    : { opacity: 1 }
                  : isFilled
                  ? { scaleY: 0, opacity: 0 }
                  : { opacity: 0 }
              }
              transition={{
                duration: isFilled ? 0.45 : 0.35,
                ease: EASE,
                delay: isFilled
                  ? rowDelay + i * 0.05
                  : rowDelay * 0.6 + i * 0.015,
              }}
              style={{ transformOrigin: "bottom center", display: "block" }}
            />
          );
        })}
      </div>

      <div
        className="role-value flex items-baseline justify-end gap-1.5 transition-transform duration-500 group-hover/role:scale-[1.04]"
        style={{ transformOrigin: "right center" }}
      >
        <span
          className="text-acid serif-num"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <ValueCounter value={value} active={active} />
        </span>
        <span
          className="mono text-ink-faint"
          style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
        >
          /100
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────────── */

export default function MyRole({
  data,
  slug,
}: {
  data: RoleBreakdown;
  slug: string;
}) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.18,
    margin: "0px 0px -8% 0px",
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionStagger}
      className="role-section relative py-20 border-t border-line-strong overflow-hidden"
    >
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        {/* Header strip — label · scrubbed hairline · count */}
        <div className="flex items-baseline gap-4 mb-12">
          <span className="mono text-ink-mute whitespace-nowrap uppercase">
            — {t.caseStudy.roleBreakdown}
          </span>
          <motion.span
            aria-hidden
            variants={linePaint}
            className="flex-1 h-px bg-line-strong origin-left"
          />
          <span className="mono text-ink-mute whitespace-nowrap">
            {slug.toUpperCase()} · {String(data.tracks.length).padStart(2, "0")}
          </span>
        </div>

        {/* Body — 3-col summary left, 9-col bar stack right (mirrors Overview) */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3 flex flex-col gap-4">
            <p
              className="mono text-ink-mute"
              style={{ fontSize: "0.78rem", letterSpacing: "0.04em" }}
            >
              ⌗ WHAT I OWNED
            </p>
            {data.summary && (
              <p
                className="text-ink"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                }}
              >
                {data.summary}
              </p>
            )}
          </div>

          <div className="md:col-span-9 border-b border-line-strong">
            {data.tracks.map((track, i) => (
              <RoleRow
                key={track.label}
                label={track.label}
                value={track.value}
                rowIndex={i}
                active={inView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative crosshair, drifting (matches Brief chrome) */}
      <div
        aria-hidden
        className="role-crosshair absolute right-6 top-6 text-ink-faint drift"
        style={{ fontSize: "12px", lineHeight: 1 }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 1V21" stroke="currentColor" strokeWidth="0.8" />
          <path d="M1 11H21" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>
    </motion.section>
  );
}
