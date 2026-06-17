"use client";

/**
 * NetworkingGame — the playable Networking puzzle.
 *
 * A network-map canvas: people are avatar tokens with a live degree progress
 * ring; the player clicks two people to toggle a relationship (edge). Edges are
 * drawn in an SVG overlay with an animated draw-in. Nodes show satisfied /
 * violated / selected states; a company legend, must-connect & blocked clue
 * cards, and an icon toolbar round out the experience.
 *
 * NOTE: node centering lives on a plain wrapper div, never on a Framer `motion`
 * element — putting `translate(-50%,-50%)` on a motion node alongside whileTap
 * makes Motion overwrite the transform and the node jumps on click.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { generateNetworkPuzzle } from "./generator";
import { formatTime } from "../../shared";
import { sfx } from "../../sound";
import { ProgressHUD } from "../../GameUI";
import { HINTS_PER_GAME, edgeKey, type Difficulty, type Edge, type NetPuzzle } from "./types";

interface Props {
  difficulty: Difficulty;
  onWin: (seconds: number) => void;
  onExit: () => void;
}

interface Point {
  x: number;
  y: number;
}

// Circle layout in a 0..100 space (shared by the SVG edges and % node positions).
function layout(n: number): Point[] {
  const cx = 50;
  const cy = 50;
  const r = 35;
  return Array.from({ length: n }, (_, i) => {
    const theta = (-90 + (i * 360) / n) * (Math.PI / 180);
    return { x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) };
  });
}

const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;
const DARK = "#0B0B0A";

/* ── inline icons (currentColor) ──────────────────────────────────── */
const Ico = {
  person: (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 19.5c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5v.5H5z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M9 12h6M8 8H6a4 4 0 0 0 0 8h2M16 8h2a4 4 0 0 1 0 8h-2" />
    </svg>
  ),
  ban: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" strokeLinecap="round" />
    </svg>
  ),
  hint: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18h6M10 21h4M12 2a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 2z" />
    </svg>
  ),
  shuffle: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 3h5v5M4 20l17-17M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM19 3v18" />
    </svg>
  ),
  exit: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 21H5V3h9M14 12H9M18 8l4 4-4 4M22 12h-9" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12l5 5L20 6" />
    </svg>
  ),
  undo: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h11a5 5 0 0 1 0 10h-1" />
    </svg>
  ),
  clear: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
    </svg>
  ),
};

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
  const [history, setHistory] = useState<string[][]>([]);

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

  const nodes = puzzle.nodes;
  const points = useMemo(() => layout(nodes.length), [nodes.length]);

  const companies = useMemo(() => {
    const map = new Map<number, { color: string; members: string[] }>();
    for (const n of nodes) {
      if (!map.has(n.company)) map.set(n.company, { color: n.color, members: [] });
      map.get(n.company)!.members.push(n.label);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([id, v]) => ({ id, ...v }));
  }, [nodes]);

  function degreeOf(set: Set<string>, node: number): number {
    let d = 0;
    for (let other = 0; other < nodes.length; other++) {
      if (other !== node && set.has(edgeKey(node, other))) d++;
    }
    return d;
  }

  function isSameCompanyEdge(key: string): boolean {
    const [a, b] = key.split("-").map(Number);
    return nodes[a].company === nodes[b].company;
  }

  function nodeViolation(set: Set<string>, node: number): boolean {
    if (degreeOf(set, node) > nodes[node].degree) return true;
    for (let other = 0; other < nodes.length; other++) {
      const k = edgeKey(node, other);
      if (other !== node && set.has(k) && isSameCompanyEdge(k)) return true;
    }
    return false;
  }

  function isWin(set: Set<string>): boolean {
    for (const key of set) if (isSameCompanyEdge(key)) return false;
    for (let i = 0; i < nodes.length; i++) if (degreeOf(set, i) !== nodes[i].degree) return false;
    for (const [a, b] of puzzle.mustConnect) if (!set.has(edgeKey(a, b))) return false;
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

  // Snapshot the current edges into history, then apply the next state. Every
  // board-changing action goes through here so Undo can step back one move.
  function applyEdges(next: Set<string>) {
    sfx.place();
    setHistory((h) => [...h, [...edges]]);
    commit(next);
  }

  function undo() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setEdges(new Set(prev));
    setSelected(null);
  }

  function clearBoard() {
    if (edges.size === 0) return;
    setSelected(null);
    applyEdges(new Set());
  }

  function toggleEdge(a: number, b: number) {
    if (a === b) return;
    const key = edgeKey(a, b);
    const next = new Set(edges);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    applyEdges(next);
  }

  function handleNodeClick(id: number) {
    if (selected === null) setSelected(id);
    else if (selected === id) setSelected(null);
    else {
      toggleEdge(selected, id);
      setSelected(null);
    }
  }

  function handleHint() {
    if (hintsLeft <= 0 || won) return;
    const solutionKeys = puzzle.solution.map(([a, b]) => edgeKey(a, b));
    const solutionSet = new Set(solutionKeys);

    // Remove a WRONG edge first. Adding a correct edge onto a node already full
    // of mistakes would push it to 5/4 and leave the player unsure what to undo;
    // clearing mistakes first keeps every hint unambiguous and never overshoots.
    const wrong = [...edges].find((k) => !solutionSet.has(k));
    if (wrong) {
      const next = new Set(edges);
      next.delete(wrong);
      setHintsLeft((h) => h - 1);
      setSelected(null);
      applyEdges(next);
      return;
    }
    // No mistakes left — add a missing correct edge (can never overshoot, since
    // the current edges are a subset of the unique solution).
    const missing = solutionKeys.find((k) => !edges.has(k));
    if (missing) {
      const next = new Set(edges);
      next.add(missing);
      setHintsLeft((h) => h - 1);
      setSelected(null);
      applyEdges(next);
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
    setHistory([]);
  }

  const label = (id: number) => nodes[id]?.label ?? "?";
  const pairText = (tpl: string, e: Edge) => tpl.replace("{a}", label(e[0])).replace("{b}", label(e[1]));
  const satisfiedCount = nodes.filter((n) => !nodeViolation(edges, n.id) && degreeOf(edges, n.id) === n.degree).length;

  const toolbarBtn =
    "mono uppercase inline-flex items-center gap-1.5 px-4 py-2 border rounded-full transition-colors duration-200 disabled:opacity-40 hover:bg-[var(--paper-soft)]";
  const toolbarStyle: React.CSSProperties = {
    borderColor: "var(--line-strong)",
    color: "var(--ink)",
    background: "transparent",
    fontSize: "0.68rem",
    letterSpacing: "0.06em",
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={changePuzzle} className={toolbarBtn} style={toolbarStyle}>
          {Ico.shuffle} {g.changePuzzle}
        </button>
        <button type="button" onClick={undo} disabled={history.length === 0} className={toolbarBtn} style={toolbarStyle}>
          {Ico.undo} {g.undo}
        </button>
        <button type="button" onClick={clearBoard} disabled={edges.size === 0} className={toolbarBtn} style={toolbarStyle}>
          {Ico.clear} {g.clear}
        </button>
        <button type="button" onClick={() => setShowRules(true)} className={toolbarBtn} style={toolbarStyle}>
          {Ico.book} {g.rules}
        </button>
        <button type="button" onClick={handleHint} disabled={hintsLeft <= 0} className={toolbarBtn} style={toolbarStyle}>
          {Ico.hint} {g.hint} ({hintsLeft})
        </button>
        <button type="button" onClick={onExit} className={toolbarBtn} style={toolbarStyle}>
          {Ico.exit} {g.exit}
        </button>
        <span className="ml-auto flex items-center gap-3">
          <span className="mono tabular-nums inline-flex items-center gap-1.5" style={{ color: "var(--acid)", fontSize: "0.72rem" }}>
            {Ico.check} {satisfiedCount}/{nodes.length}
          </span>
          <span className="mono tabular-nums" style={{ color: "var(--ink-mute)", fontSize: "0.78rem", letterSpacing: "0.06em" }}>
            {g.timeLabel} {formatTime(elapsed)}
          </span>
        </span>
      </div>

      {/* Company legend */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mono uppercase" style={{ color: "var(--ink-faint)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
          {net.companiesLabel}
        </span>
        {companies.map((c) => (
          <span
            key={c.id}
            className="mono inline-flex items-center gap-1.5 px-2 py-1"
            style={{ border: "1px solid var(--line-strong)", fontSize: "0.68rem", color: "var(--ink-mute)" }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.color, border: `1.5px solid ${DARK}` }} />
            {c.members.join(" ")}
          </span>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(220px,300px)]">
        {/* Canvas */}
        <div className="min-w-0">
          <div className="mx-auto w-full mb-3" style={{ maxWidth: 600 }}>
            <ProgressHUD label={g.solved} value={satisfiedCount} total={nodes.length} />
          </div>
          <div
            className="relative mx-auto w-full"
            style={{
              maxWidth: 600,
              aspectRatio: "1 / 1",
              background:
                "radial-gradient(circle at 50% 45%, rgba(155,107,255,0.08), transparent 60%), var(--paper)",
              backgroundColor: "var(--paper)",
              border: "1px solid var(--line-strong)",
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* dotted network grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(var(--line) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                opacity: 0.6,
                pointerEvents: "none",
              }}
              aria-hidden
            />

            {/* Edges */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} aria-hidden>
              <AnimatePresence>
                {[...edges].map((key) => {
                  const [a, b] = key.split("-").map(Number);
                  const pa = points[a];
                  const pb = points[b];
                  const bad = isSameCompanyEdge(key);
                  if (bad) {
                    return (
                      <motion.line
                        key={key}
                        x1={pa.x}
                        y1={pa.y}
                        x2={pb.x}
                        y2={pb.y}
                        stroke="#ef4444"
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        strokeDasharray="2.5 2.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    );
                  }
                  return (
                    <motion.line
                      key={key}
                      x1={pa.x}
                      y1={pa.y}
                      x2={pb.x}
                      y2={pb.y}
                      stroke="var(--acid)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      style={{ filter: "drop-shadow(0 0 1.5px rgba(155,107,255,0.7))" }}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                  );
                })}
              </AnimatePresence>
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const p = points[node.id];
              const cur = degreeOf(edges, node.id);
              const violated = nodeViolation(edges, node.id);
              const satisfied = !violated && cur === node.degree;
              const isSel = selected === node.id;
              const ringColor = violated ? "#ef4444" : satisfied ? "var(--acid)" : "var(--ink-faint)";
              const progress = Math.min(cur / node.degree, 1);

              // When a person is selected, classify every other node as a target:
              // connected (click to unlink) / valid (glow) / full / invalid
              // (same-company or blocked). Drives the eligibility highlighting.
              let targetState: "none" | "connected" | "valid" | "full" | "invalid" = "none";
              if (selected !== null && selected !== node.id) {
                const k = edgeKey(selected, node.id);
                const connected = edges.has(k);
                const sameCo = nodes[selected].company === node.company;
                const blockedPair = puzzle.blocked.some(([a, b]) => edgeKey(a, b) === k);
                const selFull = degreeOf(edges, selected) >= nodes[selected].degree;
                const nodeFull = cur >= node.degree;
                if (connected) targetState = "connected";
                else if (sameCo || blockedPair) targetState = "invalid";
                else if (selFull || nodeFull) targetState = "full";
                else targetState = "valid";
              }
              const dim = targetState === "invalid" ? 0.38 : targetState === "full" ? 0.6 : 1;

              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: "clamp(56px, 15vw, 70px)",
                    height: "clamp(56px, 15vw, 70px)",
                    transform: "translate(-50%, -50%)",
                    opacity: dim,
                    transition: "opacity 0.2s ease",
                    zIndex: targetState === "valid" ? 2 : 1,
                  }}
                >
                  {/* progress ring */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} aria-hidden>
                    <circle cx="50" cy="50" r={RING_R} fill="none" stroke="var(--line)" strokeWidth="5" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={RING_R}
                      fill="none"
                      stroke={ringColor}
                      strokeWidth="5"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      strokeDasharray={RING_C}
                      initial={false}
                      animate={{ strokeDashoffset: RING_C * (1 - progress) }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </svg>

                  {/* selection pulse */}
                  {isSel && (
                    <motion.span
                      className="absolute"
                      style={{ inset: "8%", borderRadius: "50%", border: "2px solid var(--acid)", pointerEvents: "none" }}
                      animate={{ scale: [1, 1.14, 1], opacity: [0.9, 0.25, 0.9] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden
                    />
                  )}

                  {/* eligibility highlight (only while another node is selected) */}
                  {targetState === "valid" && (
                    <>
                      <span
                        className="absolute"
                        style={{ inset: "6%", borderRadius: "50%", boxShadow: "0 0 16px rgba(155,107,255,0.75)", pointerEvents: "none" }}
                        aria-hidden
                      />
                      <motion.span
                        className="absolute"
                        style={{ inset: "5%", borderRadius: "50%", border: "2px dashed var(--acid)", pointerEvents: "none" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                        aria-hidden
                      />
                    </>
                  )}
                  {targetState === "connected" && (
                    <span
                      className="absolute"
                      style={{ inset: "5%", borderRadius: "50%", border: "2px solid var(--ink-mute)", pointerEvents: "none" }}
                      aria-hidden
                    />
                  )}
                  {targetState === "invalid" && (
                    <span
                      className="absolute flex items-center justify-center"
                      style={{ top: "2%", left: "2%", width: 16, height: 16, borderRadius: "50%", background: "#ef4444", color: DARK, fontSize: "0.66rem", fontWeight: 700, zIndex: 3, pointerEvents: "none" }}
                      aria-hidden
                    >
                      ✕
                    </span>
                  )}

                  {/* node face */}
                  <motion.button
                    type="button"
                    onClick={() => handleNodeClick(node.id)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                    animate={violated ? { x: [0, -3, 3, -2, 2, 0] } : { x: 0 }}
                    transition={{ duration: violated ? 0.4 : 0.2 }}
                    className="absolute flex flex-col items-center justify-center"
                    style={{
                      inset: "13%",
                      borderRadius: "50%",
                      background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), ${node.color})`,
                      color: DARK,
                      border: `2.5px solid ${DARK}`,
                      cursor: "pointer",
                      boxShadow: satisfied ? "0 0 14px rgba(155,107,255,0.55)" : "0 2px 8px rgba(0,0,0,0.45)",
                    }}
                    aria-label={`${node.label} ${cur}/${node.degree}`}
                    aria-pressed={isSel}
                  >
                    <span style={{ position: "absolute", inset: 0, opacity: 0.18, display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden>
                      <span style={{ width: "52%", height: "52%" }}>{Ico.person}</span>
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", lineHeight: 1, zIndex: 1 }}>
                      {node.label}
                    </span>
                    <span className="mono tabular-nums" style={{ fontSize: "0.6rem", lineHeight: 1.1, zIndex: 1, opacity: 0.85 }}>
                      {cur}/{node.degree}
                    </span>
                  </motion.button>

                  {/* satisfied check badge */}
                  <AnimatePresence>
                    {satisfied && (
                      <motion.span
                        className="absolute flex items-center justify-center"
                        style={{
                          top: "4%",
                          right: "4%",
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "var(--acid)",
                          color: DARK,
                          border: `1.5px solid ${DARK}`,
                          zIndex: 2,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 18 }}
                        aria-hidden
                      >
                        {Ico.check}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          {/* Prompt sits BELOW the board in a fixed-height slot, so it fades in
              and out without nudging the canvas up and down on every click. */}
          <div className="mt-3" style={{ minHeight: 40 }}>
            {selected !== null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mono"
                style={{ color: "var(--ink-mute)", fontSize: "0.68rem", lineHeight: 1.45 }}
              >
                {net.selectPrompt}
              </motion.p>
            )}
          </div>
        </div>

        {/* Clue cards */}
        <aside className="flex flex-col gap-5 min-w-0">
          <ClueGroup
            label={net.mustConnectLabel}
            icon={Ico.link}
            iconColor="var(--acid)"
            items={puzzle.mustConnect.map((e) => {
              const ok = edges.has(edgeKey(e[0], e[1]));
              return { text: pairText(net.pair, e), ok, accent: "var(--acid)" };
            })}
          />
          <ClueGroup
            label={net.blockedLabel}
            icon={Ico.ban}
            iconColor="#ef4444"
            items={puzzle.blocked.map((e) => {
              const present = edges.has(edgeKey(e[0], e[1]));
              return { text: pairText(net.blockedPair, e), ok: !present, accent: "#ef4444", bad: present };
            })}
          />
        </aside>
      </div>

      {/* In-game rules overlay */}
      <AnimatePresence>
        {showRules && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.72)" }}
            onClick={() => setShowRules(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-md p-6 border"
              style={{ background: "var(--paper-elev)", borderColor: "var(--line-strong)" }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <h4 className="text-ink mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem" }}>
                <span style={{ color: "var(--acid)" }}>{Ico.link}</span>
                {g.howToTitle}
              </h4>
              <p style={{ color: "var(--ink-mute)", fontSize: "0.9rem", lineHeight: 1.55 }}>{net.howToBody}</p>
              <button
                type="button"
                onClick={() => setShowRules(false)}
                className="mono uppercase mt-5 px-4 py-2 border"
                style={{ borderColor: "var(--acid)", background: "var(--acid)", color: "var(--paper)", fontSize: "0.7rem", letterSpacing: "0.06em" }}
              >
                {g.gotIt}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClueGroup({
  label,
  icon,
  iconColor,
  items,
}: {
  label: string;
  icon: React.ReactNode;
  iconColor: string;
  items: { text: string; ok: boolean; accent: string; bad?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="mono uppercase inline-flex items-center gap-1.5" style={{ color: "var(--ink-faint)", fontSize: "0.62rem", letterSpacing: "0.08em" }}>
        <span style={{ color: iconColor }}>{icon}</span>
        {label}
      </span>
      <ul className="flex flex-col gap-1.5">
        {items.map((it, i) => (
          <li
            key={i}
            className="mono flex items-center gap-2 px-2.5 py-2"
            style={{
              fontSize: "0.78rem",
              border: "1px solid var(--line-strong)",
              background: it.bad ? "rgba(239,68,68,0.08)" : it.ok ? "var(--acid-faint)" : "transparent",
              color: it.bad ? "#ef4444" : it.ok ? "var(--ink)" : "var(--ink-mute)",
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: it.ok ? it.accent : "transparent",
                border: it.ok ? "none" : "1.5px solid var(--ink-faint)",
                color: it.ok ? "#0B0B0A" : "var(--ink-faint)",
              }}
            >
              {it.bad ? "✕" : it.ok ? Ico.check : ""}
            </span>
            <span style={{ textDecoration: it.ok ? "line-through" : "none" }}>{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
