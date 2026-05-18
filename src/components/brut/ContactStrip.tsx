"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SITE } from "@/lib/constants";

export default function ContactStrip() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-24 border-t border-line-strong">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <p className="mono text-ink-faint mb-6">— Contact / always open</p>

        <h2 className="headline text-ink select-none">
          <span className="block">
            {t.contact.headingPart1.toUpperCase()}{" "}
          </span>
          <span className="block">
            <span className="text-acid">{t.contact.headingAccent.toUpperCase()}</span>
            <span aria-hidden className="text-acid">.</span>
          </span>
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <p className="md:col-span-6 prose-brut text-ink-mute max-w-[48ch]">
            {t.contact.description}
          </p>

          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line-strong hairline-t hairline-b">
            <a
              href={`mailto:${SITE.email}`}
              className="group bg-paper p-6 hover:bg-acid hover:text-paper transition-colors block"
            >
              <p className="mono text-ink-faint group-hover:text-paper mb-3">— {t.contact.emailLabel}</p>
              <p
                className="text-ink group-hover:text-paper"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.015em",
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
              className="group bg-paper p-6 hover:bg-acid hover:text-paper transition-colors block"
            >
              <p className="mono text-ink-faint group-hover:text-paper mb-3">— {t.contact.linkedinLabel}</p>
              <p
                className="text-ink group-hover:text-paper"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.015em",
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
      </div>
    </section>
  );
}
