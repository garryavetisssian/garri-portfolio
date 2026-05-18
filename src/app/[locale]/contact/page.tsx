import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactStrip from "@/components/brut/ContactStrip";
import ContactForm from "@/components/brut/ContactForm";
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
      {/* Page header */}
      <section className="pt-[calc(var(--nav-h)+5rem)] pb-12">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <p className="mono text-ink-mute mb-6">— {t.ui.contactEyebrow}</p>
          <h1 className="headline text-ink">
            <span className="block">{t.contact.headingPart1.toUpperCase()}</span>
            <span className="block">
              <span className="text-acid">{t.contact.headingAccent.toUpperCase()}</span>
              {t.contact.headingPart3.toUpperCase()}<span className="text-acid">.</span>
            </span>
          </h1>
          <p className="mt-8 prose-brut text-ink-mute max-w-[58ch]">
            {t.contact.formIntro}
          </p>
        </div>
      </section>

      <Marquee items={t.marquees.contact} />

      {/* Form section */}
      <section className="py-16 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="mono text-ink-mute mb-2">— Direct</p>
            <p
              className="text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              {t.contact.formName.toUpperCase()}, {t.contact.formEmail.toUpperCase()}, {t.contact.formMessage.toUpperCase()}.
            </p>
          </div>
          <div className="md:col-span-9">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Direct contact methods */}
      <ContactStrip />
    </>
  );
}
