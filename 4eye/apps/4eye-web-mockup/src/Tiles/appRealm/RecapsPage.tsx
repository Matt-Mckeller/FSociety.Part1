"use client";

import { Box, Typography } from "@mui/material";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import { TileContainer } from "@expanse/hud"

export default function RecapsPage() {
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
        <SummarizeRoundedIcon sx={{ fontSize: 64, opacity: 0.4 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Recaps
        </Typography>
      </Box>
    </TileContainer>
  );
}
