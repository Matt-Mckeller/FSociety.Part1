"use client";

import { Box, Chip, Typography } from "@mui/material";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import { TileContainer } from "@expanse/hud";

export default function SocialPage() {
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
        <GroupRoundedIcon sx={{ fontSize: 64, opacity: 0.4 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Social
        </Typography>

        {/* Note: Classes content is now part of Social */}
        <Chip
          size="small"
          icon={<ClassRoundedIcon sx={{ fontSize: 14 }} />}
          label="Includes Classes"
          variant="outlined"
          sx={{ fontWeight: 600, fontSize: 12 }}
        />
      </Box>
    </TileContainer>
  );
}
