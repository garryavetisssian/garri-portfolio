import { notFound } from "next/navigation";
import Hero from "@/components/brut/Hero";
import Marquee from "@/components/brut/Marquee";
import WorkList from "@/components/brut/WorkList";
import ProcessGrid from "@/components/brut/ProcessGrid";
import ExperienceStrip from "@/components/brut/ExperienceStrip";
import ContactStrip from "@/components/brut/ContactStrip";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import { getAvailableProjects } from "@/lib/case-assets";

const localeCodes = LOCALES.map((l) => l.code) as Locale[];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) notFound();
  const t = DICTIONARIES[locale as Locale];
  const available = getAvailableProjects();

  return (
    <>
      <Hero locale={locale as Locale} />
      <Marquee items={t.marquees.home} />
      <WorkList
        locale={locale as Locale}
        items={available.slice(0, 4)}
        totalCount={available.length}
        heading={t.projects.heading.toUpperCase()}
        eyebrow={`— ${t.projects.eyebrow}`}
        showViewAll
      />
      <ProcessGrid />
      <ExperienceStrip />
      <ContactStrip />
    </>
  );
}
