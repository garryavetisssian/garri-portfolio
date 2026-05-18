"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/types";
import Link from "next/link";

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative pt-[calc(var(--nav-h)+5rem)] pb-20 overflow-hidden">
      {/* Decorative bg numerals */}
      <span
        aria-hidden
        className="absolute -top-[12vw] -right-[3vw] select-none text-line"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "min(34vw, 540px)",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px var(--line-strong)",
        }}
      >
        26
      </span>

      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        {/* Top mono row */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8 mono">
          <span className="text-ink-mute">— {t.ui.portfolioStrip}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-acid pulse-dot rounded-full" />
            <span className="text-ink-mute">{t.hero.available.toUpperCase()}</span>
          </span>
        </div>

        {/* Type-tower headline */}
        <h1 className="headline text-ink select-none">
          <span className="block reveal-up" style={{ animationDelay: "0.0s" }}>
            <span style={{ animationDelay: "0.0s" }}>{t.hero.headlineLine1}</span>
            <span className="text-acid ml-2" aria-hidden>↗</span>
          </span>
          <span className="block reveal-up" style={{ animationDelay: "0.12s" }}>
            <span style={{ animationDelay: "0.12s" }}>{t.hero.headlineLine2.replace(/ /g, " ")}</span>
          </span>
          <span className="block reveal-up" style={{ animationDelay: "0.22s" }}>
            <span style={{ animationDelay: "0.22s" }}>{t.hero.headlineLine3}<span className="text-acid">.</span></span>
          </span>
        </h1>

        {/* Sub headline + CTA */}
        <div className="mt-12 grid gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-7 prose-brut text-ink-mute text-[17px] leading-[1.55] max-w-[42ch]">
            <p>
              <span className="text-ink">{t.hero.name}</span> — {t.hero.role}.
              {" "}{t.hero.summary}
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3 items-start md:items-end">
            <Link
              href={`/${locale}/work`}
              className="group inline-flex items-center gap-3 border border-acid px-5 py-3.5 mono text-acid hover:bg-acid hover:text-paper transition-colors"
            >
              <span>{t.hero.viewProjects}</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">↗</span>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="mono text-ink-mute link-uline hover:text-ink"
            >
              — {t.hero.getInTouch}
            </Link>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-20 hairline-t grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 pt-8">
          {[
            { v: "05+", l: t.hero.years },
            { v: "07", l: t.hero.projects },
            { v: "04", l: t.hero.industries },
            { v: "03", l: t.hero.languages },
          ].map((s, i) => (
            <div key={s.l} className="flex flex-col gap-2">
              <span className="mono text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
              <span
                className="text-ink"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                {s.v}
              </span>
              <span className="mono text-ink-mute">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
