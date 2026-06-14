// ─── Team Builder — leaderboard (localStorage) ────────────────────────

import { createLeaderboard } from "../../shared";

const board = createLeaderboard("minigames_leaderboard_team_builder");

export const getEntries = board.getEntries;
export const addEntry = board.addEntry;
