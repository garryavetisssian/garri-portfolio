"use client";

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="ticker-track">
        {doubled.map((text, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" aria-hidden />
            <span>{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
