"use client";

import { Box, Typography, Chip } from "@mui/material";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { TileContainer } from "@expanse/hud";

export default function ClassesPage() {
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
        <SportsEsportsRoundedIcon sx={{ fontSize: 64, opacity: 0.4 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Game
        </Typography>

        {/* Note: Classes content has moved to Social */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "action.hover",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Classes has moved to
          </Typography>
          <Chip
            size="small"
            icon={<GroupRoundedIcon sx={{ fontSize: 14 }} />}
            label="Social"
            sx={{ fontWeight: 700, fontSize: 12 }}
          />
          <ArrowForwardRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
        </Box>
      </Box>
    </TileContainer>
  );
}
