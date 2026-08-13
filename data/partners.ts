export type ProducerPartner = {
  /** Set as supplied — casing is part of each mark. */
  name: string;
  /** lucide glyph standing in until real logo files arrive. */
  glyph:
    | "circle-dashed"
    | "sparkle"
    | "box"
    | "hexagon"
    | "waves"
    | "link"
    | "shuffle";
};

/** Worldwide producer partners shown as a static logo lockup. */
export const producerPartners: ProducerPartner[] = [
  { name: "Segment", glyph: "circle-dashed" },
  { name: "luminous", glyph: "sparkle" },
  { name: "Lightbox", glyph: "box" },
  { name: "Sphonic", glyph: "hexagon" },
  { name: "Luminous", glyph: "waves" },
  { name: "Interlock", glyph: "link" },
  { name: "Nextmove", glyph: "shuffle" },
];

/** Name-only list, for the marquee treatment used on /about. */
export const partners = producerPartners.map((partner) => partner.name);
