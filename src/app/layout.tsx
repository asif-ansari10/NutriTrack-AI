// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "NutriTrack AI",
//   description: "Your Health Companion",

//   icons: {
//     icon: [
//       {
//         url: "/favicon.ico",
//         type: "image/x-icon",
//       },
//       {
//         url: "/logo-192.png",
//         type: "image/png",
//         sizes: "192x192",
//       },
//       {
//         url: "/logo-512.png",
//         type: "image/png",
//         sizes: "512x512",
//       },
//     ],

//     apple: [
//       {
//         url: "/apple-icon.png",
//         sizes: "180x180",
//         type: "image/png",
//       },
//     ],
//   },

//   manifest: "/manifest.webmanifest",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full bg-[#f7f8f8]">
//         {children}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.nutritrackai.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NutriTrack AI - AI Nutrition & Calorie Tracker",
    template: "%s | NutriTrack AI",
  },

  description:
    "NutriTrack AI is an AI-powered nutrition and calorie tracker that helps you track meals, calories, protein, carbs, fat, fiber and weight with AI food scanning and a personal nutrition coach.",

  applicationName: "NutriTrack AI",

  authors: [
    {
      name: "NutriTrack AI",
      url: siteUrl,
    },
  ],

  creator: "NutriTrack AI",
  publisher: "NutriTrack AI",

  keywords: [
    "AI nutrition tracker",
    "AI calorie tracker",
    "AI food scanner",
    "calorie tracker",
    "nutrition tracker",
    "meal tracker",
    "protein tracker",
    "food calorie scanner",
    "weight loss tracker",
    "Indian food calorie tracker",
    "AI nutrition coach",
    "calorie counter",
  ],

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "NutriTrack AI",

    title:
      "NutriTrack AI - AI Nutrition & Calorie Tracker",

    description:
      "Track calories, protein, meals, nutrition and weight with AI-powered food scanning and your personal nutrition coach.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt:
          "NutriTrack AI - AI Nutrition & Calorie Tracker",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "NutriTrack AI - AI Nutrition & Calorie Tracker",

    description:
      "Track calories, protein, meals, nutrition and weight with AI-powered food scanning.",

    images: ["/og-image.png"],
  },

  robots: {
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

  icons: {
    icon: [
      {
        url: "/logo-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/logo-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },

  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f7f8f8]">
        {children}
      </body>
    </html>
  );
}