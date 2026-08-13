import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ServiceAnchorNav } from "@/components/sections/services/ServiceAnchorNav";
import { ServiceBlock } from "@/components/sections/services/ServiceBlock";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Kooka Solutions",
  description:
    "Integrated event production and technical solutions — event production, AV, LED screens, sound, lighting, staging, live streaming, technical production and permanent installations.",
  alternates: { canonical: "/services" },
};

const approach = [
  {
    step: "01",
    title: "Discover",
    copy: "Site visit, brief interrogation and a hard look at the constraints — power, access, sightlines, curfew.",
  },
  {
    step: "02",
    title: "Design",
    copy: "Plots, renders and a technical pack that everyone from the venue to the client can read and sign off.",
  },
  {
    step: "03",
    title: "Build",
    copy: "Pre-prep in the warehouse, rehearsed bump-in, and a patch documented before the first cue is called.",
  },
  {
    step: "04",
    title: "Deliver",
    copy: "Crewed operation on show day, redundancy on every critical path, and a clean bump-out on schedule.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Kooka Solutions"
        subtitle="Integrated Event Production & Technical Solutions"
        description="Nine specialist disciplines under one roof. Take the full package or plug us in where your production needs depth — the standard does not change either way."
        image={media.ledWall}
      />

      <ServiceAnchorNav />

      <div className="divide-y divide-white/[0.06]">
        {services.map((service, index) => (
          <ServiceBlock key={service.slug} service={service} index={index} />
        ))}
      </div>

      <Section className="border-t border-white/[0.06]" bloom="top">
        <SectionHeading
          eyebrow="How We Work"
          title="Four Phases, One Team"
          description="The same sequence runs whether it is a 60-person board dinner or a five-city tour. Scale changes; the discipline does not."
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((phase) => (
            <RevealItem
              key={phase.step}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kooka-carbon p-8 transition-colors duration-500 hover:border-kooka-amber/30"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 -right-2 font-display text-7xl font-bold text-white/[0.04] transition-colors duration-500 group-hover:text-kooka-amber/10"
              >
                {phase.step}
              </span>
              <p className="kooka-eyebrow">{phase.step}</p>
              <h3 className="kooka-display mt-5 text-2xl">{phase.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-kooka-mist">
                {phase.copy}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaSection
        eyebrow="Scoping"
        title="Tell Us What The Room Has To Do"
        description="Share the venue, the guest count and the moment that matters. We will design the system around it."
      />
      <ContactStrip />
    </>
  );
}
