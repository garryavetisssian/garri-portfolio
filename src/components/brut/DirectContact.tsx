"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SITE } from "@/lib/constants";

export default function DirectContact() {
  const { t } = useLanguage();
  const [emailUser, emailDomain] = SITE.email.split("@");
  const linkedinHandle = SITE.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com/i, "");

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
            className="group bg-paper p-6 hover:bg-paper-elev transition-colors block min-w-0"
          >
            <p className="mono text-ink-mute mb-3">— {t.contact.emailLabel}</p>
            <div
              className="text-ink leading-[1.05] mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
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
                fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                letterSpacing: "-0.015em",
              }}
            >
              <span className="block text-ink-mute group-hover:text-acid transition-colors">
                linkedin.com
              </span>
              <span className="block">{linkedinHandle.replace(/^\//, "")}</span>
            </div>
            <p className="mono text-ink-mute group-hover:text-acid transition-colors">
              {t.contact.connect} ↗
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
