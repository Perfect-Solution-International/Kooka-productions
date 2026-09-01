import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { footprintCategories } from "@/data/footprint";
import {
  footprintContentBySlug,
  resolveFootprintSlug,
} from "@/data/footprint-content";
import { img, isRemoteImage } from "@/data/media";
import { site } from "@/data/site";

type FootprintPageProps = {
  readonly params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return footprintCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: FootprintPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = resolveFootprintSlug(slug);
  const category = footprintCategories.find((item) => item.slug === resolvedSlug);
  if (!category) return { title: "Footprint Not Found" };

  const content = footprintContentBySlug(resolvedSlug);
  const title = content?.seoTitle ?? `${category.title} Production`;
  const description =
    content?.metaDescription ?? `${category.description.slice(0, 152).trimEnd()}...`;

  return {
    title,
    description,
    alternates: { canonical: `/footprint/${category.slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ${site.name}`,
      description,
      url: `/footprint/${category.slug}`,
      images: [
        {
          url: isRemoteImage(category.image) ? img(category.image, 1200, 75) : category.image,
          width: 1200,
          height: 630,
          alt: `${category.title} by Kooka Productions`,
        },
      ],
    },
  };
}

export default async function FootprintDetailPage({
  params,
}: FootprintPageProps) {
  const { slug } = await params;
  const resolvedSlug = resolveFootprintSlug(slug);
  const category = footprintCategories.find((item) => item.slug === resolvedSlug);
  if (!category) notFound();

  const content = footprintContentBySlug(category.slug);
  if (!content) notFound();

  const related = footprintCategories
    .filter((candidate) => candidate.slug !== category.slug)
    .slice(0, 3);
  const pageUrl = `${site.url}/footprint/${category.slug}`;
  const deliverables = content.sections.flatMap((section) => section.points).slice(0, 6);
  const idealFor = [
    category.title,
    ...content.sections.map((section) => section.heading),
    ...deliverables.slice(0, 2).map((item) => item.title),
  ];

  const resolveLinkHref = (linkSlug: string): string => {
    const footprintSlug = resolveFootprintSlug(linkSlug);
    if (footprintCategories.some((item) => item.slug === footprintSlug)) {
      return `/footprint/${footprintSlug}`;
    }

    return `/solutions/${linkSlug}`;
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${pageUrl}/#service`,
              name: category.title,
              description: content.featuredSnippet,
              url: pageUrl,
              image: new URL(
                isRemoteImage(category.image) ? img(category.image, 1200, 75) : category.image,
                site.url,
              ).href,
              provider: { "@id": `${site.url}/#organization` },
              areaServed: { "@type": "Country", name: "Australia" },
              serviceType: category.title,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: site.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Footprint",
                  item: `${site.url}/footprint`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: category.title,
                  item: pageUrl,
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: content.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ],
        }}
      />

      <PageHero
        eyebrow="Kooka Footprint"
        title={category.title}
        subtitle={content.articleHeading}
        description={content.articleIntro}
        image={category.image}
      >
        <ButtonLink href="/contact" size="lg">
          Discuss Your Event
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </PageHero>

      <Section bloom="top">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What We Deliver"
              title={`Complete ${category.title} Production`}
              description="Every event environment is planned around audience flow, venue conditions, presentation content and technical risk, then delivered by an experienced production team."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <li key={item.title} className="flex items-center gap-3 text-kooka-white">
                  <Check className="h-4 w-4 shrink-0 text-kooka-amber" aria-hidden="true" />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <GlassCard className="p-7 sm:p-9">
            <p className="kooka-eyebrow">Ideal For</p>
            <h2 className="kooka-display mt-4 text-2xl sm:text-3xl">
              Built Around Your Event
            </h2>
            <ul className="mt-7 space-y-4">
              {idealFor.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-white/[0.07] pb-4 text-kooka-mist last:border-0">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-kooka-amber" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </Section>

      <Section className="border-t border-white/[0.06]">
        <SectionHeading
          eyebrow="In Depth"
          title={content.articleHeading}
          description={content.articleIntro}
        />
        <div className="mt-10 grid gap-8">
          {content.sections.map((articleSection) => (
            <GlassCard key={articleSection.heading} className="p-7 sm:p-9">
              <h3 className="kooka-display text-xl sm:text-2xl">{articleSection.heading}</h3>
              <p className="mt-4 text-sm leading-relaxed text-kooka-mist sm:text-base">
                {articleSection.body}
              </p>
              {articleSection.points.length > 0 ? (
                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {articleSection.points.map((point) => (
                    <li key={point.title} className="border-t border-white/[0.07] pt-4">
                      <p className="font-display font-semibold text-kooka-white">{point.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-kooka-mist">
                        {point.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </GlassCard>
          ))}
        </div>

        <GlassCard glow={false} className="mt-8 border-kooka-amber/30 bg-kooka-amber/[0.05] p-7 sm:p-9">
          <p className="kooka-eyebrow">At a Glance</p>
          <p className="mt-4 text-base leading-relaxed text-kooka-white sm:text-lg">
            {content.featuredSnippet}
          </p>
        </GlassCard>
      </Section>

      <Section className="border-t border-white/[0.06]" density="tight">
        <SectionHeading eyebrow="FAQs" title="Common Questions" />
        <div className="mt-10 grid gap-4">
          {content.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 open:border-kooka-amber/40"
            >
              <summary className="cursor-pointer list-none font-display font-semibold text-kooka-white marker:content-none">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-kooka-mist sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/[0.06]" density="tight">
        <SectionHeading eyebrow="Related Reading" title="Explore Related Services" />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {content.internalLinks.map((link) => (
            <li key={link.slug}>
              <Link
                href={resolveLinkHref(link.slug)}
                className="group flex min-h-28 items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:border-kooka-amber/40 hover:bg-kooka-amber/[0.06]"
              >
                <span className="font-display font-semibold tracking-wide uppercase">{link.label}</span>
                <ArrowRight className="h-4 w-4 text-kooka-amber transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-white/[0.06]" density="tight">
        <SectionHeading eyebrow="Explore More" title="Related Footprint" />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/footprint/${item.slug}`}
                className="group flex min-h-28 items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:border-kooka-amber/40 hover:bg-kooka-amber/[0.06]"
              >
                <span className="font-display font-semibold tracking-wide uppercase">{item.title}</span>
                <ArrowRight className="h-4 w-4 text-kooka-amber transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection
        eyebrow="Plan Your Production"
        title={`Need ${category.title}?`}
        description="Send us your date, venue and brief. Our Melbourne team will recommend the right production approach for your event."
      />
    </>
  );
}
