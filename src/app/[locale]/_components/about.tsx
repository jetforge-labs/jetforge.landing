import { getTranslations } from "next-intl/server";

export async function About() {
  const t = await getTranslations("About");

  return (
    <section className="wrap about" id="about" aria-labelledby="about-title">
      <h2 id="about-title">{t("title")}</h2>
      <p>{t("text")}</p>
      <p className="also">
        {t("also")}{" "}
        <a href="#contact" data-reason="custom">{t("alsoLink")}</a>
      </p>
    </section>
  );
}
