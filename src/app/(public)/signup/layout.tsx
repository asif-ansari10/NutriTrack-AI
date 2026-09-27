import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Account | NutriTrack AI",

  description:
    "Create a NutriTrack AI account and start tracking meals, calories, protein, nutrition, activity, weight, and progress.",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}