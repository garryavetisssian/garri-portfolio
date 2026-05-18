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
      {/* Brand mark */}
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
          GARRI<span style={{ color: "var(--acid)", WebkitTextStroke: "0" }}>.</span>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="mono text-ink-mute mb-4">— {t.footer.aboutSiteLabel}</p>
          <p className="prose-brut text-[15px] max-w-sm">
            {t.footer.aboutSiteBlurb} {t.hero.locationCity}.
          </p>
          <p className="mono text-ink-mute mt-4">
            ⚆ {t.hero.available}
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
          <span>© {year} {SITE.name}. All rights reserved.</span>
          <span>{t.footer.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
