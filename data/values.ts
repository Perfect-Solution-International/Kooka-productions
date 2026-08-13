import type { IconName } from "./services";

export type ValueProp = {
  title: string;
  description: string;
  icon: IconName | "shield-check" | "gauge" | "users-round" | "route";
};

/** "Why Choose Kooka" — five-point value proposition. */
export const valueProps: ValueProp[] = [
  {
    title: "End-to-End Solutions",
    description:
      "Concept, design, build, operate and pack down. One team carries the event from first sketch to final load-out, so nothing falls between suppliers.",
    icon: "sparkles",
  },
  {
    title: "Industry-Grade Technology",
    description:
      "Current-generation LED, line array, moving light and control inventory — maintained, tested and prepped before every job, never sourced on a guess.",
    icon: "settings-2",
  },
  {
    title: "Proven Expertise",
    description:
      "Crew drawn from touring, broadcast and corporate backgrounds who have solved the problem in front of them before, under a live clock.",
    icon: "users-round",
  },
  {
    title: "Reliable Delivery",
    description:
      "Redundant signal paths, documented patch, contingency power and rehearsed cue stacks. Show day should be the least eventful part of the project.",
    icon: "shield-check",
  },
  {
    title: "Tailored Approach",
    description:
      "No packaged tiers. Every plot is designed to the venue, the audience and the budget actually in front of us, then quoted honestly.",
    icon: "route",
  },
];
