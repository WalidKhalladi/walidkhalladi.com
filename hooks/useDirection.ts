import { useRef, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import type { SectionId } from "@/lib/constants";

export function useDirection(activeSection: SectionId): number {
  const prevIndex = useRef(0);
  const direction = useRef(1);

  useEffect(() => {
    const currentIndex = NAV_ITEMS.findIndex((item) => item.id === activeSection);
    if (currentIndex !== prevIndex.current) {
      direction.current = currentIndex > prevIndex.current ? 1 : -1;
      prevIndex.current = currentIndex;
    }
  }, [activeSection]);

  return direction.current;
}
