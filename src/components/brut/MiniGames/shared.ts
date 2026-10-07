// ─── MiniGames — shared primitives ────────────────────────────────────
//
// Difficulty type, a localStorage leaderboard factory, and a time formatter,
// shared across games so GameModal can stay game-agnostic. Each game supplies
// its own storage key via createLeaderboard().

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

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

const MAX_ENTRIES = 10;

/** mm:ss formatter shared by every game and the victory screen. */
export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
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

function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export interface Leaderboard {
  getEntries: (difficulty: Difficulty) => Entry[];
  addEntry: (
    difficulty: Difficulty,
    name: string,
    timeSeconds: number
  ) => { entries: Entry[]; rank: number };
}

/** Build an SSR-safe, corrupt-data-tolerant leaderboard backed by localStorage. */
export function createLeaderboard(storageKey: string): Leaderboard {
  function loadBoard(): Board {
    if (typeof window === "undefined") return emptyBoard();
    try {
      const raw = window.localStorage.getItem(storageKey);
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
      window.localStorage.setItem(storageKey, JSON.stringify(board));
    } catch {
      // best-effort; storage may be full or disabled
    }
  }

  return {
    getEntries(difficulty) {
      return loadBoard()[difficulty];
    },
    addEntry(difficulty, name, timeSeconds) {
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
    },
  };
}
