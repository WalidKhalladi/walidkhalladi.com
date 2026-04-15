"use client";

import { useState, useEffect, useCallback } from "react";
import type { SectionId } from "@/lib/constants";
import { NAV_ITEMS } from "@/lib/constants";
import { useDirection } from "@/hooks/useDirection";
import ContentStage from "@/components/layout/ContentStage";
import FloatingTrigger from "@/components/layout/FloatingTrigger";
import MobileNavTrigger from "@/components/layout/MobileNavTrigger";
import EdgeIndicator from "@/components/layout/EdgeIndicator";
import NavigationOverlay from "@/components/layout/NavigationOverlay";
import CustomCursor from "@/components/ui/CustomCursor";

function getInitialSection(): SectionId {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "");
  const valid = NAV_ITEMS.find((item) => item.id === hash);
  return valid ? valid.id : "home";
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>(getInitialSection);
  const [navOpen, setNavOpen] = useState(false);
  const direction = useDirection(activeSection);

  useEffect(() => {
    // Read hash on mount (covers full-page navigation to /#section)
    const hash = window.location.hash.replace(/^#/, "");
    const valid = NAV_ITEMS.find((item) => item.id === hash);
    if (valid) setActiveSection(valid.id);

    const handleHashChange = () => {
      const h = window.location.hash.replace(/^#/, "") as SectionId;
      const v = NAV_ITEMS.find((item) => item.id === h);
      if (v) setActiveSection(v.id);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((section: SectionId) => {
    setActiveSection(section);
    window.history.replaceState(null, "", section === "home" ? "/" : `#${section}`);
  }, []);

  // Keyboard navigation (only when overlay is closed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Escape toggles nav overlay
      if (e.key === "Escape") {
        setNavOpen((prev) => !prev);
        return;
      }

      // Don't handle nav keys when overlay is open (overlay handles its own)
      if (navOpen) return;

      const ids = NAV_ITEMS.map((item) => item.id);
      const currentIndex = ids.indexOf(activeSection);

      const num = parseInt(e.key);
      if (num >= 1 && num <= ids.length) {
        navigate(ids[num - 1]);
        return;
      }

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        const next = Math.min(currentIndex + 1, ids.length - 1);
        navigate(ids[next]);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        const prev = Math.max(currentIndex - 1, 0);
        navigate(ids[prev]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, navigate, navOpen]);

  return (
    <>
      <CustomCursor />
      <div className="h-screen">
        <ContentStage
          activeSection={activeSection}
          direction={direction}
          onNavigate={navigate}
        />
        <FloatingTrigger onClick={() => setNavOpen(true)} />
        <MobileNavTrigger onClick={() => setNavOpen(true)} />
        <EdgeIndicator activeSection={activeSection} onNavigate={navigate} />
        <NavigationOverlay
          isOpen={navOpen}
          onClose={() => setNavOpen(false)}
          activeSection={activeSection}
          onNavigate={navigate}
        />
      </div>
    </>
  );
}
