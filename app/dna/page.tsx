import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { leadership } from "@/data/team";
import { media } from "@/data/media";

const intro =
  "Together, our leadership team combines strategic vision, operational excellence, and technical innovation to deliver high-quality event experiences across corporate events, brand activations, cultural events, and large-scale productions. We are passionate about creating impactful experiences that connect people, elevate brands, and leave lasting impressions.";

export const metadata: Metadata = {
  title: "About Kooka Productions Melbourne",
  description:
    "Meet the Melbourne event production leaders behind Kooka Productions and our approach to creative, technical and operational excellence.",
  alternates: { canonical: "/dna" },
};

export default function DnaPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Kooka DNA"
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

        <RevealGroup
          as="ul"
          stagger={0.07}
          className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {leadership.map((person) => (
            <RevealItem key={person.name} as="li" className="h-full">
              <GlassCard
                as="article"
                className="flex h-full flex-col p-6 transition-shadow duration-500 hover:shadow-[0_36px_90px_-46px_rgb(255_176_32/0.42)] sm:p-7"
              >
                <h3 className="font-display text-xl leading-tight font-bold tracking-[0.06em] break-words uppercase [hyphens:auto] sm:text-2xl">
                  {person.name}
                </h3>
                <p className="mt-3 font-display text-sm text-kooka-ember sm:text-base">
                  {person.role}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-justify text-kooka-mist [hyphens:auto]">
                  {person.bio}
                </p>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
