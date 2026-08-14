import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { fadeUp } from "@/lib/motion";

type SectionHeadingProps = {
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly tagline?: string;
  readonly description?: string;
  readonly align?: "left" | "center";
  readonly className?: string;
  readonly action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  tagline,
  description,
  align = "left",
  className,
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        centered && "md:flex-col md:items-center",
        className,
      )}
    >
      <RevealGroup
        className={cn("max-w-2xl", centered && "mx-auto text-center")}
        stagger={0.08}
      >
        {eyebrow ? (
          <RevealItem
            as="p"
            className={cn("kooka-eyebrow mb-4 flex items-center gap-3 sm:mb-5", centered && "justify-center")}
          >
            <span className="h-px w-6 shrink-0 bg-kooka-amber/70 sm:w-8" aria-hidden />
            {eyebrow}
          </RevealItem>
        ) : null}

        {/* Scales continuously rather than stepping, so no width is left short. */}
        <RevealItem as="h2" className="kooka-display text-[clamp(1.875rem,7vw,3.75rem)]">
          {title}
        </RevealItem>

        {tagline ? (
          <RevealItem
            as="p"
            className="mt-4 font-display text-base font-medium tracking-[0.18em] text-kooka-amber uppercase sm:text-lg"
          >
            {tagline}
          </RevealItem>
        ) : null}

        {description ? (
          <RevealItem as="p" className="mt-6 text-base leading-relaxed text-kooka-mist sm:text-lg">
            {description}
          </RevealItem>
        ) : null}
      </RevealGroup>

      {action ? (
        <Reveal variants={fadeUp} className={cn("shrink-0", centered && "mt-2")}>
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
