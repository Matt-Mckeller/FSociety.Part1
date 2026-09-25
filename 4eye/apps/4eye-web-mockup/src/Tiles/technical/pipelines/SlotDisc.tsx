"use client";

import type { ReactNode } from "react";
import { Box, alpha } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import type { SlotShape } from "./data";

const HEX_CLIP = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";
const TRI_CLIP = "polygon(50% 6%, 94% 88%, 6% 88%)";

export function slotShapeSx(shape: SlotShape): SxProps<Theme> {
  switch (shape) {
    case "diamond":
      return { borderRadius: "4px", transform: "rotate(45deg)" };
    case "square":
      return { borderRadius: "6px" };
    case "hex":
      return { borderRadius: 0, clipPath: HEX_CLIP };
    case "pill":
      return { borderRadius: 999, width: "118%", height: "78%" };
    case "triangle":
      return { borderRadius: 0, clipPath: TRI_CLIP };
    default:
      return { borderRadius: "50%" };
  }
}

/**
 * SlotDisc — one socket. Shape follows slot type (circle / diamond / square /
 * hex / pill / triangle). Filled sockets glow in the pipeline colour; empty
 * ones stay dashed.
 */
export function SlotDisc({
  shape,
  color,
  size = 26,
  empty = false,
  active = true,
  children,
}: {
  shape: SlotShape;
  color: string;
  size?: number;
  empty?: boolean;
  active?: boolean;
  children?: ReactNode;
}) {
  const diamond = shape === "diamond";
  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        opacity: active ? 1 : 0.45,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: empty ? "transparent" : alpha(color, 0.16),
          border: empty ? "2px dashed" : "2px solid",
          borderColor: empty ? "divider" : color,
          color: empty ? "text.disabled" : color,
          boxShadow: empty ? "none" : `0 0 10px 1px ${alpha(color, 0.45)}`,
          ...slotShapeSx(shape),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: diamond ? "rotate(-45deg)" : "none",
            color: "inherit",
            lineHeight: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
