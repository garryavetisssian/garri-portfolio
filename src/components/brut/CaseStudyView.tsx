"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CaseStudy } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects } from "@/data/projects";

function categoryString(cat: CaseStudy["category"]): string {
  return Array.isArray(cat) ? cat.join(" · ") : cat;
}

function renderInline(text: string) {
  // Bold + line break support without a markdown lib
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function CaseStudyView({ project }: { project: CaseStudy }) {
  const { locale, t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);

      // Find current section
      const sections = project.sections.map((s) => document.getElementById(s.id));
      let current: string | null = null;
      sections.forEach((el) => {
        if (el && el.getBoundingClientRect().top < 120) current = el.id;
      });
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [project.sections]);

  const nextProject = project.nextProject
    ? projects.find((p) => p.slug === project.nextProject)
    : undefined;

  return (
    <article>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-px bg-line"
        aria-hidden
      >
        <div
          className="h-full bg-acid transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Page header */}
      <section className="pt-[calc(var(--nav-h)+4rem)] pb-12">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <div className="flex items-center gap-3 mb-10 mono">
            <Link href={`/${locale}/work`} className="text-ink-mute hover:text-acid link-uline">
              ← {t.caseStudy.backToWork}
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="text-ink-faint">{project.slug}</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-9">
              <div className="flex flex-wrap gap-2 mb-6">
                {(Array.isArray(project.category) ? project.category : [project.category]).map(
                  (c) => (
                    <span key={c} className="chip chip-acid">{c}</span>
                  )
                )}
                <span className="chip">{project.year}</span>
              </div>
              <h1
                className="text-ink"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(3.5rem, 11vw, 11rem)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.88,
                }}
              >
                {project.title.toUpperCase()}
                <span className="text-acid">.</span>
              </h1>
              <p className="mt-8 prose-brut text-ink-mute text-[19px] max-w-[58ch]">
                {project.subtitle}
              </p>
            </div>

            {/* Sidebar meta */}
            <aside className="md:col-span-3 hairline-t pt-6 space-y-5">
              {[
                { label: t.caseStudy.role, value: project.role },
                { label: t.caseStudy.duration, value: project.duration },
                { label: t.caseStudy.team, value: project.team },
                { label: t.caseStudy.year, value: project.year },
              ].map((row) => (
                <div key={row.label} className="flex flex-col">
                  <span className="mono text-ink-faint">— {row.label}</span>
                  <span className="text-ink mt-1">{row.value}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      {/* Hero image / project color band */}
      <section className="relative">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <div
            className="relative w-full overflow-hidden border border-line-strong"
            style={{
              aspectRatio: "16 / 8",
              background: `linear-gradient(135deg, ${project.color}33 0%, ${project.color}05 50%, transparent 100%), var(--paper-soft)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="select-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(5rem, 16vw, 14rem)",
                  letterSpacing: "-0.05em",
                  color: project.color,
                  opacity: 0.18,
                }}
                aria-hidden
              >
                {project.title.toUpperCase()}
              </span>
            </div>
            {/* Corner stamps */}
            <span className="absolute top-4 left-4 mono text-ink-mute">— Hero / {project.slug}</span>
            <span className="absolute top-4 right-4 mono text-ink-mute">{project.year}</span>
            <span className="absolute bottom-4 left-4 mono text-ink-mute">{categoryString(project.category)}</span>
            <span
              className="absolute bottom-4 right-4 mono"
              style={{ color: project.color }}
            >
              ████ COLOR / {project.color}
            </span>
          </div>
        </div>
      </section>

      {/* TLDR block */}
      <section className="py-20 border-t border-line-strong mt-20">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <p className="mono text-ink-faint mb-3">— TL;DR</p>
          <h2 className="headline-md text-ink mb-12">
            THE SHORT VERSION<span className="text-acid">.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-line-strong hairline-t hairline-b">
            {[
              { label: t.caseStudy.problem, content: project.tldr.problem },
              { label: t.caseStudy.solution, content: project.tldr.solution },
              { label: t.caseStudy.outcome, content: project.tldr.outcome },
            ].map((b, i) => (
              <div key={b.label} className="bg-paper p-7">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-acid"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.75rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mono text-ink-mute">/ {b.label}</span>
                </div>
                <p className="prose-brut text-ink text-[16px] leading-[1.5]">{b.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <p className="md:col-span-3 mono text-ink-faint">— {t.caseStudy.overview}</p>
          <p className="md:col-span-9 prose-brut text-ink text-[19px] leading-[1.55] max-w-[62ch]">
            {project.overview}
          </p>
        </div>
      </section>

      {/* Sections */}
      {project.sections.length > 0 && (
        <section className="py-16 border-t border-line-strong relative">
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
            {/* Sticky TOC */}
            <aside className="md:col-span-3 md:sticky md:top-[calc(var(--nav-h)+2rem)] self-start hidden md:block">
              <p className="mono text-ink-faint mb-4">— Index</p>
              <ul className="space-y-2">
                {project.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-baseline gap-2 mono transition-colors ${
                        activeSection === s.id
                          ? "text-acid"
                          : "text-ink-mute hover:text-ink"
                      }`}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span className="truncate">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Section content */}
            <div className="md:col-span-9 space-y-20">
              {project.sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-32">
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="mono text-acid">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mono text-ink-faint">— Section</span>
                  </div>
                  <h3
                    className="text-ink mb-7"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {s.title}
                  </h3>
                  <div className="prose-brut text-ink text-[17px]">
                    {s.content.split("\n\n").map((para, j) => (
                      <p key={j}>{renderInline(para)}</p>
                    ))}
                  </div>

                  {s.images && s.images.length > 0 && (
                    <div className="mt-8 grid gap-4 grid-cols-1">
                      {s.images.map((src, j) => (
                        <div
                          key={j}
                          className="img-stub aspect-[16/9] flex items-center justify-center"
                        >
                          <span className="mono text-ink-faint">
                            [ IMG · {src.split("/").pop()} ]
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="py-20 border-t border-line-strong bg-paper-soft">
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
            <p className="mono text-ink-faint mb-3">— {t.caseStudy.impact}</p>
            <h3 className="headline-md text-ink mb-12">
              THE RECEIPTS<span className="text-acid">.</span>
            </h3>
            <div
              className="grid gap-px bg-line-strong hairline-t hairline-b"
              style={{ gridTemplateColumns: `repeat(${Math.min(project.metrics.length, 4)}, minmax(0, 1fr))` }}
            >
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-paper-soft p-7">
                  <span
                    className="text-acid block"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 0.95,
                    }}
                  >
                    {m.prefix}{m.value}{m.suffix}
                  </span>
                  <p className="mono text-ink-mute mt-4">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reflection */}
      <section className="py-20 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="mono text-ink-faint">— {t.caseStudy.reflection}</p>
          </div>
          <div className="md:col-span-9">
            <div className="prose-brut text-ink text-[18px] leading-[1.65] max-w-[62ch] border-l border-acid pl-6">
              {project.reflection.split("\n\n").map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <section className="border-t border-line-strong">
          <Link
            href={`/${locale}/work/${nextProject.slug}`}
            className="group block py-16 hover:bg-acid transition-colors"
          >
            <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-6 items-center">
              <span className="md:col-span-2 mono text-ink-faint group-hover:text-paper">
                — {t.caseStudy.nextProject}
              </span>
              <span
                className="md:col-span-8 text-ink group-hover:text-paper"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 7vw, 6rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                {nextProject.title.toUpperCase()}
              </span>
              <span className="md:col-span-2 mono text-ink group-hover:text-paper text-right text-[18px]">
                ↗
              </span>
            </div>
          </Link>
        </section>
      )}
    </article>
  );
}
