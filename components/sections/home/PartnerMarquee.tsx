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
      {/*
       * The tilt lives on the wrapper while the rail keeps the plain
       * horizontal ticker, so the logos climb from the bottom-left corner to
       * the top-right. `reverse` flips the ticker to travel with that heading;
       * without it the rotated rail would drift back down toward the left.
       */}
      <div className="relative py-6 sm:py-10">
        <div className="relative -mx-[10vw] w-[120vw] rotate-[-6deg]">
          <LogoTicker items={producerPartners} reverse />
        </div>
      </div>
    </Section>
  );
}
