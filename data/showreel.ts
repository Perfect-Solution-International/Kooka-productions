import { media } from "./media";

export const showreelCategories = [
  "All",
  "Corporate",
  "Live & Touring",
  "Weddings",
  "Activations",
  "Installations",
] as const;

export type ShowreelCategory = (typeof showreelCategories)[number];

export type ShowreelItem = {
  id: string;
  title: string;
  category: Exclude<ShowreelCategory, "All">;
  format: "video" | "image";
  meta: string;
  duration?: string;
  image: string;
  /** Masonry emphasis inside the filter grid. */
  aspect: "portrait" | "landscape" | "square";
};

export const showreelItems: ShowreelItem[] = [
  {
    id: "sx-summit",
    title: "Southern Cross Summit",
    category: "Corporate",
    format: "video",
    meta: "24m curved LED · 2,400 delegates",
    duration: "1:48",
    image: media.conferenceStage,
    aspect: "landscape",
  },
  {
    id: "ember-tour",
    title: "Ember Nights Tour",
    category: "Live & Touring",
    format: "video",
    meta: "Five capitals · Timecoded show",
    duration: "2:12",
    image: media.touring,
    aspect: "portrait",
  },
  {
    id: "aurelia",
    title: "Aurelia Product Reveal",
    category: "Activations",
    format: "video",
    meta: "Projection mapping · 14m reveal wall",
    duration: "0:54",
    image: media.projection,
    aspect: "square",
  },
  {
    id: "gilded-room",
    title: "The Gilded Room",
    category: "Weddings",
    format: "image",
    meta: "Heritage ballroom · Battery uplighting",
    image: media.weddingReception,
    aspect: "landscape",
  },
  {
    id: "harbour-gala",
    title: "Harbour Gala",
    category: "Corporate",
    format: "image",
    meta: "Awards night · Architectural wash",
    image: media.galaDinner,
    aspect: "portrait",
  },
  {
    id: "meridian-festival",
    title: "Meridian Festival",
    category: "Live & Touring",
    format: "video",
    meta: "Three stages · Weather-rated LED",
    duration: "3:06",
    image: media.festivalNight,
    aspect: "landscape",
  },
  {
    id: "northbank-atrium",
    title: "Northbank Atrium",
    category: "Installations",
    format: "image",
    meta: "Fixed LED & zoned audio",
    image: media.screenArray,
    aspect: "square",
  },
  {
    id: "vertex-launch",
    title: "Vertex Launch",
    category: "Activations",
    format: "image",
    meta: "Retail takeover · Brand activation",
    image: media.runway,
    aspect: "portrait",
  },
  {
    id: "yarra-estate",
    title: "Yarra Estate Wedding",
    category: "Weddings",
    format: "image",
    meta: "Marquee build · Distributed audio",
    image: media.weddingAisle,
    aspect: "landscape",
  },
  {
    id: "civic-assembly",
    title: "Civic Assembly Hall",
    category: "Installations",
    format: "image",
    meta: "Touch-panel control · Staff training",
    image: media.worship,
    aspect: "square",
  },
  {
    id: "grandstand-cup",
    title: "Grandstand Cup",
    category: "Corporate",
    format: "image",
    meta: "Big-screen replay · Open-bowl PA",
    image: media.stadiumNight,
    aspect: "landscape",
  },
  {
    id: "afterglow",
    title: "Afterglow Sessions",
    category: "Live & Touring",
    format: "video",
    meta: "Club series · Beam work & haze",
    duration: "1:22",
    image: media.djDeck,
    aspect: "portrait",
  },
];
