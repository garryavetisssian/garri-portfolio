"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const localeCodes = LOCALES.map((l) => l.code);

function swapLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (parts[1] && localeCodes.includes(parts[1] as Locale)) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

export default function LanguageSwitcher({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const { locale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchTo = (next: Locale) => {
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(swapLocale(pathname, next));
    setOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className="flex gap-2 py-3 mono">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            onClick={() => switchTo(l.code)}
            className={cn(
              "px-3 py-2 border transition-colors",
              l.code === locale
                ? "border-acid text-acid"
                : "border-line-strong text-ink-mute hover:text-ink"
            )}
          >
            {l.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="mono flex items-center gap-1.5 text-ink-mute hover:text-acid transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-ink">{locale.toUpperCase()}</span>
        <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[140px] border border-line-strong bg-paper-soft z-50"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => switchTo(l.code)}
                className={cn(
                  "mono flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors",
                  l.code === locale
                    ? "text-acid"
                    : "text-ink-mute hover:bg-paper-elev hover:text-ink"
                )}
              >
                <span>{l.code.toUpperCase()}</span>
                <span className="font-sans text-[11px] normal-case tracking-normal">
                  {l.nativeLabel}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
