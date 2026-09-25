import type { Meta } from "@storybook/react";

import {
  makeSkinStory,
  SKIN_GROUP_META_PARAMETERS,
} from "../shared/makeSkinStory";

const meta: Meta = {
  title: "HUD / Map / Card Skins / A · Frosted Glass",
  parameters: SKIN_GROUP_META_PARAMETERS,
};
export default meta;

export const DarkBase = makeSkinStory(
  "frostedGlass/dark-base",
  "Dark base (production)",
);

export const DarkBlueText = makeSkinStory(
  "frostedGlass/dark-blue-text",
  "Dark · blue text",
);

export const DeepNavyWarm = makeSkinStory(
  "frostedGlass/deep-navy-warm",
  "Deep navy · warm chevron",
);

export const HealMint = makeSkinStory(
  "frostedGlass/heal-mint",
  "Heal · mint",
);

export const RosePulse = makeSkinStory(
  "frostedGlass/rose-pulse",
  "Rose · pulse",
);
