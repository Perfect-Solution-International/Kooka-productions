"use client";

import { kookaPalette } from "./palette";

type SceneLightingProps = {
  readonly shadows: boolean;
  /** Trims the fixture count on the tiers that cannot afford them. */
  readonly rich: boolean;
};

/**
 * Rig lighting.
 *
 * Three.js lights are physical: ambient and directional are in lux and stay
 * small, while point and spot lights are in candela and fall off with the
 * square of distance, so their values look large by comparison. The key is
 * deliberately cool and dim — the amber comes from the fixtures and the wall,
 * not from a wash over everything.
 */
export function SceneLighting({ shadows, rich }: SceneLightingProps) {
  return (
    <>
      <ambientLight intensity={0.5} color={kookaPalette.mist} />

      <hemisphereLight
        intensity={0.28}
        color={kookaPalette.flare}
        groundColor={kookaPalette.void}
      />

      <directionalLight
        position={[7, 15, 8]}
        intensity={0.85}
        color={kookaPalette.flare}
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={48}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0012}
      />

      {/* Key wash from the house-left tower. */}
      <spotLight
        position={[-8.5, 11, 3.5]}
        angle={0.62}
        penumbra={0.92}
        decay={2}
        distance={44}
        intensity={620}
        color={kookaPalette.amber}
      />

      {rich ? (
        <spotLight
          position={[8.5, 10, -1.5]}
          angle={0.55}
          penumbra={0.9}
          decay={2}
          distance={40}
          intensity={430}
          color={kookaPalette.ember}
        />
      ) : null}

      {/* Bounce off the LED wall, filling the space between wall and rig. */}
      <pointLight
        position={[0, 5, -13]}
        decay={2}
        distance={52}
        intensity={340}
        color={kookaPalette.ember}
      />
    </>
  );
}
