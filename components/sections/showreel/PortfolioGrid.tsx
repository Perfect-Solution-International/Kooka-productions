"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Play } from "lucide-react";
import { useMemo, useState } from "react";
import {
  showreelCategories,
  showreelItems,
  type ShowreelCategory,
} from "@/data/showreel";
import { img } from "@/data/media";
import { EASE_KOOKA } from "@/lib/motion";
import { cn } from "@/lib/utils";

const aspectClasses: Record<string, string> = {
  portrait: "aspect-3/4",
  landscape: "aspect-16/10",
  square: "aspect-square",
};

export function PortfolioGrid() {
  const [active, setActive] = useState<ShowreelCategory>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? showreelItems
        : showreelItems.filter((item) => item.category === active),
    [active],
  );

  return (
    <div id="portfolio" className="scroll-mt-32">
      {/* Filter pills */}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {showreelCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={cn(
              "relative shrink-0 rounded-full border px-5 py-2.5 font-display text-[0.66rem] tracking-[0.18em] uppercase transition-colors duration-500",
              active === category
                ? "border-kooka-amber/60 text-kooka-amber"
                : "border-white/10 bg-white/[0.03] text-kooka-mist hover:border-white/25 hover:text-kooka-white",
            )}
          >
            {active === category ? (
              <motion.span
                layoutId="filter-pill"
                transition={{ duration: 0.5, ease: EASE_KOOKA }}
                className="absolute inset-0 -z-10 rounded-full bg-kooka-amber/12 shadow-[0_0_30px_-12px_var(--color-kooka-amber)]"
              />
            ) : null}
            {category}
          </button>
        ))}
      </div>

      {/* Masonry-ish filtered grid */}
      <motion.div
        layout
        transition={{ duration: 0.6, ease: EASE_KOOKA }}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: EASE_KOOKA }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-kooka-carbon",
                aspectClasses[item.aspect],
              )}
            >
              <Image
                src={img(item.image, 1000, 78)}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
              />
              <div className="kooka-scrim absolute inset-0 opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-kooka-black/60 px-3 py-1 font-display text-[0.58rem] tracking-[0.2em] text-kooka-mist uppercase backdrop-blur-md">
                {item.format === "video" ? (
                  <Play className="h-3 w-3 fill-current text-kooka-amber" aria-hidden />
                ) : (
                  <ImageIcon className="h-3 w-3 text-kooka-amber" aria-hidden />
                )}
                {item.format === "video" ? (item.duration ?? "Video") : "Stills"}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-[0.6rem] tracking-[0.22em] text-kooka-amber uppercase">
                  {item.category}
                </p>
                <h3 className="kooka-display mt-2 text-2xl">{item.title}</h3>
                <p className="mt-2 text-xs text-kooka-mist opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {item.meta}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="mt-14 text-center text-sm text-kooka-muted">
          Nothing archived under that filter yet.
        </p>
      ) : null}
    </div>
  );
}
