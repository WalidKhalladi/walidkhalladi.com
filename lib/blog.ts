import fs from "fs";
import path from "path";

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
  slug: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllSlugs();
  const posts: BlogPost[] = [];

  for (const slug of slugs) {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    if (mod.metadata) {
      posts.push(mod.metadata as BlogPost);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
