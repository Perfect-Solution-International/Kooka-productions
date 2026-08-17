import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { ContactStrip } from "@/components/sections/shared/ContactStrip";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getShowreelItem, type ShowreelItem } from "@/data/showreel";
import { img, isRemoteImage, media } from "@/data/media";

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

  return (
    <>
      <PageHero
        size="compact"
        eyebrow="Kooka Showreel"
        title={item.title}
        subtitle={heroSubtitle(item)}
        image={remote ? item.image : media.stadiumNight}
      />

      <Section bloom="top" className="border-t border-white/[0.06]">
        <Reveal>
          <Link
            href="/showreel"
            className="group/back inline-flex min-h-11 items-center gap-2.5 font-display text-[0.6rem] font-semibold tracking-[0.24em] text-kooka-mist uppercase transition-colors duration-500 hover:text-kooka-amber lg:min-h-0"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-500 group-hover/back:-translate-x-1"
              aria-hidden
            />
            Back to Showreel
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal className="kooka-glow-border relative aspect-4/3 overflow-hidden rounded-3xl border border-white/[0.08] bg-kooka-carbon">
            <Image
              src={remote ? img(item.image, 1600, 82) : item.image}
              alt={item.title}
              fill
              priority
              unoptimized={!remote}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <RevealGroup stagger={0.08}>
            {fields.length > 0 ? (
              <RevealItem as="div">
                <dl className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                  {fields.map((field) => (
                    <div
                      key={field.term}
                      className="border-t border-white/[0.08] pt-4"
                    >
                      <dt className="kooka-eyebrow">{field.term}</dt>
                      <dd className="mt-2 text-sm text-kooka-white sm:text-base">
                        {field.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </RevealItem>
            ) : null}

            {item.blurb.trim().length > 0 ? (
              <RevealItem
                as="p"
                className="mt-8 border-t border-white/[0.08] pt-6 text-sm leading-relaxed text-justify text-kooka-mist [hyphens:auto] sm:text-base"
              >
                {item.blurb}
              </RevealItem>
            ) : null}

            {item.href ? (
              <RevealItem as="div">
                <Link
                  href={item.href}
                  className="group/link mt-8 inline-flex min-h-11 items-center gap-2.5 font-display text-[0.66rem] font-semibold tracking-[0.24em] text-kooka-amber uppercase transition-colors duration-500 hover:text-kooka-flare lg:min-h-0"
                >
                  Visit Project
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                    aria-hidden
                  />
                </Link>
              </RevealItem>
            ) : null}
          </RevealGroup>
        </div>
      </Section>

      <CtaSection
        eyebrow="Your Event"
        title="Want Something Like This?"
        description="Send the brief and we will tell you honestly what it takes to deliver it."
      />
      <ContactStrip />
    </>
  );
}

function heroSubtitle(item: ShowreelItem): string {
  const parts = [item.type, item.location, item.year].filter(
    (part) => part.trim().length > 0,
  );
  return parts.length > 0 ? parts.join(" · ") : "Kooka Productions";
}
