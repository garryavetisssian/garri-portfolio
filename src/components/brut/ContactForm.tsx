"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Status = "idle" | "sending" | "sent" | "error";
type ErrorKey = "formError" | "formErrorSend" | "formNotConfigured";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormData = { name: "", email: "", subject: "", message: "" };

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState<ErrorKey | undefined>();
  const [errorDetail, setErrorDetail] = useState<string | undefined>();
  const [copied, setCopied] = useState(false);

  // Public-safe key — Web3Forms keys only forward to the email address
  // they're bound to, so exposing them client-side is by design.
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const update =
    (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((d) => ({ ...d, [k]: e.target.value }));
      if (status === "error") {
        setStatus("idle");
        setErrorKey(undefined);
        setErrorDetail(undefined);
      }
    };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.name.trim() || !data.message.trim() || !isValidEmail(data.email)) {
      setStatus("error");
      setErrorKey("formError");
      setErrorDetail(undefined);
      return;
    }
    if (!accessKey) {
      setStatus("error");
      setErrorKey("formNotConfigured");
      setErrorDetail("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY missing");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name.trim(),
          email: data.email.trim(),
          subject:
            data.subject.trim() || `Portfolio inquiry from ${data.name.trim()}`,
          message: data.message.trim(),
          from_name: "garri.design contact form",
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (res.ok && body?.success === true) {
        setStatus("sent");
        setData(initial);
        setErrorDetail(undefined);
        return;
      }

      const detail =
        typeof body?.message === "string"
          ? body.message
          : `HTTP ${res.status}`;
      console.error("[contact] Web3Forms returned:", detail, body);
      setStatus("error");
      setErrorKey("formErrorSend");
      setErrorDetail(detail);
    } catch (err) {
      const detail = err instanceof Error ? err.message : "network error";
      console.error("[contact] fetch threw:", detail);
      setStatus("error");
      setErrorKey("formErrorSend");
      setErrorDetail(detail);
    }
  }

  async function handleCopy() {
    const fullText = `From: ${data.name} <${data.email}>\nSubject: ${data.subject || `Portfolio inquiry from ${data.name}`}\n\n${data.message}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — silent */
    }
  }

  const statusLine = (() => {
    if (status === "sent") return { tone: "ok" as const, text: t.contact.formSubmitDone };
    if (status === "sending")
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

  const isPending = status === "sending";

  return (
    <form
      onSubmit={submit}
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
            disabled={isPending}
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
            disabled={isPending}
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
          disabled={isPending}
        />
      </Field>

      <Field label={t.contact.formMessage} required>
        <textarea
          value={data.message}
          onChange={update("message")}
          placeholder={t.contact.formMessagePlaceholder}
          rows={7}
          className="form-input resize-y min-h-[150px]"
          disabled={isPending}
        />
      </Field>

      <div className="bg-paper p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="mono text-[11px] max-w-[52ch] leading-[1.5] min-h-[1.5em] flex flex-col gap-1">
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
          {errorDetail && status === "error" && (
            <span className="text-ink-faint text-[10px] truncate">↳ {errorDetail}</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={isPending}
            className="mono px-4 py-3 border border-line-strong text-ink hover:border-acid hover:text-acid transition-colors disabled:opacity-60"
          >
            {copied ? `✓ ${t.contact.formCopied}` : `${t.contact.formCopy} ⎘`}
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="mono inline-flex items-center gap-3 px-5 py-3 border border-acid text-acid hover:bg-acid hover:text-paper transition-colors disabled:opacity-60"
          >
            <span>{isPending ? t.contact.formSubmitSending : t.contact.formSubmit}</span>
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
