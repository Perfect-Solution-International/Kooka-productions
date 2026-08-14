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

        {/* Three-up director columns — a snap rail on mobile, ruled columns above sm */}
        <RevealGroup
          className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-0 sm:overflow-visible"
          stagger={0.12}
        >
          {leadership.map((person) => (
            <RevealItem
              key={person.name}
              className="flex w-[82%] shrink-0 snap-center flex-col sm:w-auto sm:border-l sm:border-white/[0.08] sm:px-8 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0 lg:px-12"
            >
              <h3 className="font-display text-2xl leading-tight font-bold tracking-[0.06em] uppercase sm:text-3xl">
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
