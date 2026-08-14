import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { fadeLeft, fadeRight } from "@/lib/motion";
import { img } from "@/data/media";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

type ServiceBlockProps = {
  readonly service: Service;
  readonly index: number;
};

export function ServiceBlock({ service, index }: ServiceBlockProps) {
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
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h2 className="kooka-display mt-8 text-4xl sm:text-5xl">
              {service.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-kooka-mist">
              {service.description}
            </p>
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
