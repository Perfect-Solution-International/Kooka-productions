/**
 * Scene palette.
 *
 * The greys and the amber family are the design tokens from `app/globals.css`,
 * repeated here because Three.js materials cannot read CSS custom properties.
 * Keep the two in step.
 *
 * `logoTeal` and `logoRose` are sampled from the facets of
 * `public/Logo-kooka.png` and are used sparingly — a handful of LED cells — so
 * the wall reads as a real multi-colour panel array rather than a flat amber
 * block, without pulling the page away from the brand's amber identity.
 */
export const kookaPalette = {
  void: "#050505",
  carbon: "#101010",
  steel: "#1f1f1f",
  ash: "#2a2a2a",
  mist: "#a3a3a3",
  amber: "#ffb020",
  ember: "#ff7a18",
  flare: "#ffd479",
  logoTeal: "#58a888",
  logoRose: "#c83858",
} as const;

/** Cell colours for the LED wall, weighted towards the brand amber. */
export const ledColours = [
  kookaPalette.amber,
  kookaPalette.ember,
  kookaPalette.flare,
  kookaPalette.amber,
  kookaPalette.ember,
  kookaPalette.flare,
  kookaPalette.amber,
  kookaPalette.logoTeal,
  kookaPalette.logoRose,
] as const;
