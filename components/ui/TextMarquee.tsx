import { cn } from "@/lib/utils";

type TextMarqueeProps = Readonly<{
  text: string;
  className?: string;
  /** Repeats per rail — more copies keep wide viewports filled. */
  repeat?: number;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
}>;

/**
 * Infinite horizontal text rail. The sequence is rendered twice and shifted
 * by -50%, so the seam lands exactly where it repeats. Only the first copy is
 * exposed to assistive tech; the rest are decorative duplicates.
 */
export function TextMarquee({
  text,
  className,
  repeat = 3,
  duration = 34,
  reverse = false,
}: TextMarqueeProps) {
  const sequence = Array.from({ length: repeat }, (_, index) => index);

  return (
    <div className={cn("mask-edges-x relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max animate-ticker items-center",
          "hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((rail) =>
          sequence.map((index) => (
            <span
              key={`${rail}-${index}`}
              aria-hidden={rail === 1 || index > 0}
              className="flex shrink-0 items-center"
            >
              <span className="px-6 text-base leading-relaxed whitespace-nowrap text-kooka-mist sm:px-9 sm:text-lg">
                {text}
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-kooka-amber/70"
              />
            </span>
          )),
        )}
      </div>
    </div>
  );
}
