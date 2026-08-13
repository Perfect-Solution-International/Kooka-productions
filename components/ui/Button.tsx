import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-display font-semibold uppercase tracking-[0.14em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-kooka-amber text-kooka-black shadow-[0_0_0_0_var(--color-kooka-amber-soft)] hover:bg-kooka-flare hover:shadow-[0_0_38px_-4px_var(--color-kooka-amber)]",
  secondary:
    "border border-white/15 bg-white/[0.03] text-kooka-white backdrop-blur-md hover:border-kooka-amber/60 hover:bg-kooka-amber/10 hover:text-kooka-flare",
  ghost:
    "text-kooka-mist hover:text-kooka-amber underline-offset-8 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.68rem]",
  md: "h-12 px-7 text-[0.72rem]",
  lg: "h-14 px-9 text-[0.78rem]",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Sheen that sweeps across the button on hover. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:left-[140%] group-hover:opacity-100"
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className"> & {
    href: string;
  }) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (external) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        <Sheen />
        <span className="relative z-10 inline-flex items-center gap-2.5">
          {children}
        </span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Sheen />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: SharedProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Sheen />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </button>
  );
}
