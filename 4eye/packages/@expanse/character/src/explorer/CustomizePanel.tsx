"use client";

/**
 * CustomizePanel — collapsible accordion of pill buttons that mutate
 * the character configuration in {@link CharacterProfileContext}.
 * Rendered as the bottom section of {@link GuestExplorerPanel}.
 */

import {
  Box,
  Collapse,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ThemeColorSelector } from "@expanse/theme";

import { useCharacterProfile } from "./context/CharacterProfileContext";
import {
  EYE_DESIGNS,
  MOODS,
  FACE_VARIANTS,
  STRAP_STYLES,
  GLOW_COLORS,
  pillSx,
} from "./config";

const SECTION_LABEL_SX = {
  fontSize: "0.55rem",
  fontWeight: 700,
  color: "text.disabled",
  textTransform: "uppercase" as const,
  letterSpacing: "0.07em",
  mb: 0.5,
};

export function CustomizePanel() {
  const p = useCharacterProfile();

  return (
    <Box sx={{
      width: "100%"
    }}>
      <Divider sx={{ my: 0.5 }} />
      {/* Accordion toggle */}
      <Stack
        direction="row"
        sx={{
          cursor: "pointer",
          px: 0.5,
          py: 0.5,
          borderRadius: 1,
          alignItems: "center",
          justifyContent: "space-between",
          "&:hover": { bgcolor: "action.hover" },
        }}
        onClick={p.toggleCustomize}
        role="button"
        aria-expanded={p.customizeOpen}
        aria-controls="character-customize-panel"
        data-testid="customize-toggle"
      >
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <TuneIcon sx={{ fontSize: 12, color: "text.secondary" }} />
          <Typography
            sx={{
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Customize
          </Typography>
        </Stack>
        <ExpandLessIcon
          sx={{
            fontSize: 14,
            color: "text.secondary",
            transform: p.customizeOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s",
          }}
        />
      </Stack>
      <Collapse in={p.customizeOpen} id="character-customize-panel">
        <Stack spacing={1.5} sx={{ pt: 1, pb: 0.5 }}>
          {/* Lens (eye design) */}
          <Box>
            <Typography sx={SECTION_LABEL_SX}>Lens</Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {EYE_DESIGNS.map(({ value, label }) => (
                <Box
                  key={value}
                  component="button"
                  onClick={() => p.setLens(value)}
                  sx={pillSx(p.lens === value)}
                >
                  {label}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Mood — Scan ▶ activates the scan beam on the Scanner lens */}
          <Box>
            <Typography sx={SECTION_LABEL_SX}>Mood</Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {MOODS.map(({ value, label }) => (
                <Box
                  key={value}
                  component="button"
                  onClick={() => p.setMood(value)}
                  sx={pillSx(p.mood === value)}
                >
                  {label}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Face */}
          <Box>
            <Typography sx={SECTION_LABEL_SX}>Face</Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {FACE_VARIANTS.map(({ value, label }) => (
                <Box
                  key={value}
                  component="button"
                  onClick={() => p.setVariant(value)}
                  sx={pillSx(p.variant === value)}
                >
                  {label}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Visor */}
          <Box>
            <Typography sx={SECTION_LABEL_SX}>Visor</Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {STRAP_STYLES.map(({ value, label }) => (
                <Box
                  key={value}
                  component="button"
                  onClick={() => p.setStrap(value)}
                  sx={pillSx(p.strap === value)}
                >
                  {label}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Glow color */}
          <Box>
            <Typography sx={SECTION_LABEL_SX}>Glow</Typography>
            <Stack direction="row" sx={{ gap: 0.75, flexWrap: "wrap" }}>
              {GLOW_COLORS.map(({ color, label }) => (
                <Tooltip key={color} title={label} arrow placement="top">
                  <Box
                    component="button"
                    onClick={() => p.setGlow(color)}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor: color,
                      border: "2px solid",
                      borderColor: p.glow === color ? "text.primary" : "transparent",
                      cursor: "pointer",
                      outline: p.glow === color ? `2px solid ${color}` : "none",
                      outlineOffset: 2,
                      transition: "all 0.15s",
                      "&:hover": { transform: "scale(1.15)" },
                      boxShadow: p.glow === color ? `0 0 6px ${color}99` : "none",
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>

          {/* Extras */}
          <Box>
            <Typography sx={SECTION_LABEL_SX}>Extras</Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {[
                { label: "Antenna", active: p.showAntenna,      toggle: p.toggleAntenna },
                { label: "LEDs",    active: p.showLEDs,         toggle: p.toggleLEDs },
                { label: "Ears",    active: p.showEarSensors,   toggle: p.toggleEarSensors },
                { label: "Mark",    active: p.showForeheadMark, toggle: p.toggleForeheadMark },
                { label: "Flow",    active: p.showDataFlow,     toggle: p.toggleDataFlow },
              ].map(({ label, active, toggle }) => (
                <Box
                  key={label}
                  component="button"
                  onClick={toggle}
                  sx={pillSx(active)}
                >
                  {label}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Theme */}
          <Box>
            <Typography sx={{ ...SECTION_LABEL_SX, mb: 0.75 }}>Theme</Typography>
            <ThemeColorSelector size="small" visibleCount={4} />
          </Box>
        </Stack>
      </Collapse>
    </Box>
  );
}
