"use client";

import { useEffect, useRef, useState } from "react";
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
}: ScrollProjectShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinHeight, setPinHeight] = useState(0);
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
   * The track is sized from the pin's measured height rather than a CSS
   * viewport unit. `dvh`/`svh` resolve against the visual viewport while
   * scroll progress is computed from the layout viewport, and on mobile the
   * two differ — sizing the track in viewport units then leaves the last
   * project unreachable. Measuring keeps the two in agreement everywhere.
   */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const observer = new ResizeObserver(([entry]) => {
      setPinHeight(entry.contentRect.height);
    });
    observer.observe(pin);

    return () => observer.disconnect();
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
        /* Height until the pin is measured, so the track is never zero-height. */
        pinHeight === 0 && "min-h-dvh",
        className,
      )}
      /*
       * One pinned viewport, plus a slide of scroll travel per project.
       */
      style={
        pinHeight > 0
          ? {
              minHeight:
                pinHeight *
                (1 +
                  projects.length *
                    (isDesktop ? SLIDE_RATIO_DESKTOP : SLIDE_RATIO_MOBILE)),
            }
          : undefined
      }
    >
      <div
        ref={pinRef}
        className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden py-14 sm:py-16 lg:py-0"
      >
        <div className="kooka-container w-full">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            {/* Content column — 40% of the editorial split. */}
            <div className="order-2 lg:order-1">
              <ProjectDetails
                project={activeProject}
                index={activeIndex}
                total={projects.length}
                reduced={reduced}
              />

              <div className="mt-10 lg:hidden">
                <ProjectProgress
                  titles={projects.map((project) => project.title)}
                  activeIndex={activeIndex}
                  progress={scrollYProgress}
                />
              </div>
            </div>

            {/* Image column — 60%, the visual anchor. */}
            <div className="order-1 flex items-center gap-8 lg:order-2">
              <div className="relative aspect-4/5 w-full sm:aspect-4/3 lg:aspect-16/10">
                <ProjectImage
                  project={activeProject}
                  index={activeIndex}
                  priority={activeIndex === 0}
                  reduced={reduced}
                />
              </div>

              <div className="hidden self-stretch py-6 lg:flex">
                <ProjectProgress
                  titles={projects.map((project) => project.title)}
                  activeIndex={activeIndex}
                  progress={scrollYProgress}
                />
              </div>
            </div>
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
