import type { NextConfig } from "next";

const YEAR_SECONDS = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: false,
  },
  images: {
    /*
     * The default loader is kept so `/_next/image` stays mounted: files under
     * `public/` are the bulk of the site's art and need it served as AVIF/WebP
     * at the width each layout paints. Setting `loader: "custom"` globally
     * unmounts that endpoint and every local image 404s.
     *
     * Unsplash art opts out per-image with `lib/imageLoader.ts`, which hands
     * sizing to the CDN instead of re-encoding it here.
     */
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    /*
     * Next's defaults emit ten srcset candidates per image, which on a page
     * carrying ~50 marks costs more markup than the extra breakpoints save.
     * These cover phone through 2x desktop; 3840 is dropped because no layout
     * here paints an image that wide.
     */
    deviceSizes: [640, 828, 1080, 1920, 2048],
    imageSizes: [96, 160, 256, 384],
    // Next 16 defaults to [75] only; hero art and backdrop art use sharper values.
    qualities: [75, 78, 80, 82, 90],
    minimumCacheTTL: YEAR_SECONDS,
  },
  async headers() {
    return [
      {
      
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${YEAR_SECONDS}, immutable`,
          },
        ],
      },
      {
        source: "/:path*.(jpg|jpeg|png|webp|avif|svg|ico|mp4|webm)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${YEAR_SECONDS}, stale-while-revalidate=${YEAR_SECONDS}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
