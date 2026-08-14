export type ProducerPartner = {
  /** Set as supplied — casing is part of each mark. */
  name: string;
  /** lucide glyph standing in until real logo files arrive. */
  glyph:
    | "moon"
    | "sun"
    | "box"
    | "circle-x"
    | "layers"
    | "circle-slash"
    | "sparkle";
};

/** Worldwide producer partners shown as a static logo lockup. */
export const producerPartners: ProducerPartner[] = [
  { name: "Segment", glyph: "moon" },
  { name: "luminous", glyph: "sun" },
  { name: "Lightbox", glyph: "box" },
  { name: "Sphonic", glyph: "circle-x" },
  { name: "Luminous", glyph: "layers" },
  { name: "Interlock", glyph: "circle-slash" },
  { name: "Nextmove", glyph: "sparkle" },
];
