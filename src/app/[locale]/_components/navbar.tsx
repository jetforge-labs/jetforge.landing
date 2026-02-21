"use client";

import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("services"), href: "#services" },
    { label: t("about"), href: "#about" },
    { label: t("contact"), href: "#contact" },
  ];

  function switchLocale() {
    const nextLocale = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-navy-950/90 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-center px-6 py-4">
        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="btn-press cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-blue-500/30 hover:brightness-110"
          >
            {t("getInTouch")}
          </a>
        </div>

        {/* Language switcher — top right */}
        <button
          type="button"
          onClick={switchLocale}
          className="absolute right-6 hidden cursor-pointer text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white md:block"
          aria-label="Switch language"
        >
          <span className={locale === "en" ? "text-white" : ""}>EN</span>
          {" | "}
          <span className={locale === "es" ? "text-white" : ""}>ES</span>
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="absolute right-6 cursor-pointer rounded-lg p-2 text-slate-300 transition-colors duration-200 hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/5 bg-navy-950/95 px-6 pb-6 pt-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="cursor-pointer text-base font-medium text-slate-300 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile language switcher */}
            <button
              type="button"
              onClick={() => {
                switchLocale();
                setMobileOpen(false);
              }}
              className="cursor-pointer text-left text-base font-medium text-slate-300 transition-colors duration-200 hover:text-white"
            >
              <span className={locale === "en" ? "text-white" : ""}>EN</span>
              {" | "}
              <span className={locale === "es" ? "text-white" : ""}>ES</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-blue-500/30 hover:brightness-110"
            >
              {t("getInTouch")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
