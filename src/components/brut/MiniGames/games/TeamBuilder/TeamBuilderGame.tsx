"use client";

/**
 * TeamBuilderGame — the playable Team Builder puzzle.
 *
 * Grid of people (rows) × teams (columns). Click a cell to assign a person to a
 * team (one team per person). Team headers show live role / seniority / size
 * status; a conflicts panel flags people who can't share a team. Same toolbar,
 * undo/clear, hints, timer, and rules overlay as the other games.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { generateTeamPuzzle } from "./generator";
import { formatTime } from "../../shared";
import {
  HINTS_PER_GAME,
  ROLE_ABBR,
  ROLE_COLORS,
  SENIORITY_ABBR,
  SENIOR_LEVEL,
  type Difficulty,
  type TBPuzzle,
} from "./types";

interface Props {
  difficulty: Difficulty;
  onWin: (seconds: number) => void;
  onExit: () => void;
}

const DARK = "#0B0B0A";

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12l5 5L20 6" />
    </svg>
  ),
  shuffle: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 3h5v5M4 20l17-17M21 16v5h-5M15 15l6 6M4 4l5 5" />
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
  hint: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18h6M10 21h4M12 2a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 2z" />
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
};

type Assignment = (number | null)[];

export default function TeamBuilderGame({ difficulty, onWin, onExit }: Props) {
  const { t } = useLanguage();
  const g = t.miniGames;
  const tb = g.teamBuilder;

  const [puzzle, setPuzzle] = useState<TBPuzzle>(() => generateTeamPuzzle(difficulty));
  const [assignment, setAssignment] = useState<Assignment>(() => new Array(puzzle.people.length).fill(null));
  const [hintsLeft, setHintsLeft] = useState(HINTS_PER_GAME);
  const [elapsed, setElapsed] = useState(0);
  const [won, setWon] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [history, setHistory] = useState<Assignment[]>([]);

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

  const { people, teams, conflicts } = puzzle;

  function roleCount(a: Assignment, team: number, role: number): number {
    let c = 0;
    for (let p = 0; p < people.length; p++) if (a[p] === team && people[p].role === role) c++;
    return c;
  }
  function teamSize(a: Assignment, team: number): number {
    let c = 0;
    for (let p = 0; p < people.length; p++) if (a[p] === team) c++;
    return c;
  }
  function teamHasSenior(a: Assignment, team: number): boolean {
    return people.some((p) => a[p.id] === team && p.seniority >= SENIOR_LEVEL);
  }
  function teamConflict(a: Assignment, team: number): boolean {
    for (const [x, y] of conflicts) if (a[x] === team && a[y] === team) return true;
    return false;
  }
  function roleMet(a: Assignment, team: number): boolean {
    return teams[team].roleReq.every((req, r) => roleCount(a, team, r) === req);
  }
  function teamComplete(a: Assignment, team: number): boolean {
    const tm = teams[team];
    if (!roleMet(a, team)) return false;
    if (teamSize(a, team) > tm.maxHeadcount) return false;
    if (tm.requireSenior && !teamHasSenior(a, team)) return false;
    if (teamConflict(a, team)) return false;
    return true;
  }
  function conflictViolated(x: number, y: number): boolean {
    return assignment[x] !== null && assignment[x] === assignment[y];
  }
  function isWin(a: Assignment): boolean {
    if (a.some((v) => v === null)) return false;
    for (let team = 0; team < teams.length; team++) if (!teamComplete(a, team)) return false;
    return true;
  }

  function commit(next: Assignment) {
    setAssignment(next);
    if (!won && isWin(next)) {
      setWon(true);
      onWinRef.current(elapsedRef.current);
    }
  }
  function applyAssignment(next: Assignment) {
    setHistory((h) => [...h, assignment.slice()]);
    commit(next);
  }

  function handleCellClick(person: number, team: number) {
    const next = assignment.slice();
    next[person] = assignment[person] === team ? null : team;
    applyAssignment(next);
  }

  function undo() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setAssignment(prev);
  }
  function clearBoard() {
    if (assignment.every((p) => p === null)) return;
    applyAssignment(new Array(people.length).fill(null));
  }

  function handleHint() {
    if (hintsLeft <= 0 || won) return;
    let target = people.findIndex((p) => assignment[p.id] === null);
    if (target === -1) target = people.findIndex((p) => assignment[p.id] !== puzzle.solution[p.id]);
    if (target === -1) return;
    const next = assignment.slice();
    next[target] = puzzle.solution[target];
    setHintsLeft((h) => h - 1);
    applyAssignment(next);
  }

  function changePuzzle() {
    const p = generateTeamPuzzle(difficulty);
    setPuzzle(p);
    setAssignment(new Array(p.people.length).fill(null));
    setHintsLeft(HINTS_PER_GAME);
    setWon(false);
    elapsedRef.current = 0;
    setElapsed(0);
    setShowRules(false);
    setHistory([]);
  }

  const completeTeams = teams.filter((_, tIdx) => teamComplete(assignment, tIdx)).length;

  const toolbarBtn =
    "mono uppercase inline-flex items-center gap-1.5 px-3 py-2 border transition-colors duration-200 disabled:opacity-40 hover:bg-[var(--paper-soft)]";
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
        <button type="button" onClick={clearBoard} disabled={assignment.every((p) => p === null)} className={toolbarBtn} style={toolbarStyle}>
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
            {Ico.check} {completeTeams}/{teams.length}
          </span>
          <span className="mono tabular-nums" style={{ color: "var(--ink-mute)", fontSize: "0.78rem", letterSpacing: "0.06em" }}>
            {g.timeLabel} {formatTime(elapsed)}
          </span>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(200px,260px)]">
        {/* Grid — flexes to fit the panel width (no horizontal scroll) */}
        <div className="min-w-0">
          <div
            className="grid w-full"
            style={{ gridTemplateColumns: `minmax(80px, 1.1fr) repeat(${teams.length}, minmax(0, 1fr))` }}
          >
            {/* header row */}
            <div className="mono uppercase flex items-end pb-2 pr-2" style={{ color: "var(--ink-faint)", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
              {tb.peopleLabel}
            </div>
            {teams.map((team, tIdx) => {
              const done = teamComplete(assignment, tIdx);
              const size = teamSize(assignment, tIdx);
              const over = size > team.maxHeadcount;
              return (
                <div
                  key={team.id}
                  className="p-2 mb-1 flex flex-col gap-1"
                  style={{
                    border: `1px solid ${done ? "var(--acid)" : "var(--line-strong)"}`,
                    background: done ? "var(--acid-faint)" : "var(--paper-soft)",
                  }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-ink" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.92rem" }}>
                      {tb.teamWord} {tIdx + 1}
                    </span>
                    {done && (
                      <span className="flex items-center justify-center" style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--acid)", color: DARK }}>
                        {Ico.check}
                      </span>
                    )}
                  </div>
                  {/* role requirements */}
                  <div className="flex flex-wrap gap-1">
                    {team.roleReq.map((req, r) =>
                      req > 0 ? (
                        <span
                          key={r}
                          className="mono"
                          style={{
                            fontSize: "0.58rem",
                            padding: "1px 4px",
                            border: `1px solid ${roleCount(assignment, tIdx, r) === req ? "var(--acid)" : "var(--line-strong)"}`,
                            color: roleCount(assignment, tIdx, r) > req ? "#ef4444" : "var(--ink-mute)",
                          }}
                        >
                          {ROLE_ABBR[r]} {roleCount(assignment, tIdx, r)}/{req}
                        </span>
                      ) : null
                    )}
                  </div>
                  <div className="flex items-center gap-2 mono" style={{ fontSize: "0.56rem", color: over ? "#ef4444" : "var(--ink-faint)" }}>
                    <span>{tb.sizeLabel} {size}/{team.maxHeadcount}</span>
                    {team.requireSenior && (
                      <span style={{ color: teamHasSenior(assignment, tIdx) ? "var(--acid)" : "var(--ink-faint)" }}>
                        ★ {tb.seniorLabel}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* person rows */}
            {people.map((person) => {
              const inConflict = conflicts.some(
                ([x, y]) => (x === person.id || y === person.id) && conflictViolated(x, y)
              );
              return (
                <RowFragment
                  key={person.id}
                  person={person}
                  teams={teams.length}
                  assignment={assignment}
                  inConflict={inConflict}
                  onCellClick={handleCellClick}
                />
              );
            })}
          </div>
        </div>

        {/* Conflicts */}
        <aside className="flex flex-col gap-2 min-w-0">
          <span className="mono uppercase" style={{ color: "var(--ink-faint)", fontSize: "0.62rem", letterSpacing: "0.08em" }}>
            {tb.conflictsLabel}
          </span>
          <ul className="flex flex-col gap-1.5">
            {conflicts.map(([x, y], i) => {
              const bad = conflictViolated(x, y);
              return (
                <li
                  key={i}
                  className="mono flex items-center gap-2 px-2.5 py-2"
                  style={{
                    fontSize: "0.78rem",
                    border: "1px solid var(--line-strong)",
                    background: bad ? "rgba(239,68,68,0.08)" : "transparent",
                    color: bad ? "#ef4444" : "var(--ink-mute)",
                  }}
                >
                  <span aria-hidden style={{ color: bad ? "#ef4444" : "var(--ink-faint)" }}>{bad ? "✕" : "○"}</span>
                  {tb.conflictPair.replace("{a}", people[x].label).replace("{b}", people[y].label)}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      {/* Rules overlay */}
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
              <h4 className="text-ink mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem" }}>
                {g.howToTitle}
              </h4>
              <p style={{ color: "var(--ink-mute)", fontSize: "0.9rem", lineHeight: 1.55 }}>{tb.howToBody}</p>
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

function RowFragment({
  person,
  teams,
  assignment,
  inConflict,
  onCellClick,
}: {
  person: TBPuzzle["people"][number];
  teams: number;
  assignment: Assignment;
  inConflict: boolean;
  onCellClick: (person: number, team: number) => void;
}) {
  const roleColor = ROLE_COLORS[person.role % ROLE_COLORS.length];
  const sen = person.seniority;
  return (
    <>
      {/* person info */}
      <div
        className="flex items-center gap-2 py-2 pr-2 hairline-b"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <span className="text-ink" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", width: 18 }}>
          {person.label}
        </span>
        <span className="mono" style={{ fontSize: "0.6rem", padding: "1px 5px", background: roleColor, color: DARK, fontWeight: 700 }}>
          {ROLE_ABBR[person.role]}
        </span>
        <span
          className="mono"
          style={{
            fontSize: "0.6rem",
            padding: "1px 5px",
            border: "1px solid var(--line-strong)",
            color: sen >= SENIOR_LEVEL ? "#FBBF24" : "var(--ink-mute)",
            fontWeight: sen >= SENIOR_LEVEL ? 700 : 400,
          }}
        >
          {SENIORITY_ABBR[sen]}
        </span>
      </div>
      {/* team cells */}
      {Array.from({ length: teams }).map((_, tIdx) => {
        const assigned = assignment[person.id] === tIdx;
        return (
          <button
            key={tIdx}
            type="button"
            onClick={() => onCellClick(person.id, tIdx)}
            className="flex items-center justify-center transition-colors duration-150"
            style={{
              minHeight: 44,
              margin: -0.5,
              border: "1px solid var(--line-strong)",
              background: assigned ? roleColor : "transparent",
              cursor: "pointer",
              outline: assigned && inConflict ? "2px solid #ef4444" : "none",
              outlineOffset: -3,
            }}
            aria-label={`${person.label} → ${tIdx + 1}`}
            aria-pressed={assigned}
          >
            {assigned && (
              <span style={{ color: DARK, display: "flex" }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </>
  );
}
