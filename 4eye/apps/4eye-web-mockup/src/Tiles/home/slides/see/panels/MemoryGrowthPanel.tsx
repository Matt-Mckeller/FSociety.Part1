"use client";

import { Box, Stack, Typography } from "@mui/material";
import {
  LENS_EXAMPLES,
  LENS_TINTS,
} from "@4eye/web/Tiles/home/slides/see/state/lensExamples";
import { WithoutCell } from "@4eye/web/Tiles/home/slides/see/cells/WithoutCell";
import { WithCell } from "@4eye/web/Tiles/home/slides/see/cells/WithCell";
import { ArrowFlow } from "@4eye/web/Tiles/home/slides/see/cells/ArrowFlow";

const MEMORY_GROWTH_IDS = ["memory", "capture", "reemerge"];

/**
 * MemoryGrowthPanel — three Without/With rows for memory & growth glimpses.
 * The shared WipeHeader (heads + Without/With labels) is rendered once by
 * `SeeGlimpses` above this panel; this component only renders the rows.
 * Each row's title is centered above the 3-column grid.
 */
export function MemoryGrowthPanel() {
  const rows = LENS_EXAMPLES.filter((e) => MEMORY_GROWTH_IDS.includes(e.id));

  return (
    <Box>
      <Stack spacing={5}>
        {rows.map((ex) => {
          const tint = LENS_TINTS[ex.tint];
          return (
            <Box key={ex.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                {ex.Icon ? (
                  <ex.Icon
                    style={{ fontSize: 18, color: tint.fg, opacity: 0.85 }}
                  />
                ) : null}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    letterSpacing: "-0.01em",
                    color: "text.primary",
                    lineHeight: 1.2,
                  }}
                >
                  {ex.label}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 84px 1fr",
                    sm: "1fr 120px 1fr",
                  },
                  alignItems: "stretch",
                  columnGap: { xs: 1.25, sm: 2 },
                }}
              >
                <WithoutCell ex={ex} />
                <ArrowFlow tintColor={tint.fg} />
                <WithCell ex={ex} mode="enable" />
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
