import FeaturePage from "@/components/public/FeaturePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Weight Loss & Nutrition Tracking",
  description:
    "Track meals, calories, activity, weight, and nutrition progress with NutriTrack AI to better understand your everyday habits.",
  path: "/weight-loss",
  keywords: [
    "weight loss tracker",
    "weight loss nutrition tracker",
    "calorie tracker for weight loss",
    "meal tracker for weight loss",
    "weight tracking app",
    "nutrition and weight tracking",
  ],
});
export default function Page(){return <FeaturePage eyebrow="Weight Loss Tracking" title="Build a consistent nutrition and progress routine" description="Use calorie targets, meal logging, activity, weight history, and progress views together to understand your routine over time." bullets={["Set a target weight and track current weight.","Log meals and compare daily intake with your target.","Keep activity and workouts in the same overall picture.","Record weight history instead of replacing previous measurements.","Review progress trends and use AI Coach for general nutrition guidance."]} related={[{title:"Calorie Tracker",href:"/calorie-tracker",description:"Track daily calorie intake."},{title:"Progress Tracking",href:"/features",description:"Understand changes over time."},{title:"AI Coach",href:"/ai-coach",description:"Get contextual nutrition guidance."}]}/> }
