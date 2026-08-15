/**
 * Device-aware scene budget.
 *
 * Everything the scene builds — instance counts, particle counts, light count,
 * shadows, pixel ratio — is read from one of these tables, so a phone never
 * constructs the desktop scene and then throttles it. The tier is resolved once
 * on the client, after mount, because none of these signals exist on the
 * server.
 */
export type QualityTier = "none" | "low" | "medium" | "high";

export type QualitySettings = {
  /** Clamp passed to the renderer's device pixel ratio. */
  readonly dpr: readonly [number, number];
  /** Bays per truss run — drives the instanced lattice segment count. */
  readonly trussBays: number;
  readonly ledColumns: number;
  readonly ledRows: number;
  /** Additive backing quads behind the LED cells, standing in for bloom. */
  readonly ledGlow: boolean;
  /**
   * Scales wall brightness. A portrait viewport puts the wall directly behind
   * the body copy rather than off to the sides, so the phone tiers run it
   * dimmer — the copy has to win on the screen where it has least room.
   */
  readonly ledLevel: number;
  readonly floatingPanels: number;
  readonly beams: number;
  readonly particles: number;
  readonly shadows: boolean;
  /** Multiplier on every idle drift, sweep and camera excursion. */
  readonly motion: number;
};

const settings: Record<Exclude<QualityTier, "none">, QualitySettings> = {
  low: {
    dpr: [1, 1.5],
    trussBays: 4,
    ledColumns: 8,
    ledRows: 5,
    ledGlow: false,
    ledLevel: 0.5,
    floatingPanels: 2,
    beams: 2,
    particles: 260,
    shadows: false,
    motion: 0.55,
  },
  medium: {
    dpr: [1, 1.75],
    trussBays: 6,
    ledColumns: 12,
    ledRows: 7,
    ledGlow: true,
    ledLevel: 0.72,
    floatingPanels: 4,
    beams: 3,
    particles: 620,
    shadows: false,
    motion: 0.8,
  },
  high: {
    dpr: [1, 2],
    trussBays: 9,
    ledColumns: 16,
    ledRows: 9,
    ledGlow: true,
    ledLevel: 1,
    floatingPanels: 6,
    beams: 4,
    particles: 1300,
    shadows: true,
    motion: 1,
  },
};

export function qualitySettings(tier: Exclude<QualityTier, "none">): QualitySettings {
  return settings[tier];
}

type CapabilityNavigator = Navigator & { readonly deviceMemory?: number };

/**
 * Whether a WebGL context can actually be created. A context is made and
 * immediately released — leaving it alive would count against the browser's
 * per-page context limit before the real canvas asks for one.
 */
export function detectWebGL(): boolean {
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return false;

    const lose = gl.getExtension("WEBGL_lose_context");
    lose?.loseContext();

    return true;
  } catch {
    return false;
  }
}

export function resolveQualityTier(): QualityTier {
  if (!detectWebGL()) return "none";

  const nav = navigator as CapabilityNavigator;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const width = window.innerWidth;

  /*
   * A coarse pointer is the strongest signal available for "battery-powered
   * GPU". Even a fast tablet stays a step below the desktop scene.
   */
  if (coarse) {
    return cores >= 8 && memory >= 4 && width >= 768 ? "medium" : "low";
  }

  if (cores <= 4 || memory <= 4 || width < 1024) return "medium";

  return "high";
}
