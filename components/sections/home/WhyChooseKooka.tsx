import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { valueProps } from "@/data/values";
import { localMedia } from "@/data/media";
import { fadeLeft, fadeUp } from "@/lib/motion";

export function WhyChooseKooka() {
  return (
    <Section
      id="why-kooka"
      full
      className="overflow-hidden border-t border-white/[0.06]"
    >
      <Image
        src={localMedia.whyChooseBackdrop}
        alt=""
        fill
        quality={82}
        sizes="100vw"
        // Local asset: the custom loader passes it through untouched, so there
        // is no width-derived srcset to generate.
        unoptimized
        className="-z-20 object-cover object-center"
      />

      {/* Scrims — the frame is bright, so the type needs its own ground */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-kooka-void/55" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-kooka-void via-kooka-void/65 to-kooka-void/35"
      />

      <div className="kooka-container relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal variants={fadeLeft} className="lg:col-span-5">
          <h2 className="kooka-display text-[clamp(2.5rem,5vw,4.25rem)]">
            Why Choose Kooka
          </h2>
        </Reveal>

        {/* Rule-separated index — no icons, no numbering, no body copy */}
        <RevealGroup as="ul" className="lg:col-span-7" stagger={0.09}>
          {valueProps.map((value) => (
            <RevealItem
              as="li"
              variants={fadeUp}
              key={value.title}
              className="group border-b border-white/25 py-5 sm:py-6"
            >
              <span className="block font-display text-base font-medium tracking-[0.12em] text-kooka-white uppercase transition-colors duration-500 group-hover:text-kooka-amber sm:text-xl">
                {value.title}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
