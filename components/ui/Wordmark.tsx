import Image from "next/image";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  compact = false,
}: {
  readonly className?: string;
  readonly compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/Logo-kooka.png"
        alt=""
        width={483}
        height={517}
        priority
        // Local asset: the custom loader (lib/imageLoader.ts) passes it through
        // untouched, so there is no width-derived srcset to generate.
        unoptimized
        className={cn("w-auto", compact ? "h-8" : "h-10 lg:h-12")}
      />
      <span className="font-display leading-[1.05] font-bold tracking-[0.02em] uppercase">
        <span className="block text-kooka-white">Kooka</span>
        {compact ? null : (
          <span className="block text-kooka-white">Productions</span>
        )}
      </span>
    </span>
  );
}
