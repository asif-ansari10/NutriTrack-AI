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
        ],
      },

      // OpenAI search crawler
      {
        userAgent: "OAI-SearchBot",
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
        ],
      },

      // Google AI crawling controls
      {
        userAgent: "Google-Extended",
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
        ],
      },
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}