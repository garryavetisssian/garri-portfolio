import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkList from "@/components/brut/WorkList";
import Marquee from "@/components/brut/Marquee";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import { getAvailableProjects } from "@/lib/case-assets";

const localeCodes = LOCALES.map((l) => l.code) as Locale[];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) return {};
  return {
    title: "Work — Garri Avetisyan",
    description: "Selected product design case studies across AI, Web3, SaaS, and marketplace products.",
    alternates: {
      canonical: `/${locale}/work`,
      languages: { en: "/en/work", ru: "/ru/work", hy: "/hy/work" },
    },
  };
}

export default async function WorkIndexPage({ params }: PageProps) {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) notFound();
  const t = DICTIONARIES[locale as Locale];
  const available = getAvailableProjects();

  // Category counts for chip strip
  const categories: Record<string, number> = {};
  available.forEach((p) => {
    const cats = Array.isArray(p.category) ? p.category : [p.category];
    cats.forEach((c) => {
      categories[c] = (categories[c] || 0) + 1;
    });
  });

  return (
    <>
      <section className="pt-[calc(var(--nav-h)+5rem)] pb-16">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8 mono">
            <span className="text-ink-mute">— {t.ui.archiveLabel} / {available.length} {t.ui.filesSuffix}</span>
            <span className="text-ink-mute">/ {locale}/work</span>
          </div>

          <h1 className="headline text-ink">
            <span className="block">{t.projects.heading.toUpperCase()}</span>
            <span className="block text-acid">/ {String(available.length).padStart(2, "0")}</span>
          </h1>

          <div className="mt-12 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-7 prose-brut text-ink-mute max-w-[52ch]">
              {t.ui.caseArchiveBlurb}
            </p>

            <div className="md:col-span-5 flex flex-wrap gap-2">
              {Object.entries(categories).map(([cat, count]) => (
                <span key={cat} className="chip">
                  {cat} · {String(count).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee items={t.marquees.work} />

      <WorkList locale={locale as Locale} items={available} showHeading={false} />
    </>
  );
}
