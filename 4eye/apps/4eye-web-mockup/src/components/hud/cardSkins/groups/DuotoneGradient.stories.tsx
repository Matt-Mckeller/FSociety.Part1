import type { Meta } from "@storybook/react";

import {
  makeSkinStory,
  SKIN_GROUP_META_PARAMETERS,
} from "../shared/makeSkinStory";

const meta: Meta = {
  title: "HUD / Map / Card Skins / C · Duotone Gradient",
  parameters: SKIN_GROUP_META_PARAMETERS,
};
export default meta;

export const CoolSteel = makeSkinStory(
  "duotoneGradient/cool-steel",
  "Cool steel",
);

export const HealDeep = makeSkinStory(
  "duotoneGradient/heal-deep",
  "Heal · deep",
);

export const WinGold = makeSkinStory(
  "duotoneGradient/win-gold",
  "Win · gold",
);

export const Dawn = makeSkinStory("duotoneGradient/dawn", "Dawn");

export const Horizon = makeSkinStory("duotoneGradient/horizon", "Horizon");
