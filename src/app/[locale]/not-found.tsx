import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteFooter } from "./_components/site-footer";
import { SiteNav } from "./_components/site-nav";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <>
      <SiteNav />
      <main id="main" className="wrap nf tex">
        <p className="code">404</p>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <Link className="btn btn-ink" href="/">
          {t("back")}
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
