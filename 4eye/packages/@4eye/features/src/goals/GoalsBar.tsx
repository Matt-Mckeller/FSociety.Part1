"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Symbol } from "../symbols";
import { useGoals } from "./GoalsContext";

/**
 * GoalsBar — pill that opens a menu of available goals (filtered by
 * the current domain). Selected goals appear as removable chips.
 */
export function GoalsBar() {
  const {
    goals,
    selectedGoals,
    isGoalSelected,
    toggleGoal,
    canSelectMore,
  } = useGoals();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Button
        size="small"
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={<FlagIcon />}
        endIcon={<ExpandMoreIcon />}
        sx={{
          textTransform: "none",
          color: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(255,255,255,0.15)",
          bgcolor: "rgba(255,255,255,0.04)",
        }}
      >
        Goals
        {selectedGoals.length > 0 ? ` · ${selectedGoals.length}` : ""}
      </Button>

      {selectedGoals.map((g) => (
        <Chip
          key={g.id}
          size="small"
          label={g.word}
          onDelete={() => toggleGoal(g.id)}
          icon={<Symbol name={g.symbol} color={g.symbolColor} size={18} variant="ghost" />}
          sx={{ ml: 0.25 }}
        />
      ))}

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{ paper: { sx: { minWidth: 260, maxHeight: 360 } } }}
      >
        {goals.length === 0 && (
          <MenuItem disabled>
            <Typography variant="body2">No goals available in this domain</Typography>
          </MenuItem>
        )}
        {goals.map((g) => {
          const selected = isGoalSelected(g.id);
          const disabled = !selected && !canSelectMore;
          return (
            <MenuItem
              key={g.id}
              selected={selected}
              disabled={disabled}
              onClick={() => toggleGoal(g.id)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
                <Symbol name={g.symbol} color={g.symbolColor} size={28} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {g.word}
                  </Typography>
                  {g.description && (
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {g.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </MenuItem>
          );
        })}
        <Divider />
        <MenuItem disabled>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {selectedGoals.length}/3 selected
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
