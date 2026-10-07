"use client";

import { useEffect, useRef } from "react";

/**
 * Hairline geometric primitives drifting across the entire viewport.
 * They idle on slow Lissajous-ish orbits around an anchor point;
 * a cursor within ~180px pushes them away with a spring-back force.
 *
 * Stays out of the way: fixed, pointer-events:none, z-index 0,
 * paused under prefers-reduced-motion or when the tab is hidden.
 *
 * Aesthetic: typographic marginalia, brutalist editorial — circles,
 * squares, plus, X, and dots in hairline ink + occasional accent.
 */

type ShapeType = "circle" | "square" | "plus" | "x" | "dot" | "dash";

interface Shape {
  type: ShapeType;
  x: number;
  y: number;
  ox: number; // anchor
  oy: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  accent: boolean;
  alpha: number;
  driftPhase: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftAmp: number;
}

const REPEL_RADIUS = 180;
const REPEL_STRENGTH = 0.7;
const SPRING = 0.022;
const DAMPING = 0.86;
const SHAPE_TYPES: ShapeType[] = ["circle", "square", "plus", "x", "dot", "dash"];

export default function GeometricField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const shapesRef = useRef<Shape[]>([]);
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastTime = performance.now();

    const seed = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      // Roughly one shape per 28k px² → ~55 on a 1440×1024 viewport
      const count = Math.max(24, Math.min(70, Math.floor((W * H) / 28000)));
      const shapes: Shape[] = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const isAccent = Math.random() < 0.18;
        shapes.push({
          type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
          x,
          y,
          ox: x,
          oy: y,
          vx: 0,
          vy: 0,
          size: 4 + Math.random() * 10,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.004,
          accent: isAccent,
          alpha: 0.35 + Math.random() * 0.5,
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeedX: 0.0004 + Math.random() * 0.0008,
          driftSpeedY: 0.0004 + Math.random() * 0.0008,
          driftAmp: 4 + Math.random() * 6,
        });
      }
      shapesRef.current = shapes;
    };

    const resize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dprRef.current;
      canvas.height = h * dprRef.current;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
      seed();
    };

    const drawShape = (s: Shape) => {
      const inkBase = s.accent
        ? `rgba(155, 107, 255, ${s.alpha})`
        : `rgba(242, 240, 234, ${s.alpha * 0.4})`;
      ctx.strokeStyle = inkBase;
      ctx.fillStyle = inkBase;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      const h = s.size;

      switch (s.type) {
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, h, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case "square":
          ctx.strokeRect(-h / 2, -h / 2, h, h);
          break;
        case "plus":
          ctx.beginPath();
          ctx.moveTo(-h, 0);
          ctx.lineTo(h, 0);
          ctx.moveTo(0, -h);
          ctx.lineTo(0, h);
          ctx.stroke();
          break;
        case "x":
          ctx.beginPath();
          ctx.moveTo(-h * 0.8, -h * 0.8);
          ctx.lineTo(h * 0.8, h * 0.8);
          ctx.moveTo(h * 0.8, -h * 0.8);
          ctx.lineTo(-h * 0.8, h * 0.8);
          ctx.stroke();
          break;
        case "dot":
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(1.2, h * 0.25), 0, Math.PI * 2);
          ctx.fill();
          break;
        case "dash":
          ctx.beginPath();
          ctx.moveTo(-h, 0);
          ctx.lineTo(h, 0);
          ctx.stroke();
          break;
      }
      ctx.restore();
    };

    const tick = (now: number) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const dt = Math.min(now - lastTime, 32); // clamp big gaps
      lastTime = now;

      ctx.clearRect(0, 0, W, H);

      const m = mouseRef.current;
      const shapes = shapesRef.current;

      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];

        // Idle drift around anchor (slow Lissajous)
        const dx0 = Math.sin(now * s.driftSpeedX + s.driftPhase) * s.driftAmp;
        const dy0 = Math.cos(now * s.driftSpeedY + s.driftPhase * 1.3) * s.driftAmp;
        const tx = s.ox + dx0;
        const ty = s.oy + dy0;

        // Cursor repel
        if (m.active) {
          const ddx = s.x - m.x;
          const ddy = s.y - m.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 1) {
            const d = Math.sqrt(d2);
            const force = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH;
            s.vx += (ddx / d) * force * 4;
            s.vy += (ddy / d) * force * 4;
          }
        }

        // Spring toward drifting anchor
        s.vx += (tx - s.x) * SPRING;
        s.vy += (ty - s.y) * SPRING;

        // Damping + integrate (frame-rate independent-ish via dt scale)
        const scale = dt / 16.67;
        s.vx *= Math.pow(DAMPING, scale);
        s.vy *= Math.pow(DAMPING, scale);
        s.x += s.vx * scale;
        s.y += s.vy * scale;
        s.rotation += s.rotSpeed * scale;

        drawShape(s);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onPointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    resize();

    if (reduceMotion) {
      // Render one static frame, no listeners
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      shapesRef.current.forEach((s) => drawShape(s));
      return;
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0"
      style={{ touchAction: "none" }}
    />
  );
}
