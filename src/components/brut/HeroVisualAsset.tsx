"use client";

import { useEffect, useRef } from "react";

interface HeroVisualAssetProps {
  className?: string;
}

export default function HeroVisualAsset({ className = "" }: HeroVisualAssetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f1a3d");
      gradient.addColorStop(1, "#00f3ff");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawParticles = () => {
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(Date.now() * 0.001 + i) * canvas.width * 0.5) + canvas.width * 0.5;
        const y = (Math.cos(Date.now() * 0.0015 + i) * canvas.height * 0.5) + canvas.height * 0.5;
        const radius = Math.random() * 2 + 1;
        const alpha = Math.random() * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    };

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawBackground();
      drawParticles();
    };

    let frame = 0;
    const animate = () => {
      drawBackground();
      drawParticles();
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white/80 text-sm font-mono">
          <div>INTERACTIVE</div>
          <div className="mt-1">CANVAS</div>
        </div>
      </div>
    </div>
  );
}
