import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShowreelMedia } from "@/components/sections/showreel/ShowreelMedia";
import {
  getShowreelBySlug,
  listShowreel,
  type ShowreelItem,
} from "@/services/showreel.service";
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
   * Desktop is pinned to a single viewport — the site header and footer are
   * suppressed for this route, the document never scrolls, and only the blurb
   * scrolls inside itself so long copy stays reachable above the fold.
   *
   * Phones and tablets cannot carry that: hero, rail and copy stacked into one
   * viewport leave every band too short to read. Below `lg` the article grows
   * with its content and the page scrolls normally instead.
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
      <article className="flex min-h-[100svh] flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 lg:h-[100svh] lg:overflow-hidden lg:px-12 lg:py-8">
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

      <div className="mt-3 grid flex-1 gap-6 sm:mt-4 lg:min-h-0 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <ShowreelMedia
          title={item.title}
          cover={item.image}
          gallery={gallery}
        />

        <div className="flex flex-col lg:min-h-0">
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
            <p className="mt-5 border-t border-white/[0.08] pt-4 text-sm leading-relaxed text-justify text-kooka-mist [hyphens:auto] lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain">
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
