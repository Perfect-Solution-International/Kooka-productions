"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EASE_KOOKA, fadeLeft } from "@/lib/motion";
import { img } from "@/data/media";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function KookaSolutions() {
  const [openSlug, setOpenSlug] = useState<string | null>(services[0].slug);

  return (
    <Section id="solutions" className="border-t border-white/[0.06]">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Left rail — headline, intro, CTA */}
        <Reveal variants={fadeLeft} className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="kooka-eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-kooka-amber/70" aria-hidden />
              Kooka Solutions
            </p>

            <h2 className="kooka-display text-[clamp(2.5rem,5vw,4.5rem)]">
              Technical Artistry. Zero Compromise.
            </h2>

            <p className="mt-8 max-w-md text-base leading-relaxed text-kooka-mist">
              {site.intro}
            </p>

            <Link
              href="/services"
              className="group mt-10 inline-flex items-center gap-3 border border-white/20 px-7 py-4 font-display text-[0.7rem] font-semibold tracking-[0.2em] text-kooka-white uppercase transition-all duration-500 hover:border-kooka-amber hover:bg-kooka-amber hover:text-kooka-black"
            >
              <span>More Services</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>

        {/* Right rail — numbered, expandable service index */}
        <RevealGroup as="ul" className="lg:col-span-7" stagger={0.06}>
          {services.map((service, index) => {
            const open = openSlug === service.slug;
            const panelId = `solution-panel-${service.slug}`;

            return (
              <RevealItem
                as="li"
                key={service.slug}
                className="border-b border-white/[0.12] first:border-t first:border-white/[0.12]"
              >
                <button
                  type="button"
                  onClick={() => setOpenSlug(open ? null : service.slug)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group flex w-full items-center gap-4 py-6 text-left"
                >
                  <span
                    className={cn(
                      "font-display text-lg tracking-[0.08em] tabular-nums transition-colors duration-500 sm:text-xl",
                      open ? "text-kooka-amber" : "text-kooka-muted",
                    )}
                  >
                    ({index + 1})
                  </span>

                  <span
                    className={cn(
                      "flex-1 font-display text-lg font-semibold tracking-[0.1em] uppercase transition-colors duration-500 sm:text-2xl",
                      open
                        ? "text-kooka-white"
                        : "text-kooka-mist group-hover:text-kooka-white",
                    )}
                  >
                    {service.title}
                  </span>

                  {open ? (
                    <Minus className="h-5 w-5 shrink-0 text-kooka-amber" aria-hidden />
                  ) : (
                    <Plus
                      className="h-5 w-5 shrink-0 text-kooka-muted transition-colors duration-500 group-hover:text-kooka-white"
                      aria-hidden
                    />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_KOOKA }}
                      className="overflow-hidden"
                    >
                      <Link
                        href={`/services#${service.slug}`}
                        className="group/panel relative mb-6 block aspect-video overflow-hidden sm:aspect-21/9"
                      >
                        <Image
                          src={img(service.image, 1400, 80)}
                          alt={service.title}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/panel:scale-[1.05]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-linear-to-t from-kooka-void/80 via-transparent to-transparent"
                        />
                        <span className="absolute right-5 bottom-4 inline-flex items-center gap-2 font-display text-[0.62rem] font-semibold tracking-[0.22em] text-kooka-white uppercase transition-colors duration-500 group-hover/panel:text-kooka-amber">
                          <span>Learn More</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform duration-500 group-hover/panel:translate-x-1 group-hover/panel:-translate-y-1"
                            aria-hidden
                          />
                        </span>
                      </Link>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
