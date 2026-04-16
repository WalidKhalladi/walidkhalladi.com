"use client";

import { motion } from "framer-motion";

interface FloatingTriggerProps {
  onClick: () => void;
}

export default function FloatingTrigger({ onClick }: FloatingTriggerProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-8 left-8 z-50 h-12 hidden md:flex items-center gap-3 px-5 group cursor-hover"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Open navigation"
    >
      {/* Rotating conic gradient border */}
      <div
        className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-25 transition-opacity duration-500"
        style={{
          background: "conic-gradient(from var(--conic-angle, 0deg), transparent, var(--accent), transparent, var(--accent), transparent)",
          animation: "conicSpin 8s linear infinite",
        }}
      />
      {/* Inner background */}
      <div className="absolute inset-[1px] rounded-full bg-background" />
      {/* Logo + Menu */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt="WK"
        width={20}
        height={20}
        className="relative"
      />
      <span className="relative w-px h-3.5 bg-border" />
      <span className="relative text-muted text-xs font-mono group-hover:text-heading transition-colors duration-300">
        Menu
      </span>
    </motion.button>
  );
}
