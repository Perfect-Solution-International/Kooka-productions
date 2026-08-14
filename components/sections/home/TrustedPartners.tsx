import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { PartnerLockup } from "@/components/ui/PartnerLockup";
import { LogoTicker } from "@/components/ui/LogoTicker";
import { Reveal } from "@/components/ui/Reveal";
import { localMedia } from "@/data/media";
import { partners } from "@/data/partners";

export function TrustedPartners() {
  return (
    <Section
      id="trusted"
      full
      className="overflow-hidden border-t border-white/[0.06]"
    >
      <Image
        src={localMedia.trustedBackdrop}
        alt=""
        fill
        quality={82}
        sizes="100vw"
        priority
        // Local asset: the custom loader passes it through untouched, so there
        // is no width-derived srcset to generate.
        unoptimized
        className="-z-20 object-cover object-center"
      />

      {/* The frame is bright and saturated, so the lockup needs a deep ground */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-kooka-void/80" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-kooka-void via-kooka-void/60 to-kooka-void"
      />

      <div className="kooka-container relative">
        <Reveal>
          {/* Small, tracked, two-line label — the section's only heading */}
          <h2 className="kooka-display text-center text-[clamp(2.5rem,5vw,4.25rem)]">
            <span className="block">Trusted By Worldwide</span>
            <span className="block">Producer Partner</span>
          </h2>

          <PartnerLockup marquee className="mt-10" />

          <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-kooka-mist sm:text-lg">
            Delivering production solutions across Melbourne’s leading venues,
            brands, and live event spaces.
          </p>
        </Reveal>
      </div>

      {/* Full-bleed rail so the marquee runs past the container edges */}
      <Reveal className="relative mt-12">
        <LogoTicker items={partners} />
      </Reveal>
    </Section>
  );
}
