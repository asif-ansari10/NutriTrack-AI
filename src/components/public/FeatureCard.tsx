import Link from "next/link";
import { Activity, ArrowRight, Brain, Camera, HeartPulse, PieChart, Utensils } from "lucide-react";
const icons = {nutrition:PieChart, meal:Utensils, scanner:Camera, activity:Activity, progress:HeartPulse, coach:Brain};
export default function FeatureCard({icon,title,description,href}:{icon:keyof typeof icons;title:string;description:string;href:string}) {
  const Icon=icons[icon];
  return <article className="group flex min-h-[220px] flex-col justify-between rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00685f]/40 hover:shadow-md">
    <div><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#91f4e6]/50 text-[#006a61]"><Icon size={21}/></div>
    <h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#3e4947]">{description}</p></div>
    <Link href={href} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#004e47]">Learn more <ArrowRight size={15} className="transition group-hover:translate-x-1"/></Link>
  </article>;
}
