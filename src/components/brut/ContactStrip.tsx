"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SITE } from "@/lib/constants";

export default function ContactStrip() {
  const { t } = useLanguage();
  const [emailUser, emailDomain] = SITE.email.split("@");
  const linkedinHandle = SITE.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com/i, "").replace(/^\//, "");

  return (
    <section id="contact" className="relative py-24 border-t border-line-strong">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <p className="mono text-ink-mute mb-6">— {t.ui.contactEyebrow}</p>

        <h2 className="headline text-ink select-none">
          <span className="block">{t.contact.headingPart1.toUpperCase()}</span>
          <span className="block">
            <span className="text-acid">{t.contact.headingAccent.toUpperCase()}</span>
            <span className="text-acid">.</span>
          </span>
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <p className="md:col-span-6 prose-brut text-ink-mute max-w-[48ch]">
            {t.contact.description}
          </p>

          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line-strong hairline-t hairline-b">
            <a
              href={`mailto:${SITE.email}`}
              className="group bg-paper p-6 hover:bg-paper-elev transition-colors block min-w-0"
            >
              <p className="mono text-ink-mute mb-3">— {t.contact.emailLabel}</p>
              <div
                className="text-ink leading-[1.05] mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                  letterSpacing: "-0.015em",
                }}
              >
                <span className="block">{emailUser}</span>
                <span className="block text-ink-mute group-hover:text-acid transition-colors">
                  @{emailDomain}
                </span>
              </div>
              <p className="mono text-ink-mute group-hover:text-acid transition-colors">
                {t.contact.sendEmail} ↗
              </p>
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group bg-paper p-6 hover:bg-paper-elev transition-colors block min-w-0"
            >
              <p className="mono text-ink-mute mb-3">— {t.contact.linkedinLabel}</p>
              <div
                className="text-ink leading-[1.05] mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                  letterSpacing: "-0.015em",
                }}
              >
                <span className="block text-ink-mute group-hover:text-acid transition-colors">
                  linkedin.com
                </span>
                <span className="block">{linkedinHandle}</span>
              </div>
              <p className="mono text-ink-mute group-hover:text-acid transition-colors">
                {t.contact.connect} ↗
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
