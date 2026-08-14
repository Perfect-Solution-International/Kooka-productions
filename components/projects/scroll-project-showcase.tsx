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
/* Tailwind's `sm` breakpoint, where the plate switches to `aspect-4/3`. */
const SMALL_QUERY = "(min-width: 640px)";

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

/**
 * Below this the overlay copy no longer fits the plate at full size, measured
 * against the tallest overlay in the set (two-line title plus two-line
 * summary).
 */
const COMPACT_PLATE_HEIGHT = 420;

type PlateMetrics = {
  readonly containerWidth: number;
  readonly isDesktop: boolean;
  readonly isSmall: boolean;
};

/**
 * Whether the plate is short enough that the overlay copy needs its condensed
 * treatment. The plate now spans the container, so its height comes from the
 * container width and the aspect ratio — not from the leftover viewport.
 */
function resolvePlate({
  containerWidth,
  isDesktop,
  isSmall,
}: PlateMetrics): boolean {
  if (containerWidth <= 0) return false;

  /* Matches the plate's `aspect-4/5 sm:aspect-4/3 lg:aspect-16/9`. */
  let ratio = 4 / 5;
  if (isDesktop) ratio = 16 / 9;
  else if (isSmall) ratio = 4 / 3;

  return containerWidth / ratio < COMPACT_PLATE_HEIGHT;
}

export function ScrollProjectShowcase({
  projects,
  className,
  heading,
}: ScrollProjectShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const reduced = useReducedMotion();

  /*
   * The plate spans the container, so its height follows this width. Measured
   * so the overlay's compact mode reacts to the real box rather than a guess.
   */
  useEffect(() => {
    const node = plateRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const small = window.matchMedia(SMALL_QUERY);

    const sync = () => {
      setIsDesktop(desktop.matches);
      setIsSmall(small.matches);
    };

    sync();
    desktop.addEventListener("change", sync);
    small.addEventListener("change", sync);

    return () => {
      desktop.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
    };
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

  const isCompactPlate = resolvePlate({ containerWidth, isDesktop, isSmall });

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
        The heading scrolls away above the pin rather than sitting inside it.
        Sharing the pin's fixed height meant the plate could only use whatever
        the heading left over, which shrank it to roughly half the container
        width on short windows.
      */}
      {heading ? (
        <div className="kooka-container pb-10 lg:pb-12">
          {heading}
        </div>
      ) : null}

      {/*
        The pin is sized from the same measured viewport height as the track,
        so it releases exactly as scroll progress reaches 1.
      */}
      {/*
        `min-h` rather than a fixed `height`: the plate spans the full
        container width, so on a short window it is taller than the viewport
        and the pin has to grow with it instead of clipping it.
      */}
      <div
        className={cn(
          "sticky top-0 flex items-center justify-center py-8 lg:py-10",
          viewportHeight === 0 && "min-h-dvh",
        )}
        style={{ minHeight: viewportHeight > 0 ? viewportHeight : undefined }}
      >
        <div className="kooka-container flex w-full flex-col justify-center">
          {/* Full container width, same as every other section on the page. */}
          <div
            ref={plateRef}
            className="relative aspect-4/5 w-full overflow-hidden sm:aspect-4/3 lg:aspect-16/9"
          >
            <ProjectImage
              project={activeProject}
              priority={activeIndex === 0}
              reduced={reduced}
            />

            {/*
              Capped to the plate so the copy can never grow past the top of
              the image: this is an `items-end` row, so an overlay taller than
              its frame would otherwise push its own first lines out of view.
            */}
            <div className="absolute inset-0 flex items-end justify-between gap-8 overflow-hidden p-6 sm:p-10 lg:p-14">
              <ProjectDetails
                project={activeProject}
                index={activeIndex}
                total={projects.length}
                reduced={reduced}
                compact={isCompactPlate}
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

          <div className="mt-6 shrink-0 lg:hidden">
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
