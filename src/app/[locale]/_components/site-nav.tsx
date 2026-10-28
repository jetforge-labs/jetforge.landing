import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";

interface SiteNavProps {
  /** true on the home page (in-page anchors); false elsewhere (anchors point back to "/"). */
  home?: boolean;
}

export async function SiteNav({ home = false }: SiteNavProps) {
  const t = await getTranslations("Nav");
  const tLayout = await getTranslations("Layout");
  const base = home ? "" : "/";

  const links = [
    { label: t("apps"), href: `${base}#apps` },
    { label: t("studio"), href: `${base}#about` },
    { label: t("contact"), href: `${base}#contact` },
  ];

  return (
    <>
      <a className="skip" href="#main">
        {tLayout("skip")}
      </a>
      <header className="wrap nav">
        <Link className="wordmark" href="/" aria-label={t("homeLabel")}>
          Jetforge Labs
        </Link>
        <div className="nav-end">
          <nav aria-label={t("label")}>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
