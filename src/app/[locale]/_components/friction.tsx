import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { APPS } from "./apps";

export async function Friction() {
  const t = await getTranslations("Friction");

  return (
    <section className="wrap friction tex" id="friction" aria-labelledby="friction-title">
      <div>
        <h2 id="friction-title">{t("title")}</h2>
        <p>{t("text")}</p>
        <a className="btn btn-ink" href="#contact" data-reason="suggest">{t("suggest")}</a>
      </div>
      <ul className="next" aria-hidden="true">
        {APPS.map((app) => (
          <li key={app.slug} data-app={app.slug}>
            <Image src={app.icon} alt="" width={72} height={72} />
          </li>
        ))}
        <li className="yours">+</li>
      </ul>
      <div className="custom" id="custom">
        <div>
          <h3>{t("customTitle")}</h3>
          <p>{t("customText")}</p>
        </div>
        <a className="btn btn-light" href="#contact" data-reason="custom">
          {t("customCta")} <span className="arrow" aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
