import fs from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/db";

/*
 * Everything the admin uploader writes lands in one flat directory. Only files
 * under it are ever removed — seeded artwork such as `/Highlighted/...` is
 * checked into the repo and must survive a project being edited or deleted.
 */
export const UPLOAD_URL_PREFIX = "/Project/";

export const uploadDir = path.join(process.cwd(), "public", "Project");

export function toUploadUrl(filename: string): string {
  return `${UPLOAD_URL_PREFIX}${filename}`;
}

/*
 * Uploads are a flat directory of `uuid.ext` names, so anything carrying a
 * separator, a traversal segment, or an unexpected character is rejected
 * outright rather than normalised into something that looks safe.
 */
const UPLOAD_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function resolveUploadPath(url: string): string | null {
  if (!url.startsWith(UPLOAD_URL_PREFIX)) return null;

  const filename = url.slice(UPLOAD_URL_PREFIX.length);
  if (!UPLOAD_FILENAME.test(filename) || filename.includes("..")) return null;

  const resolved = path.resolve(uploadDir, filename);
  return resolved.startsWith(path.resolve(uploadDir) + path.sep) ? resolved : null;
}

export function isManagedUpload(url: string): boolean {
  return resolveUploadPath(url) !== null;
}

/**
 * Removes uploaded files that no row points at any more. Call it after the
 * database has committed: a path that is still referenced anywhere is kept, so
 * a cover shared with another project is never pulled out from under it.
 */
export async function deleteUnreferencedUploads(urls: readonly string[]): Promise<void> {
  const candidates = [...new Set(urls.filter(isManagedUpload))];
  if (candidates.length === 0) return;

  const [covers, gallery] = await Promise.all([
    prisma.showreel.findMany({ where: { image: { in: candidates } }, select: { image: true } }),
    prisma.showreelImage.findMany({ where: { url: { in: candidates } }, select: { url: true } }),
  ]);

  const stillReferenced = new Set([
    ...covers.map((row) => row.image),
    ...gallery.map((row) => row.url),
  ]);

  await Promise.all(
    candidates
      .filter((url) => !stillReferenced.has(url))
      .map(async (url) => {
        const target = resolveUploadPath(url);
        if (!target) return;

        /*
         * A missing file is the desired end state, and a failed unlink must not
         * turn a successful save into an error response.
         */
        try {
          await fs.rm(target, { force: true });
        } catch (error) {
          console.error(`Could not remove upload ${url}`, error);
        }
      }),
  );
}
