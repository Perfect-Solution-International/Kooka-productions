import type { Metadata } from "next";
import { ReelPlayer } from "@/components/sections/showreel/ReelPlayer";
import { PortfolioGrid } from "@/components/sections/showreel/PortfolioGrid";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { maskUp } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Kooka Showreel",
  description:
    "Selected work from Kooka Productions — corporate conferences, live touring, brand activations, luxury weddings and permanent installations across Australia.",
  alternates: { canonical: "/showreel" },
};

const reelStats = [
  { value: "4K", label: "Capture & delivery" },
  { value: "8", label: "Camera live cut" },
  { value: "500+", label: "Events archived" },
  { value: "12+", label: "Years of footage" },
];

export default function ShowreelPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-40 lg:pb-28">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[60svh] bg-linear-to-b from-kooka-carbon to-kooka-black"
        />

        <div className="kooka-container">
          <RevealGroup className="max-w-4xl" stagger={0.1}>
            <RevealItem as="p" className="kooka-eyebrow mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-kooka-amber/70" aria-hidden />
              The Reel
            </RevealItem>

            <h1 className="kooka-display overflow-hidden text-[clamp(2.5rem,7.5vw,6rem)]">
              <RevealItem as="span" variants={maskUp} className="block">
                Kooka Showreel
              </RevealItem>
            </h1>

            <RevealItem
              as="p"
              className="mt-6 max-w-2xl text-base leading-relaxed text-kooka-mist sm:text-lg"
            >
              Two minutes of rooms we built, lit and ran — cut from the archive
              of events delivered across Australia.
            </RevealItem>
          </RevealGroup>

          <Reveal className="mt-14">
            <ReelPlayer />
          </Reveal>

          <RevealGroup
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4"
            stagger={0.07}
          >
            {reelStats.map((stat) => (
              <RevealItem key={stat.label} className="bg-kooka-black p-6">
                <p className="kooka-display text-3xl text-kooka-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-kooka-muted">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Section className="border-t border-white/[0.06]" bloom="top">
        <SectionHeading
          eyebrow="Archive"
          title="Portfolio"
          description="Filter the archive by discipline. Video cuts and stills from the same projects sit side by side."
        />
        <div className="mt-12">
          <PortfolioGrid />
        </div>
      </Section>

      <CtaSection
        eyebrow="Your Reel"
        title="Want Your Event In This Archive?"
        description="Bring us the brief. We will build it, run it, and hand back the footage worth showing."
      />
      <ContactStrip />
    </>
  );
}
