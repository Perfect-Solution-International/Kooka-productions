import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Use the in-process TypeScript compiler API. The standalone CLI spawns a
    // detached worker, which is not permitted by this production host.
    useTypeScriptCli: false,
  },
  images: {
    // Cinematic production / event photography is served from Unsplash's CDN,
    // which resizes and format-negotiates on its own. `lib/imageLoader.ts`
    // hands sizing straight to it instead of re-encoding through
    // `/_next/image`, which timed out under a page's worth of parallel images.
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    // Next 16 defaults to [75] only; hero art and backdrop art use sharper values.
    qualities: [75, 82, 90],
  },
};

export default nextConfig;
