import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/** Link to the /apps page, where every app can be downloaded. Shared by the hero pills and the MoreApps section. */
export async function AllAppsButton() {
  const t = await getTranslations("MoreApps");

  return (
    <Link className="btn btn-ink btn-store" href="/apps">
      {t("cta")}
      <span className="arrow" aria-hidden="true">&rarr;</span>
    </Link>
  );
}

/** Closes the chapter run: the page shows a few apps on purpose, /apps has all of them. */
export async function MoreApps() {
  const t = await getTranslations("MoreApps");

  return (
    <section className="wrap more" aria-labelledby="more-title">
      <div>
        <h2 id="more-title">{t("title")}</h2>
        <p>{t("text")}</p>
      </div>
      <AllAppsButton />
    </section>
  );
}
