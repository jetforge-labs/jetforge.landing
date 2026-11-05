// The single list of apps. Every app appears on /apps; the three with `featured` also get a chapter on the home page.
// A new app needs: an entry here, an "Apps.<slug>" block (name, line) in messages/en.json, an icon in public/apps/,
// and an appcast URL in src/lib/appcast.ts. A featured one also needs a [data-app] block in globals.css and a
// screenshot component in app-chapter.tsx.
export type AppSlug = "berth" | "checkmate" | "deepspy" | "dilo" | "limitbar" | "macbrow" | "tide";

export interface AppEntry {
  slug: AppSlug;
  icon: string;
  /** schema.org category for the structured data. */
  category: "ProductivityApplication" | "DeveloperApplication" | "UtilitiesApplication";
  /** Fallback when the appcast carries no minimumSystemVersion. Major version only. */
  minMacOS: number;
  /** Has a chapter on the home page. */
  featured: boolean;
  /** Primary link of the home chapter: the direct download, or the app's own site. */
  href: string;
  /** The app has its own site and a paid tier (Dilo Pro). */
  pro?: { url: string };
}

export const ALL_APPS: readonly AppEntry[] = [
  { slug: "checkmate", icon: "/apps/checkmate-icon.png", category: "ProductivityApplication", minMacOS: 15, featured: true, href: "/download/checkmate" },
  { slug: "dilo", icon: "/apps/dilo-icon.png", category: "ProductivityApplication", minMacOS: 26, featured: true, href: "https://getdilo.co", pro: { url: "https://getdilo.co" } },
  { slug: "limitbar", icon: "/apps/limitbar-icon.png", category: "DeveloperApplication", minMacOS: 14, featured: true, href: "/download/limitbar" },
  { slug: "berth", icon: "/apps/berth-icon.png", category: "UtilitiesApplication", minMacOS: 15, featured: false, href: "/download/berth" },
  { slug: "macbrow", icon: "/apps/macbrow-icon.png", category: "UtilitiesApplication", minMacOS: 15, featured: false, href: "/download/macbrow" },
  { slug: "deepspy", icon: "/apps/deepspy-icon.png", category: "UtilitiesApplication", minMacOS: 15, featured: false, href: "/download/deepspy" },
  { slug: "tide", icon: "/apps/tide-icon.png", category: "DeveloperApplication", minMacOS: 15, featured: false, href: "/download/tide" },
];

/** The apps that get a chapter on the home page. */
export const APPS: readonly AppEntry[] = ALL_APPS.filter((app) => app.featured);

export const isAppSlug = (value: string): value is AppSlug => ALL_APPS.some((app) => app.slug === value);
