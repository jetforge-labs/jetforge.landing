"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";
const EVENT = "themechange";
const QUERY = "(prefers-color-scheme: dark)";

// Saved choice (data-theme on <html>) wins; otherwise the system preference.
function read(): Theme {
  const value = document.documentElement.dataset.theme;
  if (value === "light" || value === "dark") return value;
  return window.matchMedia(QUERY).matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  window.addEventListener(EVENT, onChange);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    media.removeEventListener("change", onChange);
  };
}

/** Sun/moon toggle. The blocking script in the layout applies the saved value before first paint. */
export function ThemeToggle() {
  const t = useTranslations("Theme");
  const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme);
  const next: Theme = theme === "light" ? "dark" : "light";

  // Unknown URLs render inside Next's bare error shell, where the layout's <head> script never runs.
  // Re-apply the saved choice here, before paint, so the 404 page honours it too.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if ((saved === "light" || saved === "dark") && document.documentElement.dataset.theme !== saved) {
        document.documentElement.dataset.theme = saved;
        window.dispatchEvent(new Event(EVENT));
      }
    } catch {
      // Storage blocked: stay on the system theme.
    }
  }, []);

  function onClick() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the choice just lasts for this page.
    }
    window.dispatchEvent(new Event(EVENT));
  }

  const label = t("label", { current: t(theme), next: t(next) });

  // Both icons are always rendered; CSS shows the one that matches the active theme, so the
  // icon is right before hydration too. Only the label depends on JS.
  return (
    <button type="button" className="theme-toggle" onClick={onClick} aria-label={label} title={label}>
      <svg className="i-sun" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="3.5" />
        <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" />
      </svg>
      <svg className="i-moon" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M16.5 11.6A6.6 6.6 0 0 1 8.4 3.5a6.6 6.6 0 1 0 8.1 8.1z" />
      </svg>
    </button>
  );
}
