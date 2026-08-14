import { cn } from "@/lib/utils";

type LogoTickerProps = Readonly<{
  items: readonly string[];
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
        {rail.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="group flex shrink-0 items-center gap-3"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-kooka-amber/60 transition-colors duration-500 group-hover:bg-kooka-amber"
              aria-hidden
            />
            <span className="font-display text-2xl font-semibold tracking-[-0.02em] whitespace-nowrap text-kooka-muted uppercase transition-colors duration-500 group-hover:text-kooka-white sm:text-3xl">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
