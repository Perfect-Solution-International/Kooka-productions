"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Custom `next/image` loader.
 *
 * Unsplash's CDN already resizes and format-negotiates (`auto=format` returns
 * WebP/AVIF), so routing its images through Next's own optimizer only means the
 * dev server re-downloads and re-encodes every frame. On a page with ~20 images
 * that saturates the CPU and blows the optimizer's hardcoded 7s upstream-fetch
 * abort, producing `TimeoutError` + 500 on `/_next/image`.
 *
 * Deferring to the CDN removes the server round trip entirely. Local assets are
 * passed through untouched.
 */
export default function kookaImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // Local files (and data URIs) are served as-is.
  if (!src.startsWith("http")) {
    return src;
  }

  const url = new URL(src);

  if (url.hostname === "images.unsplash.com") {
    // Drop whatever sizing the caller baked in; the requested width wins.
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.href;
  }

  return src;
}
