export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", description: "Concept. Create. Captivate." },
  {
    label: "Solutions",
    href: "/services",
    description: "Technical artistry, zero compromise",
  },
  {
    label: "Where We Work",
    href: "/where-we-work",
    description: "Events, environments & experiences",
  },
  {
    label: "Showreel",
    href: "/showreel",
    description: "Selected work in motion",
  },
  { label: "About", href: "/about", description: "The Kooka DNA" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Kooka Solutions", href: "/services" },
  { label: "Kooka Footprint", href: "/where-we-work" },
  { label: "Showreel", href: "/showreel" },
  { label: "Kooka DNA", href: "/about" },
];
