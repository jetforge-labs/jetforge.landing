import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OTHER_APPS } from "./apps";

/** The apps without a chapter, set on a Dock: one card each. The home page reads no feeds, so the macOS version is the fallback in apps.ts. */
export async function MoreApps() {
  const t = await getTranslations("Home.more");
  const tApps = await getTranslations("Apps");

  return (
    <section className="wrap more" id="more" aria-labelledby="more-title">
      <div className="more-head">
        <div>
          <h2 id="more-title">{t("title", { count: OTHER_APPS.length })}</h2>
          <p>{t("text")}</p>
        </div>
        <Link className="btn btn-line" data-go="in" href="/apps">
          {t("all")} <span className="arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <ul className="dock">
        {OTHER_APPS.map((app) => {
          const name = tApps(`${app.slug}.name`);
          return (
            <li className="card" key={app.slug}>
              <div className="card-icon">
                <Image src={app.icon} alt="" width={76} height={76} />
              </div>
              <h3 translate="no">{name}</h3>
              <ul className="card-chips">
                {app.category === "DeveloperApplication" && <li>{t("developers")}</li>}
                <li>{t("macos", { version: app.minMacOS })}</li>
              </ul>
              <p>{tApps(`${app.slug}.line`)}</p>
              <a className="btn btn-line" data-go="file" href={app.href} data-track-event="download_click" data-track-product={app.slug} data-track-location="more-apps">
                {t("download")}
                <span className="vh"> {name}</span> <span className="arrow" aria-hidden="true">&darr;</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
