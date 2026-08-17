import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CursorParallax } from "@/components/effects/CursorParallax";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { RevealItem } from "@/components/ui/Reveal";
import { img } from "@/data/media";
import type { Service } from "@/data/services";

type ServiceBlockProps = {
  readonly service: Service;
  readonly index: number;
};

export function ServiceBlock({ service, index }: ServiceBlockProps) {
  return (
    <RevealItem as="li" className="h-full">
      <CursorParallax className="rounded-2xl">
        <GlassCard
          as="article"
          id={service.slug}
          className="group flex h-full scroll-mt-32 flex-col transition-shadow duration-500 hover:shadow-[0_36px_90px_-46px_rgb(255_176_32/0.42)]"
        >
          <div className="relative aspect-16/10 overflow-hidden">
            <Image
              src={img(service.image, 800, 78)}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-kooka-carbon via-kooka-carbon/25 to-transparent"
            />
            <span className="absolute top-4 right-5 font-display text-xs tracking-[0.24em] text-kooka-white/50 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="absolute bottom-4 left-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-kooka-amber/40 bg-kooka-black/60 text-kooka-amber backdrop-blur-md transition-colors duration-500 group-hover:bg-kooka-amber group-hover:text-kooka-black">
              <Icon name={service.icon} className="h-5 w-5" />
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <h2 className="kooka-display text-xl leading-tight sm:text-2xl">
              {service.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-kooka-mist">
              {service.description}
            </p>
            <Link
              href={`/solutions/${service.slug}`}
              className="mt-6 inline-flex items-center gap-2 self-start font-display text-xs font-semibold tracking-[0.16em] text-kooka-amber uppercase transition-colors hover:text-kooka-flare"
            >
              Explore Service
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </GlassCard>
      </CursorParallax>
    </RevealItem>
  );
}
