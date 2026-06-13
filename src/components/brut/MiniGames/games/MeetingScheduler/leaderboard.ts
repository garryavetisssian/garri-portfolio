// ─── Meeting Scheduler — localStorage leaderboard ─────────────────────
//
// Persists the top 10 fastest solves per difficulty in localStorage.
// All access is guarded for SSR (typeof window) and corrupt-data tolerant.

import type { Difficulty } from "./types";

const STORAGE_KEY = "minigames_leaderboard_meeting_scheduler";
const MAX_ENTRIES = 10;

export interface Entry {
  name: string;
  timeSeconds: number;
  date: string; // YYYY-MM-DD
}

export interface Board {
  easy: Entry[];
  medium: Entry[];
  hard: Entry[];
}

function emptyBoard(): Board {
  return { easy: [], medium: [], hard: [] };
}

function isEntry(v: unknown): v is Entry {
  if (typeof v !== "object" || v === null) return false;
  const e = v as Record<string, unknown>;
  return (
    typeof e.name === "string" &&
    typeof e.timeSeconds === "number" &&
    typeof e.date === "string"
  );
}

function sanitizeList(v: unknown): Entry[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter(isEntry)
    .sort((a, b) => a.timeSeconds - b.timeSeconds)
    .slice(0, MAX_ENTRIES);
}

export function loadBoard(): Board {
  if (typeof window === "undefined") return emptyBoard();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyBoard();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      easy: sanitizeList(parsed.easy),
      medium: sanitizeList(parsed.medium),
      hard: sanitizeList(parsed.hard),
    };
  } catch {
    return emptyBoard();
  }
}

function saveBoard(board: Board): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch {
    // Storage full / disabled — leaderboard is best-effort, fail quietly.
  }
}

export function getEntries(difficulty: Difficulty): Entry[] {
  return loadBoard()[difficulty];
}

function todayISO(): string {
  // Local date as YYYY-MM-DD (date only, no time).
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Record a finished game. Returns the updated, sorted, capped list for that
 * difficulty along with the index of the entry that was just added (or -1 if it
 * didn't make the top 10).
 */
export function addEntry(
  difficulty: Difficulty,
  name: string,
  timeSeconds: number
): { entries: Entry[]; rank: number } {
  const board = loadBoard();
  const entry: Entry = {
    name: name.trim().slice(0, 24) || "Anonymous",
    timeSeconds,
    date: todayISO(),
  };
  const list = [...board[difficulty], entry].sort(
    (a, b) => a.timeSeconds - b.timeSeconds
  );
  const rank = list.indexOf(entry);
  const capped = list.slice(0, MAX_ENTRIES);
  board[difficulty] = capped;
  saveBoard(board);
  return { entries: capped, rank: rank < MAX_ENTRIES ? rank : -1 };
}

/** mm:ss formatter shared by the game and victory screens. */
export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
