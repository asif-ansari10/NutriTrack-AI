import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "NutriTrack AI Support – Help Center",
  description:
    "Get help with NutriTrack AI. Find answers about accounts, nutrition tracking, AI food scanning, meals, activity, and other product questions.",
  path: "/support",
  keywords: [
    "NutriTrack AI support",
    "nutrition tracker support",
    "AI food scanner support",
    "NutriTrack AI help",
    "nutrition app help",
  ],
});

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}