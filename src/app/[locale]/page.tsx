import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "./_components/contact-form";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { ScrollRevealInit } from "./_components/scroll-reveal";
import { MotionController } from "./_components/motion-controller";
import { NeonThread } from "./_components/neon-thread";
import { GalaxyHeroBackground } from "@/components/ui/galaxy-hero-background";
import { ServicesGrid } from "./_components/services-grid";
import { BuildShowcase } from "./_components/build-showcase";
import { TechStrip } from "./_components/tech-strip";

export default async function Home() {
  const tHero = await getTranslations("Hero");
  const tAbout = await getTranslations("About");
  const tContact = await getTranslations("Contact");
  const tServices = await getTranslations("Services");

  return (
    <div className="relative min-h-[100dvh]">
      <ScrollRevealInit />
      <MotionController />
      {/* Scroll-drawn ember filament — weaves down the background and plugs
          into the contact card at the end of the page */}
      <NeonThread />

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
          {/* Background — interactive Spline galaxy + legibility vignette.
              Replaces the old radial/grid/orb stack; the canvas tracks the
              cursor, so hero content below is pointer-events-none with
              pointer-events-auto restored on links. */}
          <GalaxyHeroBackground />

          {/* Content — pointer-events-none so the galaxy canvas receives the
              cursor; interactive elements restore pointer-events-auto */}
          <div className="pointer-events-none relative z-10 mx-auto max-w-4xl text-center">
            <h1
              className="hero-animate mb-6 font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-tight tracking-[-0.025em] text-[oklch(0.93_0.006_250)] sm:leading-[1.05]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {tHero("headingLine1")}{" "}
              <span className="text-[oklch(0.70_0.17_255)]">{tHero("headingLine2")}</span>
            </h1>

            <p className="hero-animate-delay-1 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[oklch(0.81_0.010_250)] sm:mb-12 sm:text-lg md:text-xl">
              {tHero("subheading")}
            </p>

            {/* Single CTA intent: "Start a Project" + ghost secondary */}
            <div className="hero-animate-delay-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                data-magnetic
                className="cta-ember btn-press group pointer-events-auto flex w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-[oklch(0.70_0.17_255)] px-8 py-4 font-semibold text-[oklch(0.12_0.012_265)] transition-all duration-200 hover:bg-[oklch(0.75_0.16_252)] sm:w-auto"
              >
                {tHero("startProject")}
                {/* Trailing icon in nested circle */}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.12_0.012_265_/_0.15)]">
                  <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                </span>
              </a>
              <a
                href="#services"
                data-magnetic
                className="btn-press pointer-events-auto w-full cursor-pointer rounded-[12px] border border-[var(--color-hairline)] bg-[oklch(0.185_0.016_265_/_0.5)] px-8 py-4 text-center font-semibold text-[oklch(0.81_0.010_250)] transition-all duration-200 hover:border-[oklch(0.32_0.02_265_/_0.6)] hover:bg-[oklch(0.215_0.016_265_/_0.7)] hover:text-[oklch(0.93_0.006_250)] sm:w-auto"
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
                className="mb-4 font-display text-3xl font-bold tracking-[-0.02em] text-[oklch(0.93_0.006_250)] md:text-5xl"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                {tServices("heading")}
              </h2>
              <p className="text-[oklch(0.81_0.010_250)] md:text-lg">
                {tServices("subheading")}
              </p>
            </div>

            {/* Service grid — 3D flip cards (front: hook · back: detail + CTA) */}
            <ServicesGrid />
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
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.165_0.015_265_/_0.5)] via-transparent to-transparent" />

          <div className="reveal relative mx-auto max-w-3xl">
            <h2
              id="about-heading"
              className="mb-6 font-display text-3xl font-bold tracking-[-0.02em] text-[oklch(0.93_0.006_250)] md:text-5xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {tAbout("headingStart")}{" "}
              <span className="text-[oklch(0.70_0.17_255)]">{tAbout("headingHighlight")}</span>
            </h2>
            <p
              className="mb-5 text-lg leading-relaxed text-[oklch(0.81_0.010_250)]"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {tAbout("paragraph1")}
            </p>
            <p
              className="mb-8 text-lg leading-relaxed text-[oklch(0.81_0.010_250)]"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {tAbout("paragraph2")}
            </p>
            <a
              href="#contact"
              className="group inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-semibold text-[oklch(0.70_0.17_255)] transition-colors duration-200 hover:text-[oklch(0.78_0.17_250)]"
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
                className="mb-4 font-display text-3xl font-bold tracking-[-0.02em] text-[oklch(0.93_0.006_250)] md:text-5xl"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                {tContact("headingStart")}{" "}
                <span className="text-[oklch(0.70_0.17_255)]">{tContact("headingHighlight")}</span>
              </h2>
              <p className="text-[oklch(0.81_0.010_250)] md:text-lg">
                {tContact("subheading")}
              </p>
            </div>

            {/* Form — double-bezel treatment; thread terminates here */}
            <div className="reveal bezel-outer" data-thread-end>
              <div className="bezel-inner bg-[oklch(0.165_0.015_265)] p-4 sm:p-6 md:p-10">
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
