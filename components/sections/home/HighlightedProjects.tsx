import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollProjectShowcase } from "@/components/projects/scroll-project-showcase";
import { featuredProjects } from "@/data/projects";

export function HighlightedProjects() {
  return (
    <section
      id="projects"
      className="relative isolate pt-10 sm:pt-14 md:pt-16 lg:pt-20"
    >
      <div
        className="kooka-bloom top-1/3 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 opacity-25 sm:h-[38rem] sm:w-[38rem]"
        aria-hidden
      />

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
            className="[&_h2]:text-3xl [&_h2]:sm:text-4xl [&_h2]:lg:text-5xl"
          />
        }
      />

      <Reveal className="kooka-container relative flex justify-center pb-10 sm:pb-14 md:pb-16 lg:pb-20">
        <ButtonLink
          href="/showreel"
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
        >
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
