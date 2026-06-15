// ─── Meeting Scheduler — constraint checking + backtracking solver ─────
//
// Two jobs:
//  1. constraintSatisfied / allSatisfied — evaluate constraints against an
//     assignment (partial or complete). Used by the game UI for the live
//     constraint checklist and the win check.
//  2. classifySolutions — a backtracking solver that reports whether a
//     constraint set has a unique solution. Used by the generator to guarantee
//     each generated puzzle has exactly one answer.

import type { Assignment, Constraint, Placement } from "./types";

/**
 * Is this constraint *definitively satisfied* by the current assignment?
 * Returns false while still indeterminate (e.g. a "before" constraint where one
 * meeting is unplaced). At a complete assignment this is exact satisfaction.
 */
export function constraintSatisfied(c: Constraint, a: Assignment): boolean {
  switch (c.kind) {
    case "in-room": {
      const p = a[c.meeting];
      return !!p && p.room === c.room;
    }
    case "at-slot": {
      const p = a[c.meeting];
      return !!p && p.slot === c.slot;
    }
    case "before": {
      const p = a[c.meeting];
      const q = a[c.other];
      return !!p && !!q && p.slot < q.slot;
    }
    case "not-same-slot": {
      const p = a[c.meeting];
      const q = a[c.other];
      return !!p && !!q && p.slot !== q.slot;
    }
    case "room-before-slot":
      return a.some((p) => !!p && p.room === c.room && p.slot < c.slot);
  }
}

/** Are ALL constraints satisfied? (Caller is responsible for completeness.) */
export function allSatisfied(constraints: Constraint[], a: Assignment): boolean {
  return constraints.every((c) => constraintSatisfied(c, a));
}

/** A placement is "complete" when every meeting has a cell. */
export function isComplete(a: Assignment): boolean {
  return a.every((p) => p !== null);
}

export type SolveResult = "unique" | "no-solution" | "multiple-solutions";

function cellKey(slots: number, p: Placement): number {
  return p.room * slots + p.slot;
}

/** Unary constraints (in-room / at-slot) restrict a single meeting's domain. */
function unaryOk(meeting: number, cell: Placement, constraints: Constraint[]): boolean {
  for (const c of constraints) {
    if (c.kind === "in-room" && c.meeting === meeting && cell.room !== c.room) return false;
    if (c.kind === "at-slot" && c.meeting === meeting && cell.slot !== c.slot) return false;
  }
  return true;
}

/**
 * Count solutions (capped at 2) to decide uniqueness.
 *
 * Strategy: precompute each meeting's domain from unary constraints, then
 * backtrack with MRV (always branch on the meeting with the fewest remaining
 * legal cells). Binary constraints (before / not-same-slot) prune partial
 * assignments; room-before-slot is verified at complete assignments. Grids are
 * tiny (≤ 8 meetings over ≤ 30 cells), so MRV keeps the search trivial.
 */
/**
 * Enumerate up to `limit` complete solutions. The generator uses limit=2 to
 * check uniqueness AND to obtain a concrete *alternative* solution it can rule
 * out with a relational constraint.
 */
export function findSolutions(
  rooms: number,
  slots: number,
  meetingCount: number,
  constraints: Constraint[],
  limit = 2
): Placement[][] {
  const allCells: Placement[] = [];
  for (let r = 0; r < rooms; r++) {
    for (let s = 0; s < slots; s++) allCells.push({ room: r, slot: s });
  }

  const domains: Placement[][] = [];
  for (let m = 0; m < meetingCount; m++) {
    const dom = allCells.filter((cell) => unaryOk(m, cell, constraints));
    if (dom.length === 0) return [];
    domains[m] = dom;
  }

  const assign: Assignment = new Array(meetingCount).fill(null);
  const used = new Set<number>();
  const results: Placement[][] = [];

  function binaryOk(meeting: number, cell: Placement): boolean {
    for (const c of constraints) {
      if (c.kind === "before") {
        if (c.meeting === meeting) {
          const q = assign[c.other];
          if (q && !(cell.slot < q.slot)) return false;
        } else if (c.other === meeting) {
          const p = assign[c.meeting];
          if (p && !(p.slot < cell.slot)) return false;
        }
      } else if (c.kind === "not-same-slot") {
        if (c.meeting === meeting) {
          const q = assign[c.other];
          if (q && q.slot === cell.slot) return false;
        } else if (c.other === meeting) {
          const p = assign[c.meeting];
          if (p && p.slot === cell.slot) return false;
        }
      }
    }
    return true;
  }

  function legalCells(meeting: number): Placement[] {
    return domains[meeting].filter(
      (cell) => !used.has(cellKey(slots, cell)) && binaryOk(meeting, cell)
    );
  }

  function search(): void {
    if (results.length >= limit) return;
    let chosen = -1;
    let chosenCells: Placement[] = [];
    let best = Infinity;
    for (let m = 0; m < meetingCount; m++) {
      if (assign[m] !== null) continue;
      const cells = legalCells(m);
      if (cells.length < best) {
        best = cells.length;
        chosen = m;
        chosenCells = cells;
        if (best === 0) break;
      }
    }
    if (chosen === -1) {
      if (allSatisfied(constraints, assign)) {
        results.push(assign.map((p) => ({ room: p!.room, slot: p!.slot })));
      }
      return;
    }
    for (const cell of chosenCells) {
      assign[chosen] = cell;
      used.add(cellKey(slots, cell));
      search();
      used.delete(cellKey(slots, cell));
      assign[chosen] = null;
      if (results.length >= limit) return;
    }
  }

  search();
  return results;
}

export function classifySolutions(
  rooms: number,
  slots: number,
  meetingCount: number,
  constraints: Constraint[]
): SolveResult {
  const allCells: Placement[] = [];
  for (let r = 0; r < rooms; r++) {
    for (let s = 0; s < slots; s++) allCells.push({ room: r, slot: s });
  }

  const domains: Placement[][] = [];
  for (let m = 0; m < meetingCount; m++) {
    const dom = allCells.filter((cell) => unaryOk(m, cell, constraints));
    if (dom.length === 0) return "no-solution";
    domains[m] = dom;
  }

  const assign: Assignment = new Array(meetingCount).fill(null);
  const used = new Set<number>();
  let count = 0;

  // Does placing `meeting` at `cell` violate any binary constraint against the
  // meetings already assigned? (Unary constraints are baked into the domain.)
  function binaryOk(meeting: number, cell: Placement): boolean {
    for (const c of constraints) {
      if (c.kind === "before") {
        if (c.meeting === meeting) {
          const q = assign[c.other];
          if (q && !(cell.slot < q.slot)) return false;
        } else if (c.other === meeting) {
          const p = assign[c.meeting];
          if (p && !(p.slot < cell.slot)) return false;
        }
      } else if (c.kind === "not-same-slot") {
        if (c.meeting === meeting) {
          const q = assign[c.other];
          if (q && q.slot === cell.slot) return false;
        } else if (c.other === meeting) {
          const p = assign[c.meeting];
          if (p && p.slot === cell.slot) return false;
        }
      }
    }
    return true;
  }

  function legalCells(meeting: number): Placement[] {
    return domains[meeting].filter(
      (cell) => !used.has(cellKey(slots, cell)) && binaryOk(meeting, cell)
    );
  }

  function search(): void {
    if (count >= 2) return;

    // MRV: pick the unassigned meeting with the smallest live domain.
    let chosen = -1;
    let chosenCells: Placement[] = [];
    let best = Infinity;
    for (let m = 0; m < meetingCount; m++) {
      if (assign[m] !== null) continue;
      const cells = legalCells(m);
      if (cells.length < best) {
        best = cells.length;
        chosen = m;
        chosenCells = cells;
        if (best === 0) break;
      }
    }

    if (chosen === -1) {
      // Complete assignment — verify the constraints not pruned incrementally.
      if (allSatisfied(constraints, assign)) count++;
      return;
    }

    for (const cell of chosenCells) {
      assign[chosen] = cell;
      used.add(cellKey(slots, cell));
      search();
      used.delete(cellKey(slots, cell));
      assign[chosen] = null;
      if (count >= 2) return;
    }
  }

  search();
  return count === 0 ? "no-solution" : count === 1 ? "unique" : "multiple-solutions";
}
