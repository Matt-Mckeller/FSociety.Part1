import type { Meta } from "@storybook/react";

import {
  makeSkinStory,
  SKIN_GROUP_META_PARAMETERS,
} from "../shared/makeSkinStory";

const meta: Meta = {
  title: "HUD / Map / Card Skins / B · Paper Ink",
  parameters: SKIN_GROUP_META_PARAMETERS,
};
export default meta;

export const Clean = makeSkinStory("paperInk/clean", "Clean paper");

export const BlueInk = makeSkinStory("paperInk/blue-ink", "Blue ink");

export const LinenWarm = makeSkinStory("paperInk/linen-warm", "Linen · warm");

export const TealHeal = makeSkinStory("paperInk/teal-heal", "Teal heal");

export const ElevatedEdge = makeSkinStory(
  "paperInk/elevated-edge",
  "Elevated edge",
);
