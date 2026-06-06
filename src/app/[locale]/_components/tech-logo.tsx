"use client";

interface TechLogoProps {
  src: string;
  alt: string;
}

/**
 * Client wrapper for CDN-sourced tech logos.
 * Hides the image on load failure so a broken icon never shows.
 * Lives here because onError is an event handler — forbidden in Server Components.
 */
export function TechLogo({ src, alt }: TechLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={20}
      height={20}
      loading="lazy"
      className="h-5 w-5 shrink-0"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
