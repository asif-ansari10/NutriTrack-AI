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


export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  if (!blog) {
    return {
      title: "Article Not Found | NutriTrack AI",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url =
    `https://www.nutritrackai.co.in/blog/${blog.slug}`;

  return {
    title: `${blog.title} | NutriTrack AI`,

    description: blog.excerpt,

    keywords: [
      blog.category,
      "NutriTrack AI",
      "nutrition",
      "wellness",
      "nutrition tracking",
    ],

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "article",
      locale: "en_IN",
      url,
      siteName: "NutriTrack AI",

      title: blog.title,

      description: blog.excerpt,

      publishedTime: blog.date,
    },

    twitter: {
      card: "summary",
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  const related = blogs
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);

  return (
    <article className="bg-[#f8f9fa]">
      {/* Header */}
      <header className="border-b border-[#bec9c6]/20 bg-[#f3f4f5] py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00685f] hover:text-[#004e47]"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <div className="mt-8">
            <span className="rounded-full bg-[#00685f]/10 px-3 py-1.5 text-xs font-bold text-[#00685f]">
              {blog.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#191c1d] sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-[#3e4947] sm:text-lg">
              {blog.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#687370]">
              <span>{blog.date}</span>

              <span>•</span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={15} />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="prose-nutri">
            {blog.content.map((section, index) => (
              <section key={index} className="mb-10 last:mb-0">
                {section.heading && (
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#191c1d] sm:text-3xl">
                    {section.heading}
                  </h2>
                )}

                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-[#3e4947] sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-6 text-[#3e4947] sm:text-base"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#00685f]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 rounded-2xl bg-[#f3f4f5] p-5">
            <p className="text-xs leading-6 text-[#687370]">
              <strong className="text-[#3e4947]">
                General wellness information:
              </strong>{" "}
              This article is provided for general educational and wellness
              information. It is not medical advice and should not replace
              advice from a qualified healthcare professional.
            </p>
          </div>
        </div>
      </main>

      {/* Related articles */}
      <section className="border-t border-[#bec9c6]/20 bg-[#f3f4f5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">
              Keep reading
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Related articles
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group rounded-3xl border border-[#bec9c6]/30 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-bold text-[#00685f]">
                  {item.category}
                </span>

                <h3 className="mt-3 text-lg font-bold leading-snug">
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
    </article>
  );
}