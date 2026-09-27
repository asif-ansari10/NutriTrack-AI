import FeaturePage from "@/components/public/FeaturePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Calorie Tracker – Track Your Daily Calories",
  description:
    "Track daily calories, meals, snacks, and nutrition targets with NutriTrack AI's calorie tracker.",
  path: "/calorie-tracker",
  keywords: [
    "calorie tracker",
    "calorie counter",
    "daily calorie tracker",
    "meal calorie tracker",
    "calorie tracking app",
    "track calories",
  ],
});
export default function Page(){return <FeaturePage eyebrow="Calorie Tracker" title="Track daily calories with your nutrition in context" description="See meals and daily calorie targets together instead of treating calorie counting as an isolated number." bullets={["Record meals and their estimated calorie values.","Compare daily intake with your personalized target.","Combine calorie information with protein, carbs, fat, and fiber.","Use activity context when reviewing your day.","Review historical progress from your logged data."]} related={[{title:"AI Food Scanner",href:"/ai-food-scanner",description:"Speed up food entry with image analysis."},{title:"Weight Loss",href:"/weight-loss",description:"Support a structured weight-loss tracking workflow."},{title:"Nutrition Tracker",href:"/nutrition-tracker",description:"Go beyond calories with macro and fiber tracking."}]}/> }
