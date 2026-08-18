import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { toUploadUrl, uploadDir } from "@/lib/uploads";

const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const VIDEO_MAX_BYTES = 100 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, { extension: string; maxBytes: number; label: string }> = {
  "image/jpeg": { extension: "jpg", maxBytes: IMAGE_MAX_BYTES, label: "Image" },
  "image/png": { extension: "png", maxBytes: IMAGE_MAX_BYTES, label: "Image" },
  "image/webp": { extension: "webp", maxBytes: IMAGE_MAX_BYTES, label: "Image" },
  "image/gif": { extension: "gif", maxBytes: IMAGE_MAX_BYTES, label: "Image" },
  "image/svg+xml": { extension: "svg", maxBytes: IMAGE_MAX_BYTES, label: "Image" },
  "video/mp4": { extension: "mp4", maxBytes: VIDEO_MAX_BYTES, label: "Video" },
  "video/webm": { extension: "webm", maxBytes: VIDEO_MAX_BYTES, label: "Video" },
  "video/quicktime": { extension: "mov", maxBytes: VIDEO_MAX_BYTES, label: "Video" },
};

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const fileType = ALLOWED_TYPES[file.type];
  if (!fileType) {
    return NextResponse.json({ error: "Unsupported image or video type." }, { status: 400 });
  }

  if (file.size > fileType.maxBytes) {
    const limit = Math.round(fileType.maxBytes / (1024 * 1024));
    return NextResponse.json({ error: `${fileType.label} must be ${limit}MB or smaller.` }, { status: 400 });
  }

  await fs.mkdir(uploadDir, { recursive: true });

  const filename = `${randomUUID()}.${fileType.extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), bytes);

  return NextResponse.json({ path: toUploadUrl(filename) }, { status: 201 });
}
