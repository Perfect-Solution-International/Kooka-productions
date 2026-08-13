import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { KookaExperience } from "@/components/sections/home/KookaExperience";
import { SolutionsGrid } from "@/components/sections/home/SolutionsGrid";
import { HighlightedProjects } from "@/components/sections/home/HighlightedProjects";
import { WhyChooseKooka } from "@/components/sections/home/WhyChooseKooka";
import { TrustedPartners } from "@/components/sections/home/TrustedPartners";
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
      <SolutionsGrid />
      <HighlightedProjects />
      <WhyChooseKooka />
      <TrustedPartners />
      <CtaSection />
      <ContactStrip />
    </>
  );
}
