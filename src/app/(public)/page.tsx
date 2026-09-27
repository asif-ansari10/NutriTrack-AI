// import Link from "next/link";
// import { Activity, ArrowRight, Camera, CheckCircle2, CircleGauge, HeartPulse, Sparkles } from "lucide-react";
// import FeatureCard from "@/components/public/FeatureCard";
// import SectionHeading from "@/components/public/SectionHeading";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title:
//     "NutriTrack AI – AI-Powered Nutrition & Calorie Tracker",

//   description:
//     "Track meals, calories, protein, nutrition, activity, weight, and progress with NutriTrack AI's AI-powered food scanner and personalized wellness tools.",

//   alternates: {
//     canonical: "https://www.nutritrackai.co.in/",
//   },

//   keywords: [
//     "AI nutrition tracker",
//     "calorie tracker",
//     "AI food scanner",
//     "meal tracker",
//     "nutrition tracker",
//     "protein tracker",
//     "weight loss tracker",
//   ],

//   openGraph: {
//     title:
//       "NutriTrack AI – AI-Powered Nutrition & Calorie Tracker",

//     description:
//       "Track meals, calories, protein, nutrition, activity, weight, and progress with AI-powered nutrition tools.",

//     url: "https://www.nutritrackai.co.in/",
//     siteName: "NutriTrack AI",
//     type: "website",
//     locale: "en_IN",
//   },

//   twitter: {
//     card: "summary",
//     title:
//       "NutriTrack AI – AI-Powered Nutrition & Calorie Tracker",
//     description:
//       "Track meals, calories, protein, nutrition, activity, weight, and progress with NutriTrack AI.",
//   },
// };

// const steps = [
//   ["01", "Create Your Profile", "Set your goals, dietary preferences, current weight, target weight, and activity level."],
//   ["02", "Track Your Meals", "Log meals manually or use AI-assisted food analysis to estimate calories and macros."],
//   ["03", "Track Your Activity", "Keep workouts and daily activity connected to your nutrition picture."],
//   ["04", "Understand Progress", "Review nutrition, weight, activity, and trends to make more informed daily choices."]
// ];

// export default function HomePage() {
//   return <>
//     <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20 lg:pb-28">
//       <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#91f4e6]/20 blur-3xl" />
//       <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
//         <div className="lg:col-span-6">
//           <div className="inline-flex items-center gap-2 rounded-full bg-[#004e47]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#004e47]"><Sparkles size={13} />Next-gen nutrition intelligence</div>
//           <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Your AI-powered health companion</h1>
//           <p className="mt-5 max-w-xl text-base leading-7 text-[#3e4947] sm:text-lg">Track nutrition, meals, activity, and progress in one simple place with AI-powered food analysis and personalized guidance.</p>
//           <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00685f] px-7 py-3.5 font-semibold text-white shadow-md hover:bg-[#004e47]">Get Started <ArrowRight size={17} /></Link><Link href="/features" className="rounded-full border border-[#bec9c6] bg-white px-6 py-3.5 text-center font-semibold">Explore Features</Link></div>
//           <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#3e4947]"><span className="inline-flex items-center gap-1.5"><CheckCircle2 size={15} className="text-[#2e7d32]" />AI-assisted food logging</span><span className="inline-flex items-center gap-1.5"><CheckCircle2 size={15} className="text-[#2e7d32]" />Nutrition & progress tracking</span></div>
//         </div>
//         <div className="lg:col-span-6"><DashboardPreview /></div>
//       </div>
//     </section>

//     <section className="border-y border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//       <SectionHeading eyebrow="Comprehensive ecosystem" title="What is NutriTrack AI?" description="A nutrition and wellness platform that brings meal logging, nutrition targets, activity, progress, and AI-assisted guidance together." />
//       <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//         <FeatureCard icon="nutrition" title="Nutrition Tracking" description="Track calories, macros, fiber, and nutrition targets in one place." href="/nutrition-tracker" />
//         <FeatureCard icon="meal" title="Meal Tracking" description="Log meals quickly with structured meal types and AI-assisted analysis." href="/features" />
//         <FeatureCard icon="scanner" title="AI Food Scanner" description="Analyze meal photos to speed up food logging and nutrition estimation." href="/ai-food-scanner" />
//         <FeatureCard icon="activity" title="Activity Tracking" description="Keep workouts and daily activity connected to your nutrition context." href="/features" />
//         <FeatureCard icon="progress" title="Progress Tracking" description="Visualize weight and nutrition trends and understand changes over time." href="/features" />
//         <FeatureCard icon="coach" title="AI Coach" description="Get personalized nutrition guidance based on the information you track." href="/ai-coach" />
//       </div>
//     </div></section>

//     <section className="py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//       <SectionHeading eyebrow="Intuitive workflow" title="How it works in 4 steps" description="From initial setup to everyday tracking, NutriTrack AI is designed to keep the workflow simple." />
//       <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{steps.map(([n, t, d]) => <article key={n} className="rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm"><span className="text-4xl font-extrabold text-[#91f4e6]">{n}</span><h3 className="mt-4 text-lg font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-[#3e4947]">{d}</p></article>)}</div>
//     </div></section>

//     <section className="border-y border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//       <SectionHeading eyebrow="Designed for clarity" title="Why use NutriTrack AI?" description="Reduce fragmented tracking and make nutrition information easier to understand." />
//       <div className="grid gap-5 md:grid-cols-2">
//         {[
//           ["All-in-One Health Data", "Bring meals, activity, nutrition targets, and progress into one simple experience.", Activity],
//           ["AI Food Scanning", "Use image-based food analysis to speed up meal logging and estimate nutrition.", Camera],
//           ["Metabolic Energy Tracking", "Connect calorie intake and activity context without relying on fragmented trackers.", CircleGauge],
//           ["Regional Food Support", "Build the experience around everyday foods and cuisines, including Indian meals.", HeartPulse]
//         ].map(([t, d, Icon]) => <div key={t as string} className="flex gap-4 rounded-3xl border border-[#bec9c6]/30 bg-white p-6 sm:p-8"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#00685f] text-white"><Icon size={20} /></div><div><h3 className="text-lg font-semibold">{t as string}</h3><p className="mt-2 text-sm leading-6 text-[#3e4947]">{d as string}</p></div></div>)}
//       </div>
//     </div></section>

//     <section className="py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid items-center gap-8 rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2">
//       <div><span className="text-xs font-bold uppercase tracking-wider text-[#00685f]">Product experience</span><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Understand your nutrition without the guesswork</h2><p className="mt-4 text-sm leading-6 text-[#3e4947] sm:text-base">Use the app to bring food logs, calorie targets, macros, activity, and progress into a single daily workflow.</p><Link href="/features" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#004e47]">Explore the platform <ArrowRight size={16} /></Link></div>
//       <DashboardPreview compact />
//     </div></div></section>

//     <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8"><div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#00685f] px-6 py-14 text-center text-white shadow-lg sm:px-12 sm:py-20">
//       <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#004e47]/60" /><div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[#91f4e6]/10" />
//       <div className="relative mx-auto max-w-2xl"><span className="text-xs font-bold uppercase tracking-[0.15em] text-[#91f4e6]">Start your transformation</span><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Start understanding your nutrition today</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#d8f8f2] sm:text-base">Create your account and start building a clearer picture of your daily nutrition and wellness habits.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/signup" className="rounded-full bg-white px-8 py-3.5 font-bold text-[#00685f]">Get Started</Link><Link href="/features" className="rounded-full border border-white/40 px-8 py-3.5 font-semibold">Learn More</Link></div><p className="mt-6 text-[11px] text-[#b9e9e2]">NutriTrack AI is a wellness and educational tool and does not provide medical diagnosis.</p></div>
//     </div></section>
//   </>;
// }

// function DashboardPreview({ compact = false }: { compact?: boolean }) {
//   return <div className={`mx-auto w-full rounded-3xl border border-[#bec9c6]/30 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:p-7 ${compact ? "max-w-xl" : "max-w-lg"}`}>
//     <div className="flex items-center justify-between border-b border-[#e7e8e9] pb-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#91f4e6]/40 text-[#006a61]"><CircleGauge size={20} /></div><div><h3 className="text-sm font-semibold">Daily Metabolic Sync</h3><p className="text-[11px] text-[#6e7977]">Nutrition dashboard preview</p></div></div><span className="rounded-full bg-[#91f4e6]/40 px-2.5 py-1 text-[10px] font-bold text-[#005049]">TODAY</span></div>
//     <div className="grid items-center gap-6 py-6 sm:grid-cols-2"><div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#00685f]/10 border-r-[#00685f] border-t-[#00685f]"><div className="text-center"><p className="text-[10px] font-semibold uppercase text-[#6e7977]">Intake</p><p className="text-2xl font-bold">2,050</p><p className="text-[10px] text-[#6e7977]">/ 2,300 kcal</p></div></div><div className="space-y-3"><div className="flex items-center justify-between rounded-2xl bg-[#f3f4f5] p-3"><span className="text-xs font-semibold">Net deficit</span><span className="rounded-full bg-[#2e7d32]/10 px-2 py-1 text-[10px] font-bold text-[#2e7d32]">-650 kcal</span></div><div className="rounded-2xl bg-[#f3f4f5] p-3"><div className="flex justify-between text-xs"><span>Active burn</span><strong>+410 kcal</strong></div><p className="mt-1 text-[10px] text-[#6e7977]">Activity context synced to the dashboard.</p></div></div></div>
//     <div className="space-y-3 border-t border-[#e7e8e9] pt-5">{[["Protein", "142g", "150g", "94%"], ["Carbohydrates", "210g", "240g", "87%"], ["Healthy fats", "61g", "70g", "87%"]].map(([l, v, t, w]) => <div key={l}><div className="flex justify-between text-xs"><span>{l}</span><span className="font-semibold">{v} <span className="font-normal text-[#6e7977]">/ {t}</span></span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-[#e1e3e4]"><div className="h-full rounded-full bg-[#00685f]" style={{ width: w }} /></div></div>)}</div>
//   </div>;
// }


import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  Camera,
  CheckCircle2,
  CircleGauge,
  HeartPulse,
  Sparkles,
} from "lucide-react";

import FeatureCard from "@/components/public/FeatureCard";
import SectionHeading from "@/components/public/SectionHeading";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NutriTrack AI – AI-Powered Nutrition & Calorie Tracker",

  description:
    "Track meals, calories, protein, nutrition, activity, weight, and progress with NutriTrack AI's AI-powered food scanner and personalized wellness tools.",

  alternates: {
    canonical: "https://www.nutritrackai.co.in/",
  },

  keywords: [
    "AI nutrition tracker",
    "calorie tracker",
    "AI food scanner",
    "meal tracker",
    "nutrition tracker",
    "protein tracker",
    "weight loss tracker",
  ],

  openGraph: {
    title: "NutriTrack AI – AI-Powered Nutrition & Calorie Tracker",

    description:
      "Track meals, calories, protein, nutrition, activity, weight, and progress with AI-powered nutrition tools.",

    url: "https://www.nutritrackai.co.in/",
    siteName: "NutriTrack AI",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "NutriTrack AI – AI-Powered Nutrition & Calorie Tracker",

    description:
      "Track meals, calories, protein, nutrition, activity, weight, and progress with NutriTrack AI.",
  },
};

const steps = [
  [
    "01",
    "Create Your Profile",
    "Set your goals, dietary preferences, current weight, target weight, and activity level.",
  ],
  [
    "02",
    "Track Your Meals",
    "Log meals manually or use AI-assisted food analysis to estimate calories and macros.",
  ],
  [
    "03",
    "Track Your Activity",
    "Keep workouts and daily activity connected to your nutrition picture.",
  ],
  [
    "04",
    "Understand Progress",
    "Review nutrition, weight, activity, and trends to make more informed daily choices.",
  ],
];

export default async function HomePage() {
  /*
   * Check whether the visitor is already authenticated.
   *
   * If logged in:
   *      /  →  /home
   *
   * If not logged in:
   *      /  →  public landing page
   */
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  }

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20 lg:pb-28">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#91f4e6]/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#004e47]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#004e47]">
              <Sparkles size={13} />
              Next-gen nutrition intelligence
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your AI-powered health companion
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#3e4947] sm:text-lg">
              Track nutrition, meals, activity, and progress in one simple
              place with AI-powered food analysis and personalized guidance.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00685f] px-7 py-3.5 font-semibold text-white shadow-md hover:bg-[#004e47]"
              >
                Get Started
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/features"
                className="rounded-full border border-[#bec9c6] bg-white px-6 py-3.5 text-center font-semibold"
              >
                Explore Features
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#3e4947]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#2e7d32]" />
                AI-assisted food logging
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#2e7d32]" />
                Nutrition & progress tracking
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* WHAT IS NUTRITRACK AI */}
      <section className="border-y border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Comprehensive ecosystem"
            title="What is NutriTrack AI?"
            description="A nutrition and wellness platform that brings meal logging, nutrition targets, activity, progress, and AI-assisted guidance together."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon="nutrition"
              title="Nutrition Tracking"
              description="Track calories, macros, fiber, and nutrition targets in one place."
              href="/nutrition-tracker"
            />

            <FeatureCard
              icon="meal"
              title="Meal Tracking"
              description="Log meals quickly with structured meal types and AI-assisted analysis."
              href="/features"
            />

            <FeatureCard
              icon="scanner"
              title="AI Food Scanner"
              description="Analyze meal photos to speed up food logging and nutrition estimation."
              href="/ai-food-scanner"
            />

            <FeatureCard
              icon="activity"
              title="Activity Tracking"
              description="Keep workouts and daily activity connected to your nutrition context."
              href="/features"
            />

            <FeatureCard
              icon="progress"
              title="Progress Tracking"
              description="Visualize weight and nutrition trends and understand changes over time."
              href="/features"
            />

            <FeatureCard
              icon="coach"
              title="AI Coach"
              description="Get personalized nutrition guidance based on the information you track."
              href="/ai-coach"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Intuitive workflow"
            title="How it works in 4 steps"
            description="From initial setup to everyday tracking, NutriTrack AI is designed to keep the workflow simple."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([n, t, d]) => (
              <article
                key={n}
                className="rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm"
              >
                <span className="text-4xl font-extrabold text-[#91f4e6]">
                  {n}
                </span>

                <h3 className="mt-4 text-lg font-semibold">{t}</h3>

                <p className="mt-2 text-sm leading-6 text-[#3e4947]">
                  {d}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY USE NUTRITRACK AI */}
      <section className="border-y border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Designed for clarity"
            title="Why use NutriTrack AI?"
            description="Reduce fragmented tracking and make nutrition information easier to understand."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {[
              [
                "All-in-One Health Data",
                "Bring meals, activity, nutrition targets, and progress into one simple experience.",
                Activity,
              ],
              [
                "AI Food Scanning",
                "Use image-based food analysis to speed up meal logging and estimate nutrition.",
                Camera,
              ],
              [
                "Metabolic Energy Tracking",
                "Connect calorie intake and activity context without relying on fragmented trackers.",
                CircleGauge,
              ],
              [
                "Regional Food Support",
                "Build the experience around everyday foods and cuisines, including Indian meals.",
                HeartPulse,
              ],
            ].map(([t, d, Icon]) => {
              const IconComponent = Icon as typeof Activity;

              return (
                <div
                  key={t as string}
                  className="flex gap-4 rounded-3xl border border-[#bec9c6]/30 bg-white p-6 sm:p-8"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#00685f] text-white">
                    <IconComponent size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{t as string}</h3>

                    <p className="mt-2 text-sm leading-6 text-[#3e4947]">
                      {d as string}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCT EXPERIENCE */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00685f]">
                Product experience
              </span>

              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Understand your nutrition without the guesswork
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#3e4947] sm:text-base">
                Use the app to bring food logs, calorie targets, macros,
                activity, and progress into a single daily workflow.
              </p>

              <Link
                href="/features"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#004e47]"
              >
                Explore the platform
                <ArrowRight size={16} />
              </Link>
            </div>

            <DashboardPreview compact />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#00685f] px-6 py-14 text-center text-white shadow-lg sm:px-12 sm:py-20">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#004e47]/60" />

          <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[#91f4e6]/10" />

          <div className="relative mx-auto max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#91f4e6]">
              Start your transformation
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Start understanding your nutrition today
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#d8f8f2] sm:text-base">
              Create your account and start building a clearer picture of your
              daily nutrition and wellness habits.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-full bg-white px-8 py-3.5 font-bold text-[#00685f]"
              >
                Get Started
              </Link>

              <Link
                href="/features"
                className="rounded-full border border-white/40 px-8 py-3.5 font-semibold"
              >
                Learn More
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-[#b9e9e2]">
              NutriTrack AI is a wellness and educational tool and does not
              provide medical diagnosis.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function DashboardPreview({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full rounded-3xl border border-[#bec9c6]/30 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:p-7 ${
        compact ? "max-w-xl" : "max-w-lg"
      }`}
    >
      <div className="flex items-center justify-between border-b border-[#e7e8e9] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#91f4e6]/40 text-[#006a61]">
            <CircleGauge size={20} />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Daily Metabolic Sync
            </h3>

            <p className="text-[11px] text-[#6e7977]">
              Nutrition dashboard preview
            </p>
          </div>
        </div>

        <span className="rounded-full bg-[#91f4e6]/40 px-2.5 py-1 text-[10px] font-bold text-[#005049]">
          TODAY
        </span>
      </div>

      <div className="grid items-center gap-6 py-6 sm:grid-cols-2">
        <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#00685f]/10 border-r-[#00685f] border-t-[#00685f]">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase text-[#6e7977]">
              Intake
            </p>

            <p className="text-2xl font-bold">2,050</p>

            <p className="text-[10px] text-[#6e7977]">
              / 2,300 kcal
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-[#f3f4f5] p-3">
            <span className="text-xs font-semibold">
              Net deficit
            </span>

            <span className="rounded-full bg-[#2e7d32]/10 px-2 py-1 text-[10px] font-bold text-[#2e7d32]">
              -650 kcal
            </span>
          </div>

          <div className="rounded-2xl bg-[#f3f4f5] p-3">
            <div className="flex justify-between text-xs">
              <span>Active burn</span>
              <strong>+410 kcal</strong>
            </div>

            <p className="mt-1 text-[10px] text-[#6e7977]">
              Activity context synced to the dashboard.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-[#e7e8e9] pt-5">
        {[
          ["Protein", "142g", "150g", "94%"],
          ["Carbohydrates", "210g", "240g", "87%"],
          ["Healthy fats", "61g", "70g", "87%"],
        ].map(([label, value, target, width]) => (
          <div key={label}>
            <div className="flex justify-between text-xs">
              <span>{label}</span>

              <span className="font-semibold">
                {value}{" "}
                <span className="font-normal text-[#6e7977]">
                  / {target}
                </span>
              </span>
            </div>

            <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#e1e3e4]">
              <div
                className="h-full rounded-full bg-[#00685f]"
                style={{ width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}