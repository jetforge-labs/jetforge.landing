import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppEntry } from "./apps";
import { Ident, Phrase } from "./chapter-parts";
import { CheckmateShot, IphoneShot } from "./checkmate-shot";

/** Checkmate: the lighter, shorter chapter on a pale teal. Mac window and iPhone on the left, copy on the right. */
export async function CheckmateChapter({ app }: { app: AppEntry }) {
  const t = await getTranslations("Home.checkmate");
  const tApps = await getTranslations("Apps.checkmate");
  const rowIds = Object.keys(t.raw("rows") as Record<string, unknown>);

  return (
    <section className="ch ch-checkmate" data-app="checkmate" id="checkmate" aria-labelledby="checkmate-phrase">
      <div className="wrap cm-grid">
        <div className="cm-screens">
          <CheckmateShot label={t("shotLabel")} />
          <IphoneShot label={t("phoneLabel")} />
        </div>
        <div>
          <Phrase id="checkmate-phrase" text={t("phrase")} />
          <p className="lede">{t("lede")}</p>
          <ul className="rows">
            {rowIds.map((id) => (
              <li key={id}>
                <div>
                  <h4>{t(`rows.${id}.title`)}</h4>
                  <p>{t(`rows.${id}.text`)}</p>
                </div>
              </li>
            ))}
          </ul>
          <Ident icon={app.icon} name={tApps("name")} meta={t("meta")} />
          <div className="actions">
            <a className="btn btn-deep" href={app.href} data-track-event="download_click" data-track-product={app.slug} data-track-location="chapter">
              {t("ctaMac")} <span className="arrow" aria-hidden="true">&darr;</span>
            </a>
            {app.ios && (
              <>
                <a className="ios-badge" href={app.ios.url} aria-label={t("badgeLabel")} data-track-event="outbound_click" data-track-product={app.slug} data-track-location="app-store-badge">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Apple's badge artwork must stay untouched */}
                  <img src="/badges/app-store-en.svg" alt="" height={48} width={143} />
                </a>
                <Image className="ios-qr" src="/apps/checkmate-ios-qr.svg" alt="" width={72} height={72} unoptimized />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
