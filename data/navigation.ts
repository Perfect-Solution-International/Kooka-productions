import { services } from "./services";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", description: "Concept. Create. Captivate." },
  { label: "DNA", href: "/dna", description: "The Kooka DNA" },
  {
    label: "Projects",
    href: "/showreel",
    description: "Selected work in motion",
  },
  {
    label: "What We Do",
    href: "/services",
    description: "Technical artistry, zero compromise",
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
  { label: "DNA", href: "/dna" },
  { label: "Projects", href: "/showreel" },
  { label: "Kooka Solutions", href: "/services" },
  { label: "Kooka Footprint", href: "/solutions" },
  // { label: "Admin Panel", href: "/admin" },
];
