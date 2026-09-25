"use client";

import type { ComponentType } from "react";
import { Box, ButtonBase, Typography, alpha } from "@mui/material";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import type { MediaStudioTab } from "../types";

const TABS: {
  id: MediaStudioTab;
  label: string;
  hint: string;
  Icon: ComponentType<{ sx?: object }>;
}[] = [
  { id: "library", label: "Library", hint: "Browse Media", Icon: FolderOpenRoundedIcon },
  { id: "cut", label: "Cut", hint: "Run the pipeline", Icon: ContentCutRoundedIcon },
  { id: "publish", label: "Publish", hint: "Ship to Videos", Icon: PublishRoundedIcon },
];

interface Props {
  tab: MediaStudioTab;
  onChange: (t: MediaStudioTab) => void;
}

export function MediaStudioTabs({ tab, onChange }: Props) {
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
      {TABS.map(({ id, label, hint, Icon }) => {
        const active = tab === id;
        return (
          <ButtonBase
            key={id}
            onClick={() => onChange(id)}
            aria-label={`${label}: ${hint}`}
            aria-pressed={active}
            sx={{
              px: 1.75,
              py: 0.75,
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              color: active ? "primary.main" : "text.secondary",
              bgcolor: active ? "background.paper" : "transparent",
              boxShadow: active ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
              transition: "all 120ms ease",
              "&:hover": { color: active ? "primary.main" : "text.primary" },
            }}
          >
            <Icon sx={{ fontSize: 15 }} />
            <Box sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: 12, fontWeight: 800, lineHeight: 1.1 }}>
                {label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: active ? alpha("#2563eb", 0.75) : "text.disabled",
                  lineHeight: 1.2,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {hint}
              </Typography>
            </Box>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
