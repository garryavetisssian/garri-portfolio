// ─── MiniGames — hand-built SVG cover art (zero assets, on-brand) ──────
//
// One illustrated motif per game, drawn in code so it matches the brutalist
// dark + per-game-accent system exactly and scales crisply at any size.
// Used as the card banner and the difficulty-screen header.

const ACCENTS = ["#9B6BFF", "#06B6D4", "#FB7185"];
const INK = "#F2F0EA";
const LINE = "rgba(242,240,234,0.16)";
const BG = "#121210";

/** Schedule — a timetable grid with a few blocks slotted in. */
function ScheduleMotif({ accent }: { accent: string }) {
  const x0 = 20,
    x1 = 300,
    y0 = 22,
    y1 = 118;
  const cols = 5,
    rows = 3;
  const cw = (x1 - x0) / cols;
  const rh = (y1 - y0) / rows;
  const cell = (c: number, r: number, fill: string) => (
    <rect
      key={`${c}-${r}`}
      x={x0 + c * cw + 6}
      y={y0 + r * rh + 6}
      width={cw - 12}
      height={rh - 12}
      fill={fill}
    />
  );
  const lines = [];
  for (let c = 0; c <= cols; c++)
    lines.push(<line key={`v${c}`} x1={x0 + c * cw} y1={y0} x2={x0 + c * cw} y2={y1} stroke={LINE} strokeWidth="1" />);
  for (let r = 0; r <= rows; r++)
    lines.push(<line key={`h${r}`} x1={x0} y1={y0 + r * rh} x2={x1} y2={y0 + r * rh} stroke={LINE} strokeWidth="1" />);
  return (
    <g>
      {lines}
      {cell(0, 1, accent)}
      {cell(2, 0, INK)}
      {cell(3, 2, accent)}
      {cell(4, 1, "rgba(155,107,255,0.28)")}
      {cell(1, 2, "rgba(242,240,234,0.22)")}
    </g>
  );
}

/** Network — a small constellation of connected nodes. */
function NetworkMotif({ accent }: { accent: string }) {
  const n: Record<string, [number, number]> = {
    A: [60, 42],
    B: [150, 28],
    C: [250, 54],
    D: [88, 106],
    E: [190, 100],
    F: [272, 108],
  };
  const edges: [string, string][] = [
    ["A", "B"],
    ["B", "C"],
    ["A", "D"],
    ["B", "E"],
    ["C", "F"],
    ["D", "E"],
    ["E", "F"],
  ];
  const fill: Record<string, string> = { A: accent, C: INK, E: accent };
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={accent} strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      ))}
      {Object.entries(n).map(([k, [x, y]]) => (
        <circle key={k} cx={x} cy={y} r="9" fill={fill[k] || BG} stroke={fill[k] ? "#0B0B0A" : INK} strokeWidth="2" />
      ))}
    </g>
  );
}

/** Teams — three columns with grouped "people" dots. */
function TeamsMotif({ accent }: { accent: string }) {
  const cols = [
    { x: 24, people: [56, 92], hot: 0 },
    { x: 123, people: [46, 79, 112], hot: 1 },
    { x: 222, people: [56, 92], hot: 1 },
  ];
  const W = 74;
  return (
    <g>
      {cols.map((col, ci) => (
        <g key={ci}>
          <rect x={col.x} y={22} width={W} height={96} fill="none" stroke={LINE} strokeWidth="1.5" />
          {col.people.map((py, pi) => (
            <circle
              key={pi}
              cx={col.x + W / 2}
              cy={py}
              r="10"
              fill={pi === col.hot ? accent : BG}
              stroke={pi === col.hot ? "#0B0B0A" : INK}
              strokeWidth="2"
            />
          ))}
        </g>
      ))}
    </g>
  );
}

export function GameCover({
  index,
  className,
  style,
}: {
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const motif = index % 3;
  return (
    <svg viewBox="0 0 320 140" preserveAspectRatio="xMidYMid slice" className={className} style={style} aria-hidden>
      <rect width="320" height="140" fill={BG} />
      {/* faint dotted texture */}
      <defs>
        <pattern id={`dots-${index}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(242,240,234,0.06)" />
        </pattern>
      </defs>
      <rect width="320" height="140" fill={`url(#dots-${index})`} />
      {motif === 0 && <ScheduleMotif accent={accent} />}
      {motif === 1 && <NetworkMotif accent={accent} />}
      {motif === 2 && <TeamsMotif accent={accent} />}
    </svg>
  );
}
