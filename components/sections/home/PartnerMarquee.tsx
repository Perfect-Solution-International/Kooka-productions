"use client";

import { useEffect, useRef, useState } from "react";
import { LogoTicker } from "@/components/ui/LogoTicker";
import { producerPartners } from "@/data/partners";

type BandGeometry = Readonly<{
  /** Band length in pixels: enough to cross the host and overhang both ends. */
  length: number;
  /** Counter-clockwise tilt in degrees, so the band climbs to the right. */
  angle: number;
}>;

const RADIANS_TO_DEGREES = 180 / Math.PI;

/**
 * Portrait viewports would put the corner-to-corner line past 60 degrees,
 * which turns the logos on their side. Past this tilt the band stops chasing
 * the corners and just crosses the full width at a readable rise.
 */
const MAX_TILT_DEGREES = 32;

/** Overhang past both edges, so the ends are never visible on screen. */
const LENGTH_SLACK = 1.15;

function measure(box: DOMRectReadOnly): BandGeometry {
  const cornerTilt = Math.atan2(box.height, box.width) * RADIANS_TO_DEGREES;
  const angle = Math.min(cornerTilt, MAX_TILT_DEGREES);
  const span = box.width / Math.cos(angle / RADIANS_TO_DEGREES);

  return { length: span * LENGTH_SLACK, angle: -angle };
}

/**
 * Diagonal partner rail pinned to the viewport, running from its bottom-left
 * corner up to its top-right one. The band is `fixed`, so it holds its place
 * on screen while the page scrolls underneath; the only motion in it is the
 * ticker, which runs in reverse so the logos travel up the rise instead of
 * against it.
 *
 * The geometry is measured rather than written in CSS: the tilt that lands on
 * both corners is a function of the viewport's aspect ratio, which no static
 * `rotate` value can express. The observer keeps it correct across resizes and
 * orientation changes.
 *
 * The overlay sits above the page (`z-30`) but below the header (`z-50`) and
 * its mobile drawer (`z-40`), and takes no pointer events, so everything it
 * crosses stays clickable.
 */
export function PartnerMarquee() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<BandGeometry | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        setGeometry(measure(entry.contentRect));
      }
    });

    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {geometry ? (
        <div
          className="absolute top-1/2 left-1/2 py-4 sm:py-5"
          style={{
            width: `${geometry.length}px`,
            transform: `translate(-50%, -50%) rotate(${geometry.angle}deg)`,
          }}
        >
          <LogoTicker items={producerPartners} reverse />
        </div>
      ) : null}
    </div>
  );
}
