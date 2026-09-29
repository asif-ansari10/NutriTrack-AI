import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
} from "lucide-react";

import { blogs } from "@/data/blogs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const BASE_URL = "https://www.nutritrackai.co.in";

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

/**
 * Generate all blog routes at build time.
 */
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/**
 * Generate SEO metadata for each blog article.
 */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  /**
   * This normally won't be reached because the page itself
   * calls notFound(), but keeping it here makes the metadata
   * safe as well.
   */
  if (!blog) {
    return {
      title: "Article Not Found | NutriTrack AI",
      description:
        "The requested NutriTrack AI article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `${BASE_URL}/blog/${blog.slug}`;

  return {
    title: `${blog.title} | NutriTrack AI`,

    description: blog.excerpt,

    keywords: [
      blog.category,
      "NutriTrack AI",
      "nutrition",
      "wellness",
      "nutrition tracking",
      "calorie tracking",
      "healthy eating",
    ],

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "article",
      locale: "en_IN",
      url,
      siteName: "NutriTrack AI",

      title: blog.title,

      description: blog.excerpt,

      publishedTime: blog.date,

      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: blog.title,

      description: blog.excerpt,

      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

/**
 * Blog article page.
 */
export default async function BlogArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  if (!blog) {
    notFound();
  }

  /**
   * Prefer related articles from the same category.
   * If there aren't enough, fill the remaining slots with
   * other articles.
   */
  const sameCategory = blogs.filter(
    (item) =>
      item.slug !== blog.slug &&
      item.category === blog.category
  );

  const otherArticles = blogs.filter(
    (item) =>
      item.slug !== blog.slug &&
      item.category !== blog.category
  );

  const related = [
    ...sameCategory,
    ...otherArticles,
  ].slice(0, 3);

  const articleUrl = `${BASE_URL}/blog/${blog.slug}`;

  return (
    <article className="bg-[#f8f9fa]">
      {/* =========================================================
          ARTICLE HEADER
      ========================================================== */}
      <header className="border-b border-[#bec9c6]/20 bg-[#f3f4f5] py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00685f] transition hover:text-[#004e47] focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <div className="mt-8">
            {/* Category */}
            <span className="inline-flex rounded-full bg-[#00685f]/10 px-3 py-1.5 text-xs font-bold text-[#00685f]">
              {blog.category}
            </span>

            {/* Title */}
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#191c1d] sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#3e4947] sm:text-lg">
              {blog.excerpt}
            </p>

            {/* Article metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#687370]">
              <time dateTime={blog.date}>
                {formatBlogDate(blog.date)}
              </time>

              <span aria-hidden="true">•</span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={15} />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          ARTICLE CONTENT
      ========================================================== */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="prose-nutri">
            {blog.content.map((section, index) => (
              <section
                key={`${blog.slug}-section-${index}`}
                className="mb-10 last:mb-0"
              >
                {/* Section heading */}
                {section.heading && (
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#191c1d] sm:text-3xl">
                    {section.heading}
                  </h2>
                )}

                {/* Paragraphs */}
                <div className="space-y-4">
                  {section.paragraphs.map(
                    (paragraph, paragraphIndex) => (
                      <p
                        key={`${blog.slug}-paragraph-${index}-${paragraphIndex}`}
                        className="text-sm leading-7 text-[#3e4947] sm:text-base"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>

                {/* Bullet list */}
                {section.bullets &&
                  section.bullets.length > 0 && (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map(
                        (bullet, bulletIndex) => (
                          <li
                            key={`${blog.slug}-bullet-${index}-${bulletIndex}`}
                            className="flex gap-3 text-sm leading-6 text-[#3e4947] sm:text-base"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#00685f]"
                            />

                            <span>{bullet}</span>
                          </li>
                        )
                      )}
                    </ul>
                  )}
              </section>
            ))}
          </div>

          {/* =====================================================
              DISCLAIMER
          ====================================================== */}
          <div className="mt-12 rounded-2xl bg-[#f3f4f5] p-5">
            <p className="text-xs leading-6 text-[#687370]">
              <strong className="text-[#3e4947]">
                General wellness information:
              </strong>{" "}
              This article is provided for general educational and
              wellness information. It is not medical advice and
              should not replace advice from a qualified healthcare
              professional.
            </p>
          </div>
        </div>
      </main>

      {/* =========================================================
          RELATED ARTICLES
      ========================================================== */}
      {related.length > 0 && (
        <section className="border-t border-[#bec9c6]/20 bg-[#f3f4f5] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
                Keep reading
              </span>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#191c1d]">
                Related articles
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#00685f] focus:ring-offset-2"
                >
                  <span className="text-xs font-bold text-[#00685f]">
                    {item.category}
                  </span>

                  <h3 className="mt-3 text-lg font-bold leading-snug text-[#191c1d]">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#3e4947]">
                    {item.excerpt}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#00685f]">
                    Read article

                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          ARTICLE STRUCTURED DATA
      ========================================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.title,
            description: blog.excerpt,
            datePublished: blog.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": articleUrl,
            },
            publisher: {
              "@type": "Organization",
              name: "NutriTrack AI",
              url: BASE_URL,
            },
          }),
        }}
      />
    </article>
  );
}