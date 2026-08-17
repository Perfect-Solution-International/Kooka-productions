import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { KookaExperience } from "@/components/sections/home/KookaExperience";
import { KookaSolutions } from "@/components/sections/home/KookaSolutions";
import { HighlightedProjects } from "@/components/sections/home/HighlightedProjects";
import { WhyChooseKooka } from "@/components/sections/home/WhyChooseKooka";
import { TrustedPartners } from "@/components/sections/home/TrustedPartners";
import { PartnerMarquee } from "@/components/sections/home/PartnerMarquee";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} | ${site.seoLine}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <KookaExperience />
      <KookaSolutions />
      <HighlightedProjects />
      <WhyChooseKooka />
      <TrustedPartners />
      <PartnerMarquee />
      <CtaSection density="tight" />
      <ContactStrip />
    </>
  );
}
