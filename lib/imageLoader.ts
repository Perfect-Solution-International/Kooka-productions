"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Per-image loader for Unsplash CDN art.
 *
 * Unsplash already resizes and format-negotiates (`auto=format` returns
 * WebP/AVIF), so its images are handed straight to the CDN. Routing them
 * through Next's own optimizer means the server re-downloads and re-encodes
 * every frame; on a page with ~20 images that saturates the CPU and blows the
 * optimizer's hardcoded 7s upstream-fetch abort, producing `TimeoutError` + 500.
 *
 * This is applied per `<Image>` via the `loader` prop rather than as the
 * project-wide `loader: "custom"` — setting that globally disables the
 * `/_next/image` endpoint, which is what the files under `public/` need in
 * order to be served as AVIF/WebP at the width each layout actually paints.
 */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps): string {
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
