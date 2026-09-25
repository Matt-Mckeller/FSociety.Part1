"use client";

/**
 * SurfaceShell — the scrolling panel chrome: an accent wash, an optional large
 * watermark schematic, and a caller-supplied header above the content.
 *
 * Generalized out of the integration-layers `PanelShell`, which hard-wired its
 * header to an `IntegrationLayer` (row badge + status pill + title + tagline).
 * Everything layer-specific now goes in the `header` slot, so a surface with no
 * layer — the profile page — can use the same chrome without inventing a fake
 * layer object. `PanelShell` is now a thin wrapper that fills `header` with its
 * original markup, so integration-layers renders identically.
 */

import * as React from "react";
import { Box, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { LayerSvgGraphic } from "@4eye/web/Tiles/sample/components/LayerSvgGraphics";
import { useSurface } from "./surfaceTokens";

export interface SurfaceShellProps {
  /** Bright accent — drives the watermark tint and glows. */
  accent: string;
  /** Wash tint. Mode-dependent; pass `useInk(...).tint`. */
  tint: string;
  /** Optional watermark schematic id from `LayerSvgGraphics`. */
  watermarkSvgId?: string;
  /** Title chrome. Rendered above `children`, inside the accent wash. */
  header?: React.ReactNode;
  children: React.ReactNode;
}

export function SurfaceShell({ accent, tint, watermarkSvgId, header, children }: SurfaceShellProps) {
  const surface = useSurface();
  return (
    <Box sx={{ position: "relative", height: "100%", overflow: "auto", px: { zero: 2.5, tablet: 4 }, py: 3.5 }}>
      {/* accent wash */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `linear-gradient(150deg, ${alpha(tint, 0.18)} 0%, ${surface.panelWash} 46%, ${surface.panelWash} 100%)`,
        }}
      />

      {/* large watermark schematic — decorative, deliberately below text contrast */}
      {watermarkSvgId && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            right: "-3%",
            top: "8%",
            width: "52%",
            aspectRatio: "140 / 52",
            opacity: 0.06,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {/* contrast-exempt: decorative */}
          <motion.div initial="hovered" animate="hovered" style={{ width: "100%", height: "100%" }}>
            <LayerSvgGraphic id={watermarkSvgId} color={accent} />
          </motion.div>
        </Box>
      )}

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {header && <Box sx={{ mb: 3 }}>{header}</Box>}
        {children}
      </Box>
    </Box>
  );
}
