"use client";

import Link from "next/link";
import { LOCALES, type Locale } from "@/lib/i18n/types";

interface Props {
  locale: Locale;
  labels: { downloadPdf: string; print: string };
}

export default function CvActions({ locale, labels }: Props) {
  return (
    <div className="cv-actions">
      <div className="cv-actions-locales">
        {LOCALES.map((l) => (
          <Link
            key={l.code}
            href={`/${l.code}/cv`}
            className={"cv-locale-pill" + (l.code === locale ? " cv-locale-pill-active" : "")}
          >
            {l.nativeLabel}
          </Link>
        ))}
      </div>
      <button onClick={() => window.print()} className="cv-download-btn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1v9.5M3 6.5L7 10.5l4-4M1.5 13h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {labels.downloadPdf}
      </button>
    </div>
  );
}
