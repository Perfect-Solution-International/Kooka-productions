"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { img, media } from "@/data/media";
import { site } from "@/data/site";
import { leadership } from "@/data/team";
import { EASE_KOOKA } from "@/lib/motion";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Corporate Stages",
    caption: "Plenary staging, redundant vision and speaker management.",
    image: media.conferenceStage,
  },
  {
    title: "Immersive Projection",
    caption: "Mapped surfaces, timecoded reveals and synchronised haze.",
    image: media.projection,
  },
  {
    title: "Live & Touring",
    caption: "Truck-packed rigs that look identical in every city.",
    image: media.touring,
  },
  {
    title: "LED Canvases",
    caption: "Seamless walls calibrated and driven with a backup path.",
    image: media.ledWall,
  },
  {
    title: "Luxury Celebrations",
    caption: "Architectural warmth and audio you never notice working.",
    image: media.weddingReception,
  },
];

const AUTOPLAY_MS = 5200;

export function KookaExperience() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => go(index + 1),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [index, paused, go]);

  const active = slides[index];

  return (
    <Section id="kooka-experience" bloom="top">
      <SectionHeading
        eyebrow="What We Do"
        title="Kooka Experience"
        description={site.intro}
      />

      {/* Cinematic slider */}
      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/[0.07] sm:aspect-16/9 lg:aspect-21/9">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE_KOOKA }}
              className="absolute inset-0"
            >
              <Image
                src={img(active.image, 2000, 82)}
                alt={active.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="kooka-scrim pointer-events-none absolute inset-0" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: EASE_KOOKA }}
                className="max-w-md"
              >
                <p className="kooka-display text-3xl sm:text-4xl lg:text-5xl">
                  {active.title}
                </p>
                <p className="mt-3 text-sm text-kooka-mist sm:text-base">
                  {active.caption}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-kooka-black/50 text-kooka-white backdrop-blur-md transition-colors duration-300 hover:border-kooka-amber/60 hover:text-kooka-amber"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-kooka-black/50 text-kooka-white backdrop-blur-md transition-colors duration-300 hover:border-kooka-amber/60 hover:text-kooka-amber"
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {/* Progress rail */}
        <div className="mt-6 flex gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-label={`Show ${slide.title}`}
              aria-current={slideIndex === index}
              className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"
            >
              <span
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full bg-kooka-amber transition-all duration-500",
                  slideIndex === index ? "w-full" : "w-0 group-hover:w-1/3",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Leadership preview */}
      <div className="mt-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h3 className="kooka-display text-2xl sm:text-3xl">
            The People Behind It
          </h3>
          <Link
            href="/about"
            className="group hidden items-center gap-2 font-display text-xs tracking-[0.2em] text-kooka-mist uppercase transition-colors duration-300 hover:text-kooka-amber sm:inline-flex"
          >
            Kooka DNA
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden
            />
          </Link>
        </div>

        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {leadership.map((person) => (
            <RevealItem key={person.name}>
              <GlassCard className="group h-full">
                <Link href="/about" className="flex h-full flex-col">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={img(person.image, 900, 78)}
                      alt={person.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="kooka-scrim absolute inset-0" />
                    <span className="absolute top-4 left-4 rounded-full border border-kooka-amber/40 bg-kooka-black/60 px-3 py-1 font-display text-[0.6rem] tracking-[0.2em] text-kooka-amber uppercase backdrop-blur-md">
                      {person.focus}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="kooka-display text-xl">{person.name}</p>
                    <p className="mt-2 text-sm text-kooka-amber">
                      {person.role}
                    </p>
                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-kooka-mist">
                      {person.bio}
                    </p>
                  </div>
                </Link>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
