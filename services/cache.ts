import { revalidateTag } from "next/cache";

/*
 * Public showreel reads are cached under this tag and every mutation
 * revalidates it, so the showreel pages stay statically rendered instead of
 * falling back to `force-dynamic`.
 */
export const CACHE_TAGS = {
  showreel: "showreel",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

/*
 * Next 16 requires a cache-life profile alongside the tag; "max" purges every
 * stored entry, which is what a content edit needs.
 */
export function revalidateTags(tags: readonly string[]): void {
  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
}
