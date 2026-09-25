"use client";

/**
 * LayerColumn — the left-pane list of product layers.
 *
 * Far-left gutter is an aligned "current" column: build-status chip + row number
 * (1 = Human … 8 = AION), locked to a fixed-width vertical rail so the numbers
 * line up perfectly. Each row keeps the blade aesthetic (accent stripes, LED
 * motif, schematic on hover) compacted for the column.
 */

import { Box, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import type { SvgIconProps } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import type { IntegrationLayer } from "../model/layers";
import { STATUS_META } from "../model/layers";
import { LayerSvgGraphic } from "@4eye/web/Tiles/sample/components/LayerSvgGraphics";
import { useLayerSurface, useLayerInk } from "./surfaceTokens";

/** Custom row cursor — a circle reticle with a right chevron inset so the circle visibly extends past the chevron's right edge. */
function rowCursor(accentColor: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'>
    <circle cx='12' cy='14' r='9' fill='rgba(9,11,26,0.88)' stroke='${accentColor}' stroke-width='1.4' />
    <path d='M9 9l5 5-5 5' fill='none' stroke='${accentColor}' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' />
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 12 14, pointer`;
}

const ICONS: Record<string, React.ComponentType<SvgIconProps>> = {
  human: PersonRoundedIcon,
  computer: DesktopWindowsRoundedIcon,
  robot: SmartToyRoundedIcon,
  store: StorefrontRoundedIcon,
  neural: PsychologyRoundedIcon,
  glasses: VisibilityRoundedIcon,
  brainwave: HubRoundedIcon,
  aion: AutoAwesomeRoundedIcon,
};

interface LayerColumnProps {
  layers: IntegrationLayer[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function LayerColumn({ layers, selectedId, onSelect }: LayerColumnProps) {
  const surface = useLayerSurface();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      {/* affordance hint — these rows are interactive */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, pl: "52px", mb: 0.25 }}>
        <TouchAppRoundedIcon sx={{ fontSize: 13, color: surface.text.faint }} />
        <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: surface.text.faint }}>
          Select a layer to inspect
        </Typography>
      </Box>
      {layers.map((layer, i) => (
        <LayerRow
          key={layer.id}
          layer={layer}
          selected={selectedId === layer.id}
          onSelect={() => onSelect(layer.id)}
          delay={i * 0.04}
        />
      ))}
    </Box>
  );
}

function LayerRow({
  layer,
  selected,
  onSelect,
  delay,
}: {
  layer: IntegrationLayer;
  selected: boolean;
  onSelect: () => void;
  delay: number;
}) {
  const { accentColor } = layer;
  const status = STATUS_META[layer.status];
  const Icon = ICONS[layer.id] ?? HubRoundedIcon;
  const surface = useLayerSurface();
  const { ink, tint, mode } = useLayerInk(layer);
  const dark = mode === "dark";

  const rowBackground = dark
    ? selected
      ? `linear-gradient(90deg, ${tint}dd 0%, ${tint}99 60%, ${tint}55 100%)`
      : `linear-gradient(90deg, ${tint}77 0%, ${surface.chromeBg} 70%)`
    : selected
      ? `linear-gradient(90deg, ${alpha(tint, 0.24)} 0%, ${alpha(tint, 0.12)} 65%, ${surface.chromeBg} 100%)`
      : `linear-gradient(90deg, ${alpha(tint, 0.1)} 0%, ${surface.chromeBg} 70%)`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.34, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: "flex", alignItems: "stretch" }}
    >
      {/* ── Aligned gutter: status + row number ── */}
      <Box
        sx={{
          width: 52,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.4,
        }}
      >
        <Typography
          sx={{
            fontSize: 8.5,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: surface.ink(status.color),
            lineHeight: 1,
          }}
        >
          {status.short}
        </Typography>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "monospace",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
            color: selected ? ink : surface.text.md,
            textShadow: selected ? `0 0 14px ${accentColor}` : "none",
            transition: "color 180ms ease",
          }}
        >
          {layer.row}
        </Typography>
      </Box>

      {/* ── Blade body ── */}
      <Box
        role="button"
        tabIndex={0}
        aria-label={`Inspect ${layer.label}`}
        aria-pressed={selected}
        onClick={onSelect}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect())}
        sx={{
          flex: 1,
          minWidth: 0,
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          height: 62,
          pl: 1.5,
          pr: 1,
          cursor: rowCursor(accentColor),
          borderRadius: "4px",
          overflow: "hidden",
          background: rowBackground,
          border: `1px solid ${selected ? alpha(accentColor, 0.85) : alpha(accentColor, 0.2)}`,
          borderLeft: `3px solid ${accentColor}`,
          boxShadow: selected
            ? `0 0 0 1px ${alpha(accentColor, 0.5)}, 0 0 26px ${alpha(accentColor, 0.4)}, inset 0 0 20px ${alpha(accentColor, 0.08)}`
            : "0 2px 10px rgba(0,0,0,0.4)",
          opacity: selected ? 1 : 0.9,
          transition: "background 200ms ease, border-color 200ms ease, box-shadow 200ms ease, transform 140ms ease, opacity 200ms ease",
          "&:hover": {
            transform: "translateX(2px)",
            opacity: 1,
            borderColor: alpha(accentColor, 0.6),
            boxShadow: `0 0 22px ${alpha(accentColor, 0.28)}`,
          },
          "&:hover .layer-chevron": { opacity: 1, transform: "translateX(0)" },
          "&:focus-visible": { outline: `2px solid ${accentColor}`, outlineOffset: 2 },
        }}
      >
        {/* selected caret — points into the detail pane */}
        {selected && (
          <Box
            component={motion.div}
            layoutId="layer-caret"
            aria-hidden
            sx={{
              position: "absolute",
              right: 4,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: `8px solid ${accentColor}`,
              filter: `drop-shadow(0 0 6px ${accentColor})`,
            }}
          />
        )}
        {/* icon */}
        <Box
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: "9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: surface.chipBg,
            border: `1px solid ${alpha(accentColor, 0.3)}`,
          }}
        >
          <Icon sx={{ fontSize: 20, color: ink, filter: `drop-shadow(0 0 5px ${alpha(accentColor, 0.6)})` }} />
        </Box>

        {/* label + tagline */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography noWrap sx={{ fontSize: "0.92rem", fontWeight: 700, color: surface.text.hi, lineHeight: 1.2, letterSpacing: "0.005em" }}>
            {layer.label}
          </Typography>
          <Typography noWrap sx={{ fontSize: "0.71rem", color: selected ? surface.text.md : surface.text.lo, lineHeight: 1.3 }}>
            {layer.tagline}
          </Typography>
        </Box>

        {/* schematic — faint, brightens when selected */}
        <Box
          aria-hidden
          sx={{ width: 62, height: 30, flexShrink: 0, opacity: selected ? 0.9 : 0.32, transition: "opacity 200ms ease", display: { zero: "none", tablet: "block" } }}
        >
          <motion.div initial="hovered" animate="hovered" style={{ width: "100%", height: "100%" }}>
            <LayerSvgGraphic id={layer.svgId} color={accentColor} />
          </motion.div>
        </Box>

        {/* hover chevron — reinforces "clickable" */}
        <ChevronRightRoundedIcon
          className="layer-chevron"
          sx={{
            fontSize: 18,
            flexShrink: 0,
            color: ink,
            opacity: selected ? 0.9 : 0,
            transform: selected ? "translateX(0)" : "translateX(-4px)",
            transition: "opacity 160ms ease, transform 160ms ease",
          }}
        />

        {/* status LED */}
        <Box
          sx={{
            width: 6,
            height: 6,
            flexShrink: 0,
            borderRadius: "50%",
            bgcolor: status.color,
            boxShadow: `0 0 7px ${status.color}`,
            "@keyframes lrPulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.3 } },
            animation: layer.status !== "live" ? "lrPulse 2.4s ease-in-out infinite" : undefined,
          }}
        />
      </Box>
    </motion.div>
  );
}
