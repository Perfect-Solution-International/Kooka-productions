import { Section } from "@/components/ui/Section";
import { LogoTicker } from "@/components/ui/LogoTicker";
import { producerPartners } from "@/data/partners";

export function PartnerMarquee() {
  return (
    <Section
      id="partner-marquee"
      full
      density="tight"
      className="overflow-hidden border-t border-white/[0.06]"
    >
  
      <div className="relative py-6 sm:py-10">
        <div className="relative -mx-[10vw] w-[120vw] rotate-[-6deg]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden bg-yellow-400/20">
            <div className="animate-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>
          <LogoTicker items={producerPartners} reverse />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-yellow-400/20">
            <div className="animate-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-yellow-400 to-transparent [animation-direction:reverse]" />
          </div>
        </div>
      </div>
    </Section>
  );
}
