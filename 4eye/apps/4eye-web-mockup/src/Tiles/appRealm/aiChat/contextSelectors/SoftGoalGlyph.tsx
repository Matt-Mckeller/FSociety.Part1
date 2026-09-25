"use client";

import { Box } from "@mui/material";
import { Symbol } from "@4eye/features";
import type { SymbolColor, SymbolName } from "@4eye/types";
import { GOAL_CENTER_MARK } from "./tokens";

const GEOMETRIC = new Set<SymbolName>(["Circle", "Square", "Triangle"]);

/**
 * Soft rounded inner marks for goal chips. Circle / Square / Triangle used
 * to render as sharp MUI icons; these are squircle / pill-cornered objects
 * so they read as the same family as the chip silhouette rather than as
 * clipped geometry.
 */
export function SoftCenterMark({
  symbol,
  fill = GOAL_CENTER_MARK,
}: {
  symbol: Extract<SymbolName, "Circle" | "Square" | "Triangle">;
  fill?: string;
}) {
  if (symbol === "Square") {
    return <rect x={7} y={7} width={10} height={10} rx={3.1} fill={fill} />;
  }
  if (symbol === "Circle") {
    return <circle cx={12} cy={12} r={5} fill={fill} />;
  }
  // Rounded triangle — vertices inset, quadratic corners.
  return (
    <path
      d="M12 6.4
         C12.55 6.4 13.05 6.7 13.32 7.18
         L17.55 14.85
         C17.82 15.33 17.8 15.92 17.5 16.38
         C17.2 16.84 16.66 17.12 16.08 17.12
         H7.92
         C7.34 17.12 6.8 16.84 6.5 16.38
         C6.2 15.92 6.18 15.33 6.45 14.85
         L10.68 7.18
         C10.95 6.7 11.45 6.4 12 6.4 Z"
      fill={fill}
    />
  );
}

export function SoftGoalGlyph({
  symbol,
  color,
  size,
}: {
  symbol: SymbolName;
  color: SymbolColor;
  size: number;
}) {
  if (GEOMETRIC.has(symbol)) {
    return (
      <Box
        component="span"
        aria-hidden
        sx={{
          display: "inline-flex",
          width: size,
          height: size,
          lineHeight: 0,
        }}
      >
        <svg viewBox="0 0 24 24" width={size} height={size} focusable="false">
          <SoftCenterMark symbol={symbol as "Circle" | "Square" | "Triangle"} />
        </svg>
      </Box>
    );
  }

  return <Symbol name={symbol} color={color} size={size} variant="ghost" />;
}
