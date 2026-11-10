import { getTranslations } from "next-intl/server";
import type { AppEntry } from "./apps";
import { GoActions, Ident, Phrase, Signpost } from "./chapter-parts";
import { DiloShot } from "./dilo-shot";

/** Dilo, as a showcase: the widest stage. Sold at its own site, so no price or plans here. */
export async function DiloChapter({ app }: { app: AppEntry }) {
  const t = await getTranslations("Home.dilo");
  const tApps = await getTranslations("Apps.dilo");
  const name = tApps("name");

  return (
    <section className="ch ch-dilo on-dark" data-app="dilo" id="dilo" aria-labelledby="dilo-phrase">
      <div className="wrap">
        <div className="dilo-head">
          <Phrase id="dilo-phrase" text={t("phrase")} />
          <p className="lede">{t("lede")}</p>
        </div>
        <div className="dilo-stage">
          <DiloShot label={t("shotLabel")} />
        </div>
        <div className="dilo-foot">
          <Ident icon={app.icon} name={name} meta={t("meta")} />
          <GoActions app={app} ns="Home.dilo" name={name} />
        </div>

        <Signpost app={app} ns="Home.dilo" />
      </div>
    </section>
  );
}
