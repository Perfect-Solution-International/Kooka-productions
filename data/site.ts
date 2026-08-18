export const site = {
  name: "Kooka Productions",
  shortName: "Kooka",
  domain: "www.kookaproductions.com.au",
  url: "https://www.kookaproductions.com.au",
  tagline: "Concept. Create. Captivate.",
  supportLine: "The Full Circle of Event Innovation.",
  seoLine: "Melbourne Event Production & AV Hire Specialists",
  description:
    "Melbourne-based 360° event production delivering elite AV, LED walls and immersive projection mapping for corporate events, international tours, weddings and luxury celebrations across Australia.",
  /** Vertical rule alongside the hero. */
  sideTagline: "Melbourne Event Production Specialists",
  /** Shared intro for Kooka Experience and Kooka Solutions. */
  intro:
    "End-to-end production and technical solutions designed to deliver seamless, high-impact events.",
  locationBanner: "Based in Melbourne, delivering events across Australia.",
} as const;

export const contact = {
  phone: "0415 830 719",
  phoneHref: "tel:+61415830719",
  whatsappHref: "https://wa.me/61415830719",
  email: "info@kookaproductions.com.au",
  emailHref: "mailto:info@kookaproductions.com.au",
  /** Quote and contact calls-to-action lead to the dedicated enquiry page. */
  quoteHref: "/contact",
  contactHref: "/contact",
  address: "PO Box 415, Croydon, Vic 3136",
  city: "Melbourne",
  state: "Victoria",
  country: "Australia",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "linkedin" | "youtube";
};

export const socials: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kookaproductions?igsh=MXJqbXRqb3N2bjZhYw%3D%3D",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1BiW1WEvLe/",
    icon: "facebook",
  },
  
];
