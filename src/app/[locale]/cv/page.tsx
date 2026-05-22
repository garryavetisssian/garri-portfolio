import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import {
  BIO,
  LANGUAGES_I18N,
  SKILLS_I18N,
  WORK_EXPERIENCE_I18N,
  FREELANCE_PROJECTS_I18N,
} from "@/data/about.i18n";
import { SITE } from "@/lib/constants";
import CvActions from "./CvActions";
import CvPageMode from "./CvPageMode";
import "./cv.css";

const localeCodes = LOCALES.map((l) => l.code) as Locale[];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) return {};
  const t = DICTIONARIES[locale as Locale];
  return {
    title: `${t.hero.name} — ${t.hero.role}`,
    description: t.hero.summary,
    alternates: {
      canonical: `/${locale}/cv`,
      languages: { en: "/en/cv", ru: "/ru/cv", hy: "/hy/cv" },
    },
  };
}

export default async function CvPage({ params }: PageProps) {
  const { locale: loc } = await params;
  if (!localeCodes.includes(loc as Locale)) notFound();
  const locale = loc as Locale;
  const t = DICTIONARIES[locale];
  const bio = BIO[locale];
  const skills = SKILLS_I18N[locale];
  const languages = LANGUAGES_I18N[locale];
  const work = WORK_EXPERIENCE_I18N[locale];
  const freelance = FREELANCE_PROJECTS_I18N[locale];

  return (
    <div className="cv-root" lang={locale}>
      <style>{`html, body { background: #f4f5f8 !important; color-scheme: light; }`}</style>
      <CvPageMode />
      <CvActions locale={locale} labels={{ downloadPdf: t.cv.downloadPdf, print: t.cv.print }} />

      <article className="cv-page">
        <header className="cv-header">
          <div>
            <h1 className="cv-name">{t.hero.name}</h1>
            <p className="cv-role">{t.hero.role}</p>
          </div>
          <div className="cv-contact">
            <div>
              <span className="cv-contact-label">{t.cv.location}</span>
              <span className="cv-contact-value">{t.hero.locationCity}</span>
            </div>
            <div>
              <span className="cv-contact-label">{t.cv.email}</span>
              <a className="cv-contact-value" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div>
              <span className="cv-contact-label">{t.cv.phone}</span>
              <a className="cv-contact-value" href={`tel:${SITE.phone.replace(/\s+/g, "")}`}>{SITE.phone}</a>
            </div>
            <div>
              <span className="cv-contact-label">{t.cv.linkedin}</span>
              <a className="cv-contact-value" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                {SITE.linkedin.replace("https://", "")}
              </a>
            </div>
          </div>
        </header>

        <section className="cv-section">
          <h2 className="cv-section-title">{t.cv.summaryTitle}</h2>
          {bio.bio.map((p, i) => (
            <p key={i} className="cv-paragraph">{p}</p>
          ))}
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{t.cv.workExperienceTitle}</h2>
          <div className="cv-job-list">
            {work.map((job) => (
              <div key={job.company + job.period} className="cv-job">
                <div className="cv-job-header">
                  <div>
                    <h3 className="cv-job-role">{job.role}</h3>
                    <p className="cv-job-company">
                      {job.company}
                      {job.location ? ` — ${job.location}` : ""}
                    </p>
                  </div>
                  <p className="cv-job-period">{job.period}</p>
                </div>
                <ul className="cv-bullets">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <div className="cv-section-head-row">
            <h2 className="cv-section-title">{t.cv.freelanceTitle}</h2>
            <span className="cv-section-meta">{t.cv.freelancePeriod}</span>
          </div>
          <div className="cv-job-list">
            {freelance.map((proj) => (
              <div key={proj.name} className="cv-job">
                <div className="cv-job-header">
                  <div>
                    <h3 className="cv-job-role">
                      {proj.name}
                      <span className="cv-job-tag" style={{ backgroundColor: proj.tagColor + "20", color: proj.tagColor }}>
                        {proj.tag}
                      </span>
                    </h3>
                    <p className="cv-job-company">{proj.description}</p>
                  </div>
                  <p className="cv-job-period">{proj.period}</p>
                </div>
                <ul className="cv-bullets">
                  {proj.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section cv-grid">
          <div>
            <h2 className="cv-section-title">{t.cv.skillsTitle}</h2>
            {skills.map((group) => (
              <div key={group.category} className="cv-skill-group">
                <p className="cv-skill-category">{group.category}</p>
                <p className="cv-skill-items">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="cv-section-title">{t.cv.languagesTitle}</h2>
            <ul className="cv-lang-list">
              {languages.map((l) => (
                <li key={l.name}>
                  <span>{l.name}</span>
                  <span className="cv-lang-level">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="cv-footer">
          <span>{SITE.url.replace("https://", "")}</span>
          <span>{t.cv.generatedOn} {new Date().toLocaleDateString(locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-RU" : "en-US")}</span>
        </footer>
      </article>
    </div>
  );
}
