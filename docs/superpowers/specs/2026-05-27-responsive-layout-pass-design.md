# Responsive Layout Pass — Design

**Date:** 2026-05-27
**Status:** Approved

## Problem

On narrow/tablet viewports the case-study `Brief` section breaks: tiles squish 2-up
with clipped text (e.g. "univers[e]" cut off, "Mini-games" overflowing). The same
class of bug appears in a few sibling components. Root causes, confirmed by a
component sweep and a `globals.css` audit:

1. **`Brief.tsx`** applies inline `gridColumn: span N` at *every* breakpoint. On the
   mobile base grid (`grid-cols-1`) spanning 4–6 columns makes CSS invent broken
   implicit columns → squished cells. Because `<html>/<body>` use `overflow-x: clip`,
   the overflow does not scroll — it silently clips text.
2. **Brief tiles lack the codebase's text-break helpers** (`overflow-wrap/word-break/
   hyphens`), so long words don't wrap.
3. **No `.brief-*` CSS rules exist** at all, and `globals.css` has **no tablet
   breakpoint** — it jumps from base → 768px.
4. Sibling components carry the same shape of bug (see below).

## Decisions

- **Scope:** full responsive pass (Brief + all flagged siblings + tablet breakpoint).
- **Grid tiers:** 3-tier — stacked (mobile) → 6-col (≥640px) → 12-col (≥768px).
- **Verification:** code-level only (no browser run this pass).

## Approach

### 1. Data-driven spans → CSS variables (Brief)

Replace inline `gridColumn: span N` with CSS custom properties per tile and move the
span logic into real rules in `globals.css`:

```css
.brief-grid { grid-template-columns: 1fr; }                 /* mobile: stacked   */
.brief-tile { min-width: 0;                                  /* allow shrink      */
  overflow-wrap: break-word; word-break: normal;
  hyphens: auto; -webkit-hyphens: auto; }
@media (min-width: 640px) {
  .brief-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .brief-tile { grid-column: span var(--span-t); }           /* tablet: 6-col     */
}
@media (min-width: 768px) {
  .brief-grid { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  .brief-tile { grid-column: span var(--span-d); }           /* desktop: 12-col   */
}
```

`TileShell` sets `style={{ "--span-d": span, "--span-t": tabletSpan }}` where
`tabletSpan = clamp(round(span/2), 1, 6)`. Span mapping (12→6 col):
`3→2, 4→2, 5→3, 6→3, 8→4, 12→6`.

Remove the `grid-cols-1 md:grid-cols-12` utility classes from the wrapper (the
`.brief-grid` rule now owns template-columns). Keep `gap-px`, hairlines, and the
`.brief-tile` class on `MagneticTile`.

The text-break helper on `.brief-tile` cascades to the quote `<blockquote>`, label
value, stat label, and tags — so long words wrap instead of clipping.

### 2. CaseStudyView metrics grid (HIGH)

`gridTemplateColumns: repeat(min(N,4), 1fr)` locks 4-up on mobile. Move to a
responsive class: `grid-cols-2` on mobile, full `repeat(N,1fr)` at `md`. 4 metrics →
2×2 on phones, 1×4 on desktop. 1–2 metrics stay a single row everywhere.

### 3. CaseStudyView tab strip (HIGH)

`min-w-[200px]` forces a horizontal scrollbar on phones. Change to
`min-w-[clamp(150px,42vw,200px)]` so ~2 tabs fit a phone width. Keep `overflow-x-auto`
as the safety net.

### 4. MyRole role bar (MED)

The fixed `minmax(110px,1.2fr) … minmax(64px,auto)` track crushes the 10-segment bar
< 375px. Stack on mobile (label above a full-width bar); apply the 3-column track only
at `≥640px`.

### 5. ChatPanel width (MED)

`width: min(100vw, 420px)` → `min(100%, 420px)`. `100vw` includes the scrollbar gutter
and can nudge horizontal overflow on mobile.

## Out of scope (YAGNI)

Marquee (clipped by design), Footer/Hero clamp marks (floor-protected), Header nav
(low risk). Flagged LOW/no-issue by the audit.

## Files touched

- `src/components/brut/Brief.tsx` — span vars, drop inline gridColumn + wrapper cols
- `src/app/globals.css` — new `.brief-grid`/`.brief-tile` rules + 640px tablet tier
- `src/components/brut/CaseStudyView.tsx` — metrics grid + tab min-width
- `src/components/brut/MyRole.tsx` — mobile-stacked role bar
- `src/components/brut/ChatPanel.tsx` — 100vw → 100%

## Success criteria

- No clipped/overflowing text in Brief tiles at 375 / 640 / 768 / 1280px (by inspection).
- Stat tiles read 3-up (tablet) and respect author spans (desktop); no implicit columns.
- Metrics never wider than 2-up on phones.
- Tab strip needs no horizontal scroll at typical phone widths.
- `next build` / typecheck passes; no behavior change on desktop.
