// One entry per app. A new app needs: an entry here, a [data-app] block in globals.css,
// a "Apps.<slug>" block in messages/en.json and a screenshot component in app-chapter.tsx.
export interface AppEntry {
  slug: "checkmate" | "dilo" | "limitbar";
  icon: string;
  /** schema.org category for the structured data. */
  category: "ProductivityApplication" | "DeveloperApplication";
  href: string;
}

export const APPS: readonly AppEntry[] = [
  {
    slug: "checkmate",
    icon: "/apps/checkmate-icon.png",
    category: "ProductivityApplication",
    // TODO: point to the Checkmate product page on Gumroad once it exists (general store for now).
    href: "https://jetforgelabs.gumroad.com",
  },
  {
    slug: "dilo",
    icon: "/apps/dilo-icon.png",
    category: "ProductivityApplication",
    href: "https://getdilo.co",
  },
  {
    slug: "limitbar",
    icon: "/apps/limitbar-icon.png",
    category: "DeveloperApplication",
    // TODO: point to the LimitBar product page on Gumroad once it exists (general store for now).
    href: "https://jetforgelabs.gumroad.com",
  },
] as const;
