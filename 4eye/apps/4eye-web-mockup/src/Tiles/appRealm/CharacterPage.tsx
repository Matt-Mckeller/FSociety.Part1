"use client";

import { Box } from "@mui/material";
import { TileContainer } from "@expanse/hud";

import { CharacterTile } from "../character";
import { ResourceBarsProvider, ResourceCornerHud } from "@4eye/web/components/hud/resourceBars";

export default function CharacterPage() {
  return (
    <TileContainer mode="fit">
      <ResourceBarsProvider>
        <Box sx={{ width: "100%", height: "100%", overflow: "auto", p: 2 }}>
          <CharacterTile />
        </Box>
        {/* Mind/Body resource HUD docked to the bottom corners — Character screen only. */}
        <ResourceCornerHud />
      </ResourceBarsProvider>
    </TileContainer>
  );
}
