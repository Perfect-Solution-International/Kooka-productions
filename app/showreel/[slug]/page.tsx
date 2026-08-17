import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getShowreelBySlug,
  listShowreel,
  type ShowreelItem,
} from "@/services/showreel.service";
import { img, isRemoteImage } from "@/data/media";
import { site } from "@/data/site";

type ShowreelDetailProps = {
  readonly params: Promise<{ slug: string }>;
};

/*
 * The slug set changes whenever the admin adds a project, so the known slugs
 * are pre-rendered and anything newer is rendered on first request.
 */
export async function generateStaticParams() {
  const items = await listShowreel();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ShowreelDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getShowreelBySlug(slug);
  if (!item) return { title: "Project Not Found" };

  const imageUrl = item.image.startsWith("http")
    ? item.image
    : new URL(item.image, "https://www.kookaproductions.com.au").href;

  return {
    title: item.title,
    description: item.blurb,
    alternates: { canonical: `/showreel/${item.slug}` },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.blurb,
      url: `/showreel/${item.slug}`,
      images: [{ url: imageUrl, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.blurb,
      images: [imageUrl],
    },
  };
}

export default async function ShowreelDetailPage({
  params,
}: ShowreelDetailProps) {
  const { slug } = await params;
  const item = await getShowreelBySlug(slug);
  if (!item) notFound();

  const remote = isRemoteImage(item.image);
  const gallery = item.gallery.filter((image) => image.url.trim().length > 0);
  const fields = [
    { term: "Type", value: item.type },
    { term: "Location", value: item.location },
    { term: "Year", value: item.year },
  ].filter((field) => field.value.trim().length > 0);
  const projectUrl = `${site.url}/showreel/${item.slug}`;
  /* Gallery rows carry their path on `url`, the hero image is a bare string. */
  const projectImages = [item.image, ...gallery.map((image) => image.url)].map(
    (source) => new URL(source, site.url).href,
  );

  /*
   * Pinned to a single viewport — the site header and footer are suppressed for
   * this route and the document never scrolls. Only the blurb scrolls inside
   * itself, so long copy stays reachable without the page growing past the fold.
   */
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              "@id": `${projectUrl}/#project`,
              name: item.title,
              description: item.blurb,
              url: projectUrl,
              image: projectImages,
              dateCreated: item.year,
              locationCreated: item.location,
              creator: { "@id": `${site.url}/#organization` },
              genre: item.type,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Showreel",
                  item: `${site.url}/showreel`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: item.title,
                  item: projectUrl,
                },
              ],
            },
          ],
        }}
      />
      <article className="flex h-[100svh] flex-col overflow-hidden px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 lg:px-12 lg:py-8">
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
        <div className="flex min-h-0 flex-col gap-3">
          <div className="kooka-glow-border relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/[0.08] bg-kooka-carbon">
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

          {/*
            Gallery is a fixed-height rail so the page stays inside one viewport:
            extra shots scroll sideways instead of pushing the layout taller.
          */}
          {gallery.length > 0 ? (
            <ul className="flex shrink-0 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-contain pb-1">
              {gallery.map((image, index) => {
                const remoteShot = isRemoteImage(image.url);
                return (
                  <li
                    key={image.id}
                    className="relative h-20 w-32 shrink-0 snap-start overflow-hidden rounded-xl border border-white/[0.08] bg-kooka-carbon sm:h-24 sm:w-40"
                  >
                    <Image
                      src={remoteShot ? img(image.url, 640, 72) : image.url}
                      alt={image.alt ?? `${item.title} — gallery image ${index + 1}`}
                      fill
                      unoptimized={!remoteShot}
                      sizes="160px"
                      className="object-cover"
                    />
                  </li>
                );
              })}
            </ul>
          ) : null}
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
      </article>
    </>
  );
}

function metaLine(item: ShowreelItem): string {
  const parts = [item.type, item.location, item.year].filter(
    (part) => part.trim().length > 0,
  );
  return parts.length > 0 ? parts.join(" · ") : "Kooka Productions";
}
