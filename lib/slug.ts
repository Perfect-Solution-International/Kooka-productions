export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/*
 * Slugs are the public URL segment, so a collision must resolve to a fresh slug
 * rather than silently merging two records. `isTaken` is async because the
 * check now hits the database instead of an in-memory array.
 */
export async function uniqueSlug(
  base: string,
  isTaken: (candidate: string) => Promise<boolean>,
  fallback = "item",
): Promise<string> {
  const root = slugify(base) || fallback;
  let candidate = root;
  let attempt = 2;

  while (await isTaken(candidate)) {
    candidate = `${root}-${attempt}`;
    attempt += 1;
  }

  return candidate;
}
