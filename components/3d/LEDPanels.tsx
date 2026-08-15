"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  Euler,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";
import { ledColours, kookaPalette } from "./palette";

type LEDPanelsProps = {
  readonly columns: number;
  readonly rows: number;
  readonly glow: boolean;
  /** Scales the whole wall's brightness. See `ledLevel` in `quality.ts`. */
  readonly level: number;
  readonly motion: number;
};

/**
 * Curve radius and centre of the wall, set so the nearest panel sits around
 * z = -32 — far enough that the cells read as an array of panels across the
 * back of a room. Pulled closer, the same instance count reads as a handful of
 * enormous colour blocks, which is wallpaper rather than a venue.
 */
const RADIUS = 30;
const CENTRE_Z = -2;
const ARC = 0.7;
const BASE_Y = 1.9;
const CELL_GAP = 0.05;

type Cell = {
  readonly matrix: Matrix4;
  readonly glowMatrix: Matrix4;
  readonly colour: Color;
  /** Position along the travelling brightness wave. */
  readonly phase: number;
};

function buildCells(columns: number, rows: number): Cell[] {
  const cells: Cell[] = [];

  const cellWidth = (RADIUS * ARC) / columns;
  const cellHeight = cellWidth * 0.62;

  for (let column = 0; column < columns; column += 1) {
    const t = columns === 1 ? 0.5 : column / (columns - 1);
    const angle = (t - 0.5) * ARC;

    const x = Math.sin(angle) * RADIUS;
    const z = CENTRE_Z - Math.cos(angle) * RADIUS;

    for (let row = 0; row < rows; row += 1) {
      const y = BASE_Y + row * (cellHeight + CELL_GAP);

      const position = new Vector3(x, y, z);
      /* Each cell faces the centre of the arc, like a real curved wall. */
      const rotation = new Quaternion().setFromEuler(new Euler(0, -angle, 0));
      const scale = new Vector3(cellWidth - CELL_GAP, cellHeight, 1);

      cells.push({
        matrix: new Matrix4().compose(position, rotation, scale),
        glowMatrix: new Matrix4().compose(
          position.clone().add(new Vector3(0, 0, -0.05)),
          rotation,
          scale.clone().multiplyScalar(1.5),
        ),
        colour: new Color(ledColours[(column * rows + row) % ledColours.length]),
        phase: t * 5 + row * 0.35,
      });
    }
  }

  return cells;
}

/**
 * The LED wall. A slow brightness wave travels across the array rather than
 * every cell pulsing together, which is what a content feed running on a real
 * wall looks like from a distance. Brightness is written straight into the
 * instance colour buffer, so the whole wall is one draw call and no React
 * state changes per frame.
 */
export function LEDPanels({ columns, rows, glow, level, motion }: LEDPanelsProps) {
  const panelRef = useRef<InstancedMesh>(null);
  const glowRef = useRef<InstancedMesh>(null);
  const scratch = useMemo(() => new Color(), []);

  const cells = useMemo(() => buildCells(columns, rows), [columns, rows]);

  const geometry = useMemo(() => new PlaneGeometry(1, 1), []);
  const panelMaterial = useMemo(
    () => new MeshBasicMaterial({ toneMapped: false }),
    [],
  );
  const glowMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: kookaPalette.ember,
        transparent: true,
        opacity: 0.05,
        blending: AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  useLayoutEffect(() => {
    const panels = panelRef.current;
    if (!panels) return;

    cells.forEach((cell, index) => {
      panels.setMatrixAt(index, cell.matrix);
      /*
       * Seeded at the wave's midpoint rather than at the cell's own colour, so
       * the first painted frame is not a full-brightness flash of the whole
       * wall before the render loop takes the levels over.
       */
      panels.setColorAt(
        index,
        scratch.copy(cell.colour).multiplyScalar(0.39 * level),
      );
    });
    panels.instanceMatrix.needsUpdate = true;
    if (panels.instanceColor) panels.instanceColor.needsUpdate = true;
    panels.computeBoundingSphere();

    const glows = glowRef.current;
    if (!glows) return;

    cells.forEach((cell, index) => glows.setMatrixAt(index, cell.glowMatrix));
    glows.instanceMatrix.needsUpdate = true;
    glows.computeBoundingSphere();
  }, [cells, level, scratch]);

  useLayoutEffect(
    () => () => {
      geometry.dispose();
      panelMaterial.dispose();
      glowMaterial.dispose();
    },
    [geometry, panelMaterial, glowMaterial],
  );

  useFrame((state) => {
    const panels = panelRef.current;
    if (!panels) return;

    const time = state.clock.elapsedTime * 0.42 * motion;

    for (let index = 0; index < cells.length; index += 1) {
      const cell = cells[index];
      const wave = Math.sin(time - cell.phase);
      /*
       * Never fully dark, and never near full brightness. The wall is the lit
       * surface at the back of the room, not a light source pointed at the
       * reader — the headline sits in front of it and has to win.
       */
      const brightness = (0.16 + wave * wave * 0.46) * level;

      scratch.copy(cell.colour).multiplyScalar(brightness);
      panels.setColorAt(index, scratch);
    }

    if (panels.instanceColor) panels.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={panelRef}
        args={[geometry, panelMaterial, cells.length]}
      />
      {glow ? (
        <instancedMesh
          ref={glowRef}
          args={[geometry, glowMaterial, cells.length]}
        />
      ) : null}
    </group>
  );
}
