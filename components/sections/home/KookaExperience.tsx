import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { experienceSlides } from "@/data/media";
import { site } from "@/data/site";

export function KookaExperience() {
  return (
    <Section id="kooka-experience" bloom="top" density="tight">
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
              loading="lazy"
              /*
               * Local asset: the custom loader passes it through untouched, so
               * there is no width-derived srcset to generate.
               */
              unoptimized
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />

            <div className="kooka-scrim absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
