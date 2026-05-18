"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SITE } from "@/lib/constants";

type Status = "idle" | "sending" | "sent" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormData = { name: "", email: "", subject: "", message: "" };

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function buildMailto(d: FormData) {
  const subject = d.subject.trim() || `Portfolio inquiry from ${d.name}`;
  const lines = [
    `Hi Garri,`,
    ``,
    d.message.trim(),
    ``,
    `— ${d.name.trim()}`,
    d.email.trim(),
  ];
  const body = lines.join("\n");
  const params = new URLSearchParams({ subject, body });
  return { href: `mailto:${SITE.email}?${params}`, body, subject };
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const update = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim() || !data.message.trim() || !isValidEmail(data.email)) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const { href, body, subject } = buildMailto(data);

    // Copy formatted message to clipboard as a backup
    try {
      const fullText = `To: ${SITE.email}\nFrom: ${data.name} <${data.email}>\nSubject: ${subject}\n\n${body}`;
      await navigator.clipboard.writeText(fullText);
    } catch {
      // clipboard may be blocked; not fatal
    }

    // Open mail client
    window.location.href = href;

    // Show success state briefly
    setTimeout(() => setStatus("sent"), 400);
  };

  const handleCopy = async () => {
    if (!data.name.trim() || !data.message.trim() || !isValidEmail(data.email)) {
      setStatus("error");
      return;
    }
    const { body, subject } = buildMailto(data);
    const fullText = `To: ${SITE.email}\nFrom: ${data.name} <${data.email}>\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-px bg-line-strong hairline-t hairline-b" noValidate>
      {/* Row 1: Name + Email */}
      <div className="grid sm:grid-cols-2 gap-px bg-line-strong">
        <Field label={t.contact.formName} required>
          <input
            type="text"
            value={data.name}
            onChange={update("name")}
            placeholder={t.contact.formNamePlaceholder}
            className="form-input"
            autoComplete="name"
          />
        </Field>
        <Field label={t.contact.formEmail} required>
          <input
            type="email"
            value={data.email}
            onChange={update("email")}
            placeholder={t.contact.formEmailPlaceholder}
            className="form-input"
            autoComplete="email"
          />
        </Field>
      </div>

      {/* Row 2: Subject */}
      <Field label={t.contact.formSubject}>
        <input
          type="text"
          value={data.subject}
          onChange={update("subject")}
          placeholder={t.contact.formSubjectPlaceholder}
          className="form-input"
        />
      </Field>

      {/* Row 3: Message */}
      <Field label={t.contact.formMessage} required>
        <textarea
          value={data.message}
          onChange={update("message")}
          placeholder={t.contact.formMessagePlaceholder}
          rows={7}
          className="form-input resize-y min-h-[150px]"
        />
      </Field>

      {/* Status row + actions */}
      <div className="bg-paper p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="mono text-ink-mute text-[11px] max-w-[44ch] leading-[1.5]">
          {status === "sent"
            ? <span className="text-acid">✓ {t.contact.formSubmitDone}</span>
            : status === "error"
            ? <span className="text-warn">⚠ {t.contact.formError}</span>
            : status === "sending"
            ? <span>… {t.contact.formSubmitOpening}</span>
            : t.contact.formNote}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="mono px-4 py-3 border border-line-strong text-ink hover:border-acid hover:text-acid transition-colors"
          >
            {copied ? `✓ ${t.contact.formCopied}` : `${t.contact.formCopy} ⎘`}
          </button>
          <button
            type="submit"
            disabled={status === "sending"}
            className="mono inline-flex items-center gap-3 px-5 py-3 border border-acid text-acid hover:bg-acid hover:text-paper transition-colors disabled:opacity-60"
          >
            <span>{t.contact.formSubmit}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="bg-paper p-5 flex flex-col gap-2 min-w-0">
      <span className="mono text-ink-mute flex items-center gap-1.5">
        — {label}
        {required && <span className="text-acid">*</span>}
      </span>
      {children}
    </label>
  );
}
