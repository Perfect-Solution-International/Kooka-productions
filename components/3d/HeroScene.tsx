"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { CameraController } from "./CameraController";
import { LightBeams } from "./LightBeams";
import { ParticleField } from "./ParticleField";
import { ProductionObjects } from "./ProductionObjects";
import { SceneLighting } from "./SceneLighting";
import { kookaPalette } from "./palette";
import type { QualitySettings } from "./quality";

type HeroSceneProps = {
  readonly settings: QualitySettings;
  readonly reducedMotion: boolean;
};

/**
 * Redraws on scroll while the loop is parked.
 *
 * Under `prefers-reduced-motion` the canvas runs on demand rather than every
 * frame, so nothing idles or drifts on its own. The camera should still answer
 * the scroll, which is user-driven motion, so each scroll event asks for one
 * frame.
 */
function ScrollInvalidation() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const request = () => invalidate();

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [invalidate]);

  return null;
}

export function HeroScene({ settings, reducedMotion }: HeroSceneProps) {
  return (
    <>
      <color attach="background" args={[kookaPalette.void]} />
      <fogExp2 attach="fog" args={[kookaPalette.void, 0.021]} />

      {reducedMotion ? <ScrollInvalidation /> : null}

      <SceneLighting shadows={settings.shadows} rich={settings.motion >= 0.8} />

      <ProductionObjects settings={settings} />

      <LightBeams count={settings.beams} motion={settings.motion} />
      <ParticleField count={settings.particles} motion={settings.motion} />

      <CameraController
        motion={settings.motion}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
