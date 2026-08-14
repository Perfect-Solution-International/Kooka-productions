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
  | "building-2";

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  image: string;
  description: string;
};

export const services: Service[] = [
  {
    slug: "event-production",
    title: "Event Production",
    icon: "sparkles",
    image: media.conferenceStage,
    description:
      "End-to-end event production covering technical planning, system design, crew coordination, and on-site execution. From concept development to show delivery, we manage logistics, run sheets, rehearsals, and live operations to ensure seamless, high-impact events of any scale.",
  },
  {
    slug: "av-production",
    title: "Audio Visual Production",
    icon: "projector",
    image: media.controlRoom,
    description:
      "Professional AV solutions delivering high-impact visual and audio experiences across diverse event environments. We design and deploy vision systems, projection, displays, and signal workflows, integrating content playback and multi-screen presentations for reliable and engaging audience delivery.",
  },
  {
    slug: "led-screens",
    title: "LED Screens",
    icon: "monitor",
    image: media.ledWall,
    description:
      "High-resolution LED display solutions engineered for maximum visual impact across indoor and outdoor events. We provide modular LED systems, custom configurations, and large-scale screen deployments, ensuring brightness, clarity, and seamless integration into any production environment.",
  },
  {
    slug: "sound-systems",
    title: "Sound Systems",
    icon: "audio-lines",
    image: media.soundSystem,
    description:
      "Scalable sound systems designed for clarity, coverage, and consistency across any venue or audience size. Our solutions include PA deployment, microphones, monitoring, and digital mixing, tailored to venue acoustics to ensure clear, balanced audio throughout the event.",
  },
  {
    slug: "lighting-design",
    title: "Lighting Design",
    icon: "lightbulb",
    image: media.lightBeams,
    description:
      "Creative lighting solutions that enhance atmosphere, visual storytelling, and audience engagement. We design and program stage, architectural, and ambient lighting systems, integrating intelligent fixtures and effects to create immersive environments that elevate the overall event experience.",
  },
  {
    slug: "stage-design",
    title: "Stage & Set Design",
    icon: "layout-panel-top",
    image: media.stageRig,
    description:
      "Custom stage and scenic solutions designed to support both technical performance and visual impact. We deliver stage builds, branded environments, and structural systems, integrating rigging and production elements to create cohesive, functional, and visually striking event spaces.",
  },
  {
    slug: "live-streaming",
    title: "Hybrid & Live Streaming",
    icon: "radio-tower",
    image: media.broadcast,
    description:
      "Scalable hybrid and live streaming solutions connecting in-person and remote audiences through reliable, broadcast-quality workflows. We deliver multi-camera production, platform integration, recording, and redundant streaming systems to ensure seamless delivery across digital and live environments.",
  },
  {
    slug: "technical-production",
    title: "Technical Production Management",
    icon: "settings-2",
    image: media.audioDesk,
    description:
      "End-to-end technical direction ensuring seamless coordination across all production elements. We manage system design, vendor collaboration, and on-site execution, overseeing workflows, troubleshooting, and show delivery to maintain efficiency, reliability, and high production standards.",
  },
  {
    slug: "permanent-installations",
    title: "Permanent Installations",
    icon: "building-2",
    image: media.screenArray,
    description:
      "Integrated AV and production systems designed for long-term use across venues, studios, and corporate environments. We handle system design, installation, commissioning, and optimisation, delivering reliable infrastructure supported by ongoing maintenance and technical support.",
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
