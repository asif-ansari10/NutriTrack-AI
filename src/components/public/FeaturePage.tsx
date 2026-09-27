import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
export default function FeaturePage({eyebrow,title,description,bullets,related=[]}:{eyebrow:string;title:string;description:string;bullets:string[];related?:{title:string;href:string;description:string}[]}) {
  return <>
    <section className="border-b border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-24"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">{eyebrow}</span><h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#3e4947] sm:text-lg">{description}</p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/signup" className="rounded-full bg-[#00685f] px-7 py-3.5 font-semibold text-white">Get Started</Link><Link href="/features" className="rounded-full border border-[#bec9c6] bg-white px-7 py-3.5 font-semibold">Explore Features</Link></div>
    </div></section>
    <section className="py-16 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
      <div><span className="text-xs font-bold uppercase tracking-wider text-[#00685f]">What you can do</span><h2 className="mt-2 text-2xl font-bold sm:text-3xl">Built around a simple daily workflow</h2><p className="mt-4 text-sm leading-6 text-[#3e4947]">Use the feature as part of your wider NutriTrack AI experience instead of managing isolated nutrition tools.</p></div>
      <div className="rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm sm:p-8"><ul className="space-y-4">{bullets.map(b=><li key={b} className="flex gap-3 text-sm leading-6 text-[#3e4947]"><CheckCircle2 className="mt-0.5 shrink-0 text-[#00685f]" size={18}/><span>{b}</span></li>)}</ul></div>
    </div></section>
    {related.length>0 && <section className="bg-[#f3f4f5] py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading eyebrow="Explore more" title="Related NutriTrack AI features"/><div className="grid gap-5 md:grid-cols-3">{related.map(x=><Link key={x.href} href={x.href} className="group rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm hover:shadow-md"><h3 className="font-semibold">{x.title}</h3><p className="mt-2 text-sm leading-6 text-[#3e4947]">{x.description}</p><span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#004e47]">Learn more <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span></Link>)}</div></div></section>}
  </>;
}
