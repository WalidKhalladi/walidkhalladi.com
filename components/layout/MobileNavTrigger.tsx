"use client";

import { motion } from "framer-motion";

interface MobileNavTriggerProps {
  onClick: () => void;
}

export default function MobileNavTrigger({ onClick }: MobileNavTriggerProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/80 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Open navigation"
    >
      <span className="text-heading text-xs font-bold tracking-tight">WK</span>
      <span className="w-px h-3 bg-border" />
      <span className="text-muted text-xs font-mono">Menu</span>
    </motion.button>
  );
}
