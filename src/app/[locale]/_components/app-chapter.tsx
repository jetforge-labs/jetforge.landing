import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppEntry } from "./apps";
import { CheckmateShot } from "./checkmate-shot";
import { DiloShot } from "./dilo-shot";
import { LimitBarShot } from "./limitbar-shot";

/** One full-screen chapter per app. Colours come from the [data-app] block in globals.css. */
export async function AppChapter({ app }: { app: AppEntry }) {
  const t = await getTranslations(`Apps.${app.slug}`);
  const meta = t.raw("meta") as string[];
  const label = t("shotLabel");
  const headingId = `${app.slug}-phrase`;

  return (
    <section className="chapter" data-app={app.slug} id={app.slug} aria-labelledby={headingId}>
      <div className="copy">
        <h2 className="phrase" id={headingId}>
          <span className="q q-open" aria-hidden="true">&ldquo;</span>
          {t("phrase")}
          <span className="q" aria-hidden="true">&rdquo;</span>
        </h2>
        <p className="line">{t("line")}</p>
        <div className="app">
          <Image src={app.icon} alt="" width={64} height={64} />
          <div>
            <p className="app-name">{t("name")}</p>
            <p className="meta">
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          </div>
        </div>
        <a className="btn btn-accent" href={app.href}>
          {t("cta")} <span className="arrow" aria-hidden="true">&rarr;</span>
        </a>
        {app.ios && (
          <div className="ios">
            <Image className="ios-qr" src="/apps/checkmate-ios-qr.svg" alt="" width={120} height={120} unoptimized />
            <div className="ios-body">
              <p className="ios-text">{t("ios.text")}</p>
              <a className="ios-badge" href={app.ios.url} aria-label={t("ios.badgeLabel")}>
                {/* eslint-disable-next-line @next/next/no-img-element -- Apple's badge artwork must stay untouched */}
                <img src="/badges/app-store-en.svg" alt="" height={44} width={131} />
              </a>
            </div>
          </div>
        )}
      </div>

      {app.slug === "checkmate" && <CheckmateShot label={label} />}
      {app.slug === "dilo" && <DiloShot label={label} />}
      {app.slug === "limitbar" && <LimitBarShot label={label} />}
    </section>
  );
}
