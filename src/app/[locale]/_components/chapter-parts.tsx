import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { siteHost, type AppEntry } from "./apps";

/** The chapter's big quote: the opening mark hangs into the margin. */
export function Phrase({ id, text }: { id: string; text: string }) {
  return (
    <h2 className="phrase" id={id}>
      <span className="q q-open" aria-hidden="true">&ldquo;</span>
      {text}
      <span className="q" aria-hidden="true">&rdquo;</span>
    </h2>
  );
}

export function Ident({ icon, name, meta }: { icon: string; name: string; meta: string }) {
  return (
    <div className="ident">
      <Image src={icon} alt="" width={56} height={56} />
      <p>
        {name}
        <small>{meta}</small>
      </p>
    </div>
  );
}

/**
 * Exit actions of an app that has its own site, same in every such chapter: the filled one leaves for the app's site (↗, new domain),
 * the outline one downloads the file (↓). The arrow says where each one goes. Messages under `ns`: ctaSite, ctaDownload, fine.
 */
export async function GoActions({ app, ns, name }: { app: AppEntry; ns: string; name: string }) {
  const t = await getTranslations(ns);
  if (!app.siteUrl) return null;
  const host = siteHost(app.siteUrl);

  return (
    <>
      <div className="go">
        <a className="btn btn-accent" data-go="out" href={app.siteUrl} data-track-event="outbound_click" data-track-product={app.slug} data-track-location="chapter" data-track-destination={host}>
          {t("ctaSite", { domain: host })} <span className="arrow" aria-hidden="true">&#8599;</span>
        </a>
        <a className="btn btn-line" data-go="file" href={app.href} data-track-event="download_click" data-track-product={app.slug} data-track-location="chapter">
          {t("ctaDownload")}
          <span className="vh"> ({name})</span> <span className="arrow" aria-hidden="true">&darr;</span>
        </a>
      </div>
      <p className="fine">{t("fine", { days: app.pro?.trialDays ?? 14 })}</p>
    </>
  );
}

/** Closes a chapter: the app's site as an index (one link per section, no figures). Messages under `ns`: signpost.{tagline,label,links.<key>}. */
export async function Signpost({ app, ns }: { app: AppEntry; ns: string }) {
  const t = await getTranslations(`${ns}.signpost`);
  if (!app.siteUrl || !app.siteSections) return null;
  const host = siteHost(app.siteUrl);

  return (
    <div className="signpost">
      <p className="signpost-dest">
        <Image src={app.icon} alt="" width={32} height={32} />
        <span>
          <b>{host}</b>
          <small>{t("tagline")}</small>
        </span>
      </p>
      <ul aria-label={t("label", { domain: host })}>
        {app.siteSections.map((section) => (
          <li key={section.key}>
            <a data-go="out" href={`${app.siteUrl}/${section.hash}`} data-track-event="outbound_click" data-track-product={app.slug} data-track-location="signpost" data-track-destination={host}>
              {t(`links.${section.key}`)} <span className="ne" aria-hidden="true">&#8599;</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
