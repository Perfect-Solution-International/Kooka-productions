import type { Metadata } from "next";
import Image from "next/image";
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
          className="mx-auto mt-10 grid max-w-4xl gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-2"
        >
          {leadership.map((person) => (
            <RevealItem key={person.name} as="li" className="h-full">
              <GlassCard
                as="article"
                className="flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_36px_90px_-46px_rgb(255_176_32/0.42)]"
              >
                {person.image ? (
                  <div className="relative aspect-4/3 overflow-hidden border-b border-white/[0.08] bg-kooka-carbon">
                    <Image
                      src={person.image}
                      alt={`${person.name}, ${person.role}`}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain object-center transition-transform duration-[1200ms] ease-kooka hover:scale-[1.02]"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-lg leading-tight font-bold tracking-[0.06em] break-words uppercase [hyphens:auto] sm:text-xl">
                    {person.name}
                  </h3>
                  <p className="mt-2 font-display text-sm text-kooka-ember">
                    {person.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-justify text-kooka-mist [hyphens:auto]">
                    {person.bio}
                  </p>
                </div>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
