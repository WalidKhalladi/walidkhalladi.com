import { notFound } from "next/navigation";
import { getAllSlugs } from "@/lib/blog";
import type { Metadata } from "next";
import { SITE_METADATA } from "@/lib/constants";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { metadata } = await import(`@/content/blog/${slug}.mdx`);
    return {
      title: `${metadata.title} — ${SITE_METADATA.author}`,
      description: metadata.excerpt,
      openGraph: {
        title: metadata.title,
        description: metadata.excerpt,
        type: "article",
        publishedTime: metadata.date,
        authors: [SITE_METADATA.author],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const { default: Post, metadata } = await import(
      `@/content/blog/${slug}.mdx`
    );

    return (
      <article className="max-w-2xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-muted uppercase tracking-wider">
              {metadata.tag}
            </span>
            <span className="text-border">|</span>
            <span className="text-xs text-muted">{metadata.readTime}</span>
            <span className="text-border">|</span>
            <time className="text-xs text-muted" dateTime={metadata.date}>
              {new Date(metadata.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="text-heading text-3xl md:text-4xl font-bold tracking-tighter mb-3">
            {metadata.title}
          </h1>
          <p className="text-foreground font-light text-[15px] leading-relaxed">
            {metadata.excerpt}
          </p>
        </header>

        <hr className="border-border mb-10" />

        <div className="blog-content">
          <Post />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
