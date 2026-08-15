"use client";

import type { QualitySettings } from "./quality";
import { kookaPalette } from "./palette";
import { FloatingPanels } from "./FloatingPanels";
import { LEDPanels } from "./LEDPanels";
import { StageStructure } from "./StageStructure";

type ProductionObjectsProps = {
  readonly settings: QualitySettings;
};

/**
 * Everything solid in the venue: the deck, the rig, the wall and the hung
 * panels. Split out from `HeroScene` so lighting, atmosphere and camera stay
 * separately readable.
 */
export function ProductionObjects({ settings }: ProductionObjectsProps) {
  return (
    <group>
      {/*
        Stage deck. Dark and fairly rough so it reads as floor rather than as a
        mirror, while still catching the pools of light under each fixture and
        giving the rig something to stand on.
      */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.02}
        receiveShadow={settings.shadows}
      >
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial
          color={kookaPalette.void}
          metalness={0.34}
          roughness={0.68}
        />
      </mesh>

      <StageStructure bays={settings.trussBays} castShadow={settings.shadows} />

      <LEDPanels
        columns={settings.ledColumns}
        rows={settings.ledRows}
        glow={settings.ledGlow}
        level={settings.ledLevel}
        motion={settings.motion}
      />

      <FloatingPanels count={settings.floatingPanels} motion={settings.motion} />
    </group>
  );
}
