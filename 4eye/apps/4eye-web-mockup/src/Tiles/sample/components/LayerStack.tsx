"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import type { SvgIconProps } from "@mui/material";
import type { SampleLayer } from "../model/layers";
import { LayerSvgGraphic } from "./LayerSvgGraphics";
import { useDataCascade } from "../hooks/useDataCascade";

// ── Constants ─────────────────────────────────────────────────────────────────

const TOP_FACE_H   = 18;   // height of the lit top-face cap
const FRONT_FACE_H = 82;   // height of the main blade face
const RIGHT_ZONE_W = 172;  // right hardware/SVG panel width
const DEPTH_W      = 14;   // right-side depth face width
const TILE_W       = 560;  // fixed blade width
const STEP_X       = 26;   // horizontal staircase step per tile (bottom→top)

const ACTIVITY_HEIGHTS = [8, 5, 10, 7, 4, 9];

// ── Icon registry ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<SvgIconProps>> = {
  aion:      HubRoundedIcon,
  brainwave: PsychologyRoundedIcon,
  robot:     PrecisionManufacturingRoundedIcon,
  glasses:   VisibilityRoundedIcon,
  visual:    VideocamRoundedIcon,
  audio:     GraphicEqRoundedIcon,
  chat:      ChatBubbleRoundedIcon,
};

// ── Props ─────────────────────────────────────────────────────────────────────

interface LayerStackProps {
  layers: SampleLayer[];
  onSelect: (id: string) => void;
  selectedId: string | null;
  pendingId: string | null;
}

// ── LayerStack ────────────────────────────────────────────────────────────────

export function LayerStack({ layers, onSelect, selectedId, pendingId }: LayerStackProps) {
  const ordered = [...layers].reverse(); // Chat at index 0 (top), AION at index 6 (bottom)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cascadeIdx = useDataCascade(ordered.length);

  const hoveredIdx = hoveredId ? ordered.findIndex((l) => l.id === hoveredId) : -1;
  const maxOffset  = (ordered.length - 1) * STEP_X; // total staircase width

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        // Perspective origin shifted right to match the rotateY(+7deg) right-facing tilt
        perspective: "1200px",
        perspectiveOrigin: "62% 45%",
        py: 3,
        pl: 6,
        pr: 2,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Ambient ground glow */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: "6%",
          left: "10%",
          right: "10%",
          height: 70,
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(30,60,200,0.28) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Inner 3D stack — stairway to heaven */}
      <Box
        sx={{
          // Staircase goes up and to the right: rotateX tips top away, rotateY(+) shows right face
          transform: "rotateX(20deg) rotateY(7deg)",
          transformOrigin: "center 60%",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: TILE_W + maxOffset,
          zIndex: 1,
          position: "relative",
        }}
      >
        {ordered.map((layer, i) => {
          // ordered[0]=Chat (top) gets the most offset (rightmost)
          // ordered[6]=AION (bottom) gets no offset (leftmost)
          const stairOffset = (ordered.length - 1 - i) * STEP_X;
          const isDimmed    = hoveredIdx >= 0 && i !== hoveredIdx && Math.abs(i - hoveredIdx) > 1;

          return (
            <LayerTile
              key={layer.id}
              layer={layer}
              delay={(ordered.length - 1 - i) * 0.055}
              stairOffset={stairOffset}
              onSelect={onSelect}
              isSelected={selectedId === layer.id}
              isPending={pendingId === layer.id}
              isCascadeActive={cascadeIdx === i}
              isHovered={hoveredId === layer.id}
              isDimmed={isDimmed}
              onHover={() => setHoveredId(layer.id)}
              onHoverEnd={() => setHoveredId(null)}
              hasAbove={i > 0}
              hasBelow={i < ordered.length - 1}
            />
          );
        })}
      </Box>
    </Box>
  );
}

// ── LayerTile ─────────────────────────────────────────────────────────────────

interface TileProps {
  layer: SampleLayer;
  delay: number;
  stairOffset: number;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isPending: boolean;
  isCascadeActive: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
  hasAbove: boolean;
  hasBelow: boolean;
}

function LayerTile({
  layer,
  delay,
  stairOffset,
  onSelect,
  isSelected,
  isPending,
  isCascadeActive,
  isHovered,
  isDimmed,
  onHover,
  onHoverEnd,
  hasAbove,
  hasBelow,
}: TileProps) {
  const { color, accentColor } = layer;
  const IconComp = ICON_MAP[layer.id] ?? HubRoundedIcon;

  return (
    // Dim wrapper
    <motion.div
      animate={{ opacity: isDimmed ? 0.42 : 1 }}
      transition={{ duration: 0.22 }}
      style={{ position: "relative", marginLeft: stairOffset }}
    >
      {/* Connection line — above this tile */}
      <AnimatePresence>
        {isHovered && hasAbove && (
          <motion.div
            key="conn-above"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.16 }}
            style={{
              position: "absolute",
              top: -3,
              left: 64,
              right: 8,
              height: 3,
              borderTop: `1px dashed ${accentColor}55`,
              transformOrigin: "left",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        )}
      </AnimatePresence>

      {/* Entry animation wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: "relative", width: TILE_W, paddingTop: TOP_FACE_H }}
      >
        {/* Hover variant controller */}
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hovered"
          onHoverStart={onHover}
          onHoverEnd={onHoverEnd}
          style={{ display: "block", position: "relative" }}
        >
          {/* ── Top-face cap ── */}
          <motion.div
            aria-hidden
            variants={{
              rest: {
                opacity: isCascadeActive ? 1.0 : 0.82,
                filter: isCascadeActive ? "brightness(1.35)" : "brightness(1)",
              },
              hovered: { opacity: 1.0, filter: "brightness(1.35)" },
            }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: -TOP_FACE_H,
              left: 0,
              right: 0,
              height: TOP_FACE_H,
              clipPath: "polygon(0% 100%, 1% 0%, 99% 0%, 100% 100%)",
              background: accentColor,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0) 100%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* ── Right depth face (visible because rotateY(+7deg) shows right side) ── */}
          <motion.div
            aria-hidden
            variants={{
              rest:    { x: 0,   opacity: 0.45 },
              hovered: { x: -28, opacity: 0.90 },
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "absolute",
              right: -DEPTH_W,
              top: 0,
              width: DEPTH_W,
              height: FRONT_FACE_H,
              background: `linear-gradient(to left, rgba(0,0,0,0.65), ${color}cc)`,
              clipPath: "polygon(0% 0%, 0% 100%, 100% 86%, 100% 14%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Front face ── */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-label={`Inspect ${layer.label}`}
            onClick={() => onSelect(layer.id)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(layer.id)}
            variants={{
              rest: {
                x: 0,
                boxShadow: isSelected
                  ? `0 0 0 2px ${accentColor}, 0 0 28px ${accentColor}44, 0 5px 20px rgba(0,0,0,0.55)`
                  : "0 5px 20px rgba(0,0,0,0.55)",
              },
              hovered: {
                x: -28,
                boxShadow: isSelected
                  ? `22px 10px 48px rgba(0,0,0,0.85), 0 0 40px ${accentColor}55, 0 0 0 2px ${accentColor}`
                  : `22px 10px 48px rgba(0,0,0,0.85), 0 0 40px ${accentColor}44`,
              },
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              height: FRONT_FACE_H,
              width: TILE_W,
              display: "flex",
              alignItems: "stretch",
              borderRadius: "0 0 3px 3px",
              overflow: "hidden",
              backgroundColor: color,
              cursor: "pointer",
              borderTop: `1px solid ${accentColor}44`,
              position: "relative",
            }}
          >
            {/* Cascade flash overlay */}
            <motion.div
              animate={{ opacity: isCascadeActive ? 0.14 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute", inset: 0,
                background: accentColor,
                pointerEvents: "none", zIndex: 10,
              }}
            />
            {/* Pending click flash */}
            <motion.div
              animate={{ opacity: isPending ? 0.48 : 0 }}
              transition={{ duration: 0.12 }}
              style={{
                position: "absolute", inset: 0,
                background: accentColor,
                pointerEvents: "none", zIndex: 11,
              }}
            />

            {/* ── Badge column ── */}
            <Box
              sx={{
                width: 60,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "rgba(0,0,0,0.30)",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <ScrewHole top />
              <Typography
                component="span"
                sx={{
                  fontSize: 19,
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.94)",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: "monospace",
                  textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                }}
              >
                {String(layer.index).padStart(2, "0")}
              </Typography>
              <ScrewHole top={false} />
            </Box>

            {/* ── Label + icon ── */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 2,
                overflow: "hidden",
                background: "linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 32%)",
              }}
            >
              {/* Title row with icon */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.55, minWidth: 0 }}>
                <IconComp
                  sx={{
                    fontSize: 15,
                    color: accentColor,
                    flexShrink: 0,
                    opacity: 0.88,
                    filter: `drop-shadow(0 0 4px ${accentColor}88)`,
                  }}
                />
                <Typography
                  noWrap
                  sx={{
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.97)",
                    lineHeight: 1.25,
                    letterSpacing: "0.008em",
                  }}
                >
                  {layer.label}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "0.74rem",
                  color: "rgba(255,255,255,0.60)",
                  lineHeight: 1.38,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {layer.tagline}
              </Typography>
            </Box>

            {/* ── Right zone: hardware ↔ SVG ── */}
            <Box
              sx={{
                width: RIGHT_ZONE_W,
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hardware panel */}
              <motion.div
                variants={{ rest: { opacity: 1 }, hovered: { opacity: 0 } }}
                transition={{ duration: 0.18 }}
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  justifyContent: "center", gap: 5, padding: "0 13px",
                }}
              >
                {/* Status LEDs + ports */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Box
                    sx={{
                      width: 5, height: 5, borderRadius: "50%",
                      bgcolor: accentColor, flexShrink: 0,
                      boxShadow: `0 0 5px ${accentColor}99`,
                      "@keyframes ledPulse": {
                        "0%,100%": { opacity: 0.9 },
                        "50%":     { opacity: 0.28 },
                      },
                      animation: "ledPulse 2.4s ease-in-out infinite",
                    }}
                  />
                  {[0.30, 0.10].map((op, idx) => (
                    <Box key={idx} sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: accentColor, opacity: op, flexShrink: 0 }} />
                  ))}
                  <Box sx={{ flex: 1 }} />
                  {["A", "B"].map((lbl) => (
                    <Box key={lbl} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5px", ml: "3px" }}>
                      <Box sx={{ width: 20, height: 5, bgcolor: "rgba(255,255,255,0.05)", borderRadius: "1px", border: "1px solid rgba(255,255,255,0.13)" }} />
                      <Typography sx={{ fontSize: "0.38rem", color: "rgba(255,255,255,0.22)", lineHeight: 1, letterSpacing: "0.04em" }}>{lbl}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* Model tag + activity bars */}
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Typography sx={{ fontSize: "0.46rem", fontFamily: "monospace", color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em", lineHeight: 1 }}>
                    {`MK-IV · RU${layer.index}`}
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: "2px" }}>
                    {ACTIVITY_HEIGHTS.map((h, idx) => (
                      <Box key={idx} sx={{ width: 3, height: h, bgcolor: accentColor, opacity: 0.32, borderRadius: "1px 1px 0 0" }} />
                    ))}
                  </Box>
                </Box>

                {/* Vent grid */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {([0.18, 0.10, 0.06] as number[]).map((rowOp, ri) => (
                    <Box key={ri} sx={{ display: "flex", gap: "3px" }}>
                      {Array.from({ length: 6 }).map((_, ci) => (
                        <Box key={ci} sx={{ flex: 1, height: "3px", bgcolor: "rgba(255,255,255,1)", opacity: rowOp, borderRadius: "0.5px" }} />
                      ))}
                    </Box>
                  ))}
                </Box>
              </motion.div>

              {/* SVG schematic */}
              <motion.div
                variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
                transition={{ duration: 0.24, delay: 0.06 }}
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "4px 8px",
                  background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${accentColor}12 0%, transparent 70%)`,
                }}
              >
                <LayerSvgGraphic id={layer.id} color={accentColor} />
              </motion.div>
            </Box>

            {/* ── Right accent stripe ── */}
            <Box
              sx={{
                width: 5, flexShrink: 0,
                background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}77)`,
                opacity: 0.72,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Connection line — below */}
      <AnimatePresence>
        {isHovered && hasBelow && (
          <motion.div
            key="conn-below"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.16 }}
            style={{
              position: "absolute",
              bottom: -3, left: 64, right: 8,
              height: 3,
              borderBottom: `1px dashed ${accentColor}55`,
              transformOrigin: "left",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Screw hole decoration ─────────────────────────────────────────────────────

function ScrewHole({ top }: { top: boolean }) {
  return (
    <Box
      sx={{
        position: "absolute",
        [top ? "top" : "bottom"]: 5,
        left: "50%",
        transform: "translateX(-50%)",
        width: 8, height: 8,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.18)",
        bgcolor: "rgba(0,0,0,0.38)",
        "&::before": {
          content: '""',
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 4, height: 1,
          bgcolor: "rgba(255,255,255,0.28)", borderRadius: "0.5px",
        },
        "&::after": {
          content: '""',
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1, height: 4,
          bgcolor: "rgba(255,255,255,0.28)", borderRadius: "0.5px",
        },
      }}
    />
  );
}
