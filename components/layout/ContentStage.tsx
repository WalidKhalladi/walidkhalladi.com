"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/lib/constants";
import { directionalReveal } from "@/components/animations/variants";
import ParticleGrid from "@/components/ui/ParticleGrid";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

interface ContentStageProps {
  activeSection: SectionId;
  direction: number;
  onNavigate: (section: SectionId) => void;
}

const SECTIONS: Record<SectionId, React.ComponentType<{ onNavigate: (section: SectionId) => void }>> = {
  home: Hero,
  about: About,
  expertise: Expertise,
  work: Projects,
  blog: Blog,
  contact: Contact,
};

export default function ContentStage({ activeSection, direction, onNavigate }: ContentStageProps) {
  const Section = SECTIONS[activeSection];

  return (
    <main className="fixed inset-0 overflow-hidden">
      {/* Interactive particle grid background */}
      <ParticleGrid />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeSection}
          custom={direction}
          variants={directionalReveal}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-[2] h-full w-full overflow-y-auto px-8 md:px-20 lg:px-32 py-12 md:py-16"
        >
          <Section onNavigate={onNavigate} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
