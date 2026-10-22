"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LOCALES, type Locale } from "@/lib/i18n/types";

const localeCodes = LOCALES.map((l) => l.code);

function swapLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (parts[1] && localeCodes.includes(parts[1] as Locale)) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

interface FooterProps {
  locale: Locale;
  projects?: { slug: string; title: string; category: string | string[] }[];
}

function catLabel(c: string | string[]): string {
  return Array.isArray(c) ? c[0] : c;
}

function persistLocale(next: Locale) {
  document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
}

export default function Footer({ locale, projects = [] }: FooterProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const hiringCopy = {
    en: { label: "WHAT I DO", line: "Product design for complex systems and iGaming, from the interaction model to the visual language.", note: "Selected work includes shipped products, approved pre-production work and clearly labelled concepts." },
    ru: { label: "ЧЕМ Я ЗАНИМАЮСЬ", line: "Продуктовый дизайн сложных систем и iGaming — от логики взаимодействия до визуального языка.", note: "Здесь есть запущенные продукты, утверждённый препродакшен и отдельно отмеченные концепты." },
    hy: { label: "ԻՄ ԱՇԽԱՏԱՆՔԸ", line: "Բարդ համակարգերի և iGaming-ի պրոդուկտ դիզայն՝ փոխազդեցության մոդելից մինչև վիզուալ լեզու։", note: "Ներկայացված են թողարկված պրոդուկտներ, հաստատված նախաարտադրական աշխատանք և հստակ նշված կոնցեպտներ։" },
  }[locale];

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    persistLocale(next);
    router.push(swapLocale(pathname, next));
  };

  const prioritySlugs = ["duck-master", "ineed", "balvoi", "xy-ecosystem"];
  const projectLinks = prioritySlugs.map((slug) => projects.find((project) => project.slug === slug)).filter((project): project is NonNullable<typeof project> => Boolean(project)).map((p) => ({
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
          className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-12 select-none h-break"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3rem, 15vw, 16rem)",
            lineHeight: 0.9,
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
        {/* Hiring context, rather than site implementation statistics. */}
        <div className="md:col-span-4 space-y-6">
          <div>
            <p className="mono text-ink-mute mb-2">— {hiringCopy.label}</p>
            <p className="text-[18px] text-ink leading-[1.45] max-w-[30ch]">{hiringCopy.line}</p>
          </div>
          <p className="text-[13px] text-ink-mute leading-[1.6] max-w-[42ch]">{hiringCopy.note}</p>

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
          <div className="flex flex-wrap gap-1.5 mono">
            {LOCALES.map((l) => {
              const isActive = l.code === locale;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => switchLocale(l.code)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Switch to ${l.label}`}
                  className={
                    isActive
                      ? "min-h-11 min-w-11 px-2 py-1 border border-acid text-acid cursor-default"
                      : "min-h-11 min-w-11 px-2 py-1 border border-line-strong text-ink-mute hover:border-acid hover:text-acid transition-colors cursor-pointer"
                  }
                >
                  {l.code.toUpperCase()}
                </button>
              );
            })}
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
