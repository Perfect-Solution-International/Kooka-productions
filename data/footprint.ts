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
    title: "Business & Corporate Events",
    blurb:
      "Professional AV and production solutions for corporate events, presentations, and brand-led experiences.",
    image: media.summit,
    span: "wide",
  },
  {
    slug: "conferences",
    title: "Conferences & Meetings",
    blurb:
      "Seamless multi-room AV, presentation systems, and hybrid delivery for conferences and business events.",
    image: media.conferenceHall,
  },
  {
    slug: "product-launches",
    title: "Product Launch Events",
    blurb:
      "High-impact production designed to showcase products through immersive visuals, staging, and lighting.",
    image: media.projection,
  },
  {
    slug: "brand-activations",
    title: "Brand Activations",
    blurb:
      "Interactive production environments that connect brands with audiences through engaging and memorable experiences.",
    image: media.runway,
    span: "tall",
  },
  {
    slug: "gala-nights",
    title: "Gala & Awards Nights",
    blurb:
      "Elegant staging, lighting, and AV solutions tailored for formal events and award presentations.",
    image: media.galaDinner,
  },
  {
    slug: "live-touring",
    title: "Live Shows & Touring",
    blurb:
      "Scalable production systems for live performances, touring shows, and entertainment-driven events.",
    image: media.touring,
  },
  {
    slug: "festivals",
    title: "Festivals & Outdoor Events",
    blurb:
      "Large-scale production for festivals and outdoor events with high-impact visuals and sound.",
    image: media.festivalNight,
    span: "wide",
  },
  {
    slug: "sporting-events",
    title: "Sporting Events",
    blurb:
      "Production solutions enhancing live sporting experiences with screens, audio, and broadcast integration.",
    image: media.stadiumNight,
  },
  {
    slug: "community-gatherings",
    title: "Community & Public Events",
    blurb:
      "Flexible AV and production setups designed for diverse audiences and open public environments.",
    image: media.community,
  },
  {
    slug: "worship-events",
    title: "Worship & Church Events",
    blurb:
      "Reliable AV, lighting, and streaming solutions for worship services and community engagement.",
    image: media.worship,
    span: "tall",
  },
];
