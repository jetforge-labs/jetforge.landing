import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Navbar } from "../_components/navbar";
import { Logo } from "../_components/logo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPolicy() {
  const t = await getTranslations("Privacy");
  const tFooter = await getTranslations("Footer");

  return (
    <div className="min-h-screen">
      <header>
        <Navbar minimal />
      </header>

      <main className="px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <article className="mx-auto max-w-3xl">
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
              {t("eyebrow")}
            </p>
            <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              {t("title")}
            </h1>
            <p className="text-slate-400">
              {t("lastUpdated")}: {t("lastUpdatedDate")}
            </p>
          </div>

          <div className="space-y-10 text-slate-300 leading-relaxed [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:md:text-2xl [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-300">
            {/* Introduction */}
            <section>
              <h2>{t("intro.heading")}</h2>
              <p>{t("intro.p1")}</p>
              <p>{t("intro.p2")}</p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2>{t("collect.heading")}</h2>
              <p>{t("collect.p1")}</p>
              <ul>
                <li>{t("collect.item1")}</li>
                <li>{t("collect.item2")}</li>
                <li>{t("collect.item3")}</li>
                <li>{t("collect.item4")}</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2>{t("use.heading")}</h2>
              <p>{t("use.p1")}</p>
              <ul>
                <li>{t("use.item1")}</li>
                <li>{t("use.item2")}</li>
                <li>{t("use.item3")}</li>
                <li>{t("use.item4")}</li>
                <li>{t("use.item5")}</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2>{t("thirdParty.heading")}</h2>
              <p>{t("thirdParty.p1")}</p>
              <ul>
                <li>{t("thirdParty.item1")}</li>
                <li>{t("thirdParty.item2")}</li>
                <li>{t("thirdParty.item3")}</li>
              </ul>
              <p>{t("thirdParty.p2")}</p>
            </section>

            {/* Data Storage & Security */}
            <section>
              <h2>{t("security.heading")}</h2>
              <p>{t("security.p1")}</p>
              <p>{t("security.p2")}</p>
            </section>

            {/* Your Rights */}
            <section>
              <h2>{t("rights.heading")}</h2>
              <p>{t("rights.p1")}</p>
              <ul>
                <li>{t("rights.item1")}</li>
                <li>{t("rights.item2")}</li>
                <li>{t("rights.item3")}</li>
                <li>{t("rights.item4")}</li>
              </ul>
              <p>{t("rights.p2")}</p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2>{t("children.heading")}</h2>
              <p>{t("children.p1")}</p>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2>{t("changes.heading")}</h2>
              <p>{t("changes.p1")}</p>
            </section>

            {/* Contact */}
            <section>
              <h2>{t("contact.heading")}</h2>
              <p>{t("contact.p1")}</p>
              <p>
                <strong className="text-white">Jetforge Labs OÜ</strong>
                <br />
                {t("contact.registryCode")}: 17116764
                <br />
                Harju maakond, Tallinn, Kesklinna linnaosa, Tornimäe tn 5, 10145
                <br />
                <a href="mailto:hello@jetforgelabs.com">hello@jetforgelabs.com</a>
              </p>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-navy-950 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6">
            <Link href="/" aria-label="Back to home">
              <Logo className="h-24" />
            </Link>
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} {tFooter("copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
