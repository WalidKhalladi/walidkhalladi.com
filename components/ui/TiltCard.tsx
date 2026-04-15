"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 5,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const shadowX = useMotionValue(0);
  const shadowY = useMotionValue(0);

  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, var(--accent-glow), transparent 60%)`;
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 24px rgba(0,0,0,0.08)`;

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    rotateX.set((y - 0.5) * -maxTilt * 2);
    rotateY.set((x - 0.5) * maxTilt * 2);
    glowX.set(x * 100);
    glowY.set(y * 100);
    // Shadow shifts opposite to tilt for realism
    shadowX.set((x - 0.5) * -10);
    shadowY.set((y - 0.5) * -10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    shadowX.set(0);
    shadowY.set(0);
  }

  return (
    <div style={{ perspective: 600 }}>
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          boxShadow,
        }}
        transition={{ duration: 0 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glowBackground }}
        />
      </motion.div>
    </div>
  );
}
