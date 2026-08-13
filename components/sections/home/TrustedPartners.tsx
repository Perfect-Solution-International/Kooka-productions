import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnerLockup } from "@/components/ui/PartnerLockup";
import { Reveal } from "@/components/ui/Reveal";

export function TrustedPartners() {
  return (
    <Section id="trusted" className="border-t border-white/[0.06]" bloom="bottom">
      <SectionHeading
        title="Trusted Across Leading Venues & Events"
        description="Delivering production solutions across Melbourne's leading venues, brands, and live event spaces."
        align="center"
      />

      {/* Producer partner lockup */}
      <Reveal className="mt-20">
        <p className="text-center font-display text-xs font-bold tracking-[0.24em] text-kooka-white uppercase sm:text-sm">
          Trusted By Worldwide
          <span className="block">Producer Partner</span>
        </p>
        <PartnerLockup className="mt-10" />
      </Reveal>
    </Section>
  );
}
