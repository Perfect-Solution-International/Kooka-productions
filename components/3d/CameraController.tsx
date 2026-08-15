"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { FogExp2, MathUtils, Vector3 } from "three";
import { attachSceneInput, readSceneInput } from "@/lib/sceneInput";

type CameraControllerProps = {
  /** Scales the pointer excursion and the damping response. */
  readonly motion: number;
  /** Freezes idle easing so a scroll maps straight to a camera position. */
  readonly reducedMotion: boolean;
};

type Waypoint = {
  readonly at: number;
  readonly position: readonly [number, number, number];
  readonly target: readonly [number, number, number];
  readonly exposure: number;
  readonly fog: number;
};

/**
 * The move, as a single continuous dolly rather than one scene per section.
 *
 * The camera starts outside the rig framing the towers, travels in through the
 * overhead span and settles looking down the room. It deliberately stops well
 * short of the LED wall: flying up to it fills the frame with colour blocks and
 * leaves the copy sitting on top of them. Exposure and fog fall together along
 * the way, so by the time the reader is in the body copy the scene behind it
 * has dimmed to atmosphere and stopped competing with the type.
 */
const path: readonly Waypoint[] = [
  { at: 0, position: [0, 1.7, 15.5], target: [0, 3, -8], exposure: 1.1, fog: 0.021 },
  { at: 0.2, position: [0.7, 2.4, 10], target: [0, 3.2, -12], exposure: 0.86, fog: 0.032 },
  { at: 0.45, position: [-1.2, 3.2, 4], target: [0.6, 3.4, -16], exposure: 0.66, fog: 0.042 },
  { at: 0.72, position: [1.3, 4, -1], target: [0, 3.4, -22], exposure: 0.56, fog: 0.05 },
  { at: 1, position: [0, 4.6, -6], target: [0, 3.2, -28], exposure: 0.5, fog: 0.056 },
];

const POINTER_X = 0.85;
const POINTER_Y = 0.5;

function segmentAt(progress: number): {
  readonly from: Waypoint;
  readonly to: Waypoint;
  readonly t: number;
} {
  for (let index = 0; index < path.length - 1; index += 1) {
    const from = path[index];
    const to = path[index + 1];

    if (progress <= to.at || index === path.length - 2) {
      const span = to.at - from.at;
      const t = span > 0 ? MathUtils.clamp((progress - from.at) / span, 0, 1) : 0;

      return { from, to, t };
    }
  }

  return { from: path[0], to: path[1], t: 0 };
}

/**
 * Per-frame working state.
 *
 * Built on the first frame rather than during render: these are mutated every
 * frame, and a value created while rendering must not be written to afterwards.
 */
type Rig = {
  readonly desiredPosition: Vector3;
  readonly desiredTarget: Vector3;
  readonly smoothedTarget: Vector3;
  primed: boolean;
};

function createRig(): Rig {
  return {
    desiredPosition: new Vector3(),
    desiredTarget: new Vector3(),
    smoothedTarget: new Vector3(0, 3, -6),
    primed: false,
  };
}

export function CameraController({
  motion,
  reducedMotion,
}: CameraControllerProps) {
  const rigRef = useRef<Rig | null>(null);

  useEffect(() => attachSceneInput(), []);

  useFrame((state, delta) => {
    rigRef.current ??= createRig();

    const rig = rigRef.current;
    const { desiredPosition, desiredTarget, smoothedTarget } = rig;
    const input = readSceneInput();
    const step = Math.min(delta, 0.05);

    const { from, to, t } = segmentAt(input.scroll);
    /* Smoothstep across each leg so the joins between waypoints are invisible. */
    const eased = t * t * (3 - 2 * t);

    desiredPosition.set(
      MathUtils.lerp(from.position[0], to.position[0], eased),
      MathUtils.lerp(from.position[1], to.position[1], eased),
      MathUtils.lerp(from.position[2], to.position[2], eased),
    );
    desiredTarget.set(
      MathUtils.lerp(from.target[0], to.target[0], eased),
      MathUtils.lerp(from.target[1], to.target[1], eased),
      MathUtils.lerp(from.target[2], to.target[2], eased),
    );

    if (!reducedMotion) {
      /*
       * Pointer parallax is an offset on the path, never a replacement for it,
       * so the camera cannot be dragged away from the composition.
       */
      desiredPosition.x += input.pointerX * POINTER_X * motion;
      desiredPosition.y -= input.pointerY * POINTER_Y * motion;
      desiredTarget.x += input.pointerX * 0.4 * motion;
    }

    if (rig.primed && !reducedMotion) {
      state.camera.position.set(
        MathUtils.damp(state.camera.position.x, desiredPosition.x, 3.4, step),
        MathUtils.damp(state.camera.position.y, desiredPosition.y, 3.4, step),
        MathUtils.damp(state.camera.position.z, desiredPosition.z, 4.2, step),
      );

      smoothedTarget.set(
        MathUtils.damp(smoothedTarget.x, desiredTarget.x, 3, step),
        MathUtils.damp(smoothedTarget.y, desiredTarget.y, 3, step),
        MathUtils.damp(smoothedTarget.z, desiredTarget.z, 3, step),
      );
    } else {
      /* First frame, and every frame under reduced motion, lands exactly. */
      state.camera.position.copy(desiredPosition);
      smoothedTarget.copy(desiredTarget);
      rig.primed = true;
    }

    state.camera.lookAt(smoothedTarget);

    const exposure = MathUtils.lerp(from.exposure, to.exposure, eased);
    state.gl.toneMappingExposure = MathUtils.damp(
      state.gl.toneMappingExposure,
      exposure,
      4,
      step,
    );

    const fog = state.scene.fog;
    if (fog instanceof FogExp2) {
      fog.density = MathUtils.damp(
        fog.density,
        MathUtils.lerp(from.fog, to.fog, eased),
        4,
        step,
      );
    }
  });

  return null;
}
