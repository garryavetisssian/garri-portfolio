"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import type { CaseStudy } from "@/lib/types";
import type { CaseAssets, CaseTab, CaseAsset } from "@/lib/case-assets";
import { useLanguage, translateTabName } from "@/lib/i18n/LanguageContext";
import { projects } from "@/data/projects";

function AssetBlock({ asset, priority }: { asset: CaseAsset; priority?: boolean }) {
  if (asset.type === "video") {
    return (
      <video
        src={asset.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="block w-full h-auto"
      />
    );
  }
  // Use <img> over next/image for stacked gallery — gives us natural-height
  // full-bleed without forcing an aspect ratio. Next/image is great for hero
  // shots but fights us when stacking dozens of different sizes seamlessly.
  /* eslint-disable-next-line @next/next/no-img-element */
  return (
    <img
      src={asset.src}
      alt=""
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className="block w-full h-auto select-none"
      draggable={false}
    />
  );
}

function Gallery({ assets, priority = 0 }: { assets: CaseAsset[]; priority?: number }) {
  if (assets.length === 0) return null;
  return (
    <div className="flex flex-col">
      {assets.map((a, i) => (
        <AssetBlock key={a.src} asset={a} priority={i < priority} />
      ))}
    </div>
  );
}

function TabbedGallery({
  tabs,
  defaultTab,
}: {
  tabs: CaseTab[];
  defaultTab: number;
}) {
  const { t } = useLanguage();
  const [active, setActive] = useState(defaultTab);
  const current = tabs[active];

  return (
    <div>
      {/* Tab bar — sticky under the nav */}
      <div className="sticky top-[var(--nav-h)] z-20 border-y border-line-strong bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.name}
              onClick={() => setActive(i)}
              className={`mono px-4 py-3 whitespace-nowrap transition-colors border-b-2 ${
                i === active
                  ? "border-acid text-acid"
                  : "border-transparent text-ink-mute hover:text-ink"
              }`}
            >
              <span className="text-ink-faint mr-1.5">{String(i + 1).padStart(2, "0")}</span>
              {translateTabName(tab.name, t)}
              <span className="text-ink-faint ml-2">·</span>
              <span className="text-ink-faint ml-2">{tab.assets.length}</span>
            </button>
          ))}
        </div>
      </div>
      {current && <Gallery assets={current.assets} priority={1} />}
    </div>
  );
}

export default function CaseStudyView({
  project,
  caseAssets,
}: {
  project: CaseStudy;
  caseAssets: CaseAssets;
}) {
  const { locale, t } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextProject = useMemo(
    () =>
      project.nextProject
        ? projects.find((p) => p.slug === project.nextProject)
        : undefined,
    [project.nextProject]
  );

  const hasGallery = !caseAssets.isEmpty;
  const hasTabs = caseAssets.tabs.length > 0;

  return (
    <article>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-px bg-line" aria-hidden>
        <div
          className="h-full bg-acid transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Page header */}
      <section className="pt-[calc(var(--nav-h)+4rem)] pb-12">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <div className="flex items-center gap-3 mb-10 mono">
            <Link href={`/${locale}/work`} className="text-ink hover:text-acid link-uline">
              ← {t.caseStudy.backToWork}
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="text-ink-mute">{project.slug}</span>
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
              <p className="mt-8 prose-brut text-ink text-[19px] max-w-[58ch]">
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
                  <span className="mono text-ink-mute">— {row.label}</span>
                  <span className="text-ink mt-1">{row.value}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      {/* TLDR block */}
      <section className="py-20 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
          <p className="mono text-ink-mute mb-3">— TL;DR</p>
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
          <p className="md:col-span-3 mono text-ink-mute">— {t.caseStudy.overview}</p>
          <p className="md:col-span-9 prose-brut text-ink text-[19px] leading-[1.55] max-w-[62ch]">
            {project.overview}
          </p>
        </div>
      </section>

      {/* Image stack — Behance style. Full container width, zero gaps. */}
      {hasGallery && (
        <section className="border-t border-line-strong bg-paper">
          {/* Strip label above the stack */}
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-6 flex items-center justify-between mono">
            <span className="text-ink-mute">— Visuals</span>
            <span className="text-ink-mute">
              {hasTabs
                ? `${caseAssets.tabs.length} versions · ${caseAssets.tabs.reduce(
                    (s, tab) => s + tab.assets.length,
                    0
                  )} assets`
                : `${caseAssets.assets.length} assets`}
            </span>
          </div>

          {hasTabs ? (
            <TabbedGallery tabs={caseAssets.tabs} defaultTab={caseAssets.defaultTab} />
          ) : (
            <Gallery assets={caseAssets.assets} priority={1} />
          )}
        </section>
      )}

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="py-20 border-t border-line-strong bg-paper-soft">
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
            <p className="mono text-ink-mute mb-3">— {t.caseStudy.impact}</p>
            <h3 className="headline-md text-ink mb-12">
              THE RECEIPTS<span className="text-acid">.</span>
            </h3>
            <div
              className="grid gap-px bg-line-strong hairline-t hairline-b"
              style={{
                gridTemplateColumns: `repeat(${Math.min(project.metrics.length, 4)}, minmax(0, 1fr))`,
              }}
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
                    {m.prefix}
                    {m.value}
                    {m.suffix}
                  </span>
                  <p className="mono text-ink-mute mt-4">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reflection */}
      {project.reflection && project.reflection.trim().length > 0 && (
        <section className="py-20 border-t border-line-strong">
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <p className="mono text-ink-mute">— {t.caseStudy.reflection}</p>
            </div>
            <div className="md:col-span-9">
              <div className="prose-brut text-ink text-[18px] leading-[1.65] max-w-[62ch] border-l border-acid pl-6 space-y-4">
                {project.reflection.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next project */}
      {nextProject && (
        <section className="border-t border-line-strong">
          <Link
            href={`/${locale}/work/${nextProject.slug}`}
            className="next-project group block py-16"
          >
            <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-6 items-center">
              <span className="md:col-span-2 mono">— {t.caseStudy.nextProject}</span>
              <span
                className="md:col-span-8"
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
              <span className="md:col-span-2 mono text-right text-[18px]">↗</span>
            </div>
          </Link>
        </section>
      )}
    </article>
  );
}
