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
import { classifySolutions } from "./solver";

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

function kindOf(c: Constraint): Constraint["kind"] {
  return c.kind;
}

/**
 * Pick a varied starting set by round-robining across constraint kinds, so the
 * player sees a mix of constraint types rather than (say) five "at-slot" pins.
 */
function pickVaried(pool: Constraint[], target: number): Constraint[] {
  const buckets = new Map<Constraint["kind"], Constraint[]>();
  for (const c of pool) {
    const k = kindOf(c);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k)!.push(c);
  }
  const kinds = shuffle([...buckets.keys()]);
  const chosen: Constraint[] = [];
  let progress = true;
  while (chosen.length < target && progress) {
    progress = false;
    for (const k of kinds) {
      const bucket = buckets.get(k)!;
      if (bucket.length > 0) {
        chosen.push(bucket.pop()!);
        progress = true;
        if (chosen.length >= target) break;
      }
    }
  }
  return chosen;
}

// Prefer high-information constraints when tightening toward uniqueness.
const TIGHTEN_PRIORITY: Record<Constraint["kind"], number> = {
  "at-slot": 0,
  "in-room": 1,
  before: 2,
  "not-same-slot": 3,
  "room-before-slot": 4,
};

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
 * Generate a unique-solution puzzle for the given difficulty.
 * Falls back to a fully-pinned (still valid & unique) constraint set in the
 * astronomically-unlikely event the randomized search never converges.
 */
export function generatePuzzle(difficulty: Difficulty): Puzzle {
  const cfg = DIFFICULTY_CONFIG[difficulty];
  const MAX_REGEN = 400;

  for (let attempt = 0; attempt < MAX_REGEN; attempt++) {
    const solution = randomSolution(cfg.rooms, cfg.slots, cfg.meetings);
    const pool = deriveTrueConstraints(solution, cfg.rooms, cfg.slots);

    const chosen = pickVaried(pool, cfg.constraints);
    const chosenSet = new Set(chosen);

    if (
      classifySolutions(cfg.rooms, cfg.slots, cfg.meetings, chosen) === "unique"
    ) {
      return makePuzzle(difficulty, cfg.rooms, cfg.slots, cfg.meetings, chosen, solution);
    }

    // Tighten: add up to 10 more derived constraints, highest-information first.
    const remaining = pool
      .filter((c) => !chosenSet.has(c))
      .sort((a, b) => TIGHTEN_PRIORITY[a.kind] - TIGHTEN_PRIORITY[b.kind]);

    let unique = false;
    for (let added = 0; added < 10 && added < remaining.length; added++) {
      chosen.push(remaining[added]);
      if (classifySolutions(cfg.rooms, cfg.slots, cfg.meetings, chosen) === "unique") {
        unique = true;
        break;
      }
    }
    if (unique) {
      return makePuzzle(difficulty, cfg.rooms, cfg.slots, cfg.meetings, chosen, solution);
    }
    // else: regenerate from a fresh solution.
  }

  // Deterministic fallback — pin every meeting fully (unique by construction).
  const solution = randomSolution(cfg.rooms, cfg.slots, cfg.meetings);
  const pinned: Constraint[] = [];
  for (let m = 0; m < cfg.meetings; m++) {
    pinned.push({ kind: "in-room", meeting: m, room: solution[m].room });
    pinned.push({ kind: "at-slot", meeting: m, slot: solution[m].slot });
  }
  return makePuzzle(difficulty, cfg.rooms, cfg.slots, cfg.meetings, pinned, solution);
}
