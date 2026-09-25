"use client";

import { Box, Stack, Typography, alpha } from "@mui/material";

import { PIPELINE_LAYERS, type PipelineLayerId } from "./data";

/**
 * LayerTabs — switch the body between Foundational (default), Content
 * creation, and Daily life. Each layer has its own sockets and pipelines.
 */
export function LayerTabs({
  value,
  onChange,
}: {
  value: PipelineLayerId;
  onChange: (id: PipelineLayerId) => void;
}) {
  return (
    <Stack spacing={1}>
      <Box
        role="tablist"
        aria-label="Pipeline layers"
        sx={{
          display: "grid",
          gridTemplateColumns: { zero: "1fr", tablet: "repeat(3, 1fr)" },
          gap: 1,
        }}
      >
        {PIPELINE_LAYERS.map((layer) => {
          const active = value === layer.id;
          return (
            <Box
              key={layer.id}
              role="tab"
              aria-selected={active}
              tabIndex={0}
              onClick={() => onChange(layer.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(layer.id);
                }
              }}
              sx={{
                px: 1.5,
                py: 1.1,
                borderRadius: 2,
                cursor: "pointer",
                border: "1px solid",
                borderColor: active ? layer.color : "divider",
                bgcolor: active ? alpha(layer.color, 0.1) : "background.paper",
                outline: "none",
                transition: "border-color .15s, background-color .15s",
                "&:hover": { borderColor: layer.color, bgcolor: alpha(layer.color, 0.08) },
                "&:focus-visible": { outline: `2px solid ${layer.color}`, outlineOffset: 2 },
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  display: "block",
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  color: active ? layer.color : "text.disabled",
                }}
              >
                {layer.kicker}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "0.92rem", lineHeight: 1.2, mt: 0.35 }}>
                {layer.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
        {PIPELINE_LAYERS.find((l) => l.id === value)?.description}
      </Typography>
    </Stack>
  );
}
