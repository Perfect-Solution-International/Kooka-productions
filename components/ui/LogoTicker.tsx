import type { ProducerPartner } from "@/data/partners";
import { filledGlyphs, partnerGlyphs } from "@/lib/partnerGlyphs";
import { cn } from "@/lib/utils";

type LogoTickerProps = Readonly<{
  items: readonly ProducerPartner[];
  className?: string;
  /** Reverses direction so stacked rails drift against each other. */
  reverse?: boolean;
}>;

/**
 * Infinite horizontal marquee. The list is rendered twice and translated by
 * -50%, so the seam lands exactly where the sequence repeats.
 */
export function LogoTicker({ items, className, reverse }: LogoTickerProps) {
  const rail = [...items, ...items];

  return (
    <div className={cn("mask-edges-x relative overflow-hidden", className)}>
      <ul
        className={cn(
          "flex w-max animate-ticker items-center gap-14 pr-14 sm:gap-20 sm:pr-20",
          "hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {rail.map((partner, index) => {
          const Glyph = partnerGlyphs[partner.glyph];

          return (
            <li
              key={`${partner.name}-${index}`}
              aria-hidden={index >= items.length}
              className="group flex shrink-0 items-center gap-3.5"
            >
              <Glyph
                className={cn(
                  "h-6 w-6 shrink-0 text-kooka-amber/60 transition-colors duration-500 group-hover:text-kooka-amber sm:h-7 sm:w-7",
                  filledGlyphs.has(partner.glyph) && "fill-current",
                )}
                strokeWidth={2}
                aria-hidden
              />
              <span className="font-display text-2xl font-semibold tracking-[-0.02em] whitespace-nowrap text-kooka-muted uppercase transition-colors duration-500 group-hover:text-kooka-white sm:text-3xl">
                {partner.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
