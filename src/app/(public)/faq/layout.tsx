import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about NutriTrack AI, AI food scanning, calorie tracking, nutrition tracking, accounts, and AI coaching.",
  path: "/faq",
  keywords: [
    "NutriTrack AI FAQ",
    "nutrition tracker FAQ",
    "AI food scanner FAQ",
    "calorie tracker FAQ",
    "NutriTrack AI questions",
  ],
});

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}