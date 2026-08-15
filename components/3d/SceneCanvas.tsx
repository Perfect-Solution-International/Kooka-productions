"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ACESFilmicToneMapping } from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HeroScene } from "./HeroScene";
import { qualitySettings } from "./quality";
import {
  degradeQuality,
  initialQualityTier,
  useQualityTier,
} from "./useQualityTier";

/**
 * Passing `shadows` as a boolean asks for PCFSoftShadowMap, which Three.js has
 * deprecated: it now downgrades to PCFShadowMap anyway and logs on every load.
 * Naming that map outright is the same picture without the warning.
 */
const SHADOW_MAP = "percentage";

/**
 * Watches the real frame rate and steps the scene down a tier if the device
 * cannot hold the one it was given. Static capability sniffing gets the budget
 * roughly right; this catches the cases it does not — a thermally throttled
 * laptop, a phone with a dozen other tabs, a software renderer.
 */
function PerformanceGuard() {
  const frames = useRef(0);
  const elapsed = useRef(0);
  const fired = useRef(false);

  useFrame((_, delta) => {
    if (fired.current) return;

    frames.current += 1;
    elapsed.current += delta;

    /* Ignore the first stretch — startup frames are not representative. */
    if (elapsed.current < 3) return;

    const fps = frames.current / elapsed.current;
    frames.current = 0;
    elapsed.current = 0;

    if (fps < 38) {
      fired.current = true;
      degradeQuality();
    }
  });

  return null;
}

/**
 * The site's single WebGL surface.
 *
 * One fixed canvas sits behind the whole document rather than one canvas per
 * section: it is a single context and a single render loop, and it is what
 * lets the camera travel continuously through one venue as the page scrolls
 * instead of cutting between unrelated scenes.
 *
 * It renders nothing on the server and nothing at all if WebGL is unavailable —
 * every section keeps its own background and imagery, so the page is complete
 * without it.
 */
export function SceneCanvas() {
  const tier = useQualityTier();
  const reducedMotion = useReducedMotion();

  if (tier === "none") return null;

  const settings = qualitySettings(tier);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/*
        Deliberately not keyed on the tier. Remounting the canvas to rebuild it
        at a new budget orphaned the outgoing WebGL context — one leaked per
        degrade. Pixel ratio, shadows and every instance count are reactive on
        their own, so the scene rebuilds inside the one context the page ever
        creates.
      */}
      <Canvas
        dpr={[settings.dpr[0], settings.dpr[1]]}
        shadows={settings.shadows ? SHADOW_MAP : false}
        frameloop={reducedMotion ? "demand" : "always"}
        camera={{ fov: 42, near: 0.1, far: 95, position: [0, 1.7, 15.5] }}
        gl={{
          antialias: initialQualityTier() === "high",
          alpha: false,
          stencil: false,
          powerPreference: "high-performance",
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.16,
        }}
      >
        <HeroScene settings={settings} reducedMotion={reducedMotion} />
        {/* Keyed so a further degrade can be detected after the first fires. */}
        {reducedMotion ? null : <PerformanceGuard key={tier} />}
      </Canvas>

      {/*
        Holds the middle of the frame back so body copy sitting over the scene
        keeps its contrast, and grounds the bottom edge into the page black.
      */}
      <div className="kooka-scene-veil absolute inset-0" />
    </div>
  );
}
