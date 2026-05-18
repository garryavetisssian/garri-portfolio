import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/brut/ContactForm";
import DirectContact from "@/components/brut/DirectContact";
import Marquee from "@/components/brut/Marquee";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";

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
  const t = DICTIONARIES[locale as Locale];

  return (
    <>
      {/* Page header — single big heading on contact page */}
      <section className="pt-[calc(var(--nav-h)+5rem)] pb-12">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <p className="mono text-ink-mute mb-6">— {t.ui.contactEyebrow}</p>
          <h1 className="headline text-ink">
            <span className="block">{t.contact.headingPart1.toUpperCase()}</span>
            <span className="block">
              <span className="text-acid">{t.contact.headingAccent.toUpperCase()}</span>
              <span className="text-acid">.</span>
            </span>
          </h1>
        </div>
      </section>

      <Marquee items={t.marquees.contact} />

      {/* Form section — smaller heading, focused */}
      <section className="py-16 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="mono text-ink-mute mb-3">— {t.contact.directLabel}</p>
            <h2
              className="text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {t.contact.formHeading}
              <span className="text-acid">.</span>
            </h2>
            <p className="mt-4 prose-brut text-ink-mute text-[14px] leading-[1.55] max-w-[34ch]">
              {t.contact.formIntro}
            </p>
          </div>
          <div className="md:col-span-9">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Direct contact cards — no duplicate big heading */}
      <DirectContact />
    </>
  );
}
