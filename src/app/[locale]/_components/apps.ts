// The single list of apps. Every app appears on /apps; the three with `featured` also get a chapter on the home page.
// A new app needs: an entry here, an "Apps.<slug>" block (name, line) in messages/en.json, an icon in public/apps/,
// and an appcast URL in src/lib/appcast.ts. A featured one also needs a [data-app] block in globals.css and a
// chapter component wired into app-chapter.tsx. The order of ALL_APPS is the order of the home chapters and of /apps.
// Checkmate's iPhone app. Changing it? Run `node scripts/gen-checkmate-qr.mjs` to regenerate the QR.
export const CHECKMATE_APP_STORE_URL = "https://apps.apple.com/app/id6828836039";

// Apps with their own site (`siteUrl`: Dilo, Macbrow) are shown here, not sold: no price, no plans, no checkout link on jetforgelabs.com.
// Pricing lives on the app's site, so the entry has no field that could paint a price or a payment URL.

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
  /** The direct download. Apps with a `siteUrl` still keep it, as the secondary action. */
  href: string;
  /** The app's own site, when it has one (Dilo, Macbrow). Presence switches the app to the "showcase" pattern: no price, no plans. */
  siteUrl?: string;
  /** Anchors on `siteUrl` for the signpost that closes the chapter, in order. `key` picks the label in Home.<slug>.signpost.links. */
  siteSections?: readonly { key: "features" | "dictation" | "meetings" | "pricing" | "faq"; hash: string }[];
  /** Has a paid tier. The price itself lives on `siteUrl`, never here. */
  pro?: { trialDays?: number };
  /** iPhone companion app: App Store link, minimum iOS major version. */
  ios?: { url: string; minIOS: number };
}

export const ALL_APPS: readonly AppEntry[] = [
  { slug: "dilo", icon: "/apps/dilo-icon.png", category: "ProductivityApplication", minMacOS: 26, featured: true, href: "/download/dilo", siteUrl: "https://getdilo.co", siteSections: [{ key: "dictation", hash: "#dictation" }, { key: "meetings", hash: "#transcribe" }, { key: "pricing", hash: "#pricing" }], pro: { trialDays: 14 } },
  { slug: "macbrow", icon: "/apps/macbrow-icon.png", category: "UtilitiesApplication", minMacOS: 15, featured: true, href: "/download/macbrow", siteUrl: "https://macbrow.co", siteSections: [{ key: "features", hash: "#screens" }, { key: "pricing", hash: "#pricing" }, { key: "faq", hash: "#faq" }], pro: { trialDays: 14 } },
  { slug: "checkmate", icon: "/apps/checkmate-icon.png", category: "ProductivityApplication", minMacOS: 15, featured: true, href: "/download/checkmate", ios: { url: CHECKMATE_APP_STORE_URL, minIOS: 18 } },
  { slug: "limitbar", icon: "/apps/limitbar-icon.png", category: "DeveloperApplication", minMacOS: 14, featured: false, href: "/download/limitbar" },
  { slug: "berth", icon: "/apps/berth-icon.png", category: "UtilitiesApplication", minMacOS: 15, featured: false, href: "/download/berth" },
  { slug: "deepspy", icon: "/apps/deepspy-icon.png", category: "UtilitiesApplication", minMacOS: 15, featured: false, href: "/download/deepspy" },
  { slug: "tide", icon: "/apps/tide-icon.png", category: "DeveloperApplication", minMacOS: 15, featured: false, href: "/download/tide" },
];

/** The apps that get a chapter on the home page. */
export const APPS: readonly AppEntry[] = ALL_APPS.filter((app) => app.featured);

/** The rest: a card each in the home page's "more apps" grid. */
export const OTHER_APPS: readonly AppEntry[] = ALL_APPS.filter((app) => !app.featured);

export const isAppSlug = (value: string): value is AppSlug => ALL_APPS.some((app) => app.slug === value);

/** Host of the app's own site, for labels and the `destination` of outbound_click ("macbrow.co"). */
export const siteHost = (siteUrl: string) => new URL(siteUrl).hostname;
