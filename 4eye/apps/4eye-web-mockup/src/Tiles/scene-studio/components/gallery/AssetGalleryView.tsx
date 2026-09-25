"use client";

import { useMemo } from "react";
import { Box, Typography, alpha } from "@mui/material";
import { SEED_ASSETS } from "../../store/seed-assets";
import type { AssetFolder, StudioAsset } from "../../types/studio.types";
import { FOLDER_LABELS } from "../../types/studio.types";
import { AssetTile } from "./AssetTile";

const FOLDER_ORDER: AssetFolder[] = [
  '01_scene_keyframes',
  '02_s1c_gift_sequence',
  '05_videos',
  '06_edits',
  '00_reference',
  '03_alternates_and_iterations',
  '04_gallery',
  '07_generated',
];

function groupByFolder(assets: StudioAsset[]): [AssetFolder, StudioAsset[]][] {
  const map = new Map<AssetFolder, StudioAsset[]>();
  for (const a of [...assets].sort((x, y) => x.catalog.order - y.catalog.order)) {
    const arr = map.get(a.catalog.folder) ?? [];
    arr.push(a);
    map.set(a.catalog.folder, arr);
  }
  return FOLDER_ORDER
    .filter((f) => map.has(f))
    .map((f) => [f, map.get(f)!]);
}

export function AssetGalleryView() {
  const groups = useMemo(() => groupByFolder(SEED_ASSETS), []);

  return (
    <Box sx={{ px: 3, py: 3, overflow: "auto", height: "100%" }}>
      {groups.map(([folder, assets]) => (
        <Box key={folder} sx={{ mb: 5 }}>
          {/* Section header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1.5,
              mb: 2,
              pb: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{ fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", color: "text.secondary" }}
            >
              {FOLDER_LABELS[folder]}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                px: 1,
                py: 0.15,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.06),
              }}
            >
              {assets.length}
            </Typography>
          </Box>

          {/* Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 2,
            }}
          >
            {assets.map((asset) => (
              <AssetTile key={asset.id} asset={asset} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
