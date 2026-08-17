import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getShowreel } from "@/data/showreel";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

const SHOWREEL_DATA_FILE = path.join(
  process.cwd(),
  "data",
  "content",
  "showreel.json",
);

function absoluteUrl(value: string): string | null {
  try {
    return new URL(value, site.url).href;
  } catch {
    return null;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const showreelModified = fs.statSync(SHOWREEL_DATA_FILE).mtime;
  const projects = getShowreel();

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
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => {
    const images = [project.image, ...(project.gallery ?? [])]
      .map(absoluteUrl)
      .filter((url): url is string => url !== null);

    return {
      url: `${site.url}/showreel/${encodeURIComponent(project.slug)}`,
      lastModified: showreelModified,
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

  return [...pages, ...servicePages, ...projectPages];
}

function imgUrl(value: string): string {
  return new URL(value, site.url).href;
}
