import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon, type IconKey } from "@/components/ui/Icon";
import { valueProps } from "@/data/values";
import { img, media } from "@/data/media";
import { fadeRight } from "@/lib/motion";

export function WhyChooseKooka() {
  return (
    <Section id="why-kooka" className="border-t border-white/[0.06]">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="The Difference"
            title="Why Choose Kooka"
            description="Production is a promise made months before anyone sees it kept. These five things are how we keep it."
          />

          <Reveal variants={fadeRight} className="mt-12">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white/[0.07]">
              <Image
                src={img(media.mixingConsole, 1200, 80)}
                alt="Front-of-house control position during an event"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="kooka-scrim absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-display text-sm tracking-[0.2em] text-kooka-amber uppercase">
                  Front of house
                </p>
                <p className="mt-2 text-sm text-kooka-mist">
                  Documented patch, rehearsed cues, redundant paths.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="lg:col-span-7" stagger={0.1}>
          {valueProps.map((value, index) => (
            <RevealItem
              as="li"
              key={value.title}
              className="group flex gap-6 border-b border-white/[0.07] py-8 first:pt-0 last:border-b-0"
            >
              <div className="flex shrink-0 flex-col items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-kooka-amber transition-all duration-500 group-hover:border-kooka-amber/50 group-hover:bg-kooka-amber/10 group-hover:shadow-[0_0_30px_-8px_var(--color-kooka-amber)]">
                  <Icon name={value.icon as IconKey} className="h-5 w-5" />
                </span>
                <span className="font-display text-[0.65rem] tracking-[0.24em] text-kooka-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h3 className="kooka-display text-2xl transition-colors duration-500 group-hover:text-kooka-flare sm:text-3xl">
                  {value.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-kooka-mist sm:text-base">
                  {value.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
