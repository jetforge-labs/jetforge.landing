import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { APPS } from "./apps";
import { NotchWatcher } from "./notch-watcher";

interface SiteNavProps {
  /** true on the home page (in-page anchors); false elsewhere (anchors point back to "/"). */
  home?: boolean;
}

const BAR_ID = "bar";

/** The site header, drawn as a Mac menu bar. The notch shows the icon of the app whose chapter you are reading (home only). */
export async function SiteNav({ home = false }: SiteNavProps) {
  const t = await getTranslations("Nav");
  const tLayout = await getTranslations("Layout");
  const base = home ? "" : "/";

  const links = [
    { label: t("apps"), href: "/apps" },
    { label: t("studio"), href: `${base}#about` },
    { label: t("contact"), href: `${base}#contact` },
  ];

  return (
    <>
      <a className="skip" href="#main">
        {tLayout("skip")}
      </a>
      <header className="bar" id={BAR_ID}>
        <div className="wrap bar-in">
          <Link className="wordmark" href="/" aria-label={t("homeLabel")} translate="no">
            Jetforge Labs
          </Link>
          <div className="notch" aria-hidden="true">
            {APPS.map((app) => (
              <Image key={app.slug} data-for={app.slug} src={app.icon} alt="" width={22} height={22} />
            ))}
          </div>
          <nav aria-label={t("label")}>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      {home && <NotchWatcher barId={BAR_ID} />}
    </>
  );
}
