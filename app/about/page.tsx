import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { LogoTicker } from "@/components/ui/LogoTicker";
import { leadership } from "@/data/team";
import { partners } from "@/data/partners";
import { img, media } from "@/data/media";
import { fadeLeft, fadeRight } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Kooka DNA",
  description:
    "Technical innovation, strategic vision and event execution — meet the leadership team behind Kooka Productions, Melbourne's 360° event production specialists.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    title: "Technical Innovation",
    copy: "We invest ahead of the brief. Projection mapping, media servers, immersive audio and pixel-mapped lighting sit in our inventory because the next request is already coming.",
  },
  {
    title: "Strategic Vision",
    copy: "Production is a business, not just a rig. Every capability decision is measured against what our clients will need in two years, not what closes this quarter.",
  },
  {
    title: "Event Execution",
    copy: "Design is the easy half. The value shows up at 4am on a bump-in when the plan holds because someone documented it properly weeks earlier.",
  },
];

const principles = [
  "Quote what it actually costs — no surprise variations",
  "Redundancy on every critical signal path",
  "Crew who introduce themselves to venue staff",
  "One accountable contact from brief to bump-out",
  "Gear tested in the warehouse before it hits the truck",
  "Documentation the client keeps, not just us",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Kooka DNA"
        subtitle="Technical Innovation. Strategic Vision. Event Execution."
        description="Kooka Productions is a Melbourne-based 360° event production company. We design the show, engineer the systems and stand in the room while it runs."
        image={media.smokeStage}
      />

      {/* Narrative */}
      <Section className="border-t border-white/[0.06]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal variants={fadeLeft} className="lg:col-span-6">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/[0.07]">
              <Image
                src={img(media.controlRoom, 1200, 82)}
                alt="Kooka Productions crew at the control position"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="kooka-scrim absolute inset-0 opacity-70" />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="About Us"
              title="Built By People Who Still Push Cases"
              description="Kooka started with a simple frustration: events where the technology was capable but nobody owned the outcome. We built the alternative — a production house where design, engineering and delivery answer to the same people."
            />

            <RevealGroup className="mt-10 space-y-8" stagger={0.1}>
              {pillars.map((pillar) => (
                <RevealItem
                  key={pillar.title}
                  className="border-l-2 border-kooka-amber/30 pl-6 transition-colors duration-500 hover:border-kooka-amber"
                >
                  <h3 className="kooka-display text-xl sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-kooka-mist sm:text-base">
                    {pillar.copy}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section id="leadership" className="border-t border-white/[0.06]" bloom="center">
        <SectionHeading
          eyebrow="Leadership"
          title="The Directors"
          description="Three directors, three clear lanes — strategy, operations and technical. No ambiguity about who owns what."
          align="center"
        />

        <div className="mt-16 space-y-8">
          {leadership.map((person, index) => (
            <Reveal
              key={person.name}
              variants={index % 2 === 0 ? fadeLeft : fadeRight}
            >
              <GlassCard className="overflow-hidden">
                <div
                  className={
                    index % 2 === 1
                      ? "grid gap-0 lg:grid-cols-12 lg:[&>*:first-child]:order-2"
                      : "grid gap-0 lg:grid-cols-12"
                  }
                >
                  <div className="relative min-h-[20rem] lg:col-span-5 lg:min-h-[26rem]">
                    <Image
                      src={img(person.image, 1000, 80)}
                      alt={person.name}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover grayscale transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:grayscale-0"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-kooka-carbon via-transparent to-transparent lg:bg-linear-to-r"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-7 lg:p-14">
                    <p className="kooka-eyebrow mb-5">{person.focus}</p>
                    <h3 className="kooka-display text-3xl sm:text-4xl">
                      {person.name}
                    </h3>
                    <p className="mt-3 font-display text-sm tracking-[0.16em] text-kooka-amber uppercase">
                      {person.role}
                    </p>
                    <p className="mt-6 text-sm leading-relaxed text-kooka-mist sm:text-base">
                      {person.bio}
                    </p>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {person.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-snug text-kooka-mist"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-kooka-amber"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Principles */}
      <Section className="border-t border-white/[0.06]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How We Operate"
              title="Non-Negotiables"
              description="Six commitments that hold whether the budget is five figures or six."
            />
          </div>

          <RevealGroup
            as="ul"
            className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:col-span-7"
            stagger={0.06}
          >
            {principles.map((principle) => (
              <RevealItem
                as="li"
                key={principle}
                className="flex items-start gap-3 bg-kooka-black p-6 text-sm leading-snug text-kooka-mist transition-colors duration-500 hover:bg-kooka-carbon"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-kooka-amber"
                  aria-hidden
                />
                {principle}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-20">
          <p className="kooka-eyebrow mb-8 text-center">
            Producer partners worldwide
          </p>
          <LogoTicker items={partners} reverse />
        </Reveal>
      </Section>

      <CtaSection
        eyebrow="Work With Us"
        title="Let's Bring Your Event to Life"
        description="Tell us the date and the ambition. We will tell you honestly what it takes to get there."
      />
      <ContactStrip />
    </>
  );
}
