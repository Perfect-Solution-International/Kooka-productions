import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  readonly children: ReactNode;
  readonly className?: string;
  /** Adds the amber edge light that lifts on hover. */
  readonly glow?: boolean;
  readonly as?: "div" | "article" | "li";
};

export function GlassCard({
  children,
  className,
  glow = true,
  as: Component = "div",
}: GlassCardProps) {
  return (
    <Component
      className={cn(
        "kooka-glass relative overflow-hidden rounded-2xl transition-colors duration-500",
        glow && "kooka-glow-border hover:border-white/10",
        className,
      )}
    >
      {children}
    </Component>
  );
}
