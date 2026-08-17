import { media } from "./media";

export type FootprintCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export const footprintCategories: FootprintCategory[] = [
  {
    slug: "business-corporate-events",
    title: "Business & Corporate Events",
    description:
      "Professional AV and production solutions for corporate events, presentations, and brand-led experiences.",
    image: media.boardroom,
  },
  {
    slug: "conferences-meetings",
    title: "Conferences & Meetings",
    description:
      "Seamless multi-room AV, presentation systems, and hybrid delivery for conferences and business events.",
    image: media.conferenceHall,
  },
  {
    slug: "product-launch-events",
    title: "Product Launch Events",
    description:
      "High-impact production designed to showcase products through immersive visuals, staging, and lighting.",
    image: media.expo,
  },
  {
    slug: "brand-activations",
    title: "Brand Activations",
    description:
      "Interactive production environments that connect brands with audiences through engaging and memorable experiences.",
    image: media.runway,
  },
  {
    slug: "gala-awards-nights",
    title: "Gala & Awards Nights",
    description:
      "Elegant staging, lighting, and AV solutions tailored for formal events and award presentations.",
    image: media.galaDinner,
  },
  {
    slug: "live-shows-touring",
    title: "Live Shows & Touring",
    description:
      "Scalable production systems for live performances, touring shows, and entertainment-driven events.",
    image: media.touring,
  },
  {
    slug: "festivals-outdoor-events",
    title: "Festivals & Outdoor Events",
    description:
      "Large-scale production for festivals and outdoor events with high-impact visuals and sound.",
    image: media.festivalNight,
  },
  {
    slug: "sporting-events",
    title: "Sporting Events",
    description:
      "Production solutions enhancing live sporting experiences with screens, audio, and broadcast integration.",
    image: media.sportArena,
  },
  {
    slug: "community-public-events",
    title: "Community & Public Events",
    description:
      "Flexible AV and production setups designed for diverse audiences and open public environments.",
    image: media.community,
  },
  {
    slug: "worship-church-events",
    title: "Worship & Church Events",
    description:
      "Reliable AV, lighting, and streaming solutions for worship services and community engagement.",
    image: media.worship,
  },
];
