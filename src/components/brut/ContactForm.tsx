"use client";

import { useState, useTransition } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { sendContact, type ContactResult } from "@/app/actions/contact";

type Status = "idle" | "sending" | "sent" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormData = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const { t } = useLanguage();
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState<ContactResult["errorKey"]>();
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const update =
    (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((d) => ({ ...d, [k]: e.target.value }));
      if (status === "error") {
        setStatus("idle");
        setErrorKey(undefined);
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    startTransition(async () => {
      const result = await sendContact(data);
      if (result.ok) {
        setStatus("sent");
        setData(initial);
      } else {
        setErrorKey(result.errorKey);
        setStatus("error");
      }
    });
  };

  const handleCopy = async () => {
    const fullText = `From: ${data.name} <${data.email}>\nSubject: ${data.subject || `Portfolio inquiry from ${data.name}`}\n\n${data.message}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — silent */
    }
  };

  const statusLine = (() => {
    if (status === "sent") return { tone: "ok" as const, text: t.contact.formSubmitDone };
    if (status === "sending" || pending)
      return { tone: "info" as const, text: t.contact.formSubmitSending };
    if (status === "error") {
      const message =
        errorKey === "formError"
          ? t.contact.formError
          : errorKey === "formNotConfigured"
          ? t.contact.formNotConfigured
          : t.contact.formErrorSend;
      return { tone: "warn" as const, text: message };
    }
    return null;
  })();

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-px bg-line-strong hairline-t hairline-b"
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-px bg-line-strong">
        <Field label={t.contact.formName} required>
          <input
            type="text"
            value={data.name}
            onChange={update("name")}
            placeholder={t.contact.formNamePlaceholder}
            className="form-input"
            autoComplete="name"
            disabled={pending}
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
            disabled={pending}
          />
        </Field>
      </div>

      <Field label={t.contact.formSubject}>
        <input
          type="text"
          value={data.subject}
          onChange={update("subject")}
          placeholder={t.contact.formSubjectPlaceholder}
          className="form-input"
          disabled={pending}
        />
      </Field>

      <Field label={t.contact.formMessage} required>
        <textarea
          value={data.message}
          onChange={update("message")}
          placeholder={t.contact.formMessagePlaceholder}
          rows={7}
          className="form-input resize-y min-h-[150px]"
          disabled={pending}
        />
      </Field>

      <div className="bg-paper p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="mono text-[11px] max-w-[44ch] leading-[1.5] min-h-[1.5em]">
          {statusLine ? (
            <span
              className={
                statusLine.tone === "ok"
                  ? "text-acid"
                  : statusLine.tone === "warn"
                  ? "text-warn"
                  : "text-ink-mute"
              }
            >
              {statusLine.tone === "ok" ? "✓ " : statusLine.tone === "warn" ? "⚠ " : "… "}
              {statusLine.text}
            </span>
          ) : (
            <span className="text-ink-mute opacity-0">·</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={pending}
            className="mono px-4 py-3 border border-line-strong text-ink hover:border-acid hover:text-acid transition-colors disabled:opacity-60"
          >
            {copied ? `✓ ${t.contact.formCopied}` : `${t.contact.formCopy} ⎘`}
          </button>
          <button
            type="submit"
            disabled={pending}
            className="mono inline-flex items-center gap-3 px-5 py-3 border border-acid text-acid hover:bg-acid hover:text-paper transition-colors disabled:opacity-60"
          >
            <span>{pending ? t.contact.formSubmitSending : t.contact.formSubmit}</span>
            <span>↗</span>
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
