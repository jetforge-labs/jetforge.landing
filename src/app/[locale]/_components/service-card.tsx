"use client";

import {
  Code,
  DeviceMobile,
  Cloud,
  Robot,
  Rocket,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const services = [
  { key: "customSoftware", Icon: Code },
  { key: "mobileApps",     Icon: DeviceMobile },
  { key: "cloudDevOps",    Icon: Cloud },
  { key: "aiAutomation",   Icon: Robot },
  { key: "mvpDevelopment", Icon: Rocket },
  { key: "securityAudits", Icon: ShieldCheck },
] as const;

/**
 * Editorial split list — one family distinct from the Build card grid.
 * No card chrome; uses divide-y hairlines for rhythm.
 */
export function ServiceList() {
  const t = useTranslations("Services");

  return (
    <div
      className="reveal-stagger divide-y"
      style={{ borderColor: "var(--color-hairline)" }}
    >
      {services.map(({ key, Icon }, index) => (
        <div
          key={key}
          className="reveal group grid grid-cols-[auto_1fr] gap-6 py-8 transition-colors duration-200 first:pt-0 last:pb-0 md:grid-cols-[auto_1fr_auto] md:gap-10"
          style={{ "--stagger-index": index } as React.CSSProperties}
        >
          {/* Icon badge */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[oklch(0.74_0.16_55_/_0.10)] ring-1 ring-[oklch(0.74_0.16_55_/_0.20)] transition-all duration-300 group-hover:bg-[oklch(0.74_0.16_55_/_0.16)] group-hover:ring-[oklch(0.74_0.16_55_/_0.35)]">
            <Icon
              weight="duotone"
              className="h-5 w-5 text-[oklch(0.74_0.16_55)] transition-colors duration-300"
              aria-hidden="true"
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="mb-1.5 text-base font-semibold text-[oklch(0.92_0.005_60)] md:text-lg">
              {t(`${key}.title`)}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-[oklch(0.80_0.010_60)] md:text-base">
              {t(`${key}.description`)}
            </p>
          </div>

          {/* Index counter — right column, desktop only */}
          <div className="hidden items-center md:flex">
            <span className="font-mono text-xs text-[oklch(0.45_0.008_60)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
