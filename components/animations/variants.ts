import type { Variants } from "framer-motion";

// Smooth expo ease-out
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const exitEase: [number, number, number, number] = [0.4, 0, 0.2, 1];

// Direction-aware clip-path reveals for section transitions
export const directionalReveal: Variants = {
  initial: (direction: number) => ({
    clipPath: direction > 0
      ? "inset(0 100% 0 0)"
      : "inset(0 0 0 100%)",
    opacity: 0.5,
    x: direction > 0 ? 60 : -60,
  }),
  animate: {
    clipPath: "inset(0 0% 0 0%)",
    opacity: 1,
    x: 0,
    transition: {
      clipPath: { duration: 0.6, ease: expo },
      opacity: { duration: 0.4, ease: "easeOut" as const },
      x: { duration: 0.7, ease: expo },
    },
  },
  exit: (direction: number) => ({
    clipPath: direction > 0
      ? "inset(0 0 0 100%)"
      : "inset(0 100% 0 0)",
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    scale: 0.97,
    transition: {
      clipPath: { duration: 0.4, ease: exitEase },
      opacity: { duration: 0.3 },
      x: { duration: 0.4, ease: exitEase },
    },
  }),
};

// Kept for backward compatibility — uses the old fade+blur style
export const sectionEnter = directionalReveal;

// Stagger container for section content
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

// Stagger item with fade + slide (no clipPath to avoid clipping interactive children)
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.5, ease: expo },
      y: { duration: 0.6, ease: expo },
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: "easeIn" as const,
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: expo,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
    transition: { duration: 0.25 },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
