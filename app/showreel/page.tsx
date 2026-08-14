import type { Metadata } from "next";
import { FootprintGrid } from "@/components/sections/footprint/FootprintGrid";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { maskUp } from "@/lib/motion";

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
      {/* Type-led opener — headline left, the read-in pinned to the right rail */}
      <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-20">
        <div
          aria-hidden
          className="kooka-bloom -top-32 left-1/4 h-[32rem] w-[32rem] opacity-30"
        />

        <div className="kooka-container">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <h1 className="kooka-display overflow-hidden text-[clamp(2.75rem,8vw,6.5rem)] lg:col-span-7">
              <RevealGroup as="span" stagger={0.08}>
                <RevealItem as="span" variants={maskUp} className="block">
                  Kooka
                </RevealItem>
                <RevealItem as="span" variants={maskUp} className="block">
                  Footprint.
                </RevealItem>
              </RevealGroup>
            </h1>

            <Reveal className="lg:col-span-5 lg:pb-4">
              <p className="font-display text-[0.68rem] tracking-[0.22em] text-kooka-amber uppercase lg:text-right">
                {tagline}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-kooka-mist sm:text-base lg:ml-auto lg:text-right">
                {intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="pt-0">
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
