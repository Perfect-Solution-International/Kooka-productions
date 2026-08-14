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
 * Vertical padding on the pin: the top clears the fixed header, the bottom is
 * breathing room under the plate. The measured heading height already carries
 * the heading's own bottom margin, so no separate gap is subtracted here —
 * doing so would double-count it and shrink the plate.
 */
const PIN_PADDING_DESKTOP = 128;
const PIN_PADDING_MOBILE = 120;
/** The horizontal progress rail that sits under the plate below `lg`. */
const MOBILE_RAIL = 52;
/**
 * Below this the overlay copy no longer fits the plate at full size, measured
 * against the tallest overlay in the set (two-line title plus two-line
 * summary).
 */
const COMPACT_PLATE_HEIGHT = 420;

type PlateMetrics = {
  readonly viewportHeight: number;
  readonly headingHeight: number;
  readonly isDesktop: boolean;
  readonly isSmall: boolean;
};

/**
 * Caps the plate's width to `height * ratio`, where the height is whatever the
 * pin has left after the heading. The plate's aspect ratio is width-derived
 * while the pin's height is viewport-derived, so without this the plate
 * overflows the pin on short windows and its overlaid copy gets clipped.
 */
function resolvePlate({
  viewportHeight,
  headingHeight,
  isDesktop,
  isSmall,
}: PlateMetrics): { maxWidth: number; compact: boolean } {
  if (viewportHeight <= 0) return { maxWidth: 0, compact: false };

  const padding = isDesktop ? PIN_PADDING_DESKTOP : PIN_PADDING_MOBILE;
  const rail = isDesktop ? 0 : MOBILE_RAIL;
  const height = viewportHeight - headingHeight - padding - rail;

  if (height <= 0) return { maxWidth: 0, compact: false };

  /* Matches the plate's `aspect-4/5 sm:aspect-4/3 lg:aspect-16/9`. */
  let ratio = 4 / 5;
  if (isDesktop) ratio = 16 / 9;
  else if (isSmall) ratio = 4 / 3;

  return {
    maxWidth: height * ratio,
    compact: height < COMPACT_PLATE_HEIGHT,
  };
}

export function ScrollProjectShowcase({
  projects,
  className,
  heading,
}: ScrollProjectShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [headingHeight, setHeadingHeight] = useState(0);
  const reduced = useReducedMotion();

  /*
   * The heading shares the pin's fixed height with the plate, so the plate can
   * only have whatever it leaves behind. Measured rather than assumed, since
   * the heading wraps to a different number of lines at each breakpoint.
   */
  useEffect(() => {
    const node = headingRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeadingHeight(entry.contentRect.height);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [heading]);

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

  const { maxWidth: plateMaxWidth, compact: isCompactPlate } = resolvePlate({
    viewportHeight,
    headingHeight,
    isDesktop,
    isSmall,
  });

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
          /*
            Extra top padding clears the fixed header, which overlays the pin
            and would otherwise cut the top of the heading.
          */
          "sticky top-0 flex items-center justify-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-24 lg:pb-8",
          viewportHeight === 0 && "h-dvh",
        )}
        style={{ height: viewportHeight > 0 ? viewportHeight : undefined }}
      >
        <div className="kooka-container flex max-h-full w-full flex-col justify-center">
          {heading ? (
            <div ref={headingRef} className="mb-6 shrink-0 lg:mb-7">
              {heading}
            </div>
          ) : null}

          {/*
            The plate's ratio is width-derived while the pin's height is
            viewport-derived, so on a short or wide window the ratio alone
            overflows the pin and `overflow-hidden` clips the overlaid copy.
            This wrapper caps the plate's width to `plateHeight * ratio`, so
            the plate shrinks to the height actually left after the heading
            while keeping its aspect ratio intact.
          */}
          <div
            className="mx-auto w-full min-h-0"
            style={plateMaxWidth > 0 ? { maxWidth: plateMaxWidth } : undefined}
          >
          <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-4/3 lg:aspect-16/9">
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
