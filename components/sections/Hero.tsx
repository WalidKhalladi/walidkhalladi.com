"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTransition, { SectionItem } from "@/components/ui/SectionTransition";
import { scaleIn } from "@/components/animations/variants";
import MagneticElement from "@/components/ui/MagneticElement";
import TextDecode from "@/components/ui/TextDecode";
import type { SectionId } from "@/lib/constants";

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <SectionTransition className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 h-full max-w-5xl mx-auto pb-20 md:pb-0">
      <div className="flex flex-col justify-center flex-1">
        <SectionItem>
          <h1 className="text-heading text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] tracking-tighter mb-5">
            <TextDecode text="Walid" delay={200} />
            <br />
            <span className="font-mono font-medium">
              <TextDecode text="Khalladi" delay={350} />
            </span>
          </h1>
        </SectionItem>

        <SectionItem>
          <p className="text-foreground text-lg md:text-xl font-light leading-relaxed max-w-md mb-10 tracking-[0.01em]">
            I build what runs on your phone.
          </p>
        </SectionItem>

        <SectionItem>
          <div className="flex gap-3">
            <MagneticElement strength={0.2}>
              <button
                onClick={() => onNavigate("work")}
                className="relative px-6 py-3 bg-heading text-background text-sm font-medium rounded-md transition-all duration-300 hover:shadow-[0_0_24px_var(--accent-glow)] hover:scale-[1.02]"
              >
                See my work
              </button>
            </MagneticElement>
            <MagneticElement strength={0.2}>
              <button
                onClick={() => onNavigate("contact")}
                className="px-6 py-3 border border-border text-muted text-sm font-light rounded-md transition-all duration-300 hover:border-accent hover:text-heading hover:scale-[1.02]"
              >
                Get in touch
              </button>
            </MagneticElement>
          </div>
        </SectionItem>

        {/* Scroll hint */}
        <SectionItem>
          <motion.div
            className="mt-16 flex items-center gap-2 text-muted text-xs font-mono"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="inline-block w-4 h-px bg-muted" />
            WK for menu · arrow keys · 1-6 to navigate
          </motion.div>
        </SectionItem>
      </div>

      <motion.div
        variants={scaleIn}
        initial="initial"
        animate="animate"
        className="shrink-0"
      >
        <div className="relative w-36 h-36 md:w-64 md:h-64 lg:w-80 lg:h-80">
          <Image
            src="/images/pixel_new_me.png"
            alt="Walid Khalladi"
            fill
            className="object-cover rounded-2xl grayscale"
            priority
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10" />
        </div>
      </motion.div>
    </SectionTransition>
  );
}
