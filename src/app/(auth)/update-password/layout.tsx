import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password | NutriTrack AI",

  description:
    "Update your NutriTrack AI account password.",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function UpdatePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}