import fs from "node:fs";
import path from "node:path";

export type ShowreelItem = {
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  blurb: string;
  image: string;
  href?: string;
};

export type ShowreelInput = {
  title: string;
  type: string;
  location: string;
  year: string;
  blurb: string;
  image: string;
  href?: string;
};

const dataFile = path.join(process.cwd(), "data", "content", "showreel.json");

function readAll(): ShowreelItem[] {
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw) as ShowreelItem[];
}

function writeAll(items: ShowreelItem[]): void {
  fs.writeFileSync(dataFile, `${JSON.stringify(items, null, 2)}\n`, "utf-8");
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/*
 * Slugs double as the CRUD identifier, so a title collision (including one
 * against its own prior slug when editing) must resolve to a fresh slug
 * rather than silently merging two projects.
 */
function uniqueSlug(base: string, existing: ShowreelItem[], skipSlug?: string): string {
  const root = base || "project";
  let slug = root;
  let attempt = 2;
  while (existing.some((item) => item.slug === slug && item.slug !== skipSlug)) {
    slug = `${root}-${attempt}`;
    attempt += 1;
  }
  return slug;
}

export function parseShowreelInput(body: unknown): ShowreelInput | null {
  if (typeof body !== "object" || body === null) return null;

  const { title, type, location, year, blurb, image, href } = body as Record<string, unknown>;
  if (typeof title !== "string" || !title.trim()) return null;
  if (typeof type !== "string" || !type.trim()) return null;
  if (typeof location !== "string" || !location.trim()) return null;
  if (typeof year !== "string" || !year.trim()) return null;
  if (typeof blurb !== "string" || !blurb.trim()) return null;
  if (typeof image !== "string" || !image.trim()) return null;
  if (href !== undefined && typeof href !== "string") return null;

  return {
    title: title.trim(),
    type: type.trim(),
    location: location.trim(),
    year: year.trim(),
    blurb: blurb.trim(),
    image: image.trim(),
    ...(href?.trim() ? { href: href.trim() } : {}),
  };
}

export function listShowreel(): ShowreelItem[] {
  return readAll();
}

export function createShowreel(input: ShowreelInput): ShowreelItem {
  const items = readAll();
  const item: ShowreelItem = { slug: uniqueSlug(slugify(input.title), items), ...input };
  writeAll([...items, item]);
  return item;
}

export function updateShowreel(slug: string, input: ShowreelInput): ShowreelItem | null {
  const items = readAll();
  const index = items.findIndex((item) => item.slug === slug);
  if (index === -1) return null;

  const updated: ShowreelItem = {
    slug: uniqueSlug(slugify(input.title), items, slug),
    ...input,
  };
  items[index] = updated;
  writeAll(items);
  return updated;
}

export function deleteShowreel(slug: string): boolean {
  const items = readAll();
  const next = items.filter((item) => item.slug !== slug);
  if (next.length === items.length) return false;
  writeAll(next);
  return true;
}
