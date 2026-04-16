"use client";

import { motion } from "framer-motion";
import SectionTransition, { SectionItem } from "@/components/ui/SectionTransition";
import { staggerItem } from "@/components/animations/variants";
import TextDecode from "@/components/ui/TextDecode";
import FluidText from "@/components/ui/FluidText";
import type { SectionId } from "@/lib/constants";

interface ExpertiseProps {
  onNavigate: (section: SectionId) => void;
}

const PILLARS = [
  {
    number: "01",
    title: "Mobile Engineering",
    description:
      "Android & iOS native development, Kotlin Multiplatform libraries and apps. Production systems serving real users.",
    tags: ["Android", "iOS", "KMP", "Jetpack Compose"],
  },
  {
    number: "02",
    title: "AI & Computer Vision",
    description:
      "On-device ML inference, real-time object detection (YOLO family), and end-to-end CV pipeline architecture.",
    tags: ["YOLO", "On-Device ML", "Real-Time Inference"],
  },
  {
    number: "03",
    title: "System Architecture",
    description:
      "End-to-end system design from API to infrastructure to client. Backend services, cross-platform library design.",
    tags: ["Node.js", "Spring Boot", "React", "Next.js", "Docker", "PostgreSQL"],
  },
];

export default function Expertise({ onNavigate: _onNavigate }: ExpertiseProps) {
  return (
    <SectionTransition className="flex items-start md:items-center justify-center min-h-full pt-4 md:pt-0">
      <div className="max-w-4xl w-full">
        <SectionItem>
          <p className="text-muted text-sm font-mono tracking-wider mb-4">
            // 02 Expertise
          </p>
        </SectionItem>

        <SectionItem>
          <h2 className="text-heading text-4xl md:text-5xl font-bold tracking-tighter mb-14">
            <FluidText className="inline">What I bring</FluidText>
            <br />
            <FluidText className="inline">to the </FluidText>
            <span className="font-mono font-medium text-accent">
              <TextDecode text="table." delay={300} />
            </span>
          </h2>
        </SectionItem>

        <div className="space-y-0">
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={staggerItem}
              className="group py-6 border-b border-border last:border-b-0 relative"
            >
              {/* Hover accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />

              <div className="flex items-start gap-6 group-hover:pl-3 transition-all duration-300">
                <span className="text-muted text-sm font-mono pt-1 shrink-0 group-hover:text-accent transition-colors duration-200">
                  {pillar.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-heading text-xl font-semibold mb-2 group-hover:text-heading transition-colors duration-200">
                    {pillar.title}
                  </h3>
                  <p className="text-foreground font-light text-sm leading-relaxed mb-3 max-w-lg tracking-[0.01em]">
                    {pillar.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded group-hover:border-accent/20 group-hover:text-accent/80 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
