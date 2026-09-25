"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import RefreshIcon from "@mui/icons-material/Refresh";
import { usePresets } from "./PresetsContext";
import { PresetSymbol } from "./PresetSymbol";
import { useContextData } from "../context-data/ContextDataContext";
import { useGoals } from "../goals/GoalsContext";
import { useProjects } from "../goals/ProjectsContext";
import { useDomain } from "../domain/DomainContext";
import { useAISettings } from "../ai-settings/AISettingsContext";
import type { SelectedContext } from "@4eye/types";
import type { AISettings } from "@4eye/types";

/**
 * ApplyPresetDialog — shown when the user taps Apply on a preset row.
 * Offers two modes:
 *   Replace — clears current selection and loads the preset's recipe
 *   Merge   — adds the preset's recipe IDs on top of the current selection
 */
export function ApplyPresetDialog() {
  const { pendingApplyId, getPresetById, dismissApply } = usePresets();
  const ctx = useContextData();
  const { clearSelectedGoals, selectGoal } = useGoals();
  const { clearSelectedProjects, selectProject } = useProjects();
  const { setDomain } = useDomain();
  const { loadSettings } = useAISettings();

  const preset = pendingApplyId ? getPresetById(pendingApplyId) : null;

  if (!preset) return null;

  const recipeSize = Object.values(preset.recipe).reduce(
    (sum, ids) => sum + (ids?.length ?? 0),
    0,
  );

  /** Apply all non-entity context from the preset's meta. */
  const applyMeta = () => {
    if (preset.meta.domainId) setDomain(preset.meta.domainId as Parameters<typeof setDomain>[0]);
    if (preset.meta.goalIds) {
      clearSelectedGoals();
      preset.meta.goalIds.forEach(selectGoal);
    }
    if (preset.meta.projectId) {
      clearSelectedProjects();
      selectProject(preset.meta.projectId);
    }
    if (preset.meta.aiSettings) loadSettings(preset.meta.aiSettings as Partial<AISettings>);
  };

  const handleReplace = () => {
    ctx.clearSelectedContext();
    applyMeta();
    // Re-select all IDs from the recipe
    const keys = Object.keys(preset.recipe) as (keyof SelectedContext)[];
    for (const key of keys) {
      for (const id of preset.recipe[key]) {
        ctx.toggleSelect(key, id);
      }
    }
    dismissApply();
  };

  const handleMerge = () => {
    applyMeta();
    const keys = Object.keys(preset.recipe) as (keyof SelectedContext)[];
    for (const key of keys) {
      for (const id of preset.recipe[key]) {
        // toggleSelect is idempotent here: only adds if not already present
        if (!ctx.selectedContext[key].includes(id)) {
          ctx.toggleSelect(key, id);
        }
      }
    }
    dismissApply();
  };

  /** Format the recipe as a human-readable summary line. */
  const recipeSummary = (() => {
    const parts: string[] = [];
    const r = preset.recipe;
    if (r.targets?.length) parts.push(`${r.targets.length} target${r.targets.length !== 1 ? "s" : ""}`);
    if (r.audiences?.length) parts.push(`${r.audiences.length} audience${r.audiences.length !== 1 ? "s" : ""}`);
    if (r.locations?.length) parts.push(`${r.locations.length} loc.`);
    if (r.stories?.length) parts.push(`${r.stories.length} stor.`);
    if (r.animations?.length) parts.push(`${r.animations.length} anim.`);
    if (r.scenes?.length) parts.push(`${r.scenes.length} scene${r.scenes.length !== 1 ? "s" : ""}`);
    if (r.pipelines?.length) parts.push(`${r.pipelines.length} pipeline${r.pipelines.length !== 1 ? "s" : ""}`);
    return parts.join(" · ") || "No entity selections";
  })();

  return (
    <Dialog
      open={Boolean(pendingApplyId)}
      onClose={dismissApply}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "rgba(18,18,24,0.98)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "white",
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle sx={{ color: "white", fontWeight: 700, pb: 1 }}>
        Apply Preset
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        {/* Preset identity */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <PresetSymbol
            symbol={preset.symbol}
            symbolColor={preset.symbolColor}
            recipeSize={recipeSize}
            size="md"
          />
          <Box>
            <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 700 }}>
              {preset.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>
              {recipeSummary}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

        {/* Mode explanations */}
        <Stack spacing={1.5}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1.5,
              border: "1px solid rgba(239,68,68,0.35)",
              bgcolor: "rgba(239,68,68,0.07)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <RefreshIcon sx={{ fontSize: 16, color: "#ef4444" }} />
              <Typography variant="caption" sx={{ color: "#ef4444", fontWeight: 700 }}>
                Replace
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
              Clears all current selections and loads the preset exactly.
              Also restores Domain, Goals, Project, and AI Settings.
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1.5,
              border: "1px solid rgba(34,197,94,0.35)",
              bgcolor: "rgba(34,197,94,0.07)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <MergeTypeIcon sx={{ fontSize: 16, color: "#22c55e" }} />
              <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 700 }}>
                Merge
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
              Adds preset selections on top of your current ones.
              Domain, Goals, Project, and AI Settings are still overwritten.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={dismissApply}
          sx={{ color: "rgba(255,255,255,0.5)", textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleMerge}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#22c55e",
            color: "#22c55e",
            "&:hover": { bgcolor: "rgba(34,197,94,0.08)" },
          }}
        >
          Merge
        </Button>
        <Button
          onClick={handleReplace}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            bgcolor: "#ef4444",
            "&:hover": { bgcolor: "#dc2626" },
          }}
        >
          Replace
        </Button>
      </DialogActions>
    </Dialog>
  );
}
