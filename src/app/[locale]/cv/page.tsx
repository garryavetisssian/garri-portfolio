import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { SITE } from "@/lib/constants";
import CV from "@/data/cv.json";
import CV_SETTINGS from "@/data/cv-settings.json";
import CvActions from "./CvActions";
import CvPageMode from "./CvPageMode";
import "./cv.css";

interface PageProps { params: Promise<{ locale: string }> }
const localeCodes = LOCALES.map((l) => l.code);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!localeCodes.includes(locale as Locale)) return {};
  const cv = CV[locale as Locale];
  return { title: `${cv.name} — ${cv.role} CV`, description: cv.summary,
    alternates: { canonical: `/${locale}/cv`, languages: { en: "/en/cv", ru: "/ru/cv", hy: "/hy/cv" } } };
}

export default async function CvPage({ params }: PageProps) {
  const { locale: loc } = await params;
  if (!localeCodes.includes(loc as Locale)) notFound();
  const locale = loc as Locale;
  const cv = CV[locale];
  const t = DICTIONARIES[locale];
  return <div className="cv-root" lang={locale}>
    <CvPageMode />
    <CvActions locale={locale} labels={{ downloadPdf: t.cv.downloadPdf, print: t.cv.print }} />
    <article className="cv-page">
      <header className="cv-header">
        <div className="cv-header-top">
          <h1 className="cv-name">{cv.name}</h1>
          <a className="cv-portfolio-download" href={CV_SETTINGS.portfolioUrl}>{cv.portfolioLabel} <span aria-hidden="true">↗</span></a>
        </div>
        <p className="cv-role">{cv.role}</p>
        <p className="cv-location">{cv.location}</p>
        <div className="cv-contact">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`}>{SITE.phone}</a>
          <a href={SITE.linkedin}>linkedin.com/in/garri-avetisyan</a>
        </div>
      </header>
      <section className="cv-section"><h2>{cv.summaryTitle}</h2><p>{cv.summary}</p></section>
      <section className="cv-section"><h2>{cv.experienceTitle}</h2>
        {cv.jobs.map(job => <div className="cv-job" key={job.company}>
          <div className="cv-job-header"><h3>{job.role} <span>— {job.company}</span></h3><p>{job.period}</p></div>
          <ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
        </div>)}
      </section>
      <section className="cv-section"><h2>{cv.projectsTitle}</h2><ul>{cv.projects.map(project => <li key={project}>{project}</li>)}</ul></section>
      <section className="cv-section"><h2>{cv.skillsTitle}</h2><p>{cv.skills}</p><p className="cv-tools">{cv.tools}</p></section>
      <section className="cv-section"><h2>{cv.languagesTitle}</h2><p>{cv.languages}</p></section>
    </article>
  </div>;
}
