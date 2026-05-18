"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/types";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Yerevan",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const nav = [
    { href: `/${locale}`, label: t.nav.about === "About" ? "Index" : t.nav.about },
    { href: `/${locale}/work`, label: t.nav.projects },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/cv`, label: "CV" },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];
  // First "Index" entry is redundant with logo; trim it out for clean nav
  const navItems = nav.slice(1);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled ? "bg-paper/85 backdrop-blur-md hairline-b" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[var(--nav-h)] max-w-[var(--max)] items-center justify-between px-[var(--gutter)]">
          {/* Brand mark */}
          <Link href={`/${locale}`} className="group flex items-center gap-2.5">
            <span className="block h-2.5 w-2.5 bg-acid group-hover:rotate-45 transition-transform duration-500" aria-hidden />
            <span className="mono text-ink">
              GARRI <span className="text-ink-faint">/</span> AVETISYAN
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mono link-uline transition-colors",
                  isActive(item.href) ? "text-acid" : "text-ink-mute hover:text-ink"
                )}
              >
                <span className="text-ink-faint mr-1.5">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
            <span className="h-4 w-px bg-line-strong" aria-hidden />
            <LanguageSwitcher />
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden mono text-ink"
            aria-label="Menu"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>

        {/* Sub-bar — live status */}
        <div className={cn(
          "mx-auto max-w-[var(--max)] px-[var(--gutter)] hidden lg:flex items-center justify-between py-1.5 mono text-ink-faint border-t",
          scrolled ? "border-line" : "border-transparent"
        )}>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-acid pulse-dot" />
              {t.hero.available}
            </span>
            <span>{t.hero.locationCity}</span>
          </div>
          <div className="flex items-center gap-5">
            <span>{time && `${time} YVN`}</span>
            <span>v2026.01 / brutalist edition</span>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-paper transition-opacity duration-300 md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex h-full flex-col px-[var(--gutter)] pt-[calc(var(--nav-h)+2rem)]">
          <p className="mono text-ink-faint mb-6">— Navigate</p>
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li key={item.href} className="hairline-t">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline justify-between py-5 headline-sm transition-colors",
                    isActive(item.href) ? "text-acid" : "text-ink hover:text-acid"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="mono text-ink-faint">
                    {String(i + 1).padStart(2, "0")} ↗
                  </span>
                </Link>
              </li>
            ))}
            <li className="hairline-t pt-4">
              <LanguageSwitcher variant="mobile" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
