import { services } from "./services";
import { footprintCategories } from "./footprint";

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
    label: "Showreel",
    href: "/showreel",
    description: "Selected work in motion",
  },
  {
    label: "Solutions",
    href: "/solutions",
    description: "Technical artistry, zero compromise",
    children: services.map((service) => ({
      label: service.title,
      href: `/solutions#${service.slug}`,
    })),
  },
  {
    label: "Footprint",
    href: "/footprint",
    description: "Events, environments & experiences we deliver",
    children: footprintCategories.map((category) => ({
      label: category.title,
      href: `/footprint#${category.slug}`,
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
  { label: "Showreel", href: "/showreel" },
  { label: "Kooka Solutions", href: "/solutions" },
  { label: "Kooka Footprint", href: "/footprint" },
  { label: "Admin Panel", href: "/admin" },
];
