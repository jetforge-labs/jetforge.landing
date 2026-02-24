import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "./_components/contact-form";
import { Logo } from "./_components/logo";
import { Navbar } from "./_components/navbar";
import { ScrollRevealInit } from "./_components/scroll-reveal";
import { ServiceCard } from "./_components/service-card";

import { TechStrip } from "./_components/tech-strip";

const serviceKeys = [
  { key: "customSoftware", icon: CodeBracketIcon },
  { key: "mobileApps", icon: DevicePhoneMobileIcon },
  { key: "cloudDevOps", icon: CloudIcon },
  { key: "aiAutomation", icon: CpuChipIcon },
  { key: "mvpDevelopment", icon: RocketLaunchIcon },
  { key: "securityAudits", icon: ShieldCheckIcon },
] as const;



export default async function Home() {
  const tHero = await getTranslations("Hero");
  const tServices = await getTranslations("Services");
  const tAbout = await getTranslations("About");

  const tContact = await getTranslations("Contact");
  const tFooter = await getTranslations("Footer");

  return (
    <div className="min-h-screen">
      <ScrollRevealInit />

      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      <main>
        {/* Hero */}
        <section
          aria-label="Hero"
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-navy-700)_0%,_var(--color-navy-950)_70%)]" />
          <div className="hero-grid absolute inset-0" />

          {/* Gradient orbs */}
          <div className="gradient-orb pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="gradient-orb-delayed pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-600/8 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="hero-animate mb-8 flex flex-col items-center gap-4">
              <Logo className="h-48 sm:h-64 md:h-80" priority />
              <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-400">
                {tHero("badge")}
              </span>
            </div>

            <h1 className="hero-animate-delay-1 mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-7xl">
              {tHero("headingLine1")}
              <br />
              <span className="gradient-text">{tHero("headingLine2")}</span>
            </h1>

            <p className="hero-animate-delay-2 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:mb-12 sm:text-lg md:text-xl">
              {tHero("subheading")}
            </p>

            <div className="hero-animate-delay-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="btn-press group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-blue-500/40 hover:brightness-110 sm:w-auto"
              >
                {tHero("startProject")}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="btn-press w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-center font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                {tHero("ourServices")}
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <a
            href="#services"
            className="scroll-indicator absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-500 transition-colors duration-200 hover:text-slate-300"
            aria-label="Scroll to services"
          >
            <ChevronDownIcon className="h-6 w-6" />
          </a>
        </section>

        {/* Tech strip */}
        <TechStrip />

        {/* Services */}
        <section
          id="services"
          aria-labelledby="services-heading"
          className="relative px-6 py-28 md:py-32"
        >
          {/* Subtle orb */}
          <div className="gradient-orb pointer-events-none absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="reveal mb-16 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
                {tServices("eyebrow")}
              </p>
              <h2
                id="services-heading"
                className="mb-4 text-3xl font-bold text-white md:text-5xl"
              >
                {tServices("heading")}
              </h2>
              <p className="mx-auto max-w-2xl text-slate-400 md:text-lg">
                {tServices("subheading")}
              </p>
            </div>

            <div className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceKeys.map((service, index) => (
                <div
                  key={service.key}
                  className="reveal"
                  style={{ "--stagger-index": index } as React.CSSProperties}
                >
                  <ServiceCard
                    title={tServices(`${service.key}.title`)}
                    description={tServices(`${service.key}.description`)}
                    icon={
                      <service.icon className="h-6 w-6 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" role="separator" />

        {/* About */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative overflow-hidden px-6 py-28 md:py-32"
        >
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-950 to-navy-950" />
          <div className="gradient-orb-delayed pointer-events-none absolute -right-60 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-3xl" />

          <div className="reveal relative mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
              {tAbout("eyebrow")}
            </p>
            <h2
              id="about-heading"
              className="mb-6 text-3xl font-bold text-white md:text-5xl"
            >
              {tAbout("headingStart")}{" "}
              <span className="gradient-text">{tAbout("headingHighlight")}</span>
            </h2>
            <p className="mb-5 text-lg leading-relaxed text-slate-400">
              {tAbout("paragraph1")}
            </p>
            <p className="mb-8 text-lg leading-relaxed text-slate-400">
              {tAbout("paragraph2")}
            </p>
            <a
              href="#contact"
              className="group inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-300"
            >
              {tAbout("workWithUs")}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" role="separator" />

        {/* Contact */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="relative px-6 py-28 md:py-32"
        >
          <div className="gradient-orb pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="reveal mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
                {tContact("eyebrow")}
              </p>
              <h2
                id="contact-heading"
                className="mb-4 text-3xl font-bold text-white md:text-5xl"
              >
                {tContact("headingStart")}{" "}
                <span className="gradient-text">{tContact("headingHighlight")}</span>
              </h2>
              <p className="text-slate-400 md:text-lg">
                {tContact("subheading")}
              </p>
            </div>

            {/* Form card */}
            <div className="reveal glow-blue-sm rounded-2xl border border-white/5 bg-navy-900/50 p-6 backdrop-blur-sm sm:p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-navy-950 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-4 md:gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <a href="#" aria-label="Back to top">
                <Logo className="mb-4 h-40" />
              </a>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer navigation">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {tFooter("navigation")}
              </h3>
              <ul className="space-y-3">
                {(["services", "about", "contact"] as const).map((key) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      className="cursor-pointer text-sm text-slate-500 transition-colors duration-200 hover:text-slate-300"
                    >
                      {tFooter(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {tFooter("servicesHeader")}
              </h3>
              <ul className="space-y-3">
                {(["customSoftware", "mobileApps", "cloudDevOps", "aiAutomation"] as const).map((key) => (
                  <li key={key}>
                    <a
                      href="#services"
                      className="cursor-pointer text-sm text-slate-500 transition-colors duration-200 hover:text-slate-300"
                    >
                      {tServices(`${key}.title`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institutional */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {tFooter("institutional")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/privacy"
                    className="cursor-pointer text-sm text-slate-500 transition-colors duration-200 hover:text-slate-300"
                  >
                    {tFooter("privacy")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-white/5 pt-8 sm:flex-row">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} {tFooter("copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
