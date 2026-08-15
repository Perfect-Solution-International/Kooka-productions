import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { footprint } from "@/data/footprint";
import { img, isRemoteImage } from "@/data/media";

/**
 * Editorial two-up index of the environments Kooka works in. The plate carries
 * the image alone and the caption sits under it, flush right, so the column
 * edge reads as a single line down the page.
 */
export function FootprintShowcase() {
  return (
    <RevealGroup
      className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-20"
      stagger={0.09}
    >
      {footprint.map((item) => (
        <RevealItem key={item.slug} className="group">
          <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-white/[0.07]">
            <Image
              src={
                isRemoteImage(item.image) ? img(item.image, 1200, 80) : item.image
              }
              alt={item.title}
              fill
              unoptimized={!isRemoteImage(item.image)}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-kooka-void/70 via-transparent to-transparent"
            />
          </div>

          <div className="mt-6 text-right">
            <h3 className="font-display text-sm font-semibold tracking-[0.18em] uppercase transition-colors duration-500 group-hover:text-kooka-flare sm:text-base">
              {item.title}
            </h3>
            <p className="mt-3 ml-auto max-w-md text-sm leading-relaxed text-kooka-mist">
              {item.blurb}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
