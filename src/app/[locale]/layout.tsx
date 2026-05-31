import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  const localePath = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}`;

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
      languages: {
        en: `${baseUrl}`,
        es: `${baseUrl}/es`,
        "x-default": `${baseUrl}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_AR",
      alternateLocale: locale === "en" ? "es_AR" : "en_US",
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

function OrganizationJsonLd({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jetforge Labs",
    url: "https://jetforgelabs.com",
    logo: "https://jetforgelabs.com/logo-mark.png",
    description:
      locale === "en"
        ? "Custom software development and tech solutions company. We build scalable software products for startups and enterprises."
        : "Empresa de desarrollo de software a medida y soluciones tecnologicas. Construimos productos de software escalables para startups y empresas.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English", "Spanish"],
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
    potentialAction: {
      "@type": "SearchAction",
      target: "https://jetforgelabs.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ServicesJsonLd({ locale }: { locale: string }) {
  const services =
    locale === "en"
      ? [
          {
            name: "Custom Software Development",
            description:
              "Tailored solutions designed to match your unique business processes and goals.",
          },
          {
            name: "Mobile App Development",
            description:
              "Native and cross-platform mobile applications that deliver seamless user experiences.",
          },
          {
            name: "Cloud & DevOps",
            description:
              "Scalable cloud infrastructure and CI/CD pipelines that keep your systems running.",
          },
          {
            name: "AI & Automation",
            description:
              "Intelligent automation and machine learning integrations to streamline operations.",
          },
          {
            name: "MVP Development",
            description:
              "Rapid prototyping and MVP delivery to validate your ideas and reach market fast.",
          },
          {
            name: "Security Audits",
            description:
              "Comprehensive security assessments to protect your applications and data.",
          },
        ]
      : [
          {
            name: "Desarrollo de Software a Medida",
            description:
              "Soluciones personalizadas disenadas para adaptarse a los procesos y objetivos unicos de tu negocio.",
          },
          {
            name: "Desarrollo de Aplicaciones Moviles",
            description:
              "Aplicaciones moviles nativas y multiplataforma que ofrecen experiencias de usuario excepcionales.",
          },
          {
            name: "Cloud & DevOps",
            description:
              "Infraestructura cloud escalable y pipelines de CI/CD que mantienen tus sistemas en funcionamiento.",
          },
          {
            name: "IA & Automatizacion",
            description:
              "Automatizacion inteligente e integraciones de machine learning para optimizar tus operaciones.",
          },
          {
            name: "Desarrollo de MVP",
            description:
              "Prototipado rapido y entrega de MVP para validar tus ideas y llegar al mercado rapidamente.",
          },
          {
            name: "Auditorias de Seguridad",
            description:
              "Evaluaciones de seguridad integrales para proteger tus aplicaciones y datos.",
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

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <OrganizationJsonLd locale={locale} />
        <WebSiteJsonLd />
        <ServicesJsonLd locale={locale} />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
