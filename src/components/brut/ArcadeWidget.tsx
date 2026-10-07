"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import GameModal, { type GameDefinition } from "./MiniGames/GameModal";
import MeetingSchedulerGame from "./MiniGames/games/MeetingScheduler/MeetingSchedulerGame";
import {
  getEntries as msGetEntries,
  addEntry as msAddEntry,
} from "./MiniGames/games/MeetingScheduler/leaderboard";
import NetworkingGame from "./MiniGames/games/Networking/NetworkingGame";
import {
  getEntries as netGetEntries,
  addEntry as netAddEntry,
} from "./MiniGames/games/Networking/leaderboard";
import TeamBuilderGame from "./MiniGames/games/TeamBuilder/TeamBuilderGame";
import {
  getEntries as tbGetEntries,
  addEntry as tbAddEntry,
} from "./MiniGames/games/TeamBuilder/leaderboard";
import { GameCover } from "./MiniGames/covers";
// Removed the broken COLORS import entirely

/** Per-game accent so each tile reads as its own game. */
const GAME_ACCENTS = ["#00D4AA", "#A78BFA", "#3B82F6"]; 

const GamepadIcon = (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 11h3M8.5 9.5v3" />
    <circle cx="15.5" cy="10.5" r="0.6" fill="currentColor" />
    <circle cx="17.5" cy="12.5" r="0.6" fill="currentColor" />
    <path d="M9 6.5h6a5.5 5.5 0 0 1 5.5 5.5c0 2-1 4.5-3 4.5-1.6 0-2-1.2-3.2-2.2-.5-.4-1-.6-1.8-.6h-1c-.8 0-1.3.2-1.8.6C7.5 15.3 7.1 16.5 5.5 16.5c-2 0-3-2.5-3-4.5A5.5 5.5 0 0 1 9 6.5Z" />
  </svg>
);

export default function ArcadeWidget() {
  const { t } = useLanguage();
  const g = t.miniGames;
  const [active, setActive] = useState<GameDefinition | null>(null);

  const games = useMemo<GameDefinition[]>(
    () => [
      {
        name: g.meetingScheduler.name,
        description: g.meetingScheduler.description,
        howToBody: g.howToBody,
        coverIndex: 0,
        getEntries: msGetEntries,
        addEntry: msAddEntry,
        Game: MeetingSchedulerGame,
      },
      {
        name: g.networking.name,
        description: g.networking.description,
        howToBody: g.networking.howToBody,
        coverIndex: 1,
        getEntries: netGetEntries,
        addEntry: netAddEntry,
        Game: NetworkingGame,
      },
      {
        name: g.teamBuilder.name,
        description: g.teamBuilder.description,
        howToBody: g.teamBuilder.howToBody,
        coverIndex: 2,
        getEntries: tbGetEntries,
        addEntry: tbAddEntry,
        Game: TeamBuilderGame,
      },
    ],
    [g]
  );

  return (
    <section id="arcade-widget" className="relative py-24 section-border-strong">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="mono text-ink-faint inline-flex items-center gap-2">
              <span aria-hidden style={{ color: GAME_ACCENTS[0] }}></span> {g.eyebrow}

            </p>
            <div className="flex items-center gap-4">
              <motion.span
                aria-hidden
                className="flex items-center justify-center shrink-0"
                whileHover={{ rotate: -8 }}
                style={{ width: 54, height: 54, background: GAME_ACCENTS[0], color: "#000" }}

              >
                {GamepadIcon}
              </motion.span>
              <h2
                className="text-ink"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                }}
              >
                {g.heading}
                <span className="text-acid">.</span>
              </h2>
            </div>
          </div>
          <p className="mono text-ink-mute md:max-w-xs md:text-right">{g.blurb}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, i) => {
            const accent = GAME_ACCENTS[i % GAME_ACCENTS.length];
            return (
              <motion.button
                key={game.name}
                type="button"
                onClick={() => setActive(game)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex flex-col overflow-hidden"
                style={{
                  background: "#0B0B0A",
                  border: `2px solid rgba(255,255,255,0.08)`,
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* illustrated cover banner */}
                <div className="relative">
                  <GameCover index={game.coverIndex} className="block w-full" style={{ height: 140 }} />
                  <span className="num-badge absolute" style={{ top: 14, left: 14, background: accent, color: "#0B0B0A", padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-6 flex-1">
                  <h3
                    className="text-ink"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.55rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                    }}
                  >
                    {game.name}
                  </h3>
                  <p className="prose-brut text-ink-mute" style={{ fontSize: "0.9rem" }}>
                    {game.description}
                  </p>
                  <span
                    className="mono uppercase inline-flex items-center gap-2 mt-2 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: accent, fontSize: "0.74rem", letterSpacing: "0.1em" }}
                  >
                    {g.play} →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <GameModal open={active !== null} game={active ?? games[0]} onClose={() => setActive(null)} />
      </div>
    </section>
  );
}