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

// Funnel Display (headlines) and Funnel Sans (text), self-hosted. Both are variable in weight (300 to 800); the subsets are Latin only
// (regenerated from google/fonts ofl/funneldisplay and ofl/funnelsans with fonttools, keeping all layout features).
const funnelDisplay = localFont({
  src: "../../fonts/funnel-display-latin-subset.woff2",
  variable: "--font-funnel-display",
  weight: "300 800",
  style: "normal",
  display: "swap",
  // Keep the system fallback untouched: the arrows (↗ ↓ →) are not in Funnel, so they render from the system font.
  adjustFontFallback: false,
});

const funnelSans = localFont({
  src: "../../fonts/funnel-sans-latin-subset.woff2",
  variable: "--font-funnel-sans",
  weight: "300 800",
  style: "normal",
  display: "swap",
  // Keep the system fallback untouched: the arrows (↗ ↓ →) are not in Funnel, so they render from the system font.
  adjustFontFallback: false,
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
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image.png"],
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
    logo: "https://jetforgelabs.com/android-chrome-512x512.png",
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
    <html lang={locale} className={`${funnelDisplay.variable} ${funnelSans.variable}`}>
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
