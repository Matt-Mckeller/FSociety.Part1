"use client";

import { Box, Stack, Typography, alpha } from "@mui/material";
import { TileContainer } from "@expanse/hud";
import type { RlSignal } from "@4eye/types";
import { RL_SIGNALS } from "@4eye/types";
import { latestDelta, useRlEpisode } from "./rl/useRlEpisode";

const COPY: Record<RlSignal, string> = {
  vision: "One purple ball. Flying. Count = 1.",
  concise: "One beat until a curtain is pulled.",
  curtain: "Name the cloth. Then pull. Then speak.",
  search: "Query → moment. Not the whole file.",
};

export function PerformanceTile() {
  const { episode } = useRlEpisode();

  return (
    <TileContainer mode="fit">
      <Box sx={{ width: "100%", height: "100%", p: 2.5, color: "text.primary", overflowY: "auto" }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1, display: "block" }}
        >
          Technical · Performance
        </Typography>
        <Typography sx={{ fontWeight: 800, mt: 0.5, mb: 2 }}>
          Four marks. No vanity score.
        </Typography>
        <Stack spacing={1.25}>
          {RL_SIGNALS.map((signal) => {
            const d = latestDelta(episode, signal);
            const color = d === 1 ? "#22c55e" : d === -1 ? "#f59e0b" : "#64748b";
            return (
              <Box
                key={signal}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: alpha(color, 0.45),
                  bgcolor: alpha(color, 0.08),
                }}
              >
                <Typography sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, color, fontSize: 12 }}>
                  {signal} {d === 1 ? "+1" : d === -1 ? "−1" : "unmarked"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                  {COPY[signal]}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </TileContainer>
  );
}
