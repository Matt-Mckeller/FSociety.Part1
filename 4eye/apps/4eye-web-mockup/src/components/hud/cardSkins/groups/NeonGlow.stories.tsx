import type { Meta } from "@storybook/react";

import {
  makeSkinStory,
  SKIN_GROUP_META_PARAMETERS,
} from "../shared/makeSkinStory";

const meta: Meta = {
  title: "HUD / Map / Card Skins / D · Neon Glow",
  parameters: SKIN_GROUP_META_PARAMETERS,
};
export default meta;

export const Cyan = makeSkinStory("neonGlow/cyan", "Neon · cyan");

export const Amber = makeSkinStory("neonGlow/amber", "Neon · amber");

export const Lime = makeSkinStory("neonGlow/lime", "Neon · lime");

export const Magenta = makeSkinStory("neonGlow/magenta", "Neon · magenta");

export const Aurora = makeSkinStory("neonGlow/aurora", "Neon · aurora");
