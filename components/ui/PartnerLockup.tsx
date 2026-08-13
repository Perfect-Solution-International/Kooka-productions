import {
  Box,
  CircleDashed,
  Hexagon,
  Link2,
  Shuffle,
  Sparkle,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { producerPartners, type ProducerPartner } from "@/data/partners";
import { cn } from "@/lib/utils";

const glyphs: Record<ProducerPartner["glyph"], LucideIcon> = {
  "circle-dashed": CircleDashed,
  sparkle: Sparkle,
  box: Box,
  hexagon: Hexagon,
  waves: Waves,
  link: Link2,
  shuffle: Shuffle,
};

/**
 * Static centred logo lockup — wraps to 4-then-3 at desktop width, the way
 * the supplied reference sits. Swap the glyphs for real logo files when they
 * land; the row structure does not change.
 */
export function PartnerLockup({ className }: { readonly className?: string }) {
  return (
    <ul
      className={cn(
        "mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14",
        className,
      )}
    >
      {producerPartners.map((partner) => {
        const Glyph = glyphs[partner.glyph];

        return (
          <li key={partner.name}>
            <span className="group inline-flex items-center gap-2.5 text-kooka-muted transition-colors duration-500 hover:text-kooka-white">
              <Glyph className="h-4 w-4 shrink-0" aria-hidden />
              <span className="text-sm font-medium tracking-[0.01em] whitespace-nowrap sm:text-base">
                {partner.name}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
