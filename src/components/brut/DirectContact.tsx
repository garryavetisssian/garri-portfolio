"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SITE } from "@/lib/constants";

export default function DirectContact() {
  const { t } = useLanguage();

  return (
    <section className="py-16 border-t border-line-strong">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-3">
          <p className="mono text-ink-mute mb-3">— {t.contact.directHeading}</p>
          <p className="prose-brut text-ink-mute text-[14px] max-w-[24ch]">
            {t.contact.description}
          </p>
        </div>

        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line-strong hairline-t hairline-b">
          <a
            href={`mailto:${SITE.email}`}
            className="group bg-paper p-6 hover:bg-acid transition-colors block min-w-0"
          >
            <p className="mono text-ink-mute group-hover:text-paper mb-3">— {t.contact.emailLabel}</p>
            <p
              className="text-ink group-hover:text-paper break-all leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {SITE.email}
            </p>
            <p className="mono text-ink-mute group-hover:text-paper mt-3">
              {t.contact.sendEmail} ↗
            </p>
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group bg-paper p-6 hover:bg-acid transition-colors block min-w-0"
          >
            <p className="mono text-ink-mute group-hover:text-paper mb-3">— {t.contact.linkedinLabel}</p>
            <p
              className="text-ink group-hover:text-paper break-all leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                letterSpacing: "-0.01em",
              }}
            >
              /in/garri-avetisyan
            </p>
            <p className="mono text-ink-mute group-hover:text-paper mt-3">
              {t.contact.connect} ↗
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
