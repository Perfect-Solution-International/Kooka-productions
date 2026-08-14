import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ServiceBlock } from "@/components/sections/services/ServiceBlock";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";
import { contact } from "@/data/site";
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
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href={contact.quoteHref} size="lg">
            <Mail className="h-4 w-4" aria-hidden />
            Start Your Project
          </ButtonLink>
          <ButtonLink href="/showreel" variant="secondary" size="lg">
            View Our Work
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden
            />
          </ButtonLink>
        </div>
      </PageHero>

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
