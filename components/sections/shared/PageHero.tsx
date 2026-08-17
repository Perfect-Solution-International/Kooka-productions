import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { maskUp } from "@/lib/motion";
import { img } from "@/data/media";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description?: string;
  readonly image: string;
  readonly children?: ReactNode;
  readonly className?: string;
  /**
   * `compact` trades the full-bleed height for a shallow banner — used by
   * secondary pages that lead with their content rather than the image.
   */
  readonly size?: "default" | "compact";
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
  image,
  children,
  className,
  size = "default",
}: PageHeroProps) {
  const compact = size === "compact";

  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden",
        compact
          ? "min-h-[42svh] pt-28 pb-10 sm:min-h-[46svh] sm:pt-32 sm:pb-14"
          : "min-h-[68svh] pt-32 pb-14 sm:min-h-[74svh] sm:pt-36 sm:pb-20",
        className,
      )}
    >
      <Image
        src={img(image, 2200, 82)}
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-kooka-void via-kooka-void/75 to-kooka-void/45"
      />
      <div
        aria-hidden
        className="kooka-bloom bottom-0 -left-16 h-[16rem] w-[16rem] animate-glow-pulse sm:-left-24 sm:h-[26rem] sm:w-[26rem]"
      />

      <div className="kooka-container relative">
        {/* Phones read the hero as a centred block; the rail returns at md. */}
        <RevealGroup className="max-w-4xl text-center md:text-left" stagger={0.1}>
          <RevealItem
            as="p"
            className="kooka-eyebrow mb-5 flex items-center justify-center gap-3 sm:mb-7 md:justify-start"
          >
            <span className="h-px w-6 shrink-0 bg-kooka-amber/70 sm:w-10" aria-hidden />
            {eyebrow}
          </RevealItem>

          <h1
            className={cn(
              "kooka-display overflow-hidden",
              compact
                ? "text-[clamp(1.75rem,5.5vw,3.5rem)]"
                : "text-[clamp(2rem,8.5vw,6rem)]",
            )}
          >
            <RevealItem as="span" variants={maskUp} className="block">
              {title}
            </RevealItem>
          </h1>

          <RevealItem
            as="p"
            className="mt-5 font-display text-sm font-medium tracking-[0.1em] text-kooka-flare uppercase sm:mt-6 sm:text-lg sm:tracking-[0.12em] lg:text-xl"
          >
            {subtitle}
          </RevealItem>

          {description ? (
            <RevealItem
              as="p"
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-kooka-mist sm:text-lg md:mx-0"
            >
              {description}
            </RevealItem>
          ) : null}
        </RevealGroup>

        {children ? (
          <Reveal className="mt-10 text-center md:text-left">{children}</Reveal>
        ) : null}
      </div>
    </section>
  );
}
