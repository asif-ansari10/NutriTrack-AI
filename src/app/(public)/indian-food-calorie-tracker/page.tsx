import FeaturePage from "@/components/public/FeaturePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Indian Food Calorie Tracker",
  description:
    "Track calories and nutrition from everyday Indian foods and meals with NutriTrack AI.",
  path: "/indian-food-calorie-tracker",
  keywords: [
    "Indian food calorie tracker",
    "Indian food calories",
    "Indian food nutrition",
    "Indian meal calorie tracker",
    "roti calories",
    "dal calories",
    "rice calories",
    "Indian diet tracker",
  ],
});
export default function Page(){return <FeaturePage eyebrow="Indian Food Calorie Tracker" title="Track everyday Indian meals with more useful context" description="Build a nutrition log around foods you actually eat, including common Indian meals, snacks, and mixed dishes." bullets={["Log Indian meals and individual foods in your diary.","Use AI-assisted analysis for meal photos where available.","Review estimated calories and macros before saving.","Keep portions editable so your saved log reflects your meal.","Use the same nutrition targets across Indian and non-Indian foods."]} related={[{title:"AI Food Scanner",href:"/ai-food-scanner",description:"Analyze meal photos for faster logging."},{title:"Nutrition Tracker",href:"/nutrition-tracker",description:"Track calories, macros, and fiber."},{title:"Weight Loss",href:"/weight-loss",description:"Build a consistent tracking routine."}]}/> }
