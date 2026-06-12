import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";

interface FooterProps {
  minimal?: boolean;
}

export async function Footer({ minimal = false }: FooterProps) {
  const tFooter = await getTranslations("Footer");
  const tServices = minimal ? null : await getTranslations("Services");

  const year = new Date().getFullYear();

  if (minimal) {
    return (
      <footer className="relative overflow-hidden border-t border-[var(--color-hairline)] bg-[oklch(0.155_0.015_265)] px-6 py-12 md:py-16">
        <div
          aria-hidden="true"
          className="footer-orb left-1/2 top-0 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3"
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/"
              aria-label="Back to home"
              className="inline-flex min-h-[44px] items-center"
            >
              <Logo className="text-2xl" />
            </Link>
            <p className="text-xs text-[oklch(0.47_0.010_250)]">
              &copy; {year} {tFooter("copyright")}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  const linkClass =
    "inline-flex min-h-[44px] cursor-pointer items-center text-sm text-[oklch(0.62_0.010_250)] transition-colors duration-200 hover:text-[oklch(0.93_0.006_250)]";
  const headerClass =
    "mb-4 text-xs font-semibold uppercase tracking-wider text-[oklch(0.62_0.010_250)]";

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-hairline)] bg-[oklch(0.155_0.015_265)] px-6 pb-12 pt-16 md:pb-16 md:pt-24">
      {/* Ember glow orbs — decorative warm wash behind content */}
      <div
        aria-hidden="true"
        className="footer-orb -left-20 -top-24 z-0 h-[28rem] w-[28rem]"
      />
      <div
        aria-hidden="true"
        className="footer-orb -bottom-32 right-0 z-0 h-80 w-80 sm:translate-x-1/4"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Brand + blurb */}
          <div className="lg:col-span-1">
            <a
              href="#"
              aria-label="Back to top"
              className="inline-flex min-h-[44px] items-center"
            >
              <Logo className="text-2xl" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[oklch(0.81_0.010_250)]">
              {tFooter("description")}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-2 lg:gap-12">
            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <h3 className={headerClass}>{tFooter("navigation")}</h3>
              <ul className="space-y-2">
                {(["services", "build", "about", "contact"] as const).map((key) => (
                  <li key={key}>
                    <a href={`#${key}`} className={linkClass}>
                      {tFooter(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <div>
              <h3 className={headerClass}>{tFooter("servicesHeader")}</h3>
              <ul className="space-y-2">
                {(["customSoftware", "mobileApps", "cloudDevOps", "aiAutomation"] as const).map(
                  (key) => (
                    <li key={key}>
                      <a href="#services" className={linkClass}>
                        {tServices!(`${key}.title`)}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Institutional */}
            <div>
              <h3 className={headerClass}>{tFooter("institutional")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className={linkClass}>
                    {tFooter("privacy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-[var(--color-hairline)] pt-8 sm:flex-row sm:justify-start">
          <p className="text-xs text-[oklch(0.47_0.010_250)]">
            &copy; {year} {tFooter("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
