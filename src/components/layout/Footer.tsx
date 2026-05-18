"use client";

import Link from "next/link";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/types";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const cols = [
    {
      label: "Navigate",
      links: [
        { label: t.nav.about, href: `/${locale}/about` },
        { label: t.nav.projects, href: `/${locale}/work` },
        { label: "CV", href: `/${locale}/cv` },
        { label: t.nav.contact, href: `/${locale}/contact` },
      ],
    },
    {
      label: "Work",
      links: [
        { label: "BalVoi · AI", href: `/${locale}/work/balvoi` },
        { label: "XYGO · Web3", href: `/${locale}/work/xygo` },
        { label: "Duck Master · Mobile", href: `/${locale}/work/duck-master` },
        { label: "Ineed · Marketplace", href: `/${locale}/work/ineed` },
      ],
    },
    {
      label: "Elsewhere",
      links: [
        { label: "Email", href: `mailto:${SITE.email}`, external: true },
        { label: "LinkedIn", href: SITE.linkedin, external: true },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-line-strong bg-paper-soft mt-32">
      {/* Massive brand mark */}
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
          <p className="mono text-ink-faint mb-4">— About this site</p>
          <p className="prose-brut text-[15px] max-w-sm">
            Built as a brutalist editorial-tech portfolio. Three locales, full
            case studies, zero analytics. {t.hero.locationCity}.
          </p>
          <p className="mono text-ink-faint mt-4">
            ⚆ {t.hero.available}
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.label} className="md:col-span-2">
            <p className="mono text-ink-faint mb-4">— {col.label}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[14px] text-ink hover:text-acid link-uline transition-colors"
                    >
                      {link.label} <span className="text-ink-faint">↗</span>
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
          <p className="mono text-ink-faint mb-4">— Locale</p>
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
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] flex flex-col md:flex-row items-center justify-between gap-2 py-4 mono text-ink-faint">
          <span>© {year} {SITE.name}. All rights reserved.</span>
          <span className="flex items-center gap-3">
            <span>v2026.01</span>
            <span aria-hidden>·</span>
            <span>Made with care · No tracking</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
