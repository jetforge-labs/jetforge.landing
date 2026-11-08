import { getTranslations } from "next-intl/server";
import type { AppEntry } from "./apps";
import { Ident, Phrase, Plan } from "./chapter-parts";
import { DiloShot } from "./dilo-shot";

/** Dilo: the widest stage. The feature list is the price list, so it is grouped by plan. */
export async function DiloChapter({ app }: { app: AppEntry }) {
  const t = await getTranslations("Home.dilo");
  const tApps = await getTranslations("Apps.dilo");
  const trialDays = app.pro?.trialDays ?? 14;

  return (
    <section className="ch ch-dilo" data-app="dilo" id="dilo" aria-labelledby="dilo-phrase">
      <div className="wrap">
        <div className="dilo-top">
          <div>
            <Phrase id="dilo-phrase" text={t("phrase")} />
            <p className="lede">{t("lede")}</p>
            <Ident icon={app.icon} name={tApps("name")} meta={t("meta")} />
            <p className="trial-line">{t("trialLine", { days: trialDays })}</p>
            <div className="offer">
              <a className="btn btn-accent" href={app.href} data-track-event="outbound_click" data-track-product={app.slug} data-track-location="chapter">
                {t("ctaMore")} <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
              <div className="price">
                <small>{t("priceLabel")}</small>
                <b>{t("price")}</b>
                <a className="link-arrow" href={`/download/${app.slug}`} data-track-event="download_click" data-track-product={app.slug} data-track-location="chapter">
                  {t("ctaDownload", { days: trialDays })}
                  <span className="vh"> ({tApps("name")})</span> <span aria-hidden="true">&darr;</span>
                </a>
              </div>
            </div>
            <p className="fine">{t("fine")}</p>
          </div>
          <DiloShot label={t("shotLabel")} />
        </div>

        <div className="plans">
          <Plan ns="Home.dilo.basic" variant="basic" />
          <Plan ns="Home.dilo.pro" variant="pro" />
        </div>
        <div className="plans-after">
          <p>{t("afterNote")}</p>
        </div>
      </div>
    </section>
  );
}
