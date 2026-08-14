import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollProjectShowcase } from "@/components/projects/scroll-project-showcase";
import { featuredProjects } from "@/data/projects";

export function HighlightedProjects() {
  return (
    <section id="projects" className="relative isolate pt-24 sm:pt-28 lg:pt-36">
      <div className="kooka-bloom top-1/3 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 opacity-25" aria-hidden />

      {/*
        The heading rides inside the pinned viewport so it stays on screen
        while the projects advance.
      */}
      <ScrollProjectShowcase
        projects={featuredProjects}
        className="relative"
        heading={
          <SectionHeading
            eyebrow="Selected Work"
            title="Highlighted Projects"
            description="A selection of recent productions showcasing our capabilities across different event environments."
            align="center"
          />
        }
      />

      <Reveal className="kooka-container relative pb-24 flex justify-center sm:pb-28 lg:pb-36">
        <ButtonLink href="/showreel" variant="secondary" size="lg">
          View Full Showreel
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden
          />
        </ButtonLink>
      </Reveal>
    </section>
  );
}
