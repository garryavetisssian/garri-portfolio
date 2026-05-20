"use client";

/**
 * LaptopReveal — scroll-driven 3D laptop with mouse-reactive atmosphere.
 *
 * Each case feeds its own accent color (sampled from the cover image) into
 * the section via a CSS variable. The color tints:
 *   • A large blurred gradient blob that follows the cursor (spring-damped)
 *   • A secondary blob that drifts on its own ambient loop
 *   • The ambient glow under the laptop
 *   • A "power-on" light wash that sweeps the screen as the lid opens
 *   • The faint logo dot on the laptop's shell
 *
 * Scroll choreography (scrollYProgress 0 → 1 across the section):
 *   0.00 → 0.08  laptop fades + lifts into place
 *   0.08 → 0.46  lid hinges open, with a tiny overshoot at the end for snap
 *   0.18 → 0.42  power-on light wash sweeps across the lid
 *   0.30 → 0.50  cover image fades in on the screen
 *   0.35 → 0.55  glossy reflection sweep across the screen
 *   0.30 → 0.50  ambient glow under the laptop blooms up
 *
 * Mouse interaction (independent of scroll):
 *   • cursor position drives the main background blob via spring
 *   • cursor position adds a subtle parallax tilt (≤5°) to the whole laptop
 *   • cursor leaves → both decay back to neutral
 *
 * Reduced-motion: static fully-open laptop, no scroll or mouse animation.
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

interface LaptopRevealProps {
  src: string;
  /** Hex / CSS color of the case's accent — used to tint the atmosphere
   *  and the laptop's ambient glow. Falls back to the global acid. */
  color?: string;
}

export default function LaptopReveal({ src, color = "#9B6BFF" }: LaptopRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* ── Mouse position, normalized −1 .. 1 around sticky center ───── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring-damped translation of the cursor-following blob
  const blobXRaw = useTransform(mx, [-1, 1], [-300, 300]);
  const blobYRaw = useTransform(my, [-1, 1], [-200, 200]);
  const blobX = useSpring(blobXRaw, { stiffness: 55, damping: 18, mass: 0.5 });
  const blobY = useSpring(blobYRaw, { stiffness: 55, damping: 18, mass: 0.5 });

  // Parallax tilt of the whole laptop (clamped small — depth without nausea)
  const tiltYRaw = useTransform(mx, [-1, 1], [-5, 5]);   // rotateY (left↔right)
  const tiltXRaw = useTransform(my, [-1, 1], [3, -3]);   // rotateX (up↔down)
  const tiltY = useSpring(tiltYRaw, { stiffness: 110, damping: 22 });
  const tiltX = useSpring(tiltXRaw, { stiffness: 110, damping: 22 });

  // Mouse tracking — scoped to the sticky element so the (−1..1) range maps
  // cleanly to what the user actually sees while the section is pinned.
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

  // Entry
  const enterOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const enterY = useTransform(scrollYProgress, [0.0, 0.08], [40, 0]);
  const enterScale = useTransform(scrollYProgress, [0.0, 0.08], [0.92, 1]);

  // Lid hinge — multi-point curve gives ease-out with a small overshoot
  // around 0.42 ("snap") before settling at -2°.
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

  // Ambient glow under the laptop, in the case color
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Background blob pulses larger at the climax of the open animation
  const bgPulse = useTransform(scrollYProgress, [0.3, 0.42, 0.6], [0.85, 1.3, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0.0, 0.2, 0.7, 1.0], [0.0, 1.0, 1.0, 0.4]);

  /* ── Reduced-motion fallback ────────────────────────────────────── */
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
        {/* Mouse-reactive atmosphere — lives inside the sticky so it stays
            pinned along with the laptop. */}
        <motion.div
          className="laptop-reveal-atmosphere"
          style={{ opacity: bgOpacity }}
          aria-hidden
        >
          <motion.div
            className="atm-blob-main"
            style={{ x: blobX, y: blobY, scale: bgPulse }}
          />
          <div className="atm-blob-drift" />
          <div className="atm-grid" />
          <div className="atm-vignette" />
        </motion.div>

        <motion.div
          className="laptop-stage"
          style={{
            opacity: enterOpacity,
            scale: enterScale,
            y: enterY,
          }}
        >
          {/* Parallax tilt wrap — the whole laptop reacts to cursor */}
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
                        {/* Crossfade when cover changes (e.g., tab swap) */}
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

                      {/* Power-on light wash — sweeps across the screen as
                          the lid opens, tinted with the case color */}
                      <motion.div
                        className="laptop-screen-poweron"
                        style={{ x: powerOnX, opacity: powerOnOpacity }}
                        aria-hidden
                      />

                      {/* Glossy reflection sweep */}
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
                  <div className="laptop-base-keyboard" />
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
