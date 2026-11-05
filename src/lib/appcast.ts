import type { AppSlug } from "@/app/[locale]/_components/apps";

// Public Sparkle feeds, the same ones each app checks (SUFeedURL). Dilo's lives on its own domain.
const FEEDS: Record<AppSlug, string> = {
  berth: "https://jetforge-labs.github.io/berth-updates/appcast.xml",
  checkmate: "https://jetforge-labs.github.io/checkmate-updates/appcast.xml",
  deepspy: "https://jetforge-labs.github.io/deepspy-updates/appcast.xml",
  dilo: "https://updates.jetforgelabs.com/dilo/appcast.xml",
  limitbar: "https://jetforge-labs.github.io/limitbar-updates/appcast.xml",
  macbrow: "https://jetforge-labs.github.io/macbrow-updates/appcast.xml",
  tide: "https://jetforge-labs.github.io/tide-updates/appcast.xml",
};

/** A new release shows up on the site within this many seconds, no redeploy. */
export const APPCAST_REVALIDATE = 3600;

export interface Release {
  version: string;
  /** Direct URL of the notarized DMG. */
  downloadUrl: string;
  /** Major macOS version from sparkle:minimumSystemVersion, when the feed has one. */
  minMacOS: number | null;
}

/** Where to send people when the feed can't be read. */
export const releasesPage = (slug: AppSlug) => `https://github.com/jetforge-labs/${slug}-updates/releases/latest`;

const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}>\\s*([^<]+?)\\s*</${name}>`))?.[1] ?? null;

/** Only ever redirect to this app's own release assets, whatever the feed says. */
const isOwnAsset = (slug: AppSlug, url: string) =>
  url.startsWith(`https://github.com/jetforge-labs/${slug}-updates/releases/download/`);

/** Newest stable item of a Sparkle appcast: full-DMG enclosure (deltas ignored), highest build number. */
export function parseAppcast(slug: AppSlug, xml: string): Release | null {
  let best: (Release & { build: number }) | null = null;

  for (const [, raw] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    if (raw.includes("<sparkle:channel>")) continue;
    const item = raw.replace(/<sparkle:deltas>[\s\S]*?<\/sparkle:deltas>/, "");
    const url = item.match(/<enclosure[^>]*\surl="([^"]+)"/)?.[1];
    const version = tag(item, "sparkle:shortVersionString") ?? tag(item, "title");
    const build = Number(tag(item, "sparkle:version"));
    if (!url || !version || !Number.isFinite(build) || !isOwnAsset(slug, url)) continue;

    if (!best || build > best.build) {
      const min = parseInt(tag(item, "sparkle:minimumSystemVersion") ?? "", 10);
      best = { build, version, downloadUrl: url, minMacOS: Number.isNaN(min) ? null : min };
    }
  }

  return best && { version: best.version, downloadUrl: best.downloadUrl, minMacOS: best.minMacOS };
}

/** Latest release of an app, or null if the feed is unreachable or unreadable. Cached for an hour. */
export async function getRelease(slug: AppSlug): Promise<Release | null> {
  try {
    const res = await fetch(FEEDS[slug], {
      next: { revalidate: APPCAST_REVALIDATE },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return parseAppcast(slug, await res.text());
  } catch {
    return null;
  }
}
