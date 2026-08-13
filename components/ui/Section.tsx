import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Renders a warm ambient bloom behind the section content. */
  bloom?: "none" | "top" | "center" | "bottom";
  full?: boolean;
};

const bloomPosition: Record<string, string> = {
  top: "-top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 opacity-40",
  center: "top-1/2 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 opacity-30",
  bottom: "-bottom-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 opacity-40",
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  bloom = "none",
  full = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative isolate py-24 sm:py-28 lg:py-36", className)}
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
