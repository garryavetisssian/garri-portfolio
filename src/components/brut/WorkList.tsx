"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import type { Locale } from "@/lib/i18n/types";
import type { CaseStudy } from "@/lib/types";

interface WorkListProps {
  locale: Locale;
  limit?: number;
  showHeading?: boolean;
  heading?: string;
  eyebrow?: string;
}

function categoryString(cat: CaseStudy["category"]): string {
  return Array.isArray(cat) ? cat.join(" · ") : cat;
}

export default function WorkList({
  locale,
  limit,
  showHeading = true,
  heading = "SELECTED WORK",
  eyebrow = "— Case studies / 2020—2026",
}: WorkListProps) {
  const items = limit ? projects.slice(0, limit) : projects;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        {showHeading && (
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="mono text-ink-faint mb-3">{eyebrow}</p>
              <h2 className="headline-md text-ink">
                {heading}<span className="text-acid">.</span>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 mono text-ink-faint">
              <span>{String(items.length).padStart(2, "0")}</span>
              <span>files</span>
            </div>
          </div>
        )}

        <ul role="list">
          {items.map((p, i) => (
            <li
              key={p.slug}
              onMouseEnter={() => setHovered(p.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={`/${locale}/work/${p.slug}`} className="row-link">
                <span className="num-badge">{String(i + 1).padStart(2, "0")} —</span>
                <span
                  className="text-ink"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.5rem, 4vw, 3rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {p.title.toUpperCase()}
                </span>
                <span className="hidden md:inline mono text-ink-mute">
                  [{categoryString(p.category)}]
                </span>
                <span className="hidden md:inline mono text-ink-faint">
                  {p.year}
                </span>
                <span className="mono text-ink row-arrow">↗</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom rule */}
        <div className="hairline-b mt-0" />

        {limit && limit < projects.length && (
          <div className="mt-10 flex justify-end">
            <Link
              href={`/${locale}/work`}
              className="mono text-ink-mute hover:text-acid link-uline transition-colors"
            >
              — View all {projects.length} case studies ↗
            </Link>
          </div>
        )}

        {/* Decorative hovered slug echo (faint) */}
        <span
          aria-hidden
          className="hidden lg:block pointer-events-none fixed bottom-6 right-6 mono text-acid opacity-40 select-none"
          style={{ transition: "opacity 0.3s" }}
        >
          {hovered ? `→ /${locale}/work/${hovered}` : ""}
        </span>
      </div>
    </section>
  );
}
