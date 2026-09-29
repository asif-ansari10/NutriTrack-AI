import type { MetadataRoute } from "next";

import { blogs } from "@/data/blogs";

const BASE_URL = "https://www.nutritrackai.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  // =====================================================
  // PUBLIC PAGES
  // =====================================================

  const publicPages: MetadataRoute.Sitemap = [
    // ===================================================
    // HOME
    // ===================================================

    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },

    // ===================================================
    // MAIN PRODUCT PAGES
    // ===================================================

    {
      url: `${BASE_URL}/features`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/ai-food-scanner`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/calorie-tracker`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/nutrition-tracker`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/protein-tracker`,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/indian-food-calorie-tracker`,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/weight-loss`,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/ai-coach`,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    // ===================================================
    // CONTENT
    // ===================================================

    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/faq`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${BASE_URL}/support`,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // ===================================================
    // COMPANY
    // ===================================================

    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // ===================================================
    // LEGAL
    // ===================================================

    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${BASE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // =====================================================
  // BLOG ARTICLES
  // =====================================================

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,

    // blogs.ts uses ISO dates:
    // "2026-09-20"
    // "2026-09-17"
    // "2026-09-14"
    //
    // Keep the ISO date for sitemap lastModified.
    lastModified: blog.date,

    changeFrequency: "monthly",

    priority: 0.75,
  }));

  // =====================================================
  // FINAL SITEMAP
  // =====================================================

  return [
    ...publicPages,
    ...blogPages,
  ];
}