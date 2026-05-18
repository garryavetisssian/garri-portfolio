"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { WORK_EXPERIENCE_I18N } from "@/data/about.i18n";

export default function ExperienceStrip() {
  const { locale, t } = useLanguage();
  const work = WORK_EXPERIENCE_I18N[locale];

  return (
    <section id="experience" className="relative py-24 border-t border-line-strong">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="mb-12 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7">
            <p className="mono text-ink-faint mb-3">— {t.experience.eyebrow}</p>
            <h2 className="headline-md text-ink">
              {t.experience.heading.toUpperCase()}<span className="text-acid">.</span>
            </h2>
          </div>
          <p className="md:col-span-5 mono text-ink-mute">
            {work.length} positions · {t.experience.fullTime}
          </p>
        </div>

        <ul role="list" className="hairline-t">
          {work.map((w, i) => (
            <li
              key={w.company}
              className="grid md:grid-cols-12 gap-4 py-6 hairline-b items-baseline"
            >
              <span className="num-badge md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span
                className="md:col-span-4 text-ink"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                }}
              >
                {w.company}
              </span>
              <span className="md:col-span-3 prose-brut text-ink-mute">{w.role}</span>
              <span className="md:col-span-2 mono text-ink-mute">{w.location}</span>
              <span className="md:col-span-2 mono text-ink-faint md:text-right">{w.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
