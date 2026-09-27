import type { MetadataRoute } from "next";

import { blogs } from "@/data/blogs";

const BASE_URL = "https://www.nutritrackai.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },

    // Main product pages
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

    // Content
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

    // Company
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Legal
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

  // -------------------------------------------------------
  // Blog Articles
  // -------------------------------------------------------

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,

    lastModified: new Date(blog.date),

    changeFrequency: "monthly",

    priority: 0.75,
  }));

  return [
    ...publicPages,
    ...blogPages,
  ];
}