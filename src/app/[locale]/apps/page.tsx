import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getRelease } from "@/lib/appcast";
import { ALL_APPS } from "../_components/apps";
import { AppsJsonLd } from "../_components/json-ld";
import { SiteFooter } from "../_components/site-footer";
import { SiteNav } from "../_components/site-nav";
import type { Metadata } from "next";

// Versions come from each app's appcast; the page is rebuilt in the background at the same pace as the fetch cache
// (APPCAST_REVALIDATE in src/lib/appcast.ts). Next needs a literal here.
export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AppsPage" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: { canonical: "/apps" },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/apps",
      siteName: "Jetforge Labs",
      title: `${t("title")} | Jetforge Labs`,
      description: t("metaDescription"),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: tMeta("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | Jetforge Labs`,
      description: t("metaDescription"),
      images: ["/opengraph-image"],
    },
  };
}

export default async function AppsPage() {
  const t = await getTranslations("AppsPage");
  const tApps = await getTranslations("Apps");
  const releases = await Promise.all(ALL_APPS.map((app) => getRelease(app.slug)));

  return (
    <>
      <AppsJsonLd apps={ALL_APPS} />
      <SiteNav />
      <main id="main">
        <div className="wrap page-head tex">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1>{t("title")}</h1>
          <p className="page-lead">{t("lead")}</p>
        </div>

        <section className="wrap apps-list" aria-label={t("listLabel")}>
          <ul className="app-grid">
            {ALL_APPS.map((app, i) => {
              const release = releases[i];
              const name = tApps(`${app.slug}.name`);
              return (
                <li className="app-card" id={app.slug} key={app.slug}>
                  <div className="app-card-head">
                    <Image src={app.icon} alt="" width={72} height={72} />
                    <div>
                      <h2>{name}</h2>
                      <p className="meta">
                        <span>{t("macos", { version: release?.minMacOS ?? app.minMacOS })}</span>
                        {release && <span>{t("version", { version: release.version })}</span>}
                        <span>{app.pro ? t("basicFree") : t("free")}</span>
                      </p>
                    </div>
                  </div>
                  <p className="app-card-line">{tApps(`${app.slug}.line`)}</p>
                  <div className="app-card-actions">
                    <a className="btn btn-ink btn-store" href={`/download/${app.slug}`} aria-label={t("downloadLabel", { name })}>
                      {t("download")}
                      <span className="arrow" aria-hidden="true">&darr;</span>
                    </a>
                    {app.pro && (
                      <a className="text-link" href={app.pro.url}>
                        {t("proAvailable")}
                      </a>
                    )}
                    {app.featured && (
                      <Link className="text-link" href={`/#${app.slug}`} aria-label={t("moreLabel", { name })}>
                        {t("more")}
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="apps-note">{t("note")}</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
