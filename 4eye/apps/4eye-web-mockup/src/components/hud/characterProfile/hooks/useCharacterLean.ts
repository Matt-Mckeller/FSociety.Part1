"use client";

import { useMapDirectionFocus } from "../../state";
import { DIRECTION_TRANSFORMS } from "@expanse/character/explorer";

/**
 * Maps the current map direction focus to a CSS transform string that
 * makes the character lean toward the tile the user is focusing on.
 *
 * Must be called inside a `<MapDirectionFocusProvider>` (set up by
 * `MinimapFullViewOverlay`).
 */
export function useCharacterLean(): string {
  const { selected } = useMapDirectionFocus();
  return DIRECTION_TRANSFORMS[selected];
}
