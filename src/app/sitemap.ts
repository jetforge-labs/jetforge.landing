import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jetforgelabs.com";

  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          es: `${baseUrl}/es`,
          "x-default": baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/privacy`,
          es: `${baseUrl}/es/privacy`,
          "x-default": `${baseUrl}/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/es/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
