"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "three";
import { kookaPalette } from "./palette";

type StageStructureProps = {
  readonly bays: number;
  readonly castShadow: boolean;
};

const UP = new Vector3(0, 1, 0);

/** Square section of a truss run, in scene units. */
const TRUSS_WIDTH = 0.44;
const CHORD_THICKNESS = 0.075;
const BRACE_THICKNESS = 0.045;

type Run = {
  readonly from: Vector3;
  readonly to: Vector3;
};

/**
 * The rig: two vertical towers, the overhead span they carry, and a pair of
 * outrigger booms set further back. Read as a stage frame from the hero camera
 * and as a receding structure once the camera has travelled past them.
 */
const runs: readonly Run[] = [
  { from: new Vector3(-6.4, 0, 0), to: new Vector3(-6.4, 9.2, 0) },
  { from: new Vector3(6.4, 0, 0), to: new Vector3(6.4, 9.2, 0) },
  { from: new Vector3(-6.4, 9.2, 0), to: new Vector3(6.4, 9.2, 0) },
  { from: new Vector3(-9.6, 0, -9), to: new Vector3(-9.6, 7.4, -9) },
  { from: new Vector3(9.6, 0, -9), to: new Vector3(9.6, 7.4, -9) },
];

/**
 * Composes the transform for a unit box stretched between two points. The box
 * is built along Y, so the rotation is whatever takes Y onto the segment.
 */
function composeSegment(
  a: Vector3,
  b: Vector3,
  thickness: number,
  target: Matrix4,
): Matrix4 {
  const direction = new Vector3().subVectors(b, a);
  const length = direction.length();
  const midpoint = new Vector3().addVectors(a, b).multiplyScalar(0.5);
  const rotation = new Quaternion().setFromUnitVectors(
    UP,
    direction.clone().normalize(),
  );

  return target.compose(
    midpoint,
    rotation,
    new Vector3(thickness, length, thickness),
  );
}

/**
 * Four corner chords plus alternating diagonal braces on the two long faces —
 * the standard box-truss pattern, which is what makes the silhouette read as
 * stage hardware rather than as a lattice of arbitrary sticks.
 */
function buildRun(run: Run, bays: number): Matrix4[] {
  const matrices: Matrix4[] = [];

  const axis = new Vector3().subVectors(run.to, run.from);
  const length = axis.length();
  const forward = axis.clone().normalize();

  /* Two directions perpendicular to the run, spanning its square section. */
  const sideA = new Vector3()
    .crossVectors(forward, Math.abs(forward.y) > 0.9 ? new Vector3(0, 0, 1) : UP)
    .normalize();
  const sideB = new Vector3().crossVectors(forward, sideA).normalize();

  const half = TRUSS_WIDTH / 2;
  const corners = [
    sideA.clone().multiplyScalar(half).add(sideB.clone().multiplyScalar(half)),
    sideA.clone().multiplyScalar(half).add(sideB.clone().multiplyScalar(-half)),
    sideA.clone().multiplyScalar(-half).add(sideB.clone().multiplyScalar(half)),
    sideA.clone().multiplyScalar(-half).add(sideB.clone().multiplyScalar(-half)),
  ];

  for (const offset of corners) {
    matrices.push(
      composeSegment(
        run.from.clone().add(offset),
        run.to.clone().add(offset),
        CHORD_THICKNESS,
        new Matrix4(),
      ),
    );
  }

  const bayLength = length / bays;

  for (let bay = 0; bay < bays; bay += 1) {
    const near = run.from.clone().addScaledVector(forward, bay * bayLength);
    const far = run.from.clone().addScaledVector(forward, (bay + 1) * bayLength);

    /* Zigzag: the diagonal flips each bay, on both long faces. */
    const flip = bay % 2 === 0;

    for (const face of [half, -half]) {
      const faceOffset = sideB.clone().multiplyScalar(face);
      const lowSide = sideA.clone().multiplyScalar(flip ? half : -half);
      const highSide = sideA.clone().multiplyScalar(flip ? -half : half);

      matrices.push(
        composeSegment(
          near.clone().add(faceOffset).add(lowSide),
          far.clone().add(faceOffset).add(highSide),
          BRACE_THICKNESS,
          new Matrix4(),
        ),
      );
    }
  }

  return matrices;
}

export function StageStructure({ bays, castShadow }: StageStructureProps) {
  const meshRef = useRef<InstancedMesh>(null);

  const matrices = useMemo(
    () => runs.flatMap((run) => buildRun(run, bays)),
    [bays],
  );

  const geometry = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const material = useMemo(
    () =>
      /*
       * Light enough to catch the rig spots. At the darker steel the lattice
       * silhouettes read as pure black against a dark room and the structure
       * disappears entirely.
       */
      new MeshStandardMaterial({
        color: kookaPalette.ash,
        metalness: 0.84,
        roughness: 0.32,
      }),
    [],
  );

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    matrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [matrices]);

  useLayoutEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, matrices.length]}
      castShadow={castShadow}
      receiveShadow={castShadow}
    />
  );
}
