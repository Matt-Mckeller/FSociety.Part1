"use client";

import { Box, Button, Stack, Typography, alpha } from "@mui/material";
import { matchesRlPersonal, RL_PERSONAL_AI_SETTINGS } from "@4eye/types";
import { useAISettings } from "@4eye/features";

export function RlPersonalBar() {
  const { settings, loadSettings } = useAISettings();
  const on = matchesRlPersonal(settings);

  return (
    <Box
      sx={{
        p: 1.5,
        mb: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: on ? alpha("#c026d3", 0.5) : "divider",
        bgcolor: on ? alpha("#c026d3", 0.08) : "transparent",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 13 }}>RL Personal</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            100% · time all · concise · extra high
          </Typography>
        </Box>
        <Button
          size="small"
          variant={on ? "contained" : "outlined"}
          onClick={() => loadSettings(RL_PERSONAL_AI_SETTINGS)}
          sx={
            on
              ? { bgcolor: "#c026d3", "&:hover": { bgcolor: "#a21caf" }, textTransform: "none", fontWeight: 700 }
              : { textTransform: "none", fontWeight: 700 }
          }
        >
          {on ? "On" : "Apply"}
        </Button>
      </Stack>
    </Box>
  );
}
