"use client";

import { Box, Typography } from "@mui/material";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { TileContainer } from "@expanse/hud"

export default function StoresPage() {
  return (
    <TileContainer mode="fit">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          color: "text.primary",
        }}
      >
        <StorefrontRoundedIcon sx={{ fontSize: 64, opacity: 0.4 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Stores
        </Typography>
      </Box>
    </TileContainer>
  );
}
