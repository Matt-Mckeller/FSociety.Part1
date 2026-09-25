"use client";

import { Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ActionOrb } from "./ActionOrb";
import { OrbClusterProps, OrbSize } from "./types";
import { useOrbCluster } from "./hooks";

/**
 * Get responsive size based on container width
 */
const getResponsiveSize = (baseSize: OrbSize, containerWidth: number): OrbSize => {
  if (containerWidth < 400) return "xs";
  if (containerWidth < 600) return "sm";
  if (containerWidth < 900) return baseSize;
  return baseSize;
};

/**
 * OrbCluster - A group of ActionOrbs arranged in patterns
 *
 * Uses @expanse/theme for colors when available (gamified themes provide
 * the `ability` palette with cyan, mint, purple, etc.)
 *
 * @example
 * ```tsx
 * <OrbCluster
 *   pattern="bottom-arc"
 *   items={[
 *     { id: "ai", icon: <SparkleIcon />, label: "AI", color: "ai" },
 *     { id: "voice", icon: <MicIcon />, label: "Voice", color: "primary" },
 *     { id: "tools", icon: <BuildIcon />, label: "Tools", color: "success" },
 *   ]}
 *   size="md"
 * />
 * ```
 */
export function OrbCluster({
  items,
  pattern = "bottom-arc",
  size = "md",
  shape = "circle",
  variant = "glass",
  colorMode = "auto",
  hotkeyDisplay = "none",
  showInlineLabel = false,
  labelPosition = "right",
  vibrant = false,
  overlapping = false,
  overlapPercent = 30,
  responsive = false,
  spacing = 16,
  collapsed = false,
  onCollapseChange,
  customPositions,
  containerWidth = 400,
  containerHeight = 200,
  sx,
}: OrbClusterProps) {
  // Calculate effective size
  const effectiveSize = responsive ? getResponsiveSize(size, containerWidth) : size;

  // Use the hook for position calculation  
  const { positionedItems, orbSize } = useOrbCluster({
    items,
    pattern: pattern === "custom" ? "bottom-row" : pattern,
    size: effectiveSize,
    containerWidth,
    containerHeight,
    spacing,
    overlapping,
    overlapPercent,
  });

  // Apply custom positions if provided
  const finalItems = pattern === "custom" && customPositions
    ? positionedItems.map((item, i) => ({
        ...item,
        position: customPositions[i] || item.position,
      }))
    : positionedItems;

  // Collapsed view - show a single expand button
  if (collapsed) {
    return (
      <Box
        sx={[
          {
            position: "relative",
            width: containerWidth,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        <IconButton
          onClick={() => onCollapseChange?.(false)}
          sx={{
            bgcolor: "rgba(60, 60, 60, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            gap: 0.5,
            color: "#fff",
            "&:hover": {
              bgcolor: "rgba(80, 80, 80, 0.95)",
            },
          }}
        >
          {items.slice(0, 3).map((item) => (
            <Box key={item.id} sx={{ display: "flex", opacity: 0.7, "& > svg": { width: 16, height: 16 } }}>
              {item.icon}
            </Box>
          ))}
          <KeyboardArrowUpIcon sx={{ ml: 0.5 }} />
        </IconButton>
      </Box>
    );
  }

  // bottom-row is a 1-D row — absolute positioning only adds an oversized
  // empty container and pushes the orbs to the wrong vertical position.
  // Use flex for any pattern that is inherently a flat row.
  const useFlexLayout = showInlineLabel || pattern === "bottom-row"

  return (
    <Box
      sx={[
        useFlexLayout
          ? {
              // Flex row: chips/orbs sit inline, container auto-sizes to fit.
              // nowrap keeps all orbs on a single row across viewports —
              // callers control overflow by sizing orbs (orbSize) and
              // spacing for the available width.
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: `${spacing}px`,
              flexWrap: "nowrap",
            }
          : {
              position: "relative",
              width: containerWidth,
              height: containerHeight,
            },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {finalItems.map((item) => (
        <ActionOrb
          key={item.id}
          icon={item.icon}
          label={item.label}
          shape={shape}
          size={effectiveSize}
          variant={variant}
          color={item.color || "default"}
          colorMode={colorMode}
          positionMode={useFlexLayout ? "fixed" : "free"}
          x={useFlexLayout ? undefined : item.position.x}
          y={useFlexLayout ? undefined : item.position.y}
          disabled={item.disabled}
          badge={item.badge}
          hotkey={item.hotkey}
          hotkeyDisplay={hotkeyDisplay}
          showInlineLabel={showInlineLabel}
          labelPosition={labelPosition}
          vibrant={vibrant}
          onClick={item.onClick}
          sx={{
            zIndex: overlapping ? item.zIndex : undefined,
          }}
        />
      ))}

      {/* Collapse button if callback provided */}
      {onCollapseChange && (
        <IconButton
          onClick={() => onCollapseChange(true)}
          size="small"
          sx={{
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "rgba(60, 60, 60, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            opacity: 0.5,
            "&:hover": {
              opacity: 1,
              bgcolor: "rgba(80, 80, 80, 0.9)",
            },
          }}
        >
          <KeyboardArrowDownIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
