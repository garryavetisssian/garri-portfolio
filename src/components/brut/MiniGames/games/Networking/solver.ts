// ─── Networking — backtracking uniqueness solver ──────────────────────
//
// Searches all edge sets over the "allowed" pairs (different company only) that
// satisfy: exact per-node degree, must-connect ⊆ E, blocked ∩ E = ∅. Counts
// solutions (capped at 2) to classify uniqueness. n ≤ 9 so the candidate-pair
// list is tiny (≤ 36) and degree pruning keeps the search trivial.

import { edgeKey, normEdge, type Edge } from "./types";

export type SolveResult = "unique" | "no-solution" | "multiple-solutions";

export interface SolverInput {
  nodeCount: number;
  company: number[]; // company[i]
  targets: number[]; // required degree per node
  mustConnect: Edge[];
  blocked: Edge[];
}

/** All different-company pairs (the only legal edges). */
export function allowedPairs(nodeCount: number, company: number[]): Edge[] {
  const pairs: Edge[] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (company[i] !== company[j]) pairs.push([i, j]);
    }
  }
  return pairs;
}

/**
 * Enumerate up to `limit` solutions as edge lists. Returns [] for no-solution.
 * The generator uses limit=2 both to classify uniqueness AND to obtain a
 * concrete *alternative* solution it can break by blocking one of its edges.
 */
export function findSolutions(input: SolverInput, limit = 2): Edge[][] {
  const { nodeCount, company, targets, mustConnect, blocked } = input;

  const blockedSet = new Set(blocked.map(([a, b]) => edgeKey(a, b)));
  const mustSet = new Set(mustConnect.map(([a, b]) => edgeKey(a, b)));

  // A must-connect edge that's same-company or blocked is unsatisfiable.
  for (const [a, b] of mustConnect) {
    if (company[a] === company[b]) return [];
    if (blockedSet.has(edgeKey(a, b))) return [];
  }

  // Candidate pairs = allowed pairs minus blocked. Must-connect pairs are forced.
  const pairs = allowedPairs(nodeCount, company).filter(
    ([a, b]) => !blockedSet.has(edgeKey(a, b))
  );

  const deg = new Array(nodeCount).fill(0);
  const forced: Edge[] = [];
  const optional: Edge[] = [];
  for (const p of pairs) {
    if (mustSet.has(edgeKey(p[0], p[1]))) forced.push(p);
    else optional.push(p);
  }
  for (const [a, b] of forced) {
    deg[a]++;
    deg[b]++;
    if (deg[a] > targets[a] || deg[b] > targets[b]) return [];
  }

  const results: Edge[][] = [];
  const chosen: Edge[] = [];

  const remainingFor = (node: number, idx: number): number => {
    let r = 0;
    for (let k = idx; k < optional.length; k++) {
      if (optional[k][0] === node || optional[k][1] === node) r++;
    }
    return r;
  };

  function search(idx: number): void {
    if (results.length >= limit) return;

    if (idx === optional.length) {
      for (let v = 0; v < nodeCount; v++) if (deg[v] !== targets[v]) return;
      results.push([...forced, ...chosen].map(([a, b]) => normEdge(a, b)));
      return;
    }

    const [a, b] = optional[idx];

    // Include edge (a,b) if it doesn't overshoot either target.
    if (deg[a] < targets[a] && deg[b] < targets[b]) {
      deg[a]++;
      deg[b]++;
      chosen.push([a, b]);
      search(idx + 1);
      chosen.pop();
      deg[a]--;
      deg[b]--;
      if (results.length >= limit) return;
    }

    // Exclude edge (a,b) — only if both endpoints can still reach their targets.
    const needA = targets[a] - deg[a];
    const needB = targets[b] - deg[b];
    if (remainingFor(a, idx) - 1 >= needA && remainingFor(b, idx) - 1 >= needB) {
      search(idx + 1);
    }
  }

  search(0);
  return results;
}

export function classifyNetworkSolutions(input: SolverInput): SolveResult {
  const n = findSolutions(input, 2).length;
  return n === 0 ? "no-solution" : n === 1 ? "unique" : "multiple-solutions";
}
