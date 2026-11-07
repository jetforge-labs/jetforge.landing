import { getTranslations } from "next-intl/server";

export async function Friction() {
  const t = await getTranslations("Friction");

  return (
    <section className="wrap friction tex" id="friction" aria-labelledby="friction-title">
      <div className="friction-top">
        <h2 id="friction-title">{t("title")}</h2>
        <p>{t("text")}</p>
        <a className="btn btn-ink" href="#contact" data-reason="suggest">{t("suggest")}</a>
      </div>
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
