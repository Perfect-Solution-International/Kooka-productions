"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, DoubleSide, type Group } from "three";
import { kookaPalette } from "./palette";

type LightBeamsProps = {
  readonly count: number;
  readonly motion: number;
};

type BeamSpec = {
  readonly origin: readonly [number, number, number];
  readonly colour: string;
  readonly length: number;
  readonly spread: number;
  readonly tilt: number;
  readonly sweep: number;
  readonly phase: number;
};

/**
 * Beams hang off the overhead span and the outriggers, so they read as fixtures
 * on the rig rather than as free-floating cones.
 */
const specs: readonly BeamSpec[] = [
  { origin: [-4.2, 9, 0], colour: kookaPalette.amber, length: 13, spread: 0.85, tilt: 0.22, sweep: 0.16, phase: 0 },
  { origin: [4.2, 9, 0], colour: kookaPalette.ember, length: 13, spread: 0.8, tilt: -0.24, sweep: 0.13, phase: 2.2 },
  { origin: [-9.6, 7.2, -9], colour: kookaPalette.flare, length: 11, spread: 0.6, tilt: 0.34, sweep: 0.1, phase: 4.1 },
  { origin: [9.6, 7.2, -9], colour: kookaPalette.amber, length: 11, spread: 0.62, tilt: -0.32, sweep: 0.11, phase: 5.5 },
];

/**
 * Volumetric-looking spill. Real volumetrics need a raymarch pass; an additive
 * open cone with depth writing disabled sells the same read at a fraction of
 * the cost, which is the trade the whole scene is built around.
 */
export function LightBeams({ count, motion }: LightBeamsProps) {
  const groupRef = useRef<Group>(null);
  const visible = useMemo(() => specs.slice(0, count), [count]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const time = state.clock.elapsedTime;

    group.children.forEach((child, index) => {
      const spec = visible[index];
      if (!spec) return;

      child.rotation.z =
        spec.tilt + Math.sin(time * spec.sweep + spec.phase) * 0.26 * motion;
      child.rotation.x =
        Math.cos(time * spec.sweep * 0.8 + spec.phase) * 0.14 * motion;
    });
  });

  return (
    <group ref={groupRef}>
      {visible.map((spec) => (
        <group
          key={`${spec.origin[0]}:${spec.origin[2]}`}
          position={[spec.origin[0], spec.origin[1], spec.origin[2]]}
        >
          {/*
            The cone is built around its own centre and points up, so it is
            shifted down by half its length and flipped to hang from the rig.
          */}
          <mesh position={[0, -spec.length / 2, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[spec.spread, spec.length, 24, 1, true]} />
            <meshBasicMaterial
              color={spec.colour}
              transparent
              opacity={0.07}
              blending={AdditiveBlending}
              depthWrite={false}
              side={DoubleSide}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
