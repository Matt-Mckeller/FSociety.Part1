"use client";

import { useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { ENTITY_KIND_BY_KEY } from "./entityKinds";
import { useContextData } from "./ContextDataContext";
import { Symbol } from "../symbols";

/**
 * PipelineListView — manager view for the Pipelines kind. Identical
 * shell to {@link EntityListView} but each row is expandable on click
 * to reveal the pipeline's `summary` and ordered `stages`. Toggle
 * selection happens via the trailing checkbox so the row body can
 * own the expand interaction.
 *
 * Phase 1 ships read-only stages (no editor) per the implementation
 * plan; the editor lands in a follow-up.
 */
export function PipelineListView() {
  const meta = ENTITY_KIND_BY_KEY.pipelines;
  const ctx = useContextData();
  const items = ctx.pipelines;
  const selected = ctx.selectedContext.pipelines;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <Typography variant="h6" sx={{ color: meta.color, fontWeight: 700 }}>
          {meta.label}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {meta.description}
        </Typography>
      </Box>
      <List sx={{ flex: 1, overflowY: "auto", py: 0 }}>
        {items.length === 0 && (
          <ListItem>
            <ListItemText
              primary="No pipelines yet"
              secondary="Add a pipeline to chain processing stages over the current selection"
            />
          </ListItem>
        )}
        {items.map((p) => {
          const isSelected = selected.includes(p.id);
          const isExpanded = expandedId === p.id;
          return (
            <Box key={p.id}>
              <ListItem
                disablePadding
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={isSelected}
                    onChange={() => ctx.toggleSelect("pipelines", p.id)}
                    sx={{
                      color: meta.color,
                      "&.Mui-checked": { color: meta.color },
                    }}
                  />
                }
              >
                <ListItemButton
                  onClick={() => setExpandedId(isExpanded ? null : p.id)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <IconButton size="small" tabIndex={-1} disableRipple>
                      {isExpanded ? (
                        <ExpandMoreRoundedIcon fontSize="small" />
                      ) : (
                        <ChevronRightRoundedIcon fontSize="small" />
                      )}
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <Symbol name={p.symbol} color={p.symbolColor} size={32} />
                  </ListItemIcon>
                  <ListItemText
                    primary={p.name}
                    secondary={p.summary}
                    primaryTypographyProps={{ sx: { fontWeight: 600 } }}
                  />
                </ListItemButton>
              </ListItem>
              <Collapse in={isExpanded} unmountOnExit>
                <Box
                  sx={{
                    px: 3,
                    py: 1.5,
                    bgcolor: "rgba(6,182,212,0.06)",
                    borderTop: "1px solid rgba(6,182,212,0.15)",
                    borderBottom: "1px solid rgba(6,182,212,0.15)",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: "text.secondary", letterSpacing: 1.2 }}
                  >
                    Stages
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    {p.stages.map((stage, i) => (
                      <Stack
                        key={`${p.id}-stage-${i}`}
                        direction="row"
                        spacing={1.5}
                        sx={{
                          alignItems: "flex-start"
                        }}
                      >
                        <Chip
                          size="small"
                          label={i + 1}
                          sx={{
                            bgcolor: meta.color,
                            color: "white",
                            fontWeight: 700,
                            minWidth: 28,
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600 }}
                          >
                            {stage.name}
                          </Typography>
                          {stage.description && (
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              {stage.description}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    ))}
                    {p.stages.length === 0 && (
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        No stages defined.
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
