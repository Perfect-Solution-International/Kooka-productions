"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TOUCH_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

type CursorParallaxProps = {
  readonly children: ReactNode;
  readonly className?: string;
  /** Maximum rotation in degrees on each axis. */
  readonly intensity?: number;
  /** Adds a warm highlight that tracks the cursor across the surface. */
  readonly glare?: boolean;
};

const spring = { stiffness: 210, damping: 24, mass: 0.6 };

/**
 * Cursor-driven tilt for cards, in the DOM rather than in WebGL.
 *
 * The 3D canvas is a single fixed background surface, so a card cannot live
 * inside it without losing its text, links and image loading. A CSS 3D
 * transform driven by the same pointer input keeps the card in the document
 * and still answers the cursor.
 *
 * Touch devices get nothing: `pointermove` fires there during a scroll drag,
 * so a tilt would trigger on every swipe past the card.
 */
export function CursorParallax({
  children,
  className,
  intensity = 7,
  glare = true,
}: CursorParallaxProps) {
  const reduceMotion = useReducedMotion();
  const touch = useMediaQuery(TOUCH_QUERY);
  const inert = reduceMotion || touch;

  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), spring);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 176 32 / 0.22), transparent 58%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (inert) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    rotateY.set((x - 0.5) * intensity * 2);
    rotateX.set((0.5 - y) * intensity * 2);
    glareX.set(x * 100);
    glareY.set(y * 100);
    glareOpacity.set(1);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={cn("preserve-3d relative h-full", className)}
    >
      {children}

      {glare && !inert ? (
        <motion.span
          aria-hidden
          style={{ background: glareBackground, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-soft-light"
        />
      ) : null}
    </motion.div>
  );
}
