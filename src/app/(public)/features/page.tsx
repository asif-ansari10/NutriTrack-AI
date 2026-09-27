import FeatureCard from "@/components/public/FeatureCard";
import SectionHeading from "@/components/public/SectionHeading";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nutrition Tracking Features",
  description:
    "Explore NutriTrack AI features for meal logging, calorie tracking, protein tracking, nutrition analysis, activity tracking, weight progress, AI food scanning, and AI coaching.",
  path: "/features",
  keywords: [
    "nutrition tracking features",
    "calorie tracking",
    "meal tracking",
    "protein tracking",
    "AI food scanner",
    "AI nutrition coach",
    "weight tracking",
  ],
});
export default function FeaturesPage() {
    return <div className="py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="NutriTrack AI platform" title="Everything you need for nutrition tracking" description="Explore the main public product areas. Each feature has its own page so visitors can understand the product without one very long homepage." /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard icon="scanner" title="AI Food Scanner" description="Analyze food images and speed up meal logging." href="/ai-food-scanner" /><FeatureCard icon="nutrition" title="Nutrition Tracking" description="Track calories, macros, fiber, and nutrition targets." href="/nutrition-tracker" /><FeatureCard icon="meal" title="Meal Tracking" description="Keep breakfast, lunch, snacks, and dinner organized." href="/features" /><FeatureCard icon="activity" title="Activity Tracking" description="Keep workouts connected to nutrition data." href="/features" /><FeatureCard icon="progress" title="Progress Tracking" description="Follow weight and nutrition trends over time." href="/features" /><FeatureCard icon="coach" title="AI Coach" description="Get personalized nutrition guidance from your tracked context." href="/ai-coach" /></div></div></div>
}
