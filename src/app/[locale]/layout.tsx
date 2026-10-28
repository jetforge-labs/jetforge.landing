import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { routing } from "@/i18n/routing";
import { APPS } from "./_components/apps";
import "../globals.css";

// Same trimmed Latin subsets as getdilo.co. Bricolage is variable in weight and width (75% to 100%).
const bricolage = localFont({
  src: "../../fonts/bricolage-grotesque-latin-subset.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
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

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

async function StructuredData({ locale }: { locale: string }) {
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const tApps = await getTranslations({ locale, namespace: "Apps" });

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jetforge Labs",
    legalName: "Jetforge Labs OÜ",
    url: "https://jetforgelabs.com",
    logo: "https://jetforgelabs.com/icon.png",
    description:
      "Jetforge Labs is a small software studio. It makes apps (Checkmate, Dilo and LimitBar) and a few custom tools for others.",
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

  const apps = APPS.map((app) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tApps(`${app.slug}.name`),
    description: tApps(`${app.slug}.line`),
    applicationCategory: app.category,
    operatingSystem: "macOS",
    url: app.href,
    image: `https://jetforgelabs.com${app.icon}`,
    publisher: { "@type": "Organization", name: "Jetforge Labs" },
  }));

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
      {apps.map((schema) => (
        <JsonLd key={schema.name} data={schema} />
      ))}
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

  // Only the contact form is a client component, so it is the only namespace sent to the browser.
  const { Contact } = await getMessages();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={locale} className={`${bricolage.variable} ${geistMono.variable}`}>
      <head>
        <StructuredData locale={locale} />
      </head>
      <body>
        <NextIntlClientProvider messages={{ Contact }}>
          {children}
        </NextIntlClientProvider>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
