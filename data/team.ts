import { media } from "./media";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const leadership: TeamMember[] = [
  {
    name: "Shehan Desilva",
    role: "Managing Director",
    bio: "Shehan Desilva leads the overall vision, growth, and strategic direction of the company. With a strong focus on business development, client relationships, and long-term scalability, he drives the company's commitment to delivering premium event experiences while building a sustainable and forward-thinking production brand. Shehan oversees financial performance, strategic partnerships, and high-level business operations, ensuring the company continues to evolve within the ever-changing events industry.",
    image: media.boardroom,
  },
  {
    name: "Ryan Senn",
    role: "Director of Operations & Partnerships",
    bio: "Ryan Senn oversees the operational execution of all projects, ensuring every event is delivered efficiently, professionally, and to the highest standard. Acting as the connection between clients, partners, and production teams, he manages workflows, logistics, client communications, and strategic partnerships. Ryan is focused on creating seamless event experiences while building long-term relationships with venues, suppliers, sponsors, and clients.",
    image: media.workspace,
  },
  {
    name: "Issy Dissanayakalage",
    role: "Director of Production & Technical",
    bio: "Issy Dissanayake leads all technical and production aspects of the business, specialising in audio visual production, staging, lighting, and immersive event technologies. With a strong focus on innovation and execution, he ensures every production is delivered with precision, creativity, and technical excellence. From concept development through to live event delivery, Issy manages technical teams, production systems, and cutting-edge event solutions that bring experiences to life.",
    image: media.controlRoom,
  },
];
