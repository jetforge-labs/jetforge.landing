import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppEntry } from "./apps";
import { GoActions, Ident, Phrase, Signpost } from "./chapter-parts";

/** Macbrow, as a showcase: the top edge of the section is the Mac's top edge and the open notch hangs from it. Sold at its own site, so no price or plans here. */
export async function MacbrowChapter({ app }: { app: AppEntry }) {
  const t = await getTranslations("Home.macbrow");
  const tApps = await getTranslations("Apps.macbrow");
  const name = tApps("name");

  return (
    <section className="ch ch-macbrow on-dark" data-app="macbrow" id="macbrow" aria-labelledby="macbrow-phrase">
      {/* The Mac's menu bar, recreated: decorative */}
      <div className="menubar" aria-hidden="true">
        <span className="apps"><b>Finder</b><span>File</span><span>Edit</span><span>View</span><span>Go</span></span>
        <span>Wed 11:18</span>
      </div>
      <div className="notch-stage">
        <Image className="panel" src="/apps/macbrow/home.png" width={667} height={235} sizes="(max-width: 640px) 100vw, 667px" alt={t("panelAlt")} />
      </div>
      <div className="wrap">
        <div className="mb-intro">
          <div>
            <Phrase id="macbrow-phrase" text={t("phrase")} />
            <Ident icon={app.icon} name={name} meta={t("meta")} />
          </div>
          <div>
            <p className="lede">{t("lede")}</p>
            <GoActions app={app} ns="Home.macbrow" name={name} />
          </div>
        </div>

        <article className="spot">
          <div>
            <p className="spot-k">{t("spot.shelf.k")}</p>
            <h3>{t("spot.shelf.title")}</h3>
            <p className="spot-text">{t("spot.shelf.text")}</p>
            <p className="spot-meta">{t("spot.shelf.meta")}</p>
          </div>
          <figure className="hang">
            <Image src="/apps/macbrow/shelf.png" width={667} height={223} sizes="(max-width: 640px) 100vw, 560px" alt={t("spot.shelf.alt")} />
          </figure>
        </article>

        <Signpost app={app} ns="Home.macbrow" />
      </div>
    </section>
  );
}
