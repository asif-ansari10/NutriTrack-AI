import Link from "next/link";
import {
  Activity,
  Brain,
  Camera,
  HeartPulse,
  ShieldCheck,
  Target,
} from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About NutriTrack AI",
  description:
    "Learn about NutriTrack AI and our approach to making nutrition tracking, meal logging, activity tracking, and wellness information easier to understand.",
  path: "/about",
  keywords: [
    "about NutriTrack AI",
    "NutriTrack AI",
    "nutrition tracking platform",
    "AI nutrition platform",
  ],
});

const features = [
  {
    icon: Activity,
    title: "Nutrition Tracking",
    description:
      "Track calories, protein, carbohydrates, fat, fiber, and your daily nutrition targets.",
  },
  {
    icon: Camera,
    title: "AI Food Scanner",
    description:
      "Use AI-assisted image analysis to make meal logging faster and easier.",
  },
  {
    icon: Target,
    title: "Personalized Goals",
    description:
      "Set nutrition and weight goals based on your personal profile and preferences.",
  },
  {
    icon: HeartPulse,
    title: "Progress Tracking",
    description:
      "Keep track of weight, activity, meals, and nutrition progress over time.",
  },
  {
    icon: Brain,
    title: "AI Coach",
    description:
      "Get general nutrition and wellness guidance using information from your tracked data.",
  },
  {
    icon: ShieldCheck,
    title: "Your Account",
    description:
      "Keep your personal nutrition information associated with your own authenticated account.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[#bec9c6]/20 bg-[#f8f9fa] py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
            A simpler way to understand everyday nutrition
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#191c1d] sm:text-5xl lg:text-6xl">
            About NutriTrack AI
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[#3e4947] sm:text-lg">
            NutriTrack AI is designed to make everyday nutrition tracking
            simpler by bringing meals, nutrition targets, activity, weight
            history, progress, and AI-assisted guidance into one experience.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-[#00685f] px-7 py-3.5 font-semibold text-white transition hover:bg-[#004e47]"
            >
              Get Started
            </Link>

            <Link
              href="/features"
              className="rounded-full border border-[#bec9c6] bg-white px-7 py-3.5 font-semibold text-[#191c1d] transition hover:border-[#00685f] hover:text-[#00685f]"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
              Our purpose
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#191c1d] sm:text-4xl">
              Make nutrition easier to understand
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#3e4947] sm:text-base">
              Nutrition tracking can become complicated when meals, calories,
              macronutrients, activity, weight, and progress are spread across
              different tools.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#3e4947] sm:text-base">
              NutriTrack AI brings these pieces together into a single
              experience so you can spend less time managing your tracking
              system and more time understanding your everyday habits.
            </p>
          </div>

          <div className="rounded-3xl bg-[#00685f] p-7 text-white shadow-lg sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Activity size={24} />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Track. Understand. Improve.
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/80">
              NutriTrack AI is built around a simple daily workflow: understand
              your goals, record your meals and activity, review your progress,
              and use the information to make more informed choices.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
              The platform
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Built around your everyday routine
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#3e4947] sm:text-base">
              NutriTrack AI combines several parts of nutrition and wellness
              tracking into one connected experience.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#91f4e6]/50 text-[#006a61]">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#3e4947]">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
            AI-assisted experience
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Technology that supports your tracking
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#3e4947] sm:text-base">
            AI features in NutriTrack AI are designed to help with tasks such
            as food image analysis and personalized nutrition conversations.
            AI-generated information should be reviewed before being relied
            upon for your personal tracking.
          </p>
        </div>
      </section>

      {/* Wellness Disclaimer */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#bec9c6]/30 bg-[#f3f4f5] p-6 sm:p-8">
          <h2 className="font-bold text-[#191c1d]">
            A wellness and educational platform
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#3e4947]">
            NutriTrack AI is intended to support nutrition tracking and general
            wellness awareness. It is not intended to provide medical
            diagnosis, treatment, or emergency healthcare advice. If you have
            questions about a medical condition or your individual health,
            consult an appropriately qualified healthcare professional.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#00685f] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to understand your nutrition?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Start tracking your meals, nutrition, activity, and progress with
            NutriTrack AI.
          </p>

          <Link
            href="/signup"
            className="mt-7 inline-flex rounded-full bg-white px-8 py-3.5 font-bold text-[#00685f] transition hover:bg-[#f3f4f5]"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}