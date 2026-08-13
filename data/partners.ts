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
  name: string;
  meta: string;
  image: string;
  /** Mixed-size cinematic grid emphasis. */
  size: "sm" | "md" | "lg";
};

export const venues: VenueTile[] = [
  {
    name: "Convention Centres",
    meta: "Plenary & exhibition halls",
    image: media.conferenceHall,
    size: "lg",
  },
  {
    name: "Arenas & Stadiums",
    meta: "Large-format live",
    image: media.arena,
    size: "md",
  },
  {
    name: "Heritage Ballrooms",
    meta: "Luxury celebrations",
    image: media.galaDinner,
    size: "sm",
  },
  {
    name: "Outdoor Festival Sites",
    meta: "Multi-stage builds",
    image: media.festival,
    size: "md",
  },
  {
    name: "Theatres & Auditoriums",
    meta: "Fixed installations",
    image: media.stageRig,
    size: "sm",
  },
  {
    name: "Winery & Estate Venues",
    meta: "Regional Victoria",
    image: media.weddingTable,
    size: "md",
  },
];
