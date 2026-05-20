"use client";

/**
 * LaptopReveal — scroll-driven 3D laptop with cursor-deforming curves.
 *
 * Background pattern:
 *   Five thin SVG curves tinted in the case accent color. Each curve is
 *   rebuilt every frame from a chain of 11 anchor points. The cursor exerts
 *   a repulsive force on each anchor: anchors close to the cursor get pushed
 *   away with a smoothstep falloff. The curve visibly bends around the
 *   pointer — like a magnetic field disturbance — and returns to rest when
 *   the cursor leaves. Spring-damping on the cursor coordinates keeps the
 *   deformation smooth.
 *
 * Scroll choreography (scrollYProgress 0 → 1 across the section):
 *   0.00 → 0.08  laptop fades + lifts in
 *   0.08 → 0.46  lid hinges open with a small overshoot at 0.42 for snap
 *   0.18 → 0.42  power-on light wash sweeps across the lid (case color)
 *   0.30 → 0.50  cover image fades in on the screen
 *   0.35 → 0.55  glossy reflection sweep
 *   0.30 → 0.50  ambient glow under the laptop blooms (case color)
 *
 * Mouse:
 *   • Cursor position drives the curve deformation (above)
 *   • Whole laptop tilts up to ±5°/±3° toward the cursor
 *
 * Reduced-motion: static fully-open laptop with cover, no animations.
 */

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";

function useLidTransform(rotateX: MotionValue<number>) {
  return useTransform(rotateX, (r) => `rotateX(${r}deg)`);
}

interface CurveConfig {
  /** Resting y position in viewBox units (0–800). */
  y: number;
  /** Sinusoidal wave amplitude added to each anchor for natural variation. */
  amp: number;
  /** Phase offset for the rest-wave so curves don't all wiggle in sync. */
  phase: number;
  /** Stroke width (in viewBox units; non-scaling-stroke keeps it constant). */
  sw: number;
  opacity: number;
  /** Maximum distance an anchor is pushed when the cursor sits on top of it. */
  strength: number;
  /** Radius of cursor influence — beyond this, the anchor doesn't move. */
  falloff: number;
}

const CURVES: CurveConfig[] = [
  { y: 140, amp: 22, phase: 0.0, sw: 1.4, opacity: 0.26, strength: 95, falloff: 270 },
  { y: 270, amp: 18, phase: 1.2, sw: 1.0, opacity: 0.18, strength: 70, falloff: 240 },
  { y: 410, amp: 32, phase: 2.4, sw: 1.6, opacity: 0.30, strength: 115, falloff: 300 },
  { y: 560, amp: 20, phase: 3.6, sw: 1.0, opacity: 0.18, strength: 80, falloff: 260 },
  { y: 690, amp: 26, phase: 4.8, sw: 1.3, opacity: 0.22, strength: 95, falloff: 280 },
];

const ANCHORS = 11;
const X_START = -180;
const X_END = 1380;

/**
 * Build the SVG `d` attribute for one curve, given the cursor's viewBox
 * coordinates. Each of the 11 anchor points sits at its resting position
 * plus a small natural wave; if the cursor is within the curve's falloff
 * radius, the anchor is shoved away from it with a smoothstep ease.
 *
 * The resulting points are stitched together with cubic-bezier segments
 * whose control points sit midway in x — this produces smooth, flowing
 * curves without sharp corners between anchors.
 */
function buildCurvePath(cfg: CurveConfig, cx: number, cy: number): string {
  const { y, amp, phase, strength, falloff } = cfg;
  const pts: Array<[number, number]> = [];

  for (let i = 0; i < ANCHORS; i++) {
    const baseX = X_START + (i / (ANCHORS - 1)) * (X_END - X_START);
    const baseY = y + Math.sin(i * 0.95 + phase) * amp;

    const dx = baseX - cx;
    const dy = baseY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let nx = baseX;
    let ny = baseY;
    if (dist < falloff && dist > 0.001) {
      const t = 1 - dist / falloff;
      const ease = t * t * (3 - 2 * t); // smoothstep
      nx = baseX + (dx / dist) * ease * strength;
      ny = baseY + (dy / dist) * ease * strength;
    }
    pts.push([nx, ny]);
  }

  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const midX = (x0 + x1) / 2;
    d += ` C${midX.toFixed(1)},${y0.toFixed(1)} ${midX.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
  }
  return d;
}

interface LaptopRevealProps {
  src: string;
  /** Hex / CSS color of the case's accent — tints the curves, the screen
   *  letterbox, and the laptop's ambient glow. */
  color?: string;
}

export default function LaptopReveal({ src, color = "#9B6BFF" }: LaptopRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* ── Cursor position normalized to −1..1 inside the sticky bounds ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  /* Cursor expressed in SVG viewBox space, spring-smoothed. At rest (mouse
     leaves), it animates back toward the section center. */
  const cxRaw = useTransform(mx, [-1, 1], [0, 1200]);
  const cyRaw = useTransform(my, [-1, 1], [0, 800]);
  const cx = useSpring(cxRaw, { stiffness: 65, damping: 16, mass: 0.45 });
  const cy = useSpring(cyRaw, { stiffness: 65, damping: 16, mass: 0.45 });

  /* Reactive `d` strings — one per curve, recomputed every frame from the
     springed cursor. (useTransform's array form re-runs whenever any input
     motion value changes.) */
  const d1 = useTransform([cx, cy], ([x, y]) => buildCurvePath(CURVES[0], x as number, y as number));
  const d2 = useTransform([cx, cy], ([x, y]) => buildCurvePath(CURVES[1], x as number, y as number));
  const d3 = useTransform([cx, cy], ([x, y]) => buildCurvePath(CURVES[2], x as number, y as number));
  const d4 = useTransform([cx, cy], ([x, y]) => buildCurvePath(CURVES[3], x as number, y as number));
  const d5 = useTransform([cx, cy], ([x, y]) => buildCurvePath(CURVES[4], x as number, y as number));

  /* Laptop tilt — independent springs, gentler clamp than the curves. */
  const tiltYRaw = useTransform(mx, [-1, 1], [-5, 5]);
  const tiltXRaw = useTransform(my, [-1, 1], [3, -3]);
  const tiltY = useSpring(tiltYRaw, { stiffness: 110, damping: 22 });
  const tiltX = useSpring(tiltXRaw, { stiffness: 110, damping: 22 });

  /* Mouse tracking on the sticky bounds. */
  useEffect(() => {
    if (reduce) return;
    const el = stickyRef.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
    };
    const handleLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener("pointermove", handleMove, { passive: true });
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [mx, my, reduce]);

  /* ── Scroll progress ────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const enterOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const enterY = useTransform(scrollYProgress, [0.0, 0.08], [40, 0]);
  const enterScale = useTransform(scrollYProgress, [0.0, 0.08], [0.92, 1]);

  const lidRotate = useTransform(
    scrollYProgress,
    [0.08, 0.22, 0.36, 0.42, 0.46],
    [-100, -55, -8, 3, -2],
  );
  const lidTransform = useLidTransform(lidRotate);

  const screenOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const screenScale = useTransform(scrollYProgress, [0.3, 0.5], [1.06, 1]);

  const powerOnX = useTransform(scrollYProgress, [0.18, 0.42], ["-100%", "120%"]);
  const powerOnOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.24, 0.38, 0.42],
    [0, 0.7, 0.6, 0],
  );

  const sweepX = useTransform(scrollYProgress, [0.35, 0.55], ["-110%", "110%"]);
  const sweepOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.5, 0.55],
    [0, 0.55, 0.55, 0],
  );

  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const bgOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.7, 1.0],
    [0.0, 1.0, 1.0, 0.4],
  );

  if (reduce) {
    return (
      <section
        className="laptop-reveal-static relative border-t border-line-strong bg-paper"
        style={{ ["--case-color" as string]: color }}
      >
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-20 flex flex-col items-center">
          <div className="laptop-static-wrap" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="laptop-static-img" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="laptop-reveal relative border-t border-line-strong bg-paper"
      style={{ ["--case-color" as string]: color }}
      aria-hidden
    >
      <div ref={stickyRef} className="laptop-reveal-sticky">
        {/* ── Cursor-deforming curve atmosphere ─────────────────────── */}
        <motion.div
          className="laptop-reveal-atmosphere"
          style={{ opacity: bgOpacity }}
          aria-hidden
        >
          <svg
            className="atm-curves"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[d1, d2, d3, d4, d5].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="var(--case-color)"
                strokeWidth={CURVES[i].sw}
                opacity={CURVES[i].opacity}
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <div className="atm-vignette" />
        </motion.div>

        {/* ── Laptop stage ────────────────────────────────────────── */}
        <motion.div
          className="laptop-stage"
          style={{ opacity: enterOpacity, scale: enterScale, y: enterY }}
        >
          <motion.div
            className="laptop-tilt-wrap"
            style={{ rotateY: tiltY, rotateX: tiltX }}
          >
            <div className="laptop">
              <motion.div
                className="laptop-lid"
                style={{ transform: lidTransform }}
              >
                <div className="laptop-lid-shell" aria-hidden>
                  <span className="laptop-lid-logo" />
                </div>

                <div className="laptop-lid-face">
                  <div className="laptop-bezel">
                    <span className="laptop-camera" aria-hidden />
                    <div className="laptop-screen">
                      <motion.div
                        className="laptop-screen-inner"
                        style={{ opacity: screenOpacity, scale: screenScale }}
                      >
                        <AnimatePresence initial={false}>
                          <motion.img
                            key={src}
                            src={src}
                            alt=""
                            draggable={false}
                            className="laptop-screen-img"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </AnimatePresence>
                      </motion.div>

                      <motion.div
                        className="laptop-screen-poweron"
                        style={{ x: powerOnX, opacity: powerOnOpacity }}
                        aria-hidden
                      />
                      <motion.div
                        className="laptop-screen-sweep"
                        style={{ x: sweepX, opacity: sweepOpacity }}
                        aria-hidden
                      />
                      <div className="laptop-screen-gloss" aria-hidden />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="laptop-base" aria-hidden>
                <div className="laptop-base-top">
                  <div className="laptop-base-speaker laptop-base-speaker-l" />
                  <div className="laptop-base-keyboard" />
                  <div className="laptop-base-speaker laptop-base-speaker-r" />
                  <div className="laptop-base-trackpad" />
                </div>
                <div className="laptop-base-front" />
              </div>

              <motion.div
                className="laptop-glow"
                style={{ opacity: glowOpacity }}
                aria-hidden
              >
                <span className="laptop-glow-halo" aria-hidden />
                <span className="laptop-glow-core" aria-hidden />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
