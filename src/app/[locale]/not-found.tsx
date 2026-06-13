import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { CosmicGlobe } from "@/components/ui/cosmic-globe";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Radial ember glow behind the globe */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="h-[480px] w-[480px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, oklch(0.70 0.17 255 / 0.22) 0%, oklch(0.65 0.18 295 / 0.10) 45%, transparent 72%)",
            filter: "blur(48px)",
          }}
        />
      </div>

      {/* ─── 4 · Globe · 4 ─── */}
      <div
        className="hero-animate relative z-10 flex items-center justify-center gap-4 sm:gap-6"
        aria-hidden="true"
      >
        {/* Left 4 */}
        <span
          className="select-none font-display text-[7rem] font-bold leading-none tracking-tighter text-[oklch(0.93_0.006_250_/_0.80)] sm:text-[9rem]"
        >
          4
        </span>

        {/* Globe — the "0" */}
        <div className="cosmic-float h-[7rem] w-[7rem] flex-shrink-0 sm:h-[9rem] sm:w-[9rem]">
          <CosmicGlobe className="h-full w-full" />
        </div>

        {/* Right 4 */}
        <span
          className="select-none font-display text-[7rem] font-bold leading-none tracking-tighter text-[oklch(0.93_0.006_250_/_0.80)] sm:text-[9rem]"
        >
          4
        </span>
      </div>

      {/* ─── Copy + CTA ─── */}
      <div className="relative z-10 mt-10 flex flex-col items-center gap-4 text-center">
        <h1
          className="hero-animate-delay-1 font-display text-2xl font-bold tracking-tight text-[oklch(0.93_0.006_250)] sm:text-3xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {t("title")}
        </h1>

        <p
          className="hero-animate-delay-2 max-w-sm text-base leading-relaxed text-[oklch(0.62_0.010_250)]"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {t("description")}
        </p>

        <div
          className="hero-animate-delay-2 mt-2"
          style={{ animationDelay: "0.45s" }}
        >
          <Link
            href="/"
            className="btn-press cta-ember group inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[12px] bg-[oklch(0.70_0.17_255)] px-5 py-3 text-sm font-semibold text-[oklch(0.12_0.012_265)] transition-all duration-200 hover:bg-[oklch(0.75_0.16_252)]"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            {t("back")}
          </Link>
        </div>
      </div>
    </main>
  );
}
