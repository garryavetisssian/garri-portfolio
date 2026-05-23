"use client";

/**
 * Brief — bespoke case-summary section that replaces the old TL;DR strip.
 *
 * Each case authors a short narrative + a mixed grid of tiles (stat / label /
 * quote / tags). The grid spans a 12-column track with author-supplied spans.
 *
 * Motion (framer-motion):
 *   • Top hairline scrubs left → right on enter
 *   • Narrative reveals word-by-word with a staggered Y/opacity rise
 *   • Tile grid uses a parent stagger; each tile slides in from a diagonal
 *     with a brief skew uncurl
 *   • Stat numbers count up from 0 once visible (digits only)
 *   • Tiles magnetize toward the cursor on hover
 *   • Corner marks rotate 90° on tile hover
 *
 * All transforms collapse to opacity-only fades under prefers-reduced-motion.
 */

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  animate,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BriefTile, CaseBrief } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/* ─── Motion vocab ──────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const wordStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const wordRise: Variants = {
  hidden: { y: "55%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const tileEnter: Variants = {
  hidden: { opacity: 0, x: -14, y: 18, skewY: 2.5 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const linePaint: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.05, ease: [0.65, 0, 0.35, 1] },
  },
};

const underlinePaint: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE, delay: 0.45 },
  },
};

/* ─── Count-up for stat numbers (digit strings only) ─────────────── */

function CountUp({ value }: { value: string }) {
  // Only animate strings that parse cleanly as an integer.
  const parsed = /^-?\d+$/.test(value.trim()) ? parseInt(value, 10) : null;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (parsed === null) return;
    if (!ref.current) return;
    if (reduce) {
      ref.current.textContent = String(parsed);
      return;
    }
    if (!inView) return;
    const node = ref.current;
    const controls = animate(0, parsed, {
      duration: 0.95,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, parsed, reduce]);

  if (parsed === null) {
    return <span>{value}</span>;
  }
  return <span ref={ref}>{reduce ? parsed : 0}</span>;
}

/* ─── Magnetic tile wrapper ─────────────────────────────────────── */

function MagneticTile({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Raw pointer deltas, smoothed with a spring for a soft magnetic feel.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 240, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 240, damping: 22, mass: 0.6 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    if (e.pointerType !== "mouse") return; // skip touch
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width; // -0.5 → 0.5
    const dy = (e.clientY - cy) / rect.height;
    mx.set(dx * 10); // cap ~5px each direction
    my.set(dy * 10);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      variants={tileEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ ...style, x, y }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Tile chrome ────────────────────────────────────────────────── */

function CornerMark({ kind, index }: { kind: BriefTile["kind"]; index: number }) {
  const glyph =
    kind === "stat" ? "×" : kind === "label" ? "→" : kind === "quote" ? "“" : "#";
  return (
    <div className="flex items-center justify-between text-ink-faint mono">
      <span
        className="text-acid transition-transform duration-500 group-hover/tile:rotate-90"
        style={{ display: "inline-block", fontSize: "14px", lineHeight: 1 }}
        aria-hidden
      >
        {glyph}
      </span>
      <span>{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

function TileShell({
  children,
  span,
  kind,
  index,
}: {
  children: React.ReactNode;
  span: number;
  kind: BriefTile["kind"];
  index: number;
}) {
  // 12-col grid on md+, single-col on small screens.
  return (
    <MagneticTile
      className="brief-tile group/tile relative bg-paper p-7 flex flex-col gap-5 min-h-[180px]"
      style={{ gridColumn: `span ${span} / span ${span}` }}
    >
      <CornerMark kind={kind} index={index} />
      {children}
    </MagneticTile>
  );
}

/* ─── Tile renderers ─────────────────────────────────────────────── */

function StatTile({ tile, index }: { tile: Extract<BriefTile, { kind: "stat" }>; index: number }) {
  // Word-like suffixes (e.g. " weeks", " months") shrink so they don't blow
  // out the cell width; symbol suffixes ("+", "%") render at full size.
  const suffix = tile.suffix ?? "";
  const isWordSuffix = /[a-z]/i.test(suffix);
  return (
    <TileShell span={tile.span ?? 3} kind="stat" index={index}>
      <div className="mt-auto">
        <div
          className="text-acid serif-num"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            columnGap: "0.18em",
          }}
        >
          <span>
            {tile.prefix}
            <CountUp value={tile.value} />
            {!isWordSuffix && suffix}
          </span>
          {isWordSuffix && (
            <span
              style={{
                fontSize: "0.42em",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                textTransform: "lowercase",
              }}
            >
              {suffix.trim()}
            </span>
          )}
        </div>
        <p className="mono text-ink-mute mt-4">{tile.label}</p>
      </div>
    </TileShell>
  );
}

function LabelTile({ tile, index }: { tile: Extract<BriefTile, { kind: "label" }>; index: number }) {
  return (
    <TileShell span={tile.span ?? 4} kind="label" index={index}>
      <div className="mt-auto">
        <p className="mono text-ink-mute mb-3">{tile.key}</p>
        <p
          className="text-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.15rem, 1.6vw, 1.55rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {tile.value}
        </p>
      </div>
    </TileShell>
  );
}

function QuoteTile({ tile, index }: { tile: Extract<BriefTile, { kind: "quote" }>; index: number }) {
  return (
    <TileShell span={tile.span ?? 6} kind="quote" index={index}>
      <div className="mt-auto">
        <blockquote
          className="text-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(1.25rem, 2vw, 1.85rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.18,
          }}
        >
          <span className="text-acid pr-1">“</span>
          {tile.text}
          <span className="text-acid pl-1">”</span>
        </blockquote>
        {tile.cite && (
          <p className="mono text-ink-mute mt-5">— {tile.cite}</p>
        )}
      </div>
    </TileShell>
  );
}

function TagsTile({ tile, index }: { tile: Extract<BriefTile, { kind: "tags" }>; index: number }) {
  return (
    <TileShell span={tile.span ?? 12} kind="tags" index={index}>
      <div className="mt-auto">
        <p className="mono text-ink-mute mb-4">{tile.label}</p>
        <div className="flex flex-wrap gap-2">
          {tile.items.map((item) => (
            <span
              key={item}
              className="brief-chip mono inline-flex items-center px-2.5 py-1 border border-line-strong text-ink-mute transition-colors duration-300 hover:border-acid hover:text-acid"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </TileShell>
  );
}

function renderTile(tile: BriefTile, index: number) {
  switch (tile.kind) {
    case "stat":
      return <StatTile tile={tile} index={index} key={`t-${index}`} />;
    case "label":
      return <LabelTile tile={tile} index={index} key={`t-${index}`} />;
    case "quote":
      return <QuoteTile tile={tile} index={index} key={`t-${index}`} />;
    case "tags":
      return <TagsTile tile={tile} index={index} key={`t-${index}`} />;
  }
}

/* ─── Main section ───────────────────────────────────────────────── */

export default function Brief({
  brief,
  slug,
}: {
  brief: CaseBrief;
  slug: string;
}) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18, margin: "0px 0px -8% 0px" });

  // Split narrative into words for per-word stagger.
  const words = useMemo(() => brief.narrative.split(/\s+/), [brief.narrative]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionStagger}
      className="brief-section relative py-20 border-t border-line-strong overflow-hidden"
    >
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        {/* Header strip — label · scrubbed hairline · count */}
        <div className="flex items-baseline gap-4 mb-10">
          <span className="mono text-ink-mute whitespace-nowrap">
            — {t.caseStudy.brief}
          </span>
          <motion.span
            aria-hidden
            variants={linePaint}
            className="flex-1 h-px bg-line-strong origin-left"
          />
          <span className="mono text-ink-mute whitespace-nowrap">
            {slug.toUpperCase()} · {String(brief.tiles.length).padStart(2, "0")}
          </span>
        </div>

        {/* Narrative — word-by-word reveal + animated underline */}
        <motion.div
          variants={wordStagger}
          className="brief-narrative-wrap max-w-[58ch] mb-14"
        >
          <h2
            className="text-ink h-break"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.18,
            }}
          >
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                style={{
                  overflow: "hidden",
                  display: "inline-block",
                  verticalAlign: "bottom",
                }}
              >
                <motion.span
                  variants={wordRise}
                  style={{ display: "inline-block" }}
                >
                  {w}
                </motion.span>
              </span>
            )).reduce<React.ReactNode[]>((acc, node, i) => {
              if (i > 0) acc.push(" ");
              acc.push(node);
              return acc;
            }, [])}
          </h2>
          <motion.div
            aria-hidden
            variants={underlinePaint}
            className="brief-narrative-rule mt-5 h-px bg-acid origin-left"
            style={{ width: "min(120px, 24%)" }}
          />
        </motion.div>

        {/* Tile grid — 12 cols on md+, single col on small. */}
        <div className="brief-grid grid grid-cols-1 md:grid-cols-12 gap-px bg-line-strong hairline-t hairline-b">
          {brief.tiles.map((tile, i) => renderTile(tile, i))}
        </div>
      </div>

      {/* Decorative crosshair, drifting */}
      <div
        aria-hidden
        className="brief-crosshair absolute right-6 top-6 text-ink-faint drift"
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
