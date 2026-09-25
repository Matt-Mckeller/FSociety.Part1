"use client";

import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { usePresets } from "./PresetsContext";
import { PresetSymbol } from "./PresetSymbol";
import { SavePresetDialog } from "./SavePresetDialog";
import type { Preset } from "@4eye/types";
import type { SelectedContext } from "@4eye/types";

/** Human-readable summary of a preset's recipe. */
function recipeSummary(recipe: SelectedContext, meta: Preset["meta"]): string {
  const parts: string[] = [];
  if (recipe.targets?.length) parts.push(`${recipe.targets.length} target${recipe.targets.length !== 1 ? "s" : ""}`);
  if (recipe.audiences?.length) parts.push(`${recipe.audiences.length} aud.`);
  if (recipe.locations?.length) parts.push(`${recipe.locations.length} loc.`);
  if (recipe.pipelines?.length) parts.push(`${recipe.pipelines.length} pipeline${recipe.pipelines.length !== 1 ? "s" : ""}`);
  if (recipe.stories?.length) parts.push(`${recipe.stories.length} stor.`);
  if (recipe.animations?.length) parts.push(`${recipe.animations.length} anim.`);
  if (recipe.scenes?.length) parts.push(`${recipe.scenes.length} scene${recipe.scenes.length !== 1 ? "s" : ""}`);
  if (meta.goalIds?.length) parts.push(`${meta.goalIds.length} goal${meta.goalIds.length !== 1 ? "s" : ""}`);
  if (meta.domainId) parts.push("Domain");
  if (meta.aiSettings) parts.push("AI ⚙");
  return parts.join(" · ") || "Empty";
}

/**
 * PresetsPanel — viewport panel for the Presets meta-tile.
 *
 * Shows:
 *  - a "Save current as preset" button in the header
 *  - a list of saved presets, each with its PresetSymbol + name + recipe summary
 *  - per-row Apply (▶) and Delete (🗑) actions
 *
 * Apply opens the ApplyPresetDialog (managed by PresetsContext).
 * Save opens the SavePresetDialog modal.
 */
export function PresetsPanel() {
  const { presets, requestApplyPreset, deletePreset } = usePresets();
  const [saveOpen, setSaveOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BookmarksIcon sx={{ color: "#f43f5e", fontSize: 18 }} />
            <Typography variant="h6" sx={{ color: "#f43f5e", fontWeight: 700 }}>
              Presets
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setSaveOpen(true)}
            sx={{
              textTransform: "none",
              fontSize: 12,
              color: "#f43f5e",
              borderColor: "#f43f5e",
              "&:hover": { bgcolor: "rgba(244,63,94,0.06)" },
            }}
            variant="outlined"
          >
            Save current
          </Button>
        </Box>

        {/* List */}
        <List sx={{ flex: 1, overflowY: "auto", py: 0 }}>
          {presets.length === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
                gap: 1,
                color: "text.secondary",
              }}
            >
              <BookmarksIcon sx={{ fontSize: 36, opacity: 0.3 }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                No presets saved yet
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center", px: 3 }}>
                Build a selection and tap "Save current" to create a reusable preset.
              </Typography>
            </Box>
          )}
          {presets.map((p) => {
            const total = Object.values(p.recipe).reduce(
              (s, ids) => s + (ids?.length ?? 0),
              0,
            );
            return (
              <ListItem
                key={p.id}
                disablePadding
                sx={{
                  px: 2,
                  py: 0.75,
                  borderBottom: "1px solid rgba(0,0,0,0.04)",
                  "&:hover": { bgcolor: "rgba(244,63,94,0.03)" },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    alignItems: "center",
                    flex: 1
                  }}>
                  <PresetSymbol
                    symbol={p.symbol}
                    symbolColor={p.symbolColor}
                    recipeSize={total}
                    size="sm"
                    label={p.name}
                    variant={p.symbolVariant ?? "ring"}
                    satellites={
                      p.symbolSatellites?.map((s) => ({
                        symbol: s.symbol,
                        symbolColor: s.symbolColor,
                      })) ?? []
                    }
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {p.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}
                    >
                      {recipeSummary(p.recipe, p.meta)}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={0.25}>
                    <Tooltip title="Apply preset" arrow>
                      <IconButton
                        size="small"
                        onClick={() => requestApplyPreset(p.id)}
                        sx={{ color: "#22c55e" }}
                      >
                        <PlayArrowRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete preset" arrow>
                      <IconButton
                        size="small"
                        onClick={() => deletePreset(p.id)}
                        sx={{ color: "rgba(0,0,0,0.4)", "&:hover": { color: "#ef4444" } }}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <SavePresetDialog open={saveOpen} onClose={() => setSaveOpen(false)} />
    </>
  );
}
