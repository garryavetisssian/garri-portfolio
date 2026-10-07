// ─── MiniGames — persistent XP / level progression (localStorage) ──────
//
// A simple quadratic XP curve: level L starts at 120·(L-1)² XP. Score earned in
// a game is added as XP, so the player levels up across sessions.

const KEY = "minigames_xp";

export function getXp(): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = Number(window.localStorage.getItem(KEY));
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}

export function levelForXp(xp: number): number {
  return Math.floor(Math.sqrt(xp / 120)) + 1;
}

function xpForLevel(level: number): number {
  return 120 * (level - 1) * (level - 1);
}

export interface LevelState {
  xp: number;
  level: number;
  /** 0..1 progress through the current level. */
  progress: number;
  intoLevel: number;
  levelSpan: number;
}

export function levelState(xp: number): LevelState {
  const level = levelForXp(xp);
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const span = next - base;
  const into = xp - base;
  return { xp, level, progress: span > 0 ? into / span : 0, intoLevel: into, levelSpan: span };
}

export interface XpResult {
  before: LevelState;
  after: LevelState;
  gained: number;
  leveledUp: boolean;
}

export function addXp(amount: number): XpResult {
  const before = levelState(getXp());
  const next = before.xp + Math.max(0, Math.round(amount));
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, String(next));
    } catch {
      /* ignore */
    }
  }
  const after = levelState(next);
  return { before, after, gained: next - before.xp, leveledUp: after.level > before.level };
}

/** Stars (1–3) for a solve time, by difficulty. */
const STAR_THRESHOLDS: Record<string, [number, number]> = {
  // [time for 3 stars, time for 2 stars] in seconds
  easy: [25, 60],
  medium: [70, 150],
  hard: [150, 320],
};

export function starsForTime(difficulty: string, seconds: number): number {
  const t = STAR_THRESHOLDS[difficulty] ?? [60, 150];
  if (seconds <= t[0]) return 3;
  if (seconds <= t[1]) return 2;
  return 1;
}
