import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OTHER_APPS } from "./apps";

/** The apps without a chapter: one card each. The home page reads no feeds, so the macOS version is the fallback in apps.ts. */
export async function MoreApps() {
  const t = await getTranslations("Home.more");
  const tApps = await getTranslations("Apps");

  return (
    <section className="wrap more" id="more" aria-labelledby="more-title">
      <div className="more-head">
        <div>
          <h2 id="more-title">{t("title")}</h2>
          <p>{t("text")}</p>
        </div>
        <Link className="link-arrow" href="/apps">
          {t("all")} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <ul className="cards">
        {OTHER_APPS.map((app) => {
          const name = tApps(`${app.slug}.name`);
          return (
            <li className="card" key={app.slug}>
              <div className="card-head">
                <Image src={app.icon} alt="" width={56} height={56} />
                <div>
                  <h3>{name}</h3>
                  <ul className="card-chips">
                    {app.category === "DeveloperApplication" && <li>{t("developers")}</li>}
                    <li>{t("macos", { version: app.minMacOS })}</li>
                  </ul>
                </div>
              </div>
              <p>{tApps(`${app.slug}.line`)}</p>
              <a className="link-arrow" href={app.href}>
                {t("download")}
                <span className="vh"> {name}</span>
                <span aria-hidden="true">&darr;</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
