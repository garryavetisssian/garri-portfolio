"use client";

/**
 * MeetingSchedulerGame — the playable GAME screen.
 *
 * Owns the live puzzle, the board assignment, the timer, hints, and the
 * in-game toolbar ([Change Puzzle] [Rules] [Hint (n)] [Exit]). Reports a win
 * (with elapsed seconds) up to GameModal, which handles the victory flow.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { generatePuzzle } from "./generator";
import { constraintSatisfied, isComplete, allSatisfied } from "./solver";
import { formatTime } from "./leaderboard";
import {
  HINTS_PER_GAME,
  type Assignment,
  type Constraint,
  type Difficulty,
  type Puzzle,
} from "./types";

interface Props {
  difficulty: Difficulty;
  onWin: (seconds: number) => void;
  onExit: () => void;
}

function emptyAssignment(n: number): Assignment {
  return new Array(n).fill(null);
}

function meetingAt(a: Assignment, room: number, slot: number): number | null {
  for (let m = 0; m < a.length; m++) {
    const p = a[m];
    if (p && p.room === room && p.slot === slot) return m;
  }
  return null;
}

export default function MeetingSchedulerGame({ difficulty, onWin, onExit }: Props) {
  const { t } = useLanguage();
  const g = t.miniGames;

  const [puzzle, setPuzzle] = useState<Puzzle>(() => generatePuzzle(difficulty));
  const [assignment, setAssignment] = useState<Assignment>(() =>
    emptyAssignment(puzzle.meetings.length)
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [hintsLeft, setHintsLeft] = useState(HINTS_PER_GAME);
  const [elapsed, setElapsed] = useState(0);
  const [won, setWon] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [history, setHistory] = useState<Assignment[]>([]);

  const elapsedRef = useRef(0);
  const onWinRef = useRef(onWin);
  const dragIdRef = useRef<number | null>(null);

  useEffect(() => {
    onWinRef.current = onWin;
  });

  // Timer ticks until solved.
  useEffect(() => {
    if (won) return;
    const id = window.setInterval(() => {
      elapsedRef.current += 1;
      setElapsed(elapsedRef.current);
    }, 1000);
    return () => window.clearInterval(id);
  }, [won]);

  function commit(next: Assignment) {
    setAssignment(next);
    if (!won && isComplete(next) && allSatisfied(puzzle.constraints, next)) {
      setWon(true);
      onWinRef.current(elapsedRef.current);
    }
  }

  // Snapshot the current board into history, then apply the next state. Every
  // board-changing action goes through here so Undo can step back one move.
  function applyAssignment(next: Assignment) {
    setHistory((h) => [...h, assignment.map((p) => (p ? { ...p } : null))]);
    commit(next);
  }

  function undo() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setAssignment(prev);
    setSelected(null);
  }

  function clearBoard() {
    if (assignment.every((p) => p === null)) return;
    setSelected(null);
    applyAssignment(emptyAssignment(puzzle.meetings.length));
  }

  function placeMeeting(m: number, room: number, slot: number) {
    const next = assignment.slice();
    const occupant = meetingAt(next, room, slot);
    if (occupant !== null && occupant !== m) next[occupant] = null; // bump back to tray
    next[m] = { room, slot };
    setSelected(null);
    applyAssignment(next);
  }

  function removeMeeting(m: number) {
    const next = assignment.slice();
    next[m] = null;
    setSelected(null);
    applyAssignment(next); // removing can never complete the puzzle
  }

  function handleCellClick(room: number, slot: number) {
    const occupant = meetingAt(assignment, room, slot);
    if (selected !== null) {
      placeMeeting(selected, room, slot);
    } else if (occupant !== null) {
      // Pick the meeting back up.
      const next = assignment.slice();
      next[occupant] = null;
      setSelected(occupant);
      applyAssignment(next);
    }
  }

  function toggleTrayChip(m: number) {
    setSelected((cur) => (cur === m ? null : m));
  }

  function handleHint() {
    if (hintsLeft <= 0 || won) return;
    // Prefer an unplaced meeting; otherwise fix a misplaced one.
    let target = puzzle.meetings.findIndex((mt) => assignment[mt.id] === null);
    if (target === -1) {
      target = puzzle.meetings.findIndex((mt) => {
        const p = assignment[mt.id];
        const sol = puzzle.solution[mt.id];
        return !p || p.room !== sol.room || p.slot !== sol.slot;
      });
    }
    if (target === -1) return;
    const sol = puzzle.solution[target];
    setHintsLeft((h) => h - 1);
    placeMeeting(target, sol.room, sol.slot);
  }

  function changePuzzle() {
    const p = generatePuzzle(difficulty);
    setPuzzle(p);
    setAssignment(emptyAssignment(p.meetings.length));
    setSelected(null);
    setHintsLeft(HINTS_PER_GAME);
    setWon(false);
    elapsedRef.current = 0;
    setElapsed(0);
    setShowRules(false);
    setHistory([]);
  }

  // ── drag & drop ──
  function onChipDragStart(m: number) {
    dragIdRef.current = m;
  }
  function onCellDrop(room: number, slot: number) {
    const m = dragIdRef.current;
    dragIdRef.current = null;
    setDragOver(null);
    if (m === null) return;
    placeMeeting(m, room, slot);
  }
  function onTrayDrop() {
    const m = dragIdRef.current;
    dragIdRef.current = null;
    setDragOver(null);
    if (m === null) return;
    if (assignment[m]) removeMeeting(m);
  }

  // ── localized constraint text ──
  function describe(c: Constraint): string {
    const label = (id: number) => puzzle.meetings[id]?.label ?? "?";
    const room = (r: number) => `${g.roomLabel} ${r + 1}`;
    const slot = (s: number) => `${g.slotLabel} ${s + 1}`;
    switch (c.kind) {
      case "in-room":
        return g.constraints.inRoom.replace("{m}", label(c.meeting)).replace("{room}", room(c.room));
      case "at-slot":
        return g.constraints.atSlot.replace("{m}", label(c.meeting)).replace("{slot}", slot(c.slot));
      case "before":
        return g.constraints.before.replace("{m}", label(c.meeting)).replace("{n}", label(c.other));
      case "not-same-slot":
        return g.constraints.notSameSlot
          .replace("{m}", label(c.meeting))
          .replace("{n}", label(c.other));
      case "room-before-slot":
        return g.constraints.roomBeforeSlot
          .replace("{room}", room(c.room))
          .replace("{slot}", slot(c.slot));
    }
  }

  const tray = puzzle.meetings.filter((m) => assignment[m.id] === null);
  const satisfiedCount = puzzle.constraints.filter((c) => constraintSatisfied(c, assignment)).length;

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
        <button
          type="button"
          onClick={undo}
          disabled={history.length === 0}
          className={toolbarBtn}
          style={toolbarStyle}
        >
          {g.undo}
        </button>
        <button
          type="button"
          onClick={clearBoard}
          disabled={assignment.every((p) => p === null)}
          className={toolbarBtn}
          style={toolbarStyle}
        >
          {g.clear}
        </button>
        <button
          type="button"
          onClick={() => setShowRules(true)}
          className={toolbarBtn}
          style={toolbarStyle}
        >
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
        {/* Board + tray */}
        <div className="flex flex-col gap-4 min-w-0">
          {/* Tray */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver("tray");
            }}
            onDragLeave={() => setDragOver((d) => (d === "tray" ? null : d))}
            onDrop={onTrayDrop}
            className="flex flex-wrap items-center gap-2 p-3 border"
            style={{
              borderColor: dragOver === "tray" ? "var(--acid)" : "var(--line-strong)",
              background: "var(--paper-soft)",
              minHeight: 60,
            }}
          >
            <span
              className="mono uppercase mr-1"
              style={{ color: "var(--ink-faint)", fontSize: "0.65rem", letterSpacing: "0.08em" }}
            >
              {g.trayLabel}
            </span>
            {tray.length === 0 && (
              <span className="mono" style={{ color: "var(--ink-faint)", fontSize: "0.75rem" }}>
                —
              </span>
            )}
            {tray.map((m) => (
              <motion.button
                key={m.id}
                type="button"
                draggable
                onDragStart={() => onChipDragStart(m.id)}
                onClick={() => toggleTrayChip(m.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="font-bold select-none cursor-grab active:cursor-grabbing"
                style={{
                  width: 40,
                  height: 40,
                  background: m.color,
                  color: "#0B0B0A",
                  border: selected === m.id ? "2px solid var(--ink)" : "2px solid transparent",
                  outline: selected === m.id ? "2px solid var(--acid)" : "none",
                  outlineOffset: 2,
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                }}
                aria-pressed={selected === m.id}
                aria-label={m.label}
              >
                {m.label}
              </motion.button>
            ))}
          </div>

          {/* Grid (scrolls horizontally on small screens) */}
          <div className="overflow-x-auto -mx-1 px-1">
            <div
              className="grid w-max"
              style={{
                gridTemplateColumns: `auto repeat(${puzzle.slots}, minmax(56px, 1fr))`,
              }}
            >
              {/* header row */}
              <div />
              {Array.from({ length: puzzle.slots }).map((_, s) => (
                <div
                  key={`h${s}`}
                  className="mono uppercase text-center pb-2"
                  style={{ color: "var(--ink-faint)", fontSize: "0.6rem", letterSpacing: "0.05em" }}
                >
                  {g.slotLabel} {s + 1}
                </div>
              ))}

              {/* room rows */}
              {Array.from({ length: puzzle.rooms }).map((_, r) => (
                <FragmentRow
                  key={`r${r}`}
                  room={r}
                  slots={puzzle.slots}
                  roomLabel={`${g.roomLabel} ${r + 1}`}
                  assignment={assignment}
                  meetings={puzzle.meetings}
                  selected={selected}
                  dragOver={dragOver}
                  setDragOver={setDragOver}
                  onCellClick={handleCellClick}
                  onCellDrop={onCellDrop}
                  onChipDragStart={onChipDragStart}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Constraints */}
        <aside className="flex flex-col gap-3 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span
              className="mono uppercase"
              style={{ color: "var(--ink-faint)", fontSize: "0.65rem", letterSpacing: "0.08em" }}
            >
              {g.constraintsLabel}
            </span>
            <span
              className="mono tabular-nums"
              style={{ color: "var(--ink-mute)", fontSize: "0.7rem" }}
            >
              {satisfiedCount}/{puzzle.constraints.length}
            </span>
          </div>
          <ul className="flex flex-col">
            {puzzle.constraints.map((c, i) => {
              const ok = constraintSatisfied(c, assignment);
              return (
                <li
                  key={i}
                  className="mono py-2 flex items-start gap-2 hairline-b"
                  style={{
                    fontSize: "0.78rem",
                    lineHeight: 1.35,
                    color: ok ? "var(--ink-faint)" : "var(--ink)",
                    textDecoration: ok ? "line-through" : "none",
                  }}
                >
                  <span aria-hidden style={{ color: ok ? "var(--acid)" : "var(--ink-faint)" }}>
                    {ok ? "✓" : "○"}
                  </span>
                  <span>{describe(c)}</span>
                </li>
              );
            })}
          </ul>
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
              {g.howToBody}
            </p>
            <button
              type="button"
              onClick={() => setShowRules(false)}
              className="mono uppercase mt-5 px-4 py-2 border"
              style={{
                borderColor: "var(--line-strong)",
                color: "var(--ink)",
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
              }}
            >
              {g.gotIt}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Row of cells for one room. Split out to keep the main render readable.
function FragmentRow({
  room,
  slots,
  roomLabel,
  assignment,
  meetings,
  selected,
  dragOver,
  setDragOver,
  onCellClick,
  onCellDrop,
  onChipDragStart,
}: {
  room: number;
  slots: number;
  roomLabel: string;
  assignment: Assignment;
  meetings: Puzzle["meetings"];
  selected: number | null;
  dragOver: string | null;
  setDragOver: (v: string | null) => void;
  onCellClick: (room: number, slot: number) => void;
  onCellDrop: (room: number, slot: number) => void;
  onChipDragStart: (m: number) => void;
}) {
  return (
    <>
      <div
        className="mono uppercase flex items-center pr-3"
        style={{ color: "var(--ink-mute)", fontSize: "0.62rem", letterSpacing: "0.05em" }}
      >
        {roomLabel}
      </div>
      {Array.from({ length: slots }).map((_, s) => {
        const occ = meetingAt(assignment, room, s);
        const m = occ !== null ? meetings[occ] : null;
        const key = `${room}:${s}`;
        const isOver = dragOver === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onCellClick(room, s)}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(key);
            }}
            onDragLeave={() => setDragOver(dragOver === key ? null : dragOver)}
            onDrop={() => onCellDrop(room, s)}
            className="flex items-center justify-center transition-colors duration-150"
            style={{
              height: 56,
              margin: -0.5,
              border: "1px solid var(--line-strong)",
              background: isOver
                ? "var(--acid-faint)"
                : selected !== null && m === null
                ? "var(--paper-soft)"
                : "transparent",
              cursor: "pointer",
            }}
            aria-label={m ? m.label : `${roomLabel} ${s + 1}`}
          >
            {m && (
              <span
                draggable
                onDragStart={(e) => {
                  e.stopPropagation();
                  onChipDragStart(m.id);
                }}
                className="font-bold select-none flex items-center justify-center"
                style={{
                  width: 38,
                  height: 38,
                  background: m.color,
                  color: "#0B0B0A",
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  cursor: "grab",
                }}
              >
                {m.label}
              </span>
            )}
          </button>
        );
      })}
    </>
  );
}
