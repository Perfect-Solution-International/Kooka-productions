import { ServiceError } from "@/lib/errors";
import { uniqueSlug } from "@/lib/slug";
import { homeSolutionCreateSchema, homeSolutionUpdateSchema } from "@/lib/validation/home-solution";
import { CACHE_TAGS, revalidateTags } from "@/services/cache";
import { parseInput } from "@/services/parse";
import { services as staticServices, type IconName } from "@/data/services";

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

type HomeSolutionRow = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  image: string;
  description: string;
  deliverables: unknown;
  idealFor: unknown;
  published: boolean;
  sortOrder: number;
};

async function getPrisma() {
  return (await import("@/lib/db")).prisma;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function toItem(row: HomeSolutionRow): HomeSolutionItem {
  return { ...row, icon: row.icon as IconName, deliverables: stringList(row.deliverables), idealFor: stringList(row.idealFor) };
}

async function slugTaken(slug: string, ignoreId?: string) {
  const prisma = await getPrisma();
  const row = await prisma.homeSolution.findUnique({ where: { slug }, select: { id: true } });
  return Boolean(row && row.id !== ignoreId);
}

export async function listHomeSolutions(): Promise<HomeSolutionItem[]> {
  return staticServices.map((service, index) => ({
    id: service.slug,
    slug: service.slug,
    title: service.title,
    icon: service.icon,
    image: service.image,
    description: service.description,
    deliverables: [...service.deliverables],
    idealFor: [...service.idealFor],
    published: true,
    sortOrder: index,
  }));
}

export async function listHomeSolutionsAdmin() {
  const prisma = await getPrisma();
  return (await prisma.homeSolution.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] })).map(toItem);
}

export async function getHomeSolution(id: string) {
  const prisma = await getPrisma();
  const row = await prisma.homeSolution.findUnique({ where: { id } });
  if (!row) throw new ServiceError("NOT_FOUND", "Solution not found.");
  return toItem(row);
}

export async function createHomeSolution(body: unknown) {
  const prisma = await getPrisma();
  const input = parseInput(homeSolutionCreateSchema, body);
  const slug = await uniqueSlug(input.slug ?? input.title, (value) => slugTaken(value), "solution");
  const last = await prisma.homeSolution.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
  const row = await prisma.homeSolution.create({ data: { ...input, slug, sortOrder: input.sortOrder ?? (last?.sortOrder ?? -1) + 1 } });
  revalidateTags([CACHE_TAGS.homeSolutions]);
  return toItem(row);
}

export async function updateHomeSolution(id: string, body: unknown) {
  const prisma = await getPrisma();
  const input = parseInput(homeSolutionUpdateSchema, body);
  await getHomeSolution(id);
  const slug = input.slug ? await uniqueSlug(input.slug, (value) => slugTaken(value, id), "solution") : undefined;
  const row = await prisma.homeSolution.update({ where: { id }, data: { ...input, ...(slug ? { slug } : {}) } });
  revalidateTags([CACHE_TAGS.homeSolutions]);
  return toItem(row);
}

export async function deleteHomeSolution(id: string) {
  const prisma = await getPrisma();
  await getHomeSolution(id);
  await prisma.homeSolution.delete({ where: { id } });
  revalidateTags([CACHE_TAGS.homeSolutions]);
}
