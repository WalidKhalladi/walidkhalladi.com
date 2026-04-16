"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTransition, { SectionItem } from "@/components/ui/SectionTransition";
import { staggerItem } from "@/components/animations/variants";
import TextDecode from "@/components/ui/TextDecode";
import FluidText from "@/components/ui/FluidText";
import type { SectionId } from "@/lib/constants";

interface BlogProps {
  onNavigate: (section: SectionId) => void;
}

const POSTS = [
  {
    title: "Building Cross-Platform ML Inference with KMP",
    excerpt:
      "A deep dive into abstracting TFLite and CoreML behind a unified Kotlin Multiplatform API.",
    date: "2025-01-15",
    tag: "Technical",
    readTime: "8 min read",
    slug: "building-cross-platform-ml-inference-with-kmp",
  },
  {
    title: "Architecture Decisions Behind Chantik",
    excerpt:
      "Why I chose certain patterns and trade-offs when building a production construction management app.",
    date: "2025-02-10",
    tag: "Case Study",
    readTime: "6 min read",
    slug: "architecture-decisions-behind-chantik",
  },
  {
    title: "On Learning Something New Every Day",
    excerpt:
      "Reflections on building a daily learning habit as a senior engineer.",
    date: "2025-03-05",
    tag: "Personal",
    readTime: "4 min read",
    slug: "on-learning-something-new-every-day",
  },
];

export default function Blog({ onNavigate: _onNavigate }: BlogProps) {
  return (
    <SectionTransition className="flex items-start md:items-center justify-center min-h-full pt-4 md:pt-0">
      <div className="max-w-3xl w-full">
        <SectionItem>
          <p className="text-muted text-sm font-mono tracking-wider mb-4">
            // 04 Blog
          </p>
        </SectionItem>

        <SectionItem>
          <h2 className="text-heading text-4xl md:text-5xl font-bold tracking-tighter mb-14">
            <FluidText className="inline">Thoughts &</FluidText>
            <br />
            <FluidText className="inline">deep </FluidText>
            <span className="font-mono font-medium text-accent">
              <TextDecode text="dives." delay={300} />
            </span>
          </h2>
        </SectionItem>

        <div className="space-y-0">
          {POSTS.map((post) => (
            <motion.div
              key={post.slug}
              variants={staggerItem}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block relative border-b border-border last:border-b-0"
              >
                {/* Left accent bar on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                <div className="py-6 pl-0 group-hover:pl-4 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted uppercase tracking-wider group-hover:text-accent transition-colors duration-200">
                      {post.tag}
                    </span>
                    <span className="text-border">|</span>
                    <span className="text-xs text-muted">{post.readTime}</span>
                    <span className="text-border">|</span>
                    <time className="text-xs text-muted" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="text-heading text-lg font-semibold mb-1.5 group-hover:text-heading transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-foreground font-light text-sm leading-relaxed max-w-lg tracking-[0.01em]">
                    {post.excerpt}
                  </p>
                  <span className="text-muted text-xs font-mono mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Read post &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
