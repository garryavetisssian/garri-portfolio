import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import type { Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";

interface WorkListProps {
  locale: Locale;
  items: CaseStudy[];
  showHeading?: boolean;
  heading?: string;
  eyebrow?: string;
  showViewAll?: boolean;
  totalCount?: number;
}

function categoryString(cat: CaseStudy["category"]): string {
  return Array.isArray(cat) ? cat.join(" · ") : cat;
}

export default function WorkList({
  locale,
  items,
  showHeading = true,
  heading,
  eyebrow,
  showViewAll = false,
  totalCount,
}: WorkListProps) {
  const t = DICTIONARIES[locale];
  const headingText = heading ?? t.projects.heading.toUpperCase();
  const eyebrowText = eyebrow ?? `— ${t.ui.caseStudiesStrip}`;
  const filesLabel = t.ui.filesSuffix;

  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        {showHeading && (
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="mono text-ink-mute mb-3">{eyebrowText}</p>
              <h2 className="headline-md text-ink">
                {headingText}<span className="text-acid">.</span>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 mono text-ink-mute">
              <span>{String(items.length).padStart(2, "0")}</span>
              <span>{filesLabel}</span>
            </div>
          </div>
        )}

        <ul role="list">
          {items.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/${locale}/work/${p.slug}`} className="row-link">
                <span className="num-badge">{String(i + 1).padStart(2, "0")} —</span>
                <span
                  className="row-title text-ink"
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
                <span className="hidden md:inline mono text-ink-mute">
                  {p.year}
                </span>
                <span className="mono text-ink row-arrow">↗</span>
              </Link>
            </li>
          ))}

          {/* Ghost teaser row — embedded "View All" CTA */}
          {showViewAll && totalCount && totalCount > items.length && (
            <li key="ghost">
              <Link href={`/${locale}/work`} className="row-ghost">
                <span className="num-badge">
                  {String(items.length + 1).padStart(2, "0")} —
                </span>
                <span className="ghost-title">
                  +{String(totalCount - items.length).padStart(2, "0")}
                  <span className="hidden md:inline text-ink-faint">
                    {" "}{t.ui.moreInArchive}
                  </span>
                </span>
                <span className="hidden md:inline mono text-ink-faint">
                  [{t.ui.archiveLabel.toUpperCase()}]
                </span>
                <span className="hidden md:inline mono text-ink-faint">
                  / {String(totalCount).padStart(2, "0")}
                </span>
                <span className="mono ghost-cta">
                  {t.ui.viewAllShort.toUpperCase()} ↗
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
