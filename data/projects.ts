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
 * Kooka's own project stills (public/Highlighted), each paired with the
 * production it is a frame of. The pairing lives here rather than being
 * index-mapped onto a showreel query, so reordering the showreel cannot put a
 * still against the wrong write-up.
 */
export const featuredProjects: Project[] = [
  {
    title: "Aluth Kalawak — Legends Are Back World Tour",
    type: "Live Concert",
    location: "",
    year: "",
    summary:
      "Standing-room concert hall — LED strobe columns behind the band, crossed beam plot over the floor and front-of-house audio for a packed room.",
    image: "/Highlighted/aluth-kalawak-1.jpg",
    href: "/showreel/aluth-kalawak-world-tour",
  },
  {
    title: "Wayo — Live In Narrm",
    type: "Live Concert",
    location: "",
    year: "2024",
    summary:
      "Seated theatre production for a full house across both levels — thrust-stage backline, warm top wash and tight specials with no screen to hide behind.",
    image: "/Highlighted/project-3.jpg",
    href: "/showreel/wayo-live-in-narrm",
  },
  {
    title: "Ru Sanda Re — The Finale Tour",
    type: "Live Concert",
    location: "",
    year: "2025",
    summary:
      "Proscenium theatre build — wide LED backdrop running show content, full band and vocal line, cold-spark pyro and a warm front wash to camera.",
    image: "/Highlighted/3.jpg",
    href: "/showreel/ru-sanda-re-the-finale-tour",
  },
  {
    title: "Yaga Festival — Roots Of The Notes",
    type: "Music Festival",
    location: "",
    year: "",
    summary:
      "Open-air festival main stage — sculpted set pieces mapped with projection and LED, festival-scale PA, confetti and pyro over a full-site crowd.",
    image: "/Highlighted/yaga.jpg",
    href: "/showreel/yaga-festival",
  },
];
