import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FootprintBlock } from "@/components/sections/footprint/FootprintBlock";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { Section } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { footprintCategories } from "@/data/footprint";
import { media } from "@/data/media";

const intro =
  "From corporate stages to large-scale public events, we deliver tailored production solutions across diverse environments and audiences.";

export const metadata: Metadata = {
  title: "Events We Produce Across Melbourne & Australia",
  description:
    "Corporate events, conferences, launches, festivals, touring shows and public events produced across Melbourne and Australia.",
  alternates: { canonical: "/footprint" },
};

export default function FootprintPage() {
  return (
    <>
      <PageHero
        eyebrow="Kooka Footprint"
        title="Kooka Footprint"
        subtitle="Events, Environments & Experiences We Deliver"
        description={intro}
        image={media.crowdHands}
      />

      <Section bloom="top">
        <RevealGroup
          as="ul"
          stagger={0.07}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {footprintCategories.map((category, index) => (
            <FootprintBlock
              key={category.slug}
              category={category}
              index={index}
            />
          ))}
        </RevealGroup>
      </Section>

      <CtaSection
        eyebrow="Get Started"
        title="Let's Build Your Next Event"
        description="Tell us where your event runs and we will shape the production around it."
      />
    </>
  );
}
