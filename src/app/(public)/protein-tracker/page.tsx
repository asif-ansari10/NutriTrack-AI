import FeaturePage from "@/components/public/FeaturePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Protein Tracker – Track Your Daily Protein Intake",
  description:
    "Track your daily protein intake alongside calories, meals, carbohydrates, fat, and other nutrition information with NutriTrack AI.",
  path: "/protein-tracker",
  keywords: [
    "protein tracker",
    "protein intake tracker",
    "daily protein tracker",
    "protein calculator",
    "protein tracking app",
    "track protein",
  ],
});
export default function Page(){return <FeaturePage eyebrow="Protein Tracker" title="Keep protein visible throughout your day" description="Track protein alongside calories and other macros so your daily nutrition log gives you more useful context." bullets={["See protein totals from logged meals.","Compare intake with your personalized protein target.","Use meal-level protein values to identify gaps.","Combine protein tracking with calorie and macro tracking.","Review protein progress as part of your wider nutrition routine."]} related={[{title:"Calorie Tracker",href:"/calorie-tracker",description:"Track protein together with daily calories."},{title:"Nutrition Tracker",href:"/nutrition-tracker",description:"Monitor multiple nutrition targets in one place."},{title:"Weight Loss",href:"/weight-loss",description:"Build a structured nutrition-tracking routine."}]}/> }
