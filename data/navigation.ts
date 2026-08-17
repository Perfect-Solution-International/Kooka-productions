import { services } from "./services";

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
    // One source of truth: the dropdown mirrors the nine service blocks and
    // jumps straight to each anchor on /services.
    children: services.map((service) => ({
      label: service.title,
      href: `/services#${service.slug}`,
    })),
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
  { label: "Admin Panel", href: "/admin" },
];
