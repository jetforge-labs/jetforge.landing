import {
  Rocket,
  Code,
  DeviceMobile,
  Brain,
  Stack,
  CloudArrowUp,
  Wrench,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { type Icon } from "@phosphor-icons/react";
import { getTranslations } from "next-intl/server";

interface BuildItem {
  key: string;
  Icon: Icon;
  stack: string[];
}

const featured: BuildItem = {
  key: "mvp",
  Icon: Rocket,
  stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Vercel"],
};

const builds: BuildItem[] = [
  { key: "web",     Icon: Code,          stack: ["Next.js", "React", "TypeScript", "Tailwind", "PostgreSQL"] },
  { key: "mobile",  Icon: DeviceMobile,  stack: ["React Native", "Expo", "TypeScript", "Node.js"] },
  { key: "ai",      Icon: Brain,         stack: ["Python", "OpenAI / Anthropic", "LangChain", "Vector DB"] },
  { key: "backend", Icon: Stack,         stack: ["Node.js", "NestJS", "GraphQL", "PostgreSQL"] },
  { key: "cloud",   Icon: CloudArrowUp,  stack: ["AWS", "Docker", "Terraform", "GitHub Actions"] },
  { key: "tools",   Icon: Wrench,        stack: ["Next.js", "Node.js", "PostgreSQL", "Webhooks"] },
];

function StackChips({ items, label }: { items: string[]; label: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.62_0.010_250)]">
        {label}
      </p>
      <ul className="flex flex-wrap gap-2">
        {items.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-[var(--color-hairline)] bg-[oklch(0.185_0.016_265_/_0.6)] px-2.5 py-1 text-xs font-medium text-[oklch(0.81_0.010_250)]"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function BuildShowcase() {
  const t = await getTranslations("Build");

  return (
    <section
      id="build"
      aria-labelledby="build-heading"
      className="relative px-6 py-16 sm:py-20 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Left-aligned header */}
        <div className="reveal mb-16 max-w-2xl">
          <h2
            id="build-heading"
            className="mb-4 font-display text-3xl font-bold tracking-[-0.02em] text-[oklch(0.93_0.006_250)] md:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {t("heading")}
          </h2>
          <p className="text-[oklch(0.81_0.010_250)] md:text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* Featured build — double-bezel treatment, full-width row */}
        {/* Bug fix #12: wrap article in reveal div so server/client DOM match */}
        <div className="reveal mb-6">
          <div className="bezel-outer">
            <article
              data-spotlight
              className="bezel-inner group relative overflow-hidden bg-[oklch(0.165_0.015_265)] p-6 transition-all duration-300 hover:shadow-[0_8px_40px_oklch(0.13_0.014_265_/_0.5)] sm:p-8 lg:flex lg:items-center lg:gap-12 lg:p-10"
              aria-label={t(`items.${featured.key}.name`)}
            >
              {/* Ember gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[oklch(0.70_0.17_255_/_0.06)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative lg:flex-1">
                <div className="mb-5 inline-flex rounded-[12px] bg-[oklch(0.70_0.17_255_/_0.10)] p-3 ring-1 ring-[oklch(0.70_0.17_255_/_0.20)] transition-all duration-300 group-hover:bg-[oklch(0.70_0.17_255_/_0.16)] group-hover:ring-[oklch(0.70_0.17_255_/_0.35)]">
                  <featured.Icon
                    weight="duotone"
                    className="h-6 w-6 text-[oklch(0.70_0.17_255)]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[oklch(0.93_0.006_250)]">
                  {t(`items.${featured.key}.name`)}
                </h3>
                <p className="mb-4 text-[oklch(0.81_0.010_250)] md:text-lg">
                  {t(`items.${featured.key}.description`)}
                </p>
                <p className="text-sm text-[oklch(0.81_0.010_250)]">
                  <span className="font-semibold text-[oklch(0.93_0.006_250)]">
                    {t("idealForLabel")}:
                  </span>{" "}
                  {t(`items.${featured.key}.idealFor`)}
                </p>
              </div>

              <div className="relative mt-8 flex flex-col gap-5 border-t border-[var(--color-hairline)] pt-6 lg:mt-0 lg:w-80 lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <StackChips items={featured.stack} label={t("stackLabel")} />
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.62_0.010_250)]">
                    {t("outcomeLabel")}
                  </p>
                  <p className="flex items-start gap-2 text-sm text-[oklch(0.81_0.010_250)]">
                    <CheckCircle
                      weight="duotone"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.70_0.17_255)]"
                      aria-hidden="true"
                    />
                    {t(`items.${featured.key}.outcome`)}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Remaining builds — 2-col card grid, richer treatment than Services list */}
        <div className="reveal-stagger grid gap-4 sm:grid-cols-2">
          {builds.map((build, index) => (
            // Bug fix #12: explicit reveal wrapper — DOM is now consistent server/client
            <div
              key={build.key}
              className="reveal"
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              <article
                data-spotlight
                className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[var(--color-hairline)] bg-[oklch(0.185_0.016_265_/_0.7)] p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-[oklch(0.70_0.17_255_/_0.20)] hover:shadow-[0_4px_24px_oklch(0.13_0.014_265_/_0.5)]"
                aria-label={t(`items.${build.key}.name`)}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[oklch(0.70_0.17_255_/_0.04)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative mb-5 inline-flex w-fit rounded-[12px] bg-[oklch(0.70_0.17_255_/_0.08)] p-3 ring-1 ring-[oklch(0.70_0.17_255_/_0.18)] transition-all duration-300 group-hover:bg-[oklch(0.70_0.17_255_/_0.14)] group-hover:ring-[oklch(0.70_0.17_255_/_0.30)]">
                  <build.Icon
                    weight="duotone"
                    className="h-5 w-5 text-[oklch(0.70_0.17_255)]"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="relative mb-2 text-base font-semibold text-[oklch(0.93_0.006_250)]">
                  {t(`items.${build.key}.name`)}
                </h3>
                <p className="relative mb-4 text-sm leading-relaxed text-[oklch(0.81_0.010_250)]">
                  {t(`items.${build.key}.description`)}
                </p>
                <p className="relative mb-5 text-sm text-[oklch(0.81_0.010_250)]">
                  <span className="font-semibold text-[oklch(0.93_0.006_250)]">
                    {t("idealForLabel")}:
                  </span>{" "}
                  {t(`items.${build.key}.idealFor`)}
                </p>

                <div className="relative mt-auto flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-5">
                  <StackChips items={build.stack} label={t("stackLabel")} />
                  <p className="flex items-start gap-2 text-sm text-[oklch(0.81_0.010_250)]">
                    <CheckCircle
                      weight="duotone"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.70_0.17_255)]"
                      aria-hidden="true"
                    />
                    {t(`items.${build.key}.outcome`)}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
