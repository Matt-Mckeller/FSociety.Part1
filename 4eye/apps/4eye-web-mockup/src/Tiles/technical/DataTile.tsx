"use client";

import { Box } from "@mui/material";
import { TileContainer } from "@expanse/hud";
import { PurpleBallPlay } from "./rl/PurpleBallPlay";

export function DataTile() {
  return (
    <TileContainer mode="fit">
      <Box sx={{ width: "100%", height: "100%", p: 2.5, color: "text.primary", minHeight: 0 }}>
        <PurpleBallPlay />
      </Box>
    </TileContainer>
  );
}
