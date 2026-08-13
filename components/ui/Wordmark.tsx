import { cn } from "@/lib/utils";

/** Text-set brand mark — swap for the supplied SVG logo when available. */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-kooka-amber to-kooka-ember"
      >
        <span className="font-display text-lg leading-none font-bold text-kooka-black">
          K
        </span>
        <span className="absolute inset-0 rounded-lg bg-kooka-amber/50 blur-md -z-10" />
      </span>
      <span className="font-display leading-none font-bold tracking-[-0.02em] uppercase">
        <span className="text-kooka-white">Kooka</span>
        {compact ? null : (
          <span className="ml-1.5 text-kooka-muted">Productions</span>
        )}
      </span>
    </span>
  );
}
