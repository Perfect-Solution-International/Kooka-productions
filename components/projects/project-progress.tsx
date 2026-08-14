"use client";

import { motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type ProjectProgressProps = {
  readonly titles: readonly string[];
  readonly activeIndex: number;
  readonly progress: MotionValue<number>;
};

/**
 * Scroll rail with one tick per project. The fill is driven straight off the
 * scroll motion value, so it never re-renders React on scroll. The rail runs
 * horizontally on small screens and vertically from `lg` up, which needs two
 * separate transform axes rather than one shared element.
 */
export function ProjectProgress({
  titles,
  activeIndex,
  progress,
}: ProjectProgressProps) {
  return (
    <div aria-hidden className="flex items-center gap-4 lg:flex-col lg:gap-5">
      <div className="relative h-px flex-1 overflow-hidden bg-white/12 lg:hidden">
        <motion.div
          className="absolute inset-0 origin-left bg-kooka-amber"
          style={{ scaleX: progress }}
        />
      </div>

      <div className="relative hidden w-px flex-1 overflow-hidden bg-white/12 lg:block">
        <motion.div
          className="absolute inset-0 origin-top bg-kooka-amber"
          style={{ scaleY: progress }}
        />
      </div>

      <ul className="flex items-center gap-3 lg:flex-col lg:items-center lg:gap-2.5">
        {titles.map((title, index) => (
          <li
            key={title}
            className={cn(
              "font-display text-[0.6rem] font-semibold tracking-[0.2em] tabular-nums transition-colors duration-500",
              index === activeIndex ? "text-kooka-amber" : "text-kooka-muted",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </li>
        ))}
      </ul>
    </div>
  );
}
