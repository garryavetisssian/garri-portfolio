import Image from "next/image";
const COVERS = ["meeting-scheduler", "networking", "team-builder"];

export function GameCover({ index, className = "", style }: { index: number; className?: string; style?: React.CSSProperties }) {
  return <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: "16 / 9", ...style }} aria-hidden="true">
    <Image src={`/illustrations/games/${COVERS[index % 3]}.png`} fill alt="" sizes="(max-width: 640px) 100vw, 500px" style={{ objectFit: "cover" }} />
  </div>;
}
