"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { EASE_KOOKA } from "@/lib/motion";

type ProjectDetailsProps = {
  readonly project: Project;
  readonly index: number;
  readonly total: number;
  readonly reduced: boolean;
};

/** Placeholder for any field the data layer leaves unset. */
const PENDING = "Detail pending";

function orPending(value: string | null | undefined): string {
  return value && value.trim().length > 0 ? value : PENDING;
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
}: ProjectDetailsProps) {
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

          <h3 className="kooka-display mt-3 text-2xl sm:mt-5 sm:text-4xl lg:text-5xl">
            {project.title}
          </h3>

          <p className="mt-3 font-display text-[0.58rem] font-medium tracking-[0.2em] text-kooka-mist uppercase sm:mt-4 sm:text-[0.66rem] sm:tracking-[0.24em]">
            {orPending(project.type)}
            <span className="mx-2.5 text-kooka-muted">·</span>
            {orPending(project.location)}
            <span className="mx-2.5 text-kooka-muted">·</span>
            {orPending(project.year)}
          </p>

          <p className="mt-4 max-w-md text-xs leading-relaxed text-kooka-mist sm:mt-6 sm:text-base">
            {orPending(project.summary)}
          </p>

          {project.href ? (
            <Link
              href={project.href}
              className="group mt-5 inline-flex items-center gap-2.5 font-display text-[0.66rem] font-semibold tracking-[0.2em] text-kooka-white uppercase transition-colors duration-500 hover:text-kooka-amber sm:mt-8 sm:text-[0.7rem]"
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
