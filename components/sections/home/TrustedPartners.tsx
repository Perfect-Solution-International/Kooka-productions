import { Section } from "@/components/ui/Section";
import { PartnerLockup } from "@/components/ui/PartnerLockup";
import { Reveal } from "@/components/ui/Reveal";

export function TrustedPartners() {
  return (
    <Section id="trusted" className="border-t border-white/[0.06]" bloom="bottom">
      <Reveal>
        {/* Same display scale as the "Why Choose Kooka" heading */}
        <h2 className="kooka-display text-center text-[clamp(2.5rem,5vw,4.25rem)]">
          Trusted By Worldwide
          <span className="block">Producer Partner</span>
        </h2>

        <PartnerLockup className="mt-10" />
      </Reveal>
    </Section>
  );
}
