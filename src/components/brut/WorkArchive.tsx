import { notFound } from "next/navigation";
import WorkList, { type Collection } from "./WorkList";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import { getAvailableProjects } from "@/lib/case-assets";

export default async function WorkArchive({ params, collection = "products" }: { params: Promise<{ locale: string }>; collection?: Collection }) {
  const { locale } = await params;
  if (!LOCALES.some((item) => item.code === locale)) notFound();
  const t = DICTIONARIES[locale as Locale];
  const available = getAvailableProjects();
  return <>
    <section className="pt-[calc(var(--nav-h)+3rem)] pb-4">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8 mono">
          <span className="text-ink-mute">— {t.ui.archiveLabel} / {available.length} {t.ui.filesSuffix}</span>
          <span className="text-ink-mute">/ {locale}/work/{collection}</span>
        </div>
        <h1 className="text-ink" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.04em" }}>
          {t.projects.heading.toUpperCase()}<span className="text-acid">.</span>
        </h1>
        <p className="mt-5 text-ink-mute max-w-[58ch] text-base leading-relaxed">{t.ui.caseArchiveBlurb}</p>
      </div>
    </section>
    <WorkList locale={locale as Locale} items={available} showHeading={false} archive collection={collection} />
  </>;
}
