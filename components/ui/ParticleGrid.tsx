"use client";

import { useEffect, useRef } from "react";

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
}

const DOT_SPACING = 28;
const DOT_RADIUS = 1;
const INTERACTION_RADIUS = 150;
const RETURN_SPEED = 0.04;
const PUSH_STRENGTH = 20;
const BASE_ALPHA = 0.06;
const GLOW_ALPHA = 0.3;

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function initDots() {
      const dots: Dot[] = [];
      const cols = Math.ceil(w / DOT_SPACING) + 1;
      const rows = Math.ceil(h / DOT_SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const y = r * DOT_SPACING;
          dots.push({ originX: x, originY: y, x, y });
        }
      }
      dotsRef.current = dots;
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots();
    }

    function animate() {
      ctx!.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mx - dot.originX;
        const dy = my - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INTERACTION_RADIUS) {
          const force = (1 - dist / INTERACTION_RADIUS) * PUSH_STRENGTH;
          const angle = Math.atan2(dy, dx);
          dot.x = dot.originX - Math.cos(angle) * force;
          dot.y = dot.originY - Math.sin(angle) * force;
        } else {
          dot.x += (dot.originX - dot.x) * RETURN_SPEED;
          dot.y += (dot.originY - dot.y) * RETURN_SPEED;
        }

        const proximity = dist < INTERACTION_RADIUS
          ? BASE_ALPHA + (GLOW_ALPHA - BASE_ALPHA) * (1 - dist / INTERACTION_RADIUS)
          : BASE_ALPHA;

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(26, 26, 26, ${proximity})`;
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    // Listen on window so mouse events aren't blocked by content layers above
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }

    resize();
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
