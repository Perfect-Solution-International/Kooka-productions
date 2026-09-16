"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { EASE_KOOKA } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectDetailsProps = {
  readonly project: Project;
  readonly index: number;
  readonly total: number;
  readonly reduced: boolean;
  /**
   * Set when the plate is too short to hold the copy at full size — on a short
   * viewport the frame shrinks but the type does not, and the block overflows
   * its own frame.
   */
  readonly compact?: boolean;
};

/** Placeholder for any field the data layer leaves unset. */
const PENDING = "Detail pending";

function orPending(value: string | null | undefined): string {
  return value && value.trim().length > 0 ? value : PENDING;
}

/*
 * A project may legitimately carry no location or year, so the meta line drops
 * the blanks rather than padding them out with the pending placeholder.
 */
function metaParts(project: Project): string[] {
  return [project.type, project.location, project.year].filter(
    (part) => part.trim().length > 0,
  );
}

const enter = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
} as const;

const reducedEnter = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export function ProjectDetails({
  project,
  index,
  total,
  reduced,
  compact = false,
}: ProjectDetailsProps) {
  const meta = metaParts(project);
  const variants = reduced ? reducedEnter : enter;
  const transition = reduced
    ? { duration: 0.18, ease: "linear" as const }
    : { duration: 0.55, ease: EASE_KOOKA };

  return (
    <div className="relative max-w-xl">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.title}
          variants={variants}
          initial="hidden"
          animate="show"
          exit="exit"
          transition={transition}
          className="will-change-[opacity,transform]"
        >
          <p className="font-display text-[0.7rem] font-semibold tracking-[0.28em] text-kooka-amber tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-2 text-kooka-muted">/</span>
            <span className="text-kooka-muted">
              {String(total).padStart(2, "0")}
            </span>
          </p>

          <h3
            className={cn(
              "kooka-display",
              compact
                ? "mt-2 text-xl sm:text-2xl lg:text-3xl"
                : "mt-3 text-2xl sm:mt-5 sm:text-4xl lg:text-5xl",
            )}
          >
            {project.title}
          </h3>

          {meta.length > 0 ? (
            <p
              className={cn(
                "font-display font-medium tracking-[0.2em] text-kooka-mist uppercase",
                compact
                  ? "mt-2 text-[0.55rem]"
                  : "mt-3 text-[0.58rem] sm:mt-4 sm:text-[0.66rem] sm:tracking-[0.24em]",
              )}
            >
              {meta.map((part, partIndex) => (
                <span key={part}>
                  {partIndex > 0 ? (
                    <span className="mx-2.5 text-kooka-muted">·</span>
                  ) : null}
                  {part}
                </span>
              ))}
            </p>
          ) : null}

          <p
            className={cn(
              "max-w-md leading-relaxed text-kooka-mist",
              compact
                ? "mt-2 text-[0.7rem]"
                : "mt-4 text-xs sm:mt-6 sm:text-base",
            )}
          >
            {orPending(project.summary)}
          </p>

          {project.href ? (
            <Link
              href={project.href}
              className={cn(
                /* Full-height row on touch, tight inline link on a pointer. */
                "group inline-flex min-h-11 items-center gap-2.5 font-display font-semibold tracking-[0.2em] text-kooka-white uppercase transition-colors duration-500 hover:text-kooka-amber lg:min-h-0",
                compact
                  ? "mt-3 text-[0.6rem]"
                  : "mt-5 text-[0.66rem] sm:mt-8 sm:text-[0.7rem]",
              )}
            >
              <span>View Project</span>
              <span className="sr-only">: {project.title}</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              />
            </Link>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
