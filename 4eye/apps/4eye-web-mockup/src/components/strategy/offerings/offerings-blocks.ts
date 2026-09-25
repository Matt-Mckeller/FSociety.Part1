export type OfferingGoalKey =
  | "all"
  | "grow"
  | "heal"
  | "protect"
  | "learn"
  | "achieve"
  | "earn";

export interface OfferingBlock {
  heading: string;
  bullets: string[];
  goals: Exclude<OfferingGoalKey, "all">[];
}

export const OFFERING_GOAL_OPTIONS: {
  key: OfferingGoalKey;
  label: string;
}[] = [
  { key: "all", label: "All" },
  { key: "grow", label: "Grow" },
  { key: "heal", label: "Heal" },
  { key: "protect", label: "Protect" },
  { key: "learn", label: "Learn" },
  { key: "achieve", label: "Achieve" },
  { key: "earn", label: "Earn" },
];

export const OFFERING_BLOCKS: OfferingBlock[] = [
  {
    heading: "AI",
    bullets: [
      "Learn Optimally",
      "Amplify Humans",
      "Multiply your Mind",
      "Master AI",
    ],
    goals: ["grow", "learn", "achieve"],
  },
  {
    heading: "Maximized Learning for",
    bullets: [
      "In Person or Online",
      "School",
      "Online",
      "Life",
      "Work",
      "Groups & Events",
    ],
    goals: ["learn", "grow"],
  },
  {
    heading: "Gamification",
    bullets: [
      "Maximized Learning",
      "Optimized Engagement",
      "Increased Entertainment",
    ],
    goals: ["learn", "achieve", "earn"],
  },
  {
    heading: "Heal",
    bullets: ["Control your own mind", "Build resilience", "Find positivity"],
    goals: ["heal", "grow"],
  },
  {
    heading: "Protect",
    bullets: [
      "Privacy-first by design",
      "Encrypted, portable identity",
      "Stable, predictable systems",
    ],
    goals: ["protect"],
  },
];

export function filterOfferingBlocks(
  active: OfferingGoalKey,
): OfferingBlock[] {
  if (active === "all") return OFFERING_BLOCKS;
  return OFFERING_BLOCKS.filter((b) => b.goals.includes(active));
}
