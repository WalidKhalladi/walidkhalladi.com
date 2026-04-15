"use client";

import { motion } from "framer-motion";
import SectionTransition, { SectionItem } from "@/components/ui/SectionTransition";
import { staggerItem } from "@/components/animations/variants";
import TextDecode from "@/components/ui/TextDecode";
import FluidText from "@/components/ui/FluidText";
import MagneticElement from "@/components/ui/MagneticElement";
import type { SectionId } from "@/lib/constants";

interface ContactProps {
  onNavigate: (section: SectionId) => void;
}

const LINKS = [
  {
    number: "01",
    label: "GitHub",
    href: "https://github.com/WalidKhalladi",
    external: true,
  },
  {
    number: "02",
    label: "LinkedIn",
    href: "https://linkedin.com/in/walidkhalladi",
    external: true,
  },
];

export default function Contact({ onNavigate: _onNavigate }: ContactProps) {
  return (
    <SectionTransition className="flex items-center justify-center h-full">
      <div className="max-w-2xl w-full">
        <SectionItem>
          <p className="text-muted text-sm font-mono tracking-wider mb-4">
            // 05 Contact
          </p>
        </SectionItem>

        <SectionItem>
          <h2 className="text-heading text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            <FluidText className="inline">Let&apos;s work</FluidText>
            <br />
            <span className="font-mono font-medium text-accent">
              <TextDecode text="together." delay={300} />
            </span>
          </h2>
        </SectionItem>

        <SectionItem>
          <div className="flex items-center gap-3 mb-12">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-foreground text-sm font-light">
              Available for freelance &amp; consulting
            </span>
          </div>
        </SectionItem>

        <SectionItem>
          <p className="text-foreground font-light leading-relaxed mb-12 tracking-[0.01em]">
            Open to freelance projects, consulting, and interesting collaborations.
            If you have a mobile or AI/CV challenge — let&apos;s talk.
          </p>
        </SectionItem>

        <div className="space-y-0">
          {LINKS.map((link) => (
            <MagneticElement key={link.number} strength={0.15}>
            <motion.a
              variants={staggerItem}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 py-5 border-b border-border last:border-b-0 text-heading transition-all duration-300 group relative"
            >
              {/* Hover underline animation */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />

              <span className="text-sm font-mono text-muted group-hover:text-accent transition-colors duration-200">
                {link.number}
              </span>
              <span className="text-lg font-light group-hover:translate-x-1 transition-transform duration-200">
                {link.label}
              </span>
              <span className="ml-auto text-muted text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0">
                {link.external ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                ) : (
                  "&rarr;"
                )}
              </span>
            </motion.a>
            </MagneticElement>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
