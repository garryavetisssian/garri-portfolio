/** Generated portrait atlas: each square clips a single person, never adjacent cells. */
export default function CharacterPortrait({ index, size = 36 }: { index: number; size?: number }) {
  const cell = ((index % 12) + 12) % 12;
  return <span aria-hidden="true" style={{ display: "inline-block", flexShrink: 0, width: size, height: size, backgroundImage: "url('/illustrations/games/professionals.png')", backgroundSize: "400% 300%", backgroundPosition: `${(cell % 4) * 100 / 3}% ${Math.floor(cell / 4) * 50}%`, imageRendering: "pixelated", pointerEvents: "none" }} />;
}
