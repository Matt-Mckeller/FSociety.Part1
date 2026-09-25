"use client";

/**
 * Content topics — the 9-pad on the Content Engine template.
 *
 * Each cell is a category-level subject Matthew actually works and the
 * business sells, mapped onto an integration layer and a pipeline body-layer.
 * The keypad is 3×3 (same muscle memory as Learn). Hints carry both sides of
 * the mapping so a tap always says *why this cell exists*.
 *
 *    Life     Heart    Mind
 *    Craft    Build    Intel
 *    Body     Lead     Value
 */

import type { SymbolColor } from "@4eye/types";
import type { CustomAction } from "./types";

export type ContentTopicId =
  | "life"
  | "heart"
  | "mind"
  | "craft"
  | "build"
  | "intel"
  | "body"
  | "lead"
  | "value";

/** Pipeline body-layer the topic sits on (foundational / content / daily-life). */
export type ContentPipelineLayer = "foundational" | "content" | "daily-life";

export interface ContentTopic {
  id: ContentTopicId;
  label: string;
  /** Integration-layer id from `@yen/content/layers`. */
  layerId: string;
  layerLabel: string;
  pipelineLayer: ContentPipelineLayer;
  /** Knowledge-base topic keys this cell covers. */
  kbTopics: readonly string[];
  /** What it is in a life. */
  personal: string;
  /** What it is in the product / company. */
  business: string;
  accent: SymbolColor;
  /** @expanse/lens registry id for the keypad glyph. */
  lensId: string;
}

export const CONTENT_TOPICS: readonly ContentTopic[] = [
  {
    id: "life",
    label: "Life",
    layerId: "human",
    layerLabel: "Human Layer",
    pipelineLayer: "daily-life",
    kbTopics: ["identity"],
    personal: "Who you are — identity, titles, the character you live",
    business: "The character product — profile as the game",
    accent: "green",
    lensId: "status",
  },
  {
    id: "heart",
    label: "Heart",
    layerId: "human",
    layerLabel: "Human Layer",
    pipelineLayer: "daily-life",
    kbTopics: ["love"],
    personal: "Love, bond, and the people you protect",
    business: "Community — Perfect Loves, audience as relationship",
    accent: "pink",
    lensId: "encourage",
  },
  {
    id: "mind",
    label: "Mind",
    layerId: "computer",
    layerLabel: "Computer Layer",
    pipelineLayer: "foundational",
    kbTopics: ["learning", "teach"],
    personal: "How you learn, teach, and keep getting sharper",
    business: "Education product — chat, lessons, the Web OS as tutor",
    accent: "blue",
    lensId: "clarify",
  },
  {
    id: "craft",
    label: "Craft",
    layerId: "glasses",
    layerLabel: "AI Glasses / AR Layer",
    pipelineLayer: "content",
    kbTopics: ["design", "ux"],
    personal: "Design, UX, and the look of the thing in front of you",
    business: "Product design — media, vision, the surface people touch",
    accent: "slate",
    lensId: "design",
  },
  {
    id: "build",
    label: "Build",
    layerId: "computer",
    layerLabel: "Computer Layer",
    pipelineLayer: "content",
    kbTopics: ["software", "systems"],
    personal: "Systems thinking — how you actually make the thing",
    business: "The 4eye app — software as the flagship",
    accent: "teal",
    lensId: "generate",
  },
  {
    id: "intel",
    label: "Intel",
    layerId: "aion",
    layerLabel: "AION — Full Dive",
    pipelineLayer: "foundational",
    kbTopics: ["ai"],
    personal: "How you think with AI — comprehension, orchestration",
    business: "AI product — neural, AION, the mind the stack routes through",
    accent: "purple",
    lensId: "analyze",
  },
  {
    id: "body",
    label: "Body",
    layerId: "store",
    layerLabel: "Store Layer",
    pipelineLayer: "daily-life",
    kbTopics: ["health"],
    personal: "Health, energy, recovery — the body that does the work",
    business: "Wellness gear — real-world gamification you can buy",
    accent: "red",
    lensId: "ground",
  },
  {
    id: "lead",
    label: "Lead",
    layerId: "robot",
    layerLabel: "Robot Layer",
    pipelineLayer: "foundational",
    kbTopics: ["leadership"],
    personal: "How you lead — rally, teach, keep the room pointed",
    business: "Companions, teachers, tools — leadership as a product surface",
    accent: "green",
    lensId: "encourage",
  },
  {
    id: "value",
    label: "Value",
    layerId: "store",
    layerLabel: "Store Layer",
    pipelineLayer: "content",
    kbTopics: ["money"],
    personal: "What this is worth — money, leverage, the next door",
    business: "Marketplace — store, contracts, the business that funds the rest",
    accent: "amber",
    lensId: "reveal",
  },
] as const;

export function contentTopicHint(topic: ContentTopic): string {
  return `${topic.layerLabel} · ${topic.personal} · ${topic.business}`;
}

export function contentTopicAction(topic: ContentTopic): CustomAction {
  return {
    id: `TOPIC_${topic.id.toUpperCase()}`,
    name: topic.label,
    lensId: topic.lensId,
    accent: topic.accent,
    hint: contentTopicHint(topic),
  };
}

export const CONTENT_TOPIC_ACTIONS: CustomAction[] = CONTENT_TOPICS.map(contentTopicAction);

export function contentTopicRef(id: ContentTopicId): { kind: "custom"; customId: string } {
  return { kind: "custom", customId: `TOPIC_${id.toUpperCase()}` };
}
