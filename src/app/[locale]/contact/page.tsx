import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactStrip from "@/components/brut/ContactStrip";
import Marquee from "@/components/brut/Marquee";
import { LOCALES, type Locale } from "@/lib/i18n/types";

const localeCodes = LOCALES.map((l) => l.code) as Locale[];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) return {};
  return {
    title: "Contact — Garri Avetisyan",
    description: "Get in touch for product design collaborations, roles, or just to say hello.",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", ru: "/ru/contact", hy: "/hy/contact" },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) notFound();

  return (
    <>
      <div className="pt-[calc(var(--nav-h)+3rem)]" />
      <Marquee items={[
        "AVAILABLE FOR HIRE",
        "FULL-TIME · CONTRACT · FRACTIONAL",
        "EN · RU · HY",
        "OPEN TO REMOTE WORLDWIDE",
        "REPLY WITHIN 24H",
      ]} />
      <ContactStrip />
    </>
  );
}
