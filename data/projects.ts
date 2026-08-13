import { media } from "./media";

export type Project = {
  title: string;
  client: string;
  type: string;
  location: string;
  year: string;
  summary: string;
  image: string;
};

export const featuredProjects: Project[] = [
  {
    title: "Southern Cross Summit",
    client: "National Corporate Client",
    type: "Corporate Conference",
    location: "Melbourne Convention Centre",
    year: "2025",
    summary:
      "A 24-metre curved LED canvas, dual-redundant vision and a three-day plenary program delivered for 2,400 delegates.",
    image: media.conferenceStage,
  },
  {
    title: "Ember Nights Tour",
    client: "International Touring Artist",
    type: "Live Touring",
    location: "Five cities, Australia",
    year: "2025",
    summary:
      "Full production package touring five capitals — line array, moving light rig and timecoded show control on a two-truck load.",
    image: media.touring,
  },
  {
    title: "Aurelia Product Reveal",
    client: "Luxury Automotive Brand",
    type: "Product Launch",
    location: "Docklands, Melbourne",
    year: "2024",
    summary:
      "Projection mapping across a 14-metre reveal wall, synchronised haze and lighting cue stack for a 90-second unveil.",
    image: media.projection,
  },
  {
    title: "The Gilded Room",
    client: "Private Commission",
    type: "Luxury Wedding",
    location: "Yarra Valley, Victoria",
    year: "2025",
    summary:
      "Warm architectural wash across a heritage ballroom, discreet distributed audio and a battery-powered uplighting plot.",
    image: media.weddingReception,
  },
];
