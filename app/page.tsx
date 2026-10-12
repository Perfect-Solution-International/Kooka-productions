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
import { listHomeSolutions } from "@/services/home-solution.service";

export const metadata: Metadata = {
  title: `${site.name} | ${site.seoLine}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const homeSolutions = await listHomeSolutions();
  return (
    <>
      <Hero />
      <KookaExperience />
      <KookaSolutions services={homeSolutions} />
      <HighlightedProjects />
      <WhyChooseKooka />
      <TrustedPartners />
      <PartnerMarquee />
      <CtaSection density="tight" />
      <ContactStrip />
    </>
  );
}
