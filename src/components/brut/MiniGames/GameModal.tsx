"use client";

/**
 * GameModal — full-screen modal that drives the mini-game flow as a small state
 * machine: DIFFICULTY → HOW_TO_PLAY → COUNTDOWN → GAME → VICTORY, plus a
 * per-difficulty LEADERBOARD view reachable from the difficulty screen.
 *
 * Backdrop + open/close animation follow the ChatPanel pattern (dark overlay,
 * eased transform). Game-agnostic: it renders whichever game is passed via the
 * `game` definition, so it serves both Meeting Scheduler and Networking.
 */

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DIFFICULTIES, formatTime, type Difficulty, type Entry } from "./shared";
import { sfx, isMuted, setMuted } from "./sound";
import Confetti from "./Confetti";
import { GameCover } from "./covers";

/** Everything GameModal needs to host a specific game. */
export interface GameDefinition {
  name: string;
  description: string;
  howToBody: string;
  coverIndex: number;
  getEntries: (d: Difficulty) => Entry[];
  addEntry: (d: Difficulty, name: string, seconds: number) => { entries: Entry[]; rank: number };
  Game: React.ComponentType<{
    difficulty: Difficulty;
    onWin: (seconds: number) => void;
    onExit: () => void;
  }>;
}

type Screen = "difficulty" | "leaderboard" | "howto" | "countdown" | "game" | "victory";

export default function GameModal({
  open,
  onClose,
  game,
}: {
  open: boolean;
  onClose: () => void;
  game: GameDefinition;
}) {
  const { t } = useLanguage();
  const g = t.miniGames;

  const [screen, setScreen] = useState<Screen>("difficulty");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [lbDiff, setLbDiff] = useState<Difficulty>("easy");
  const [round, setRound] = useState(0);
  const [winTime, setWinTime] = useState(0);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [highlight, setHighlight] = useState(-1);
  const [muted, setMutedState] = useState(() => isMuted());

  function toggleMute() {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  }

  // Reset the flow to the start, then close. Used by every close trigger so the
  // modal always reopens on the difficulty screen (no reset-in-effect needed).
  const requestClose = useCallback(() => {
    setScreen("difficulty");
    setName("");
    setSubmitted(false);
    setHighlight(-1);
    onClose();
  }, [onClose]);

  // Esc closes; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") requestClose();
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, requestClose]);

  function startGame(d: Difficulty) {
    setDifficulty(d);
    setScreen("countdown");
  }

  function openLeaderboard(d: Difficulty) {
    setLbDiff(d);
    setEntries(game.getEntries(d));
    setScreen("leaderboard");
  }

  function handleWin(seconds: number) {
    sfx.win();
    setWinTime(seconds);
    setName("");
    setSubmitted(false);
    setHighlight(-1);
    setEntries(game.getEntries(difficulty));
    setScreen("victory");
  }

  function submitScore() {
    const { entries: next, rank } = game.addEntry(difficulty, name, winTime);
    setEntries(next);
    setHighlight(rank);
    setSubmitted(true);
  }

  function playAgain() {
    setRound((r) => r + 1);
    setScreen("countdown");
  }

  // Portal to <body> so the modal escapes <main>'s z-10 stacking context and
  // paints above the fixed header. Guarded for SSR (renders nothing when closed,
  // so there's no hydration mismatch).
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={requestClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={game.name}
            className="relative w-full h-full sm:h-[94dvh] sm:max-w-[1240px] flex flex-col overflow-hidden"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--paper-elev)",
              border: "1px solid var(--line-strong)",
            }}
          >
            {/* Header */}
            <header
              className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-7 py-4"
              style={{
                borderBottom: "1px solid var(--line-strong)",
                background: "var(--paper-elev)",
              }}
            >
              <div className="flex flex-col">
                <span
                  className="mono uppercase"
                  style={{ color: "var(--ink-faint)", fontSize: "0.65rem", letterSpacing: "0.08em" }}
                >
                  {g.heading}
                </span>
                <h3
                  className="text-ink"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}
                >
                  {game.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                aria-pressed={muted}
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid var(--line-strong)",
                  color: muted ? "var(--ink-faint)" : "var(--acid)",
                  background: "transparent",
                }}
              >
                {muted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={requestClose}
                aria-label={g.close}
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid var(--line-strong)",
                  color: "var(--ink-mute)",
                  background: "transparent",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M2 2L12 12M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              </div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-7 py-6">
              {screen === "difficulty" && (
                <DifficultyScreen
                  g={g}
                  coverIndex={game.coverIndex}
                  howToTitle={g.howToTitle}
                  howToBody={game.howToBody}
                  onStart={startGame}
                  onLeaderboard={openLeaderboard}
                />
              )}

              {screen === "leaderboard" && (
                <div className="min-h-full flex flex-col items-center justify-center gap-7 py-8">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="mono uppercase" style={{ color: "var(--ink-faint)", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                      {g.difficulty[lbDiff]}
                    </span>
                    <h4 className="text-ink" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
                      {g.leaderboardTitle}
                    </h4>
                  </div>
                  <div className="w-full max-w-xl">
                    <LeaderboardTable g={g} entries={entries} highlight={-1} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setScreen("difficulty")}
                    className="mono uppercase px-5 py-3 border"
                    style={btn}
                  >
                    ← {g.back}
                  </button>
                </div>
              )}

              {screen === "countdown" && (
                <Countdown goLabel={g.go} onDone={() => setScreen("game")} />
              )}

              {screen === "game" && (
                <game.Game
                  key={`${difficulty}-${round}`}
                  difficulty={difficulty}
                  onWin={handleWin}
                  onExit={() => setScreen("difficulty")}
                />
              )}

              {screen === "victory" && (
                <div className="relative min-h-full flex flex-col justify-center gap-6 w-full max-w-xl mx-auto">
                  <Confetti />
                  <div className="flex flex-col gap-1">
                    <span
                      className="mono uppercase"
                      style={{ color: "var(--acid)", fontSize: "0.7rem", letterSpacing: "0.1em" }}
                    >
                      {g.victoryTitle}
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span
                        className="mono uppercase"
                        style={{ color: "var(--ink-faint)", fontSize: "0.7rem", letterSpacing: "0.08em" }}
                      >
                        {g.yourTime}
                      </span>
                      <span
                        className="text-ink tabular-nums"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2.6rem", lineHeight: 1 }}
                      >
                        {formatTime(winTime)}
                      </span>
                    </div>
                  </div>

                  {!submitted ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitScore();
                      }}
                      className="flex flex-col gap-3 max-w-sm"
                    >
                      <label
                        className="mono uppercase"
                        style={{ color: "var(--ink-faint)", fontSize: "0.65rem", letterSpacing: "0.08em" }}
                      >
                        {g.enterName}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={g.namePlaceholder}
                        maxLength={24}
                        autoFocus
                        className="bg-transparent outline-none px-3 py-3 border text-ink"
                        style={{ borderColor: "var(--line-strong)", fontSize: "0.95rem" }}
                      />
                      <button
                        type="submit"
                        className="mono uppercase self-start px-5 py-3 border"
                        style={{ ...btn, background: "var(--acid)", color: "var(--paper)", borderColor: "var(--acid)" }}
                      >
                        {g.submit}
                      </button>
                    </form>
                  ) : (
                    <LeaderboardTable g={g} entries={entries} highlight={highlight} />
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={playAgain} className="mono uppercase px-4 py-2 border" style={btn}>
                      {g.playAgain}
                    </button>
                    <button
                      type="button"
                      onClick={() => setScreen("difficulty")}
                      className="mono uppercase px-4 py-2 border"
                      style={btn}
                    >
                      {g.exit}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

const btn: React.CSSProperties = {
  borderColor: "var(--line-strong)",
  color: "var(--ink)",
  background: "transparent",
  fontSize: "0.72rem",
  letterSpacing: "0.06em",
};

type G = ReturnType<typeof useLanguage>["t"]["miniGames"];

function DifficultyScreen({
  g,
  coverIndex,
  howToTitle,
  howToBody,
  onStart,
  onLeaderboard,
}: {
  g: G;
  coverIndex: number;
  howToTitle: string;
  howToBody: string;
  onStart: (d: Difficulty) => void;
  onLeaderboard: (d: Difficulty) => void;
}) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center gap-9 py-8">
      <div className="w-full max-w-md border border-line-strong overflow-hidden">
        <GameCover index={coverIndex} className="block w-full" style={{ height: 120 }} />
      </div>
      <h4
        className="text-ink text-center"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1 }}
      >
        {g.difficulty.choose}
      </h4>
      <div className="w-full max-w-4xl grid gap-4 sm:grid-cols-3">
        {DIFFICULTIES.map((d, i) => (
          <div key={d} className="flex flex-col gap-2">
            <motion.button
              type="button"
              onClick={() => onStart(d)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex flex-col items-start justify-between gap-10 p-6 border border-line-strong hover:border-[color:var(--acid)] text-left transition-colors duration-200"
              style={{ background: "var(--paper-soft)", minHeight: 210 }}
            >
              <span className="num-badge">{String(i + 1).padStart(2, "0")}</span>
              <span
                className="text-ink"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.9rem", letterSpacing: "-0.02em", lineHeight: 1 }}
              >
                {g.difficulty[d]}
              </span>
              <span
                className="mono uppercase inline-flex items-center gap-1.5"
                style={{ color: "var(--acid)", fontSize: "0.72rem", letterSpacing: "0.08em" }}
              >
                {g.play} →
              </span>
            </motion.button>
            <button
              type="button"
              onClick={() => onLeaderboard(d)}
              className="mono uppercase self-start py-1 hover:text-ink transition-colors"
              style={{ color: "var(--ink-faint)", fontSize: "0.62rem", letterSpacing: "0.06em" }}
            >
              {g.viewLeaderboard} ↗
            </button>
          </div>
        ))}
      </div>

      {/* How to play — merged in so there's no extra screen/click before playing */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-3 text-center border-t border-line-strong pt-7">
        <span className="mono uppercase" style={{ color: "var(--acid)", fontSize: "0.64rem", letterSpacing: "0.12em" }}>
          {howToTitle}
        </span>
        <p style={{ color: "var(--ink-mute)", fontSize: "0.92rem", lineHeight: 1.65 }}>{howToBody}</p>
      </div>
    </div>
  );
}

function LeaderboardTable({
  g,
  entries,
  highlight,
}: {
  g: G;
  entries: Entry[];
  highlight: number;
}) {
  if (entries.length === 0) {
    return (
      <p className="mono" style={{ color: "var(--ink-faint)", fontSize: "0.85rem" }}>
        {g.noScores}
      </p>
    );
  }
  return (
    <div className="flex flex-col">
      <div
        className="grid mono uppercase pb-2"
        style={{
          gridTemplateColumns: "48px 1fr auto",
          color: "var(--ink-faint)",
          fontSize: "0.62rem",
          letterSpacing: "0.08em",
        }}
      >
        <span>{g.rank}</span>
        <span>{g.name}</span>
        <span className="text-right">{g.time}</span>
      </div>
      {entries.map((e, i) => (
        <div
          key={`${e.name}-${e.date}-${i}`}
          className="grid items-center py-2 hairline-b"
          style={{
            gridTemplateColumns: "48px 1fr auto",
            background: i === highlight ? "var(--acid-faint)" : "transparent",
          }}
        >
          <span className="mono tabular-nums" style={{ color: "var(--ink-mute)", fontSize: "0.8rem" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-ink truncate" style={{ fontSize: "0.9rem" }}>
            {e.name}
          </span>
          <span
            className="mono tabular-nums text-right"
            style={{ color: "var(--ink)", fontSize: "0.85rem" }}
          >
            {formatTime(e.timeSeconds)}
          </span>
        </div>
      ))}
    </div>
  );
}

function Countdown({ goLabel, onDone }: { goLabel: string; onDone: () => void }) {
  // 3 → 2 → 1 → Go!  (index 0..3)
  const [i, setI] = useState(0);
  const steps = ["3", "2", "1", goLabel];

  useEffect(() => {
    if (i >= steps.length) {
      const id = window.setTimeout(onDone, 150);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setI((v) => v + 1), i === steps.length - 1 ? 650 : 750);
    return () => window.clearTimeout(id);
    // steps/onDone are stable for the lifetime of this screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  const label = steps[Math.min(i, steps.length - 1)];

  return (
    <div className="flex items-center justify-center" style={{ minHeight: 280 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(4rem, 18vw, 9rem)",
            lineHeight: 1,
            color: i === steps.length - 1 ? "var(--acid)" : "var(--ink)",
          }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
