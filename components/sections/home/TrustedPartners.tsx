import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoTicker } from "@/components/ui/LogoTicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { partners, venues } from "@/data/partners";
import { img } from "@/data/media";
import { cn } from "@/lib/utils";

/** Mixed-size tiles keep the venue grid from reading as a uniform contact sheet. */
const sizeClasses: Record<string, string> = {
  lg: "col-span-2 row-span-2",
  md: "col-span-2",
  sm: "col-span-1",
};

export function TrustedPartners() {
  return (
    <Section id="trusted" className="border-t border-white/[0.06]" bloom="bottom">
      <SectionHeading
        eyebrow="Partners & Venues"
        title="Trusted Across Leading Venues & Events"
        description="Producers, agencies and venue teams who bring us back — and the rooms we know the load-in doors of by heart."
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
            <div className="kooka-scrim absolute inset-0 opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-sm font-semibold tracking-[-0.01em] text-kooka-white uppercase sm:text-base">
                {venue.name}
              </p>
              <p className="mt-1 text-xs text-kooka-muted">{venue.meta}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
