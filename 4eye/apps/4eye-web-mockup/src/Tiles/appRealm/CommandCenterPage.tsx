"use client";

import { TileContainer } from "@expanse/hud";

import { CommandCenterTile } from "../command-center";

/**
 * CommandCenterPage — appRealm route wrapper.
 *
 * Mounts the Command Center tile in a fit-mode HUD container so it fills the
 * realm viewport without page scroll (panes scroll independently).
 */
export default function CommandCenterPage() {
  return (
    <TileContainer mode="fit">
      <CommandCenterTile />
    </TileContainer>
  );
}
