import { getTranslations } from "next-intl/server";

const STORE_URL = "https://jetforgelabs.gumroad.com";

/** Link to the Gumroad store, where every app lives. Shared by the hero pills and the MoreApps section. */
export async function StoreButton() {
  const t = await getTranslations("MoreApps");

  return (
    <a className="btn btn-ink btn-store" href={STORE_URL} target="_blank" rel="noopener noreferrer">
      {t("cta")}
      <span className="vh"> {t("newTab")}</span>
      <span className="arrow" aria-hidden="true">&#8599;</span>
    </a>
  );
}

/** Closes the chapter run: the page shows a few apps on purpose, the store has all of them. */
export async function MoreApps() {
  const t = await getTranslations("MoreApps");

  return (
    <section className="wrap more" aria-labelledby="more-title">
      <div>
        <h2 id="more-title">{t("title")}</h2>
        <p>{t("text")}</p>
      </div>
      <StoreButton />
    </section>
  );
}
