"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/** Pre-created outside render so elements are never remounted. */
const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

type Tag = keyof typeof motionTags;

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: Tag;
};

/** Single element that fades up once it enters the viewport. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Component = motionTags[as];

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

/** Parent wrapper that staggers any `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
  as = "div",
}: Omit<RevealProps, "variants" | "delay"> & {
  stagger?: number;
  delayChildren?: number;
}) {
  const Component = motionTags[as];

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delayChildren)}
      className={className}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: Omit<RevealProps, "delay">) {
  const Component = motionTags[as];

  return (
    <Component variants={variants} className={className}>
      {children}
    </Component>
  );
}
