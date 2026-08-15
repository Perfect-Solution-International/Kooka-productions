"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  PointsMaterial,
} from "three";
import { kookaPalette } from "./palette";

type ParticleFieldProps = {
  readonly count: number;
  readonly motion: number;
};

/** Volume the motes occupy, matched to the camera's travel down -Z. */
const SPREAD_X = 44;
const SPREAD_Y = 20;
const SPREAD_Z = 62;
const Z_OFFSET = -22;

/**
 * Deterministic stand-in for `Math.random`.
 *
 * The field has to be identical on the server-adjacent first paint and on every
 * reload, and building it has to stay a pure function of the count — a seeded
 * hash gives both, where `Math.random` gives neither.
 */
function noise(seed: number): number {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

type Field = {
  readonly geometry: BufferGeometry;
  readonly material: PointsMaterial;
  readonly speeds: Float32Array;
};

function createField(count: number): Field {
  const positions = new Float32Array(count * 3);
  const colours = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  const warm = new Color(kookaPalette.amber);
  const cool = new Color(kookaPalette.flare);
  const scratch = new Color();

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (noise(index) - 0.5) * SPREAD_X;
    positions[index * 3 + 1] = noise(index + 0.31) * SPREAD_Y;
    positions[index * 3 + 2] = Z_OFFSET + (noise(index + 0.62) - 0.5) * SPREAD_Z;

    scratch.copy(warm).lerp(cool, noise(index + 0.93));
    colours[index * 3] = scratch.r;
    colours[index * 3 + 1] = scratch.g;
    colours[index * 3 + 2] = scratch.b;

    speeds[index] = 0.12 + noise(index + 1.27) * 0.34;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colours, 3));

  return {
    geometry,
    material: new PointsMaterial({
      size: 0.06,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
    speeds,
  };
}

/**
 * Atmospheric haze. Not stars and not confetti — slow-rising motes that give
 * the empty air between the rig and the wall something to read depth against.
 * Positions are advanced on the CPU because the count is small enough that a
 * custom shader would cost more to maintain than it saves.
 */
export function ParticleField({ count, motion }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);

  const { geometry, material, speeds } = useMemo(() => createField(count), [count]);

  useLayoutEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    /* A backgrounded tab can hand back a very large delta on resume. */
    const step = Math.min(delta, 0.05) * motion;
    const attribute = geometry.getAttribute("position") as BufferAttribute;
    const array = attribute.array as Float32Array;

    for (let index = 0; index < speeds.length; index += 1) {
      const axis = index * 3 + 1;
      array[axis] += speeds[index] * step;

      if (array[axis] > SPREAD_Y) array[axis] = 0;
    }

    attribute.needsUpdate = true;
  });

  return <points ref={pointsRef} args={[geometry, material]} />;
}
