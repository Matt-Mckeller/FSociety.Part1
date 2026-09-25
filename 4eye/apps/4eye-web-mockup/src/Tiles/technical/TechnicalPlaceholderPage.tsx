"use client";

import { Box, Typography } from "@mui/material";
import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material";
import { TileContainer } from "@expanse/hud";

interface TechnicalPlaceholderPageProps {
  title: string;
  Icon: ComponentType<SvgIconProps>;
}

export function TechnicalPlaceholderPage({ title, Icon }: TechnicalPlaceholderPageProps) {
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
        <Icon sx={{ fontSize: 64, opacity: 0.4 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>
    </TileContainer>
  );
}
