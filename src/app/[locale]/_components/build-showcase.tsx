import type { ComponentType, SVGProps } from "react";
import {
  RocketLaunchIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  ServerStackIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface BuildItem {
  key: string;
  icon: HeroIcon;
  /** Representative stack — proper nouns, identical across locales, so kept in code. */
  stack: string[];
}

/** Headline offering — rendered as a full-width featured row. */
const featured: BuildItem = {
  key: "mvp",
  icon: RocketLaunchIcon,
  stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Vercel"],
};

const builds: BuildItem[] = [
  { key: "web", icon: CodeBracketIcon, stack: ["Next.js", "React", "TypeScript", "Tailwind", "PostgreSQL"] },
  { key: "mobile", icon: DevicePhoneMobileIcon, stack: ["React Native", "Expo", "TypeScript", "Node.js"] },
  { key: "ai", icon: CpuChipIcon, stack: ["Python", "OpenAI / Anthropic", "LangChain", "Vector DB"] },
  { key: "backend", icon: ServerStackIcon, stack: ["Node.js", "NestJS", "GraphQL", "PostgreSQL"] },
  { key: "cloud", icon: CloudIcon, stack: ["AWS", "Docker", "Terraform", "GitHub Actions"] },
  { key: "tools", icon: WrenchScrewdriverIcon, stack: ["Next.js", "Node.js", "PostgreSQL", "Webhooks"] },
];

function StackChips({ items, label }: { items: string[]; label: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <ul className="flex flex-wrap gap-2">
        {items.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
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
      className="relative px-6 py-28 md:py-32"
    >
      {/* Ambient orb, consistent with other sections */}
      <div className="gradient-orb-delayed pointer-events-none absolute -left-40 top-32 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="reveal mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
            {t("eyebrow")}
          </p>
          <h2
            id="build-heading"
            className="mb-4 text-3xl font-bold text-white md:text-5xl"
          >
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400 md:text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* Featured build — full-width row */}
        <article className="reveal group relative mb-6 overflow-hidden rounded-2xl border border-blue-500/15 bg-navy-900/80 p-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 sm:p-10 lg:flex lg:items-center lg:gap-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-transparent" />
          <div className="relative lg:flex-1">
            <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3 ring-1 ring-blue-500/20 transition-all duration-300 group-hover:bg-blue-500/15 group-hover:ring-blue-500/30">
              <featured.icon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              {t(`items.${featured.key}.name`)}
            </h3>
            <p className="mb-4 text-slate-400 md:text-lg">
              {t(`items.${featured.key}.description`)}
            </p>
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-slate-300">
                {t("idealForLabel")}:
              </span>{" "}
              {t(`items.${featured.key}.idealFor`)}
            </p>
          </div>

          <div className="relative mt-8 flex flex-col gap-5 border-t border-white/5 pt-6 lg:mt-0 lg:w-80 lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <StackChips items={featured.stack} label={t("stackLabel")} />
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t("outcomeLabel")}
              </p>
              <p className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                {t(`items.${featured.key}.outcome`)}
              </p>
            </div>
          </div>
        </article>

        {/* Remaining builds */}
        <div className="reveal-stagger grid gap-6 sm:grid-cols-2">
          {builds.map((build, index) => (
            <article
              key={build.key}
              data-tilt
              className="reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-navy-900/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5"
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative mb-5 inline-flex w-fit rounded-xl bg-blue-500/10 p-3 ring-1 ring-blue-500/20 transition-all duration-300 group-hover:bg-blue-500/15 group-hover:ring-blue-500/30">
                <build.icon className="h-6 w-6 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
              </div>

              <h3 className="relative mb-2 text-lg font-semibold text-white">
                {t(`items.${build.key}.name`)}
              </h3>
              <p className="relative mb-4 text-sm leading-relaxed text-slate-400">
                {t(`items.${build.key}.description`)}
              </p>

              <p className="relative mb-5 text-sm text-slate-400">
                <span className="font-semibold text-slate-300">
                  {t("idealForLabel")}:
                </span>{" "}
                {t(`items.${build.key}.idealFor`)}
              </p>

              <div className="relative mt-auto flex flex-col gap-4 border-t border-white/5 pt-5">
                <StackChips items={build.stack} label={t("stackLabel")} />
                <p className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                  {t(`items.${build.key}.outcome`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
