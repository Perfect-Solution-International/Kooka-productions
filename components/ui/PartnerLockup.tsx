import Image from "next/image";
import { producerPartners, type ProducerPartner } from "@/data/partners";
import { cn } from "@/lib/utils";

type PartnerLockupProps = Readonly<{
  className?: string;
  /**
   * Scrolls the marks as an infinite right-to-left rail instead of wrapping
   * them into a static block.
   */
  marquee?: boolean;
  /** Seconds for one full loop. Marquee only. */
  duration?: number;
}>;

function PartnerMark({ partner }: { readonly partner: ProducerPartner }) {
  return (
    <span className="group inline-flex h-8 w-24 items-center justify-center sm:h-9 sm:w-28">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={112}
        height={36}
        unoptimized
        className="h-full w-full object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </span>
  );
}

/**
 * Producer logo lockup. Static by default — wraps to 4-then-3 at desktop
 * width, the way the supplied reference sits. With `marquee`, the same marks
 * run as an infinite rail: the list is rendered twice and translated by -50%,
 * so the seam lands exactly where the sequence repeats, and only the first
 * copy is exposed to assistive tech.
 */
export function PartnerLockup({
  className,
  marquee = false,
  duration = 40,
}: PartnerLockupProps) {
  if (!marquee) {
    return (
      <ul
        className={cn(
          "mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14",
          className,
        )}
      >
        {producerPartners.map((partner) => (
          <li key={partner.name}>
            <PartnerMark partner={partner} />
          </li>
        ))}
      </ul>
    );
  }

  const rail = [...producerPartners, ...producerPartners];

  return (
    <div className={cn("mask-edges-x relative overflow-hidden", className)}>
      <ul
        className="flex w-max animate-ticker items-center gap-10 pr-10 hover:[animation-play-state:paused] sm:gap-14 sm:pr-14"
        style={{ animationDuration: `${duration}s` }}
      >
        {rail.map((partner, index) => (
          <li
            key={`${partner.name}-${index}`}
            aria-hidden={index >= producerPartners.length}
            className="shrink-0"
          >
            <PartnerMark partner={partner} />
          </li>
        ))}
      </ul>
    </div>
  );
}
