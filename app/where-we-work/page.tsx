import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FootprintGrid } from "@/components/sections/footprint/FootprintGrid";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Kooka Footprint",
  description:
    "Events, environments and experiences Kooka Productions delivers — corporate events, conferences, product launches, brand activations, gala nights, live touring, festivals, sporting events, community gatherings and worship events.",
  alternates: { canonical: "/where-we-work" },
};

const regions = [
  { city: "Melbourne", meta: "Home base · Full inventory" },
  { city: "Regional Victoria", meta: "Wineries & estate venues" },
  { city: "Sydney", meta: "Touring & corporate" },
  { city: "Brisbane", meta: "Touring & activations" },
  { city: "Adelaide", meta: "Festivals & conferences" },
  { city: "Perth", meta: "Freighted tour packages" },
];

export default function WhereWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Reach"
        title="Kooka Footprint"
        subtitle="Events, Environments & Experiences We Deliver"
        description="From ballroom to bowl, boardroom to festival paddock — the environments we know how to load into, power and run."
        image={media.festivalNight}
      />

      <Section className="border-t border-white/[0.06]" density="tight" full>
        <div className="kooka-container">
          <SectionHeading
            eyebrow="Environments"
            title="Where Kooka Works"
            description="Ten environments, each with its own constraints. The plot changes; the standard does not."
          />
        </div>
        <div className="kooka-container mt-14">
          <FootprintGrid />
        </div>
      </Section>

      <Section className="border-t border-white/[0.06]" bloom="center">
        <SectionHeading
          eyebrow="Coverage"
          title="Melbourne Based, Australia Wide"
          description="Our warehouse and core crew sit in Melbourne. Trucks, freight and trusted regional partners take the same package anywhere in the country."
          align="center"
        />

        <RevealGroup
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {regions.map((region) => (
            <RevealItem
              key={region.city}
              className="group flex items-center gap-4 bg-kooka-black p-5 transition-colors duration-500 hover:bg-kooka-carbon sm:p-7"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-kooka-amber transition-all duration-500 group-hover:border-kooka-amber/50 group-hover:bg-kooka-amber/10">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold tracking-[-0.01em] uppercase">
                  {region.city}
                </span>
                <span className="mt-1 block text-xs text-kooka-muted">
                  {region.meta}
                </span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaSection
        eyebrow="Your Venue"
        title="Not Sure The Room Can Take It?"
        description="Send through the venue and the vision. We will check the rig points, the power and the access before anyone promises anything."
      />
      <ContactStrip />
    </>
  );
}
