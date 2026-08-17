import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  readonly id?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly containerClassName?: string;
  /** Renders a warm ambient bloom behind the section content. */
  readonly bloom?: "none" | "top" | "center" | "bottom";
  readonly full?: boolean;
  /**
   * Vertical rhythm. Interior pages give each section room to read on its own;
   * the home page runs one band straight into the next, where the roomier
   * scale reads as dead space rather than as separation.
   */
  readonly density?: "default" | "tight";
};

const densityPadding: Record<"default" | "tight", string> = {
  default: "py-16 sm:py-24 md:py-28 lg:py-36",
  tight: "py-10 sm:py-14 md:py-16 lg:py-20",
};

/*
 * The bloom is sized under the viewport on phones. A 32rem circle centred on a
 * 320px screen hangs 96px past each edge, and the section has no clip of its
 * own — only `body { overflow-x: hidden }` was hiding the resulting scroll.
 */
const bloomPosition: Record<string, string> = {
  top: "-top-28 left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 opacity-40 sm:-top-40 sm:h-[32rem] sm:w-[32rem]",
  center:
    "top-1/2 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 opacity-30 sm:h-[38rem] sm:w-[38rem]",
  bottom:
    "-bottom-28 left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 opacity-40 sm:-bottom-40 sm:h-[32rem] sm:w-[32rem]",
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  bloom = "none",
  full = false,
  density = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative isolate", densityPadding[density], className)}
    >
      {bloom !== "none" ? (
        <div className={cn("kooka-bloom", bloomPosition[bloom])} aria-hidden />
      ) : null}

      {full ? (
        children
      ) : (
        <div className={cn("kooka-container relative", containerClassName)}>
          {children}
        </div>
      )}
    </section>
  );
}
