"use client";

import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Reveal-from direction: up (default), left, right, none. */
  from?: "up" | "left" | "right" | "fade";
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Prefer no animation when the user opts out of motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("revealed");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-section reveal-${from} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
