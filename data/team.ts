import { media } from "./media";

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  responsibilities: string[];
  image: string;
};

export const leadership: TeamMember[] = [
  {
    name: "Shehan Desilva",
    role: "Managing Director",
    focus: "Strategy & Growth",
    bio: "Shehan sets the direction of Kooka Productions — shaping strategic vision, driving business development and holding the commercial standard that lets the company invest ahead of demand. His focus is long-term scalability: the systems, partnerships and financial discipline that let a production house grow without dropping the quality that earned the work.",
    responsibilities: [
      "Strategic vision and company direction",
      "Business development and key client partnerships",
      "Financial performance and commercial governance",
      "Long-term scalability and capability investment",
    ],
    image: media.boardroom,
  },
  {
    name: "Ryan Senn",
    role: "Director of Operations & Partnerships",
    focus: "Operations & Logistics",
    bio: "Ryan turns the plan into movement. He owns operational execution across the calendar — crew, trucks, warehouse flow and venue access — and holds the client and supplier relationships that make a compressed bump-in achievable. When timelines tighten, Ryan is the reason the schedule still holds.",
    responsibilities: [
      "Operational execution across concurrent events",
      "Logistics, fleet, warehouse and crew scheduling",
      "Client communications and account management",
      "Supplier relationships and partner network",
    ],
    image: media.workspace,
  },
  {
    name: "Issy Dissanayakalage",
    role: "Director of Production & Technical",
    focus: "Technical & Creative",
    bio: "Issy leads the technical craft — system design, staging, lighting and the immersive technologies that make a room feel authored rather than equipped. Every plot, patch and pixel map passes through his standard before it reaches a venue floor.",
    responsibilities: [
      "Technical direction and system design",
      "AV production, staging and rigging standards",
      "Lighting design and show programming",
      "Immersive technologies and projection mapping",
    ],
    image: media.controlRoom,
  },
];
