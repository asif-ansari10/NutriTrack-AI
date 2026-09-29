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
] as const;

type BlogCategory = (typeof categories)[number];

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

/**
 * Formats an ISO date such as:
 * 2026-09-20
 *
 * into:
 * September 20, 2026
 */
function formatBlogDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const params = await searchParams;

  const requestedCategory = params.category;

  const selectedCategory: BlogCategory = categories.includes(
    requestedCategory as BlogCategory
  )
    ? (requestedCategory as BlogCategory)
    : "All";

  const featured =
    blogs.find((blog) => blog.featured) || blogs[0];

  /**
   * Filter the article list based on the selected category.
   *
   * The featured article is not duplicated in the latest articles.
   */
  const latest = blogs.filter((blog) => {
    const isNotFeatured = blog.slug !== featured?.slug;

    if (selectedCategory === "All") {
      return isNotFeatured;
    }

    return (
      isNotFeatured &&
      blog.category === selectedCategory
    );
  });

  return (
    <div className="bg-[#f8f9fa]">
      {/* =========================================================
          HERO
      ========================================================== */}
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
            Practical articles about nutrition tracking, calories,
            protein, Indian foods, AI-assisted food logging, and
            everyday wellness.
          </p>
        </div>
      </section>

      {/* =========================================================
          FEATURED ARTICLE
      ========================================================== */}
      {featured && (
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
                      <BookOpen
                        size={38}
                        className="mb-5 text-[#91f4e6]"
                      />

                      <p className="max-w-md text-2xl font-bold leading-tight sm:text-3xl">
                        {featured.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#687370]">
                    <time dateTime={featured.date}>
                      {formatBlogDate(featured.date)}
                    </time>

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {featured.readTime}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#191c1d] sm:text-3xl">
                    {featured.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#3e4947] sm:text-base">
                    {featured.excerpt}
                  </p>

                  <Link
                    href={`/blog/${featured.slug}`}
                    className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#00685f] px-6 py-3 font-semibold text-white transition hover:bg-[#004e47] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2"
                  >
                    Read Article
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* =========================================================
          CATEGORIES
      ========================================================== */}
      <section className="border-y border-[#bec9c6]/20 bg-white py-5">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Blog categories"
            className="flex min-w-max items-center justify-center gap-2"
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              const href =
                category === "All"
                  ? "/blog"
                  : `/blog?category=${encodeURIComponent(category)}`;

              return (
                <Link
                  key={category}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2 ${
                    isActive
                      ? "bg-[#00685f] text-white"
                      : "bg-[#f3f4f5] text-[#3e4947] hover:bg-[#91f4e6]/40"
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      {/* =========================================================
          LATEST ARTICLES
      ========================================================== */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
              {selectedCategory === "All"
                ? "Latest articles"
                : `${selectedCategory} articles`}
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#191c1d]">
              {selectedCategory === "All"
                ? "Explore our latest nutrition guides"
                : `Explore ${selectedCategory.toLowerCase()} guides`}
            </h2>

            {selectedCategory !== "All" && (
              <p className="mt-3 text-sm text-[#687370]">
                Showing articles in the{" "}
                <strong className="text-[#3e4947]">
                  {selectedCategory}
                </strong>{" "}
                category.
              </p>
            )}
          </div>

          {latest.length > 0 ? (
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

                  {/* Card content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-[#687370]">
                      <time dateTime={blog.date}>
                        {formatBlogDate(blog.date)}
                      </time>

                      <span aria-hidden="true">•</span>

                      <span className="flex items-center gap-1">
                        <Clock3 size={13} />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold leading-snug text-[#191c1d]">
                      {blog.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#3e4947]">
                      {blog.excerpt}
                    </p>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#00685f] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2"
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
          ) : (
            <div className="rounded-3xl border border-dashed border-[#bec9c6] bg-white px-6 py-14 text-center">
              <BookOpen
                size={36}
                className="mx-auto text-[#00685f]"
              />

              <h3 className="mt-4 text-xl font-bold text-[#191c1d]">
                No articles in this category yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#687370]">
                We are working on more nutrition guides for this
                category. Explore the other articles while you wait.
              </p>

              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00685f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#004e47]"
              >
                View all articles
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#00685f] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to start tracking?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Put what you learn into practice with NutriTrack AI&apos;s
            nutrition and wellness tracking tools.
          </p>

          <Link
            href="/signup"
            className="mt-7 inline-flex rounded-full bg-white px-8 py-3.5 font-bold text-[#00685f] transition hover:bg-[#f3f4f5] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00685f]"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}