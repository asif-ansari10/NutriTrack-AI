import type { MetadataRoute } from "next";

const BASE_URL = "https://www.nutritrackai.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        disallow: [
          // Private user application
          "/home",
          "/diary",
          "/progress",
          "/profile",
          "/scan",
          "/coach",
          "/onboarding",

          // Authentication pages
          "/login",
          "/signup",
          "/forgot-password",
          "/update-password",

          // Authentication callbacks
          "/auth/",
          "/auth",

          // Admin
          "/admin",
          "/admin/",

          // API
          "/api/",
          "/api",

          // Next.js internals
          "/_next/",
        ],
      },

      // OpenAI search crawler
      {
        userAgent: "OAI-SearchBot",
        allow: "/",

        disallow: [
          "/home",
          "/diary",
          "/progress",
          "/profile",
          "/scan",
          "/coach",
          "/onboarding",
          "/login",
          "/signup",
          "/forgot-password",
          "/update-password",
          "/auth/",
          "/admin",
          "/api/",
          "/_next/",
        ],
      },

      // Google AI crawling controls
      {
        userAgent: "Google-Extended",
        allow: "/",

        disallow: [
          "/home",
          "/diary",
          "/progress",
          "/profile",
          "/scan",
          "/coach",
          "/onboarding",
          "/login",
          "/signup",
          "/forgot-password",
          "/update-password",
          "/auth/",
          "/admin",
          "/api/",
          "/_next/",
        ],
      },
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}