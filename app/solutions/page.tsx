import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ServiceBlock } from "@/components/sections/services/ServiceBlock";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { Section } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Event Production & AV Solutions Melbourne",
  description:
    "Explore event production, AV hire, LED screens, sound, lighting, staging and live streaming solutions from our Melbourne production team.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Kooka Solutions"
        title="Kooka Solutions"
        subtitle="Integrated Event Production & Technical Solutions"
        description="End-to-end production, AV, LED, lighting and technical systems designed to deliver seamless, high-impact event experiences across corporate, live and large-scale environments."
        image={media.ledWall}
      />

      <Section bloom="top">
        <RevealGroup
          as="ul"
          stagger={0.07}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <ServiceBlock key={service.slug} service={service} index={index} />
          ))}
        </RevealGroup>
      </Section>

      <CtaSection
        eyebrow="Get Started"
        title="Let's Build Your Next Event"
        description="Talk to our team about the right production solution for your project."
      />
    </>
  );
}
