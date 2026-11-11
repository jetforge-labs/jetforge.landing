import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jetforge Labs",
    short_name: "Jetforge",
    description:
      "Small apps for less friction in your day: Dilo, Macbrow and Checkmate.",
    start_url: "/",
    display: "standalone",
    background_color: "#F9F9F9",
    theme_color: "#F9F9F9",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
