"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CaseStudy } from "@/lib/types";
import type { CaseAssets, CaseTab, CaseAsset } from "@/lib/case-assets";
import { useLanguage, translateTabName } from "@/lib/i18n/LanguageContext";
import { localizeCategory } from "@/data/projects.i18n";
import { getCaseEvidence } from "@/data/case-evidence";
import Brief from "./Brief";
import CaseEvidencePanel from "./CaseEvidencePanel";
import LaptopReveal from "./LaptopReveal";
import ChatButton from "./ChatButton";
import GameCaseExperience from "./game-cases/GameCaseExperience";
import BackToWork from "./BackToWork";
import LegacyCaseNarrative, { hasLegacyNarrative } from "./LegacyCaseNarrative";
import FlagshipCaseOpening from "./FlagshipCaseOpening";
import GamingCaseOpening from "./GamingCaseOpening";
import { getArchiveHighlights, type ArchiveHighlight } from "@/data/case-archive-highlights";

const sourceArchiveCopy = {
  en: { title: "Original project boards", expand: "Show boards", collapse: "Hide boards", start: "Start with these boards", board: "Board", note: "The full source deck is preserved here. Its presentation copy reflects the original project stage; the case above is the current, status-accurate account.", xyNote: "XY figures inside pre-production screens are illustrative interface content, not live transaction or payout data.", film: "XYGO case film · original motion artifact" },
  ru: { title: "Исходные экраны проекта", expand: "Показать экраны", collapse: "Скрыть экраны", start: "Начните с этих экранов", board: "Экран", note: "Полная презентация сохранена здесь. Её тексты относятся к исходному этапу проекта; выше изложен актуальный статус.", xyNote: "Цифры внутри препродакшен-экранов XY иллюстрируют интерфейс, а не реальные транзакции или выплаты.", film: "Видео XYGO · оригинальный материал" },
  hy: { title: "Նախագծի սկզբնական էկրանները", expand: "Ցույց տալ էկրանները", collapse: "Թաքցնել էկրանները", start: "Սկսեք այս էկրաններից", board: "Էկրան", note: "Ամբողջ սկզբնական ներկայացումը պահված է այստեղ։ Դրա տեքստը վերաբերում է նախագծի այն փուլին. վերևում ներկայացված է ընթացիկ կարգավիճակը։", xyNote: "XY-ի նախաարտադրական էկրանների թվերը պատկերային օրինակներ են, ոչ իրական գործարքներ կամ վճարումներ։", film: "XYGO տեսանյութ · սկզբնական նյութ" },
};

function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

/** Silent case films play while visible; controls remain unobstructed. */
function VideoBlock({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const syncPlayback = () => {
      if (inView && !document.hidden && !motionPreference.matches) {
        void el.play().catch(() => undefined);
      } else {
        el.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.45) inView = true;
        else if (!entry.isIntersecting || entry.intersectionRatio < 0.15) inView = false;
        syncPlayback();
      },
      { threshold: [0, 0.15, 0.45, 0.75] },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", syncPlayback);
    motionPreference.addEventListener("change", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motionPreference.removeEventListener("change", syncPlayback);
    };
  }, []);
  return (
    <video ref={videoRef} src={src} aria-label={label} muted loop playsInline controls preload="metadata" className="block w-full h-auto" />
  );
}

function AssetBlock({ asset, priority, alt }: { asset: CaseAsset; priority?: boolean; alt: string }) {
  if (asset.type === "video") {
    return <VideoBlock src={asset.src} label={alt} />;
  }
  return <a href={asset.src} target="_blank" rel="noopener noreferrer" aria-label={`${alt} — open full size`} className="block cursor-zoom-in focus-visible:outline-acid">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className="block w-full h-auto select-none"
      // Reserve the correct box from the intrinsic ratio so lazy images don't
      // collapse to 0 height (which made the gallery look like one slide).
      style={
        asset.width && asset.height
          ? { aspectRatio: `${asset.width} / ${asset.height}` }
          : undefined
      }
      draggable={false}
    />
  </a>;
}

function Gallery({ assets, title, priority = 0, highlights = [], boardLabel = "Board" }: { assets: CaseAsset[]; title: string; priority?: number; highlights?: ArchiveHighlight[]; boardLabel?: string }) {
  if (assets.length === 0) return null;
  return (
    <div className="flex flex-col">
      {assets.map((a, i) => {
        const highlight = highlights.find(item => item.index === i);
        const caption = highlight?.label;
        return <figure key={a.src} id={`archive-board-${i}`} className="m-0 scroll-mt-[calc(var(--nav-h)+1rem)]">
          <AssetBlock asset={a} priority={i < priority} alt={caption ? `${title} — ${caption}` : `${title} — ${boardLabel} ${i + 1}`} />
          {caption && <figcaption className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-3 border-b border-line-strong mono text-ink-mute text-sm"><span className="text-acid mr-3">{String(i + 1).padStart(2, "0")}</span>{caption}</figcaption>}
        </figure>;
      })}
    </div>
  );
}

function ArchiveIndex({ highlights, locale, onChoose }: { highlights: ArchiveHighlight[]; locale: "en" | "ru" | "hy"; onChoose?: () => void }) {
  if (highlights.length === 0) return null;
  const copy = sourceArchiveCopy[locale];
  return <nav className="mx-auto max-w-[var(--max)] px-[var(--gutter)] pb-8" aria-label={copy.start}>
    <p className="mono text-ink-mute mb-3">— {copy.start}</p>
    <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">{highlights.map(item => <li key={item.index}>
      <a href={`#archive-board-${item.index}`} onClick={onChoose} className="group flex items-center gap-4 min-h-14 border border-line-strong px-4 py-3 hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid transition-colors">
        <span className="mono text-ink-mute group-hover:text-acid">{String(item.index + 1).padStart(2, "0")}</span>
        <span className="font-medium leading-tight flex-1">{item.label}</span>
        <span aria-hidden="true">↓</span>
      </a>
    </li>)}</ol>
  </nav>;
}

/**
 * Standalone tab strip — lives above the LaptopReveal so the user sees the
 * control alongside *all* the things it changes (cover image + gallery).
 * Sticks to the top under the nav once scrolled past.
 */
function TabStrip({
  tabs,
  active,
  onActiveChange,
}: {
  tabs: CaseTab[];
  active: number;
  onActiveChange: (i: number) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="case-tab-strip sticky top-[var(--nav-h)] z-30 border-y border-line-strong bg-paper/95 backdrop-blur-md">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <div className="flex items-stretch gap-0 overflow-x-auto">
          {tabs.map((tab, i) => {
            const isActive = i === active;
            return (
              <button
                key={tab.name}
                onClick={() => onActiveChange(i)}
                aria-pressed={isActive}
                className={`relative group flex-1 min-w-[clamp(150px,42vw,200px)] text-left transition-colors px-5 md:px-7 py-5 md:py-6 border-r border-line-strong last:border-r-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-acid ${
                  isActive
                    ? "bg-acid text-paper"
                    : "bg-paper text-ink-mute hover:text-ink hover:bg-paper-soft"
                }`}
              >
                <span
                  className={`mono block text-[11px] tracking-[0.16em] uppercase mb-1 whitespace-nowrap ${
                    isActive ? "text-paper" : "text-ink-faint"
                  }`}
                >
                  Tab {String(i + 1).padStart(2, "0")} · {tab.assets.length} {t.ui.filesSuffix}
                </span>
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    overflowWrap: "break-word",
                    wordBreak: "normal",
                    hyphens: "auto",
                  }}
                >
                  {translateTabName(tab.name, t)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TabbedGallery({
  tabs,
  active,
  title,
}: {
  tabs: CaseTab[];
  active: number;
  title: string;
}) {
  const current = tabs[active];
  if (!current) return null;
  return <Gallery assets={current.assets} title={`${title} · ${current.name}`} priority={1} />;
}

export default function CaseStudyView({
  project,
  caseAssets,
  nextProject,
}: {
  project: CaseStudy;
  caseAssets: CaseAssets;
  nextProject: CaseStudy | null;
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

  const hasGallery = !caseAssets.isEmpty;
  const hasBespokeGameCase = project.slug === "spearthrone" || project.slug === "roos-ruckus";
  const conceptMetricLabel = {
    en: "Concept game parameters · not performance results",
    ru: "Параметры концепта · не результаты работы продукта",
    hy: "Կոնցեպտի խաղային պարամետրեր · ոչ արդյունքներ",
  }[locale];
  // Spearthrone's authored chapters carry the brief and overview. Lead with
  // the game rather than repeating the same introduction above its artwork.
  const hasVisualFirstIntro = project.slug === "spearthrone";
  const hasTabs = caseAssets.tabs.length > 0;
  const hasEvidence = Boolean(getCaseEvidence(project.slug, locale));
  const hasCorrectedNarrative = hasLegacyNarrative(project.slug);

  // Active tab is lifted here so both the gallery and the laptop screen
  // react to it. Defaults to the "Release Version" tab when tabs exist.
  const [selectedTab, setSelectedTab] = useState(caseAssets.defaultTab);
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  const xyTabName = hash === "#xygo" ? "XYGO - WEB3 Lottery" : hash === "#protocols" ? "XY Protocols" : null;
  const xyTabIndex = xyTabName ? caseAssets.tabs.findIndex(tab => tab.name === xyTabName) : -1;
  const activeTab = project.slug === "xy-ecosystem" && xyTabIndex !== -1 ? xyTabIndex : selectedTab;
  const currentGalleryAssets = hasTabs ? caseAssets.tabs[activeTab]?.assets ?? [] : caseAssets.assets;
  const featuredVideo = hasEvidence && project.slug === "xy-ecosystem" ? currentGalleryAssets.find(asset => asset.type === "video") : undefined;
  const archiveAssets = featuredVideo ? currentGalleryAssets.filter(asset => asset !== featuredVideo) : currentGalleryAssets;
  const archiveHighlights = getArchiveHighlights(project.slug, hasTabs ? caseAssets.tabs[activeTab]?.name : undefined, archiveAssets, locale);
  function setActiveTab(index: number) {
    setSelectedTab(index);
    if (project.slug === "xy-ecosystem") {
      const section = caseAssets.tabs[index]?.name === "XY Protocols" ? "#protocols" : "#xygo";
      window.history.replaceState(window.history.state, "", section);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else if (window.location.hash.startsWith("#archive-board-")) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    }
  }

  // Cover image for the laptop screen:
  //   1. Prefer the cover of the currently active tab (if the case has tabs)
  //   2. Otherwise fall back to the root cover
  //   3. Final fallback: first image asset (in case no Cover file is named)
  const firstImageSrc =
    caseAssets.assets.find((a) => a.type === "image")?.src ??
    caseAssets.tabs[activeTab]?.assets.find((a) => a.type === "image")?.src ??
    null;

  const coverSrc =
    (hasTabs ? caseAssets.tabs[activeTab]?.cover : caseAssets.cover) ??
    caseAssets.cover ??
    firstImageSrc;

  return (
    <article className="project-case">
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
            <BackToWork locale={locale} slug={project.slug}>
              ← {t.caseStudy.backToWork}
            </BackToWork>
            <span className="text-ink-faint">/</span>
            <span className="text-ink-mute">{project.slug}</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="project-title-container min-w-0 md:col-span-9">
              <div className="flex flex-wrap gap-2 mb-6">
                {(Array.isArray(project.category) ? project.category : [project.category]).map(
                  (c) => (
                    <span key={c} className="chip chip-acid">{localizeCategory(c, locale)}</span>
                  )
                )}
                <span className="chip">{project.year}</span>
              </div>
              <h1
                className="project-title text-ink"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  letterSpacing: "-0.045em",
                  lineHeight: 1.08,
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
            <aside className="md:col-span-3 hairline-t pt-6 grid grid-cols-2 gap-x-4 gap-y-5 md:block md:space-y-5">
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

      {(project.slug === "ineed" || project.slug === "balvoi") && <FlagshipCaseOpening slug={project.slug} locale={locale} />}
      {(project.slug === "duck-master" || project.slug === "xy-ecosystem") && <GamingCaseOpening slug={project.slug} locale={locale} />}

      {/* Brief — bespoke per-case primer (replaces legacy TL;DR strip). */}
      {!hasVisualFirstIntro && !hasEvidence && !hasCorrectedNarrative && <Brief brief={project.brief} slug={project.slug} />}

      {/* Tab strip — for cases with multiple tabs, lives ABOVE everything it
          controls (the laptop cover + the gallery), so the control sits in
          the same scroll region as the content that changes. */}
      {hasTabs && !hasEvidence && (
        <TabStrip
          tabs={caseAssets.tabs}
          active={activeTab}
          onActiveChange={setActiveTab}
        />
      )}

      {/* Laptop reveal — scroll-driven cover image moment, tinted with the
          case's accent color. */}
      {coverSrc && !hasBespokeGameCase && !hasEvidence && !hasCorrectedNarrative && <LaptopReveal src={coverSrc} color={project.color} />}

      {/* Describe ownership without self-scored percentage bars. */}
      {project.roleBreakdown && !hasVisualFirstIntro && !hasEvidence && !hasCorrectedNarrative && (
        <section className="border-t border-line-strong py-8" aria-label="Project responsibilities">
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-5">
            <span className="mono text-ink-mute md:col-span-3">— {t.caseStudy.role}</span>
            <div className="md:col-span-9">
              {project.roleBreakdown.summary && <p className="text-ink text-[18px] leading-[1.5] max-w-[62ch]">{project.roleBreakdown.summary}</p>}
              <p className="mono text-ink-mute mt-3">{project.roleBreakdown.tracks.map(track => track.label).join(" · ")}</p>
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      {!hasVisualFirstIntro && !hasEvidence && !hasCorrectedNarrative && <section className="py-16 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <p className="md:col-span-3 mono text-ink-mute">— {t.caseStudy.overview}</p>
          <p className="md:col-span-9 prose-brut text-ink text-[19px] leading-[1.55] max-w-[62ch]">
            {project.overview}
          </p>
        </div>
      </section>}

      {hasEvidence && <CaseEvidencePanel slug={project.slug} locale={locale} />}
      {hasCorrectedNarrative && <LegacyCaseNarrative slug={project.slug} locale={locale} />}

      {hasTabs && hasEvidence && (
        <TabStrip tabs={caseAssets.tabs} active={activeTab} onActiveChange={setActiveTab} />
      )}

      {/* Image stack — Behance style. Full container width, zero gaps. */}
      {hasBespokeGameCase && <GameCaseExperience slug={project.slug} />}

      {hasGallery && !hasBespokeGameCase && hasEvidence && (
        <section className="border-t border-line-strong bg-paper" aria-label={t.caseStudy.visuals}>
          {featuredVideo && <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-10">
            <p className="mono text-ink-mute mb-4">— {sourceArchiveCopy[locale].film}</p>
            <div className="max-w-[1440px] mx-auto border border-line-strong"><VideoBlock src={featuredVideo.src} label={sourceArchiveCopy[locale].film} /></div>
          </div>}
          <details key={project.slug === "xy-ecosystem" ? activeTab : project.slug} open className="group border-t border-line-strong">
            <summary className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-6 min-h-16 cursor-pointer list-none flex items-center justify-between gap-5 focus-visible:outline-acid [&::-webkit-details-marker]:hidden">
              <span className="font-display text-[clamp(1.15rem,2vw,1.6rem)] font-bold">{sourceArchiveCopy[locale].title}</span>
              <span className="mono text-ink-mute shrink-0 text-right">{archiveAssets.length} {t.ui.filesSuffix}<span className="block sm:inline"> · <span className="group-open:hidden">{sourceArchiveCopy[locale].expand}</span><span className="hidden group-open:inline">{sourceArchiveCopy[locale].collapse}</span></span> <span aria-hidden="true" className="inline-block ml-1"><span className="group-open:hidden">＋</span><span className="hidden group-open:inline">−</span></span></span>
            </summary>
            <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] pb-6 text-ink-mute leading-relaxed"><p className="max-w-[72ch]">{sourceArchiveCopy[locale].note}</p>{project.slug === "xy-ecosystem" && <p className="max-w-[72ch] mt-2">{sourceArchiveCopy[locale].xyNote}</p>}</div>
            <ArchiveIndex highlights={archiveHighlights} locale={locale} onChoose={project.slug === "xy-ecosystem" ? () => setSelectedTab(activeTab) : undefined} />
            <Gallery assets={archiveAssets} title={project.title} highlights={archiveHighlights} boardLabel={sourceArchiveCopy[locale].board} />
          </details>
        </section>
      )}

      {hasGallery && !hasBespokeGameCase && !hasEvidence && (
        <section className="border-t border-line-strong bg-paper">
          {/* Strip label above the stack */}
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-6 flex items-center justify-between mono">
            <span className="text-ink-mute">— {t.caseStudy.visuals}</span>
            <span className="text-ink-mute">
              {hasTabs
                ? t.caseStudy.versionsAssets
                    .replace("{count}", String(caseAssets.tabs.length))
                    .replace(
                      "{total}",
                      String(caseAssets.tabs.reduce((s, tab) => s + tab.assets.length, 0))
                    )
                : t.caseStudy.assetsCount.replace(
                    "{count}",
                    String(caseAssets.assets.length)
                  )}
            </span>
          </div>

          {hasTabs ? (
            <TabbedGallery tabs={caseAssets.tabs} active={activeTab} title={project.title} />
          ) : (
            <Gallery assets={caseAssets.assets} title={project.title} priority={1} />
          )}
        </section>
      )}

      {/* Metrics — no generic heading, numbers speak */}
      {!hasEvidence && !hasCorrectedNarrative && project.metrics && project.metrics.length > 0 && (
        <section className="py-16 border-t border-line-strong bg-paper-soft">
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
            <div className="flex items-baseline justify-between mb-8 mono">
              <span className="text-ink-mute">— {hasBespokeGameCase ? conceptMetricLabel : t.caseStudy.impact}</span>
              <span className="text-ink-mute">
                {project.slug.toUpperCase()} / {String(project.metrics.length).padStart(2, "0")}
              </span>
            </div>
            <div
              className="metrics-grid grid gap-px bg-line-strong hairline-t hairline-b"
              style={{
                "--metric-cols-m": Math.min(project.metrics.length, 2),
                "--metric-cols-d": Math.min(project.metrics.length, 4),
              } as React.CSSProperties}
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
      {!hasEvidence && !hasCorrectedNarrative && project.reflection && project.reflection.trim().length > 0 && (
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
                className="next-title md:col-span-8"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1.15rem, 3.2vw, 3rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.15,
                }}
              >
                {nextProject.title.toUpperCase()}
              </span>
              <span className="md:col-span-2 mono text-right text-[18px]">↗</span>
            </div>
          </Link>
        </section>
      )}

      {/* Per-case AI chat — floating button + lazy-loaded panel. */}
      <ChatButton slug={project.slug} caseTitle={project.title} />
    </article>
  );
}
