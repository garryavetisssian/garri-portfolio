import { notFound } from "next/navigation";
import Hero from "@/components/brut/Hero";
import Marquee from "@/components/brut/Marquee";
import WorkList from "@/components/brut/WorkList";
import ProcessGrid from "@/components/brut/ProcessGrid";
import ExperienceStrip from "@/components/brut/ExperienceStrip";
import ContactStrip from "@/components/brut/ContactStrip";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";

const localeCodes = LOCALES.map((l) => l.code) as Locale[];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) notFound();
  const t = DICTIONARIES[locale as Locale];

  const tickerItems = [
    "PRODUCT DESIGNER",
    `EST. 2020 · YEREVAN`,
    "AI · WEB3 · SAAS · MARKETPLACE",
    t.hero.available.toUpperCase(),
    "STRATEGY → RESEARCH → DESIGN → SHIP",
    "5+ YRS · 7 CASE STUDIES",
    "3 LANGUAGES · EN · RU · HY",
  ];

  return (
    <>
      <Hero locale={locale as Locale} />
      <Marquee items={tickerItems} />
      <WorkList
        locale={locale as Locale}
        limit={4}
        heading={t.projects.heading.toUpperCase()}
        eyebrow={`— ${t.projects.eyebrow}`}
      />
      <ProcessGrid />
      <ExperienceStrip />
      <ContactStrip />
    </>
  );
}
