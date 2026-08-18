"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShowreelGalleryImage } from "@/services/showreel.service";
import { img, isRemoteImage } from "@/data/media";

type ShowreelMediaProps = {
  readonly title: string;
  readonly cover: string;
  readonly gallery: readonly ShowreelGalleryImage[];
};

/**
 * Hero frame plus its thumbnail rail.
 *
 * Picking a thumbnail previews that shot in the hero frame; picking the same
 * one again returns to the cover. The choice is deliberately transient — it
 * lives in component state only, so a reload or a trip to another project
 * starts back on the cover.
 */
export function ShowreelMedia({ title, cover, gallery }: ShowreelMediaProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = gallery.find((image) => image.id === activeId) ?? null;
  const heroSource = active?.url ?? cover;
  const heroAlt = active?.alt ?? title;
  const heroRemote = isRemoteImage(heroSource);

  return (
    <div className="flex flex-col gap-3 lg:min-h-0">
      {/*
        Below `lg` the page scrolls, so the hero takes a fixed ratio rather
        than a share of the viewport. Only the pinned desktop layout hands it
        the leftover column height above the rail.
      */}
      <div className="kooka-glow-border relative aspect-4/3 shrink-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-kooka-carbon sm:aspect-16/10 lg:aspect-auto lg:min-h-0 lg:flex-1">
        <Image
          key={heroSource}
          src={heroRemote ? img(heroSource, 1600, 82) : heroSource}
          alt={heroAlt}
          fill
          priority
          unoptimized={!heroRemote}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>

      {/*
        Phones run the gallery as a swipe carousel showing two shots per screen
        (the `gap-2` is subtracted so the pair fits exactly) with the extras
        snapping sideways. From `sm` up the row is wide enough to share — every
        shot takes an equal slice, capped at the thumbnail size.
      */}
      {gallery.length > 0 ? (
        <ul className="flex shrink-0 snap-x snap-mandatory gap-2 overflow-x-auto overscroll-contain pb-1 sm:snap-none sm:gap-3 sm:overflow-visible sm:pb-0">
          {gallery.map((image, index) => {
            const remoteShot = isRemoteImage(image.url);
            const selected = image.id === activeId;
            return (
              <li
                key={image.id}
                className="relative aspect-[16/10] w-[calc((100%-0.5rem)/2)] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-40 sm:flex-1 sm:basis-0"
              >
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(selected ? null : image.id)}
                  className={`group/shot relative block h-full w-full cursor-pointer overflow-hidden rounded-xl border bg-kooka-carbon transition-colors duration-500 ${
                    selected
                      ? "border-kooka-amber"
                      : "border-white/[0.08] hover:border-white/25"
                  }`}
                >
                  <Image
                    src={remoteShot ? img(image.url, 320, 72) : image.url}
                    alt={image.alt ?? `${title} — gallery image ${index + 1}`}
                    fill
                    unoptimized={!remoteShot}
                    sizes="(min-width: 640px) 160px, 50vw"
                    className="object-cover transition-transform duration-700 group-hover/shot:scale-[1.04]"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
