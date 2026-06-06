import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";

interface FooterProps {
  minimal?: boolean;
}

export async function Footer({ minimal = false }: FooterProps) {
  const tFooter = await getTranslations("Footer");
  const tServices = minimal ? null : await getTranslations("Services");

  if (minimal) {
    return (
      <footer className="border-t border-[var(--color-hairline)] bg-[oklch(0.18_0.012_60)] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/"
              aria-label="Back to home"
              className="inline-flex min-h-[44px] items-center"
            >
              <Logo className="text-2xl" />
            </Link>
            <p className="text-xs text-[oklch(0.45_0.008_60)]">
              &copy; {new Date().getFullYear()} {tFooter("copyright")}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[oklch(0.18_0.012_60)] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" aria-label="Back to top" className="inline-flex min-h-[44px] items-center">
              <Logo className="text-2xl" />
            </a>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[oklch(0.60_0.008_60)]">
              {tFooter("navigation")}
            </h3>
            <ul className="space-y-3">
              {(["services", "build", "about", "contact"] as const).map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="inline-flex min-h-[44px] cursor-pointer items-center text-sm text-[oklch(0.60_0.008_60)] transition-colors duration-200 hover:text-[oklch(0.92_0.005_60)]"
                  >
                    {tFooter(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[oklch(0.60_0.008_60)]">
              {tFooter("servicesHeader")}
            </h3>
            <ul className="space-y-3">
              {(["customSoftware", "mobileApps", "cloudDevOps", "aiAutomation"] as const).map((key) => (
                <li key={key}>
                  <a
                    href="#services"
                    className="inline-flex min-h-[44px] cursor-pointer items-center text-sm text-[oklch(0.60_0.008_60)] transition-colors duration-200 hover:text-[oklch(0.92_0.005_60)]"
                  >
                    {tServices!(`${key}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[oklch(0.60_0.008_60)]">
              {tFooter("institutional")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex min-h-[44px] cursor-pointer items-center text-sm text-[oklch(0.60_0.008_60)] transition-colors duration-200 hover:text-[oklch(0.92_0.005_60)]"
                >
                  {tFooter("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-[var(--color-hairline)] pt-8 sm:flex-row">
          <p className="text-xs text-[oklch(0.45_0.008_60)]">
            &copy; {new Date().getFullYear()} {tFooter("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
