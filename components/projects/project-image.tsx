"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { EASE_KOOKA } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectImageProps = {
  readonly project: Project;
  readonly index: number;
  readonly priority: boolean;
  readonly reduced: boolean;
};

/**
 * Layered image plate. Each active project mounts its own absolutely
 * positioned layer, so the outgoing frame keeps rendering while the incoming
 * one clips in over the top — nothing ever swaps `src` under a live element.
 */
export function ProjectImage({
  project,
  index,
  priority,
  reduced,
}: ProjectImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-kooka-void">
      <AnimatePresence initial={false}>
        <motion.div
          key={project.image}
          className="absolute inset-0 will-change-[opacity,transform]"
          initial={
            reduced
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.04,
                  y: 18,
                  clipPath: "inset(12% 0% 0% 0%)",
                }
          }
          animate={
            reduced
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                }
          }
          exit={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.04, y: -14 }
          }
          transition={
            reduced
              ? { duration: 0.18, ease: "linear" }
              : { duration: 0.85, ease: EASE_KOOKA }
          }
        >
          <Image
            src={project.image}
            alt={`${project.title} — ${project.type} production in ${project.location}, ${project.year}`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            /*
             * Local asset: the custom loader passes it through untouched, so
             * there is no width-derived srcset to generate.
             */
            unoptimized
            className={cn("object-cover", project.focus ?? "object-center")}
          />
        </motion.div>
      </AnimatePresence>

      {/* Readability scrim — kept light so the photography stays visible. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-kooka-void/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 ring-1 ring-white/8 ring-inset"
      />

      <span
        aria-hidden
        className="absolute top-5 left-5 font-display text-[0.6rem] font-semibold tracking-[0.24em] text-kooka-white/70 uppercase sm:top-7 sm:left-7 sm:text-[0.66rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
