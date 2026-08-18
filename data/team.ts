export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string;
};

export const leadership: TeamMember[] = [
  {
    name: "Shehan Desilva",
    role: "Managing Director",
    bio: "Shehan Desilva leads the overall vision, growth, and strategic direction of the company. With a strong focus on business development, client relationships, and long-term scalability, he drives the company's commitment to delivering premium event experiences while building a sustainable and forward-thinking production brand. Shehan oversees financial performance, strategic partnerships, and high-level business operations, ensuring the company continues to evolve within the ever-changing events industry.",
  },
  {
    name: "Ryan Senn",
    role: "Director of Operations & Partnerships",
    bio: "Ryan Senn oversees the operational execution of all projects, ensuring every event is delivered efficiently, professionally, and to the highest standard. Acting as the connection between clients, partners, and production teams, he manages workflows, logistics, client communications, and strategic partnerships. Ryan is focused on creating seamless event experiences while building long-term relationships with venues, suppliers, sponsors, and clients.",
    image: "/team/ryan-senn.png",
  },
];
