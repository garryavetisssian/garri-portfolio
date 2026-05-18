"use client";

import Link from "next/link";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/types";

interface FooterProps {
  locale: Locale;
  projects?: { slug: string; title: string; category: string | string[] }[];
}

function catLabel(c: string | string[]): string {
  return Array.isArray(c) ? c[0] : c;
}

export default function Footer({ locale, projects = [] }: FooterProps) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const projectLinks = projects.slice(0, 4).map((p) => ({
    label: `${p.title} · ${catLabel(p.category)}`,
    href: `/${locale}/work/${p.slug}`,
  }));

  const cols: { label: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
      label: t.footer.navigateCol,
      links: [
        { label: t.nav.about, href: `/${locale}/about` },
        { label: t.nav.work, href: `/${locale}/work` },
        { label: t.nav.cv, href: `/${locale}/cv` },
        { label: t.nav.contact, href: `/${locale}/contact` },
      ],
    },
    {
      label: t.footer.workCol,
      links: projectLinks,
    },
    {
      label: t.footer.elsewhereCol,
      links: [
        { label: "Email", href: `mailto:${SITE.email}`, external: true },
        { label: "LinkedIn", href: SITE.linkedin, external: true },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-line-strong bg-paper-soft mt-32">
      {/* Brand mark — translated first-name across locales */}
      <div className="overflow-hidden border-b border-line-strong">
        <div
          className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-12 select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(4rem, 18vw, 22rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: "1px var(--line-strong)",
          }}
          aria-hidden
        >
          {t.hero.name.split(" ")[0].toUpperCase()}
          <span style={{ color: "var(--acid)", WebkitTextStroke: "0" }}>.</span>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-12 grid gap-10 md:grid-cols-12">
        {/* Brutalist colophon — replaces generic "about this site" blurb */}
        <div className="md:col-span-4 space-y-6">
          {/* Built with */}
          <div>
            <p className="mono text-ink-mute mb-2">— {t.footer.builtLabel}</p>
            <p className="text-[14px] text-ink leading-[1.55]">
              Next.js 16 · Tailwind 4 · Vercel
            </p>
          </div>

          {/* Set in */}
          <div>
            <p className="mono text-ink-mute mb-2">— {t.footer.setInLabel}</p>
            <p className="text-[14px] text-ink leading-[1.55]">
              Unbounded · Manrope · JetBrains Mono
            </p>
          </div>

          {/* Figures — tight stats grid */}
          <div>
            <p className="mono text-ink-mute mb-3">— {t.footer.figuresLabel}</p>
            <dl className="grid grid-cols-2 gap-y-1 gap-x-4 text-[13px]">
              <dt className="mono text-ink-mute">{t.footer.figureLocales}</dt>
              <dd className="text-ink tabular-nums">
                <span className="text-acid">03</span>
              </dd>
              <dt className="mono text-ink-mute">{t.footer.figureCases}</dt>
              <dd className="text-ink tabular-nums">
                <span className="text-acid">{String(projects.length).padStart(2, "0")}</span>
              </dd>
              <dt className="mono text-ink-mute">{t.footer.figureTrackers}</dt>
              <dd className="text-ink tabular-nums">
                <span className="text-acid">00</span>
              </dd>
              <dt className="mono text-ink-mute">{t.footer.figureVersion}</dt>
              <dd className="text-ink tabular-nums mono">v2026.07</dd>
            </dl>
          </div>

          <p className="mono text-acid pt-2 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-acid pulse-dot" />
            {t.hero.available}
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.label} className="md:col-span-2">
            <p className="mono text-ink-mute mb-4">— {col.label}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[14px] text-ink hover:text-acid link-uline transition-colors"
                    >
                      {link.label} <span className="text-ink-mute">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[14px] text-ink hover:text-acid link-uline transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <p className="mono text-ink-mute mb-4">— {t.footer.localeCol}</p>
          <div className="flex gap-1.5 mono">
            {(["en", "ru", "hy"] as const).map((l) => (
              <span
                key={l}
                className={
                  l === locale
                    ? "px-2 py-1 border border-acid text-acid"
                    : "px-2 py-1 border border-line-strong text-ink-mute"
                }
              >
                {l.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] flex flex-col md:flex-row items-center justify-between gap-2 py-4 mono text-ink-mute">
          <span>© {year} {SITE.name}. {t.contact.rightsReserved}.</span>
          <span>{t.footer.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
