"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProcessGrid() {
  const { t } = useLanguage();
  const steps = t.method.steps;

  return (
    <section id="process" className="relative py-24 border-t border-line-strong bg-paper-soft">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="mb-12 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7">
            <p className="mono text-ink-mute mb-3">— {t.method.eyebrow}</p>
            <h2 className="headline-md text-ink">
              {t.method.headingLine1}<br />
              <span className="text-acid">{t.method.headingLine2}.</span>
            </h2>
          </div>
          <p className="md:col-span-5 prose-brut text-ink-mute max-w-[44ch]">
            {t.method.blurb}
          </p>
        </div>

        <div className="grid gap-px bg-line-strong md:grid-cols-4 hairline-t hairline-b">
          {steps.map((p) => (
            <div
              key={p.step}
              className="bg-paper-soft p-7 hover:bg-paper-elev transition-colors duration-300 min-h-[280px] flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span
                  className="text-acid"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "2.75rem",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {p.step}
                </span>
                <span className="mono text-ink-mute">— {t.method.stepLabel}</span>
              </div>
              <h3
                className="mb-4 text-ink"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                }}
              >
                {p.title}
              </h3>
              <p className="prose-brut text-ink-mute text-[14px] leading-[1.55]">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
