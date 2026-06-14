// ─── Team Builder — puzzle generator ──────────────────────────────────
//
// Discipline (same as the other games): never invent constraints blindly.
//   1. build a valid solution (people partitioned into teams),
//   2. derive each team's role requirements from its members,
//   3. derive seniority / headcount caps from the solution (always satisfiable),
//   4. seed conflict pairs across different teams, then add witness conflicts
//      (a pair forced together in an ALTERNATIVE solution) until unique,
//   5. regenerate if uniqueness isn't reached.

import {
  ROLE_COLORS,
  SENIOR_LEVEL,
  TB_DIFFICULTY_CONFIG,
  pairKey,
  type Difficulty,
  type Pair,
  type Person,
  type TBPuzzle,
  type Team,
} from "./types";
import { findTeamSolutions } from "./solver";

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function personLabel(i: number): string {
  return String.fromCharCode(65 + i);
}

function teamSizes(people: number, teams: number): number[] {
  const base = Math.floor(people / teams);
  const sizes = new Array(teams).fill(base);
  let extra = people - base * teams;
  for (let t = 0; t < teams && extra > 0; t++, extra--) sizes[t]++;
  return sizes;
}

function buildPuzzle(
  difficulty: Difficulty,
  roleTypes: number,
  roles: number[],
  seniority: number[],
  teamReq: number[][],
  requireSenior: boolean[],
  conflicts: Pair[],
  solution: number[]
): TBPuzzle {
  const people: Person[] = roles.map((role, id) => ({
    id,
    label: personLabel(id),
    role,
    seniority: seniority[id],
  }));
  const teams: Team[] = teamReq.map((roleReq, id) => ({
    id,
    roleReq,
    requireSenior: requireSenior[id],
    maxHeadcount: roleReq.reduce((s, n) => s + n, 0),
  }));
  return { difficulty, roleTypes, people, teams, conflicts: shuffle(conflicts), solution };
}

export function generateTeamPuzzle(difficulty: Difficulty): TBPuzzle {
  const cfg = TB_DIFFICULTY_CONFIG[difficulty];
  const P = cfg.people;
  const T = cfg.teams;

  for (let attempt = 0; attempt < 400; attempt++) {
    // People: random role + seniority (bias toward J/M, fewer S).
    const roles = Array.from({ length: P }, () => Math.floor(Math.random() * cfg.roleTypes));
    const seniority = Array.from({ length: P }, () => {
      const r = Math.random();
      return r < 0.45 ? 0 : r < 0.8 ? 1 : 2;
    });

    // Solution: partition people into teams of the chosen sizes.
    const sizes = teamSizes(P, T);
    const order = shuffle([...Array(P).keys()]);
    const solution = new Array(P).fill(-1);
    let idx = 0;
    for (let t = 0; t < T; t++) {
      for (let k = 0; k < sizes[t]; k++) solution[order[idx++]] = t;
    }

    // Derive each team's exact role requirements.
    const teamReq: number[][] = Array.from({ length: T }, () => new Array(cfg.roleTypes).fill(0));
    for (let p = 0; p < P; p++) teamReq[solution[p]][roles[p]]++;

    // Seniority requirement: only on teams that actually have a senior (so it's
    // satisfiable). Headcount cap is exact (= team size) and always applies.
    const requireSenior = new Array(T).fill(false);
    if (cfg.seniority) {
      for (let t = 0; t < T; t++) {
        const hasSenior = solution.some((tt, p) => tt === t && seniority[p] >= SENIOR_LEVEL);
        if (hasSenior && Math.random() < 0.75) requireSenior[t] = true;
      }
    }

    // Seed conflict pairs across DIFFERENT solution teams (so they're satisfiable
    // and actually rule out swaps).
    const crossPairs: Pair[] = [];
    for (let a = 0; a < P; a++) {
      for (let b = a + 1; b < P; b++) {
        if (solution[a] !== solution[b]) crossPairs.push([a, b]);
      }
    }
    const conflicts: Pair[] = shuffle(crossPairs).slice(
      0,
      Math.min(cfg.conflictPairs, crossPairs.length)
    );
    const used = new Set(conflicts.map(([a, b]) => pairKey(a, b)));

    const input = () => ({
      roles,
      senior: seniority.map((s) => s >= SENIOR_LEVEL),
      teams: teamReq.map((roleReq, t) => ({ roleReq, requireSenior: requireSenior[t] })),
      conflicts,
    });

    // Witness-tighten: block an alternative by forbidding a pair that the
    // alternative puts on the SAME team but the target keeps apart.
    let unique = false;
    for (let guard = 0; guard < 30; guard++) {
      const sols = findTeamSolutions(input(), 2);
      if (sols.length <= 1) {
        unique = sols.length === 1;
        break;
      }
      const alt = sols.find((s) => s.some((tt, p) => tt !== solution[p]));
      if (!alt) break;
      let added = false;
      outer: for (let a = 0; a < P; a++) {
        for (let b = a + 1; b < P; b++) {
          if (alt[a] === alt[b] && solution[a] !== solution[b] && !used.has(pairKey(a, b))) {
            conflicts.push([a, b]);
            used.add(pairKey(a, b));
            added = true;
            break outer;
          }
        }
      }
      if (!added) break;
    }

    if (unique) {
      return buildPuzzle(
        difficulty,
        cfg.roleTypes,
        roles,
        seniority,
        teamReq,
        requireSenior,
        conflicts,
        solution
      );
    }
    // else regenerate
  }

  // Deterministic fallback: a fresh valid solution with no extra conflicts.
  const roles = Array.from({ length: P }, (_, i) => i % cfg.roleTypes);
  const seniority = Array.from({ length: P }, () => 1);
  const sizes = teamSizes(P, T);
  const solution = new Array(P).fill(0);
  let idx = 0;
  for (let t = 0; t < T; t++) for (let k = 0; k < sizes[t]; k++) solution[idx++] = t;
  const teamReq: number[][] = Array.from({ length: T }, () => new Array(cfg.roleTypes).fill(0));
  for (let p = 0; p < P; p++) teamReq[solution[p]][roles[p]]++;
  return buildPuzzle(
    difficulty,
    cfg.roleTypes,
    roles,
    seniority,
    teamReq,
    new Array(T).fill(false),
    [],
    solution
  );
}

export { ROLE_COLORS };
