import { getTranslations } from "next-intl/server";

export async function Friction() {
  const t = await getTranslations("Friction");

  return (
    <section className="wrap friction" id="friction" aria-labelledby="friction-title">
      <div className="friction-top">
        <h2 id="friction-title">{t("title")}</h2>
        <div>
          <p>{t("text")}</p>
          <a className="btn btn-ink plain" href="#contact" data-reason="suggest">{t("suggest")}</a>
        </div>
      </div>
      <div className="custom" id="custom">
        <div>
          <h3>{t("customTitle")}</h3>
          <p>{t("customText")}</p>
        </div>
        <a className="btn btn-ink" data-go="in" href="#contact" data-reason="custom">
          {t("customCta")} <span className="arrow" aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
