import { notFound } from "next/navigation";
import WorkList, { type Collection } from "./WorkList";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import { getAvailableProjects } from "@/lib/case-assets";

const routeCopy = {
  en: { projects: "projects", intro: "Start with the work that best matches the role. Every project states its stage; a designed concept is not presented as a shipped result." },
  ru: { projects: "проектов", intro: "Начните с работ, близких к вашей роли. У каждого проекта указан этап; концепт не выдаётся за запущенный продукт." },
  hy: { projects: "նախագիծ", intro: "Սկսեք դերին համապատասխանող աշխատանքներից։ Յուրաքանչյուր նախագծի փուլը նշված է. կոնցեպտը չի ներկայացվում որպես թողարկված արդյունք։" },
};

export default async function WorkArchive({ params, collection = "products" }: { params: Promise<{ locale: string }>; collection?: Collection }) {
  const { locale } = await params;
  if (!LOCALES.some((item) => item.code === locale)) notFound();
  const t = DICTIONARIES[locale as Locale];
  const route = routeCopy[locale as Locale];
  const available = getAvailableProjects();
  return <>
    <section className="pt-[calc(var(--nav-h)+3rem)] pb-4">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8 mono">
          <span className="text-ink-mute">— {t.ui.archiveLabel} / {available.length} {route.projects}</span>
          <span className="text-ink-mute">/ {locale}/work/{collection}</span>
        </div>
        <h1 className="text-ink" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.04em" }}>
          {t.projects.heading.toUpperCase()}<span className="text-acid">.</span>
        </h1>
        <p className="mt-5 text-ink-mute max-w-[58ch] text-base leading-relaxed">{t.ui.caseArchiveBlurb}</p>
        <p className="mt-3 text-ink-mute max-w-[65ch] text-sm leading-relaxed">{route.intro}</p>
      </div>
    </section>
    <WorkList locale={locale as Locale} items={available} showHeading={false} archive collection={collection} />
  </>;
}
