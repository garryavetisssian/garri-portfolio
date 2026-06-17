"use client";

/**
 * Confetti — a one-shot canvas confetti burst (no assets, no deps). Mount it to
 * fire; it animates for ~1.6s and then idles. Used on the victory screen.
 */

import { useEffect, useRef } from "react";

const COLORS = ["#9B6BFF", "#06B6D4", "#FBBF24", "#34D399", "#FB7185", "#F2F0EA"];

interface Bit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
}

export default function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const N = Math.min(300, Math.round(W / 2.2));
    const bits: Bit[] = Array.from({ length: N }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.45,
      y: H * 0.36 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 15,
      vy: -8 - Math.random() * 11,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.6,
      size: 6 + Math.random() * 10,
      color: COLORS[(Math.random() * COLORS.length) | 0],
    }));

    let raf = 0;
    let frame = 0;
    const MAX = 220; // ~3.6s at 60fps

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      frame++;
      for (const b of bits) {
        b.vy += 0.28; // gravity
        b.vx *= 0.99;
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vr;
        const alpha = Math.max(0, 1 - frame / MAX);
        ctx.globalAlpha = alpha;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * 0.6);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (frame < MAX) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ zIndex: 5 }}
      aria-hidden
    />
  );
}
