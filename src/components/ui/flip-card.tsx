"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Check, type Icon } from "@phosphor-icons/react";
import { useState } from "react";

export interface FlipCardProps {
  title: string;
  /** Short hook shown on the card front. */
  tagline: string;
  /** Longer copy shown on the back. */
  description: string;
  features: string[];
  Icon: Icon;
  /** OKLCH triplet (no alpha), e.g. "0.70 0.17 255" — drives the card accent. */
  accent?: string;
  /** Label of the back-face CTA (links to #contact). */
  ctaLabel?: string;
}

/** Deterministic widths/offsets for the animated code lines (SSR-safe). */
const CODE_LINES = [
  { width: "78%", margin: "4%" },
  { width: "62%", margin: "14%" },
  { width: "88%", margin: "0%" },
  { width: "56%", margin: "10%" },
  { width: "72%", margin: "6%" },
  { width: "84%", margin: "2%" },
];

/**
 * FlipCard — 3D hover-flip service card (ion palette native).
 * Front: animated code lines + icon tile + title/tagline.
 * Back: description, staggered feature list, CTA to #contact.
 *
 * Flips on hover (fine pointers), tap (touch), and keyboard focus-within.
 * Under prefers-reduced-motion the rotation is instant (globals.css).
 */
export function FlipCard({
  title,
  tagline,
  description,
  features,
  Icon,
  accent = "0.70 0.17 255",
  ctaLabel = "Start a project",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const face =
    "absolute inset-0 h-full w-full overflow-hidden rounded-[16px] " +
    "border border-[var(--color-hairline)] " +
    "bg-gradient-to-br from-[oklch(0.185_0.016_265)] via-[oklch(0.165_0.015_265)] to-[oklch(0.14_0.015_265)] " +
    "[backface-visibility:hidden] transition-opacity duration-700";

  return (
    <div
      style={{ "--card-accent": accent } as React.CSSProperties}
      className="group relative h-[360px] w-full [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((f) => !f)}
      onFocus={() => setIsFlipped(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsFlipped(false);
      }}
    >
      <div
        className={cn(
          "flip-inner relative h-full w-full [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* ─── Front ─── */}
        <div
          className={cn(
            face,
            "[transform:rotateY(0deg)]",
            "group-hover:border-[oklch(var(--card-accent)_/_0.3)]",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          {/* accent wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(var(--card-accent)_/_0.08)] via-transparent to-transparent" />

          {/* animated code lines + icon tile */}
          <div className="absolute inset-0 flex items-center justify-center pb-16">
            <div className="relative flex h-[110px] w-[200px] flex-col items-center justify-center gap-2.5">
              {CODE_LINES.map((line, i) => (
                <div
                  key={i}
                  className="flip-code-line h-2.5 rounded-sm bg-gradient-to-r from-[oklch(var(--card-accent)_/_0.15)] via-[oklch(var(--card-accent)_/_0.3)] to-[oklch(var(--card-accent)_/_0.15)]"
                  style={{
                    width: line.width,
                    marginLeft: line.margin,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-br from-[oklch(var(--card-accent)_/_0.25)] to-[oklch(var(--card-accent)_/_0.10)] ring-1 ring-[oklch(var(--card-accent)_/_0.35)] shadow-[0_0_32px_oklch(var(--card-accent)_/_0.25)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon
                    weight="duotone"
                    className="h-7 w-7 text-[oklch(var(--card-accent))]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* bottom copy */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-[oklch(0.93_0.006_250)] transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm text-[oklch(0.62_0.010_250)] transition-transform delay-[50ms] duration-500 ease-out group-hover:-translate-y-1">
                  {tagline}
                </p>
              </div>
              <ArrowRight
                className="mb-1 h-4 w-4 shrink-0 text-[oklch(var(--card-accent))] transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* ─── Back ─── */}
        <div
          className={cn(
            face,
            "flex flex-col p-5",
            "[transform:rotateY(180deg)]",
            "group-hover:border-[oklch(var(--card-accent)_/_0.3)]",
            isFlipped ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(var(--card-accent)_/_0.08)] via-transparent to-transparent" />

          <div className="relative z-10 flex-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-[oklch(var(--card-accent)_/_0.3)] to-[oklch(var(--card-accent)_/_0.12)] ring-1 ring-[oklch(var(--card-accent)_/_0.35)]">
                <Icon
                  weight="duotone"
                  className="h-4 w-4 text-[oklch(var(--card-accent))]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-[oklch(0.93_0.006_250)]">
                {title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-[oklch(0.81_0.010_250)]">
              {description}
            </p>

            <ul className="space-y-2.5">
              {features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-[oklch(0.81_0.010_250)] transition-all duration-500"
                  style={{
                    transform: isFlipped ? "translateX(0)" : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 90 + 180}ms`,
                  }}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[oklch(var(--card-accent)_/_0.15)]">
                    <Check
                      weight="bold"
                      className="h-3 w-3 text-[oklch(var(--card-accent))]"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-auto border-t border-[var(--color-hairline)] pt-4">
            <a
              href="#contact"
              onClick={(e) => e.stopPropagation()}
              className="group/cta flex cursor-pointer items-center justify-between rounded-[10px] border border-transparent bg-[oklch(0.215_0.016_265_/_0.7)] p-2.5 transition-all duration-300 hover:border-[oklch(var(--card-accent)_/_0.25)] hover:bg-[oklch(var(--card-accent)_/_0.12)]"
            >
              <span className="text-sm font-semibold text-[oklch(0.93_0.006_250)] transition-colors duration-300 group-hover/cta:text-[oklch(var(--card-accent))]">
                {ctaLabel}
              </span>
              <ArrowRight
                className="h-4 w-4 text-[oklch(var(--card-accent))] transition-transform duration-300 group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
