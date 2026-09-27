import FeaturePage from "@/components/public/FeaturePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Food Scanner – Analyze Meals from Photos",
  description:
    "Use NutriTrack AI's AI food scanner to analyze meal photos, identify foods, and estimate calories and nutrition for faster meal logging.",
  path: "/ai-food-scanner",
  keywords: [
    "AI food scanner",
    "food photo scanner",
    "AI meal scanner",
    "food image analysis",
    "meal calorie scanner",
    "AI calorie scanner",
    "food recognition AI",
  ],
});
export default function Page(){return <FeaturePage eyebrow="AI Food Scanner" title="Turn a food photo into a faster nutrition log" description="Use AI-assisted image analysis to identify foods and estimate nutrition so you can spend less time entering meals manually." bullets={["Upload or capture a meal image from the scanner workflow.","Identify multiple foods in a single meal where supported.","Review estimated calories and macronutrients before saving.","Keep AI analysis connected to your meal diary.","Use manual editing when an AI estimate needs correction."]} related={[{title:"Calorie Tracker",href:"/calorie-tracker",description:"Understand daily calorie intake and targets."},{title:"Nutrition Tracker",href:"/nutrition-tracker",description:"Track macros and fiber alongside calories."},{title:"AI Coach",href:"/ai-coach",description:"Use tracked information for personalized guidance."}]}/> }
