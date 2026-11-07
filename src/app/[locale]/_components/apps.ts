// The single list of apps. Every app appears on /apps; the three with `featured` also get a chapter on the home page.
// A new app needs: an entry here, an "Apps.<slug>" block (name, line) in messages/en.json, an icon in public/apps/,
// and an appcast URL in src/lib/appcast.ts. A featured one also needs a [data-app] block in globals.css and a
// chapter component wired into app-chapter.tsx. The order of ALL_APPS is the order of the home chapters and of /apps.
// Checkmate's iPhone app. Changing it? Run `node scripts/gen-checkmate-qr.mjs` to regenerate the QR.
export const CHECKMATE_APP_STORE_URL = "https://apps.apple.com/app/id6828836039";

// Dilo Pro is sold on Dilo's own site.
export const DILO_PRICING_URL = "https://getdilo.co/#pricing";

// Where "Buy Pro" for Macbrow goes. The app itself sends buyers to jetforgelabs.com/apps.
export const MACBROW_PRO_URL = "https://jetforgelabs.gumroad.com/l/macbrow";

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
  /** The app's own site, when it has one (Dilo). */
  siteUrl?: string;
  /** Paid tier: where to buy it, and, when there is one, the trial and the price for the structured data. */
  pro?: { url: string; trialDays?: number; price?: { amount: string; currency: string } };
  /** iPhone companion app: App Store link, minimum iOS major version. */
  ios?: { url: string; minIOS: number };
}

export const ALL_APPS: readonly AppEntry[] = [
  { slug: "dilo", icon: "/apps/dilo-icon.png", category: "ProductivityApplication", minMacOS: 26, featured: true, href: "https://getdilo.co", siteUrl: "https://getdilo.co", pro: { url: DILO_PRICING_URL, price: { amount: "49", currency: "EUR" } } },
  { slug: "macbrow", icon: "/apps/macbrow-icon.png", category: "UtilitiesApplication", minMacOS: 15, featured: true, href: "/download/macbrow", pro: { url: MACBROW_PRO_URL, trialDays: 14, price: { amount: "7.99", currency: "EUR" } } },
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
