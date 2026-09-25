"use client";

/**
 * PlaceholderMapView — stand-in for the App and Technical map
 * datasets which are not yet wired to a real `MapGridNavigationConfig`.
 *
 * Renders a grid of dummy tiles at roughly the same aspect ratio as
 * the real `MinimapFullView` so the surrounding overlay layout stays
 * consistent when the user toggles between maps.
 */

import { Box, Stack, Typography } from "@mui/material";

interface Props {
  /** Identifier for the placeholder map (used as React key prefix). */
  mapKey: string;
  /** Display name shown in the header. */
  label: string;
  /** Grid dimensions (matches Website map's 5x4 default). */
  cols?: number;
  rows?: number;
}

const ACCENT = "#3B82F6";

export function PlaceholderMapView({
  mapKey,
  label,
  cols = 5,
  rows = 4,
}: Props) {
  const cells = Array.from({ length: cols * rows }, (_, i) => i);

  return (
    <Stack
      spacing={2}
      sx={{
        flex: 1,
        minHeight: 0,
        p: 4,
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 1.5 }}
      >
        {label} map · placeholder
      </Typography>
      <Box
        sx={{
          width: "min(100%, 720px)",
          aspectRatio: `${cols} / ${rows}`,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: 1,
        }}
      >
        {cells.map((i) => {
          const isCenter =
            i === Math.floor(rows / 2) * cols + Math.floor(cols / 2);
          return (
            <Box
              key={`${mapKey}-${i}`}
              sx={{
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: isCenter
                  ? ACCENT
                  : "rgba(255, 255, 255, 0.12)",
                bgcolor: isCenter
                  ? "rgba(59, 130, 246, 0.12)"
                  : "rgba(255, 255, 255, 0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                color: isCenter ? "#fff" : "rgba(255,255,255,0.45)",
                fontWeight: 500,
              }}
            >
              {label.charAt(0)}·{i + 1}
            </Box>
          );
        })}
      </Box>
      <Typography
        variant="caption"
        sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 480, textAlign: "center" }}
      >
        Tile data for the {label.toLowerCase()} map will be wired up next. Use
        the switcher above to return to the Website map.
      </Typography>
    </Stack>
  );
}

export default PlaceholderMapView;
