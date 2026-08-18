import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { uniqueSlug } from "@/lib/slug";
import { deleteUnreferencedUploads } from "@/lib/uploads";
import {
  showreelCreateSchema,
  showreelUpdateSchema,
  type ShowreelGalleryEntry,
} from "@/lib/validation/showreel";
import { CACHE_TAGS, revalidateTags } from "@/services/cache";
import { parseInput } from "@/services/parse";

export type ShowreelGalleryImage = {
  id: string;
  url: string;
  alt: string | null;
};

export type ShowreelItem = {
  id: string;
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  blurb: string;
  image: string;
  href: string | null;
  published: boolean;
  sortOrder: number;
  updatedAt: Date;
  gallery: ShowreelGalleryImage[];
};

const withGallery = {
  images: { orderBy: { sortOrder: "asc" } },
} as const;

type ShowreelRow = {
  id: string;
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  blurb: string;
  image: string;
  href: string | null;
  published: boolean;
  sortOrder: number;
  updatedAt: Date;
  images: { id: string; url: string; alt: string | null }[];
};

function toItem(row: ShowreelRow): ShowreelItem {
  const { images, ...rest } = row;
  return {
    ...rest,
    gallery: images.map((image) => ({ id: image.id, url: image.url, alt: image.alt })),
  };
}

function normaliseGallery(entries: ShowreelGalleryEntry[]) {
  return entries.map((entry, index) =>
    typeof entry === "string"
      ? { url: entry, alt: null, sortOrder: index }
      : { url: entry.url, alt: entry.alt ?? null, sortOrder: index },
  );
}

async function slugTaken(candidate: string, ignoreId?: string): Promise<boolean> {
  const existing = await prisma.showreel.findUnique({
    where: { slug: candidate },
    select: { id: true },
  });
  return existing !== null && existing.id !== ignoreId;
}

async function nextSortOrder(): Promise<number> {
  const last = await prisma.showreel.findFirst({
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });
  return (last?.sortOrder ?? -1) + 1;
}

/* ---------------------------------------------------------------- reads --- */

export const listShowreel = unstable_cache(
  async (): Promise<ShowreelItem[]> => {
    const rows = await prisma.showreel.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: withGallery,
    });
    return rows.map(toItem);
  },
  ["showreel:list"],
  { tags: [CACHE_TAGS.showreel] },
);

export const getShowreelBySlug = unstable_cache(
  async (slug: string): Promise<ShowreelItem | null> => {
    const row = await prisma.showreel.findFirst({
      where: { slug, published: true },
      include: withGallery,
    });
    return row ? toItem(row) : null;
  },
  ["showreel:by-slug"],
  { tags: [CACHE_TAGS.showreel] },
);

/* Admin reads bypass the cache and include unpublished drafts. */
export async function listShowreelAdmin(): Promise<ShowreelItem[]> {
  const rows = await prisma.showreel.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: withGallery,
  });
  return rows.map(toItem);
}

export async function getShowreelById(id: string): Promise<ShowreelItem> {
  const row = await prisma.showreel.findUnique({ where: { id }, include: withGallery });
  if (!row) {
    throw new ServiceError("NOT_FOUND", "Showreel item not found.");
  }
  return toItem(row);
}

/* ------------------------------------------------------------ mutations --- */

export async function createShowreel(body: unknown): Promise<ShowreelItem> {
  const input = parseInput(showreelCreateSchema, body);
  const slug = await uniqueSlug(
    input.slug ?? input.title,
    (candidate) => slugTaken(candidate),
    "project",
  );

  const row = await prisma.showreel.create({
    data: {
      slug,
      title: input.title,
      type: input.type,
      location: input.location,
      year: input.year,
      blurb: input.blurb,
      image: input.image,
      href: input.href ?? null,
      published: input.published ?? true,
      sortOrder: input.sortOrder ?? (await nextSortOrder()),
      images: { create: normaliseGallery(input.gallery ?? []) },
    },
    include: withGallery,
  });

  revalidateTags([CACHE_TAGS.showreel]);
  return toItem(row);
}

/*
 * The slug is deliberately left alone unless one is supplied: renaming an item
 * used to regenerate it and break the live URL.
 */
export async function updateShowreel(id: string, body: unknown): Promise<ShowreelItem> {
  const input = parseInput(showreelUpdateSchema, body);
  const existing = await prisma.showreel.findUnique({
    where: { id },
    select: { id: true, image: true, images: { select: { url: true } } },
  });
  if (!existing) {
    throw new ServiceError("NOT_FOUND", "Showreel item not found.");
  }

  const previousFiles = [existing.image, ...existing.images.map((image) => image.url)];

  const slug = input.slug
    ? await uniqueSlug(input.slug, (candidate) => slugTaken(candidate, id), "project")
    : undefined;

  const row = await prisma.$transaction(async (tx) => {
    if (input.gallery) {
      await tx.showreelImage.deleteMany({ where: { showreelId: id } });
      const gallery = normaliseGallery(input.gallery);
      if (gallery.length > 0) {
        await tx.showreelImage.createMany({
          data: gallery.map((image) => ({ ...image, showreelId: id })),
        });
      }
    }

    return tx.showreel.update({
      where: { id },
      data: {
        ...(slug ? { slug } : {}),
        ...(input.title === undefined ? {} : { title: input.title }),
        ...(input.type === undefined ? {} : { type: input.type }),
        ...(input.location === undefined ? {} : { location: input.location }),
        ...(input.year === undefined ? {} : { year: input.year }),
        ...(input.blurb === undefined ? {} : { blurb: input.blurb }),
        ...(input.image === undefined ? {} : { image: input.image }),
        ...(input.href === undefined ? {} : { href: input.href ?? null }),
        ...(input.published === undefined ? {} : { published: input.published }),
        ...(input.sortOrder === undefined ? {} : { sortOrder: input.sortOrder }),
      },
      include: withGallery,
    });
  });

  /*
   * Runs against the committed row, so a file the edit kept is still
   * referenced and only the ones it dropped are removed from disk.
   */
  await deleteUnreferencedUploads(previousFiles);

  revalidateTags([CACHE_TAGS.showreel]);
  return toItem(row);
}

export async function deleteShowreel(id: string): Promise<void> {
  const existing = await prisma.showreel.findUnique({
    where: { id },
    select: { id: true, image: true, images: { select: { url: true } } },
  });
  if (!existing) {
    throw new ServiceError("NOT_FOUND", "Showreel item not found.");
  }

  await prisma.showreel.delete({ where: { id } });
  await deleteUnreferencedUploads([existing.image, ...existing.images.map((image) => image.url)]);

  revalidateTags([CACHE_TAGS.showreel]);
}
