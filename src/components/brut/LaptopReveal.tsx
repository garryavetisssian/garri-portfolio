"use client";

/**
 * LaptopReveal — scroll-driven 3D laptop that opens to reveal the case cover.
 *
 * Choreography (scrollYProgress is computed across the whole section using
 * useScroll with offset ["start end", "end start"]):
 *
 *   • 0.00 → 0.08  — laptop fades + lifts in
 *   • 0.08 → 0.42  — lid hinges open from -100° to -2°
 *   • 0.30 → 0.50  — cover image fades in on the screen
 *   • 0.35 → 0.55  — glossy diagonal reflection sweeps across the screen
 *   • 0.55 → 1.00  — laptop holds; the section then naturally scrolls off
 *
 * Reduced-motion fallback shows the laptop fully open with the cover image —
 * no scroll-driven animation.
 */

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

function useLidTransform(rotateX: MotionValue<number>) {
  return useTransform(rotateX, (r) => `rotateX(${r}deg)`);
}

interface LaptopRevealProps {
  /** URL of the cover image to display on the laptop screen. */
  src: string;
}

export default function LaptopReveal({ src }: LaptopRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const enterOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const enterY = useTransform(scrollYProgress, [0.0, 0.08], [40, 0]);
  // Laptop holds its size after opening — no dolly-zoom (kept things busy and
  // contributed to the "empty tail" feel in user testing).
  const enterScale = useTransform(scrollYProgress, [0.0, 0.08], [0.92, 1]);

  // Lid hinge — opens early and quickly so user sees the reveal during scroll
  const lidRotate = useTransform(scrollYProgress, [0.08, 0.42], [-100, -2]);
  const lidTransform = useLidTransform(lidRotate);

  // Screen content fade
  const screenOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const screenScale = useTransform(scrollYProgress, [0.3, 0.5], [1.06, 1]);

  // Reflection sweep across screen
  const sweepX = useTransform(scrollYProgress, [0.35, 0.55], ["-110%", "110%"]);
  const sweepOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.5, 0.55],
    [0, 0.5, 0.5, 0],
  );

  // Bloom under the laptop, fades in once mostly open
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 0.6]);

  if (reduce) {
    return (
      <section className="laptop-reveal-static relative border-t border-line-strong bg-paper">
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
      ref={containerRef}
      className="laptop-reveal relative border-t border-line-strong bg-paper"
      aria-hidden
    >
      <div className="laptop-reveal-sticky">
        <motion.div
          className="laptop-stage"
          style={{
            opacity: enterOpacity,
            scale: enterScale,
            y: enterY,
          }}
        >
          <div className="laptop">
            <motion.div
              className="laptop-lid"
              style={{ transform: lidTransform }}
            >
              {/* Shell (back) — visible while closed */}
              <div className="laptop-lid-shell" aria-hidden>
                <span className="laptop-lid-logo" />
              </div>

              {/* Front face — screen visible while open */}
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

            {/* Base / chassis */}
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
      </div>
    </section>
  );
}
