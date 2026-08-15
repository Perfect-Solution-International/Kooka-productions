"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import type { Project } from "@/data/projects";
import { TOUCH_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
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

/** The pin's own `py-8 lg:py-10`, kept off the plate's height budget. */
const PIN_PADDING = 80;

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
  const [plateHeight, setPlateHeight] = useState(0);
  const reduced = useReducedMotion();
  const touch = useMediaQuery(TOUCH_QUERY);

  /*
   * Measured rather than derived from the width and the aspect ratio: the
   * plate's height cap overrides that ratio on a wide or short window, so the
   * box is the only honest source for whether the overlay has room.
   */
  useEffect(() => {
    const node = plateRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setPlateHeight(entry.contentRect.height);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);

    const sync = () => setIsDesktop(desktop.matches);

    sync();
    desktop.addEventListener("change", sync);

    return () => desktop.removeEventListener("change", sync);
  }, []);

  /*
   * The track is sized from `innerHeight`, which is the same viewport height
   * `useScroll` resolves its `end end` offset against. Deriving it from a CSS
   * viewport unit (or from the pin's own measured height) breaks on mobile,
   * where `dvh`/`svh` follow the visual viewport while scroll progress is
   * computed from the layout viewport — progress then saturates before the
   * pin releases and the final project is never reached.
   */
  /*
   * A mobile browser collapses and restores its URL bar as you scroll, and each
   * pass fires `resize` with a new `innerHeight`. Re-sizing the track from that
   * relayouts the pin under a finger that is mid-drag. The width is what
   * actually changes on a rotation, so that is what the resync is keyed to;
   * anything with a fine pointer keeps following the height directly, because
   * there a resize is a real window resize.
   */
  useEffect(() => {
    let lastWidth = window.innerWidth;

    const sync = () => setViewportHeight(window.innerHeight);

    const onResize = () => {
      const widthChanged = window.innerWidth !== lastWidth;
      lastWidth = window.innerWidth;

      if (!touch || widthChanged) sync();
    };

    sync();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [touch]);

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

  const isCompactPlate = plateHeight > 0 && plateHeight < COMPACT_PLATE_HEIGHT;

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
        <div className="flex w-full flex-col justify-center">
          {/*
            Full-bleed rather than inset to the page container: the still reads
            as a frame of the production instead of as one more card in the
            column. Height is capped to the pin so a wide window cannot make
            the plate taller than the viewport it is pinned inside — the ratio
            gives way there and `object-cover` takes up the crop.
          */}
          <div
            ref={plateRef}
            className="relative aspect-4/5 w-full overflow-hidden sm:aspect-4/3 lg:aspect-16/9"
            style={{
              maxHeight:
                viewportHeight > 0 ? viewportHeight - PIN_PADDING : undefined,
            }}
          >
            <ProjectImage
              project={activeProject}
              priority={activeIndex === 0}
              simplified={reduced || touch}
            />

            {/*
              Capped to the plate so the copy can never grow past the top of
              the image: this is an `items-end` row, so an overlay taller than
              its frame would otherwise push its own first lines out of view.
            */}
            <div className="absolute inset-0 flex items-end overflow-hidden py-6 sm:py-10 lg:py-14">
              {/*
                The plate is full-bleed but its copy is not: holding the
                overlay to the page container keeps the title on the same left
                edge as every heading above and below it.
              */}
              <div className="kooka-container flex w-full items-end justify-between gap-8">
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

          <div className="kooka-container mt-6 shrink-0 lg:hidden">
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
