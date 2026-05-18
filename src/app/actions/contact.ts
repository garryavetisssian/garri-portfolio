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
 *   4. Redeploy. Submissions land in your inbox.
 *
 * Without the env var, the action returns `formNotConfigured` so the UI
 * can prompt the visitor to email directly.
 */
export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !message || !isValidEmail(email)) {
    return { ok: false, errorKey: "formError" };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
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
        botcheck: "", // honeypot
      }),
    });

    if (!res.ok) {
      return { ok: false, errorKey: "formErrorSend" };
    }
    const data = await res.json();
    if (data && data.success === true) {
      return { ok: true };
    }
    return { ok: false, errorKey: "formErrorSend" };
  } catch {
    return { ok: false, errorKey: "formErrorSend" };
  }
}
