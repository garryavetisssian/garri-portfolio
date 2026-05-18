import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "ru", "hy"] as const;
const DEFAULT_LOCALE = "en";

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get("locale")?.value;
  if (cookie && LOCALES.includes(cookie as (typeof LOCALES)[number])) return cookie;

  const header = req.headers.get("accept-language") ?? "";
  const preferred = header.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (preferred && LOCALES.includes(preferred as (typeof LOCALES)[number])) return preferred;

  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip api, _next, public assets, favicons
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // file requests like /portrait.jpg
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
