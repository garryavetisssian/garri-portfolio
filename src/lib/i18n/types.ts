export type Locale = "en" | "ru" | "hy";

export const LOCALES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ru", label: "Russian", nativeLabel: "Русский" },
  { code: "hy", label: "Armenian", nativeLabel: "Հայերեն" },
];

export const DEFAULT_LOCALE: Locale = "en";
