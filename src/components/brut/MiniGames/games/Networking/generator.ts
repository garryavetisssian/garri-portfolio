// ─── Networking — puzzle generator ────────────────────────────────────
//
// Same discipline as Meeting Scheduler: never invent clues speculatively.
//   1. assign nodes to companies (none larger than ceil(n/2)),
//   2. build a VALID edge set (different-company edges, degree ≤ degMax),
//   3. derive must-connect from solution edges + blocked from allowed non-edges,
//   4. verify uniqueness with the solver,
//   5. add one more derived clue if ambiguous,
//   6. regenerate from scratch if not unique within 10 additions.
// Node degree targets are the REALIZED degrees of the solution, so a solution
// is guaranteed to exist.

import {
  COMPANY_COLORS,
  NET_DIFFICULTY_CONFIG,
  edgeKey,
  normEdge,
  type Difficulty,
  type Edge,
  type NetNode,
  type NetPuzzle,
} from "./types";
import { allowedPairs, classifyNetworkSolutions } from "./solver";

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function nodeLabel(i: number): string {
  return String.fromCharCode(65 + i);
}

/** Step 1 — companies, each with ≤ ceil(n/2) nodes, every company non-empty. */
function assignCompanies(n: number, companies: number): number[] {
  const cap = Math.ceil(n / 2);
  for (let attempt = 0; attempt < 200; attempt++) {
    const company = new Array(n).fill(0);
    // Seed one node per company so none is empty.
    const order = shuffle([...Array(n).keys()]);
    const counts = new Array(companies).fill(0);
    let ok = true;
    for (let k = 0; k < n; k++) {
      const node = order[k];
      if (k < companies) {
        company[node] = k;
        counts[k]++;
      } else {
        const choices = shuffle([...Array(companies).keys()]).filter((c) => counts[c] < cap);
        if (choices.length === 0) {
          ok = false;
          break;
        }
        company[node] = choices[0];
        counts[choices[0]]++;
      }
    }
    if (ok) return company;
  }
  // Fallback: round-robin (still respects cap for these sizes).
  return Array.from({ length: n }, (_, i) => i % companies);
}

/**
 * Step 2 — greedily build a random valid graph: shuffle allowed pairs, add each
 * if both endpoints stay below degMax. Yields degrees near degMax (≈ regular).
 */
function buildSolutionEdges(
  n: number,
  company: number[],
  degMax: number
): Edge[] {
  const deg = new Array(n).fill(0);
  const edges: Edge[] = [];
  for (const [a, b] of shuffle(allowedPairs(n, company))) {
    if (deg[a] < degMax && deg[b] < degMax) {
      edges.push([a, b]);
      deg[a]++;
      deg[b]++;
    }
  }
  return edges;
}

function buildPuzzle(
  difficulty: Difficulty,
  company: number[],
  solution: Edge[],
  mustConnect: Edge[],
  blocked: Edge[]
): NetPuzzle {
  const n = company.length;
  const deg = new Array(n).fill(0);
  for (const [a, b] of solution) {
    deg[a]++;
    deg[b]++;
  }
  const nodes: NetNode[] = [];
  for (let i = 0; i < n; i++) {
    nodes.push({
      id: i,
      label: nodeLabel(i),
      company: company[i],
      color: COMPANY_COLORS[company[i] % COMPANY_COLORS.length],
      degree: deg[i],
    });
  }
  return {
    difficulty,
    nodes,
    mustConnect: shuffle(mustConnect),
    blocked: shuffle(blocked),
    solution,
  };
}

export function generateNetworkPuzzle(difficulty: Difficulty): NetPuzzle {
  const cfg = NET_DIFFICULTY_CONFIG[difficulty];
  const n = cfg.nodes;

  for (let attempt = 0; attempt < 400; attempt++) {
    const company = assignCompanies(n, cfg.companies);
    const solution = buildSolutionEdges(n, company, cfg.degMax);

    // Need at least one edge so degree targets aren't all 0.
    if (solution.length === 0) continue;
    const targets = new Array(n).fill(0);
    for (const [a, b] of solution) {
      targets[a]++;
      targets[b]++;
    }
    // Every node should need ≥ 1 connection (no isolated nodes in the puzzle).
    if (targets.some((d) => d === 0)) continue;

    const solutionSet = new Set(solution.map(([a, b]) => edgeKey(a, b)));

    // Candidate must-connect = solution edges. Blocked = allowed non-edges.
    const mustPool = shuffle(solution.slice());
    const blockedPool = shuffle(
      allowedPairs(n, company).filter(([a, b]) => !solutionSet.has(edgeKey(a, b)))
    );

    const mustConnect: Edge[] = mustPool
      .slice(0, Math.min(cfg.mustConnect, mustPool.length))
      .map(([a, b]) => normEdge(a, b));
    const blocked: Edge[] = blockedPool
      .slice(0, Math.min(cfg.blocked, blockedPool.length))
      .map(([a, b]) => normEdge(a, b));

    const usedMust = new Set(mustConnect.map(([a, b]) => edgeKey(a, b)));
    const usedBlocked = new Set(blocked.map(([a, b]) => edgeKey(a, b)));
    const extraMust = mustPool.filter(([a, b]) => !usedMust.has(edgeKey(a, b)));
    const extraBlocked = blockedPool.filter(([a, b]) => !usedBlocked.has(edgeKey(a, b)));

    const check = () =>
      classifyNetworkSolutions({ nodeCount: n, company, targets, mustConnect, blocked });

    if (check() === "unique") {
      return buildPuzzle(difficulty, company, solution, mustConnect, blocked);
    }

    // Tighten: add up to 10 more derived clues (prefer must-connect).
    let unique = false;
    for (let added = 0; added < 10; added++) {
      if (extraMust.length > 0) {
        mustConnect.push(normEdge(...extraMust.shift()!));
      } else if (extraBlocked.length > 0) {
        blocked.push(normEdge(...extraBlocked.shift()!));
      } else {
        break;
      }
      if (check() === "unique") {
        unique = true;
        break;
      }
    }
    if (unique) {
      return buildPuzzle(difficulty, company, solution, mustConnect, blocked);
    }
    // else regenerate
  }

  // Deterministic fallback: pin every solution edge as must-connect (unique).
  const company = assignCompanies(n, cfg.companies);
  const solution = buildSolutionEdges(n, company, cfg.degMax);
  return buildPuzzle(
    difficulty,
    company,
    solution,
    solution.map(([a, b]) => normEdge(a, b)),
    []
  );
}
