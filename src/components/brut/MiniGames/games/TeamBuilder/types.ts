// ─── Team Builder — core types & difficulty config ────────────────────
//
// A constraint-satisfaction placement puzzle: assign every person to exactly
// one team so each team's role requirements are met, no conflicting people
// share a team, seniority requirements hold, and no team exceeds its size.
// The generator builds a valid solution first and derives constraints from it.

import type { Difficulty } from "../../shared";

export type { Difficulty };

export interface TBConfig {
  people: number;
  teams: number;
  roleTypes: number;
  conflictPairs: number;
  seniority: boolean; // teams may require a senior
  headcount: boolean; // headcount caps emphasised
}

export const TB_DIFFICULTY_CONFIG: Record<Difficulty, TBConfig> = {
  easy: { people: 6, teams: 2, roleTypes: 3, conflictPairs: 2, seniority: false, headcount: false },
  medium: { people: 9, teams: 3, roleTypes: 4, conflictPairs: 3, seniority: true, headcount: false },
  hard: { people: 12, teams: 4, roleTypes: 5, conflictPairs: 4, seniority: true, headcount: true },
};

export const HINTS_PER_GAME = 3;

/** Short, language-neutral role abbreviations + a color per role. */
export const ROLE_ABBR = ["DSG", "DEV", "PM", "QA", "DTA"] as const;
export const ROLE_COLORS = ["#9B6BFF", "#06B6D4", "#FBBF24", "#34D399", "#FB7185"] as const;

/** Seniority: 0 = Junior, 1 = Mid, 2 = Senior. */
export const SENIORITY_ABBR = ["J", "M", "S"] as const;
export const SENIOR_LEVEL = 2;

export interface Person {
  id: number;
  label: string; // "A", "B", …
  role: number; // index into ROLE_ABBR
  seniority: number; // 0..2
}

export interface Team {
  id: number;
  roleReq: number[]; // required count per role index
  requireSenior: boolean;
  maxHeadcount: number; // == sum(roleReq); exceeding it is a violation
}

export type Pair = [number, number];

export interface TBPuzzle {
  difficulty: Difficulty;
  roleTypes: number;
  people: Person[];
  teams: Team[];
  conflicts: Pair[];
  /** Unique solution: person id → team id. Used for hints. */
  solution: number[];
}

export function pairKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}
