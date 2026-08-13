import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function HighlightedProjects() {
  return (
    <Section id="projects" bloom="center">
      <SectionHeading
        eyebrow="Selected Work"
        title="Highlighted Projects"
        description="A selection of recent productions showcasing our capabilities across different event environments."
        align="center"
      />

      <RevealGroup className="mt-16 flex flex-col gap-6 sm:gap-8" stagger={0.12}>
        {featuredProjects.map((project, index) => (
          <RevealItem key={project.title}>
            <Link
              href="/showreel"
              className="group relative block aspect-4/3 overflow-hidden sm:aspect-21/9"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                // Local asset: the custom loader passes it through untouched,
                // so there is no width-derived srcset to generate.
                unoptimized
                className={cn(
                  "object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]",
                  project.focus ?? "object-center",
                )}
              />

              {/* Corner labels sit on their own light scrims */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-kooka-void/75 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-kooka-void/90 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5 sm:p-7">
                <span className="font-display text-[0.6rem] font-semibold tracking-[0.24em] text-kooka-white uppercase sm:text-[0.68rem]">
                  Project {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[0.6rem] font-semibold tracking-[0.24em] text-kooka-white uppercase sm:text-[0.68rem]">
                  {project.type}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-7">
                <div>
                  <h3 className="kooka-display text-2xl sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-xs leading-relaxed text-kooka-mist opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:text-sm">
                    {project.summary}
                  </p>
                  <p className="mt-2 text-[0.65rem] tracking-[0.18em] text-kooka-muted uppercase">
                    {project.location} · {project.year}
                  </p>
                </div>

                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-kooka-white transition-all duration-500 group-hover:border-kooka-amber group-hover:bg-kooka-amber group-hover:text-kooka-black sm:inline-flex">
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14 flex justify-center">
        <ButtonLink href="/showreel" variant="secondary" size="lg">
          View Full Showreel
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden
          />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
