"use client";

import { useState, useRef, type FormEvent } from "react";
import { PaperPlane, CheckCircle } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const baseInput =
  "w-full rounded-[12px] border bg-[oklch(0.13_0.014_265_/_0.8)] px-5 py-3.5 text-sm text-[oklch(0.93_0.006_250)] placeholder-[oklch(0.47_0.010_250)] shadow-inner shadow-black/10 outline-none transition-all duration-200 focus:ring-2";

const inputNormal =
  `${baseInput} border-[var(--color-hairline)] focus:border-[oklch(0.70_0.17_255_/_0.50)] focus:ring-[oklch(0.70_0.17_255_/_0.18)]`;

const inputError =
  `${baseInput} border-[oklch(0.62_0.22_25_/_0.6)] focus:border-[oklch(0.62_0.22_25_/_0.8)] focus:ring-[oklch(0.62_0.22_25_/_0.18)] aria-[invalid=true]:border-[oklch(0.62_0.22_25_/_0.6)]`;

type FieldKey = "name" | "email" | "subject" | "message";

export function ContactForm() {
  const t = useTranslations("Contact");

  function validate(data: Record<FieldKey, string>): Partial<Record<FieldKey, string>> {
    const errors: Partial<Record<FieldKey, string>> = {};
    if (!data.name.trim()) errors.name = t("validation.required");
    if (!data.email.trim()) {
      errors.email = t("validation.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = t("validation.email");
    }
    if (!data.subject.trim()) errors.subject = t("validation.required");
    if (!data.message.trim()) errors.message = t("validation.required");
    return errors;
  }

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function getFieldData(): Record<FieldKey, string> {
    const fd = new FormData(formRef.current!);
    return {
      name:    String(fd.get("name") ?? ""),
      email:   String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
  }

  function handleBlur(field: FieldKey) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const data = getFieldData();
    const errs = validate(data);
    setFieldErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = getFieldData();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.error || t("errorGeneric"));
      }

      setStatus("sent");
      formRef.current?.reset();
      setTouched({});
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("errorGeneric"));
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <CheckCircle
          weight="duotone"
          className="h-12 w-12 text-[oklch(0.70_0.17_255)]"
        />
        <p className="text-lg font-semibold text-[oklch(0.93_0.006_250)]">{t("successTitle")}</p>
        <p className="text-sm text-[oklch(0.81_0.010_250)]">{t("successMessage")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 cursor-pointer text-sm font-medium text-[oklch(0.70_0.17_255)] transition-colors duration-200 hover:text-[oklch(0.78_0.17_250)]"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  function fieldClass(key: FieldKey) {
    return touched[key] && fieldErrors[key] ? inputError : inputNormal;
  }

  const labelClass = "mb-1.5 block text-xs font-medium text-[oklch(0.62_0.010_250)]";
  const errClass   = "mt-1 text-xs text-[oklch(0.62_0.22_25)]";

  return (
    <form
      ref={formRef}
      className="space-y-5 text-left"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "sending"}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {t("nameLabel")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={fieldClass("name")}
            aria-invalid={touched.name && !!fieldErrors.name ? "true" : undefined}
            aria-describedby={touched.name && fieldErrors.name ? "err-name" : undefined}
            onBlur={() => handleBlur("name")}
          />
          {touched.name && fieldErrors.name && (
            <p id="err-name" className={errClass} role="alert">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {t("emailLabel")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className={fieldClass("email")}
            aria-invalid={touched.email && !!fieldErrors.email ? "true" : undefined}
            aria-describedby={touched.email && fieldErrors.email ? "err-email" : undefined}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && fieldErrors.email && (
            <p id="err-email" className={errClass} role="alert">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          {t("subjectLabel")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={t("subjectPlaceholder")}
          className={fieldClass("subject")}
          aria-invalid={touched.subject && !!fieldErrors.subject ? "true" : undefined}
          aria-describedby={touched.subject && fieldErrors.subject ? "err-subject" : undefined}
          onBlur={() => handleBlur("subject")}
        />
        {touched.subject && fieldErrors.subject && (
          <p id="err-subject" className={errClass} role="alert">{fieldErrors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${fieldClass("message")} resize-none`}
          aria-invalid={touched.message && !!fieldErrors.message ? "true" : undefined}
          aria-describedby={touched.message && fieldErrors.message ? "err-message" : undefined}
          onBlur={() => handleBlur("message")}
        />
        {touched.message && fieldErrors.message && (
          <p id="err-message" className={errClass} role="alert">{fieldErrors.message}</p>
        )}
      </div>

      {/* Global error (API failure) */}
      {status === "error" && (
        <p role="alert" aria-live="assertive" className="text-sm text-[oklch(0.62_0.22_25)]">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        data-thread-ignite
        className="btn-press cta-ember group flex w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-[oklch(0.70_0.17_255)] py-4 text-sm font-semibold text-[oklch(0.12_0.012_265)] transition-all duration-200 hover:bg-[oklch(0.75_0.16_252)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("send")}
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.12_0.012_265_/_0.15)] transition-transform duration-200 group-hover:translate-x-0.5">
          <PaperPlane weight="bold" className="h-3.5 w-3.5" />
        </span>
      </button>
    </form>
  );
}
