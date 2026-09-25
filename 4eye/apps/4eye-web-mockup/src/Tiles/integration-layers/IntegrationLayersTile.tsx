"use client";

/**
 * IntegrationLayersTile — the redesigned "AI Integration Layers" screen.
 *
 * Split view: left = the product-layer column (chips + aligned status/number
 * gutter + blade rows), right = a live detail panel for the selected layer.
 * Human Layer (row 1) is selected by default; AION — Full Dive is row 8.
 */

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { TileContainer } from "@expanse/hud";
import { INTEGRATION_LAYERS, DEFAULT_LAYER_ID } from "./model/layers";
import { ChipsRow } from "./components/ChipsRow";
import { LayerColumn } from "./components/LayerColumn";
import { LayerDetailRouter } from "./components/LayerDetailRouter";
import { PanelThemeScope } from "./components/PanelThemeScope";
import { ThemeModeToggle } from "./components/ThemeModeToggle";
import { useLayerSurface } from "./components/surfaceTokens";

function IntegrationLayersBody() {
  const [selectedId, setSelectedId] = useState(DEFAULT_LAYER_ID);
  const selectedLayer =
    INTEGRATION_LAYERS.find((l) => l.id === selectedId) ?? INTEGRATION_LAYERS[0];
  const surface = useLayerSurface();

  return (
    <TileContainer mode="fit">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: surface.pageBg,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* dot-grid backdrop */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `radial-gradient(circle, ${surface.dotColor} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            opacity: 0.028,
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            pb: 1.5,
            borderBottom: `1px solid ${surface.dividerBorder}`,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: surface.text.overline, letterSpacing: 3, fontSize: 10, fontWeight: 700 }}>
              The Product · A Stack of Realities
            </Typography>
            <Typography variant="h6" sx={{ color: surface.text.hi, fontWeight: 800, lineHeight: 1.25 }}>
              AI Integration Layers
            </Typography>
          </Box>
          <ThemeModeToggle />
        </Box>

        {/* Split body */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: { zero: "column", tablet: "row" },
          }}
        >
          {/* Left pane */}
          <Box
            sx={{
              width: { zero: "100%", tablet: 440 },
              flexShrink: 0,
              borderRight: { tablet: `1px solid ${surface.dividerBorder}` },
              borderBottom: { zero: `1px solid ${surface.dividerBorder}`, tablet: "none" },
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              px: 2,
              py: 2,
              gap: 2,
              maxHeight: { zero: "46%", tablet: "none" },
            }}
          >
            <ChipsRow />
            <LayerColumn layers={INTEGRATION_LAYERS} selectedId={selectedId} onSelect={setSelectedId} />
          </Box>

          {/* Right pane */}
          <Box sx={{ flex: 1, minWidth: 0, minHeight: 0, position: "relative" }}>
            <LayerDetailRouter layer={selectedLayer} />
          </Box>
        </Box>
      </Box>
    </TileContainer>
  );
}

export function IntegrationLayersTile() {
  return (
    <PanelThemeScope>
      <IntegrationLayersBody />
    </PanelThemeScope>
  );
}

export default IntegrationLayersTile;
