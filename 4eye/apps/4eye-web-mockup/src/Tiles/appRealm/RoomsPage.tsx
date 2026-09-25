"use client";

import { Box, Typography } from "@mui/material";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import { TileContainer } from "@expanse/hud"

export default function RoomsPage() {
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
        <MeetingRoomRoundedIcon sx={{ fontSize: 64, opacity: 0.4 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Rooms
        </Typography>
      </Box>
    </TileContainer>
  );
}
