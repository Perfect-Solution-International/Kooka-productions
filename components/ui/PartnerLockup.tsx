import {
  Box,
  CircleSlash,
  CircleX,
  Layers,
  Moon,
  Sparkle,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { producerPartners, type ProducerPartner } from "@/data/partners";
import { cn } from "@/lib/utils";

const glyphs: Record<ProducerPartner["glyph"], LucideIcon> = {
  moon: Moon,
  sun: Sun,
  box: Box,
  "circle-x": CircleX,
  layers: Layers,
  "circle-slash": CircleSlash,
  sparkle: Sparkle,
};

/** Marks that read as solid shapes rather than hairline outlines. */
const filled: ReadonlySet<ProducerPartner["glyph"]> = new Set([
  "moon",
  "box",
  "layers",
  "sparkle",
]);

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
            <span className="group inline-flex items-center gap-2.5 text-kooka-mist transition-colors duration-500 hover:text-kooka-white">
              <Glyph
                className={cn(
                  "h-5 w-5 shrink-0 sm:h-[1.375rem] sm:w-[1.375rem]",
                  filled.has(partner.glyph) && "fill-current",
                )}
                strokeWidth={2}
                aria-hidden
              />
              <span className="text-base font-medium tracking-[0.01em] whitespace-nowrap sm:text-lg">
                {partner.name}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
