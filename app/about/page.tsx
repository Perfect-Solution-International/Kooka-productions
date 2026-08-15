import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { leadership } from "@/data/team";
import { media } from "@/data/media";

const intro =
  "Together, our leadership team combines strategic vision, operational excellence, and technical innovation to deliver high-quality event experiences across corporate events, brand activations, cultural events, and large-scale productions. We are passionate about creating impactful experiences that connect people, elevate brands, and leave lasting impressions.";

export const metadata: Metadata = {
  title: "About Us",
  description: intro,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="About Us"
        subtitle="Strategic Vision. Operational Excellence. Technical Innovation."
        description={intro}
        image={media.smokeStage}
      />

      <Section
        id="leadership"
        className="border-t border-white/[0.06]"
        bloom="top"
      >
        <SectionHeading
          eyebrow="Who Leads"
          title="Leadership Team"
          align="center"
        />

        {/*
          Director columns — a snap rail on mobile, then two columns before the
          ruled three-up. A `1fr` track floors at the content's min width, and
          at tablet a single long surname is wider than a third of the row, so
          three columns there force the whole grid past the viewport.
        */}
        <RevealGroup
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:overflow-visible lg:grid-cols-3 lg:gap-0"
          stagger={0.12}
        >
          {leadership.map((person) => (
            <RevealItem
              key={person.name}
              className="flex w-[82%] shrink-0 snap-center flex-col sm:w-auto sm:min-w-0 lg:border-l lg:border-white/[0.08] lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 xl:px-12"
            >
              <h3 className="font-display text-2xl leading-tight font-bold tracking-[0.06em] break-words uppercase [hyphens:auto] sm:text-3xl">
                {person.name}
              </h3>
              <p className="mt-4 font-display text-base text-kooka-ember sm:text-lg">
                {person.role}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-kooka-mist [text-align:justify] [hyphens:auto]">
                {person.bio}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
