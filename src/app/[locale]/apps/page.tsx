import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getRelease } from "@/lib/appcast";
import { ALL_APPS, siteHost } from "../_components/apps";
import { AppsJsonLd } from "../_components/json-ld";
import { SiteFooter } from "../_components/site-footer";
import { SiteNav } from "../_components/site-nav";
import type { Metadata } from "next";

// Release data (minimum macOS) comes from each app's appcast; the page is rebuilt in the background at the same pace as the fetch cache
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

export default async function AppsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AppsPage");
  const tApps = await getTranslations("Apps");
  const releases = await Promise.all(ALL_APPS.map((app) => getRelease(app.slug)));

  return (
    <>
      <AppsJsonLd apps={ALL_APPS} live />
      <SiteNav />
      <main id="main">
        <div className="wrap page-head apps-head">
          <h1>{t.rich("heading", { mark: (chunks) => <span className="mark">{chunks}</span> })}</h1>
          <p className="page-lead">{t("lead")}</p>
        </div>

        <section className="wrap apps-list" aria-label={t("listLabel")}>
          <ul className="app-grid">
            {ALL_APPS.map((app, i) => {
              const release = releases[i];
              const name = tApps(`${app.slug}.name`);
              return (
                <li className="app-card" id={app.slug} data-app={app.featured ? app.slug : undefined} key={app.slug}>
                  <div className="app-card-head">
                    <Image src={app.icon} alt="" width={72} height={72} />
                    <div>
                      <h2>{name}</h2>
                      <p className="meta">
                        <span>{t("macos", { version: release?.minMacOS ?? app.minMacOS })}</span>
                        {app.ios && <span>{t("ios", { version: app.ios.minIOS })}</span>}
                        {!app.pro && <span className="free">{t("free")}</span>}
                      </p>
                    </div>
                  </div>
                  <p className="app-card-line">{tApps(`${app.slug}.line`)}</p>
                  {app.siteUrl && app.pro?.trialDays && (
                    <p className="app-card-note">
                      {tApps(`${app.slug}.proNote`, { days: app.pro.trialDays })}
                      <br />
                      <a data-go="out" href={`${app.siteUrl}/#pricing`} data-track-event="outbound_click" data-track-product={app.slug} data-track-location="apps" data-track-destination={siteHost(app.siteUrl)}>
                        {t("pricingLink", { domain: siteHost(app.siteUrl) })} <span className="ne" aria-hidden="true">&#8599;</span>
                      </a>
                    </p>
                  )}
                  <div className="app-card-actions">
                    <div className="app-card-stores">
                      <a className="btn btn-ink btn-store" data-go="file" href={`/download/${app.slug}`} data-track-event="download_click" data-track-product={app.slug} data-track-location="apps">
                        {t("download")}
                        <span className="vh"> {t("forApp", { name })}</span>
                        <span className="arrow" aria-hidden="true">&darr;</span>
                      </a>
                      {app.ios && (
                        <a className="ios-badge" href={app.ios.url} aria-label={t("iosBadgeLabel", { name })} data-track-event="outbound_click" data-track-product={app.slug} data-track-location="apps">
                          {/* eslint-disable-next-line @next/next/no-img-element -- Apple's badge artwork must stay untouched */}
                          <img src="/badges/app-store-en.svg" alt="" height={40} width={119} />
                        </a>
                      )}
                      {app.siteUrl && (
                        <a className="btn btn-line" data-go="out" href={app.siteUrl} data-track-event="outbound_click" data-track-product={app.slug} data-track-location="apps" data-track-destination={siteHost(app.siteUrl)}>
                          {t("visitSite", { domain: siteHost(app.siteUrl) })}
                          <span className="vh"> {t("forApp", { name })}</span> <span className="arrow" aria-hidden="true">&#8599;</span>
                        </a>
                      )}
                    </div>
                    {app.featured && (
                      <Link className="text-link see-more" href={`/#${app.slug}`}>
                        {t("more")}
                        <span className="vh"> {t("forApp", { name })}</span>
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="apps-note">{t("note")}</p>
          <p className="apps-note apps-store">
            {t.rich("store", {
              link: (chunks) => (
                <a className="text-link" href="https://jetforgelabs.gumroad.com" target="_blank" rel="noopener noreferrer">
                  {chunks}
                  <span className="arrow-ne" aria-hidden="true">&#8599;</span>
                  <span className="vh"> {t("newTab")}</span>
                </a>
              ),
            })}
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
