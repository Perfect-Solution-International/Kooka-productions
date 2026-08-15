"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { EASE_KOOKA } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectImageProps = {
  readonly project: Project;
  readonly priority: boolean;
  /**
   * Cross-fades instead of clipping and scaling. Set for the reduced-motion
   * preference, and for touch devices — animating `clip-path` and `scale` on a
   * full-width photographic layer is the heaviest paint in the section, and it
   * lands on exactly the hardware least able to absorb it.
   */
  readonly simplified: boolean;
};

/**
 * Layered image plate. Each active project mounts its own absolutely
 * positioned layer, so the outgoing frame keeps rendering while the incoming
 * one clips in over the top — nothing ever swaps `src` under a live element.
 */
export function ProjectImage({
  project,
  priority,
  simplified,
}: ProjectImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-kooka-void">
      <AnimatePresence initial={false}>
        <motion.div
          key={project.image}
          className="absolute inset-0 will-change-[opacity,transform]"
          initial={
            simplified
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.04,
                  y: 18,
                  clipPath: "inset(12% 0% 0% 0%)",
                }
          }
          animate={
            simplified
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                }
          }
          exit={
            simplified
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.04, y: -14 }
          }
          transition={
            simplified
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
            loading={priority ? undefined : "eager"}
            fetchPriority={priority ? undefined : "high"}
            /*
             * Local asset: the custom loader passes it through untouched, so
             * there is no width-derived srcset to generate.
             */
            unoptimized
            className={cn("object-cover", project.focus ?? "object-center")}
          />
        </motion.div>
      </AnimatePresence>

      {/*
        Readability scrim for the overlaid copy — weighted to the lower-left
        where the text sits, and kept off the upper frame so the photography
        stays visible.
      */}
      <div aria-hidden className="kooka-scrim absolute inset-x-0 bottom-0 h-3/5" />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-2/3 bg-linear-to-r from-kooka-void/75 via-kooka-void/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 ring-1 ring-white/8 ring-inset"
      />
    </div>
  );
}
