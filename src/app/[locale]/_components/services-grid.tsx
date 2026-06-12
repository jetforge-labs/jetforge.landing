"use client";

import {
  Code,
  DeviceMobile,
  Cloud,
  Robot,
  Rocket,
  ShieldCheck,
  type Icon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { FlipCard } from "@/components/ui/flip-card";

interface Service {
  key: string;
  Icon: Icon;
  /** OKLCH triplet — cycles ion blue / cyan / violet across the grid. */
  accent: string;
}

const services: Service[] = [
  { key: "customSoftware", Icon: Code,         accent: "0.70 0.17 255" },
  { key: "mobileApps",     Icon: DeviceMobile, accent: "0.75 0.14 215" },
  { key: "cloudDevOps",    Icon: Cloud,        accent: "0.65 0.18 295" },
  { key: "aiAutomation",   Icon: Robot,        accent: "0.70 0.17 255" },
  { key: "mvpDevelopment", Icon: Rocket,       accent: "0.75 0.14 215" },
  { key: "securityAudits", Icon: ShieldCheck,  accent: "0.65 0.18 295" },
];

/** Services as a grid of 3D flip cards (front: hook · back: detail + CTA). */
export function ServicesGrid() {
  const t = useTranslations("Services");

  return (
    <div className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map(({ key, Icon, accent }, index) => (
        <div
          key={key}
          className="reveal"
          style={{ "--stagger-index": index } as React.CSSProperties}
        >
          <FlipCard
            title={t(`${key}.title`)}
            tagline={t(`${key}.tagline`)}
            description={t(`${key}.description`)}
            features={t.raw(`${key}.features`) as string[]}
            Icon={Icon}
            accent={accent}
            ctaLabel={t("cardCta")}
          />
        </div>
      ))}
    </div>
  );
}
