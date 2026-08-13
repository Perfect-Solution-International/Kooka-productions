import { media } from "./media";

export type FootprintItem = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  /** Grid emphasis — `wide` and `tall` items break the rhythm of the layout. */
  span?: "wide" | "tall" | "default";
};

export const footprint: FootprintItem[] = [
  {
    slug: "corporate-events",
    title: "Corporate Events",
    blurb:
      "Board dinners, staff kick-offs and national roadshows delivered with the discretion a corporate calendar demands.",
    image: media.summit,
    span: "wide",
  },
  {
    slug: "conferences",
    title: "Conferences",
    blurb:
      "Multi-day, multi-room plenary programs with redundant vision and speaker management that never stalls the agenda.",
    image: media.conferenceHall,
  },
  {
    slug: "product-launches",
    title: "Product Launches",
    blurb:
      "Reveal moments engineered to the second — projection mapping, timecoded lighting and a room that holds its breath.",
    image: media.projection,
  },
  {
    slug: "brand-activations",
    title: "Brand Activations",
    blurb:
      "Pop-ups, retail takeovers and experiential builds that put a brand into a physical space people want to photograph.",
    image: media.runway,
    span: "tall",
  },
  {
    slug: "gala-nights",
    title: "Gala Nights",
    blurb:
      "Awards, fundraisers and black-tie dinners with architectural lighting, clean audio and a show that runs to time.",
    image: media.galaDinner,
  },
  {
    slug: "live-touring",
    title: "Live Touring",
    blurb:
      "Repeatable, truck-packed production packages that load in fast and look identical in every city on the run.",
    image: media.touring,
  },
  {
    slug: "festivals",
    title: "Festivals",
    blurb:
      "Multi-stage outdoor builds with weather-rated LED, distributed delay systems and crew who thrive on site logistics.",
    image: media.festivalNight,
    span: "wide",
  },
  {
    slug: "sporting-events",
    title: "Sporting Events",
    blurb:
      "Big-screen replay, PA coverage across open bowls and presentation staging built for fast turnarounds.",
    image: media.stadiumNight,
  },
  {
    slug: "community-gatherings",
    title: "Community Gatherings",
    blurb:
      "Council events, cultural festivals and local celebrations scaled sensibly to the budget without cutting safety.",
    image: media.community,
  },
  {
    slug: "worship-events",
    title: "Worship Events",
    blurb:
      "Services, conferences and installations for houses of worship, with systems in-house volunteers can confidently run.",
    image: media.worship,
    span: "tall",
  },
];
