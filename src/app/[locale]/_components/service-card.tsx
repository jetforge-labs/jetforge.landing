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
import { useEffect, useState } from "react";

interface Service {
  key: string;
  Icon: Icon;
  /** Per-index gradient angle so the row has rhythm without leaving the palette. */
  angle: number;
  /** Ember hot-spot position (% / %), varied per card. */
  emberX: number;
  emberY: number;
}

const services: Service[] = [
  { key: "customSoftware", Icon: Code,        angle: 145, emberX: 18, emberY: 0 },
  { key: "mobileApps",     Icon: DeviceMobile, angle: 165, emberX: 78, emberY: 8 },
  { key: "cloudDevOps",    Icon: Cloud,       angle: 130, emberX: 42, emberY: 0 },
  { key: "aiAutomation",   Icon: Robot,       angle: 175, emberX: 88, emberY: 18 },
  { key: "mvpDevelopment", Icon: Rocket,      angle: 150, emberX: 30, emberY: 0 },
  { key: "securityAudits", Icon: ShieldCheck, angle: 120, emberX: 65, emberY: 10 },
];

const DEFAULT_ACTIVE = 0;

/**
 * Expanding-panels accordion. The active panel grows to ~5fr while the others
 * hold 1fr; axis is horizontal on md+ and vertical below. Palette-native fill
 * (ember/graphite gradients + faint ember grid + watermark icon), no images.
 *
 * Collapsed panels show only the service icon (top-aligned, centered in the
 * narrow column) as the indicator; the active panel reveals title + description
 * below it. Distinct visual family from BuildShowcase: full-bleed seamless
 * panels rather than discrete content cards.
 */
export function ServiceList() {
  const t = useTranslations("Services");
  const [active, setActive] = useState(DEFAULT_ACTIVE);
  const [isDesktop, setIsDesktop] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsDesktop(mqDesktop.matches);
      setReduceMotion(mqMotion.matches);
    };
    update();
    mqDesktop.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  // Build the grid track string: active = 5fr, others = 1fr.
  const tracks = services
    .map((_, i) => (i === active ? "5fr" : "1fr"))
    .join(" ");

  // Under reduced motion, do NOT set inline grid tracks — inline styles beat
  // external !important, so leaving these unset lets the reduced-motion CSS
  // fallback (equal 1/2/3-col grid) take over. Otherwise drive the accordion.
  const gridStyle: React.CSSProperties = reduceMotion
    ? {}
    : isDesktop
      ? { gridTemplateColumns: tracks, gridTemplateRows: "none" }
      : { gridTemplateColumns: "1fr", gridTemplateRows: tracks };

  return (
    <div
      className="svc-accordion grid overflow-hidden rounded-[16px] border border-[var(--color-hairline)]"
      style={gridStyle}
    >
      {services.map((svc, index) => {
        const { key, Icon, angle, emberX, emberY } = svc;
        // Under reduced motion every panel reads as expanded (no interaction
        // can animate the reveal), so all chrome resolves to the active state.
        const isActive = reduceMotion || index === active;
        const title = t(`${key}.title`);
        const description = t(`${key}.description`);

        return (
          <div
            key={key}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={title}
            data-active={isActive}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(index);
              }
            }}
            className={[
              "svc-panel cursor-pointer",
              // Collapsed-size clamps prevent collapse-to-zero; min target ≥44px.
              isDesktop ? "min-w-[72px]" : "min-h-[64px]",
              // Borders between panels (seamless spine look, no gaps).
              index > 0
                ? isDesktop
                  ? "border-l border-[var(--color-hairline)]"
                  : "border-t border-[var(--color-hairline)]"
                : "",
            ].join(" ")}
            style={
              {
                "--svc-angle": `${angle}deg`,
                "--svc-ember-x": `${emberX}%`,
                "--svc-ember-y": `${emberY}%`,
              } as React.CSSProperties
            }
          >
            {/* Watermark icon behind content (active only, decorative). */}
            <Icon
              weight="duotone"
              aria-hidden="true"
              className="svc-watermark h-40 w-40 md:h-56 md:w-56"
            />

            {/* ─── Content ─── */}
            {/* Top-aligned in every panel. The icon is the persistent indicator
                (centered in the narrow collapsed column via svc-icon-wrap); when
                a panel is active the title + description fade in below it. */}
            <div className="svc-content relative flex h-full min-h-[124px] flex-col justify-start p-6 md:min-h-[200px] md:p-8">
              <span className="svc-icon-wrap mb-4 flex shrink-0">
                <Icon
                  weight="duotone"
                  aria-hidden="true"
                  className="h-7 w-7 text-[oklch(0.74_0.16_55)] md:h-8 md:w-8"
                />
              </span>
              <h3 className="svc-reveal svc-reveal-2 mb-2 font-display text-lg font-bold tracking-[-0.01em] text-[oklch(0.92_0.005_60)] md:text-xl">
                {title}
              </h3>
              <p className="svc-reveal svc-reveal-3 max-w-md text-sm leading-relaxed text-[oklch(0.80_0.010_60)] md:text-base">
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
