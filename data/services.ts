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
  short: string;
  tagline: string;
  icon: IconName;
  image: string;
  description: string;
  capabilities: string[];
  specs: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    slug: "event-production",
    title: "Event Production",
    short: "End-to-end delivery",
    tagline: "Concept to closing night, held by one team.",
    icon: "sparkles",
    image: media.conferenceStage,
    description:
      "Full-scope event production covering creative concepting, technical design, supplier coordination, run-sheet management and on-site delivery. We own the plan from the first site visit to the final flight case leaving the dock, so producers deal with one accountable team instead of five vendors.",
    capabilities: [
      "Creative concepting and show design",
      "Technical drawings, plots and CAD renders",
      "Venue liaison, bump-in and bump-out scheduling",
      "Crew rostering and supplier coordination",
      "Risk assessments, SWMS and compliance documentation",
      "On-site production management and show calling",
    ],
    specs: [
      { label: "Scale", value: "50 – 20,000 guests" },
      { label: "Lead time", value: "From 72 hours" },
      { label: "Coverage", value: "Australia-wide" },
    ],
  },
  {
    slug: "av-production",
    title: "Audio Visual Production",
    short: "Vision, audio, control",
    tagline: "Broadcast-grade signal flow, invisible in the room.",
    icon: "projector",
    image: media.controlRoom,
    description:
      "Integrated audio-visual systems engineered for reliability. Redundant vision switching, presentation management, comms and playback built around your content — so speakers walk on and the room simply works.",
    capabilities: [
      "Vision switching with hot-standby redundancy",
      "Presentation and content management (PowerPoint, Keynote, Pro Presenter)",
      "Media servers, playback and show control",
      "Camera packages, PTZ and multi-cam IMAG",
      "Wireless and wired comms for crew and talent",
      "Speaker preview, confidence monitors and countdown clocks",
    ],
    specs: [
      { label: "Switching", value: "4K UHD, dual-redundant" },
      { label: "Signal", value: "SDI / NDI / HDBaseT" },
      { label: "Playback", value: "Multi-layer media servers" },
    ],
  },
  {
    slug: "led-screens",
    title: "LED Screens",
    short: "High-brightness canvases",
    tagline: "Seamless pixel canvases at any scale.",
    icon: "monitor",
    image: media.ledWall,
    description:
      "Indoor and outdoor LED walls from intimate 3m backdrops to full-stage architectural canvases. Curved, floating, hanging or ground-stacked — processed with colour-matched calibration and driven by redundant processing.",
    capabilities: [
      "Indoor LED from 1.9mm to 3.9mm pixel pitch",
      "Outdoor high-brightness LED for daylight visibility",
      "Curved, columned and creative custom builds",
      "Rigged, ground-supported and mobile screen towers",
      "Processing with backup path and colour calibration",
      "Content resizing, scaling and pixel mapping",
    ],
    specs: [
      { label: "Pitch", value: "1.9mm – 6.9mm" },
      { label: "Brightness", value: "Up to 5,500 nits" },
      { label: "Build", value: "Flat, curved, custom" },
    ],
  },
  {
    slug: "sound-systems",
    title: "Sound Systems",
    short: "Line array & PA",
    tagline: "Even coverage, front row to back wall.",
    icon: "audio-lines",
    image: media.soundSystem,
    description:
      "System-designed audio using prediction software to model coverage before a single box is hung. Line array, point source and distributed delay systems tuned on site for intelligibility and impact.",
    capabilities: [
      "Line array and point-source system design",
      "Coverage prediction and on-site system tuning",
      "Digital consoles with recallable show files",
      "Wireless microphone coordination and RF scanning",
      "In-ear monitoring and stage wedges",
      "Distributed delay systems for long or wide rooms",
    ],
    specs: [
      { label: "Design", value: "Prediction-modelled coverage" },
      { label: "Consoles", value: "Digital, recallable" },
      { label: "RF", value: "Coordinated & licensed" },
    ],
  },
  {
    slug: "lighting-design",
    title: "Lighting Design",
    short: "Mood & movement",
    tagline: "Light that directs the eye and sets the pace.",
    icon: "lightbulb",
    image: media.lightBeams,
    description:
      "Lighting design that carries the emotional arc of an event — from soft architectural washes across a ballroom to time-coded rock-and-roll looks that punch with the music.",
    capabilities: [
      "Full lighting plots, plans and pre-visualisation",
      "Moving heads, washes, beams and profile fixtures",
      "Architectural and venue uplighting",
      "Time-coded and busked show programming",
      "Haze, atmospherics and beam work",
      "Battery-powered uplighting for heritage venues",
    ],
    specs: [
      { label: "Control", value: "grandMA / Avolites" },
      { label: "Pre-vis", value: "3D visualised pre-build" },
      { label: "Power", value: "Mains & battery options" },
    ],
  },
  {
    slug: "stage-design",
    title: "Stage & Set Design",
    short: "Structure & scenic",
    tagline: "Engineered structure, finished like furniture.",
    icon: "layout-panel-top",
    image: media.stageRig,
    description:
      "Staging, rigging and custom scenic built to engineering certification and finished to a brand standard. Decks, risers, trussing, soft goods and bespoke set pieces designed around your sightlines.",
    capabilities: [
      "Modular decking, risers and multi-level staging",
      "Truss structures, goal posts and ground support",
      "Certified rigging and load calculations",
      "Custom scenic, portals and branded set builds",
      "Drapes, soft goods and blackout masking",
      "Accessibility ramps, stairs and safety edging",
    ],
    specs: [
      { label: "Decking", value: "Modular, multi-level" },
      { label: "Rigging", value: "Engineer-certified" },
      { label: "Scenic", value: "Bespoke fabrication" },
    ],
  },
  {
    slug: "live-streaming",
    title: "Live Streaming & Recording",
    short: "Hybrid & broadcast",
    tagline: "The room, extended to everyone who could not travel.",
    icon: "radio-tower",
    image: media.broadcast,
    description:
      "Multi-camera live streaming and hybrid event delivery with broadcast-standard vision mixing, graphics, remote presenter integration and bonded-connection redundancy.",
    capabilities: [
      "Multi-camera capture and live vision mixing",
      "Lower thirds, graphics packages and branded frames",
      "Remote presenter and panellist integration",
      "Simulcast to YouTube, LinkedIn, Teams and custom platforms",
      "Bonded cellular and redundant internet paths",
      "Recording, editing and post-event highlight packages",
    ],
    specs: [
      { label: "Cameras", value: "Up to 8-camera live cut" },
      { label: "Output", value: "1080p50 / 4K" },
      { label: "Redundancy", value: "Bonded 4G/5G backup" },
    ],
  },
  {
    slug: "technical-production",
    title: "Technical Production Management",
    short: "Planning & control",
    tagline: "The documentation that makes show day boring.",
    icon: "settings-2",
    image: media.audioDesk,
    description:
      "Technical direction, production management and show control for complex multi-room, multi-day programs. Power distribution, cable schedules, patch documents and rehearsal management — the unglamorous detail that removes surprises.",
    capabilities: [
      "Technical direction and production management",
      "Power distribution design and load balancing",
      "Cable schedules, patch lists and signal-flow diagrams",
      "Show calling, cue stacks and timecode",
      "Rehearsal management and speaker wrangling",
      "Multi-room and multi-day program coordination",
    ],
    specs: [
      { label: "Docs", value: "Full technical pack" },
      { label: "Control", value: "Timecode & cue stacks" },
      { label: "Programs", value: "Multi-room, multi-day" },
    ],
  },
  {
    slug: "permanent-installations",
    title: "Permanent Installations",
    short: "Fixed AV systems",
    tagline: "Systems your team can run without us in the room.",
    icon: "building-2",
    image: media.screenArray,
    description:
      "Fixed AV installations for venues, houses of worship, corporate auditoriums and hospitality spaces — specified, installed, commissioned and documented, with training so in-house staff can operate confidently.",
    capabilities: [
      "Site survey, system specification and quoting",
      "Fixed LED, projection and display installation",
      "Installed audio, DSP and zoned distribution",
      "Installed lighting and control systems",
      "Touch-panel control and simple operator interfaces",
      "Staff training, documentation and service agreements",
    ],
    specs: [
      { label: "Scope", value: "Design, install, commission" },
      { label: "Control", value: "Touch-panel simplified" },
      { label: "Support", value: "Training & service plans" },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
