"use client";

import Link from "next/link";
import CustomCursor from "@/components/ui/CustomCursor";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background overflow-auto">
      <style>{`
        html, body { overflow: auto !important; height: auto !important; }
        .blog-content > h1:first-child { display: none; }
      `}</style>
      <CustomCursor />

      <nav className="max-w-2xl mx-auto px-6 py-8">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-muted text-sm font-mono hover:text-heading transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>
      </nav>

      <main className="px-6 pb-20">{children}</main>
    </div>
  );
}
