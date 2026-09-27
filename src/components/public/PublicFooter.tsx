import Link from "next/link";
import { Activity, MessageCircle, Share2 } from "lucide-react";

const groups = [
  ["PRODUCT", [["AI Food Scanner","/ai-food-scanner"],["Calorie Tracker","/calorie-tracker"],["AI Coach","/ai-coach"]]],
  ["RESOURCES", [["Features","/features"],["Nutrition Tracking","/nutrition-tracker"],["Indian Food Calories","/indian-food-calorie-tracker"],["Weight Loss","/weight-loss"],["Blog","/blog"],["FAQ","/faq"],["Support","/support"]]],
  ["COMPANY & LEGAL", [["About Us","/about"],["Privacy Policy","/privacy"],["Terms of Service","/terms"]]],
];

export default function PublicFooter() {
  return <footer className="border-t border-[#bec9c6]/30 bg-[#f3f4f5]">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00685f] text-white"><Activity size={16}/></span>
            <span className="font-bold text-[#004e47]">NutriTrack AI</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#3e4947]">Precision nutrition powered by artificial intelligence for easier food logging, nutrition awareness, and daily wellness guidance.</p>
        </div>
        {groups.map(([title, items]) => <div key={title as string}><h3 className="text-xs font-bold uppercase tracking-wider">{title as string}</h3><ul className="mt-4 space-y-2.5">{(items as string[][]).map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-[#3e4947] hover:text-[#004e47]">{label}</Link></li>)}</ul></div>)}
      </div>
      <div className="mt-12 flex flex-col gap-3 border-t border-[#bec9c6]/30 pt-7 text-xs text-[#6e7977] sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} NutriTrack AI. All rights reserved.</p>
        <p>AI-powered nutrition and wellness platform.</p>
      </div>
    </div>
  </footer>;
}
