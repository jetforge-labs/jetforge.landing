// Shared by the contact form and /api/contact: one closed list of reasons.
export const CONTACT_REASONS = ["app", "suggest", "custom"] as const;
export type ContactReason = (typeof CONTACT_REASONS)[number];

export function isContactReason(value: unknown): value is ContactReason {
  return typeof value === "string" && (CONTACT_REASONS as readonly string[]).includes(value);
}

// Labels for the email we receive (internal, English).
export const REASON_LABELS: Record<ContactReason, string> = {
  app: "A question about an app",
  suggest: "Suggest an app",
  custom: "Custom software",
};

export interface ContactPayload {
  name: string;
  email: string;
  reason: ContactReason | null;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 254, message: 5000 };

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Validates the untrusted JSON body. `reason` is optional but, when present, must be in the closed list. */
export function parseContactPayload(
  body: unknown,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request." };
  }
  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === "string" ? oneLine(raw.name) : "";
  const email = typeof raw.email === "string" ? oneLine(raw.email) : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email and message are required." };
  }
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
    return { ok: false, error: "One of the fields is too long." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "That email looks incomplete." };
  }

  let reason: ContactReason | null = null;
  if (raw.reason !== undefined && raw.reason !== null && raw.reason !== "") {
    if (!isContactReason(raw.reason)) {
      return { ok: false, error: "Invalid reason." };
    }
    reason = raw.reason;
  }

  return { ok: true, data: { name, email, reason, message } };
}

export function buildContactEmail({ name, email, reason, message }: ContactPayload) {
  const reasonLabel = reason ? REASON_LABELS[reason] : "Not specified";
  return {
    subject: `${reason ? `[${REASON_LABELS[reason]}] ` : ""}Contact form from ${name} <${email}>`,
    text: `Reason: ${reasonLabel}\nName: ${name}\nEmail: ${email}\n\n${message}`,
  };
}
