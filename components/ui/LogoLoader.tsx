import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LoaderStyle extends CSSProperties {
  readonly "--loader-size"?: string;
}

interface RippleStyle extends CSSProperties {
  readonly "--ripple-delay": string;
}

interface OrbitStyle extends CSSProperties {
  readonly "--orbit-radius": string;
  readonly "--orbit-size": string;
  readonly "--orbit-duration": string;
  readonly "--orbit-delay": string;
  readonly "--orbit-phase": string;
}

interface Orbit {
  readonly radius: number;
  readonly size: number;
  readonly duration: number;
  readonly delay: number;
  readonly reverse?: boolean;
}

/*
 * Orbiting motes. Every duration divides the 5s cycle exactly, so the swarm
 * returns to its opening arrangement on the seam instead of drifting out of
 * phase with the ring. The delays are negative: each mote starts part-way
 * through its own travel, which means the loader opens already in motion rather
 * than assembling itself once on mount.
 *
 * `radius` is a fraction of the loader's width — the ring itself sits at 0.43,
 * so values either side of it read as motes passing in front of and behind it.
 */
const ORBITS: readonly Orbit[] = [
  { radius: 0.455, size: 3, duration: 5, delay: -0.4 },
  { radius: 0.455, size: 2, duration: 5, delay: -2.2 },
  { radius: 0.36, size: 2.5, duration: 2.5, delay: -0.9, reverse: true },
  { radius: 0.5, size: 2, duration: 5, delay: -3.4, reverse: true },
  { radius: 0.41, size: 3.5, duration: 5, delay: -1.6 },
  { radius: 0.31, size: 1.5, duration: 2.5, delay: -1.9 },
  { radius: 0.52, size: 2.5, duration: 5, delay: -4.1 },
];

const RING_RADIUS = 86;

/**
 * Seamless brand loader: the Kooka mark held at the centre of a drawing
 * progress ring, an orbiting light pulse and a swarm of motes.
 *
 * The mark is the untouched `public/Logo-kooka.png` — the cycle only moves its
 * opacity, blur and glow, never its geometry or colour.
 *
 * Motion lives entirely in CSS (`app/globals.css`, "Loading screen" section),
 * so this stays a server component and the animation runs on the compositor
 * without waiting for hydration — the point of a loading screen being that it
 * is on screen before the JavaScript is.
 */
export function LogoLoader({
  className,
  size,
}: {
  readonly className?: string;
  /** Any CSS length; drives every derived radius. Defaults to `15rem`. */
  readonly size?: string;
}) {
  const style: LoaderStyle = size ? { "--loader-size": size } : {};
  const offsetRipple: RippleStyle = { "--ripple-delay": "-2.5s" };

  return (
    <div
      className={cn("kooka-loader", className)}
      style={style}
      role="status"
      aria-live="polite"
    >
      <span className="kooka-loader-bloom" aria-hidden="true" />
      <span className="kooka-loader-ripple" aria-hidden="true" />
      <span
        className="kooka-loader-ripple"
        aria-hidden="true"
        style={offsetRipple}
      />

      <svg
        className="kooka-loader-ring"
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
      >
        <circle className="kooka-loader-track" cx="100" cy="100" r={RING_RADIUS} />
        <circle
          className="kooka-loader-comet"
          cx="100"
          cy="100"
          r={RING_RADIUS}
          pathLength="1"
        />
        <circle
          className="kooka-loader-arc"
          cx="100"
          cy="100"
          r={RING_RADIUS}
          pathLength="1"
        />
        <circle
          className="kooka-loader-comet-head"
          cx="100"
          cy="100"
          r={RING_RADIUS}
          pathLength="1"
        />
      </svg>

      {ORBITS.map((orbit) => {
        /*
         * Where the delay has already carried the mote by the first frame. The
         * spin animation supersedes it immediately; it only becomes visible
         * under `prefers-reduced-motion`, where the swarm is frozen and needs to
         * be frozen somewhere other than all together at the top of the ring.
         */
        const travelled = (-orbit.delay / orbit.duration) * 360;
        const orbitStyle: OrbitStyle = {
          "--orbit-radius": String(orbit.radius),
          "--orbit-size": `${orbit.size}px`,
          "--orbit-duration": `${orbit.duration}s`,
          "--orbit-delay": `${orbit.delay}s`,
          "--orbit-phase": `${(orbit.reverse ? -travelled : travelled).toFixed(1)}deg`,
        };

        return (
          <span
            key={`${orbit.radius}-${orbit.delay}`}
            className={cn(
              "kooka-loader-orbit",
              orbit.reverse && "kooka-loader-orbit--reverse",
            )}
            style={orbitStyle}
            aria-hidden="true"
          >
            <span className="kooka-loader-particle" />
          </span>
        );
      })}

      <Image
        src="/Logo-kooka.png"
        alt=""
        width={483}
        height={517}
        priority
        /*
         * Local asset: the custom loader (lib/imageLoader.ts) passes it through
         * untouched, so there is no width-derived srcset to generate.
         */
        unoptimized
        className="kooka-loader-logo"
      />

      <span className="sr-only">Loading</span>
    </div>
  );
}
