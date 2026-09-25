import type { StoryObj } from "@storybook/react";
import type { CardSkinPreset } from "@expanse/hud"

import { MinimapFullViewOverlay } from "../../MinimapFullViewOverlay";
import { OverlayStoryShell } from "./OverlayStoryShell";

/**
 * Build a single Storybook `StoryObj` that renders the real
 * MinimapFullViewOverlay with the given card skin applied to the
 * right-rail Next-Best-Action cards. Use inside per-group story
 * files as static named exports (required by Storybook CSF).
 */
export function makeSkinStory(skin: CardSkinPreset, displayName: string): StoryObj {
  return {
    name: displayName,
    render: () => (
      <OverlayStoryShell>
        <MinimapFullViewOverlay cardSkin={skin} />
      </OverlayStoryShell>
    ),
  };
}

export const SKIN_GROUP_META_PARAMETERS = {
  layout: "fullscreen" as const,
  backgrounds: {
    default: "white",
    values: [{ name: "white", value: "#ffffff" }],
  },
};
