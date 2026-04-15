import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-heading text-3xl md:text-4xl font-bold tracking-tighter mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-heading text-2xl md:text-3xl font-semibold tracking-tight mt-12 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-heading text-xl font-semibold tracking-tight mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-foreground font-light leading-[1.8] text-[15px] tracking-[0.01em] mb-5">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="text-foreground font-light text-[15px] leading-[1.8] list-disc pl-6 mb-5 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-foreground font-light text-[15px] leading-[1.8] list-decimal pl-6 mb-5 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="tracking-[0.01em]">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-4 my-6 text-muted italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded text-heading">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-surface border border-border rounded-lg p-4 overflow-x-auto mb-6 text-sm">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-heading underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-border my-10" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-heading">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
