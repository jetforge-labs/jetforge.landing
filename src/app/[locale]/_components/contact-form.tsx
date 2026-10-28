"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CONTACT_REASONS, isContactReason, type ContactReason } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const t = useTranslations("Contact");
  const formRef = useRef<HTMLFormElement>(null);
  const [reason, setReason] = useState<ContactReason | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [hint, setHint] = useState("");

  // Links elsewhere on the page that name a reason (Suggest an app, Build something with us) preselect its chip.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[data-reason]");
      const value = link?.dataset.reason;
      if (isContactReason(value)) setReason(value);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const placeholder = reason ? t(`placeholders.${reason}`) : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const bad = Array.from(form.elements).find(
      (el): el is HTMLInputElement | HTMLTextAreaElement =>
        (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) &&
        el.required &&
        !el.checkValidity(),
    );
    if (bad) {
      setStatus("idle");
      setHint(
        bad.type === "email" && bad.value
          ? t("validation.email")
          : t("validation.required", { field: (bad.labels?.[0]?.textContent ?? "").toLowerCase() }),
      );
      bad.focus();
      return;
    }

    const data = new FormData(form);
    setStatus("sending");
    setHint("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          reason,
          message: String(data.get("message") ?? ""),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || t("errorGeneric"));
      }
      form.reset();
      setReason(null);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setHint(err instanceof Error ? err.message : t("errorGeneric"));
    }
  }

  if (status === "sent") {
    return (
      <div className="sent" role="status" aria-live="polite">
        <h3>{t("successTitle")}</h3>
        <p>{t("successMessage")}</p>
        <button type="button" className="link-btn" onClick={() => setStatus("idle")}>
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} id="contact-form" onSubmit={handleSubmit} noValidate aria-busy={status === "sending"}>
      <div className="two">
        <div className="f">
          <label htmlFor="name">{t("nameLabel")}</label>
          <input id="name" name="name" autoComplete="name" maxLength={120} required />
        </div>
        <div className="f">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} maxLength={254} required />
        </div>
      </div>
      <fieldset>
        <legend>{t("reasonLegend")}</legend>
        <div className="chips">
          {CONTACT_REASONS.map((value) => (
            <label className="chip" key={value}>
              <input
                className="vh"
                type="radio"
                name="reason"
                value={value}
                checked={reason === value}
                onChange={() => setReason(value)}
              />
              <span>{t(`reasons.${value}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="f">
        <label htmlFor="msg">{t("messageLabel")}</label>
        <textarea id="msg" name="message" placeholder={placeholder} maxLength={5000} required />
      </div>
      <div className="form-foot">
        <button className="btn btn-ink" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("send")}
        </button>
        <p className={status === "error" ? "hint err" : "hint"} id="form-status" role="status" aria-live="polite">
          {hint}
        </p>
      </div>
    </form>
  );
}
