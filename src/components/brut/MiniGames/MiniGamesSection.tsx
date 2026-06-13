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
    ],
    [g]
  );

  return (
    <section id="mini-games" className="relative py-24 border-t border-line-strong">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="mb-12 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7">
            <p className="mono text-ink-faint mb-3">— {g.eyebrow}</p>
            <h2 className="headline-md text-ink">
              {g.heading.toUpperCase()}
              <span className="text-acid">.</span>
            </h2>
          </div>
          <p className="md:col-span-5 mono text-ink-mute">{g.blurb}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game, i) => (
            <motion.div
              key={game.name}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col justify-between gap-6 p-6 border border-line-strong"
              style={{ background: "var(--paper-soft)", minHeight: 220 }}
            >
              <div className="flex flex-col gap-3">
                <span className="num-badge">{String(i + 1).padStart(2, "0")}</span>
                <h3
                  className="text-ink"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  {game.name}
                </h3>
                <p className="prose-brut text-ink-mute" style={{ fontSize: "0.92rem" }}>
                  {game.description}
                </p>
              </div>

              <motion.button
                type="button"
                onClick={() => setActive(game)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="mono uppercase self-start inline-flex items-center gap-2 px-5 py-3 border"
                style={{
                  borderColor: "var(--acid)",
                  background: "var(--acid)",
                  color: "var(--paper)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                }}
              >
                {g.play} →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <GameModal open={active !== null} game={active ?? games[0]} onClose={() => setActive(null)} />
    </section>
  );
}
