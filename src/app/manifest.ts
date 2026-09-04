import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NutriTrack AI",
    short_name: "NutriTrack AI",
    description: "Your Health Companion",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8f8",
    theme_color: "#004e47",

    icons: [
      {
        src: "/logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}