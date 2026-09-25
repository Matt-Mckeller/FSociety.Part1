"use client";

/**
 * Shared building blocks for the integration-layers detail panels:
 *   - PanelShell    header chrome (title, status badge, tagline, accent wash)
 *   - TronTooltip   neon-framed MUI tooltip matching the HUD theme
 *   - SectionLabel  small uppercase section header
 *   - InfoCardGrid  the default data-driven card grid for simpler panels
 */

import * as React from "react";
import { Box, Card, CardContent, Grid, Tooltip, Typography, alpha } from "@mui/material";
import type { TooltipProps } from "@mui/material";
import { motion } from "framer-motion";
import type { IntegrationLayer, LayerStatus } from "../model/layers";
import { STATUS_META } from "../model/layers";
import { SurfaceShell } from "@4eye/web/components/surface";
import { useLayerSurface, useLayerInk } from "./surfaceTokens";

// ── Status badge ───────────────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: LayerStatus }) {
  const meta = STATUS_META[status];
  const surface = useLayerSurface();
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1,
        py: 0.35,
        borderRadius: 999,
        border: `1px solid ${alpha(meta.color, 0.5)}`,
        bgcolor: alpha(meta.color, 0.14),
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          bgcolor: meta.color,
          boxShadow: `0 0 8px ${meta.color}`,
          "@keyframes sbPulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.35 } },
          animation: status !== "live" ? "sbPulse 2s ease-in-out infinite" : undefined,
        }}
      />
      <Typography
        sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.1em", color: surface.ink(meta.color), textTransform: "uppercase" }}
      >
        {meta.label}
      </Typography>
    </Box>
  );
}

// ── Tron tooltip ─────────────────────────────────────────────────────────────

export function TronTooltip({
  accent = "#4dd0e1",
  title,
  children,
  ...rest
}: { accent?: string } & TooltipProps) {
  const surface = useLayerSurface();
  return (
    <Tooltip
      {...rest}
      title={title}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: surface.tooltipBg,
            border: `1px solid ${alpha(accent, 0.6)}`,
            borderRadius: 1,
            boxShadow: `0 0 18px ${alpha(accent, 0.35)}, inset 0 0 12px ${alpha(accent, 0.12)}`,
            color: surface.text.hi,
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: "0.01em",
            px: 1.25,
            py: 0.9,
            maxWidth: 240,
            backdropFilter: "blur(6px)",
          },
        },
        arrow: { sx: { color: surface.tooltipBg, "&::before": { border: `1px solid ${alpha(accent, 0.6)}` } } },
      }}
    >
      {children}
    </Tooltip>
  );
}

// ── Section label ────────────────────────────────────────────────────────────

/** Moved to `@4eye/web/components/surface`; re-exported so layer panels keep their import. */
export { SectionLabel } from "@4eye/web/components/surface";

// ── Panel shell ──────────────────────────────────────────────────────────────

/**
 * The layer-specific header: row badge, status pill, title, tagline. Passed to
 * {@link SurfaceShell} as its `header` slot — the chrome around it (accent wash,
 * watermark, scroll container) is now shared with the app-realm profile page.
 */
function LayerHeader({ layer }: { layer: IntegrationLayer }) {
  const { color, accentColor } = layer;
  const surface = useLayerSurface();
  const { ink } = useLayerInk(layer);
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, flexWrap: "wrap" }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "11px",
            background: color,
            border: `2px solid ${alpha(accentColor, 0.5)}`,
            fontSize: 17,
            fontWeight: 900,
            fontFamily: "monospace",
            color: "#fff",
            boxShadow: `0 0 22px ${alpha(accentColor, 0.4)}`,
            flexShrink: 0,
          }}
        >
          {layer.row}
        </Box>
        <StatusBadge status={layer.status} />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 800, color: ink, lineHeight: 1.15, mb: 0.75, textShadow: `0 0 40px ${alpha(accentColor, 0.35)}` }}>
        {layer.label}
      </Typography>
      <Typography sx={{ color: surface.text.md, fontSize: "1rem", maxWidth: 560, lineHeight: 1.5 }}>
        {layer.tagline}
      </Typography>
    </>
  );
}

export function PanelShell({ layer, children }: { layer: IntegrationLayer; children: React.ReactNode }) {
  const { tint } = useLayerInk(layer);
  return (
    <SurfaceShell
      accent={layer.accentColor}
      tint={tint}
      watermarkSvgId={layer.svgId}
      header={<LayerHeader layer={layer} />}
    >
      {children}
    </SurfaceShell>
  );
}

// ── Default card grid ────────────────────────────────────────────────────────

export function InfoCardGrid({ layer }: { layer: IntegrationLayer }) {
  const { accentColor } = layer;
  const surface = useLayerSurface();
  const { ink, tint } = useLayerInk(layer);
  return (
    <Grid container spacing={2}>
      {layer.cards.map((card, i) => (
        <Grid size={{ zero: 12, tablet: 6 }} key={card.title}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, delay: 0.06 + i * 0.06 }} style={{ height: "100%" }}>
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${alpha(tint, 0.15)} 0%, ${surface.cardBg} 100%)`,
                border: `1px solid ${alpha(accentColor, 0.24)}`,
                borderRadius: 2,
                boxShadow: "none",
                transition: "border-color 160ms ease, transform 160ms ease",
                "&:hover": { borderColor: alpha(accentColor, 0.55), transform: "translateY(-2px)" },
              }}
            >
              <CardContent>
                <Typography sx={{ color: ink, letterSpacing: "0.12em", fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", display: "block", mb: 0.85 }}>
                  {card.title}
                </Typography>
                <Typography sx={{ color: surface.text.md, fontSize: "0.86rem", lineHeight: 1.62 }}>
                  {card.body}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
