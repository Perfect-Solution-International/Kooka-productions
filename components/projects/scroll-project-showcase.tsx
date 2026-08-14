"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import type { Project } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { ProjectDetails } from "./project-details";
import { ProjectImage } from "./project-image";
import { ProjectProgress } from "./project-progress";

type ScrollProjectShowcaseProps = {
  readonly projects: readonly Project[];
  readonly className?: string;
  /** Section heading, pinned above the projects for the whole interaction. */
  readonly heading?: ReactNode;
};

/**
 * Fraction of a slide the progress must overshoot a boundary before the active
 * index flips. Stops the state thrashing when a scroll comes to rest exactly on
 * a boundary.
 */
const HYSTERESIS = 0.12;

/**
 * Scroll travel per project, as a multiple of the pinned viewport. Phones get
 * a shorter slide so the section does not balloon the page length.
 */
const SLIDE_RATIO_DESKTOP = 0.9;
const SLIDE_RATIO_MOBILE = 0.6;
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Maps raw scroll progress to an active index, holding the previous index
 * until the progress has cleared the boundary by `HYSTERESIS`. Jumps of more
 * than one step resolve immediately, so a fast scroll lands on the right
 * project without stepping through the ones it skipped.
 */
function resolveIndex(
  progress: number,
  previous: number,
  count: number,
): number {
  const scaled = progress * count;
  const raw = Math.min(count - 1, Math.max(0, Math.floor(scaled)));

  if (Math.abs(raw - previous) !== 1) return raw;

  const boundary = Math.max(raw, previous);
  const distance = Math.abs(scaled - boundary);

  return distance < HYSTERESIS ? previous : raw;
}

export function ScrollProjectShowcase({
  projects,
  className,
  heading,
}: ScrollProjectShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(query.matches);

    sync();
    query.addEventListener("change", sync);

    return () => query.removeEventListener("change", sync);
  }, []);

  /*
   * The track is sized from `innerHeight`, which is the same viewport height
   * `useScroll` resolves its `end end` offset against. Deriving it from a CSS
   * viewport unit (or from the pin's own measured height) breaks on mobile,
   * where `dvh`/`svh` follow the visual viewport while scroll progress is
   * computed from the layout viewport — progress then saturates before the
   * pin releases and the final project is never reached.
   */
  useEffect(() => {
    const sync = () => setViewportHeight(window.innerHeight);

    sync();
    window.addEventListener("resize", sync);

    return () => window.removeEventListener("resize", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveIndex((previous) =>
      resolveIndex(value, previous, projects.length),
    );
  });

  /*
   * Warm only the next image, so a quick scroll does not land on an empty
   * frame while avoiding an upfront fetch of every full-size still.
   */
  useEffect(() => {
    const next = projects[activeIndex + 1];
    if (!next) return;

    const preload = new window.Image();
    preload.src = next.image;
  }, [activeIndex, projects]);

  if (projects.length === 0) return null;

  const activeProject = projects[activeIndex];

  return (
    <div
      ref={sectionRef}
      className={cn(
        /* Height before measurement, so the track is never zero-height. */
        viewportHeight === 0 && "min-h-dvh",
        className,
      )}
      /*
       * One pinned viewport, plus a slide of scroll travel per project.
       */
      style={
        viewportHeight > 0
          ? {
              minHeight:
                viewportHeight *
                (1 +
                  projects.length *
                    (isDesktop ? SLIDE_RATIO_DESKTOP : SLIDE_RATIO_MOBILE)),
            }
          : undefined
      }
    >
      {/*
        The pin is sized from the same measured viewport height as the track,
        so it releases exactly as scroll progress reaches 1.
      */}
      <div
        className={cn(
          "sticky top-0 flex items-center justify-center overflow-hidden py-14 sm:py-16 lg:py-0",
          viewportHeight === 0 && "h-dvh",
        )}
        style={{ height: viewportHeight > 0 ? viewportHeight : undefined }}
      >
        <div className="kooka-container w-full">
          {heading ? <div className="mb-10 lg:mb-14">{heading}</div> : null}

          {/* Single cinematic plate; copy rides the scrim in the lower-left. */}
          <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-4/3 lg:aspect-16/9">
            <ProjectImage
              project={activeProject}
              priority={activeIndex === 0}
              reduced={reduced}
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 p-6 sm:p-10 lg:p-14">
              <ProjectDetails
                project={activeProject}
                index={activeIndex}
                total={projects.length}
                reduced={reduced}
              />

              <div className="hidden h-40 shrink-0 pb-1 lg:block">
                <ProjectProgress
                  titles={projects.map((project) => project.title)}
                  activeIndex={activeIndex}
                  progress={scrollYProgress}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 lg:hidden">
            <ProjectProgress
              titles={projects.map((project) => project.title)}
              activeIndex={activeIndex}
              progress={scrollYProgress}
            />
          </div>
        </div>

        {/*
          Announces the active project to assistive tech, since the change is
          otherwise conveyed only by the visual transition. Lives inside the
          pinned viewport so it stays mounted for the whole interaction.
        */}
        <p aria-live="polite" aria-atomic className="sr-only">
          {`Project ${activeIndex + 1} of ${projects.length}: ${activeProject.title}`}
        </p>
      </div>
    </div>
  );
}
