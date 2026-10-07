"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n/types";

const subscribe = () => () => {};

export default function BackToWork({ locale, slug, children }: { locale: Locale; slug: string; children: React.ReactNode }) {
  const fallback = ["meridian-hr", "soloos"].includes(slug) ? "ai-engineering" : ["roos-ruckus", "spearthrone", "duck-master"].includes(slug) ? "entertainment" : "products";
  const collection = useSyncExternalStore(subscribe, () => {
    let collection: string | null = null;
    try { collection = sessionStorage.getItem(`work-collection-${locale}-${slug}`); } catch { /* Storage is optional. */ }
    return collection === "products" || collection === "entertainment" || collection === "ai-engineering" ? collection : fallback;
  }, () => fallback);
  return <Link href={`/${locale}/work/${collection}`} className="text-ink hover:text-acid link-uline">{children}</Link>;
}
