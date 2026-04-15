"use client";

import { motion } from "framer-motion";
import type { SectionId } from "@/lib/constants";
import { NAV_ITEMS } from "@/lib/constants";

interface EdgeIndicatorProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export default function EdgeIndicator({ activeSection, onNavigate }: EdgeIndicatorProps) {
  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group flex items-center justify-end cursor-hover"
            aria-label={`Navigate to ${item.label}`}
          >
            <motion.div
              className="h-[2px] rounded-full"
              animate={{
                width: isActive ? 24 : 12,
                backgroundColor: isActive ? "var(--accent)" : "var(--muted)",
                opacity: isActive ? 1 : 0.3,
              }}
              whileHover={{
                width: isActive ? 24 : 18,
                opacity: isActive ? 1 : 0.6,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        );
      })}
    </motion.div>
  );
}
