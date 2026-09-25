"use client";

import { Box, Chip, Typography, alpha } from "@mui/material";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import type { MediaFolder } from "../types";
import { MEDIA_LIBRARY_FOLDERS, MEDIA_ROOT_LABEL } from "../data/catalog";

interface Props {
  selectedId: string | null;
  onSelect: (folder: MediaFolder) => void;
}

export function LibraryPanel({ selectedId, onSelect }: Props) {
  return (
    <Box sx={{ height: "100%", overflow: "auto", p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 2.5, maxWidth: 720 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
          Media library
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Canonical store at{" "}
          <Box component="span" sx={{ fontFamily: "monospace", fontSize: 12 }}>
            {MEDIA_ROOT_LABEL}
          </Box>
          . Open Phenominal to jump into Cut — other folders are indexed for later pipelines.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 1.5,
        }}
      >
        {MEDIA_LIBRARY_FOLDERS.map((folder) => {
          const active = selectedId === folder.id;
          return (
            <Box
              key={folder.id}
              onClick={() => onSelect(folder)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(folder);
                }
              }}
              sx={{
                p: 2,
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: active ? folder.accent : "divider",
                bgcolor: active ? alpha(folder.accent, 0.08) : "background.paper",
                cursor: "pointer",
                transition: "border-color 120ms ease, box-shadow 120ms ease",
                boxShadow: active ? `0 0 0 3px ${alpha(folder.accent, 0.18)}` : "none",
                "&:hover": {
                  borderColor: alpha(folder.accent, 0.55),
                  boxShadow: `0 4px 16px ${alpha(folder.accent, 0.12)}`,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: folder.accent,
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ fontWeight: 800, fontSize: 14, flex: 1 }}>
                  {folder.label}
                </Typography>
                {folder.pipeline && (
                  <Chip
                    size="small"
                    icon={<BoltRoundedIcon sx={{ fontSize: "12px !important" }} />}
                    label="Cut"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      fontWeight: 700,
                      bgcolor: alpha(folder.accent, 0.15),
                      color: folder.accent,
                      "& .MuiChip-icon": { color: folder.accent },
                    }}
                  />
                )}
              </Box>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "text.disabled",
                  mb: 0.75,
                }}
              >
                {folder.path}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: 12, lineHeight: 1.4 }}>
                {folder.blurb}
              </Typography>
              {folder.count != null && (
                <Typography sx={{ mt: 1.25, fontSize: 11, fontWeight: 700, color: "text.disabled" }}>
                  {folder.count} ready shorts
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
