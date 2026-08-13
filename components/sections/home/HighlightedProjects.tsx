import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProjects } from "@/data/projects";
import { img } from "@/data/media";
import { cn } from "@/lib/utils";

export function HighlightedProjects() {
  return (
    <Section id="projects" bloom="center">
      <SectionHeading
        eyebrow="Selected Work"
        title="Highlighted Projects"
        description="A sample of recent builds — the full archive lives in the showreel."
        action={
          <ButtonLink href="/showreel" variant="secondary">
            Full Showreel
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden
            />
          </ButtonLink>
        }
      />

      <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2" stagger={0.1}>
        {featuredProjects.map((project, index) => (
          <RevealItem key={project.title}>
            <TiltCard className="h-full" intensity={7}>
              <Link
                href="/showreel"
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-kooka-carbon",
                  index % 3 === 0 ? "lg:min-h-[30rem]" : "lg:min-h-[26rem]",
                )}
              >
                <div className="absolute inset-0">
                  <Image
                    src={img(project.image, 1400, 80)}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="kooka-scrim absolute inset-0" />
                  <div className="absolute inset-0 bg-kooka-void/20 transition-opacity duration-700 group-hover:opacity-0" />
                </div>

                <div className="relative mt-auto flex flex-col gap-4 p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-kooka-amber/40 bg-kooka-amber/10 px-3 py-1 font-display text-[0.6rem] tracking-[0.2em] text-kooka-amber uppercase backdrop-blur-md">
                      {project.type}
                    </span>
                    <span className="rounded-full border border-white/12 bg-kooka-black/50 px-3 py-1 font-display text-[0.6rem] tracking-[0.2em] text-kooka-mist uppercase backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="kooka-display text-3xl sm:text-4xl">
                    {project.title}
                  </h3>

                  <p className="max-w-lg text-sm leading-relaxed text-kooka-mist">
                    {project.summary}
                  </p>

                  <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
                    <span className="inline-flex items-center gap-2 text-xs text-kooka-muted">
                      <MapPin className="h-3.5 w-3.5 text-kooka-amber" aria-hidden />
                      {project.location}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-kooka-white transition-all duration-500 group-hover:border-kooka-amber group-hover:bg-kooka-amber group-hover:text-kooka-black">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
