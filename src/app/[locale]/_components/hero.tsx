import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { APPS, OTHER_APPS, type AppEntry } from "./apps";

const appBySlug = (slug: string): AppEntry => APPS.find((app) => app.slug === slug)!;

/**
 * The hero is a Mac screen: Dilo is the focal window (an email filling in, with its bar over it), Macbrow is the open notch,
 * Checkmate a small task window. Each object links to its chapter. The scene is decorative and aria-hidden: the link text is the app name.
 */
export async function Hero() {
  const t = await getTranslations("Hero");
  const tApps = await getTranslations("Apps");
  const dilo = appBySlug("dilo");
  const macbrow = appBySlug("macbrow");
  const checkmate = appBySlug("checkmate");

  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <h1 id="hero-title">
        <span className="l">{t("line1")}</span>{" "}
        <span className="l">
          <span className="mark">{t("line2")}</span>
        </span>
      </h1>
      <div className="hero-copy">
        <p className="sub">{t("sub")}</p>
        <a className="text-link more-link" href="#more">
          {t("moreLink", { count: OTHER_APPS.length })} <span aria-hidden="true">&darr;</span>
        </a>
      </div>
      <ul className="stage" aria-label={t("appsLabel")}>
        <li>
          <a translate="no" className="obj o-dilo" data-app="dilo" href="#dilo">
            <span className="dwin" aria-hidden="true">
              <span className="tb"><i /><i /><i /></span>
              <span className="fl"><s /><s style={{ "--w": "30%" } as CSSProperties} /></span>
              <span className="fl"><s /><s style={{ "--w": "44%" } as CSSProperties} /></span>
              <span className="bd">
                <s style={{ "--w": "24%" } as CSSProperties} />
                <s className="hl" style={{ "--w": "92%" } as CSSProperties} />
                <s className="hl" style={{ "--w": "58%" } as CSSProperties} />
                <s className="cursor" style={{ "--w": "2px" } as CSSProperties} />
              </span>
            </span>
            <span className="dhud">
              <Image src={dilo.icon} alt="" width={52} height={52} priority />
              {tApps("dilo.name")}
              <span className="wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
            </span>
          </a>
        </li>
        <li>
          <a translate="no" className="obj o-macbrow" data-app="macbrow" href="#macbrow">
            <Image src={macbrow.icon} alt="" width={44} height={44} priority />
            {tApps("macbrow.name")}
            <span className="eq" aria-hidden="true"><i /><i /><i /></span>
          </a>
        </li>
        <li>
          <a translate="no" className="obj o-checkmate" data-app="checkmate" href="#checkmate">
            <span className="tb" aria-hidden="true"><i /><i /><i /></span>
            <span aria-hidden="true">
              <span className="rw" style={{ "--w": "66%" } as CSSProperties}><b /><s /></span>
              <span className="rw" style={{ "--w": "80%" } as CSSProperties}><b /><s /></span>
              <span className="rw" style={{ "--w": "52%" } as CSSProperties}><b /><s /></span>
            </span>
            <span className="nm">
              <Image src={checkmate.icon} alt="" width={28} height={28} />
              {tApps("checkmate.name")}
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
