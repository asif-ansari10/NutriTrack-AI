import FeaturePage from "@/components/public/FeaturePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Nutrition Coach – Personalized Wellness Guidance",
  description:
    "Explore NutriTrack AI's AI Coach for general nutrition and wellness guidance based on your meals, activity, goals, and progress.",
  path: "/ai-coach",
  keywords: [
    "AI nutrition coach",
    "AI health coach",
    "AI wellness coach",
    "nutrition AI",
    "personalized nutrition guidance",
    "AI diet coach",
  ],
});
export default function Page(){return <FeaturePage eyebrow="AI Coach" title="A nutrition coach built around your tracked context" description="Use logged meals, activity, goals, targets, and progress as context for personalized wellness conversations." bullets={["Ask questions about your daily nutrition routine.","Use recent meal and activity context when available.","Discuss calories, protein, carbs, fat, fiber, and meal choices.","Get suggestions based on goals and tracked progress.","Keep AI guidance separate from medical diagnosis or treatment."]} related={[{title:"Nutrition Tracker",href:"/nutrition-tracker",description:"Give your coach better nutrition context."},{title:"Weight Loss",href:"/weight-loss",description:"Connect coaching with your weight-loss workflow."},{title:"AI Food Scanner",href:"/ai-food-scanner",description:"Make meal logging faster before asking for guidance."}]}/> }
