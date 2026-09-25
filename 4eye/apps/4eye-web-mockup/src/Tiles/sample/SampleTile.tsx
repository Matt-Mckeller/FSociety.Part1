"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { TileContainer } from "@expanse/hud";
import { SAMPLE_LAYERS } from "./model/layers";
import { LayerStack } from "./components/LayerStack";
import { LayerDetail } from "./components/LayerDetail";

const SLIDE_DURATION = 0.3;

export function SampleTile() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const selectedLayer = selectedId
    ? SAMPLE_LAYERS.find((l) => l.id === selectedId) ?? null
    : null;

  const layerIndex = selectedId
    ? SAMPLE_LAYERS.findIndex((l) => l.id === selectedId)
    : -1;

  const adjacentLayers = layerIndex >= 0
    ? [
        layerIndex > 0 ? SAMPLE_LAYERS[layerIndex - 1] : null,
        layerIndex < SAMPLE_LAYERS.length - 1 ? SAMPLE_LAYERS[layerIndex + 1] : null,
      ].filter(Boolean) as typeof SAMPLE_LAYERS
    : [];

  const handleSelect = (id: string) => {
    setPendingId(id);
    setTimeout(() => {
      setSelectedId(id);
      setPendingId(null);
    }, 140);
  };

  const handleNavigate = (id: string) => {
    setSelectedId(id);
  };

  return (
    <TileContainer mode="fit">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(160deg, #07091a 0%, #0b1228 60%, #0a0e22 100%)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Dot-grid background pattern */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.028,
            pointerEvents: "none",
          }}
        />

        {/* Stack glow aura */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: "18%",
            left: "8%",
            right: "8%",
            height: "62%",
            background:
              "radial-gradient(ellipse at 50% 58%, rgba(20,50,180,0.16) 0%, transparent 70%)",
            filter: "blur(28px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Header */}
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            pb: 1,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.32)",
              letterSpacing: 3,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            Technology Stack
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, lineHeight: 1.3 }}
          >
            AI Integration Layers
          </Typography>
        </Box>

        {/* Animated content area */}
        <Box sx={{ flex: 1, position: "relative", overflow: "hidden", zIndex: 1 }}>
          <AnimatePresence mode="wait" initial={false}>
            {selectedLayer === null ? (
              <motion.div
                key="stack"
                initial={{ opacity: 0, x: -72 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -72 }}
                transition={{ duration: SLIDE_DURATION, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0 }}
              >
                <LayerStack
                  layers={SAMPLE_LAYERS}
                  onSelect={handleSelect}
                  selectedId={null}
                  pendingId={pendingId}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`detail-${selectedLayer.id}`}
                initial={{ opacity: 0, x: 72 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 72 }}
                transition={{ duration: SLIDE_DURATION, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0 }}
              >
                <LayerDetail
                  layer={selectedLayer}
                  adjacentLayers={adjacentLayers}
                  onBack={() => setSelectedId(null)}
                  onNavigate={handleNavigate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </TileContainer>
  );
}

export default SampleTile;
