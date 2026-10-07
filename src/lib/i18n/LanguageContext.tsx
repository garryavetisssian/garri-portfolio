"use client";

import { createContext, useContext, useMemo } from "react";
import { DEFAULT_LOCALE, type Locale } from "./types";
import { DICTIONARIES, type Dictionary } from "./dictionaries";

interface LanguageContextValue {
  locale: Locale;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<LanguageContextValue>(
    () => ({ locale, t: DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE] }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

/**
 * Translate a raw case-study tab/version name into the active locale.
 */
export function translateTabName(raw: string, t: Dictionary): string {
  const lower = raw.trim().toLowerCase();
  if (lower.includes("release")) return t.caseTabs.releaseVersion;
  if (lower.includes("first")) return t.caseTabs.firstVersion;
  return raw;
}
