import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Marquee from "@/components/brut/Marquee";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import {
  BIO,
  SKILLS_I18N,
  LANGUAGES_I18N,
  WORK_EXPERIENCE_I18N,
  FREELANCE_PROJECTS_I18N,
} from "@/data/about.i18n";

const localeCodes = LOCALES.map((l) => l.code) as Locale[];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) return {};
  return {
    title: "About — Garri Avetisyan",
    description:
      "Product Designer with 5+ years building complex digital products. Learn about my approach, process, and experience.",
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", ru: "/ru/about", hy: "/hy/about" },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) notFound();
  const loc = locale as Locale;
  const t = DICTIONARIES[loc];
  const bio = BIO[loc];
  const skills = SKILLS_I18N[loc];
  const langs = LANGUAGES_I18N[loc];
  const work = WORK_EXPERIENCE_I18N[loc];
  const freelance = FREELANCE_PROJECTS_I18N[loc];

  return (
    <>
      <section className="pt-[calc(var(--nav-h)+5rem)] pb-16">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <p className="mono text-ink-mute mb-6">— {t.ui.aboutEyebrow}</p>
          <h1 className="headline text-ink">
            <span className="block">{t.about.heroLine1}</span>
            <span className="block">
              {t.about.heroLine2}<span className="text-acid">.</span>
            </span>
          </h1>
        </div>
      </section>

      <section className="py-16 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="mono text-ink-mute">— {t.about.bioLabel} / 01</p>
          </div>
          <div className="md:col-span-9 prose-brut text-ink text-[19px] leading-[1.6] max-w-[62ch] space-y-6">
            {bio.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={t.marquees.about} />

      <section className="py-20 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="mono text-ink-mute">— {t.about.capabilitiesLabel} / 02</p>
          </div>
          <div className="md:col-span-9 space-y-12">
            {skills.map((group, gi) => (
              <div key={group.category} className="hairline-t pt-6">
                <div className="flex items-baseline justify-between mb-6">
                  <h2
                    className="text-ink"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {group.category}
                  </h2>
                  <span className="mono text-ink-mute">
                    {String(gi + 1).padStart(2, "0")} / {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip text-ink hover:border-acid hover:text-acid transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="hairline-t pt-6">
              <h2
                className="text-ink mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                {t.hero.languages}
              </h2>
              <ul className="grid sm:grid-cols-3 gap-px bg-line-strong hairline-t hairline-b">
                {langs.map((l) => (
                  <li key={l.name} className="bg-paper p-5">
                    <p
                      className="text-ink"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                      }}
                    >
                      {l.name}
                    </p>
                    <p className="mono text-acid mt-2">— {l.level}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-line-strong bg-paper-soft">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="mono text-ink-mute">— {t.about.methodLabel} / 03</p>
          </div>
          <p className="md:col-span-9 prose-brut text-ink text-[18px] leading-[1.65] max-w-[62ch] border-l border-acid pl-6">
            {bio.collaboration}
          </p>
        </div>
      </section>

      <section className="py-20 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="mono text-ink-mute">— {t.about.experienceLabel} / 04</p>
          </div>
          <div className="md:col-span-9 space-y-12">
            {work.map((w, i) => (
              <article key={w.company + w.period} className="hairline-t pt-8">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <span
                    className="text-ink"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <span className="text-ink-mute mr-3 mono text-[14px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {w.company}
                  </span>
                  <span className="mono text-ink-mute whitespace-nowrap">{w.period}</span>
                </div>
                <p className="mono text-acid mb-4">
                  {w.role} · {w.location}
                </p>
                <ul className="space-y-2 prose-brut text-ink-mute text-[15px] leading-[1.55] max-w-[64ch]">
                  {w.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-acid shrink-0">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-line-strong bg-paper-soft">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="mono text-ink-mute">— {t.about.freelanceLabel} / 05</p>
          </div>
          <div className="md:col-span-9 grid gap-px bg-line-strong hairline-t hairline-b">
            {freelance.map((f) => (
              <article key={f.name} className="bg-paper-soft p-7">
                <div className="flex items-baseline justify-between mb-3">
                  <span
                    className="text-ink"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {f.name}
                  </span>
                  <span className="mono" style={{ color: f.tagColor }}>
                    [{f.tag}]
                  </span>
                </div>
                <p className="mono text-ink-mute mb-4">{f.period}</p>
                <p className="prose-brut text-ink mb-4">{f.description}</p>
                <ul className="space-y-1.5 prose-brut text-ink-mute text-[14px]">
                  {f.details.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-acid">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
