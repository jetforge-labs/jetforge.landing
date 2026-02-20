import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jetforge Labs - Tech Solutions",
    short_name: "Jetforge Labs",
    description:
      "Custom software development and tech solutions. We build scalable products for startups and enterprises.",
    start_url: "/",
    display: "standalone",
    background_color: "#010104",
    theme_color: "#010104",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
