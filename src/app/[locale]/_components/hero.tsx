import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { APPS } from "./apps";
import { StoreButton } from "./more-apps";

export async function Hero() {
  const t = await getTranslations("Hero");
  const tApps = await getTranslations("Apps");

  return (
    <section className="wrap hero tex" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title">
          {t("line1")}
          <br /> {t("line2")}
        </h1>
        <p className="sub">{t("sub")}</p>
        <div className="ctas">
          <a className="btn btn-ink" href="#apps">{t("ctaFind")}</a>
          <a className="btn btn-line" href="#friction">{t("ctaSuggest")}</a>
        </div>
        <ul className="pills" aria-label={t("appsLabel")}>
          {APPS.map((app) => (
            <li key={app.slug}>
              <a className="pill" data-app={app.slug} href={`#${app.slug}`}>
                <Image src={app.icon} alt="" width={34} height={34} />
                {tApps(`${app.slug}.name`)}
              </a>
            </li>
          ))}
          <li>
            <StoreButton />
          </li>
        </ul>
      </div>
    </section>
  );
}
