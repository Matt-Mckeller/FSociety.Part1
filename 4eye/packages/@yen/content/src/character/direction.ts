/**
 * Character — Direction compass.
 *
 * This is the character profile heading: what *this person* is pointed at.
 * It is not a truncated Command Center plan. Planning owns product, clarity,
 * health, and the launch *document*. Direction owns vision, growth, belief,
 * money, and the people who carry the work.
 */

import type { SymbolColor } from "@4eye/types";

export interface CharacterDirectionFocus {
  id: string;
  name: string;
  description: string;
  /** 0..100 current pull. */
  weight: number;
  /** Previous weight, to show the trend. */
  previousWeight: number;
  urgency: "low" | "medium" | "high" | "critical";
  color: SymbolColor;
}

/**
 * Character Direction focuses — ordered by pull, not by planning weight.
 * Distinct from `STRATEGIC_FOCUSES` on the Plan tile.
 */
export const CHARACTER_DIRECTION_FOCUSES: readonly CharacterDirectionFocus[] = [
  {
    id: "cd-vision-growth",
    name: "Vision + Growth + Followers & Supporters",
    description:
      "See it, grow it, and gather the people who carry it. The heading is the combined field — not a product backlog, not a planning row.",
    weight: 96,
    previousWeight: 62,
    urgency: "critical",
    color: "purple",
  },
  {
    id: "cd-belief",
    name: "Belief",
    description:
      "Conviction as direction. People follow belief before they follow a plan. The inner lock that makes launch, money, and support possible.",
    weight: 92,
    previousWeight: 54,
    urgency: "high",
    color: "amber",
  },
  {
    id: "cd-launch",
    name: "Launch",
    description:
      "Going public as a personal move — the story, the moment, the ask. The Plan tile keeps the launch document; this is stepping into it.",
    weight: 88,
    previousWeight: 65,
    urgency: "high",
    color: "blue",
  },
  {
    id: "cd-money",
    name: "Money",
    description:
      "Fuel. Amplify income, tokens, and the financial path so vision and support can scale — a first-class heading, not a guilt sidebar.",
    weight: 86,
    previousWeight: 40,
    urgency: "high",
    color: "green",
  },
  {
    id: "cd-market-story-support",
    name: "Marketing, Storytelling, and Gaming",
    description:
      "How the vision reaches people: tell it so it lands, spread it so it compounds, and game.",
    weight: 90,
    previousWeight: 35,
    urgency: "critical",
    color: "pink",
  },
];
