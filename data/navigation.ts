export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", description: "Concept. Create. Captivate." },
  { label: "About Us", href: "/about", description: "The Kooka DNA" },
  {
    label: "Projects",
    href: "/showreel",
    description: "Selected work in motion",
  },
  {
    label: "What We Do",
    href: "/services",
    description: "Technical artistry, zero compromise",
    children: [
      {
        label: "Kooka Solutions",
        href: "/services",
        description: "Nine production disciplines",
      },
      {
        label: "Kooka Footprint",
        href: "/where-we-work",
        description: "Events, environments & experiences",
      },
    ],
  },
  {
    label: "Contact Us",
    href: "/#contact",
    description: "Melbourne HQ, Australia-wide",
  },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/showreel" },
  { label: "Kooka Solutions", href: "/services" },
  { label: "Kooka Footprint", href: "/where-we-work" },
];
