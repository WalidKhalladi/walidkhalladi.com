"use client";

import { motion } from "framer-motion";
import TextDecode from "@/components/ui/TextDecode";
import FluidText from "@/components/ui/FluidText";
import type { SectionId } from "@/lib/constants";

interface AboutProps {
  onNavigate: (section: SectionId) => void;
}

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
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

const item = {
  initial: { opacity: 0, y: 24, clipPath: "inset(0 100% 0 0)" },
  animate: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.6, ease: expo },
  },
  exit: {
    opacity: 0,
    y: -12,
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

export default function About({ onNavigate: _onNavigate }: AboutProps) {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-center h-full"
    >
      <div className="max-w-2xl w-full">
        <motion.p
          variants={item}
          className="text-muted text-sm font-mono tracking-wider mb-4"
        >
          // 01 About
        </motion.p>

        <motion.h2
          variants={item}
          className="text-heading text-4xl md:text-5xl font-bold tracking-tighter mb-10"
        >
          <FluidText className="inline">Behind the</FluidText>
          <br />
          <span className="font-mono font-medium text-accent">
            <TextDecode text="systems." delay={300} />
          </span>
        </motion.h2>

        <div className="space-y-5 text-foreground font-light leading-[1.8] text-[15px] tracking-[0.01em]">
          <motion.p variants={item}>
            Software engineer based in Munich. I work on mobile systems,
            on-device AI, and the infrastructure that connects them. Android,
            iOS, Kotlin Multiplatform — wherever the problem lives, that&apos;s
            where I go.
          </motion.p>

          <motion.p variants={item}>
            I own what I build. From architecture to deployment, I don&apos;t
            hand things off half-done. If it ships under my name, I&apos;ve
            touched every layer — the model inference, the UI, the pipeline,
            the release. That&apos;s not a preference, it&apos;s how I work.
          </motion.p>

          <motion.p variants={item}>
            When existing tools slow me down, I build my own. Most of my side
            projects started as friction — a missing abstraction, a bad API,
            something that should have existed but didn&apos;t.
          </motion.p>

          <motion.p variants={item}>
            Outside of code — philosophy books, psychology reads, and the gym.
            I like understanding how things work, whether it&apos;s a system
            or a mind.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
