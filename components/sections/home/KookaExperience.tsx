import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { experienceSlides, img } from "@/data/media";
import { site } from "@/data/site";
import { leadership } from "@/data/team";

export function KookaExperience() {
  return (
    <Section id="kooka-experience" bloom="top">
      <SectionHeading
        eyebrow="What We Do"
        title="Kooka Experience"
        description={site.intro}
        align="center"
      />

      {/* Three-up event visuals — a snap rail on mobile, a fixed row above sm */}
      <RevealGroup
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible lg:gap-8"
        stagger={0.12}
      >
        {experienceSlides.map((slide) => (
          <RevealItem
            key={slide.src}
            className="group relative aspect-3/4 w-[78%] shrink-0 snap-center overflow-hidden rounded-xl border border-white/[0.07] sm:w-auto"
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              sizes="(min-width: 640px) 33vw, 78vw"
              // Local asset: the custom loader passes it through untouched, so
              // there is no width-derived srcset to generate.
              unoptimized
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />

            <div className="kooka-scrim absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
          </RevealItem>
        ))}
      </RevealGroup>

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
