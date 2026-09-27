import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | NutriTrack AI",

  description:
    "Sign in to your NutriTrack AI account to track meals, nutrition, activity, weight, and progress.",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}