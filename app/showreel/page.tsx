import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FootprintGrid } from "@/components/sections/footprint/FootprintGrid";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { Section } from "@/components/ui/Section";
import { media } from "@/data/media";

const tagline = "Events, Environments & Experiences We Deliver";

const intro =
  "From corporate stages to large-scale public events, we deliver tailored production solutions across diverse environments and audiences.";

export const metadata: Metadata = {
  title: "Kooka Footprint",
  description: intro,
  alternates: { canonical: "/showreel" },
};

export default function ShowreelPage() {
  return (
    <>
      <PageHero
        eyebrow="Kooka Footprint"
        title="Kooka Footprint"
        subtitle={tagline}
        description={intro}
        image={media.stadiumNight}
      />

      <Section bloom="top">
        <FootprintGrid />
      </Section>

      <CtaSection
        eyebrow="Your Event"
        title="Tell Us Where It Runs"
        description="Ballroom, paddock or stadium bowl — send the brief and we will tell you honestly what it takes to deliver it."
      />
      <ContactStrip />
    </>
  );
}
