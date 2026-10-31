import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { APPS } from "./apps";

interface SiteFooterProps {
  home?: boolean;
}

export async function SiteFooter({ home = false }: SiteFooterProps) {
  const t = await getTranslations("Footer");
  const tApps = await getTranslations("Apps");
  const base = home ? "" : "/";

  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div className="foot-brand">
          <Link className="wordmark" href="/" aria-label={t("backToTop")}>
            Jetforge Labs
          </Link>
          <p>{t("tagline")}</p>
        </div>
        <div className="foot-cols">
          <nav aria-labelledby="foot-apps">
            <h3 id="foot-apps">{t("appsHeading")}</h3>
            <ul>
              {APPS.map((app) => (
                <li key={app.slug}>
                  <Link href={`${base}#${app.slug}`}>{tApps(`${app.slug}.name`)}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="foot-studio">
            <h3 id="foot-studio">{t("studioHeading")}</h3>
            <ul>
              <li><Link href={`${base}#about`}>{t("about")}</Link></li>
              <li><Link href={`${base}#custom`}>{t("custom")}</Link></li>
              <li><Link href={`${base}#contact`}>{t("contact")}</Link></li>
            </ul>
          </nav>
          <div>
            <h3>{t("legalHeading")}</h3>
            <ul>
              <li><Link href="/privacy">{t("privacy")}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap foot-bar">
        <p>{t("copyright")}</p>
        <p className="foot-legal">{t("appleTrademark")}</p>
      </div>
    </footer>
  );
}
