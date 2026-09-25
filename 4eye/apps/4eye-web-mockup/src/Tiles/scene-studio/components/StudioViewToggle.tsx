"use client";

import { Box, ButtonBase } from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FeaturedPlayListRoundedIcon from "@mui/icons-material/FeaturedPlayListRounded";
import type { StudioView } from "../types/studio.types";

const TABS: { id: StudioView; label: string; Icon: React.ComponentType<{ sx?: object }> }[] = [
  { id: "gallery",    label: "Gallery",    Icon: GridViewRoundedIcon },
  { id: "storyboard", label: "Storyboard", Icon: FeaturedPlayListRoundedIcon },
];

interface Props {
  view: StudioView;
  onChange: (v: StudioView) => void;
}

export function StudioViewToggle({ view, onChange }: Props) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        bgcolor: "rgba(0,0,0,0.06)",
        borderRadius: 2,
        p: 0.4,
        gap: 0.25,
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = view === id;
        return (
          <ButtonBase
            key={id}
            onClick={() => onChange(id)}
            sx={{
              px: 1.5,
              py: 0.6,
              borderRadius: 1.5,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.2,
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              color: active ? "primary.main" : "text.secondary",
              bgcolor: active ? "background.paper" : "transparent",
              boxShadow: active ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
              transition: "all 120ms ease",
              "&:hover": {
                color: active ? "primary.main" : "text.primary",
              },
            }}
          >
            <Icon sx={{ fontSize: 14 }} />
            {label}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
