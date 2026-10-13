import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { maskUp } from "@/lib/motion";
import { img, isRemoteImage } from "@/data/media";
import { cn } from "@/lib/utils";
import { unsplashLoader } from "@/lib/imageLoader";

type PageHeroProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description?: string;
  readonly image: string;
  readonly backgroundMedia?: ReactNode;
  readonly children?: ReactNode;
  readonly className?: string;
  /**
   * `compact` trades the full-bleed height for a shallow banner — used by
   * secondary pages that lead with their content rather than the image.
   * `video` keeps 16:9 media intact and places the copy below it on phones.
   */
  readonly size?: "default" | "compact" | "video";
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
  image,
  backgroundMedia,
  children,
  className,
  size = "default",
}: PageHeroProps) {
  const compact = size === "compact";
  const video = size === "video";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        video
          ? "block"
          : cn(
              "flex items-end",
              compact
                ? "min-h-[42svh] pt-28 pb-10 sm:min-h-[46svh] sm:pt-32 sm:pb-14"
                : "min-h-[68svh] pt-32 pb-14 sm:min-h-[74svh] sm:pt-36 sm:pb-20",
            ),
        className,
      )}
    >
      <div className={video ? "relative isolate aspect-video w-full overflow-hidden" : "contents"}>
        <Image
          src={isRemoteImage(image) ? img(image, 2200, 82) : image}
          loader={isRemoteImage(image) ? unsplashLoader : undefined}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        {backgroundMedia}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10",
            video
              ? "hidden bg-linear-to-t from-kooka-void/85 via-kooka-void/35 to-transparent lg:block"
              : "bg-linear-to-t from-kooka-void via-kooka-void/75 to-kooka-void/45",
          )}
        />
        <div
          aria-hidden
          className="kooka-bloom bottom-0 -left-16 h-[16rem] w-[16rem] animate-glow-pulse sm:-left-24 sm:h-[26rem] sm:w-[26rem]"
        />
      </div>

      <div
        className={cn(
          "kooka-container",
          video
            ? "pointer-events-none relative py-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pt-0 lg:pb-14 xl:pb-20"
            : "relative",
        )}
      >
        {/* Video copy stays left aligned, including below the media on phones. */}
        <RevealGroup className={cn("max-w-4xl", video ? "text-left" : "text-center md:text-left")} stagger={0.1}>
          <RevealItem
            as="p"
            className={cn("kooka-eyebrow mb-5 flex items-center gap-3 sm:mb-7", video ? "justify-start" : "justify-center md:justify-start")}
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
              className={cn("mt-6 max-w-2xl text-base leading-relaxed text-kooka-mist sm:text-lg", video ? "mx-0" : "mx-auto md:mx-0")}
            >
              {description}
            </RevealItem>
          ) : null}
        </RevealGroup>

        {children ? (
          <Reveal className={cn("pointer-events-auto mt-10", video ? "text-left" : "text-center md:text-left")}>{children}</Reveal>
        ) : null}
      </div>
    </section>
  );
}
