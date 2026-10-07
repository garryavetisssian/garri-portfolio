// ─── Networking — leaderboard (localStorage) ──────────────────────────

import { createLeaderboard } from "../../shared";

const board = createLeaderboard("minigames_leaderboard_networking");

export const getEntries = board.getEntries;
export const addEntry = board.addEntry;
