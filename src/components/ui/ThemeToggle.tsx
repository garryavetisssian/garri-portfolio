"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n/types";

const labels = {
  en: { light: "Switch to light theme", dark: "Switch to dark theme" },
  ru: { light: "Включить светлую тему", dark: "Включить тёмную тему" },
  hy: { light: "Միացնել բաց թեման", dark: "Միացնել մուգ թեման" },
};
function subscribe(callback: () => void) {
  // React may recover a legacy case's whole document during hydration.
  // Reapply appearance if that recovery removes the pre-paint root attribute.
  function restore() {
    if (document.documentElement.dataset.theme) return;
    let saved: string | null = null;
    try { saved = localStorage.getItem("portfolio-theme"); } catch { /* Storage is optional. */ }
    document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  restore();
  const observer = new MutationObserver(() => { restore(); callback(); });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
export default function ThemeToggle({ locale }: { locale: Locale }) {
  const light = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "light", () => false);
  const label = labels[locale][light ? "dark" : "light"];
  return <button type="button" className="theme-toggle" aria-label={label} title={label} onClick={() => {
    const theme = light ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Storage is optional. */ }
  }}>
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {light ? <path d="M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5a8.5 8.5 0 1 0 9.6 9.6Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
    </svg>
  </button>;
}
