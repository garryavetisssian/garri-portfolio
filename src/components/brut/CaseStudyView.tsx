"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CaseStudy } from "@/lib/types";
import type { CaseAssets, CaseTab, CaseAsset } from "@/lib/case-assets";
import { useLanguage, translateTabName } from "@/lib/i18n/LanguageContext";
import { localizeCategory } from "@/data/projects.i18n";
import Brief from "./Brief";
import MyRole from "./MyRole";
import LaptopReveal from "./LaptopReveal";
import ChatButton from "./ChatButton";
import GameCaseExperience from "./game-cases/GameCaseExperience";
import BackToWork from "./BackToWork";

function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

/** Silent case films play while visible; controls remain unobstructed. */
function VideoBlock({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          void el.play().catch(() => undefined);
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
          el.pause();
        }
      },
      { threshold: [0, 0.15, 0.45, 0.75] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <video ref={videoRef} src={src} muted loop playsInline controls preload="metadata" className="block w-full h-auto" />
  );
}

function AssetBlock({ asset, priority }: { asset: CaseAsset; priority?: boolean }) {
  if (asset.type === "video") {
    return <VideoBlock src={asset.src} />;
  }
  /* eslint-disable-next-line @next/next/no-img-element */
  return (
    <img
      src={asset.src}
      alt=""
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
                className={`relative group flex-1 min-w-[clamp(150px,42vw,200px)] text-left transition-colors px-5 md:px-7 py-5 md:py-6 border-r border-line-strong last:border-r-0 ${
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
}: {
  tabs: CaseTab[];
  active: number;
}) {
  const current = tabs[active];
  if (!current) return null;
  return <Gallery assets={current.assets} priority={1} />;
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
  // Spearthrone's authored chapters carry the brief and overview. Lead with
  // the game rather than repeating the same introduction above its artwork.
  const hasVisualFirstIntro = project.slug === "spearthrone";
  const hasTabs = caseAssets.tabs.length > 0;

  // Active tab is lifted here so both the gallery and the laptop screen
  // react to it. Defaults to the "Release Version" tab when tabs exist.
  const [selectedTab, setSelectedTab] = useState(caseAssets.defaultTab);
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  const xyTabName = hash === "#xygo" ? "XYGO - WEB3 Lottery" : "XY Protocols";
  const xyTabIndex = caseAssets.tabs.findIndex(tab => tab.name === xyTabName);
  const activeTab = project.slug === "xy-ecosystem" && xyTabIndex !== -1 ? xyTabIndex : selectedTab;
  function setActiveTab(index: number) {
    setSelectedTab(index);
    if (project.slug === "xy-ecosystem") {
      const section = caseAssets.tabs[index]?.name === "XY Protocols" ? "#protocols" : "#xygo";
      window.history.replaceState(window.history.state, "", section);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
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

          <div className="grid md:grid-cols-12 gap-8 items-end">
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

      {/* Brief — bespoke per-case primer (replaces legacy TL;DR strip). */}
      {!hasVisualFirstIntro && <Brief brief={project.brief} slug={project.slug} />}

      {/* Tab strip — for cases with multiple tabs, lives ABOVE everything it
          controls (the laptop cover + the gallery), so the control sits in
          the same scroll region as the content that changes. */}
      {hasTabs && (
        <TabStrip
          tabs={caseAssets.tabs}
          active={activeTab}
          onActiveChange={setActiveTab}
        />
      )}

      {/* Laptop reveal — scroll-driven cover image moment, tinted with the
          case's accent color. */}
      {coverSrc && !hasBespokeGameCase && <LaptopReveal src={coverSrc} color={project.color} />}

      {/* Role breakdown — discipline-level ownership bars. */}
      {project.roleBreakdown && !hasVisualFirstIntro && (
        <MyRole data={project.roleBreakdown} slug={project.slug} />
      )}

      {/* Overview */}
      {!hasVisualFirstIntro && <section className="py-16 border-t border-line-strong">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8">
          <p className="md:col-span-3 mono text-ink-mute">— {t.caseStudy.overview}</p>
          <p className="md:col-span-9 prose-brut text-ink text-[19px] leading-[1.55] max-w-[62ch]">
            {project.overview}
          </p>
        </div>
      </section>}

      {/* Image stack — Behance style. Full container width, zero gaps. */}
      {hasBespokeGameCase && <GameCaseExperience slug={project.slug} />}

      {hasGallery && !hasBespokeGameCase && (
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
            <TabbedGallery tabs={caseAssets.tabs} active={activeTab} />
          ) : (
            <Gallery assets={caseAssets.assets} priority={1} />
          )}
        </section>
      )}

      {/* Metrics — no generic heading, numbers speak */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="py-16 border-t border-line-strong bg-paper-soft">
          <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
            <div className="flex items-baseline justify-between mb-8 mono">
              <span className="text-ink-mute">— {t.caseStudy.impact}</span>
              <span className="text-ink-mute">
                {project.slug.toUpperCase()} / {String(project.metrics.length).padStart(2, "0")} {t.ui.filesSuffix}
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
