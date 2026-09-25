"use client";

import {
  Box,
  Chip,
  IconButton,
  Paper,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  PROFILE_ASPECT_GROUP_META,
  PROFILE_ASPECT_GROUPS,
  PROFILE_ASPECT_META,
  aspectsInGroup,
} from "@4eye/types";
import { useProfileContext } from "./ProfileContext";

/**
 * ProfileContextBar — compact strip that lets the user enable profile
 * context and pick which aspects to inject. Follows the host theme.
 */
export function ProfileContextBar() {
  const { settings, setEnabled, toggleAspect, reset } = useProfileContext();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.25,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
        <PersonOutlineIcon fontSize="small" sx={{ color: "text.secondary" }} />
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 600, letterSpacing: 0.4 }}
        >
          PROFILE CONTEXT
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Switch
          size="small"
          checked={settings.enabled}
          onChange={(_, v) => setEnabled(v)}
        />
        <Tooltip title="Reset" arrow>
          <IconButton size="small" onClick={reset} sx={{ color: "text.secondary" }}>
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {!settings.enabled ? (
        <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>
          Profile context is disabled
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.85 }}>
          {PROFILE_ASPECT_GROUPS.map((group) => {
            const groupMeta = PROFILE_ASPECT_GROUP_META[group];
            return (
              <Box key={group}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: "text.disabled",
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    fontSize: 9.5,
                    mb: 0.4,
                  }}
                >
                  {groupMeta.label}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5, flexWrap: "wrap" }}>
                  {aspectsInGroup(group).map((aspect) => {
                    const meta = PROFILE_ASPECT_META[aspect];
                    const enabled = settings.includedAspects.includes(aspect);
                    return (
                      <Tooltip key={aspect} title={meta.description} arrow>
                        <Chip
                          size="small"
                          label={meta.label}
                          clickable
                          onClick={() => toggleAspect(aspect)}
                          variant={enabled ? "filled" : "outlined"}
                          color={enabled ? "primary" : "default"}
                          sx={{ height: 22 }}
                        />
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Paper>
  );
}
