"use client";

/**
 * MiniGamesSection — homepage section (sits just above the footer) showcasing
 * playable mini-games. Heading mirrors the other brutalist section headings
 * (mono eyebrow + display headline + acid full-stop). Hosts one shared
 * GameModal driven by whichever game card the visitor plays.
 */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import GameModal, { type GameDefinition } from "./GameModal";
import MeetingSchedulerGame from "./games/MeetingScheduler/MeetingSchedulerGame";
import {
  getEntries as msGetEntries,
  addEntry as msAddEntry,
} from "./games/MeetingScheduler/leaderboard";
import NetworkingGame from "./games/Networking/NetworkingGame";
import {
  getEntries as netGetEntries,
  addEntry as netAddEntry,
} from "./games/Networking/leaderboard";
import TeamBuilderGame from "./games/TeamBuilder/TeamBuilderGame";
import {
  getEntries as tbGetEntries,
  addEntry as tbAddEntry,
} from "./games/TeamBuilder/leaderboard";

/** Per-game accent + glyph so the cards read like playful game tiles. */
const GAME_ACCENTS = ["#9B6BFF", "#06B6D4", "#FB7185"];

const GAME_ICONS = [
  // Meeting Scheduler — grid / calendar
  <svg key="ms" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="3" width="18" height="18" />
    <path d="M3 9h18M9 9v12" />
  </svg>,
  // Networking — connected nodes
  <svg key="net" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="6" cy="7" r="2" />
    <circle cx="18" cy="7" r="2" />
    <circle cx="12" cy="18" r="2" />
    <path d="M8 7.4h8M7.2 8.6 10.8 16.4M16.8 8.6 13.2 16.4" />
  </svg>,
  // Team Builder — people
  <svg key="tb" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c0-3 2.5-4.6 5.5-4.6S14.5 16 14.5 19" />
    <circle cx="17.5" cy="8.5" r="2.2" />
    <path d="M15.5 14.6c2.8.3 5 1.9 5 4.4" />
  </svg>,
];

const GamepadIcon = (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 11h3M8.5 9.5v3" />
    <circle cx="15.5" cy="10.5" r="0.6" fill="currentColor" />
    <circle cx="17.5" cy="12.5" r="0.6" fill="currentColor" />
    <path d="M9 6.5h6a5.5 5.5 0 0 1 5.5 5.5c0 2-1 4.5-3 4.5-1.6 0-2-1.2-3.2-2.2-.5-.4-1-.6-1.8-.6h-1c-.8 0-1.3.2-1.8.6C7.5 15.3 7.1 16.5 5.5 16.5c-2 0-3-2.5-3-4.5A5.5 5.5 0 0 1 9 6.5Z" />
  </svg>
);

export default function MiniGamesSection() {
  const { t } = useLanguage();
  const g = t.miniGames;
  const [active, setActive] = useState<GameDefinition | null>(null);

  const games = useMemo<GameDefinition[]>(
    () => [
      {
        name: g.meetingScheduler.name,
        description: g.meetingScheduler.description,
        howToBody: g.howToBody,
        getEntries: msGetEntries,
        addEntry: msAddEntry,
        Game: MeetingSchedulerGame,
      },
      {
        name: g.networking.name,
        description: g.networking.description,
        howToBody: g.networking.howToBody,
        getEntries: netGetEntries,
        addEntry: netAddEntry,
        Game: NetworkingGame,
      },
      {
        name: g.teamBuilder.name,
        description: g.teamBuilder.description,
        howToBody: g.teamBuilder.howToBody,
        getEntries: tbGetEntries,
        addEntry: tbAddEntry,
        Game: TeamBuilderGame,
      },
    ],
    [g]
  );

  return (
    <section id="mini-games" className="relative py-24 border-t border-line-strong">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="mono text-ink-faint inline-flex items-center gap-2">
              <span aria-hidden style={{ color: "var(--acid)" }}>▶</span> {g.eyebrow}
            </p>
            <div className="flex items-center gap-4">
              <motion.span
                aria-hidden
                className="flex items-center justify-center shrink-0"
                whileHover={{ rotate: -8 }}
                style={{ width: 54, height: 54, background: "var(--acid)", color: "var(--paper)" }}
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game, i) => {
            const accent = GAME_ACCENTS[i % GAME_ACCENTS.length];
            return (
              <motion.button
                key={game.name}
                type="button"
                onClick={() => setActive(game)}
                whileHover={{ y: -8, borderColor: accent }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group text-left flex flex-col justify-between gap-6 p-6 border"
                style={{ background: "var(--paper-soft)", borderColor: "var(--line-strong)", minHeight: 230 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <span
                      className="flex items-center justify-center transition-transform duration-200 group-hover:-rotate-6"
                      style={{ width: 46, height: 46, background: accent, color: "var(--paper)" }}
                    >
                      {GAME_ICONS[i % GAME_ICONS.length]}
                    </span>
                    <span className="num-badge">{String(i + 1).padStart(2, "0")}</span>
                  </div>
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
                </div>

                <span
                  className="mono uppercase inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: accent, fontSize: "0.74rem", letterSpacing: "0.1em" }}
                >
                  {g.play} →
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <GameModal open={active !== null} game={active ?? games[0]} onClose={() => setActive(null)} />
    </section>
  );
}
