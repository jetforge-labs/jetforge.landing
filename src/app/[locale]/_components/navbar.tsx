"use client";

import { useState, useEffect, useRef } from "react";
import { List, X, ArrowLeft } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";

interface NavbarProps {
  minimal?: boolean;
}

export function Navbar({ minimal = false }: NavbarProps) {
  const t = useTranslations("Navbar");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t("services"), href: "#services" },
    { label: t("build"),    href: "#build" },
    { label: t("about"),    href: "#about" },
    { label: t("contact"),  href: "#contact" },
  ];

  // Bug fix: IntersectionObserver replaces window.addEventListener("scroll")
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navBase = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2`;
  const navScrolled = scrolled
    ? "border-b border-[var(--color-hairline)] bg-[oklch(0.13_0.014_265_/_0.92)] shadow-[0_1px_24px_oklch(0.08_0.012_265_/_0.4)] backdrop-blur-sm md:backdrop-blur-xl"
    : "bg-transparent";

  if (minimal) {
    return (
      <nav className={`${navBase} ${navScrolled}`} aria-label="Site navigation">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            aria-label="Jetforge Labs, home"
            className="flex items-center"
          >
            <Logo className="text-lg sm:text-xl" />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="btn-press group inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-[oklch(0.81_0.010_250)] transition-colors duration-200 hover:text-[oklch(0.93_0.006_250)]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              {t("backToHome")}
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Sentinel element — top of page; IntersectionObserver watches this */}
      <div ref={sentinelRef} className="pointer-events-none absolute top-0 h-1 w-full" aria-hidden="true" />

      {/* Mobile backdrop — full-screen overlay, behind the menu panel */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav className={`${navBase} ${navScrolled}`} aria-label="Site navigation">
        {/* 3-zone grid: logo left · links truly centered · CTA right */}
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4 transition-all duration-300">
          {/* Brand wordmark — left */}
          <a
            href="#"
            aria-label="Jetforge Labs, home"
            className="inline-flex min-h-[44px] items-center justify-self-start"
          >
            {/* Bug fix #14: Logo renders as span — use text-* not h-/w-auto */}
            <Logo className="text-lg sm:text-xl" />
          </a>

          {/* Desktop nav — centered */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[44px] cursor-pointer items-center px-3 text-sm font-medium text-[oklch(0.81_0.010_250)] transition-colors duration-200 hover:text-[oklch(0.93_0.006_250)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — right (desktop) */}
          <a
            href="#contact"
            className="btn-press cta-ember col-start-3 hidden min-h-[44px] cursor-pointer items-center justify-self-end rounded-[12px] bg-[oklch(0.70_0.17_255)] px-5 py-3 text-sm font-semibold text-[oklch(0.12_0.012_265)] transition-all duration-200 hover:bg-[oklch(0.75_0.16_252)] md:inline-flex"
          >
            {t("getInTouch")}
          </a>

          {/* Mobile hamburger — right */}
          <button
            type="button"
            className="col-start-3 inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center justify-self-end rounded-[12px] text-[oklch(0.81_0.010_250)] transition-colors duration-200 hover:text-[oklch(0.93_0.006_250)] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu panel — above backdrop (nav is z-50) */}
        <div
          className={`relative z-50 overflow-hidden md:hidden transition-all duration-300 ${
            mobileOpen
              ? "max-h-[100vh] opacity-100 translate-y-0 pointer-events-auto"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="border-t border-[var(--color-hairline)] bg-[oklch(0.13_0.014_265_/_0.96)] px-6 pb-6 pt-4 backdrop-blur-sm md:backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] cursor-pointer items-center text-base font-medium text-[oklch(0.81_0.010_250)] transition-colors duration-200 hover:text-[oklch(0.93_0.006_250)]"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-press mt-2 flex min-h-[44px] cursor-pointer items-center justify-center rounded-[12px] bg-[oklch(0.70_0.17_255)] px-5 py-3 text-sm font-semibold text-[oklch(0.12_0.012_265)] transition-all duration-200 hover:bg-[oklch(0.75_0.16_252)]"
              >
                {t("getInTouch")}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
