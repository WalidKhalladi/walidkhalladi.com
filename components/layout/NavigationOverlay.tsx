"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionId } from "@/lib/constants";
import { NAV_ITEMS } from "@/lib/constants";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const overlayVariants = {
  closed: {
    clipPath: "circle(0% at 40px calc(100% - 40px))",
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const, delay: 0.2 },
  },
  open: {
    clipPath: "circle(150% at 40px calc(100% - 40px))",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const navItemVariants = {
  closed: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)",
  },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.15 + i * 0.06,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function NavigationOverlay({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}: NavigationOverlayProps) {
  const handleNavigate = useCallback(
    (section: SectionId) => {
      onNavigate(section);
      onClose();
    },
    [onNavigate, onClose]
  );

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Number keys for direct nav
      const num = parseInt(e.key);
      if (num >= 1 && num <= NAV_ITEMS.length) {
        handleNavigate(NAV_ITEMS[num - 1].id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNavigate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-background flex items-center justify-center"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Close hint */}
          <motion.div
            className="absolute top-8 right-8 text-muted text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
          >
            ESC to close
          </motion.div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  custom={i}
                  variants={navItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={() => handleNavigate(item.id)}
                  className="group flex items-center gap-6 py-2 cursor-hover"
                >
                  <span className="text-muted text-sm font-mono w-8 text-right group-hover:text-accent transition-colors duration-200">
                    {item.number}
                  </span>
                  <span
                    className={`text-4xl md:text-6xl font-bold tracking-tighter transition-colors duration-200 ${
                      isActive
                        ? "text-accent"
                        : "text-muted/40 group-hover:text-heading"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="navActiveArrow"
                      className="text-accent text-2xl"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    >
                      &larr;
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Bottom info */}
          <motion.div
            className="absolute bottom-8 left-8 text-muted/40 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Munich, DE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
