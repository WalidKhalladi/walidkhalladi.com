"use client";

import { useEffect, useRef, useState } from "react";

interface FluidTextProps {
  children: string;
  className?: string;
  maxDisplacement?: number;
  radius?: number;
}

export default function FluidText({
  children,
  className = "",
  maxDisplacement = 4,
  radius = 100,
}: FluidTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window) return;
    setIsMounted(true);

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function animate() {
      const chars = charsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < chars.length; i++) {
        const el = chars[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);

        if (dist < radius) {
          const factor = 1 - dist / radius;
          el.style.transform = `translateY(${-maxDisplacement * factor}px)`;
        } else {
          el.style.transform = "translateY(0px)";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [maxDisplacement, radius]);

  // On touch devices or before mount, render plain text
  if (!isMounted) {
    return <span className={className}>{children}</span>;
  }

  const chars = children.split("");

  return (
    <span ref={containerRef} className={className} aria-label={children}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) charsRef.current[i] = el;
          }}
          className="inline-block transition-transform duration-150 ease-out"
          style={{ willChange: "transform" }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
