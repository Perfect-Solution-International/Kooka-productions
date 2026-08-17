import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getFootprint, type FootprintItem } from "@/data/footprint";
import { img, isRemoteImage } from "@/data/media";

const indexLabel = (position: number) => String(position + 1).padStart(2, "0");

export function FootprintGrid() {
  const footprint = getFootprint();
  const total = indexLabel(footprint.length);

  return (
    <RevealGroup
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
      stagger={0.07}
    >
      {footprint.map((item, index) => {
        const remote = isRemoteImage(item.image);

        /*
         * The caption is laid over a fixed-ratio box that clips, so the phone
         * ratio has to be the tall one — a 16/10 tile at 320px is shorter than
         * its own copy and eats the last lines. The landscape ratio only starts
         * once there is width to carry it.
         */
        return (
          <RevealItem
            key={item.slug}
            className="kooka-glow-border group relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.08] bg-kooka-carbon sm:aspect-4/3 lg:aspect-16/10"
          >
            <Image
              src={remote ? img(item.image, 1600, 80) : item.image}
              alt=""
              fill
              unoptimized={!remote}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="-z-10 object-cover transition-transform duration-[1400ms] ease-kooka group-hover:scale-[1.04]"
            />

            {/* Bottom-anchored scrim keeps the caption at full contrast */}
            <div aria-hidden className="kooka-scrim absolute inset-0" />
            <div
              aria-hidden
              className="absolute inset-0 bg-kooka-amber/0 transition-colors duration-700 group-hover:bg-kooka-amber/[0.05]"
            />

            {/* Running index anchors the tile opposite the caption */}
            <p
              aria-hidden
              className="absolute top-5 right-5 font-display text-[0.6rem] font-semibold tracking-[0.28em] tabular-nums transition-colors duration-500 sm:top-7 sm:right-7 lg:top-9 lg:right-9"
            >
              <span className="text-kooka-amber group-hover:text-kooka-flare">
                {indexLabel(index)}
              </span>
              <span className="mx-1.5 text-kooka-muted">/</span>
              <span className="text-kooka-muted">{total}</span>
            </p>

            <div className="relative p-5 sm:p-7 md:p-8 lg:p-10">
              <FootprintMeta item={item} />

              <h3 className="kooka-display mt-2 text-xl transition-colors duration-500 group-hover:text-kooka-flare sm:text-2xl lg:text-[2rem]">
                {item.title}
              </h3>

              <span
                aria-hidden
                className="kooka-hover-rule mt-4 block h-px w-10 bg-kooka-amber/60"
              />

              <p className="mt-4 max-w-md text-[0.85rem] leading-relaxed text-kooka-mist">
                {item.blurb}
              </p>

              {item.href ? (
                <Link
                  href={item.href}
                  className="kooka-hover-reveal group/link mt-5 inline-flex items-center gap-2 font-display text-[0.58rem] tracking-[0.26em] text-kooka-amber uppercase"
                >
                  View Project
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                    aria-hidden
                  />
                </Link>
              ) : (
                <span className="kooka-hover-reveal mt-5 inline-flex items-center gap-2 font-display text-[0.58rem] tracking-[0.26em] text-kooka-amber uppercase">
                  Kooka delivers here
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                </span>
              )}
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

function FootprintMeta({ item }: { readonly item: FootprintItem }) {
  const parts = [item.type, item.location, item.year].filter(
    (part) => part.trim().length > 0,
  );
  if (parts.length === 0) return null;

  return (
    <p className="font-display text-[0.58rem] font-medium tracking-[0.2em] text-kooka-mist uppercase sm:text-[0.66rem] sm:tracking-[0.24em]">
      {parts.map((part, index) => (
        <span key={part}>
          {index > 0 ? <span className="mx-2.5 text-kooka-muted">·</span> : null}
          {part}
        </span>
      ))}
    </p>
  );
}
