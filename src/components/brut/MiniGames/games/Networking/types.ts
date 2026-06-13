// ─── Networking — core types & difficulty config ──────────────────────
//
// A node-placement logic puzzle: connect professionals (nodes) with edges so
// that every rule holds — exact per-node degree, no same-company edge, plus
// must-connect / blocked pair clues. The generator builds a valid graph first,
// derives clues from it, and the solver guarantees a unique solution.

import type { Difficulty } from "../../shared";

export type { Difficulty };

export interface NetDifficultyConfig {
  nodes: number;
  companies: number;
  /** Max degree any node may have; targets are derived within [2, degMax]. */
  degMax: number;
  mustConnect: number;
  blocked: number;
}

export const NET_DIFFICULTY_CONFIG: Record<Difficulty, NetDifficultyConfig> = {
  easy: { nodes: 5, companies: 2, degMax: 2, mustConnect: 1, blocked: 1 },
  medium: { nodes: 7, companies: 3, degMax: 3, mustConnect: 2, blocked: 2 },
  // Hard reveals only 2 connections; the generator then derives the ~6 "blocked"
  // deductions needed to force a unique solution, so the player has to reason
  // rather than just fill in the answer.
  hard: { nodes: 9, companies: 4, degMax: 4, mustConnect: 2, blocked: 0 },
};

export const HINTS_PER_GAME = 3;

/** Company colors (bright; dark ink reads on top). */
export const COMPANY_COLORS = ["#9B6BFF", "#06B6D4", "#FBBF24", "#FB7185"] as const;

export interface NetNode {
  id: number;
  label: string; // "A", "B", …
  company: number; // company index
  color: string; // company color
  degree: number; // required number of connections (target)
}

/** Undirected edge as an ordered pair [lo, hi] with lo < hi. */
export type Edge = [number, number];

export interface NetPuzzle {
  difficulty: Difficulty;
  nodes: NetNode[];
  mustConnect: Edge[];
  blocked: Edge[];
  /** The unique solution edge set — used for hints. */
  solution: Edge[];
}

/** Stable key for an undirected edge regardless of endpoint order. */
export function edgeKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

export function normEdge(a: number, b: number): Edge {
  return a < b ? [a, b] : [b, a];
}
