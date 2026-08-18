import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShowreelMedia } from "@/components/sections/showreel/ShowreelMedia";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import {
  getShowreelBySlug,
  listShowreel,
  type ShowreelItem,
} from "@/services/showreel.service";
import { site } from "@/data/site";
import { img, isRemoteImage } from "@/data/media";

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
  const projects = await listShowreel();
  const projectIndex = projects.findIndex((project) => project.id === item.id);
  const previous = projects.length > 1
    ? projects[(projectIndex - 1 + projects.length) % projects.length]
    : null;
  const next = projects.length > 1
    ? projects[(projectIndex + 1) % projects.length]
    : null;

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
      <article>
        <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden pt-28 sm:min-h-[92svh]">
          {item.video ? (
            <video
              src={item.video}
              poster={isRemoteImage(item.image) ? img(item.image, 2200, 82) : item.image}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            >
              Your browser does not support embedded video.
            </video>
          ) : (
            <Image
              src={isRemoteImage(item.image) ? img(item.image, 2200, 82) : item.image}
              alt={item.title}
              fill
              priority
              unoptimized={!isRemoteImage(item.image)}
              sizes="100vw"
              className="-z-20 object-cover"
            />
          )}
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-kooka-black via-kooka-black/30 to-kooka-black/20" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-kooka-black/55 via-transparent to-transparent" />

          <div className="kooka-container w-full pb-12 sm:pb-16 lg:pb-20">
            <Link
              href="/showreel"
              className="group/back inline-flex min-h-11 items-center gap-2.5 font-display text-[0.62rem] font-semibold tracking-[0.24em] text-kooka-white/75 uppercase transition-colors duration-500 hover:text-kooka-amber"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover/back:-translate-x-1" aria-hidden />
              All Projects
            </Link>
            <p className="kooka-eyebrow mt-8">Kooka Showreel</p>
            <h1 className="mt-4 max-w-5xl font-display text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-kooka-white">
              {item.title}
            </h1>
            <p className="mt-6 font-display text-[0.65rem] tracking-[0.24em] text-kooka-white/70 uppercase sm:text-xs">
              {metaLine(item)}
            </p>
          </div>
        </section>

        <section className="kooka-container py-16 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 xl:gap-28">
            <aside className="self-start lg:sticky lg:top-28">
              <p className="kooka-eyebrow">Project Profile</p>
              {fields.length > 0 ? (
                <dl className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  {fields.map((field) => (
                    <div key={field.term} className="flex items-baseline justify-between gap-6 py-5">
                      <dt className="font-display text-[0.6rem] tracking-[0.22em] text-kooka-muted uppercase">{field.term}</dt>
                      <dd className="text-right text-sm text-kooka-white">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  className="group/link mt-7 inline-flex min-h-11 items-center gap-2.5 font-display text-[0.65rem] font-semibold tracking-[0.22em] text-kooka-amber uppercase transition-colors hover:text-kooka-flare"
                >
                  Visit Project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" aria-hidden />
                </Link>
              ) : null}
            </aside>

            <div>
              <p className="kooka-eyebrow">The Experience</p>
              <p className="mt-6 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.75rem)] leading-[1.25] tracking-[-0.025em] text-kooka-white">
                {item.blurb}
              </p>
            </div>
          </div>

          <div className="mt-16 sm:mt-24 lg:mt-32">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="kooka-eyebrow">In Focus</p>
                <h2 className="mt-3 font-display text-3xl text-kooka-white sm:text-4xl">Project Gallery</h2>
              </div>
              <span className="hidden font-display text-[0.6rem] tracking-[0.22em] text-kooka-muted uppercase sm:block">
                {String(gallery.length || 1).padStart(2, "0")} Frames
              </span>
            </div>
            <ShowreelMedia title={item.title} cover={item.image} gallery={gallery} />
          </div>
        </section>

        {previous && next ? (
          <nav aria-label="More showreel projects" className="border-y border-white/[0.07]">
            <div className="grid sm:grid-cols-2">
              <ProjectLink project={previous} direction="previous" />
              <ProjectLink project={next} direction="next" />
            </div>
          </nav>
        ) : null}
      </article>
      <CtaSection
        eyebrow="Create Something Remarkable"
        title="Planning an Event Like This?"
        description="Bring us the ambition. Kooka will shape the production, technology and live experience around it."
      />
    </>
  );
}

function ProjectLink({
  project,
  direction,
}: {
  readonly project: ShowreelItem;
  readonly direction: "previous" | "next";
}) {
  const previous = direction === "previous";
  return (
    <Link
      href={`/showreel/${project.slug}`}
      className={`group relative isolate flex min-h-72 items-end overflow-hidden p-7 sm:min-h-96 sm:p-10 lg:p-14 ${previous ? "sm:border-r sm:border-white/[0.07]" : "border-t border-white/[0.07] sm:border-t-0"}`}
    >
      <Image
        src={isRemoteImage(project.image) ? img(project.image, 1200, 78) : project.image}
        alt=""
        fill
        unoptimized={!isRemoteImage(project.image)}
        sizes="(min-width: 640px) 50vw, 100vw"
        className="-z-20 object-cover transition-transform duration-[1400ms] ease-kooka group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-kooka-black via-kooka-black/45 to-kooka-black/10 transition-colors duration-700 group-hover:bg-kooka-black/35" />
      <div className={previous ? "text-left" : "ml-auto text-right"}>
        <span className="inline-flex items-center gap-2 font-display text-[0.6rem] tracking-[0.22em] text-kooka-amber uppercase">
          {previous ? <ArrowLeft className="h-4 w-4" aria-hidden /> : null}
          {previous ? "Previous Project" : "Next Project"}
          {!previous ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
        </span>
        <span className="mt-3 block max-w-lg font-display text-2xl leading-tight text-kooka-white sm:text-3xl">
          {project.title}
        </span>
      </div>
    </Link>
  );
}

function metaLine(item: ShowreelItem): string {
  const parts = [item.type, item.location, item.year].filter(
    (part) => part.trim().length > 0,
  );
  return parts.length > 0 ? parts.join(" · ") : "Kooka Productions";
}
