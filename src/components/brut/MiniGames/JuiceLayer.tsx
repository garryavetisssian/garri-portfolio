"use client";

/**
 * JuiceLayer — the gamification overlay (zero assets). Subscribes to the shared
 * FX bus (fired from sfx.place/error/win) and renders:
 *   • a SCORE + COMBO HUD that ticks up,
 *   • a particle burst at the pointer on each placement,
 *   • floating "+points ×combo" popups,
 *   • a celebratory burst on win.
 * Scoring: base 50 × current combo; combo climbs per placement, resets on a
 * wrong/conflicting move. Reports the running score up so the victory screen
 * can show the final tally.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { subscribeFx } from "./sound";

const COLORS = ["#9B6BFF", "#06B6D4", "#FBBF24", "#34D399", "#FB7185", "#F2F0EA"];

interface Particle {
  dx: number;
  dy: number;
  rot: number;
  color: string;
  size: number;
}
interface Burst {
  id: number;
  x: number;
  y: number;
  parts: Particle[];
}
interface Pop {
  id: number;
  x: number;
  y: number;
  text: string;
  big: boolean;
}

let uid = 0;

function makeParticles(n: number, big = false): Particle[] {
  return Array.from({ length: n }, () => {
    const a = Math.random() * Math.PI * 2;
    const d = (big ? 90 : 46) + Math.random() * (big ? 150 : 70);
    return {
      dx: Math.cos(a) * d,
      dy: Math.sin(a) * d - (big ? 40 : 10),
      rot: (Math.random() - 0.5) * 360,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      size: (big ? 8 : 5) + Math.random() * (big ? 9 : 6),
    };
  });
}

export default function JuiceLayer({
  scoreVisible,
  onScoreChange,
}: {
  scoreVisible: boolean;
  onScoreChange?: (score: number) => void;
}) {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [pops, setPops] = useState<Pop[]>([]);

  const comboRef = useRef(0);
  const scoreRef = useRef(0);
  const ptr = useRef({ x: 0, y: 0 });
  const layerRef = useRef<HTMLDivElement>(null);
  const onScoreRef = useRef(onScoreChange);
  useEffect(() => {
    onScoreRef.current = onScoreChange;
  });

  useEffect(() => {
    function track(e: PointerEvent) {
      ptr.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("pointerdown", track, true);
    window.addEventListener("pointermove", track, true);
    return () => {
      window.removeEventListener("pointerdown", track, true);
      window.removeEventListener("pointermove", track, true);
    };
  }, []);

  useEffect(() => {
    return subscribeFx((t) => {
      const rect = layerRef.current?.getBoundingClientRect();
      const x = ptr.current.x - (rect?.left ?? 0);
      const y = ptr.current.y - (rect?.top ?? 0);

      if (t === "place") {
        comboRef.current += 1;
        setCombo(comboRef.current);
        const pts = 50 * comboRef.current;
        scoreRef.current += pts;
        setScore(scoreRef.current);
        onScoreRef.current?.(scoreRef.current);
        const id = uid++;
        setBursts((b) => [...b, { id, x, y, parts: makeParticles(14) }]);
        setPops((p) => [
          ...p,
          { id, x, y, text: `+${pts}${comboRef.current > 1 ? ` ×${comboRef.current}` : ""}`, big: false },
        ]);
        window.setTimeout(() => {
          setBursts((b) => b.filter((z) => z.id !== id));
          setPops((p) => p.filter((z) => z.id !== id));
        }, 950);
      } else if (t === "error") {
        comboRef.current = 0;
        setCombo(0);
      } else if (t === "reset") {
        comboRef.current = 0;
        scoreRef.current = 0;
        setCombo(0);
        setScore(0);
        onScoreRef.current?.(0);
        setBursts([]);
        setPops([]);
      } else if (t === "win") {
        const id = uid++;
        const cx = (rect?.width ?? 0) / 2;
        const cy = (rect?.height ?? 0) / 2.4;
        setBursts((b) => [...b, { id, x: cx, y: cy, parts: makeParticles(40, true) }]);
        window.setTimeout(() => setBursts((b) => b.filter((z) => z.id !== id)), 1400);
      }
    });
  }, []);

  return (
    <div ref={layerRef} className="absolute inset-0 overflow-hidden" style={{ pointerEvents: "none", zIndex: 30 }} aria-hidden>
      {/* SCORE + COMBO HUD */}
      <AnimatePresence>
        {scoreVisible && (
          <motion.div
            className="absolute left-1/2 flex flex-col items-center gap-1"
            style={{ top: 72, transform: "translateX(-50%)" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <motion.div
              key={score}
              initial={{ scale: 1 }}
              animate={{ scale: [1.18, 1] }}
              transition={{ duration: 0.18 }}
              className="mono tabular-nums"
              style={{ color: "var(--ink)", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.04em" }}
            >
              {score.toLocaleString()}
            </motion.div>
            <AnimatePresence>
              {combo >= 2 && (
                <motion.div
                  key={combo}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mono uppercase px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "var(--acid)",
                    color: "var(--paper)",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    boxShadow: `0 0 ${6 + combo}px var(--acid)`,
                  }}
                >
                  ×{combo} combo
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* particle bursts */}
      {bursts.map((b) => (
        <div key={b.id} className="absolute" style={{ left: b.x, top: b.y }}>
          {b.parts.map((p, i) => (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.4, rotate: p.rot }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: 2,
                background: p.color,
              }}
            />
          ))}
        </div>
      ))}

      {/* floating score popups */}
      {pops.map((p) => (
        <motion.div
          key={p.id}
          className="absolute mono"
          style={{ left: p.x, top: p.y, transform: "translate(-50%,-50%)", color: "var(--acid)", fontWeight: 700, fontSize: "0.95rem", textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
          initial={{ y: 0, opacity: 0, scale: 0.7 }}
          animate={{ y: -46, opacity: [0, 1, 1, 0], scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {p.text}
        </motion.div>
      ))}
    </div>
  );
}
