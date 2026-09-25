"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { COLORS, COLOR_MAP, type SymbolColor, type SymbolName } from "@4eye/types";
import { Symbol } from "../symbols/Symbol";
import { PresetSymbol, type PresetVariant, type SatelliteSymbol } from "./PresetSymbol";
import { usePresets } from "./PresetsContext";
import { useChatInputContext } from "../chat-input-context/ChatInputContext";
import { useAISettings } from "../ai-settings/AISettingsContext";
import { useGoals } from "../goals/GoalsContext";
import { useProjects } from "../goals/ProjectsContext";
import { useDomain } from "../domain/DomainContext";
import { useContextData } from "../context-data/ContextDataContext";
import type { SelectedContextKey } from "@4eye/types";

const SYMBOL_OPTIONS: SymbolName[] = [
  "Star", "Heart", "Diamond", "Lightning", "Moon", "Sun",
  "Circle", "Square", "Triangle", "Wave", "Arrow", "Cross",
  "Person", "Group", "Place", "AutoStories", "Movie", "Image",
  "Pipeline", "Preset",
];

interface SavePresetDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * SavePresetDialog — captures a name, symbol, and color for a new
 * Preset, then snapshots the full current context (entities, domain,
 * goals, project, AI settings) on Save.
 *
 * On open, it auto-derives a symbol + variant from the current entity
 * selections so the visual identity already reflects the recipe.
 * The user can override every detail before saving.
 */
export function SavePresetDialog({ open, onClose }: SavePresetDialogProps) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState<SymbolName>("Preset");
  const [color, setColor] = useState<SymbolColor>("purple");
  const [variant, setVariant] = useState<PresetVariant>("ring");
  const [satellites, setSatellites] = useState<SatelliteSymbol[]>([]);

  const { savePreset } = usePresets();
  const { payload } = useChatInputContext();
  const { settings: aiSettings } = useAISettings();
  const { selectedGoals } = useGoals();
  const { selectedProjects } = useProjects();
  const { domainConfig } = useDomain();
  const { getById } = useContextData();

  // Auto-derive symbol/variant from selected context when the dialog opens
  useEffect(() => {
    if (!open) return;

    const ctx = payload.selectedContext;
    // Sort entity keys by how many IDs are selected (descending)
    const ranked = (Object.keys(ctx) as SelectedContextKey[])
      .map((key) => ({ key, ids: ctx[key] ?? [] }))
      .filter((e) => e.ids.length > 0)
      .sort((a, b) => b.ids.length - a.ids.length);

    if (ranked.length === 0) {
      // No context — keep defaults but reset to simple ring
      setSymbol("Preset");
      setColor("purple");
      setVariant("ring");
      setSatellites([]);
      return;
    }

    // Derive main symbol from the top-ranked entity kind
    const topKind = ranked[0];
    const topEntity = getById(topKind.key, topKind.ids[0]) as
      | { symbol: SymbolName; symbolColor: SymbolColor }
      | undefined;

    const derivedSymbol = topEntity?.symbol ?? "Preset";
    const derivedColor = topEntity?.symbolColor ?? "purple";

    // Derive satellites from next 1–2 kinds
    const derivedSatellites: SatelliteSymbol[] = ranked
      .slice(1, 3)
      .map((kind) => {
        const entity = getById(kind.key, kind.ids[0]) as
          | { symbol: SymbolName; symbolColor: SymbolColor }
          | undefined;
        return entity
          ? { symbol: entity.symbol, symbolColor: entity.symbolColor }
          : null;
      })
      .filter((s): s is SatelliteSymbol => s !== null);

    // Pick variant based on number of active kinds
    let derivedVariant: PresetVariant = "ring";
    if (ranked.length >= 3) {
      derivedVariant = derivedSatellites.length >= 2 ? "rosette" : "ring";
    } else if (ranked.length === 2) {
      derivedVariant = "rosette";
    }

    setSymbol(derivedSymbol);
    setColor(derivedColor);
    setVariant(derivedVariant);
    setSatellites(derivedSatellites);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps — intentionally only on open toggle

  const handleSave = () => {
    if (!name.trim()) return;
    savePreset({
      name: name.trim(),
      symbol,
      symbolColor: color,
      symbolVariant: variant,
      symbolSatellites: satellites.length > 0
        ? satellites.map((s) => ({ symbol: s.symbol, symbolColor: s.symbolColor }))
        : undefined,
      recipe: payload.selectedContext,
      meta: {
        domainId: domainConfig?.id ?? null,
        goalIds: selectedGoals.filter((g) => !g.ephemeral).map((g) => g.id),
        projectId: selectedProjects[0]?.id ?? null,
        aiSettings: aiSettings as unknown as Record<string, unknown>,
      },
    });
    setName("");
    setSymbol("Preset");
    setColor("purple");
    setVariant("ring");
    setSatellites([]);
    onClose();
  };

  const recipeSize = Object.values(payload.selectedContext).reduce(
    (sum, ids) => sum + ids.length,
    0,
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pb: 1,
          color: "white",
          fontWeight: 700,
        }}
      >
        <BookmarksIcon sx={{ color: "#f43f5e", fontSize: 20 }} />
        Save as Preset
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
        {/* Preview */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PresetSymbol
            symbol={symbol}
            symbolColor={color}
            recipeSize={recipeSize}
            size="lg"
            variant={variant}
            satellites={satellites}
            label={name || "Untitled Preset"}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
              {name || "Untitled Preset"}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>
              {recipeSize} item{recipeSize !== 1 ? "s" : ""} in recipe
            </Typography>
            {/* Auto-derive hint */}
            {recipeSize > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                <AutoFixHighIcon sx={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }} />
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>
                  Style auto-derived from context
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Variant picker */}
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "rgba(255,255,255,0.45)", letterSpacing: 1.2, display: "block", mb: 0.75 }}
          >
            Style
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {(["ring", "rosette", "stack", "orbit", "mosaic", "monogram"] as PresetVariant[]).map((v) => (
              <ButtonBase
                key={v}
                onClick={() => setVariant(v)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                  p: 1,
                  borderRadius: 1.5,
                  border: variant === v
                    ? `2px solid ${COLOR_MAP[color]}`
                    : "2px solid rgba(255,255,255,0.08)",
                  bgcolor: variant === v ? `${COLOR_MAP[color]}14` : "transparent",
                  minWidth: 56,
                }}
              >
                <PresetSymbol
                  symbol={symbol}
                  symbolColor={color}
                  size="sm"
                  variant={v}
                  satellites={satellites}
                  monogramText={name ? name.slice(0, 2) : "P"}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 9,
                    color: variant === v ? COLOR_MAP[color] : "rgba(255,255,255,0.4)",
                    textTransform: "capitalize",
                  }}
                >
                  {v}
                </Typography>
              </ButtonBase>
            ))}
          </Box>
        </Box>

        {/* Name */}
        <TextField
          label="Preset name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          fullWidth
          autoFocus
          size="small"
          inputProps={{ maxLength: 48 }}
          sx={{
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.18)",
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
          }}
        />

        {/* Symbol picker */}
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "rgba(255,255,255,0.45)", letterSpacing: 1.2, display: "block", mb: 0.75 }}
          >
            Symbol
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {SYMBOL_OPTIONS.map((s) => (
              <ButtonBase
                key={s}
                onClick={() => setSymbol(s)}
                sx={{
                  borderRadius: 1,
                  border: symbol === s ? `2px solid ${COLOR_MAP[color]}` : "2px solid transparent",
                  p: 0.25,
                }}
              >
                <Symbol name={s} color={color} size={28} variant={symbol === s ? "filled" : "ghost"} />
              </ButtonBase>
            ))}
          </Box>
        </Box>

        {/* Color picker */}
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "rgba(255,255,255,0.45)", letterSpacing: 1.2, display: "block", mb: 0.75 }}
          >
            Color
          </Typography>
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            {COLORS.map((c) => (
              <ButtonBase
                key={c}
                onClick={() => setColor(c)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: COLOR_MAP[c],
                  border: color === c ? "3px solid white" : "3px solid transparent",
                  boxShadow: color === c ? `0 0 0 2px ${COLOR_MAP[c]}` : "none",
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{ color: "rgba(255,255,255,0.5)", textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!name.trim()}
          variant="contained"
          sx={{
            bgcolor: "#f43f5e",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#e11d48" },
            "&.Mui-disabled": { bgcolor: "rgba(244,63,94,0.3)", color: "rgba(255,255,255,0.4)" },
          }}
        >
          Save Preset
        </Button>
      </DialogActions>
    </Dialog>
  );
}
