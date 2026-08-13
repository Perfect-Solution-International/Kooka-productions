import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoTicker } from "@/components/ui/LogoTicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { partners, venues } from "@/data/partners";
import { img } from "@/data/media";
import { cn } from "@/lib/utils";

/** Two tiles run large so the grid reads cinematic, not like a contact sheet. */
const sizeClasses: Record<string, string> = {
  lg: "col-span-2 row-span-2",
  sm: "col-span-1",
};

export function TrustedPartners() {
  return (
    <Section id="trusted" className="border-t border-white/[0.06]" bloom="bottom">
      <SectionHeading
        eyebrow="Trusted By Worldwide Producer Partners"
        title="Trusted Across Leading Venues & Events"
        description="Delivering production solutions across Melbourne's leading venues, brands, and live event spaces."
      />

      <Reveal className="mt-14">
        <LogoTicker items={partners} />
      </Reveal>

      <RevealGroup
        className="mt-16 grid auto-rows-[9rem] grid-cols-2 gap-4 sm:auto-rows-[11rem] sm:grid-cols-4"
        stagger={0.07}
      >
        {venues.map((venue) => (
          <RevealItem
            key={venue.name}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-white/[0.07]",
              sizeClasses[venue.size],
            )}
          >
            <Image
              src={img(venue.image, venue.size === "lg" ? 1400 : 800, 78)}
              alt={venue.name}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />

            {/* Dark overlay deepens and the label fades in on hover */}
            <div
              aria-hidden
              className="absolute inset-0 bg-kooka-void/30 transition-colors duration-700 group-hover:bg-kooka-void/65"
            />

            <div className="absolute inset-0 flex items-end p-5">
              <p className="translate-y-2 font-display text-sm font-semibold tracking-[0.02em] text-kooka-white uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base">
                {venue.name}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
