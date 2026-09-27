import type { Metadata } from "next";

export const BASE_URL =
  "https://www.nutritrackai.co.in";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: SeoOptions): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,

    description,

    keywords,

    alternates: {
      canonical: url,
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },

    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: "NutriTrack AI",
      title,
      description,
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}