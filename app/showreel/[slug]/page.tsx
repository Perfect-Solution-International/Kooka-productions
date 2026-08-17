import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getShowreelItem, type ShowreelItem } from "@/data/showreel";
import { img, isRemoteImage } from "@/data/media";

type ShowreelDetailProps = {
  readonly params: Promise<{ slug: string }>;
};

/*
 * Tiles are edited from the admin panel, so the slug set changes between
 * builds — the page reads the store per request instead of pre-rendering.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ShowreelDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getShowreelItem(slug);
  if (!item) return { title: "Project Not Found" };

  return {
    title: item.title,
    description: item.blurb,
    alternates: { canonical: `/showreel/${item.slug}` },
  };
}

export default async function ShowreelDetailPage({
  params,
}: ShowreelDetailProps) {
  const { slug } = await params;
  const item = getShowreelItem(slug);
  if (!item) notFound();

  const remote = isRemoteImage(item.image);
  const fields = [
    { term: "Type", value: item.type },
    { term: "Location", value: item.location },
    { term: "Year", value: item.year },
  ].filter((field) => field.value.trim().length > 0);

  /*
   * Pinned to a single viewport — the site header and footer are suppressed for
   * this route and the document never scrolls. Only the blurb scrolls inside
   * itself, so long copy stays reachable without the page growing past the fold.
   */
  return (
    <div className="flex h-[100svh] flex-col overflow-hidden px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 lg:px-12 lg:py-8">
      <Link
        href="/showreel"
        className="group/back inline-flex min-h-11 shrink-0 items-center gap-2.5 self-start font-display text-[0.6rem] font-semibold tracking-[0.24em] text-kooka-mist uppercase transition-colors duration-500 hover:text-kooka-amber"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-500 group-hover/back:-translate-x-1"
          aria-hidden
        />
        Back to Showreel
      </Link>

      <div className="mt-3 grid min-h-0 flex-1 gap-5 sm:mt-4 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div className="kooka-glow-border relative min-h-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-kooka-carbon">
          <Image
            src={remote ? img(item.image, 1600, 82) : item.image}
            alt={item.title}
            fill
            priority
            unoptimized={!remote}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex min-h-0 flex-col">
          <p className="kooka-eyebrow shrink-0">Kooka Showreel</p>
          <h1 className="mt-2 shrink-0 font-display text-2xl leading-tight font-semibold text-kooka-white sm:text-3xl lg:text-4xl">
            {item.title}
          </h1>
          <p className="mt-2 shrink-0 text-xs tracking-[0.14em] text-kooka-mist uppercase">
            {metaLine(item)}
          </p>

          {fields.length > 0 ? (
            <dl className="mt-5 grid shrink-0 gap-4 sm:grid-cols-3">
              {fields.map((field) => (
                <div
                  key={field.term}
                  className="border-t border-white/[0.08] pt-3"
                >
                  <dt className="kooka-eyebrow">{field.term}</dt>
                  <dd className="mt-1.5 text-sm text-kooka-white">
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {item.blurb.trim().length > 0 ? (
            <p className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-white/[0.08] pt-4 text-sm leading-relaxed text-justify text-kooka-mist [hyphens:auto]">
              {item.blurb}
            </p>
          ) : null}

          {item.href ? (
            <Link
              href={item.href}
              className="group/link mt-4 inline-flex min-h-11 shrink-0 items-center gap-2.5 self-start font-display text-[0.62rem] font-semibold tracking-[0.24em] text-kooka-amber uppercase transition-colors duration-500 hover:text-kooka-flare"
            >
              Visit Project
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                aria-hidden
              />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function metaLine(item: ShowreelItem): string {
  const parts = [item.type, item.location, item.year].filter(
    (part) => part.trim().length > 0,
  );
  return parts.length > 0 ? parts.join(" · ") : "Kooka Productions";
}
