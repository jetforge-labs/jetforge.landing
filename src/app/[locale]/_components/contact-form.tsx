"use client";

import { useState, type FormEvent } from "react";
import { PaperAirplaneIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-navy-950/80 px-5 py-3.5 text-sm text-white placeholder-slate-500 shadow-inner shadow-black/10 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-navy-900";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("errorGeneric"));
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("errorGeneric"));
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircleIcon className="h-12 w-12 text-green-400" />
        <p className="text-lg font-semibold text-white">{t("successTitle")}</p>
        <p className="text-sm text-slate-400">{t("successMessage")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 cursor-pointer text-sm font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5 text-left" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
            {t("nameLabel")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder={t("namePlaceholder")}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
            {t("emailLabel")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
          {t("subjectLabel")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          placeholder={t("subjectPlaceholder")}
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder={t("messagePlaceholder")}
          className={`${inputClasses} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-blue-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("send")}
        <PaperAirplaneIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
