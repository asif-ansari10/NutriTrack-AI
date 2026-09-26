import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/diary",
          "/progress",
          "/profile",
          "/scan",
          "/coach",
          "/login",
          "/signup",
          "/auth/",
          "/api/",
        ],
      },

      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },

      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],

    sitemap:
      "https://www.nutritrackai.co.in/sitemap.xml",
  };
}