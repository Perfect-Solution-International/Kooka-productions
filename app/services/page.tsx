import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ServiceBlock } from "@/components/sections/services/ServiceBlock";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { services } from "@/data/services";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Kooka Solutions",
  description:
    "End-to-end production, AV, LED, lighting and technical systems designed to deliver seamless, high-impact event experiences across corporate, live and large-scale environments.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Kooka Solutions"
        title="Kooka Solutions"
        subtitle="Integrated Event Production & Technical Solutions"
        description="End-to-end production, AV, LED, lighting and technical systems designed to deliver seamless, high-impact event experiences across corporate, live and large-scale environments."
        image={media.ledWall}
      />

      <div className="divide-y divide-white/[0.06]">
        {services.map((service, index) => (
          <ServiceBlock key={service.slug} service={service} index={index} />
        ))}
      </div>

      <CtaSection
        eyebrow="Get Started"
        title="Let's Build Your Next Event"
        description="Talk to our team about the right production solution for your project."
      />
    </>
  );
}
