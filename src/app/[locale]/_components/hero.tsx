import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { APPS, OTHER_APPS } from "./apps";

export async function Hero() {
  const t = await getTranslations("Hero");
  const tApps = await getTranslations("Apps");

  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <h1 id="hero-title">
        {t("line1")}
        <br /> <span className="mark">{t("line2")}</span>
      </h1>
      <p className="sub">{t("sub")}</p>
      <ul className="pills" aria-label={t("appsLabel")}>
        {APPS.map((app) => (
          <li key={app.slug}>
            <a className="pill" data-app={app.slug} href={`#${app.slug}`}>
              <Image src={app.icon} alt="" width={32} height={32} />
              {tApps(`${app.slug}.name`)}
            </a>
          </li>
        ))}
      </ul>
      <a className="link-arrow more-link" href="#more">
        {t("moreLink", { count: OTHER_APPS.length })} <span aria-hidden="true">&darr;</span>
      </a>
    </section>
  );
}
