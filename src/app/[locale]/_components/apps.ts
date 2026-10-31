// One entry per app. A new app needs: an entry here, a [data-app] block in globals.css,
// a "Apps.<slug>" block in messages/en.json and a screenshot component in app-chapter.tsx.
// TODO: real App Store URL once Checkmate iOS is live (expected https://apps.apple.com/app/id6828836039).
// Going live: change this constant, then run `node scripts/gen-checkmate-qr.mjs` to regenerate the QR.
export const CHECKMATE_APP_STORE_URL = "https://apps.apple.com/app/id0000000000";

export interface AppEntry {
  slug: "checkmate" | "dilo" | "limitbar";
  icon: string;
  /** schema.org category for the structured data. */
  category: "ProductivityApplication" | "DeveloperApplication";
  href: string;
  /** schema.org operatingSystem. */
  os: string;
  /** iPhone companion app: shows the App Store badge (and a QR on desktop pointers) under the main CTA. */
  ios?: { url: string };
}

export const APPS: readonly AppEntry[] = [
  {
    slug: "checkmate",
    icon: "/apps/checkmate-icon.png",
    category: "ProductivityApplication",
    os: "macOS 15, iOS 18",
    ios: { url: CHECKMATE_APP_STORE_URL },
    // TODO: point to the Checkmate product page on Gumroad once it exists (general store for now).
    href: "https://jetforgelabs.gumroad.com",
  },
  {
    slug: "dilo",
    icon: "/apps/dilo-icon.png",
    category: "ProductivityApplication",
    os: "macOS 26",
    href: "https://getdilo.co",
  },
  {
    slug: "limitbar",
    icon: "/apps/limitbar-icon.png",
    category: "DeveloperApplication",
    os: "macOS 14",
    // TODO: point to the LimitBar product page on Gumroad once it exists (general store for now).
    href: "https://jetforgelabs.gumroad.com",
  },
] as const;
