"use client";

/**
 * HudEdgeNav — exploration of HUD-edge screen navigation.
 *
 * Places up / down / left / right "change screen" affordances around the
 * edges of the HUD (between the existing chrome components) instead of on
 * the minimap tile arrows. Several `variant`s are provided so the layout
 * direction can be reviewed side-by-side in Storybook.
 *
 * The component renders an absolutely-positioned overlay that fills its
 * (relatively-positioned) parent. Each affordance is pinned to the
 * midpoint of an edge with a configurable `inset` so it floats inside the
 * HUD safe area rather than hugging the screen border.
 *
 * Variants
 *  - "edge-labels"   → pill (arrow + label + symbol) at each edge midpoint
 *  - "edge-arrows"   → minimal arrow chips; label revealed on hover
 *  - "floating-cards"→ destination cards floating inset from each edge
 *  - "corner-dpad"   → compact D-pad cluster (mobile-friendly)
 *  - "mobile-bar"    → bottom segmented bar of the 4 directions (mobile)
 *
 * Mobile note: "edge-*" / "floating-cards" suit wide viewports; on narrow
 * screens prefer "corner-dpad" or "mobile-bar".
 */

import type { ComponentType, ReactNode } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type HudNavDirection = "up" | "down" | "left" | "right";

export interface HudNavDestination {
  /** Destination screen label. */
  label: string;
  /** Optional destination symbol. */
  icon?: ComponentType<{ sx?: object }>;
  /** Accent color for the affordance. */
  color?: string;
}

export type HudEdgeNavVariant =
  | "edge-labels"
  | "edge-arrows"
  | "floating-cards"
  | "corner-dpad"
  | "mobile-bar";

export interface HudEdgeNavProps {
  variant: HudEdgeNavVariant;
  /** Destination per direction. Missing directions render no affordance. */
  directions: Partial<Record<HudNavDirection, HudNavDestination>>;
  /** Distance (px) from the HUD edge — "increase inset" lever. @default 16 */
  inset?: number;
  /** Fired when a direction is chosen. */
  onNavigate?: (dir: HudNavDirection) => void;
}

const DEFAULT_COLOR = "#3b82f6";

const ARROW: Record<HudNavDirection, ComponentType<{ sx?: object }>> = {
  up: KeyboardDoubleArrowUpRoundedIcon,
  down: KeyboardDoubleArrowDownRoundedIcon,
  left: KeyboardDoubleArrowLeftRoundedIcon,
  right: KeyboardDoubleArrowRightRoundedIcon,
};

const ORDER: HudNavDirection[] = ["up", "down", "left", "right"];

// Edge-midpoint anchor per direction, parameterized by inset.
function edgeAnchor(dir: HudNavDirection, inset: number) {
  switch (dir) {
    case "up":
      return { top: inset, left: "50%", transform: "translateX(-50%)" };
    case "down":
      return { bottom: inset, left: "50%", transform: "translateX(-50%)" };
    case "left":
      return { left: inset, top: "50%", transform: "translateY(-50%)" };
    case "right":
      return { right: inset, top: "50%", transform: "translateY(-50%)" };
  }
}

// ─── Affordance renderers ────────────────────────────────────────────────────────

function EdgeLabelPill({
  dir,
  dest,
  onNavigate,
}: {
  dir: HudNavDirection;
  dest: HudNavDestination;
  onNavigate?: (d: HudNavDirection) => void;
}) {
  const color = dest.color ?? DEFAULT_COLOR;
  const Arrow = ARROW[dir];
  const Icon = dest.icon;
  const isVertical = dir === "up" || dir === "down";
  // Keep the arrow pointing "outward" (toward the edge): up→arrow first,
  // down→arrow last; left→arrow first, right→arrow last.
  const arrowFirst = dir === "up" || dir === "left";

  const arrowEl = <Arrow sx={{ fontSize: 18, color }} />;
  const labelEl = (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
      {Icon && <Icon sx={{ fontSize: 15, color }} />}
      <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color, lineHeight: 1, whiteSpace: "nowrap" }}>
        {dest.label}
      </Typography>
    </Box>
  );

  return (
    <Box
      component="button"
      onClick={() => onNavigate?.(dir)}
      aria-label={`Go ${dir} to ${dest.label}`}
      sx={{
        display: "inline-flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        gap: 0.5,
        px: isVertical ? 1 : 1.25,
        py: isVertical ? 0.75 : 0.6,
        borderRadius: 999,
        bgcolor: `${color}14`,
        border: `1px solid ${color}3d`,
        backdropFilter: "blur(6px)",
        boxShadow: `0 4px 14px ${color}22`,
        cursor: "pointer",
        transition: "background-color 0.15s, transform 0.1s",
        "&:hover": { bgcolor: `${color}24` },
        "&:active": { transform: "scale(0.96)" },
      }}
    >
      {arrowFirst ? arrowEl : labelEl}
      {arrowFirst ? labelEl : arrowEl}
    </Box>
  );
}

function EdgeArrowChip({
  dir,
  dest,
  onNavigate,
}: {
  dir: HudNavDirection;
  dest: HudNavDestination;
  onNavigate?: (d: HudNavDirection) => void;
}) {
  const color = dest.color ?? DEFAULT_COLOR;
  const Arrow = ARROW[dir];
  return (
    <Tooltip
      title={dest.label}
      placement={dir === "up" ? "top" : dir === "down" ? "bottom" : dir}
      arrow
    >
      <Box
        component="button"
        onClick={() => onNavigate?.(dir)}
        aria-label={`Go ${dir} to ${dest.label}`}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          borderRadius: "50%",
          bgcolor: `${color}16`,
          border: `1px solid ${color}3d`,
          backdropFilter: "blur(6px)",
          boxShadow: `0 3px 10px ${color}22`,
          cursor: "pointer",
          transition: "background-color 0.15s, transform 0.1s",
          "&:hover": { bgcolor: `${color}2e` },
          "&:active": { transform: "scale(0.9)" },
        }}
      >
        <Arrow sx={{ fontSize: 20, color }} />
      </Box>
    </Tooltip>
  );
}

function FloatingCard({
  dir,
  dest,
  onNavigate,
}: {
  dir: HudNavDirection;
  dest: HudNavDestination;
  onNavigate?: (d: HudNavDirection) => void;
}) {
  const color = dest.color ?? DEFAULT_COLOR;
  const Arrow = ARROW[dir];
  const Icon = dest.icon;
  return (
    <Box
      component="button"
      onClick={() => onNavigate?.(dir)}
      aria-label={`Go ${dir} to ${dest.label}`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1,
        py: 0.6,
        borderRadius: 2,
        bgcolor: "#ffffff",
        border: `1px solid ${color}3d`,
        boxShadow: `0 6px 18px ${color}1f`,
        cursor: "pointer",
        transition: "transform 0.12s, box-shadow 0.12s",
        "&:hover": { transform: "translateY(-1px)", boxShadow: `0 8px 22px ${color}33` },
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 26,
          height: 26,
          borderRadius: "50%",
          flexShrink: 0,
          bgcolor: `${color}16`,
        }}
      >
        {Icon ? <Icon sx={{ fontSize: 15, color }} /> : <Arrow sx={{ fontSize: 16, color }} />}
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Typography sx={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.06em", color: "#94a3b8", textTransform: "uppercase", lineHeight: 1 }}>
          {dir}
        </Typography>
        <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.2, whiteSpace: "nowrap" }}>
          {dest.label}
        </Typography>
      </Box>
      <Arrow sx={{ fontSize: 16, color, opacity: 0.7 }} />
    </Box>
  );
}

// ─── Variant layouts ─────────────────────────────────────────────────────────────

function EdgeOverlay({
  directions,
  inset,
  render,
}: {
  directions: HudEdgeNavProps["directions"];
  inset: number;
  render: (dir: HudNavDirection, dest: HudNavDestination) => ReactNode;
}) {
  return (
    <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
      {ORDER.map((dir) => {
        const dest = directions[dir];
        if (!dest) return null;
        return (
          <Box key={dir} sx={{ position: "absolute", ...edgeAnchor(dir, inset), pointerEvents: "auto" }}>
            {render(dir, dest)}
          </Box>
        );
      })}
    </Box>
  );
}

function CornerDpad({
  directions,
  inset,
  onNavigate,
}: {
  directions: HudEdgeNavProps["directions"];
  inset: number;
  onNavigate?: (d: HudNavDirection) => void;
}) {
  const cell = (dir: HudNavDirection, gridArea: string) => {
    const dest = directions[dir];
    const color = dest?.color ?? DEFAULT_COLOR;
    const Arrow = ARROW[dir];
    return (
      <Box sx={{ gridArea, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {dest && (
          <Tooltip title={dest.label} placement={dir === "up" ? "top" : dir === "down" ? "bottom" : dir} arrow>
            <Box
              component="button"
              onClick={() => onNavigate?.(dir)}
              aria-label={`Go ${dir} to ${dest.label}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                borderRadius: 1.5,
                bgcolor: `${color}18`,
                border: `1px solid ${color}3d`,
                cursor: "pointer",
                transition: "background-color 0.12s, transform 0.1s",
                "&:hover": { bgcolor: `${color}30` },
                "&:active": { transform: "scale(0.9)" },
              }}
            >
              <Arrow sx={{ fontSize: 18, color }} />
            </Box>
          </Tooltip>
        )}
      </Box>
    );
  };
  return (
    <Box
      sx={{
        position: "absolute",
        right: inset,
        bottom: inset,
        zIndex: 5,
        display: "grid",
        gridTemplateAreas: `". up ." "left mid right" ". down ."`,
        gridTemplateColumns: "30px 30px 30px",
        gridTemplateRows: "30px 30px 30px",
        gap: 0.5,
        p: 0.75,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(15,23,42,0.08)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 6px 18px rgba(15,23,42,0.1)",
      }}
    >
      {cell("up", "up")}
      {cell("left", "left")}
      <Box sx={{ gridArea: "mid", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#cbd5e1" }} />
      </Box>
      {cell("right", "right")}
      {cell("down", "down")}
    </Box>
  );
}

function MobileBar({
  directions,
  inset,
  onNavigate,
}: {
  directions: HudEdgeNavProps["directions"];
  inset: number;
  onNavigate?: (d: HudNavDirection) => void;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        bottom: inset,
        transform: "translateX(-50%)",
        zIndex: 5,
        display: "flex",
        gap: 0.5,
        p: 0.5,
        borderRadius: 999,
        bgcolor: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(15,23,42,0.08)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 6px 18px rgba(15,23,42,0.12)",
      }}
    >
      {ORDER.map((dir) => {
        const dest = directions[dir];
        if (!dest) return null;
        const color = dest.color ?? DEFAULT_COLOR;
        const Arrow = ARROW[dir];
        const Icon = dest.icon;
        return (
          <Box
            key={dir}
            component="button"
            onClick={() => onNavigate?.(dir)}
            aria-label={`Go ${dir} to ${dest.label}`}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.4,
              px: 1,
              py: 0.6,
              borderRadius: 999,
              bgcolor: `${color}14`,
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.12s, transform 0.1s",
              "&:hover": { bgcolor: `${color}24` },
              "&:active": { transform: "scale(0.94)" },
            }}
          >
            <Arrow sx={{ fontSize: 16, color }} />
            {Icon && <Icon sx={{ fontSize: 14, color }} />}
            <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, color, lineHeight: 1, whiteSpace: "nowrap" }}>
              {dest.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────────

export function HudEdgeNav({ variant, directions, inset = 16, onNavigate }: HudEdgeNavProps) {
  switch (variant) {
    case "edge-labels":
      return (
        <EdgeOverlay
          directions={directions}
          inset={inset}
          render={(dir, dest) => <EdgeLabelPill dir={dir} dest={dest} onNavigate={onNavigate} />}
        />
      );
    case "edge-arrows":
      return (
        <EdgeOverlay
          directions={directions}
          inset={inset}
          render={(dir, dest) => <EdgeArrowChip dir={dir} dest={dest} onNavigate={onNavigate} />}
        />
      );
    case "floating-cards":
      return (
        <EdgeOverlay
          directions={directions}
          inset={inset}
          render={(dir, dest) => <FloatingCard dir={dir} dest={dest} onNavigate={onNavigate} />}
        />
      );
    case "corner-dpad":
      return <CornerDpad directions={directions} inset={inset} onNavigate={onNavigate} />;
    case "mobile-bar":
      return <MobileBar directions={directions} inset={inset} onNavigate={onNavigate} />;
  }
}
