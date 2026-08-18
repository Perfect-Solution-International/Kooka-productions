import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { uniqueSlug } from "@/lib/slug";
import { homeSolutionCreateSchema, homeSolutionUpdateSchema } from "@/lib/validation/home-solution";
import { CACHE_TAGS, revalidateTags } from "@/services/cache";
import { parseInput } from "@/services/parse";
import type { IconName } from "@/data/services";

export type HomeSolutionItem = {
  id: string;
  slug: string;
  title: string;
  icon: IconName;
  image: string;
  description: string;
  deliverables: string[];
  idealFor: string[];
  published: boolean;
  sortOrder: number;
};

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function toItem(row: Awaited<ReturnType<typeof prisma.homeSolution.findFirstOrThrow>>): HomeSolutionItem {
  return { ...row, icon: row.icon as IconName, deliverables: stringList(row.deliverables), idealFor: stringList(row.idealFor) };
}

async function slugTaken(slug: string, ignoreId?: string) {
  const row = await prisma.homeSolution.findUnique({ where: { slug }, select: { id: true } });
  return Boolean(row && row.id !== ignoreId);
}

export const listHomeSolutions = unstable_cache(
  async () => (await prisma.homeSolution.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] })).map(toItem),
  ["home-solutions:list:v2"],
  { tags: [CACHE_TAGS.homeSolutions] },
);

export async function listHomeSolutionsAdmin() {
  return (await prisma.homeSolution.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] })).map(toItem);
}

export async function getHomeSolution(id: string) {
  const row = await prisma.homeSolution.findUnique({ where: { id } });
  if (!row) throw new ServiceError("NOT_FOUND", "Solution not found.");
  return toItem(row);
}

export async function createHomeSolution(body: unknown) {
  const input = parseInput(homeSolutionCreateSchema, body);
  const slug = await uniqueSlug(input.slug ?? input.title, (value) => slugTaken(value), "solution");
  const last = await prisma.homeSolution.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
  const row = await prisma.homeSolution.create({ data: { ...input, slug, sortOrder: input.sortOrder ?? (last?.sortOrder ?? -1) + 1 } });
  revalidateTags([CACHE_TAGS.homeSolutions]);
  return toItem(row);
}

export async function updateHomeSolution(id: string, body: unknown) {
  const input = parseInput(homeSolutionUpdateSchema, body);
  await getHomeSolution(id);
  const slug = input.slug ? await uniqueSlug(input.slug, (value) => slugTaken(value, id), "solution") : undefined;
  const row = await prisma.homeSolution.update({ where: { id }, data: { ...input, ...(slug ? { slug } : {}) } });
  revalidateTags([CACHE_TAGS.homeSolutions]);
  return toItem(row);
}

export async function deleteHomeSolution(id: string) {
  await getHomeSolution(id);
  await prisma.homeSolution.delete({ where: { id } });
  revalidateTags([CACHE_TAGS.homeSolutions]);
}
