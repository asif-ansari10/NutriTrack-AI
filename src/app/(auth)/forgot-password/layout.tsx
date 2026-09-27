import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Your Password | NutriTrack AI",

  description:
    "Reset your NutriTrack AI account password securely.",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}