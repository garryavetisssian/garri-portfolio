"use server";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  errorKey?: "formError" | "formErrorSend" | "formNotConfigured";
  /** Raw upstream detail — surfaced to UI for easier debugging. */
  detail?: string;
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/**
 * Server Action — sends a contact-form submission via Web3Forms.
 *
 * Setup (one-time, ~30 seconds, free):
 *   1. Visit https://web3forms.com
 *   2. Enter `garryavetissian@gmail.com`, get an access key emailed to you
 *   3. Add `WEB3FORMS_ACCESS_KEY` to Vercel → Settings → Environment Variables
 *      (Production + Preview + Development scopes)
 *   4. **Trigger a redeploy** (the env var is read at build time on Vercel)
 *
 * Returns `detail` with the actual upstream error so the form UI can show
 * "Web3Forms: Invalid Access Key" or similar without you digging into logs.
 */
export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !message || !isValidEmail(email)) {
    return { ok: false, errorKey: "formError" };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return { ok: false, errorKey: "formNotConfigured" };
  }

  const composedSubject = subject || `Portfolio inquiry from ${name}`;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: composedSubject,
        message,
        from_name: "garri.design contact form",
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data?.success === true) {
      return { ok: true };
    }

    const detail =
      typeof data?.message === "string"
        ? data.message
        : `HTTP ${res.status}`;
    console.error("[contact] Web3Forms failure:", detail, data);
    return { ok: false, errorKey: "formErrorSend", detail };
  } catch (err) {
    const detail = err instanceof Error ? err.message : "network error";
    console.error("[contact] fetch threw:", detail);
    return { ok: false, errorKey: "formErrorSend", detail };
  }
}
