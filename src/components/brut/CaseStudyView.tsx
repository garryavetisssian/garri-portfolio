"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/lib/types";
import type { CaseAssets, CaseTab, CaseAsset } from "@/lib/case-assets";
import { useLanguage, translateTabName } from "@/lib/i18n/LanguageContext";
import Brief from "./Brief";
import LaptopReveal from "./LaptopReveal";

function VideoBlock({ src }: { src: string }) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);

  // Play / pause as the video enters / leaves the viewport
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        setInView(visible);
        if (visible) {
          // play() can reject with NotAllowedError if browser blocks it
          el.play().catch(() => {
            /* swallow; user can interact to retry */
          });
        } else {
          el.pause();
        }
      },
      { threshold: [0, 0.4, 0.8] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Push the muted state to the element imperatively so toggling
  // doesn't restart playback
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        className="block w-full h-auto"
      />

      {/* Mute / unmute toggle */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? t.caseStudy.soundOffAria : t.caseStudy.soundOnAria}
        className="absolute bottom-4 right-4 mono flex items-center gap-2 px-3 py-2 bg-paper/85 backdrop-blur-sm text-ink border border-line-strong hover:border-acid hover:text-acid transition-colors"
      >
        {muted ? (
          <SpeakerOffIcon />
        ) : (
          <SpeakerOnIcon />
        )}
        <span>{muted ? t.caseStudy.soundOff : t.caseStudy.soundOn}</span>
      </button>

      {/* Subtle playing indicator (only when paused outside viewport) */}
      {!inView && (
        <span className="absolute top-4 left-4 mono text-ink-mute bg-paper/70 backdrop-blur-sm px-2 py-1">
          ▍▍ PAUSED
        </span>
      )}
    </div>
  );
}

function SpeakerOnIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 5 H5 L8 2.5 V11.5 L5 9 H3.5 V5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M10 4.5 Q11.5 7 10 9.5 M11.5 3 Q13.5 7 11.5 11"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 5 H5 L8 2.5 V11.5 L5 9 H3.5 V5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 4.5 L13 11.5 M13 4.5 L10.5 11.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
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
  active,
  onActiveChange,
}: {
  tabs: CaseTab[];
  active: number;
  onActiveChange: (i: number) => void;
}) {
  const { t } = useLanguage();
  const current = tabs[active];

  return (
    <div>
      {/* Tab bar — sticky under the nav */}
      <div className="sticky top-[var(--nav-h)] z-20 border-y border-line-strong bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.name}
              onClick={() => onActiveChange(i)}
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
  const hasTabs = caseAssets.tabs.length > 0;

  // Active tab is lifted here so both the gallery and the laptop screen
  // react to it. Defaults to the "Release Version" tab when tabs exist.
  const [activeTab, setActiveTab] = useState(caseAssets.defaultTab);

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
                className="text-ink h-break"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2.25rem, 9vw, 8.5rem)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.92,
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
      <Brief brief={project.brief} slug={project.slug} />

      {/* Laptop reveal — scroll-driven cover image moment. */}
      {coverSrc && <LaptopReveal src={coverSrc} />}

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
            <TabbedGallery
              tabs={caseAssets.tabs}
              active={activeTab}
              onActiveChange={setActiveTab}
            />
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
                className="next-title md:col-span-8 h-break"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
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
