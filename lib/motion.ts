import type { Transition, Variants } from "framer-motion";

/** Shared cinematic easing — matches `--ease-kooka` in globals.css. */
export const EASE_KOOKA: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitionSoft: Transition = {
  duration: 0.8,
  ease: EASE_KOOKA,
};

/**
 * Standard scroll-reveal trigger, shared by every section.
 *
 * Deliberately not a fraction of the element. A `RevealGroup` wrapping a long
 * grid is several viewports tall, so asking for a quarter of it to be on screen
 * asks for something a phone can never satisfy — the group stays at its hidden
 * variant and takes every child down with it. Keying off the leading edge and
 * pulling the trigger line up from the bottom instead behaves the same for a
 * single heading and for a ten-tile grid.
 */
export const viewportOnce = {
  once: true,
  amount: "some",
  margin: "0px 0px -12% 0px",
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: transitionSoft },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitionSoft },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: transitionSoft },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: transitionSoft },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: transitionSoft },
};

/** Wraps a group whose children animate in sequence. */
export const staggerContainer = (
  stagger = 0.09,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Headline reveal: clipped mask sliding upward. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE_KOOKA } },
};

/** Page-level transition used by the route transition wrapper. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_KOOKA } },
};
