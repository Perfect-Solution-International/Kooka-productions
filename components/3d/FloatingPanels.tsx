"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { kookaPalette } from "./palette";

type FloatingPanelsProps = {
  readonly count: number;
  readonly motion: number;
};

type PanelSpec = {
  readonly position: readonly [number, number, number];
  readonly rotation: readonly [number, number, number];
  readonly size: readonly [number, number];
  readonly drift: number;
  readonly phase: number;
};

/**
 * Projection surfaces hung at staggered depths. Ordered near to far so a lower
 * `count` on a weaker device drops the far ones, where the loss reads as haze
 * rather than as missing objects.
 *
 * All of them sit beyond z = -16, which is ten units past where the camera
 * stops. Closer in, a panel fills the frame as a flat quad the moment the
 * camera arrives, and it stops reading as a surface hanging in a room.
 */
const specs: readonly PanelSpec[] = [
  { position: [-8.2, 5.2, -17], rotation: [0, 0.46, -0.05], size: [4.2, 2.4], drift: 0.3, phase: 0 },
  { position: [8.8, 6.4, -20], rotation: [0, -0.5, 0.04], size: [4.6, 2.6], drift: 0.26, phase: 1.7 },
  { position: [-6.6, 8.4, -24], rotation: [0, 0.34, 0.07], size: [5, 2.8], drift: 0.22, phase: 3.1 },
  { position: [7.4, 3.6, -27], rotation: [0, -0.3, -0.06], size: [4.4, 2.5], drift: 0.24, phase: 4.4 },
  { position: [-3.2, 9.4, -30], rotation: [0, 0.16, 0.03], size: [5.4, 3], drift: 0.18, phase: 5.6 },
  { position: [4.2, 7.8, -34], rotation: [0, -0.14, -0.02], size: [5.8, 3.2], drift: 0.16, phase: 6.8 },
];

export function FloatingPanels({ count, motion }: FloatingPanelsProps) {
  const groupRef = useRef<Group>(null);
  const visible = useMemo(() => specs.slice(0, count), [count]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const time = state.clock.elapsedTime;

    group.children.forEach((child, index) => {
      const spec = visible[index];
      if (!spec) return;

      child.position.y =
        spec.position[1] + Math.sin(time * spec.drift + spec.phase) * 0.5 * motion;
      child.rotation.z =
        spec.rotation[2] + Math.sin(time * spec.drift * 0.7 + spec.phase) * 0.03 * motion;
    });
  });

  return (
    <group ref={groupRef}>
      {visible.map((spec) => (
        <group
          key={`${spec.position[0]}:${spec.position[2]}`}
          position={[spec.position[0], spec.position[1], spec.position[2]]}
          rotation={[spec.rotation[0], spec.rotation[1], spec.rotation[2]]}
        >
          {/* Panel face — dark and slightly specular, catching the rig lights. */}
          {/*
            Steel rather than carbon: at carbon the panel takes so little light
            that it reads as a hole punched in the scene instead of a surface
            hanging in it.
          */}
          <mesh>
            <planeGeometry args={[spec.size[0], spec.size[1]]} />
            <meshStandardMaterial
              color={kookaPalette.steel}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>

          {/*
            Slightly oversized additive quad behind the face. Gives the panel a
            lit edge without a post-processing bloom pass.
          */}
          <mesh position={[0, 0, -0.04]}>
            <planeGeometry args={[spec.size[0] * 1.06, spec.size[1] * 1.09]} />
            <meshBasicMaterial
              color={kookaPalette.amber}
              transparent
              opacity={0.1}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
