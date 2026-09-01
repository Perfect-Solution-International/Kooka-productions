import type { MetadataRoute } from "next";
import { listShowreel } from "@/services/showreel.service";
import { listHomeSolutions } from "@/services/home-solution.service";
import { site } from "@/data/site";
import { footprintCategories } from "@/data/footprint";

export const dynamic = "force-dynamic";

function absoluteUrl(value: string): string | null {
  try {
    return new URL(value, site.url).href;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await listShowreel();
  const services = await listHomeSolutions();
  /* Projects live in MySQL, so the index date is the newest row's timestamp. */
  const showreelModified = projects.reduce<Date | undefined>(
    (latest, project) =>
      latest && latest > project.updatedAt ? latest : project.updatedAt,
    undefined,
  );

  const pages: MetadataRoute.Sitemap = [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/showreel`,
      lastModified: showreelModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/solutions`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/dna`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/footprint`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => {
    const images = [project.image, ...project.gallery.map((image) => image.url)]
      .map(absoluteUrl)
      .filter((url): url is string => url !== null);

    return {
      url: `${site.url}/showreel/${encodeURIComponent(project.slug)}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
      ...(images.length > 0 ? { images } : {}),
    };
  });

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/solutions/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [imgUrl(service.image)],
  }));

  const footprintPages: MetadataRoute.Sitemap = footprintCategories.map((category) => ({
    url: `${site.url}/footprint/${category.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [imgUrl(category.image)],
  }));

  return [...pages, ...servicePages, ...footprintPages, ...projectPages];
}

function imgUrl(value: string): string {
  return new URL(value, site.url).href;
}
