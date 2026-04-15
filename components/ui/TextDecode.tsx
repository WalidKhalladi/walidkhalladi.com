"use client";

import { useEffect, useState, useRef } from "react";

interface TextDecodeProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

export default function TextDecode({
  text,
  className = "",
  delay = 0,
  duration = 600,
}: TextDecodeProps) {
  const [displayed, setDisplayed] = useState(text);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const chars = text.split("");
    const resolveFrames = chars.map((_, i) =>
      Math.floor((i / chars.length) * duration * 0.8) + Math.random() * duration * 0.2
    );

    const startTime = performance.now() + delay;
    let rafId: number;

    function tick() {
      const elapsed = performance.now() - startTime;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const result = chars.map((char, i) => {
        if (char === " ") return " ";
        if (elapsed >= resolveFrames[i]) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      setDisplayed(result.join(""));

      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [text, delay, duration]);

  return <span className={className}>{displayed}</span>;
}
