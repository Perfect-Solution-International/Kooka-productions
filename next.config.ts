import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cinematic production / event photography is served from Unsplash's CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Next 16 defaults to [75] only; the hero art is served sharper.
    qualities: [60, 75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
