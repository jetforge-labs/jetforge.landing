import {
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "./_components/contact-form";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { ScrollRevealInit } from "./_components/scroll-reveal";
import { MotionController } from "./_components/motion-controller";
import { ServiceList } from "./_components/service-card";
import { BuildShowcase } from "./_components/build-showcase";
import { TechStrip } from "./_components/tech-strip";

export default async function Home() {
  const tHero = await getTranslations("Hero");
  const tAbout = await getTranslations("About");
  const tContact = await getTranslations("Contact");
  const tServices = await getTranslations("Services");

  return (
    <div className="min-h-[100dvh]">
      <ScrollRevealInit />
      <MotionController />

      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section
          aria-label="Hero"
          className="relative flex overflow-hidden px-6 pt-28 pb-10 md:min-h-[100dvh] md:items-center md:justify-center md:pt-0 md:pb-0"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.22_0.018_55)_0%,_oklch(0.16_0.012_60)_65%)]" />
          <div data-parallax="0.12" className="hero-grid absolute inset-0" />

          {/* Top radial shade — crown glow behind content */}
          <div aria-hidden="true" className="hero-shade pointer-events-none absolute inset-0" />

          {/* Single hero orb — ember tint */}
          <div data-parallax="0.05" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="gradient-orb absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-[oklch(0.74_0.16_55_/_0.08)] blur-3xl" />
          </div>

          {/* Framed canvas — vertical hairline frame around the content column.
              Inner pair tracks the content edges (≥md); bold outer pair sits a
              touch wider (≥lg). All clipped to the section, no horizontal scroll. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-4xl -translate-x-1/2 md:block"
          >
            {/* Faint inner pair — hugs the content column from md */}
            <div className="frame-line frame-line-inner left-0" />
            <div className="frame-line frame-line-inner right-0" />
            {/* Bold outer pair — lg only, pushed slightly outside the column */}
            <div className="frame-line frame-line-outer left-[-2.5rem] hidden lg:block" />
            <div className="frame-line frame-line-outer right-[-2.5rem] hidden lg:block" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Wordmark + badge */}
            <div className="hero-animate mb-8 flex flex-col items-center gap-4">
              {/* Announcement-style brand badge: icon · label · divider · arrow */}
              <a
                href="#services"
                className="badge-shimmer group inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-full border border-[oklch(0.74_0.16_55_/_0.25)] bg-[oklch(0.74_0.16_55_/_0.07)] py-1.5 pr-2.5 pl-3.5 text-sm font-medium text-[oklch(0.74_0.16_55)] transition-colors duration-200 hover:border-[oklch(0.74_0.16_55_/_0.4)] hover:bg-[oklch(0.74_0.16_55_/_0.10)]"
              >
                <Sparkle weight="fill" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {tHero("badge")}
                <span aria-hidden="true" className="h-3.5 w-px bg-[oklch(0.74_0.16_55_/_0.3)]" />
                <ArrowRight
                  weight="bold"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <h1
              className="hero-animate-delay-1 mb-6 font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-tight tracking-[-0.025em] text-[oklch(0.92_0.005_60)] sm:leading-[1.05]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {tHero("headingLine1")}{" "}
              <span className="text-[oklch(0.74_0.16_55)]">{tHero("headingLine2")}</span>
            </h1>

            <p className="hero-animate-delay-2 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[oklch(0.80_0.010_60)] sm:mb-12 sm:text-lg md:text-xl">
              {tHero("subheading")}
            </p>

            {/* Single CTA intent: "Start a Project" + ghost secondary */}
            <div className="hero-animate-delay-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                data-magnetic
                className="cta-ember btn-press group flex w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-[oklch(0.74_0.16_55)] px-8 py-4 font-semibold text-[oklch(0.14_0.010_60)] transition-all duration-200 hover:bg-[oklch(0.78_0.16_55)] sm:w-auto"
              >
                {tHero("startProject")}
                {/* Trailing icon in nested circle */}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.14_0.010_60_/_0.15)]">
                  <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                </span>
              </a>
              <a
                href="#services"
                data-magnetic
                className="btn-press w-full cursor-pointer rounded-[12px] border border-[var(--color-hairline)] bg-[oklch(0.21_0.014_60_/_0.5)] px-8 py-4 text-center font-semibold text-[oklch(0.80_0.010_60)] transition-all duration-200 hover:border-[oklch(0.30_0.015_60_/_0.6)] hover:bg-[oklch(0.24_0.014_60_/_0.7)] hover:text-[oklch(0.92_0.005_60)] sm:w-auto"
              >
                {tHero("ourServices")}
              </a>
            </div>
          </div>
        </section>

        {/* Tech strip */}
        <TechStrip />

        {/* ─── Services — editorial split layout, not cards ─── */}
        <section
          id="services"
          aria-labelledby="services-heading"
          className="relative overflow-hidden px-6 py-16 sm:py-20 md:py-32"
        >
          <div className="relative mx-auto max-w-6xl">
            {/* Left-aligned header — breaks centred-everything pattern */}
            <div className="reveal mb-16 max-w-2xl">
              <h2
                id="services-heading"
                className="mb-4 font-display text-3xl font-bold tracking-[-0.02em] text-[oklch(0.92_0.005_60)] md:text-5xl"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                {tServices("heading")}
              </h2>
              <p className="text-[oklch(0.80_0.010_60)] md:text-lg">
                {tServices("subheading")}
              </p>
            </div>

            {/* Service list — editorial divide-y layout (no cards) */}
            <ServiceList />
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" role="separator" />

        {/* ─── What We Build ─── */}
        <BuildShowcase />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" role="separator" />

        {/* ─── About ─── */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative overflow-hidden px-6 py-16 sm:py-20 md:py-32"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.19_0.012_60_/_0.5)] via-transparent to-transparent" />

          <div className="reveal relative mx-auto max-w-3xl">
            <h2
              id="about-heading"
              className="mb-6 font-display text-3xl font-bold tracking-[-0.02em] text-[oklch(0.92_0.005_60)] md:text-5xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {tAbout("headingStart")}{" "}
              <span className="text-[oklch(0.74_0.16_55)]">{tAbout("headingHighlight")}</span>
            </h2>
            <p
              className="mb-5 text-lg leading-relaxed text-[oklch(0.80_0.010_60)]"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {tAbout("paragraph1")}
            </p>
            <p
              className="mb-8 text-lg leading-relaxed text-[oklch(0.80_0.010_60)]"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {tAbout("paragraph2")}
            </p>
            <a
              href="#contact"
              className="group inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-semibold text-[oklch(0.74_0.16_55)] transition-colors duration-200 hover:text-[oklch(0.80_0.18_55)]"
            >
              {tAbout("workWithUs")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" role="separator" />

        {/* ─── Contact ─── */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="relative px-6 py-16 sm:py-20 md:py-32"
        >
          <div className="relative mx-auto max-w-2xl">
            <div className="reveal mb-12">
              {/* Left-aligned for rhythm contrast with centred hero */}
              <h2
                id="contact-heading"
                className="mb-4 font-display text-3xl font-bold tracking-[-0.02em] text-[oklch(0.92_0.005_60)] md:text-5xl"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                {tContact("headingStart")}{" "}
                <span className="text-[oklch(0.74_0.16_55)]">{tContact("headingHighlight")}</span>
              </h2>
              <p className="text-[oklch(0.80_0.010_60)] md:text-lg">
                {tContact("subheading")}
              </p>
            </div>

            {/* Form — double-bezel treatment */}
            <div className="reveal bezel-outer">
              <div className="bezel-inner bg-[oklch(0.19_0.012_60)] p-4 sm:p-6 md:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
