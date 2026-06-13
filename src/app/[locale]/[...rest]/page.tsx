import { notFound } from "next/navigation";

// Catch-all for unknown paths under [locale].
// With localePrefix:"never", next-intl middleware rewrites /anything →
// /en/anything, so this page fires and triggers [locale]/not-found.tsx.
export default function CatchAll() {
  notFound();
}
