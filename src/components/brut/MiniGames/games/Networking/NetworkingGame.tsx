"use client";

/**
 * NetworkingGame — the playable GAME screen for the Networking puzzle.
 *
 * Free canvas: nodes are placed on a circle (fixed layout), edges are drawn in
 * an SVG overlay, and the player clicks two nodes to toggle a connection. Owns
 * the live puzzle, edge set, timer, hints, and the in-game toolbar.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { generateNetworkPuzzle } from "./generator";
import { formatTime } from "../../shared";
import {
  HINTS_PER_GAME,
  edgeKey,
  type Difficulty,
  type Edge,
  type NetPuzzle,
} from "./types";

interface Props {
  difficulty: Difficulty;
  onWin: (seconds: number) => void;
  onExit: () => void;
}

interface Point {
  x: number;
  y: number;
}

// Circle layout in a 0..100 viewBox (matches the SVG + percentage-positioned nodes).
function layout(n: number): Point[] {
  const cx = 50;
  const cy = 50;
  const r = 37;
  return Array.from({ length: n }, (_, i) => {
    const theta = (-90 + (i * 360) / n) * (Math.PI / 180);
    return { x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) };
  });
}

export default function NetworkingGame({ difficulty, onWin, onExit }: Props) {
  const { t } = useLanguage();
  const g = t.miniGames;
  const net = g.networking;

  const [puzzle, setPuzzle] = useState<NetPuzzle>(() => generateNetworkPuzzle(difficulty));
  const [edges, setEdges] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const [hintsLeft, setHintsLeft] = useState(HINTS_PER_GAME);
  const [elapsed, setElapsed] = useState(0);
  const [won, setWon] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const elapsedRef = useRef(0);
  const onWinRef = useRef(onWin);

  useEffect(() => {
    onWinRef.current = onWin;
  });

  useEffect(() => {
    if (won) return;
    const id = window.setInterval(() => {
      elapsedRef.current += 1;
      setElapsed(elapsedRef.current);
    }, 1000);
    return () => window.clearInterval(id);
  }, [won]);

  const points = useMemo(() => layout(puzzle.nodes.length), [puzzle.nodes.length]);
  const nodeById = puzzle.nodes;

  function degreeOf(set: Set<string>, node: number): number {
    let d = 0;
    for (let other = 0; other < nodeById.length; other++) {
      if (other !== node && set.has(edgeKey(node, other))) d++;
    }
    return d;
  }

  function isSameCompanyEdge(key: string): boolean {
    const [a, b] = key.split("-").map(Number);
    return nodeById[a].company === nodeById[b].company;
  }

  function nodeViolation(set: Set<string>, node: number): boolean {
    if (degreeOf(set, node) > nodeById[node].degree) return true;
    for (let other = 0; other < nodeById.length; other++) {
      if (other !== node && set.has(edgeKey(node, other)) && isSameCompanyEdge(edgeKey(node, other)))
        return true;
    }
    return false;
  }

  function isWin(set: Set<string>): boolean {
    // No same-company edges.
    for (const key of set) if (isSameCompanyEdge(key)) return false;
    // Exact degree for every node.
    for (let i = 0; i < nodeById.length; i++) {
      if (degreeOf(set, i) !== nodeById[i].degree) return false;
    }
    // All must-connect present.
    for (const [a, b] of puzzle.mustConnect) if (!set.has(edgeKey(a, b))) return false;
    // No blocked present.
    for (const [a, b] of puzzle.blocked) if (set.has(edgeKey(a, b))) return false;
    return true;
  }

  function commit(next: Set<string>) {
    setEdges(next);
    if (!won && isWin(next)) {
      setWon(true);
      onWinRef.current(elapsedRef.current);
    }
  }

  function toggleEdge(a: number, b: number) {
    if (a === b) return;
    const key = edgeKey(a, b);
    const next = new Set(edges);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    commit(next);
  }

  function handleNodeClick(id: number) {
    if (selected === null) {
      setSelected(id);
    } else if (selected === id) {
      setSelected(null);
    } else {
      toggleEdge(selected, id);
      setSelected(null);
    }
  }

  function handleHint() {
    if (hintsLeft <= 0 || won) return;
    const solutionKeys = puzzle.solution.map(([a, b]) => edgeKey(a, b));
    const solutionSet = new Set(solutionKeys);

    // Prefer adding a missing correct edge.
    const missing = solutionKeys.find((k) => !edges.has(k));
    if (missing) {
      const next = new Set(edges);
      next.add(missing);
      setHintsLeft((h) => h - 1);
      setSelected(null);
      commit(next);
      return;
    }
    // Otherwise remove an incorrect edge.
    const wrong = [...edges].find((k) => !solutionSet.has(k));
    if (wrong) {
      const next = new Set(edges);
      next.delete(wrong);
      setHintsLeft((h) => h - 1);
      setSelected(null);
      commit(next);
    }
  }

  function changePuzzle() {
    setPuzzle(generateNetworkPuzzle(difficulty));
    setEdges(new Set());
    setSelected(null);
    setHintsLeft(HINTS_PER_GAME);
    setWon(false);
    elapsedRef.current = 0;
    setElapsed(0);
    setShowRules(false);
  }

  const label = (id: number) => nodeById[id]?.label ?? "?";
  const pairText = (tpl: string, e: Edge) =>
    tpl.replace("{a}", label(e[0])).replace("{b}", label(e[1]));

  const toolbarBtn =
    "mono uppercase px-3 py-2 border transition-colors duration-200 disabled:opacity-40";
  const toolbarStyle: React.CSSProperties = {
    borderColor: "var(--line-strong)",
    color: "var(--ink)",
    background: "transparent",
    fontSize: "0.7rem",
    letterSpacing: "0.06em",
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={changePuzzle} className={toolbarBtn} style={toolbarStyle}>
          {g.changePuzzle}
        </button>
        <button type="button" onClick={() => setShowRules(true)} className={toolbarBtn} style={toolbarStyle}>
          {g.rules}
        </button>
        <button
          type="button"
          onClick={handleHint}
          disabled={hintsLeft <= 0}
          className={toolbarBtn}
          style={toolbarStyle}
        >
          {g.hint} ({hintsLeft})
        </button>
        <button type="button" onClick={onExit} className={toolbarBtn} style={toolbarStyle}>
          {g.exit}
        </button>
        <span
          className="mono ml-auto tabular-nums"
          style={{ color: "var(--ink-mute)", fontSize: "0.8rem", letterSpacing: "0.06em" }}
        >
          {g.timeLabel} {formatTime(elapsed)}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(220px,300px)]">
        {/* Canvas */}
        <div className="min-w-0">
          <div
            className="relative mx-auto w-full"
            style={{
              maxWidth: 520,
              aspectRatio: "1 / 1",
              background: "var(--paper)",
              border: "1px solid var(--line-strong)",
            }}
          >
            {/* Edges */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              style={{ pointerEvents: "none" }}
              aria-hidden
            >
              {[...edges].map((key) => {
                const [a, b] = key.split("-").map(Number);
                const pa = points[a];
                const pb = points[b];
                const bad = isSameCompanyEdge(key);
                return (
                  <line
                    key={key}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    stroke={bad ? "#ef4444" : "var(--ink)"}
                    strokeWidth={1.2}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {puzzle.nodes.map((node) => {
              const p = points[node.id];
              const cur = degreeOf(edges, node.id);
              const violated = nodeViolation(edges, node.id);
              const satisfied = !violated && cur === node.degree;
              const isSel = selected === node.id;
              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => handleNodeClick(node.id)}
                  whileTap={{ scale: 0.92 }}
                  className="absolute flex flex-col items-center justify-center select-none"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: "clamp(44px, 13vw, 56px)",
                    height: "clamp(44px, 13vw, 56px)",
                    borderRadius: "50%",
                    background: node.color,
                    color: "#0B0B0A",
                    border: violated
                      ? "3px solid #ef4444"
                      : satisfied
                      ? "3px solid var(--acid)"
                      : "3px solid #0B0B0A",
                    outline: isSel ? "2px solid var(--ink)" : "none",
                    outlineOffset: 3,
                    cursor: "pointer",
                    zIndex: 1,
                    boxShadow: satisfied ? "0 0 0 3px var(--acid-faint)" : "none",
                  }}
                  aria-label={`${node.label} ${cur}/${node.degree}`}
                  aria-pressed={isSel}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", lineHeight: 1 }}>
                    {node.label}
                  </span>
                  <span className="mono tabular-nums" style={{ fontSize: "0.62rem", lineHeight: 1.1 }}>
                    {cur}/{node.degree}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Constraints */}
        <aside className="flex flex-col gap-5 min-w-0">
          <div className="flex flex-col gap-2">
            <span
              className="mono uppercase"
              style={{ color: "var(--ink-faint)", fontSize: "0.65rem", letterSpacing: "0.08em" }}
            >
              {net.mustConnectLabel}
            </span>
            <ul className="flex flex-col">
              {puzzle.mustConnect.map((e, i) => {
                const ok = edges.has(edgeKey(e[0], e[1]));
                return (
                  <li
                    key={`m${i}`}
                    className="mono py-2 flex items-center gap-2 hairline-b"
                    style={{ fontSize: "0.8rem", color: ok ? "var(--ink-faint)" : "var(--ink)" }}
                  >
                    <span aria-hidden style={{ color: ok ? "var(--acid)" : "var(--ink-faint)" }}>
                      {ok ? "✓" : "○"}
                    </span>
                    <span style={{ textDecoration: ok ? "line-through" : "none" }}>
                      {pairText(net.pair, e)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <span
              className="mono uppercase"
              style={{ color: "var(--ink-faint)", fontSize: "0.65rem", letterSpacing: "0.08em" }}
            >
              {net.blockedLabel}
            </span>
            <ul className="flex flex-col">
              {puzzle.blocked.map((e, i) => {
                const present = edges.has(edgeKey(e[0], e[1]));
                const ok = !present;
                return (
                  <li
                    key={`b${i}`}
                    className="mono py-2 flex items-center gap-2 hairline-b"
                    style={{ fontSize: "0.8rem", color: present ? "#ef4444" : "var(--ink-faint)" }}
                  >
                    <span aria-hidden style={{ color: present ? "#ef4444" : "var(--acid)" }}>
                      {present ? "✕" : "✓"}
                    </span>
                    <span style={{ textDecoration: ok ? "line-through" : "none" }}>
                      {pairText(net.blockedPair, e)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {/* In-game rules overlay */}
      {showRules && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setShowRules(false)}
        >
          <div
            className="max-w-md p-6 border"
            style={{ background: "var(--paper-elev)", borderColor: "var(--line-strong)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4
              className="text-ink mb-3"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem" }}
            >
              {g.howToTitle}
            </h4>
            <p style={{ color: "var(--ink-mute)", fontSize: "0.9rem", lineHeight: 1.55 }}>
              {net.howToBody}
            </p>
            <button
              type="button"
              onClick={() => setShowRules(false)}
              className="mono uppercase mt-5 px-4 py-2 border"
              style={{ borderColor: "var(--line-strong)", color: "var(--ink)", fontSize: "0.7rem", letterSpacing: "0.06em" }}
            >
              {g.gotIt}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
