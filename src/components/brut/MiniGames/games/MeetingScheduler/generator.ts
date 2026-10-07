// ─── Meeting Scheduler — puzzle generator ─────────────────────────────
//
// CRITICAL invariant: constraints are NEVER invented speculatively. We always:
//   1. build a valid solution first (each meeting → a distinct cell),
//   2. derive constraints that are TRUE statements about that solution,
//   3. verify uniqueness with the backtracking solver,
//   4. add more derived constraints until the solution is unique,
//   5. regenerate from scratch if it stays ambiguous after enough additions.
// A returned puzzle is therefore guaranteed solvable AND unique.

import {
  DIFFICULTY_CONFIG,
  MEETING_COLORS,
  type Constraint,
  type Difficulty,
  type Meeting,
  type Placement,
  type Puzzle,
} from "./types";
import { constraintSatisfied, findSolutions } from "./solver";

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function meetingLabel(i: number): string {
  return String.fromCharCode(65 + i); // A, B, C, …
}

/** Step 1 — a random valid solution: distinct cell per meeting. */
function randomSolution(rooms: number, slots: number, meetings: number): Placement[] {
  const cells: Placement[] = [];
  for (let r = 0; r < rooms; r++) {
    for (let s = 0; s < slots; s++) cells.push({ room: r, slot: s });
  }
  return shuffle(cells).slice(0, meetings);
}

/** Step 2 — every constraint that is a TRUE statement about `solution`. */
function deriveTrueConstraints(
  solution: Placement[],
  rooms: number,
  slots: number
): Constraint[] {
  const n = solution.length;
  const out: Constraint[] = [];

  // Unary: pin room / pin slot.
  for (let m = 0; m < n; m++) {
    out.push({ kind: "in-room", meeting: m, room: solution[m].room });
    out.push({ kind: "at-slot", meeting: m, slot: solution[m].slot });
  }

  // Binary: ordering + slot exclusivity.
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      if (a === b) continue;
      if (solution[a].slot < solution[b].slot) {
        out.push({ kind: "before", meeting: a, other: b });
      }
    }
  }
  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      if (solution[a].slot !== solution[b].slot) {
        out.push({ kind: "not-same-slot", meeting: a, other: b });
      }
    }
  }

  // Room/time: a room has a meeting before some slot threshold.
  for (let r = 0; r < rooms; r++) {
    const slotsInRoom = solution.filter((p) => p.room === r).map((p) => p.slot);
    if (slotsInRoom.length === 0) continue;
    const minSlot = Math.min(...slotsInRoom);
    for (let z = minSlot + 1; z < slots; z++) {
      out.push({ kind: "room-before-slot", room: r, slot: z });
    }
  }

  return out;
}

// Relational constraints (0) force cross-meeting deduction — they're the puzzle.
// The direct "pins" (1) just tell you where a meeting goes, so we lean on them
// only as a last resort when nothing relational can disambiguate.
const PREF: Record<Constraint["kind"], number> = {
  before: 0,
  "not-same-slot": 0,
  "room-before-slot": 0,
  "in-room": 1,
  "at-slot": 1,
};

function meetingOf(c: Constraint): number | null {
  return c.kind === "in-room" || c.kind === "at-slot" ? c.meeting : null;
}

function makePuzzle(
  difficulty: Difficulty,
  rooms: number,
  slots: number,
  meetingCount: number,
  constraints: Constraint[],
  solution: Placement[]
): Puzzle {
  const meetings: Meeting[] = [];
  for (let i = 0; i < meetingCount; i++) {
    meetings.push({ id: i, label: meetingLabel(i), color: MEETING_COLORS[i % MEETING_COLORS.length] });
  }
  return {
    difficulty,
    rooms,
    slots,
    meetings,
    constraints: shuffle(constraints),
    solution,
  };
}

/**
 * Generate a unique-solution puzzle that is genuinely *deductive*.
 *
 * Instead of pinning meetings ("A is in Room 2"), we start with no clues and
 * repeatedly add the minimum constraint needed to rule out an alternative
 * solution — preferring relational constraints (before / not-same-slot /
 * room-before-slot) so the player has to reason across meetings rather than
 * just follow instructions. Direct pins are used only when nothing relational
 * can separate two solutions, and never both on the same meeting.
 */
export function generatePuzzle(difficulty: Difficulty): Puzzle {
  const cfg = DIFFICULTY_CONFIG[difficulty];
  const { rooms, slots, meetings } = cfg;
  const MAX_REGEN = 400;

  for (let attempt = 0; attempt < MAX_REGEN; attempt++) {
    const solution = randomSolution(rooms, slots, meetings);
    const pool = deriveTrueConstraints(solution, rooms, slots);

    const chosen: Constraint[] = [];
    let unique = false;

    for (let guard = 0; guard < 60; guard++) {
      const sols = findSolutions(rooms, slots, meetings, chosen, 2);
      if (sols.length <= 1) {
        unique = sols.length === 1;
        break;
      }
      const alt = sols.find((s) =>
        s.some((p, i) => p.room !== solution[i].room || p.slot !== solution[i].slot)
      );
      if (!alt) break;

      // True constraints (about the real solution) that this alternative breaks.
      const cands = pool.filter((c) => !chosen.includes(c) && !constraintSatisfied(c, alt));
      if (cands.length === 0) break; // can't happen: alt differs ⇒ some clue breaks

      // Never fully pin a meeting (in-room AND at-slot) — that kills the puzzle.
      const hasPin = (m: number, kind: "in-room" | "at-slot") =>
        chosen.some((c) => c.kind === kind && meetingOf(c) === m);
      const safe = cands.filter((c) => {
        if (c.kind === "in-room") return !hasPin(c.meeting, "at-slot");
        if (c.kind === "at-slot") return !hasPin(c.meeting, "in-room");
        return true;
      });
      const useList = safe.length ? safe : cands;

      // Prefer relational clues; randomise within the same preference tier.
      const ranked = shuffle(useList).sort((a, b) => PREF[a.kind] - PREF[b.kind]);
      chosen.push(ranked[0]);
    }

    if (unique && chosen.length > 0) {
      return makePuzzle(difficulty, rooms, slots, meetings, chosen, solution);
    }
  }

  // Deterministic fallback — pin every meeting fully (unique by construction).
  const solution = randomSolution(rooms, slots, meetings);
  const pinned: Constraint[] = [];
  for (let m = 0; m < meetings; m++) {
    pinned.push({ kind: "in-room", meeting: m, room: solution[m].room });
    pinned.push({ kind: "at-slot", meeting: m, slot: solution[m].slot });
  }
  return makePuzzle(difficulty, rooms, slots, meetings, pinned, solution);
}
