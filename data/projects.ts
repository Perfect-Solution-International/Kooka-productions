export type Project = {
  title: string;
  type: string;
  location: string;
  year: string;
  summary: string;
  image: string;
  focus?: string;
  href?: string;
};

/**
 * Kooka's own project stills (public/Highlighted). The `.webp` files are
 * 1600px re-encodes of the supplied JPEGs; the originals stay as masters.
 */
export const featuredProjects: Project[] = [
  {
    title: "Live In Concert",
    type: "Live Concert",
    location: "Melbourne",
    year: "2025",
    summary:
      "Full stage build with LED backdrop, moving light rig and front-of-house audio for a seated theatre house.",
    image: "/Highlighted/project-1.webp",
  },
  {
    title: "Golden Jubilee — Dance of the Lions",
    type: "Gala Night",
    location: "Trinity College Kandy OBA, Melbourne",
    year: "2026",
    summary:
      "Ballroom gala with branded LED walls, gobo projection and a beam-work lighting plot across the room.",
    image: "/Highlighted/project-2.webp",
  },
  {
    title: "A Night In Rio — Annual Dinner Dance",
    type: "Dinner Dance",
    location: "St. Peter's College OBSC, Melbourne",
    year: "2026",
    summary:
      "Themed LED stage canvas, full band backline and a coloured wash plot built to the night's carnival brief.",
    image: "/Highlighted/project-3.webp",
  },
  {
    title: "The Finale Tour",
    type: "Live Touring",
    location: "Australia",
    year: "2025",
    summary:
      "Touring production package — staging, lighting, audio and screens travelling the full run of dates.",
    image: "/Highlighted/project-4.webp",
    /* Near-square source: bias the crop low so the performer stays framed. */
    focus: "object-[50%_60%]",
  },
];
