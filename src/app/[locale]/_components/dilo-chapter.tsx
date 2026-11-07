import { getTranslations } from "next-intl/server";
import type { AppEntry } from "./apps";
import { Ident, Phrase, Plan } from "./chapter-parts";
import { DiloShot } from "./dilo-shot";

/** Dilo: the widest stage. The feature list is the price list, so it is grouped by plan. */
export async function DiloChapter({ app }: { app: AppEntry }) {
  const t = await getTranslations("Home.dilo");
  const tApps = await getTranslations("Apps.dilo");

  return (
    <section className="ch ch-dilo" data-app="dilo" id="dilo" aria-labelledby="dilo-phrase">
      <div className="wrap">
        <div className="dilo-top">
          <div>
            <Phrase id="dilo-phrase" text={t("phrase")} />
            <p className="lede">{t("lede")}</p>
            <Ident icon={app.icon} name={tApps("name")} meta={t("meta")} />
            <div className="actions">
              <a className="btn btn-accent" href={app.href}>
                {t("ctaTry")} <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
              {app.pro && (
                <a className="link-arrow" href={app.pro.url}>
                  {t("ctaPro")} <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </div>
          <DiloShot label={t("shotLabel")} />
        </div>

        <div className="plans">
          <Plan ns="Home.dilo.basic" variant="basic" />
          <Plan ns="Home.dilo.pro" variant="pro" />
        </div>
      </div>
    </section>
  );
}
