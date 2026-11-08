import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { JsonLd } from "./_components/json-ld";
import { ConsentBanner } from "./_components/consent";
import "../globals.css";

// Same trimmed Latin subsets as getdilo.co. Bricolage is variable in weight and width (75% to 100%); the subset keeps the full width range (regenerated from google/fonts ofl/bricolagegrotesque, wght 400-800, wdth 75-100).
const bricolage = localFont({
  src: "../../fonts/bricolage-grotesque-latin-subset.woff2",
  variable: "--font-bricolage",
  weight: "400 800",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

const geistMono = localFont({
  src: "../../fonts/geist-mono-latin-subset.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  colorScheme: "light",
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const baseUrl = "https://jetforgelabs.com";
  const canonicalUrl = baseUrl;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: "%s | Jetforge Labs",
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Jetforge Labs" }],
    creator: "Jetforge Labs",
    publisher: "Jetforge Labs",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: "Jetforge Labs",
      title: t("title"),
      description: t("description"),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image"],
    },
  };
}

async function StructuredData({ locale }: { locale: string }) {
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jetforge Labs",
    legalName: "Jetforge Labs OÜ",
    url: "https://jetforgelabs.com",
    logo: "https://jetforgelabs.com/icon.png",
    description:
      "Jetforge Labs is a small software studio. It makes apps (Dilo, Macbrow, Checkmate and more) and a few custom tools for others.",
    foundingLocation: { "@type": "Place", name: "Estonia" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@jetforgelabs.com",
      availableLanguage: ["English"],
      url: "https://jetforgelabs.com/#contact",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jetforge Labs",
    url: "https://jetforgelabs.com",
    description: tMeta("description"),
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en")) {
    notFound();
  }

  setRequestLocale(locale);

  // Only the contact form is a client component, so it is the only namespace sent to the browser.
  const { Contact } = await getMessages();
  const tConsent = await getTranslations({ locale, namespace: "Consent" });

  return (
    <html lang={locale} className={`${bricolage.variable} ${geistMono.variable}`}>
      <head>
        <StructuredData locale={locale} />
      </head>
      <body>
        <NextIntlClientProvider messages={{ Contact }}>
          {children}
          <ConsentBanner
            title={tConsent("title")}
            body={tConsent("body")}
            accept={tConsent("accept")}
            reject={tConsent("reject")}
            privacy={tConsent("privacy")}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
