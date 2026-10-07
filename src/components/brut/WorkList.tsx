"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CaseStudy } from "@/lib/types";
import type { Locale } from "@/lib/i18n/types";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import styles from "./WorkList.module.css";

export type Collection = "products" | "entertainment";
const collections: Collection[] = ["products", "entertainment"];
const showcase: Record<string, { collections: Collection[]; cover: string; entertainmentCover?: string }> = {
  "xy-ecosystem": { collections, cover: "/cases/xy-ecosystem/2%20XY%20Protocols/Cover.webp", entertainmentCover: "/cases/xy-ecosystem/1%20XYGO%20-%20WEB3%20Lottery/Cover.webp" },
  balvoi: { collections: ["products"], cover: "/cases/balvoi/Cover.webp" },
  nexwave: { collections: ["products"], cover: "/cases/nexwave/Cover.webp" },
  "dispatch-center": { collections: ["products"], cover: "/cases/dispatch-center/Cover.webp" },
  aihive: { collections: ["products"], cover: "/cases/aihive/Cover.webp" },
  ineed: { collections: ["products"], cover: "/cases/ineed/Release%20Version/Cover.webp" },
  "roos-ruckus": { collections: ["entertainment"], cover: "/case-assets/roos-ruckus/promo.png" },
  spearthrone: { collections: ["entertainment"], cover: "/cases/Spearthrone/Cover.png" },
  "duck-master": { collections: ["entertainment"], cover: "/cases/duck-master/Cover.webp" },
  "razer-ui": { collections: ["products"], cover: "/cases/razer-ui/Cover.webp" },
};
const labels = {
  en: { tabs: ["B2B & Enterprise Products", "iGaming & Entertainment"], hint: "Choose a collection", view: "Explore case", all: "Explore all work", count: "projects" },
  ru: { tabs: ["B2B и корпоративные продукты", "iGaming и развлечения"], hint: "Выберите коллекцию", view: "Смотреть кейс", all: "Все проекты", count: "проектов" },
  hy: { tabs: ["B2B և կորպորատիվ պրոդուկտներ", "iGaming և ժամանց"], hint: "Ընտրեք հավաքածուն", view: "Դիտել նախագիծը", all: "Բոլոր նախագծերը", count: "նախագիծ" },
};

interface WorkListProps {
  locale: Locale;
  items: CaseStudy[];
  showHeading?: boolean;
  heading?: string;
  eyebrow?: string;
  showViewAll?: boolean;
  totalCount?: number;
  previewLimit?: number;
  collection?: Collection;
  archive?: boolean;
}

export default function WorkList({ locale, items, showHeading = true, heading, eyebrow, showViewAll = false, previewLimit, collection = "products", archive = false }: WorkListProps) {
  const t = DICTIONARIES[locale];
  const copy = labels[locale];
  const router = useRouter();
  const [selected, setSelected] = useState<Collection>(collection);
  const active = archive ? collection : selected;
  function selectCollection(next: Collection) {
    if (archive) router.push(`/${locale}/work/${next}`, { scroll: false });
    else setSelected(next);
  }
  useEffect(() => {
    // Upgrade links shared before collections had dedicated routes.
    if (!archive) return;
    const legacy = window.location.hash.slice(1);
    if (legacy === "products" || legacy === "entertainment") router.replace(`/${locale}/work/${legacy}`, { scroll: false });
  }, [archive, locale, router]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const filtered = items.filter((p) => (showcase[p.slug]?.collections ?? ["products"]).includes(active));
  const visible = previewLimit ? filtered.slice(0, previewLimit) : filtered;

  return <section id="work" className={styles.section}>
    <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
      {showHeading && <div className={styles.heading}>
        <p className="mono text-ink-mute">{eyebrow ?? `— ${t.ui.caseStudiesStrip}`}</p>
        <h2 className="headline-md text-ink">{heading ?? t.projects.heading.toUpperCase()}<span className="text-acid">.</span></h2>
      </div>}
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label={copy.hint}>
          {collections.map((collection, index) => <button
            key={collection} ref={(element) => { tabs.current[index] = element; }}
            id={`${id}-${collection}-tab`} role="tab" type="button"
            aria-selected={active === collection} aria-controls={`${id}-panel`}
            tabIndex={active === collection ? 0 : -1}
            onClick={() => selectCollection(collection)}
            onKeyDown={(event) => {
              let next: number | undefined;
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = 1 - index;
              if (event.key === "Home") next = 0;
              if (event.key === "End") next = 1;
              if (next !== undefined) { event.preventDefault(); selectCollection(collections[next]); tabs.current[next]?.focus(); }
            }} className={styles.tab}
          >{copy.tabs[index]}<span className={styles.tabCount}>{items.filter((p) => (showcase[p.slug]?.collections ?? ["products"]).includes(collection)).length}</span></button>)}
        </div>
        <span className={`mono text-ink-mute ${styles.collectionCount}`} aria-live="polite">{filtered.length} {copy.count}</span>
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${active}-tab`} tabIndex={0}>
        <ul className={styles.grid} role="list">
          {visible.map((p, index) => {
            const asset = showcase[p.slug];
            const cover = active === "entertainment" ? asset?.entertainmentCover ?? asset?.cover : asset?.cover;
            return <li key={p.slug}><Link href={`/${locale}/work/${p.slug}`} onClick={() => { try { sessionStorage.setItem(`work-collection-${locale}-${p.slug}`, active); } catch { /* Navigation works without storage. */ } }} className={styles.card}>
              <div className={styles.cover}>
                {cover && <Image src={cover} alt={`${p.title} — project preview`} fill sizes="(max-width: 700px) 100vw, 50vw" className={styles.image} />}
                <span className={styles.explore}>{copy.view} <span aria-hidden="true">↗</span></span>
              </div>
              <div className={styles.meta}>
                <span className={`mono ${styles.number}`}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.info}><h3>{p.title}</h3><p>{p.subtitle}</p></div>
                <span className={`mono ${styles.year}`}>{p.year}</span>
              </div>
              <div className={`mono ${styles.tags}`}>{(Array.isArray(p.category) ? p.category : [p.category]).join(" / ")}</div>
            </Link></li>;
          })}
        </ul>
        {showViewAll && <Link href={`/${locale}/work/${active}`} className={styles.viewAll}>{copy.all} <span aria-hidden="true">↗</span></Link>}
      </div>
    </div>
  </section>;
}
