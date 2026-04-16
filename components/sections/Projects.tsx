"use client";

import { motion } from "framer-motion";
import SectionTransition, { SectionItem } from "@/components/ui/SectionTransition";
import { staggerItem } from "@/components/animations/variants";
import TextDecode from "@/components/ui/TextDecode";
import FluidText from "@/components/ui/FluidText";
import TiltCard from "@/components/ui/TiltCard";
import type { SectionId } from "@/lib/constants";

interface ProjectsProps {
  onNavigate: (section: SectionId) => void;
}

const PROJECTS = [
  {
    title: "Chantik",
    role: "Solo Developer & Architect",
    description:
      "Construction site management — from progress tracking to team coordination. Designed the full architecture, built it end-to-end, and shipped it to real users in the field.",
    stack: ["Kotlin", "Jetpack Compose", "MVVM", "Room", "Retrofit"],
    highlight: "In Production",
    icon: "CH",
    url: "https://chantik.tn",
  },
];

export default function Projects({ onNavigate: _onNavigate }: ProjectsProps) {
  return (
    <SectionTransition className="flex items-start md:items-center justify-center min-h-full pt-4 md:pt-0">
      <div className="max-w-4xl w-full">
        <SectionItem>
          <p className="text-muted text-sm font-mono tracking-wider mb-4">
            // 03 Work
          </p>
        </SectionItem>

        <SectionItem>
          <h2 className="text-heading text-4xl md:text-5xl font-bold tracking-tighter mb-14">
            <FluidText className="inline">Things I&apos;ve</FluidText>
            <br />
            <span className="font-mono font-medium text-accent">
              <TextDecode text="shipped." delay={300} />
            </span>
          </h2>
        </SectionItem>

        <div className="space-y-6">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              className="group"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiltCard className="relative border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_30px_var(--accent-glow)]">
                  <div className="flex gap-5">
                    {/* Project icon */}
                    <div className="hidden md:flex w-14 h-14 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-heading text-sm font-mono group-hover:border-accent/30 transition-colors">
                      {project.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-heading text-2xl font-semibold tracking-tight group-hover:text-heading transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted text-sm font-light">{project.role}</p>
                        </div>
                        <span className="text-xs font-mono text-muted border border-border px-2.5 py-1 rounded self-start group-hover:text-accent group-hover:border-accent/30 transition-colors">
                          {project.highlight}
                        </span>
                      </div>

                      <p className="text-foreground font-light text-[15px] leading-relaxed mb-5 max-w-2xl tracking-[0.01em]">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="text-muted text-sm group-hover:text-accent transition-colors duration-300 ml-4 shrink-0">
                          Visit site &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
