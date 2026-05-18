import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";

const localeCodes = LOCALES.map((l) => l.code) as Locale[];

export async function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) return {};
  const t = DICTIONARIES[locale as Locale];
  return {
    title: SITE.title,
    description: t.hero.summary,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ru: "/ru",
        hy: "/hy",
        "x-default": "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) notFound();

  return (
    <LanguageProvider locale={locale as Locale}>
      <div className="relative min-h-screen bg-paper text-ink">
        <div className="grain" aria-hidden />
        <Header locale={locale as Locale} />
        <main id="content" className="relative z-10">
          {children}
        </main>
        <Footer locale={locale as Locale} />
      </div>
    </LanguageProvider>
  );
}
