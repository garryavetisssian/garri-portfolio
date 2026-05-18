import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/brut/CaseStudyView";
import { getProject, getProjectSlugs } from "@/data/projects";
import { getCaseAssets } from "@/lib/case-assets";
import { LOCALES, type Locale } from "@/lib/i18n/types";

const localeCodes = LOCALES.map((l) => l.code) as Locale[];

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return localeCodes.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!localeCodes.includes(locale as Locale)) return {};
  const project = getProject(slug);
  if (!project) return {};

  const categoryString = Array.isArray(project.category)
    ? project.category.join(" · ")
    : project.category;

  return {
    title: `${project.title} — Case Study`,
    description: project.subtitle,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: {
        en: `/en/work/${slug}`,
        ru: `/ru/work/${slug}`,
        hy: `/hy/work/${slug}`,
      },
    },
    openGraph: {
      title: `${project.title} — ${categoryString} Case Study`,
      description: project.subtitle,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!localeCodes.includes(locale as Locale)) notFound();
  const project = getProject(slug);
  if (!project) notFound();

  // Server-side scan of public/cases/[slug]/ — baked into the static HTML.
  const caseAssets = getCaseAssets(slug);

  return <CaseStudyView project={project} caseAssets={caseAssets} />;
}
