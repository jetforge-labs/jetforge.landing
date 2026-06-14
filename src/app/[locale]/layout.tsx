import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Geist, Orbitron } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

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
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Jetforge Labs - Custom Software Development & Tech Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image.png"],
    },
  };
}

function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jetforge Labs",
    legalName: "Jetforge Labs OÜ",
    url: "https://jetforgelabs.com",
    logo: "https://jetforgelabs.com/icon.png",
    description:
      "Jetforge Labs is a software studio that builds production-grade products end-to-end: web apps, mobile apps, AI agents, and cloud infrastructure. From 0→1 MVPs to scaling production systems.",
    foundingLocation: {
      "@type": "Place",
      name: "Estonia",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English"],
      url: "https://jetforgelabs.com/#contact",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jetforge Labs",
    url: "https://jetforgelabs.com",
    description:
      "Software studio specializing in custom products, mobile apps, cloud infrastructure, and AI agents. Built to scale, shipped to matter.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ProfessionalServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Jetforge Labs",
    url: "https://jetforgelabs.com",
    description:
      "Software studio that builds production-grade products end-to-end: web apps, mobile apps, AI agents, and cloud infrastructure. Specializing in 0→1 MVP development and scaling production systems.",
    knowsAbout: [
      "Custom Software Development",
      "Mobile App Development",
      "React Native",
      "Next.js",
      "AI Agent Development",
      "LLM Integration",
      "RAG Pipelines",
      "Cloud Infrastructure",
      "AWS",
      "DevOps",
      "MVP Development",
      "Security Audits",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud & DevOps" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "MVP Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Audits" } },
      ],
    },
    areaServed: "Worldwide",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ServicesJsonLd() {
  const services = [
    {
      name: "Custom Software Development",
      description:
        "Software built for how your business actually works, not adapted from a template that almost fits.",
    },
    {
      name: "Mobile App Development",
      description:
        "iOS and Android apps built with React Native: one codebase, native performance, shipped to both stores.",
    },
    {
      name: "Cloud & DevOps",
      description:
        "AWS architecture, containerized deploys, and CI/CD pipelines. Your team ships confidently and the system doesn't fall over.",
    },
    {
      name: "AI & Automation",
      description:
        "LLM integrations, RAG pipelines, and autonomous agents that do real work inside your product. Not just demos.",
    },
    {
      name: "MVP Development",
      description:
        "A launch-ready product in weeks, not quarters. Auth, payments, and your core flows wired end to end on a production stack.",
    },
    {
      name: "Security Audits",
      description:
        "Code and infrastructure review, OWASP coverage, and pentest coordination. You get an actionable report, not a PDF of findings nobody acts on.",
    },
  ];

  const schema = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "Jetforge Labs",
    },
    name: service.name,
    description: service.description,
    areaServed: "Worldwide",
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
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

  const messages = await getMessages();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={locale}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ProfessionalServiceJsonLd />
        <ServicesJsonLd />
      </head>
      <body className={`${jakarta.variable} ${geist.variable} ${orbitron.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
