import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { footprint } from "@/data/footprint";
import { img } from "@/data/media";
import { cn } from "@/lib/utils";

/** Emphasis tiles break the rhythm so the grid reads cinematic, not catalogued. */
const spanClasses: Record<string, string> = {
  wide: "lg:col-span-2 min-h-[22rem] lg:min-h-[26rem]",
  tall: "lg:row-span-2 min-h-[22rem] lg:min-h-[34rem]",
  default: "min-h-[22rem] lg:min-h-[26rem]",
};

export function FootprintGrid() {
  return (
    <RevealGroup
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      stagger={0.08}
    >
      {footprint.map((item) => (
        <RevealItem
          key={item.slug}
          className={cn(
            "group relative isolate overflow-hidden rounded-3xl border border-white/[0.07]",
            spanClasses[item.span ?? "default"],
          )}
        >
          <Image
            src={img(item.image, item.span === "wide" ? 1600 : 1000, 80)}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="-z-10 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />

          {/* Bottom-fading scrim keeps the corner text at full contrast */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-kooka-void/95 via-kooka-void/55 to-transparent transition-opacity duration-700 group-hover:from-kooka-void"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-kooka-amber/0 transition-colors duration-700 group-hover:bg-kooka-amber/[0.06]"
          />

          {/* Text sits bottom-right, 40–80px from the edges */}
          <div className="absolute inset-x-0 bottom-0 flex justify-end p-10 sm:p-12 lg:p-14">
            <div className="max-w-sm text-right">
              <h3 className="kooka-display text-3xl transition-colors duration-500 group-hover:text-kooka-flare sm:text-4xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-kooka-mist">
                {item.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-display text-[0.62rem] tracking-[0.22em] text-kooka-amber uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                Kooka delivers here
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
