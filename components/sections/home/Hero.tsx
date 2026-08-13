"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MoveDown, Play } from "lucide-react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { img, media } from "@/data/media";
import { site } from "@/data/site";
import { EASE_KOOKA, maskUp, staggerContainer } from "@/lib/motion";

const stats = [
  { value: "360°", label: "Full-circle production" },
  { value: "12+", label: "Years on the floor" },
  { value: "500+", label: "Events delivered" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-32 pb-16 sm:pb-20"
    >
      {/* Cinematic backdrop */}
      <motion.div
        style={reduceMotion ? undefined : { y: backdropY, scale: backdropScale }}
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
        className="kooka-bloom top-1/4 -left-32 h-[34rem] w-[34rem] animate-glow-pulse"
      />

      <motion.div
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
        className="kooka-container relative"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.12, 0.15)}
          className="max-w-4xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_KOOKA } },
            }}
            className="kooka-eyebrow mb-8 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-kooka-amber/70" aria-hidden />
            Melbourne · Australia-wide
          </motion.p>

          <h1 className="kooka-display text-[clamp(2.75rem,9vw,7.5rem)]">
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
            className="mt-8 font-display text-lg font-medium tracking-[0.12em] text-kooka-flare uppercase sm:text-xl"
          >
            {site.supportLine}
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_KOOKA } },
            }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-kooka-mist sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_KOOKA } },
            }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <ButtonLink href="/showreel" size="lg">
              <Play className="h-4 w-4 fill-current" aria-hidden />
              The Reel
            </ButtonLink>
            <ButtonLink href="/showreel#portfolio" variant="secondary" size="lg">
              Portfolio
              <ArrowRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden
              />
            </ButtonLink>
          </motion.div>

          <motion.dl
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_KOOKA } },
            }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/[0.08] pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="kooka-display block text-3xl text-kooka-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-kooka-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

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
