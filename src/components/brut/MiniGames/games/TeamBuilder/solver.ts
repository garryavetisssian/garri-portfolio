// ─── Team Builder — backtracking uniqueness solver ────────────────────
//
// Assigns every person to a team respecting: exact per-role headcount per team,
// no conflicting people on the same team, and per-team "needs a senior". Counts
// solutions (capped at 2) to classify uniqueness, and can return a concrete
// alternative so the generator can break it with a derived conflict.

import { pairKey, type Pair } from "./types";

export type SolveResult = "unique" | "no-solution" | "multiple-solutions";

export interface TBInput {
  roles: number[]; // roles[personId]
  senior: boolean[]; // senior[personId]
  teams: { roleReq: number[]; requireSenior: boolean }[];
  conflicts: Pair[];
}

/** Enumerate up to `limit` solutions as person→team arrays. [] = no solution. */
export function findTeamSolutions(input: TBInput, limit = 2): number[][] {
  const { roles, senior, teams, conflicts } = input;
  const P = roles.length;
  const T = teams.length;

  const adj = new Map<number, Set<number>>();
  for (const [a, b] of conflicts) {
    if (!adj.has(a)) adj.set(a, new Set());
    if (!adj.has(b)) adj.set(b, new Set());
    adj.get(a)!.add(b);
    adj.get(b)!.add(a);
  }

  const rem = teams.map((t) => t.roleReq.slice()); // remaining role capacity
  const members: number[][] = teams.map(() => []);
  const assign = new Array(P).fill(-1);
  const results: number[][] = [];

  function legalTeams(p: number): number[] {
    const r = roles[p];
    const conf = adj.get(p);
    const out: number[] = [];
    for (let t = 0; t < T; t++) {
      if (rem[t][r] <= 0) continue;
      if (conf && members[t].some((m) => conf.has(m))) continue;
      out.push(t);
    }
    return out;
  }

  function search(): void {
    if (results.length >= limit) return;

    // MRV: branch on the unassigned person with the fewest legal teams.
    let pick = -1;
    let bestTeams: number[] = [];
    let best = Infinity;
    for (let p = 0; p < P; p++) {
      if (assign[p] !== -1) continue;
      const lt = legalTeams(p);
      if (lt.length < best) {
        best = lt.length;
        pick = p;
        bestTeams = lt;
        if (best === 0) break;
      }
    }

    if (pick === -1) {
      // All placed; role counts are exact by construction. Check senior reqs.
      for (let t = 0; t < T; t++) {
        if (teams[t].requireSenior && !members[t].some((m) => senior[m])) return;
      }
      results.push(assign.slice());
      return;
    }
    if (bestTeams.length === 0) return;

    const r = roles[pick];
    for (const t of bestTeams) {
      assign[pick] = t;
      rem[t][r]--;
      members[t].push(pick);
      search();
      members[t].pop();
      rem[t][r]++;
      assign[pick] = -1;
      if (results.length >= limit) return;
    }
  }

  search();
  return results;
}

export function classifyTeamSolutions(input: TBInput): SolveResult {
  const n = findTeamSolutions(input, 2).length;
  return n === 0 ? "no-solution" : n === 1 ? "unique" : "multiple-solutions";
}

export { pairKey };
