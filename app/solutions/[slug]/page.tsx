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
import { img, isRemoteImage } from "@/data/media";
import { listHomeSolutions } from "@/services/home-solution.service";
import { site } from "@/data/site";

type ServicePageProps = {
  readonly params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await listHomeSolutions();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = (await listHomeSolutions()).find((item) => item.slug === slug);
  if (!service) return { title: "Service Not Found" };

  const title = `${service.title} Melbourne`;
  const description = `${service.description.slice(0, 152).trimEnd()}…`;

  return {
    title,
    description,
    alternates: { canonical: `/solutions/${service.slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ${site.name}`,
      description,
      url: `/solutions/${service.slug}`,
      images: [
        {
          url: isRemoteImage(service.image) ? img(service.image, 1200, 75) : service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} by Kooka Productions`,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const services = await listHomeSolutions();
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const related = services
    .filter((candidate) => candidate.slug !== service.slug)
    .slice(0, 3);
  const pageUrl = `${site.url}/solutions/${service.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${pageUrl}/#service`,
              name: service.title,
              description: service.description,
              url: pageUrl,
              image: new URL(
                isRemoteImage(service.image) ? img(service.image, 1200, 75) : service.image,
                site.url,
              ).href,
              provider: { "@id": `${site.url}/#organization` },
              areaServed: { "@type": "Country", name: "Australia" },
              serviceType: service.title,
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
                  name: "Solutions",
                  item: `${site.url}/solutions`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: service.title,
                  item: pageUrl,
                },
              ],
            },
          ],
        }}
      />

      <PageHero
        eyebrow="Kooka Solutions"
        title={service.title}
        subtitle={`${service.title} in Melbourne & Across Australia`}
        description={service.description}
        image={service.image}
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
              title={`Complete ${service.title}`}
              description="Every system is planned around your venue, audience, content and production schedule, then delivered by an experienced technical team."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-3 text-kooka-white">
                  <Check className="h-4 w-4 shrink-0 text-kooka-amber" aria-hidden="true" />
                  {item}
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
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-white/[0.07] pb-4 text-kooka-mist last:border-0">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-kooka-amber" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </Section>

      <Section className="border-t border-white/[0.06]" density="tight">
        <SectionHeading eyebrow="Explore More" title="Related Solutions" />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/solutions/${item.slug}`}
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
        title={`Need ${service.title}?`}
        description="Send us your date, venue and brief. Our Melbourne team will recommend the right production approach for your event."
      />
    </>
  );
}
