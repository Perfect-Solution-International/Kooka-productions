"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Eye, X } from "lucide-react";
import type { ShowreelItem } from "@/data/showreel";
import { img, isRemoteImage } from "@/data/media";
import { EASE_KOOKA } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ShowreelDetailDialogProps = {
  readonly item: ShowreelItem;
  readonly index: number;
  readonly total: string;
};

const pad = (position: number) => String(position + 1).padStart(2, "0");

/*
 * The grid is a Server Component reading the CMS store, so the trigger and the
 * overlay live here instead — the portal also lifts the overlay out of the
 * card's `overflow-hidden` clip and stacking context.
 */
export function ShowreelDetailDialog({
  item,
  index,
  total,
}: ShowreelDetailDialogProps) {
  const [open, setOpen] = useState(false);
  /*
   * Kept mounted through the exit animation — dropping the portal the instant
   * `open` flips would cut `AnimatePresence` off before it can run the exit.
   */
  const [portalMounted, setPortalMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const reduced = useReducedMotion();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    }

    /*
     * Locking the scroll position on `body` rather than `overflow: hidden` alone
     * keeps the page from jumping when the scrollbar disappears.
     */
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open, close]);

  const meta = [item.type, item.location, item.year].filter(
    (part) => part.trim().length > 0,
  );
  const remote = isRemoteImage(item.image);
  const duration = reduced ? 0.18 : 0.5;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setPortalMounted(true);
          setOpen(true);
        }}
        aria-haspopup="dialog"
        className="group/view absolute right-4 bottom-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-kooka-black/55 text-kooka-white backdrop-blur-md transition-colors duration-500 hover:border-kooka-amber hover:bg-kooka-amber hover:text-kooka-black sm:right-6 sm:bottom-6 lg:right-8 lg:bottom-8"
      >
        <Eye className="h-4 w-4" aria-hidden />
        <span className="sr-only">View details: {item.title}</span>
      </button>

      {portalMounted
        ? createPortal(
            <AnimatePresence onExitComplete={() => setPortalMounted(false)}>
              {open ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration, ease: EASE_KOOKA }}
                  className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto overscroll-contain bg-kooka-void/85 p-0 backdrop-blur-lg sm:items-center sm:p-6"
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={close}
                    className="absolute inset-0 h-full w-full cursor-default"
                  />

                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration, ease: EASE_KOOKA }}
                    className="relative my-auto w-full max-w-3xl overflow-hidden rounded-t-3xl border border-white/[0.08] bg-kooka-carbon shadow-[0_60px_140px_-60px_rgb(0_0_0/0.9)] sm:rounded-3xl"
                  >
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={close}
                      className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-kooka-black/60 text-kooka-white backdrop-blur-md transition-colors duration-500 hover:border-kooka-amber hover:bg-kooka-amber hover:text-kooka-black"
                    >
                      <X className="h-4 w-4" aria-hidden />
                      <span className="sr-only">Close</span>
                    </button>

                    <div className="relative aspect-4/3 w-full sm:aspect-16/9">
                      <Image
                        src={remote ? img(item.image, 1600, 80) : item.image}
                        alt={item.title}
                        fill
                        unoptimized={!remote}
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="object-cover"
                      />
                      <div aria-hidden className="kooka-scrim absolute inset-0" />
                    </div>

                    <div className="p-6 sm:p-8 lg:p-10">
                      <p className="font-display text-[0.6rem] font-semibold tracking-[0.28em] tabular-nums">
                        <span className="text-kooka-amber">{pad(index)}</span>
                        <span className="mx-1.5 text-kooka-muted">/</span>
                        <span className="text-kooka-muted">{total}</span>
                      </p>

                      <h2
                        id={titleId}
                        className="kooka-display mt-3 text-2xl sm:text-3xl lg:text-4xl"
                      >
                        {item.title}
                      </h2>

                      {meta.length > 0 ? (
                        <dl className="mt-6 grid gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
                          {[
                            { term: "Type", value: item.type },
                            { term: "Location", value: item.location },
                            { term: "Year", value: item.year },
                          ]
                            .filter((field) => field.value.trim().length > 0)
                            .map((field) => (
                              <div key={field.term}>
                                <dt className="kooka-eyebrow">{field.term}</dt>
                                <dd className="mt-2 text-sm text-kooka-white">
                                  {field.value}
                                </dd>
                              </div>
                            ))}
                        </dl>
                      ) : null}

                      {item.blurb.trim().length > 0 ? (
                        <p className="mt-6 border-t border-white/[0.08] pt-6 text-sm leading-relaxed text-kooka-mist sm:text-base">
                          {item.blurb}
                        </p>
                      ) : null}

                      {item.href ? (
                        <Link
                          href={item.href}
                          className="group/link mt-8 inline-flex min-h-11 items-center gap-2.5 font-display text-[0.66rem] font-semibold tracking-[0.24em] text-kooka-amber uppercase transition-colors duration-500 hover:text-kooka-flare"
                        >
                          View Project
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                            aria-hidden
                          />
                        </Link>
                      ) : null}
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
