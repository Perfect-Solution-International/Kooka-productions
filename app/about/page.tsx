import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { leadership } from "@/data/team";
import { img, media } from "@/data/media";
import { fadeLeft, fadeRight } from "@/lib/motion";

const intro =
  "Together, our leadership team combines strategic vision, operational excellence, and technical innovation to deliver high-quality event experiences across corporate events, brand activations, cultural events, and large-scale productions. We are passionate about creating impactful experiences that connect people, elevate brands, and leave lasting impressions.";

export const metadata: Metadata = {
  title: "About Us",
  description: intro,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="About Us"
        subtitle="Strategic Vision. Operational Excellence. Technical Innovation."
        description={intro}
        image={media.smokeStage}
      />

      <Section
        id="leadership"
        className="border-t border-white/[0.06]"
        bloom="center"
      >
        <SectionHeading eyebrow="Leadership" title="Leadership Team" align="center" />

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
                    <h3 className="kooka-display text-3xl sm:text-4xl">
                      {person.name}
                    </h3>
                    <p className="mt-3 font-display text-sm tracking-[0.16em] text-kooka-amber uppercase">
                      {person.role}
                    </p>
                    <p className="mt-6 text-sm leading-relaxed text-kooka-mist sm:text-base">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
