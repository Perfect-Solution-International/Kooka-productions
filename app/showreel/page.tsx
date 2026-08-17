import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ShowreelGrid } from "@/components/sections/showreel/ShowreelGrid";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { Section } from "@/components/ui/Section";
import { media } from "@/data/media";

const tagline = "Events, Environments & Experiences We Deliver";

const intro =
  "From corporate stages to large-scale public events, we deliver tailored production solutions across diverse environments and audiences.";

export const metadata: Metadata = {
  title: "Kooka Showreel",
  description: intro,
  alternates: { canonical: "/showreel" },
};

/*
 * Showreel tiles are edited from the admin panel, so this page reads the
 * store on every request instead of the static rendering Next would default
 * to — otherwise a save wouldn't appear until the next build.
 */
export const dynamic = "force-dynamic";

export default function ShowreelPage() {
  return (
    <>
      <PageHero
        eyebrow="Kooka Showreel"
        title="Kooka Showreel"
        subtitle={tagline}
        description={intro}
        image={media.stadiumNight}
      />

      <Section bloom="top" density="tight">
        <ShowreelGrid />
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
