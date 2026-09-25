"use client";

import { Box, Button, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { motion } from "framer-motion";
import type { SampleLayer } from "../model/layers";
import { LayerSvgGraphic } from "./LayerSvgGraphics";

interface LayerDetailProps {
  layer: SampleLayer;
  adjacentLayers: SampleLayer[];
  onBack: () => void;
  onNavigate: (id: string) => void;
}

export function LayerDetail({ layer, adjacentLayers, onBack, onNavigate }: LayerDetailProps) {
  const { color, accentColor } = layer;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        px: { zero: 2, tablet: 4 },
        py: 3,
        position: "relative",
      }}
    >
      {/* ── Full-bleed color wash ── */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `linear-gradient(145deg, ${color}28 0%, rgba(7,9,26,0.97) 50%, rgba(7,9,26,1) 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* ── Large SVG watermark ── */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          right: "-4%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "58%",
          aspectRatio: "140 / 52",
          opacity: 0.055,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <LayerSvgGraphic id={layer.id} color={accentColor} />
      </Box>

      {/* ── Content (above background layers) ── */}
      <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={onBack}
            size="small"
            sx={{
              color: "rgba(255,255,255,0.50)",
              mb: 2.5,
              textTransform: "none",
              fontWeight: 600,
              letterSpacing: "0.02em",
              "&:hover": { color: accentColor },
            }}
          >
            All Layers
          </Button>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <Box sx={{ mb: 3.5 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: color,
                border: `2px solid ${accentColor}55`,
                fontSize: 18,
                fontWeight: 900,
                fontFamily: "monospace",
                color: "#fff",
                mb: 2,
                boxShadow: `0 0 24px ${accentColor}44`,
              }}
            >
              {layer.index}
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: accentColor,
                lineHeight: 1.2,
                mb: 0.75,
                textShadow: `0 0 40px ${accentColor}44`,
              }}
            >
              {layer.label}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.55)", maxWidth: 520 }}
            >
              {layer.tagline}
            </Typography>
          </Box>
        </motion.div>

        {/* Cards */}
        <Grid container spacing={2}>
          {layer.cards.map((card, i) => (
            <Grid size={{ zero: 12, tablet: 6 }} key={card.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                style={{ height: "100%" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    background: `linear-gradient(135deg, ${color}22 0%, rgba(10,12,28,0.90) 100%)`,
                    border: `1px solid ${accentColor}28`,
                    borderRadius: 2,
                    boxShadow: "none",
                    transition: "border-color 160ms ease",
                    "&:hover": { borderColor: `${accentColor}55` },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="overline"
                      sx={{
                        color: accentColor,
                        letterSpacing: 1.5,
                        fontSize: 10,
                        fontWeight: 700,
                        display: "block",
                        mb: 0.75,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.65 }}
                    >
                      {card.body}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Connected layers footer */}
        {adjacentLayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.38 }}
          >
            <Box
              sx={{
                mt: "auto",
                pt: 2.5,
                pb: 0.5,
                mt: 3,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.30)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  flexShrink: 0,
                }}
              >
                Connected
              </Typography>
              {adjacentLayers.map((adj) => (
                <Chip
                  key={adj.id}
                  label={adj.label}
                  size="small"
                  onClick={() => onNavigate(adj.id)}
                  sx={{
                    bgcolor: `${adj.color}88`,
                    color: adj.accentColor,
                    border: `1px solid ${adj.accentColor}33`,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    height: 26,
                    cursor: "pointer",
                    transition: "border-color 150ms, background 150ms",
                    "&:hover": {
                      bgcolor: `${adj.color}cc`,
                      borderColor: `${adj.accentColor}77`,
                    },
                    "& .MuiChip-label": { px: 1.2 },
                  }}
                />
              ))}
            </Box>
          </motion.div>
        )}
      </Box>
    </Box>
  );
}
