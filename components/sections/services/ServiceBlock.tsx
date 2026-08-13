import Image from "next/image";
import { Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { fadeLeft, fadeRight } from "@/lib/motion";
import { img } from "@/data/media";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceBlock({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const flipped = index % 2 === 1;

  return (
    <section
      id={service.slug}
      className="kooka-container scroll-mt-40 py-20 lg:py-28"
    >
      <div
        className={cn(
          "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
          flipped && "lg:[&>*:first-child]:order-2",
        )}
      >
        <Reveal variants={flipped ? fadeRight : fadeLeft}>
          <GlassCard className="p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-kooka-amber/40 bg-kooka-amber/10 text-kooka-amber shadow-[0_0_30px_-10px_var(--color-kooka-amber)]">
                <Icon name={service.icon} className="h-5 w-5" />
              </span>
              <span className="font-display text-xs tracking-[0.24em] text-kooka-muted uppercase">
                {String(index + 1).padStart(2, "0")} / {service.short}
              </span>
            </div>

            <h2 className="kooka-display mt-8 text-4xl sm:text-5xl">
              {service.title}
            </h2>
            <p className="mt-4 font-display text-sm tracking-[0.16em] text-kooka-amber uppercase">
              {service.tagline}
            </p>
            <p className="mt-6 text-base leading-relaxed text-kooka-mist">
              {service.description}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-3 text-sm leading-snug text-kooka-mist"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-kooka-amber"
                    aria-hidden
                  />
                  {capability}
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
              {service.specs.map((spec) => (
                <div key={spec.label} className="bg-kooka-carbon p-4">
                  <dt className="font-display text-[0.6rem] tracking-[0.22em] text-kooka-muted uppercase">
                    {spec.label}
                  </dt>
                  <dd className="mt-2 text-sm text-kooka-white">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </GlassCard>
        </Reveal>

        <Reveal variants={flipped ? fadeLeft : fadeRight}>
          <div className="group relative aspect-4/5 overflow-hidden rounded-3xl border border-white/[0.07] sm:aspect-4/3 lg:aspect-3/4">
            <Image
              src={img(service.image, 1200, 80)}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="kooka-scrim absolute inset-0 opacity-80" />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-tr from-kooka-amber/12 via-transparent to-transparent"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
