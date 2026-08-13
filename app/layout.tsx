import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
