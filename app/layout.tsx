import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { FooterGate } from "@/components/layout/FooterGate";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SceneCanvas } from "@/components/3d/SceneCanvas";
import { site } from "@/data/site";

const kookaDisplay = localFont({
  src: "./fonts/Outfit-Variable.woff2",
  variable: "--font-kooka-display",
  weight: "100 900",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const kookaSans = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-kooka-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.seoLine}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/Logo-kooka.png",
    shortcut: "/Logo-kooka.png",
    apple: "/Logo-kooka.png",
  },
  keywords: [
    "event production Melbourne",
    "AV hire Melbourne",
    "LED wall hire",
    "projection mapping",
    "live streaming Melbourne",
    "stage and lighting design",
    "corporate event production Australia",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.seoLine}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.seoLine}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /*
   * Lets the fixed header and the mobile sheet run under the notch while the
   * `env(safe-area-inset-*)` terms in `globals.css` keep the content clear of
   * it. Pinch zoom stays enabled — capping it fails WCAG 1.4.4.
   */
  viewportFit: "cover",
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      // Next 16 only restores instant scroll-to-top on navigation when this
      // attribute is present alongside global `scroll-behavior: smooth`.
      data-scroll-behavior="smooth"
      className={`${kookaDisplay.variable} ${kookaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-kooka-black text-kooka-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-kooka-amber focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-kooka-black"
        >
          Skip to content
        </a>
        <MotionProvider>
          {/*
            The WebGL surface is the page's backdrop, so it sits at the bottom
            of the stack and every band of content is composited over it. Client
            component: it renders nothing until it has probed the device.
          */}
          <SceneCanvas />

          <SiteHeader />
          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>
          <FooterGate>
            <Footer />
          </FooterGate>
        </MotionProvider>
      </body>
    </html>
  );
}
