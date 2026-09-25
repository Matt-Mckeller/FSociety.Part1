"use client";

import {
  Box,
  Chip,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TuneIcon from "@mui/icons-material/Tune";
import { useContextActionBar } from "./ContextActionBarContext";

/**
 * ContextActionBar — compact strip of toggleable directives that ride
 * along with the next chat input.
 */
export function ContextActionBar() {
  const { actions, toggleAction, resetActions, enabledActions } =
    useContextActionBar();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.25,
        bgcolor: "rgba(25, 25, 30, 0.85)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
        <TuneIcon fontSize="small" sx={{ color: "rgba(255,255,255,0.6)" }} />
        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: 0.4 }}
        >
          ACTIONS
          {enabledActions.length > 0 ? ` · ${enabledActions.length}` : ""}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Tooltip title="Reset to defaults" arrow>
          <IconButton
            size="small"
            onClick={resetActions}
            sx={{ color: "rgba(255,255,255,0.5)" }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5, flexWrap: "wrap" }}>
        {actions.map((a) => (
          <Tooltip key={a.id} title={a.description ?? ""} arrow>
            <Chip
              size="small"
              label={a.label}
              clickable
              onClick={() => toggleAction(a.id)}
              variant={a.enabled ? "filled" : "outlined"}
              color={a.enabled ? "primary" : "default"}
              sx={{
                color: a.enabled ? "white" : "rgba(255,255,255,0.7)",
                border: a.enabled ? undefined : "1px solid rgba(255,255,255,0.18)",
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Paper>
  );
}
