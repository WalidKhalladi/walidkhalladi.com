"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);
  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const armsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    function moveCursor(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("a, button, [role='button'], .cursor-hover");
      if (hoverable && !isHovering.current) {
        isHovering.current = true;
        if (armsRef.current) {
          armsRef.current.dataset.hover = "true";
        }
        if (dotRef.current) {
          dotRef.current.style.transform = "translate(-50%, -50%) scale(1.5)";
        }
      } else if (!hoverable && isHovering.current) {
        isHovering.current = false;
        if (armsRef.current) {
          armsRef.current.dataset.hover = "false";
        }
        if (dotRef.current) {
          dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        }
      }
    }

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Center dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-heading rounded-full pointer-events-none z-[100] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          transition: "transform 0.15s",
        }}
      />
      {/* Crosshair arms */}
      <motion.div
        ref={armsRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        data-hover="false"
      >
        {/* Top arm */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-heading/60 transition-all duration-200 origin-bottom"
          style={{ bottom: "calc(50% + 4px)", height: "6px" }}
          data-arm="top"
        />
        {/* Bottom arm */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-heading/60 transition-all duration-200 origin-top"
          style={{ top: "calc(50% + 4px)", height: "6px" }}
          data-arm="bottom"
        />
        {/* Left arm */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-px bg-heading/60 transition-all duration-200 origin-right"
          style={{ right: "calc(50% + 4px)", width: "6px" }}
          data-arm="left"
        />
        {/* Right arm */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-px bg-heading/60 transition-all duration-200 origin-left"
          style={{ left: "calc(50% + 4px)", width: "6px" }}
          data-arm="right"
        />
      </motion.div>

      {/* CSS for hover state expansion */}
      <style jsx global>{`
        [data-hover="true"] [data-arm="top"],
        [data-hover="true"] [data-arm="bottom"] {
          height: 12px !important;
        }
        [data-hover="true"] [data-arm="left"],
        [data-hover="true"] [data-arm="right"] {
          width: 12px !important;
        }
        [data-hover="true"] [data-arm="top"] { bottom: calc(50% + 6px) !important; }
        [data-hover="true"] [data-arm="bottom"] { top: calc(50% + 6px) !important; }
        [data-hover="true"] [data-arm="left"] { right: calc(50% + 6px) !important; }
        [data-hover="true"] [data-arm="right"] { left: calc(50% + 6px) !important; }
      `}</style>
    </>
  );
}
