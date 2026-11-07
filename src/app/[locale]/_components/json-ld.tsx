import { getTranslations } from "next-intl/server";
import { getRelease } from "@/lib/appcast";
import type { AppEntry } from "./apps";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** One SoftwareApplication per app. With `live`, the download link comes from the appcast. */
export async function AppsJsonLd({ apps, live = false }: { apps: readonly AppEntry[]; live?: boolean }) {
  const tApps = await getTranslations("Apps");
  // Only /apps reads the feeds; the home page must not wait on them.
  const releases = await Promise.all(apps.map((app) => (live ? getRelease(app.slug) : null)));

  return (
    <>
      {apps.map((app, i) => {
        const release = releases[i];
        return (
          <JsonLd
            key={app.slug}
            data={{
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: tApps(`${app.slug}.name`),
              description: tApps(`${app.slug}.line`),
              applicationCategory: app.category,
              operatingSystem: app.ios ? "macOS, iOS" : "macOS",
              operatingSystemVersion: `${release?.minMacOS ?? app.minMacOS}+`,
              url: app.siteUrl ?? `https://jetforgelabs.com/apps#${app.slug}`,
              image: `https://jetforgelabs.com${app.icon}`,
              offers: app.pro?.price
                ? [
                    { "@type": "Offer", price: "0", priceCurrency: app.pro.price.currency },
                    { "@type": "Offer", price: app.pro.price.amount, priceCurrency: app.pro.price.currency },
                  ]
                : { "@type": "Offer", price: "0", priceCurrency: "USD" },
              publisher: { "@type": "Organization", name: "Jetforge Labs" },
              ...(release && {
                downloadUrl: app.ios
                  ? [`https://jetforgelabs.com/download/${app.slug}`, app.ios.url]
                  : `https://jetforgelabs.com/download/${app.slug}`,
              }),
              ...(!release && app.ios && { downloadUrl: app.ios.url }),
            }}
          />
        );
      })}
    </>
  );
}
