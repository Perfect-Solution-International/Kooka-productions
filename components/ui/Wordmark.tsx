import { cn } from "@/lib/utils";

/** Overlapping shard mark — swap for the supplied SVG logo when available. */
function ShardMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      aria-hidden
      className={cn("h-11 w-auto", className)}
    >
      <path d="M4 4 L20 0 L20 30 L4 40 Z" fill="#3ec38a" />
      <path d="M4 12 L26 4 L20 42 L4 48 Z" fill="#f2b322" />
      <path d="M26 4 L44 14 L24 52 L14 44 Z" fill="#e8503a" opacity="0.95" />
      <path d="M20 34 L34 30 L30 52 L16 52 Z" fill="#e6295b" />
    </svg>
  );
}

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <ShardMark className={compact ? "h-8" : undefined} />
      <span className="font-display leading-[1.05] font-bold tracking-[0.02em] uppercase">
        <span className="block text-kooka-white">Kooka</span>
        {compact ? null : (
          <span className="block text-kooka-white">Productions</span>
        )}
      </span>
    </span>
  );
}
