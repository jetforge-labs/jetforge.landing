import { NextResponse } from "next/server";
import { isAppSlug } from "@/app/[locale]/_components/apps";
import { getRelease, releasesPage } from "@/lib/appcast";

/** /download/<slug> sends people to the newest notarized DMG, read from the app's Sparkle feed. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isAppSlug(slug)) return new NextResponse("Not found", { status: 404 });

  const release = await getRelease(slug);
  return NextResponse.redirect(release?.downloadUrl ?? releasesPage(slug), 302);
}
