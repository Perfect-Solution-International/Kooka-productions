import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { footprint } from "@/data/footprint";
import { img, isRemoteImage } from "@/data/media";
import { cn } from "@/lib/utils";

/**
 * The grid repeats a five-tile cycle over twelve columns: two half-width hero
 * tiles, then three third-width tiles. Placement comes from position in the
 * list rather than the data, so the rhythm holds no matter what is published.
 */
const CYCLE = 5;
const WIDE_PER_CYCLE = 2;

const isWide = (index: number) => index % CYCLE < WIDE_PER_CYCLE;

/*
 * The caption is laid over a fixed-ratio box that clips, so the phone ratio has
 * to be the tall one — a 16/10 tile at 320px is shorter than its own copy and
 * eats the last lines. The editorial wide/narrow rhythm only starts once there
 * is width to carry it.
 */
const tileClasses = (index: number) =>
  isWide(index)
    ? "aspect-4/5 sm:aspect-4/3 lg:col-span-6 lg:aspect-16/10"
    : "aspect-4/5 sm:aspect-4/3 lg:col-span-4 lg:aspect-square";

const indexLabel = (position: number) => String(position + 1).padStart(2, "0");

export function FootprintGrid() {
  return (
    <RevealGroup
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
      stagger={0.07}
    >
      {footprint.map((item, index) => {
        const remote = isRemoteImage(item.image);

        return (
        <RevealItem
          key={item.slug}
          className={cn(
            "kooka-glow-border group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.08] bg-kooka-carbon",
            tileClasses(index),
          )}
        >
          <Image
            src={remote ? img(item.image, isWide(index) ? 1600 : 1000, 80) : item.image}
            alt=""
            fill
            unoptimized={!remote}
            sizes={
              isWide(index)
                ? "(min-width: 640px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="-z-10 object-cover transition-transform duration-[1400ms] ease-kooka group-hover:scale-[1.04]"
          />

          {/* Bottom-anchored scrim keeps the caption at full contrast */}
          <div aria-hidden className="kooka-scrim absolute inset-0" />
          <div
            aria-hidden
            className="absolute inset-0 bg-kooka-amber/0 transition-colors duration-700 group-hover:bg-kooka-amber/[0.05]"
          />

          {/* Running index anchors the tile opposite the caption */}
          <span
            aria-hidden
            className="absolute top-5 right-5 font-display text-[0.6rem] tracking-[0.28em] text-kooka-muted tabular-nums transition-colors duration-500 group-hover:text-kooka-amber sm:top-7 sm:right-7 lg:top-9 lg:right-9"
          >
            {indexLabel(index)}
          </span>

          <div className="relative p-5 sm:p-7 md:p-8 lg:p-10">
            <h3
              className={cn(
                "kooka-display transition-colors duration-500 group-hover:text-kooka-flare",
                isWide(index)
                  ? "text-2xl sm:text-3xl lg:text-[2.4rem]"
                  : "text-xl sm:text-2xl lg:text-[1.75rem]",
              )}
            >
              {item.title}
            </h3>

            <span
              aria-hidden
              className="kooka-hover-rule mt-4 block h-px w-10 bg-kooka-amber/60"
            />

            <p
              className={cn(
                "mt-4 leading-relaxed text-kooka-mist",
                isWide(index)
                  ? "max-w-md text-[0.85rem]"
                  : "max-w-sm text-[0.78rem]",
              )}
            >
              {item.blurb}
            </p>

            <span className="kooka-hover-reveal mt-5 inline-flex items-center gap-2 font-display text-[0.58rem] tracking-[0.26em] text-kooka-amber uppercase">
              Kooka delivers here
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </span>
          </div>
        </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
