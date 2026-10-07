// ─── MiniGames — tiny Web Audio sound effects (zero asset files) ───────
//
// Synthesises short blips at runtime so the games feel responsive without
// shipping any audio. Respects a persisted mute flag. The AudioContext is
// created lazily inside a user gesture (a click), which browsers require.

let ctx: AudioContext | null = null;
let muted = false;

if (typeof window !== "undefined") {
  try {
    muted = window.localStorage.getItem("minigames_muted") === "1";
  } catch {
    /* ignore */
  }
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, delay = 0) {
  const c = audio();
  if (!c || muted) return;
  const t = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}

// ── FX event bus: visual juice (score/combo/particles) subscribes here, so it
// fires from the same call sites as the sounds with no per-game wiring. ──
export type FxType = "place" | "error" | "win" | "reset";
const fxSubs = new Set<(t: FxType) => void>();
export function subscribeFx(fn: (t: FxType) => void): () => void {
  fxSubs.add(fn);
  return () => {
    fxSubs.delete(fn);
  };
}
function emitFx(t: FxType) {
  fxSubs.forEach((f) => f(t));
}
/** Reset the combo/score juice (call when a new game starts). */
export function resetFx() {
  emitFx("reset");
}

// Combo: rapid consecutive placements pitch up for a satisfying streak.
let streak = 0;
let lastPlace = 0;

export const sfx = {
  /** A blip when a piece is placed — pitch rises with a fast streak. */
  place() {
    emitFx("place");
    const c = audio();
    const now = c ? c.currentTime : 0;
    if (now - lastPlace > 1.6) streak = 0;
    else streak = Math.min(streak + 1, 12);
    lastPlace = now;
    tone(380 * Math.pow(1.06, streak), 0.09, "triangle", 0.05);
  },
  /** A lighter tick when selecting. */
  select() {
    tone(640, 0.05, "sine", 0.04);
  },
  /** A low buzz for an invalid / conflicting action; breaks the streak. */
  error() {
    emitFx("error");
    streak = 0;
    tone(150, 0.2, "sawtooth", 0.045);
  },
  /** A little ascending arcade jingle on solve. */
  win() {
    emitFx("win");
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, 0.22, "triangle", 0.06, i * 0.11));
  },
};

export function isMuted() {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    window.localStorage.setItem("minigames_muted", value ? "1" : "0");
  } catch {
    /* ignore */
  }
}
