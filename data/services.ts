import { media } from "./media";

export type IconName =
  | "sparkles"
  | "projector"
  | "monitor"
  | "audio-lines"
  | "lightbulb"
  | "layout-panel-top"
  | "radio-tower"
  | "settings-2"
  | "building-2"
  | "presentation"
  | "satellite-dish"
  | "clapperboard"
  | "smartphone";

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  image: string;
  description: string;
  deliverables: readonly string[];
  idealFor: readonly string[];
};

export const services: Service[] = [
  {
    slug: "event-production",
    title: "Event Production",
    icon: "sparkles",
    image: media.conferenceStage,
    description:
      "End-to-end event production covering technical planning, system design, crew coordination, and on-site execution. From concept development to show delivery, we manage logistics, run sheets, rehearsals, and live operations to ensure seamless, high-impact events of any scale.",
    deliverables: ["Production planning", "Crew coordination", "Show calling", "On-site delivery"],
    idealFor: ["Corporate events", "Gala nights", "Brand activations", "Large-scale productions"],
  },
  {
    slug: "av-production",
    title: "Audio Visual Production",
    icon: "projector",
    image: media.controlRoom,
    description:
      "Professional AV solutions delivering high-impact visual and audio experiences across diverse event environments. We design and deploy vision systems, projection, displays, and signal workflows, integrating content playback and multi-screen presentations for reliable and engaging audience delivery.",
    deliverables: ["AV system design", "Projection and displays", "Content playback", "Signal distribution"],
    idealFor: ["Conferences", "Presentations", "Awards nights", "Hybrid events"],
  },
  {
    slug: "led-screens",
    title: "LED Screens",
    icon: "monitor",
    image: media.ledWall,
    description:
      "High-resolution LED display solutions engineered for maximum visual impact across indoor and outdoor events. We provide modular LED systems, custom configurations, and large-scale screen deployments, ensuring brightness, clarity, and seamless integration into any production environment.",
    deliverables: ["LED wall hire", "Custom screen layouts", "Processing and playback", "Installation and operation"],
    idealFor: ["Concerts", "Product launches", "Exhibitions", "Outdoor events"],
  },
  {
    slug: "sound-systems",
    title: "Sound Systems",
    icon: "audio-lines",
    image: media.soundSystem,
    description:
      "Scalable sound systems designed for clarity, coverage, and consistency across any venue or audience size. Our solutions include PA deployment, microphones, monitoring, and digital mixing, tailored to venue acoustics to ensure clear, balanced audio throughout the event.",
    deliverables: ["PA system design", "Digital mixing", "Wireless microphones", "Stage monitoring"],
    idealFor: ["Live music", "Conferences", "Ceremonies", "Public events"],
  },
  {
    slug: "lighting-design",
    title: "Lighting Design",
    icon: "lightbulb",
    image: media.lightBeams,
    description:
      "Creative lighting solutions that enhance atmosphere, visual storytelling, and audience engagement. We design and program stage, architectural, and ambient lighting systems, integrating intelligent fixtures and effects to create immersive environments that elevate the overall event experience.",
    deliverables: ["Lighting design", "Fixture and rig planning", "Console programming", "Live operation"],
    idealFor: ["Stage shows", "Gala dinners", "Brand events", "Architectural lighting"],
  },
  {
    slug: "stage-design",
    title: "Stage & Set Design",
    icon: "layout-panel-top",
    image: media.stageRig,
    description:
      "Custom stage and scenic solutions designed to support both technical performance and visual impact. We deliver stage builds, branded environments, and structural systems, integrating rigging and production elements to create cohesive, functional, and visually striking event spaces.",
    deliverables: ["Stage design", "Set construction", "Scenic integration", "Rigging coordination"],
    idealFor: ["Concerts", "Corporate stages", "Awards nights", "Brand activations"],
  },
  {
    slug: "live-streaming",
    title: "Hybrid & Live Streaming",
    icon: "radio-tower",
    image: media.broadcast,
    description:
      "Scalable hybrid and live streaming solutions connecting in-person and remote audiences through reliable, broadcast-quality workflows. We deliver multi-camera production, platform integration, recording, and redundant streaming systems to ensure seamless delivery across digital and live environments.",
    deliverables: ["Multi-camera production", "Streaming platform integration", "Event recording", "Redundant delivery"],
    idealFor: ["Hybrid conferences", "Webinars", "Live performances", "Corporate broadcasts"],
  },
  {
    slug: "technical-production",
    title: "Technical Production Management",
    icon: "settings-2",
    image: media.audioDesk,
    description:
      "End-to-end technical direction ensuring seamless coordination across all production elements. We manage system design, vendor collaboration, and on-site execution, overseeing workflows, troubleshooting, and show delivery to maintain efficiency, reliability, and high production standards.",
    deliverables: ["Technical direction", "System documentation", "Vendor coordination", "Show-site management"],
    idealFor: ["Complex productions", "Multi-vendor events", "Touring shows", "Venue events"],
  },
  {
    slug: "permanent-installations",
    title: "Permanent Installations",
    icon: "building-2",
    image: media.screenArray,
    description:
      "Integrated AV and production systems designed for long-term use across venues, studios, and corporate environments. We handle system design, installation, commissioning, and optimisation, delivering reliable infrastructure supported by ongoing maintenance and technical support.",
    deliverables: ["System design", "Equipment installation", "Commissioning", "Ongoing support"],
    idealFor: ["Venues", "Corporate offices", "Studios", "Education spaces"],
  },
  {
    slug: "projection",
    title: "Projection",
    icon: "presentation",
    image: media.projection,
    description:
      "Large-format projection and projection mapping that turns stages, buildings and scenic surfaces into living canvases. We handle lens and throw calculations, blending, warping and media server playback to deliver bright, seamless imagery in any venue.",
    deliverables: ["Projection mapping", "Edge blending and warping", "Media server playback", "Lens and throw design"],
    idealFor: ["Building projections", "Immersive rooms", "Theatre and stage shows", "Product reveals"],
  },
  {
    slug: "broadcast",
    title: "Broadcast",
    icon: "satellite-dish",
    image: media.mixingConsole,
    description:
      "Broadcast-grade capture and delivery for events that need to look and sound like television. We build multi-camera setups, vision mixing, comms and encoding chains with redundant paths, so the feed stays clean from the venue to air.",
    deliverables: ["Multi-camera capture", "Vision mixing and graphics", "Comms and talkback", "Encoding and contribution feeds"],
    idealFor: ["Televised events", "Sports coverage", "Media launches", "Broadcast partnerships"],
  },
  {
    slug: "content-creation",
    title: "Content Creation & Services",
    icon: "clapperboard",
    image: media.studioMonitor,
    description:
      "Creative content built for the screens we supply. From motion graphics and stage visuals to event films, photography and post-production, we produce assets sized and formatted for LED walls, projection canvases and streaming platforms.",
    deliverables: ["Motion graphics and stage visuals", "Event videography and photography", "Editing and post-production", "Screen-ready asset formatting"],
    idealFor: ["Brand campaigns", "Conference openers", "Highlight reels", "Social and digital content"],
  },
  {
    slug: "online-events",
    title: "Online Events & Event Apps",
    icon: "smartphone",
    image: media.workspace,
    description:
      "Virtual event platforms and custom event apps that carry your programme, audience and data online. We configure registration, agendas, live Q&A, polling and networking, then connect them to the live production for one joined-up experience.",
    deliverables: ["Virtual event platforms", "Custom event apps", "Registration and ticketing", "Live polling, Q&A and analytics"],
    idealFor: ["Virtual conferences", "Hybrid summits", "Member and trade events", "Internal town halls"],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
