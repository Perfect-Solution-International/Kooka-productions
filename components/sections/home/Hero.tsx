"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MoveDown, Play } from "lucide-react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { img, media } from "@/data/media";
import { site } from "@/data/site";
import { EASE_KOOKA, maskUp, staggerContainer } from "@/lib/motion";
import { TOUCH_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const touch = useMediaQuery(TOUCH_QUERY);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /*
   * Neither preference is known during the server render or the hydration
   * render, so branching the `style` prop on them would hydrate mismatched
   * markup. Flatten the output ranges instead — the element keeps the same
   * shape either way and simply moves less, or not at all.
   *
   * Touch gets a shallower drift and no scale: scaling a full-bleed backdrop
   * repaints the largest layer on the page on every scroll frame, which is the
   * single most expensive thing this section can do on a phone.
   */
  const backdropY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduceMotion ? "0%" : (touch ? "8%" : "18%")],
  );
  const backdropScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion || touch ? 1 : 1.12],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    [1, reduceMotion ? 1 : 0],
  );

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-32 pb-16 sm:pb-20"
    >
      {/* Cinematic backdrop */}
      <motion.div
        style={{ y: backdropY, scale: backdropScale }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={img(media.heroStage, 2400, 85)}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient scrims — keeps the headline legible over any frame */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-kooka-void via-kooka-void/70 to-kooka-void/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-kooka-void/90 via-transparent to-kooka-void/60"
      />
      <div
        aria-hidden
        className="kooka-bloom top-1/4 -left-24 h-[18rem] w-[18rem] animate-glow-pulse sm:-left-32 sm:h-[34rem] sm:w-[34rem]"
      />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="kooka-container relative"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.12, 0.15)}
          className="mx-auto max-w-4xl text-center"
        >
          {/*
            The floor is set by the longest line, `Captivate.`, against the
            320px gutter box — anything taller than this overhangs it.
          */}
          <h1 className="kooka-display text-[clamp(2.25rem,10.5vw,7.5rem)]">
            {["Concept.", "Create.", "Captivate."].map((word, index) => (
              <span key={word} className="block overflow-hidden py-[0.06em]">
                <motion.span
                  variants={maskUp}
                  className={
                    index === 2
                      ? "block text-gradient-amber"
                      : "block text-kooka-white"
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_KOOKA } },
            }}
            className="mt-7 font-display text-sm font-medium tracking-[0.1em] text-kooka-flare uppercase sm:mt-8 sm:text-lg sm:tracking-[0.12em] lg:text-xl"
          >
            {site.supportLine}
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_KOOKA } },
            }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-kooka-mist sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_KOOKA } },
            }}
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <ButtonLink href="/showreel" size="lg" className="w-full sm:w-auto">
              <Play className="h-4 w-4 fill-current" aria-hidden />
              The Reel
            </ButtonLink>
            <ButtonLink
              href="/showreel#portfolio"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Portfolio
              <ArrowRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden
              />
            </ButtonLink>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Side tagline — rotated rule down the left edge */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-24 left-8 hidden origin-bottom-left -rotate-90 items-center gap-3 text-xs tracking-[0.28em] whitespace-nowrap text-kooka-muted uppercase lg:flex"
      >
        <span className="h-px w-10 bg-kooka-amber/70" aria-hidden />
        {site.sideTagline}
      </motion.p>

      <motion.a
        href="#kooka-experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label="Scroll to next section"
        className="absolute right-6 bottom-10 hidden items-center gap-3 text-xs tracking-[0.28em] text-kooka-muted uppercase transition-colors duration-300 hover:text-kooka-amber lg:flex xl:right-14"
      >
        Scroll
        <MoveDown className="h-4 w-4 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  );
}
