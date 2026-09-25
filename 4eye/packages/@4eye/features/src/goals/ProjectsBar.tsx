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
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Symbol } from "../symbols";
import { useProjects } from "./ProjectsContext";

/**
 * ProjectsBar — twin of GoalsBar but for active Projects.
 */
export function ProjectsBar() {
  const {
    projects,
    selectedProjects,
    isProjectSelected,
    toggleProject,
    canSelectMore,
  } = useProjects();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Button
        size="small"
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={<FolderSpecialIcon />}
        endIcon={<ExpandMoreIcon />}
        sx={{
          textTransform: "none",
          color: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(255,255,255,0.15)",
          bgcolor: "rgba(255,255,255,0.04)",
        }}
      >
        Projects
        {selectedProjects.length > 0 ? ` · ${selectedProjects.length}` : ""}
      </Button>

      {selectedProjects.map((p) => (
        <Chip
          key={p.id}
          size="small"
          label={p.name}
          onDelete={() => toggleProject(p.id)}
          icon={<Symbol name={p.symbol} color={p.symbolColor} size={18} variant="ghost" />}
          sx={{ ml: 0.25 }}
        />
      ))}

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{ paper: { sx: { minWidth: 260, maxHeight: 360 } } }}
      >
        {projects.length === 0 && (
          <MenuItem disabled>
            <Typography variant="body2">No projects in this domain</Typography>
          </MenuItem>
        )}
        {projects.map((p) => {
          const selected = isProjectSelected(p.id);
          const disabled = !selected && !canSelectMore;
          return (
            <MenuItem
              key={p.id}
              selected={selected}
              disabled={disabled}
              onClick={() => toggleProject(p.id)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
                <Symbol name={p.symbol} color={p.symbolColor} size={28} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {p.name}
                  </Typography>
                  {p.description && (
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {p.description}
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
            {selectedProjects.length}/3 selected
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
