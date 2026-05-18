import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper text-ink flex items-center">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] w-full">
        <p className="mono text-ink-mute mb-6">— Error / 404</p>
        <h1
          className="text-ink mb-6"
          style={{
            fontFamily: "var(--font-unbounded), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(4rem, 14vw, 14rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
          }}
        >
          NOT<br />
          FOUND<span className="text-acid">.</span>
        </h1>
        <p className="prose-brut text-ink-mute max-w-[42ch] mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 border border-acid px-5 py-3 mono text-acid hover:bg-acid hover:text-paper transition-colors"
        >
          ← Back to index
        </Link>
      </div>
    </main>
  );
}
