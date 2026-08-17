import Image from "next/image";
import { CursorParallax } from "@/components/effects/CursorParallax";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealItem } from "@/components/ui/Reveal";
import { img } from "@/data/media";
import type { FootprintCategory } from "@/data/footprint";

type FootprintBlockProps = {
  readonly category: FootprintCategory;
  readonly index: number;
};

export function FootprintBlock({ category, index }: FootprintBlockProps) {
  return (
    <RevealItem as="li" className="h-full">
      <CursorParallax className="rounded-2xl">
        <GlassCard
          as="article"
          id={category.slug}
          className="group relative flex h-full min-h-[26rem] scroll-mt-32 flex-col justify-end transition-shadow duration-500 hover:shadow-[0_36px_90px_-46px_rgb(255_176_32/0.42)]"
        >
          <Image
            src={img(category.image, 900, 78)}
            alt={category.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />

          {/*
           * Brief calls for a black gradient rising 40-60% of the frame so the
           * bottom-aligned copy stays readable over any photograph.
           */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-kooka-black via-kooka-black/75 via-40% to-transparent to-70%"
          />

          <span className="absolute top-4 right-5 font-display text-xs tracking-[0.24em] text-kooka-white/50 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative p-6 text-right sm:p-7">
            <h2 className="kooka-display text-xl leading-tight sm:text-2xl">
              {category.title}
            </h2>
            <p className="mt-4 ml-auto max-w-sm text-sm leading-relaxed text-kooka-mist">
              {category.description}
            </p>
          </div>
        </GlassCard>
      </CursorParallax>
    </RevealItem>
  );
}
