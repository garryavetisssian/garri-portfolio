// ─── Networking — backtracking uniqueness solver ──────────────────────
//
// Searches all edge sets over the "allowed" pairs (different company only) that
// satisfy: exact per-node degree, must-connect ⊆ E, blocked ∩ E = ∅. Counts
// solutions (capped at 2) to classify uniqueness. n ≤ 9 so the candidate-pair
// list is tiny (≤ 36) and degree pruning keeps the search trivial.

import { edgeKey, type Edge } from "./types";

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

export function classifyNetworkSolutions(input: SolverInput): SolveResult {
  const { nodeCount, company, targets, mustConnect, blocked } = input;

  const blockedSet = new Set(blocked.map(([a, b]) => edgeKey(a, b)));
  const mustSet = new Set(mustConnect.map(([a, b]) => edgeKey(a, b)));

  // Candidate pairs = allowed pairs minus blocked. Must-connect pairs are forced.
  const pairs = allowedPairs(nodeCount, company).filter(
    ([a, b]) => !blockedSet.has(edgeKey(a, b))
  );

  // A must-connect edge that isn't an allowed/candidate pair is unsatisfiable.
  for (const [a, b] of mustConnect) {
    if (company[a] === company[b]) return "no-solution";
    if (blockedSet.has(edgeKey(a, b))) return "no-solution";
  }

  const deg = new Array(nodeCount).fill(0);

  // Force the must-connect edges up front.
  const forced: Edge[] = [];
  const optional: Edge[] = [];
  for (const p of pairs) {
    if (mustSet.has(edgeKey(p[0], p[1]))) forced.push(p);
    else optional.push(p);
  }
  for (const [a, b] of forced) {
    deg[a]++;
    deg[b]++;
    if (deg[a] > targets[a] || deg[b] > targets[b]) return "no-solution";
  }

  // Remaining degree need per node after forced edges.
  // Order optional pairs to branch on the most-constrained nodes first.
  let count = 0;

  // Max degree still attainable for a node from undecided optional pairs.
  function search(idx: number): void {
    if (count >= 2) return;

    if (idx === optional.length) {
      for (let v = 0; v < nodeCount; v++) {
        if (deg[v] !== targets[v]) return;
      }
      count++;
      return;
    }

    const [a, b] = optional[idx];

    // Prune: how many optional pairs (idx..end) still touch each node?
    // Cheap bound — only check the two endpoints of this pair.
    const remainingFor = (node: number): number => {
      let r = 0;
      for (let k = idx; k < optional.length; k++) {
        if (optional[k][0] === node || optional[k][1] === node) r++;
      }
      return r;
    };

    // Option 1: include edge (a,b) if it doesn't overshoot either target.
    if (deg[a] < targets[a] && deg[b] < targets[b]) {
      deg[a]++;
      deg[b]++;
      search(idx + 1);
      deg[a]--;
      deg[b]--;
      if (count >= 2) return;
    }

    // Option 2: exclude edge (a,b) — only if both endpoints can still reach
    // their targets using the remaining optional pairs.
    const needA = targets[a] - deg[a];
    const needB = targets[b] - deg[b];
    if (remainingFor(a) - 1 >= needA && remainingFor(b) - 1 >= needB) {
      search(idx + 1);
    }
  }

  search(0);
  return count === 0 ? "no-solution" : count === 1 ? "unique" : "multiple-solutions";
}
