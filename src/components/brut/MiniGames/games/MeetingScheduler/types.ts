// ─── Meeting Scheduler — core types & difficulty config ───────────────
//
// The puzzle is a (room × time-slot) grid. Each meeting occupies exactly one
// cell, and no two meetings share a cell. Constraints are *true statements*
// about a known solution (see generator.ts), and a backtracking solver
// (solver.ts) guarantees that the constraint set admits exactly one solution.

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export interface DifficultyConfig {
  rooms: number;
  slots: number;
  meetings: number;
  /** Starting number of derived constraints (more may be added to force uniqueness). */
  constraints: number;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: { rooms: 3, slots: 4, meetings: 4, constraints: 4 },
  medium: { rooms: 4, slots: 5, meetings: 6, constraints: 6 },
  hard: { rooms: 5, slots: 6, meetings: 8, constraints: 9 },
};

/** Hints available per game, regardless of difficulty. */
export const HINTS_PER_GAME = 3;

export interface Meeting {
  id: number; // 0-based; also the index into Assignment
  label: string; // "A", "B", "C", …
  color: string; // bright chip color (dark text reads on top)
}

/** Vivid, distinct chip colors — dark ink reads cleanly on each. */
export const MEETING_COLORS = [
  "#9B6BFF",
  "#F472B6",
  "#06B6D4",
  "#FBBF24",
  "#34D399",
  "#FB7185",
  "#60A5FA",
  "#A3E635",
] as const;

export type Constraint =
  | { kind: "in-room"; meeting: number; room: number } // X must be in Room Y
  | { kind: "before"; meeting: number; other: number } // X must be before Y (earlier slot)
  | { kind: "not-same-slot"; meeting: number; other: number } // X and Y cannot share a slot
  | { kind: "at-slot"; meeting: number; slot: number } // X must be at slot Y
  | { kind: "room-before-slot"; room: number; slot: number }; // Room Y must have a meeting before slot Z

export interface Placement {
  room: number;
  slot: number;
}

/** index = meeting id; null = not yet placed. */
export type Assignment = (Placement | null)[];

export interface Puzzle {
  difficulty: Difficulty;
  rooms: number;
  slots: number;
  meetings: Meeting[];
  constraints: Constraint[];
  /** The unique full solution — used only for hints. */
  solution: Placement[];
}
