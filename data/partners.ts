import { media } from "./media";

/** Worldwide producer partners shown in the infinite logo ticker. */
export const partners = [
  "Segment",
  "Luminous",
  "Lightbox",
  "Sphonic",
  "Interlock",
  "Nextmove",
] as const;

export type VenueTile = {
  /** Label that fades in over the tile on hover. */
  name: string;
  image: string;
  /** Mixed-size cinematic grid emphasis — two tiles run large. */
  size: "sm" | "lg";
};

export const venues: VenueTile[] = [
  { name: "Corporate Event", image: media.conferenceHall, size: "lg" },
  { name: "Festival Production", image: media.festival, size: "sm" },
  { name: "Wedding Production", image: media.weddingTable, size: "sm" },
  { name: "LED Screen Setup", image: media.ledWall, size: "lg" },
  { name: "Lighting Design", image: media.lightBeams, size: "sm" },
  { name: "Live Production", image: media.stageRig, size: "sm" },
];
