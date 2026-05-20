"use client";

/**
 * LaptopReveal — Apple-style scroll-driven 3D laptop that opens as the user
 * scrolls, revealing the case's cover image on the screen.
 *
 * Layout: a tall container (≈220vh) holds a `position: sticky` stage. As the
 * user scrolls through the container, scrollYProgress drives:
 *
 *   • 0.00 → 0.12  — laptop enters: opacity 0→1, scale 0.86→0.94
 *   • 0.12 → 0.58  — lid hinges open: rotateX(-102deg) → rotateX(-2deg)
 *   • 0.40 → 0.66  — screen content fades in, with a tiny zoom settle
 *   • 0.46 → 0.62  — a glossy reflection sweep crosses the screen
 *   • 0.66 → 0.92  — gentle "camera dolly" zoom into the laptop
 *
 * Reduced-motion fallback shows the laptop fully open with the cover image —
 * no scroll-driven animation.
 *
 * The laptop is built from layered DOM elements with CSS 3D transforms; no
 * canvas, no WebGL. transform-style: preserve-3d on the hinge node lets the
 * lid back (shell) and lid front (screen) live in separate planes inside the
 * same rotating parent.
 */

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

/* ─── Helpers ────────────────────────────────────────────────────── */

/** Build a transform string from individual MotionValues without wrapping
 *  every element in <motion.div style={...}>. */
function useLidTransform(rotateX: MotionValue<number>) {
  return useTransform(rotateX, (r) => `rotateX(${r}deg)`);
}

/* ─── Component ──────────────────────────────────────────────────── */

interface LaptopRevealProps {
  /** URL of the cover image to display on the laptop screen. */
  src: string;
  /** Optional eyebrow label rendered above the laptop. */
  label?: string;
  /** Optional caption rendered below. */
  caption?: string;
}

export default function LaptopReveal({ src, label, caption }: LaptopRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Track scroll through the container: 0 when its top hits the bottom of
  // the viewport, 1 when its bottom hits the top.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // ── Map progress → individual motion values ─────────────────────
  const enterOpacity = useTransform(scrollYProgress, [0.0, 0.12], [0, 1]);
  const enterScale = useTransform(scrollYProgress, [0.0, 0.12, 0.66, 0.92], [0.86, 0.94, 0.94, 1.06]);
  const enterY = useTransform(scrollYProgress, [0.0, 0.12], [40, 0]);

  // Lid hinge: starts almost-closed (-102°) and opens slightly past vertical (-2°)
  const lidRotate = useTransform(scrollYProgress, [0.12, 0.58], [-102, -2]);
  const lidTransform = useLidTransform(lidRotate);

  // Screen fade-in (the cover image inside the lid)
  const screenOpacity = useTransform(scrollYProgress, [0.4, 0.66], [0, 1]);
  const screenScale = useTransform(scrollYProgress, [0.4, 0.66], [1.08, 1]);

  // Reflection sweep
  const sweepX = useTransform(scrollYProgress, [0.46, 0.62], ["-110%", "110%"]);
  const sweepOpacity = useTransform(scrollYProgress, [0.46, 0.5, 0.58, 0.62], [0, 0.5, 0.5, 0]);

  // Captions
  const labelOpacity = useTransform(scrollYProgress, [0.05, 0.18, 0.78, 0.92], [0, 1, 1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.5, 0.66, 0.82, 0.94], [0, 1, 1, 0]);

  // Soft glow under the laptop blooms once the lid is mostly open
  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.66], [0, 0.7]);

  if (reduce) {
    // Reduced-motion: render a static, fully-open laptop with the cover image.
    return (
      <section className="laptop-reveal-static relative border-t border-line-strong bg-paper">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-24 flex flex-col items-center">
          {label && <p className="mono text-ink-mute mb-8">— {label}</p>}
          <div className="laptop-static-wrap" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="laptop-static-img" />
          </div>
          {caption && <p className="mono text-ink-mute mt-8">{caption}</p>}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="laptop-reveal relative border-t border-line-strong bg-paper"
      aria-label="Case study cover reveal"
    >
      {/* The container is tall — we scroll through it while the inner sticky
          stage stays pinned at viewport center. */}
      <div className="laptop-reveal-track">
        <div className="laptop-reveal-sticky">
          {/* Eyebrow label (fades in/out with scroll) */}
          <motion.div
            style={{ opacity: labelOpacity }}
            className="laptop-reveal-label mono text-ink-mute"
          >
            {label ?? "— Cover"}
          </motion.div>

          {/* 3D stage */}
          <motion.div
            className="laptop-stage"
            style={{
              opacity: enterOpacity,
              scale: enterScale,
              y: enterY,
            }}
          >
            <div className="laptop">
              {/* Lid — the part that hinges open */}
              <motion.div
                className="laptop-lid"
                style={{ transform: lidTransform }}
              >
                {/* Shell (back of the lid) — visible while closed */}
                <div className="laptop-lid-shell" aria-hidden>
                  <span className="laptop-lid-logo" />
                </div>

                {/* Screen face — visible while open */}
                <div className="laptop-lid-face">
                  <div className="laptop-bezel">
                    <span className="laptop-camera" aria-hidden />
                    <div className="laptop-screen">
                      <motion.div
                        className="laptop-screen-inner"
                        style={{
                          opacity: screenOpacity,
                          scale: screenScale,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt=""
                          draggable={false}
                          className="laptop-screen-img"
                        />
                      </motion.div>
                      {/* Reflection sweep — moves diagonally across the screen */}
                      <motion.div
                        className="laptop-screen-sweep"
                        style={{ x: sweepX, opacity: sweepOpacity }}
                        aria-hidden
                      />
                      {/* Static screen gloss */}
                      <div className="laptop-screen-gloss" aria-hidden />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Base / chassis */}
              <div className="laptop-base" aria-hidden>
                <div className="laptop-base-top">
                  <div className="laptop-base-keyboard" />
                  <div className="laptop-base-trackpad" />
                </div>
                <div className="laptop-base-front" />
              </div>

              {/* Bloom underneath */}
              <motion.div
                className="laptop-glow"
                style={{ opacity: glowOpacity }}
                aria-hidden
              />
            </div>
          </motion.div>

          {/* Caption (fades in once screen is visible) */}
          <motion.div
            style={{ opacity: captionOpacity }}
            className="laptop-reveal-caption mono text-ink-mute"
          >
            {caption ?? "Scroll to reveal"}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
