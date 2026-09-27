import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Sparkles,
} from "lucide-react";

import { blogs } from "@/data/blogs";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nutrition & Wellness Blog",
  description:
    "Read NutriTrack AI articles about calories, protein, nutrition tracking, Indian food, weight management, meal logging, and AI-powered nutrition.",
  path: "/blog",
  keywords: [
    "nutrition blog",
    "calorie tracking blog",
    "nutrition tips",
    "protein nutrition",
    "Indian food nutrition",
    "weight loss nutrition",
    "AI nutrition",
  ],
});

const categories = [
  "All",
  "Nutrition",
  "Protein",
  "Indian Food",
  "Meal Tracking",
  "Weight Management",
  "AI & Nutrition",
];

export default function BlogPage() {
  const featured = blogs.find((blog) => blog.featured) || blogs[0];
  const latest = blogs.filter((blog) => blog.slug !== featured.slug);

  return (
    <div className="bg-[#f8f9fa]">
      {/* Hero */}
      <section className="border-b border-[#bec9c6]/20 bg-[#f3f4f5] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00685f] text-white">
            <BookOpen size={22} />
          </div>

          <span className="mt-5 block text-xs font-bold uppercase tracking-[0.14em] text-[#00685f]">
            NutriTrack AI Blog
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#191c1d] sm:text-5xl lg:text-6xl">
            Nutrition made easier to understand
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#3e4947] sm:text-base">
            Practical articles about nutrition tracking, calories, protein,
            Indian foods, AI-assisted food logging, and everyday wellness.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
            <Sparkles size={15} />
            Featured article
          </div>

          <article className="overflow-hidden rounded-3xl border border-[#bec9c6]/30 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              {/* Visual */}
              <div className="relative min-h-[280px] overflow-hidden bg-[#00685f] p-7 sm:min-h-[360px] sm:p-10">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#91f4e6]/20" />
                <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#004e47]/60" />

                <div className="relative flex h-full flex-col justify-between text-white">
                  <span className="w-fit rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    {featured.category}
                  </span>

                  <div>
                    <BookOpen size={38} className="mb-5 text-[#91f4e6]" />

                    <p className="max-w-md text-2xl font-bold leading-tight sm:text-3xl">
                      {featured.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#687370]">
                  <span>{featured.date}</span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  {featured.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#3e4947] sm:text-base">
                  {featured.excerpt}
                </p>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#00685f] px-6 py-3 font-semibold text-white transition hover:bg-[#004e47]"
                >
                  Read Article
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-[#bec9c6]/20 bg-white py-5">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-max items-center justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  index === 0
                    ? "bg-[#00685f] text-white"
                    : "bg-[#f3f4f5] text-[#3e4947] hover:bg-[#91f4e6]/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
              Latest articles
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Explore our latest nutrition guides
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((blog) => (
              <article
                key={blog.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#bec9c6]/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Card visual */}
                <div className="relative h-48 overflow-hidden bg-[#e5f6f3] p-6">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#91f4e6]/50" />

                  <div className="relative flex h-full flex-col justify-between">
                    <span className="w-fit rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#00685f] shadow-sm">
                      {blog.category}
                    </span>

                    <BookOpen
                      size={32}
                      className="text-[#00685f]"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-[#687370]">
                    <span>{blog.date}</span>

                    <span>•</span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={13} />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold leading-snug">
                    {blog.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#3e4947]">
                    {blog.excerpt}
                  </p>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-bold text-[#00685f]"
                  >
                    Read more
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#00685f] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to start tracking?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Put what you learn into practice with NutriTrack AI's nutrition
            and wellness tracking tools.
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