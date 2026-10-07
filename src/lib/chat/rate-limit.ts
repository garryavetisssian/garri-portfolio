/**
 * In-memory per-IP rate limit. Two windows:
 *   • Burst:  5 messages / 60s
 *   • Daily:  60 messages / 24h
 *
 * Survives within a single Fluid Compute instance. Cold starts reset the
 * counters, which is fine for a portfolio — the Gemini free-tier ceiling
 * (1500 RPD) is the ultimate safety net.
 *
 * Drop-in upgrade path: swap this module for an Upstash-backed one without
 * touching the API route.
 */

type Bucket = { count: number; resetAt: number };

const BURST_LIMIT = 5;
const BURST_WINDOW_MS = 60_000;
const DAY_LIMIT = 60;
const DAY_WINDOW_MS = 24 * 60 * 60 * 1000;

const burstMap = new Map<string, Bucket>();
const dayMap = new Map<string, Bucket>();

function check(map: Map<string, Bucket>, key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = map.get(key);
  if (!existing || existing.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }
  existing.count += 1;
  return { ok: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

export function rateLimit(ip: string) {
  // Daily window is the harder cap — check it first so the user gets the
  // longer reset time if they've blown both.
  const day = check(dayMap, `d:${ip}`, DAY_LIMIT, DAY_WINDOW_MS);
  if (!day.ok) {
    return { ok: false, scope: "day" as const, resetAt: day.resetAt };
  }
  const burst = check(burstMap, `b:${ip}`, BURST_LIMIT, BURST_WINDOW_MS);
  if (!burst.ok) {
    return { ok: false, scope: "burst" as const, resetAt: burst.resetAt };
  }
  return { ok: true as const, resetAt: 0 };
}
