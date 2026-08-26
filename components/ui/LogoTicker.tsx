import Image from "next/image";
import type { ProducerPartner } from "@/data/partners";
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
        {rail.map((partner, index) => (
          <li
            key={`${partner.name}-${index}`}
            aria-hidden={index >= items.length}
            className="group flex h-12 w-32 shrink-0 items-center justify-center sm:h-14 sm:w-40"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={56}
              unoptimized
              className="h-full w-full object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
