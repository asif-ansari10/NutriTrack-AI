import FeaturePage from "@/components/public/FeaturePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nutrition Tracker – Track Calories & Macros",
  description:
    "Track calories, protein, carbohydrates, fat, fiber, meals, and daily nutrition targets with NutriTrack AI.",
  path: "/nutrition-tracker",
  keywords: [
    "nutrition tracker",
    "nutrition tracking app",
    "macro tracker",
    "macronutrient tracker",
    "calorie and macro tracker",
    "food nutrition tracker",
  ],
});
export default function Page(){return <FeaturePage eyebrow="Nutrition Tracking" title="Track the nutrition that matters to you" description="Bring calories, protein, carbohydrates, fat, and fiber into a single daily nutrition workflow." bullets={["Track calories and macronutrients from logged meals.","Keep fiber visible alongside other nutrition targets.","Use personalized targets from profile and onboarding data.","Review meal-level and daily totals.","Connect nutrition tracking with progress and coaching."]} related={[{title:"Indian Food Calories",href:"/indian-food-calorie-tracker",description:"Explore a page focused on Indian foods and meals."},{title:"Protein Tracker",href:"/protein-tracker",description:"Keep protein intake visible."},{title:"AI Food Scanner",href:"/ai-food-scanner",description:"Use AI to make meal logging faster."}]}/> }
