"use server";

import { getTranslations } from "next-intl/server";
import { TechLogo } from "./tech-logo";

// Simple Icons slugs + display names
// Colour: muted oklch(0.67 0.008 60) approximated as #a8a29e — lifted for visibility on dark bg
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

export async function TechStrip() {
  const t = await getTranslations("TechStrip");

  return (
    <div className="border-y border-[var(--color-hairline)] bg-[oklch(0.18_0.012_60_/_0.5)]">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-10 md:py-14">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-[oklch(0.55_0.008_60)]">
          {t("heading")}
        </p>
        {/*
          Grid at every breakpoint — 10 items divide evenly into each column count,
          so no orphan is mathematically possible:
          xs  (≥0px):    2 cols → 5 rows  (320/375/414px)
          sm  (≥640px):  5 cols → 2 rows  (640px and above, including desktop)
        */}
        <div className="grid grid-cols-2 place-items-center gap-x-6 gap-y-6 sm:grid-cols-5 sm:gap-y-8">
          {uniqueBySlug.map((tech) => (
            <div
              key={tech.slug + tech.name}
              className="group flex items-center gap-2 opacity-50 transition-opacity duration-200 hover:opacity-80"
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
              <span className="text-sm font-medium text-[oklch(0.60_0.008_60)] transition-colors duration-200 group-hover:text-[oklch(0.80_0.010_60)]">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
