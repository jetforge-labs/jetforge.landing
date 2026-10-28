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
      </div>

      {app.slug === "checkmate" && <CheckmateShot label={label} />}
      {app.slug === "dilo" && <DiloShot label={label} />}
      {app.slug === "limitbar" && <LimitBarShot label={label} />}
    </section>
  );
}
