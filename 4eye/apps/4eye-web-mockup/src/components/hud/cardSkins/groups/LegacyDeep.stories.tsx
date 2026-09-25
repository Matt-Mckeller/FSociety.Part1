import type { Meta } from "@storybook/react";

import {
  makeSkinStory,
  SKIN_GROUP_META_PARAMETERS,
} from "../shared/makeSkinStory";

const meta: Meta = {
  title: "HUD / Map / Card Skins / E · Legacy Deep",
  parameters: SKIN_GROUP_META_PARAMETERS,
};
export default meta;

export const PanelBlue = makeSkinStory(
  "legacyDeep/panel-blue",
  "Panel blue (revived)",
);

export const PanelBlueWarm = makeSkinStory(
  "legacyDeep/panel-blue-warm",
  "Panel blue · warm",
);

export const CloudTint = makeSkinStory(
  "legacyDeep/cloud-tint",
  "Cloud tint",
);

export const Water = makeSkinStory("legacyDeep/water", "Water");

export const BracketEcho = makeSkinStory(
  "legacyDeep/bracket-echo",
  "Bracket echo",
);
