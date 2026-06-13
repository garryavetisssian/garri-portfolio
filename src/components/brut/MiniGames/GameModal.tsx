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
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DIFFICULTIES, formatTime, type Difficulty, type Entry } from "./shared";

/** Everything GameModal needs to host a specific game. */
export interface GameDefinition {
  name: string;
  description: string;
  howToBody: string;
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
    setScreen("howto");
  }

  function openLeaderboard(d: Difficulty) {
    setLbDiff(d);
    setEntries(game.getEntries(d));
    setScreen("leaderboard");
  }

  function handleWin(seconds: number) {
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
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
            className="relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto"
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--paper-elev)",
              border: "1px solid var(--line-strong)",
            }}
          >
            {/* Header */}
            <header
              className="sticky top-0 z-20 flex items-center justify-between gap-3 px-5 sm:px-7 py-4"
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
            </header>

            <div className="px-5 sm:px-7 py-6">
              {screen === "difficulty" && (
                <DifficultyScreen g={g} onStart={startGame} onLeaderboard={openLeaderboard} />
              )}

              {screen === "leaderboard" && (
                <div className="flex flex-col gap-5">
                  <h4
                    className="text-ink"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem" }}
                  >
                    {g.leaderboardTitle} · {g.difficulty[lbDiff]}
                  </h4>
                  <LeaderboardTable g={g} entries={entries} highlight={-1} />
                  <button
                    type="button"
                    onClick={() => setScreen("difficulty")}
                    className="mono uppercase self-start px-4 py-2 border"
                    style={btn}
                  >
                    {g.back}
                  </button>
                </div>
              )}

              {screen === "howto" && (
                <div className="flex flex-col gap-5 max-w-xl">
                  <h4
                    className="text-ink"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem" }}
                  >
                    {g.howToTitle}
                  </h4>
                  <p style={{ color: "var(--ink-mute)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {game.howToBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => setScreen("countdown")}
                    className="mono uppercase self-start px-5 py-3 border"
                    style={{ ...btn, background: "var(--acid)", color: "var(--paper)", borderColor: "var(--acid)" }}
                  >
                    {g.gotIt}
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
                <div className="flex flex-col gap-6">
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
    </AnimatePresence>
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
  onStart,
  onLeaderboard,
}: {
  g: G;
  onStart: (d: Difficulty) => void;
  onLeaderboard: (d: Difficulty) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h4
        className="text-ink"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem" }}
      >
        {g.difficulty.choose}
      </h4>
      <div className="grid sm:grid-cols-3 gap-3">
        {DIFFICULTIES.map((d) => (
          <div
            key={d}
            className="flex flex-col gap-3 p-4 border"
            style={{ borderColor: "var(--line-strong)", background: "var(--paper-soft)" }}
          >
            <motion.button
              type="button"
              onClick={() => onStart(d)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="text-ink text-left"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem" }}
            >
              {g.difficulty[d]}
            </motion.button>
            <button
              type="button"
              onClick={() => onLeaderboard(d)}
              className="mono uppercase self-start"
              style={{ color: "var(--ink-faint)", fontSize: "0.62rem", letterSpacing: "0.06em" }}
            >
              {g.viewLeaderboard} ↗
            </button>
          </div>
        ))}
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
