"use server";

import { getTranslations } from "next-intl/server";
import { TechLogo } from "./tech-logo";

// Simple Icons slugs + display names
// Colour: muted oklch(0.68 0.010 250) approximated as #a8a29e — lifted for visibility on dark bg
const ICON_COLOR = "a8a29e";

// AWS single-path SVG (Simple Icons removed Amazon brand slugs from their CDN)
const AWS_SVG_PATH =
  "M15.63 31.388l-7.135-2.56V18.373l7.135 2.43zm1.3 0l7.135-2.56V18.373l-7.135 2.432zm-7.7-13.8l7.2-2.033 6.696 2.16-6.696 2.273zm-2.092-.8L0 14.22V3.75l7.135 2.43zm1.307 0l7.135-2.56V3.75L8.443 6.192zm-7.7-13.8l7.2-2.043 6.696 2.16-6.696 2.273zm23.052 13.8l-7.135-2.56V3.75l7.135 2.43zm1.3 0l7.135-2.56V3.75l-7.135 2.43zm-7.7-13.8l7.2-2.033 6.696 2.16-6.696 2.273z";

type CdnTech = { name: string; slug: string; svg?: undefined };
type InlineSvgTech = { name: string; slug: string; svg: string };
type Tech = CdnTech | InlineSvgTech;

const technologies: Tech[] = [
  { name: "React",        slug: "react" },
  { name: "React Native", slug: "react" },          // same icon, different label
  { name: "Next.js",      slug: "nextdotjs" },
  { name: "TypeScript",   slug: "typescript" },
  { name: "Node.js",      slug: "nodedotjs" },
  { name: "AWS",          slug: "aws",   svg: AWS_SVG_PATH },
  { name: "Vercel",       slug: "vercel" },
  { name: "PostgreSQL",   slug: "postgresql" },
  { name: "MongoDB",      slug: "mongodb" },
  { name: "GraphQL",      slug: "graphql" },
  { name: "Docker",       slug: "docker" },
];

// De-duplicate by slug for the logo wall (React appears once)
// Result: 10 items (react, nextdotjs, typescript, nodedotjs, aws, vercel, postgresql, mongodb, graphql, docker)
const uniqueBySlug = technologies.filter(
  (tech, idx, arr) => arr.findIndex((t) => t.slug === tech.slug) === idx
);

function TechItem({ tech }: { tech: Tech }) {
  return (
    <div
      className="group flex shrink-0 items-center gap-2 opacity-50 transition-opacity duration-200 hover:opacity-80"
      title={tech.name}
    >
      {tech.svg ? (
        /* Inline SVG for logos not available on cdn.simpleicons.org */
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 text-[#a8a29e]"
        >
          <path fillRule="evenodd" d={tech.svg} />
        </svg>
      ) : (
        /* Simple Icons via CDN — client component handles onError */
        <TechLogo
          src={`https://cdn.simpleicons.org/${tech.slug}/${ICON_COLOR}`}
          alt={tech.name}
        />
      )}
      <span className="text-sm font-medium whitespace-nowrap text-[oklch(0.62_0.010_250)] transition-colors duration-200 group-hover:text-[oklch(0.81_0.010_250)]">
        {tech.name}
      </span>
    </div>
  );
}

export async function TechStrip() {
  const t = await getTranslations("TechStrip");

  return (
    // relative: paints above the NeonThread background filament
    <div className="relative border-y border-[var(--color-hairline)] bg-[oklch(0.155_0.015_265_/_0.5)]">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-10 md:py-14">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-[oklch(0.57_0.010_250)]">
          {t("heading")}
        </p>

        {/*
          Infinite marquee — pure CSS (@keyframes marquee in globals.css).
          The track renders the logo list TWICE; the keyframe translates -50%
          so the second copy lands exactly where the first started → seamless.
          Edge fade via mask-image. Pauses on hover. Reduced-motion neutralizes
          to a static, centered, scrollable row (clone hidden) in globals.css.
        */}
        <div className="marquee-mask overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track">
            {/* Copy 1 — one half of the track; pr-12 supplies the seam gap */}
            <div className="flex shrink-0 gap-x-12 pr-12">
              {uniqueBySlug.map((tech) => (
                <TechItem key={`a-${tech.slug}-${tech.name}`} tech={tech} />
              ))}
            </div>
            {/* Copy 2 — identical half, hidden under reduced motion */}
            <div className="flex shrink-0 gap-x-12 pr-12" aria-hidden="true" data-clone>
              {uniqueBySlug.map((tech) => (
                <TechItem key={`b-${tech.slug}-${tech.name}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
