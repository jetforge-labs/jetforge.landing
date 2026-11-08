"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { OPEN_EVENT, loadGtag, readConsent, track, withdrawGtag, writeConsent } from "@/lib/analytics";

interface ConsentBannerProps {
  title: string;
  body: string;
  accept: string;
  reject: string;
  privacy: string;
}

/**
 * Cookie banner plus the one delegated click listener behind the analytics events: any element with
 * data-track-event / data-track-product / data-track-location (and, on outbound links, data-track-destination) reports through `track`.
 */
export function ConsentBanner({ title, body, accept, reject, privacy }: ConsentBannerProps) {
  const [open, setOpen] = useState(false);
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = readConsent();
    if (stored === "granted") loadGtag();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (stored === null) setOpen(true);

    const onOpen = () => {
      setOpen(true);
      requestAnimationFrame(() => firstButton.current?.focus());
    };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track-event]");
      if (!el) return;
      track(el.dataset.trackEvent!, {
        product: el.dataset.trackProduct,
        location: el.dataset.trackLocation,
        destination: el.dataset.trackDestination,
      });
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      document.removeEventListener("click", onClick);
    };
  }, []);

  if (!open) return null;

  const choose = (value: "granted" | "denied") => {
    const wasGranted = readConsent() === "granted";
    writeConsent(value);
    if (value === "granted") loadGtag();
    setOpen(false);
    if (value === "denied" && wasGranted) {
      // Withdrawal: gtag is already running in this page, so stop it, clear cookies, then reload clean.
      withdrawGtag();
      location.reload();
    }
  };

  return (
    <div className="consent" role="dialog" aria-labelledby="consent-title" aria-live="polite">
      <p id="consent-title" className="consent-title">{title}</p>
      <p className="consent-body">
        {body} <Link href="/privacy">{privacy}</Link>
      </p>
      <div className="consent-actions">
        <button ref={firstButton} type="button" className="consent-btn" onClick={() => choose("denied")}>{reject}</button>
        <button type="button" className="consent-btn" onClick={() => choose("granted")}>{accept}</button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" className="consent-link" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {label}
    </button>
  );
}
