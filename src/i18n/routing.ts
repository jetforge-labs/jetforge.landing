import { defineRouting } from "next-intl/routing";

// English-only since 2026-06: next-intl stays as the content layer
// (messages/en.json), but there is a single locale and no URL prefix.
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "never",
});
