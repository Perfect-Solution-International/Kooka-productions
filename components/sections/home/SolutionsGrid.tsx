import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";

export function SolutionsGrid() {
  return (
    <Section id="solutions" className="border-t border-white/[0.06]">
      <SectionHeading
        eyebrow="Capabilities"
        title="Kooka Solutions"
        tagline="Technical Artistry. Zero Compromise."
        description="Nine disciplines that combine into a single production package — or plug into an existing team where you need the specialist depth."
        action={
          <ButtonLink href="/services" variant="secondary">
            All Solutions
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden
            />
          </ButtonLink>
        }
      />

      <RevealGroup
        className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {services.map((service, index) => (
          <RevealItem key={service.slug}>
            <Link
              href={`/services#${service.slug}`}
              className="group relative flex h-full flex-col justify-between gap-10 bg-kooka-black p-8 transition-colors duration-500 hover:bg-kooka-carbon lg:p-10"
            >
              {/* Amber wash that rises on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-kooka-amber/[0.09] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-kooka-amber transition-all duration-500 group-hover:border-kooka-amber/50 group-hover:bg-kooka-amber/10 group-hover:shadow-[0_0_30px_-8px_var(--color-kooka-amber)]">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-xs tracking-[0.24em] text-kooka-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="kooka-display mt-8 text-2xl transition-colors duration-500 group-hover:text-kooka-flare">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kooka-mist">
                  {service.tagline}
                </p>
              </div>

              <span className="relative inline-flex items-center gap-2 font-display text-[0.68rem] tracking-[0.2em] text-kooka-muted uppercase transition-colors duration-500 group-hover:text-kooka-amber">
                Explore
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden
                />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
