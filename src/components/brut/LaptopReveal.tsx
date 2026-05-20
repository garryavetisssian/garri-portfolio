"use client";

/**
 * LaptopReveal — scroll-driven 3D laptop with mouse-reactive line atmosphere.
 *
 * Background:
 *   A small set of long bezier curves tinted in the case's accent color. Each
 *   curve drifts at its own parallax depth as the cursor moves, so the field
 *   subtly reshapes itself under the pointer (cheap and CSS-composited — pure
 *   transform on five SVG <g>s).
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
 *   • Each background curve translates with its own depth/speed
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

/** Spring-damped 2D drift for a background curve. */
function useDrift(
  mx: MotionValue<number>,
  my: MotionValue<number>,
  sx: number,
  sy: number,
) {
  const xRaw = useTransform(mx, [-1, 1], [-sx, sx]);
  const yRaw = useTransform(my, [-1, 1], [-sy, sy]);
  const x = useSpring(xRaw, { stiffness: 55, damping: 19, mass: 0.5 });
  const y = useSpring(yRaw, { stiffness: 55, damping: 19, mass: 0.5 });
  return { x, y };
}

interface LaptopRevealProps {
  src: string;
  /** Hex / CSS color of the case's accent — tints the curves, the laptop's
   *  ambient glow, and the empty bars inside the screen. */
  color?: string;
}

export default function LaptopReveal({ src, color = "#9B6BFF" }: LaptopRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Mouse position, normalized −1..1 within the sticky bounds.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Five curves at different parallax depths. The bolder ones (higher sx/sy)
  // sit "closer" to the viewer in the depth illusion.
  const c1 = useDrift(mx, my, 36, 14);
  const c2 = useDrift(mx, my, 20, 18);
  const c3 = useDrift(mx, my, 44, 10);
  const c4 = useDrift(mx, my, 16, 20);
  const c5 = useDrift(mx, my, 28, 22);

  // Laptop parallax tilt.
  const tiltYRaw = useTransform(mx, [-1, 1], [-5, 5]);
  const tiltXRaw = useTransform(my, [-1, 1], [3, -3]);
  const tiltY = useSpring(tiltYRaw, { stiffness: 110, damping: 22 });
  const tiltX = useSpring(tiltXRaw, { stiffness: 110, damping: 22 });

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Entry
  const enterOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const enterY = useTransform(scrollYProgress, [0.0, 0.08], [40, 0]);
  const enterScale = useTransform(scrollYProgress, [0.0, 0.08], [0.92, 1]);

  // Lid hinge — multi-point curve gives ease-out with a small overshoot
  // at 0.42 before settling at -2°.
  const lidRotate = useTransform(
    scrollYProgress,
    [0.08, 0.22, 0.36, 0.42, 0.46],
    [-100, -55, -8, 3, -2],
  );
  const lidTransform = useLidTransform(lidRotate);

  // Screen content fade
  const screenOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const screenScale = useTransform(scrollYProgress, [0.3, 0.5], [1.06, 1]);

  // Power-on light wash across the lid as it opens
  const powerOnX = useTransform(scrollYProgress, [0.18, 0.42], ["-100%", "120%"]);
  const powerOnOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.24, 0.38, 0.42],
    [0, 0.7, 0.6, 0],
  );

  // Reflection sweep on screen
  const sweepX = useTransform(scrollYProgress, [0.35, 0.55], ["-110%", "110%"]);
  const sweepOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.5, 0.55],
    [0, 0.55, 0.55, 0],
  );

  // Ambient glow under the laptop
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Atmosphere fade in / out across the section
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
        {/* ── Mouse-reactive curve atmosphere ──────────────────────── */}
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
            <motion.path
              d="M-180,140 C200,40 500,210 800,80 C1000,20 1180,130 1380,80"
              stroke="var(--case-color)"
              strokeWidth="1.4"
              fill="none"
              opacity="0.26"
              vectorEffect="non-scaling-stroke"
              style={{ x: c1.x, y: c1.y }}
            />
            <motion.path
              d="M-180,260 C150,180 470,350 780,220 C980,160 1180,290 1380,230"
              stroke="var(--case-color)"
              strokeWidth="1.1"
              fill="none"
              opacity="0.20"
              vectorEffect="non-scaling-stroke"
              style={{ x: c2.x, y: c2.y }}
            />
            <motion.path
              d="M-180,410 C220,330 510,470 810,360 C1020,290 1190,440 1380,380"
              stroke="var(--case-color)"
              strokeWidth="1.6"
              fill="none"
              opacity="0.30"
              vectorEffect="non-scaling-stroke"
              style={{ x: c3.x, y: c3.y }}
            />
            <motion.path
              d="M-180,570 C260,490 520,640 820,520 C1020,460 1180,600 1380,540"
              stroke="var(--case-color)"
              strokeWidth="1.0"
              fill="none"
              opacity="0.18"
              vectorEffect="non-scaling-stroke"
              style={{ x: c4.x, y: c4.y }}
            />
            <motion.path
              d="M-180,700 C200,630 510,770 810,640 C1010,580 1180,720 1380,660"
              stroke="var(--case-color)"
              strokeWidth="1.3"
              fill="none"
              opacity="0.22"
              vectorEffect="non-scaling-stroke"
              style={{ x: c5.x, y: c5.y }}
            />
          </svg>
          {/* Vignette to focus the laptop */}
          <div className="atm-vignette" />
        </motion.div>

        {/* ── Laptop stage ────────────────────────────────────────── */}
        <motion.div
          className="laptop-stage"
          style={{
            opacity: enterOpacity,
            scale: enterScale,
            y: enterY,
          }}
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
                {/* Shell back — visible while closed */}
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
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
