"use client";

/**
 * ResourceEditPanel — the editable form behind a corner HUD's detail view.
 * One row per resource: a label field, a slider, and a number field, each
 * dispatching to {@link ResourceBarsProvider}. Same dark glass chrome as the
 * read-only panels so the toggle feels like a flip, not a different surface.
 */

import * as React from "react";
import { Box, Slider, Stack, TextField, Typography } from "@mui/material";

import { useResourceBars, type ResourceDomain } from "./ResourceBarsProvider";
import { Glyph, rgba, type Resource } from "./widgets";

export function ResourceEditPanel({
  domain,
  resources,
  accent,
  title,
  onClose,
}: {
  domain: ResourceDomain;
  resources: Resource[];
  accent: string;
  title: string;
  onClose: () => void;
}) {
  const { dispatch } = useResourceBars();

  return (
    <Box sx={{ animation: "rb-fade-up 0.18s cubic-bezier(0.4,0,0.2,1)" }}>
      <Box
        sx={{
          width: 250,
          background: "rgba(4,8,16,0.94)",
          backdropFilter: "blur(28px)",
          border: `1px solid ${rgba(accent, 0.13)}`,
          borderTop: `2px solid ${rgba(accent, 0.32)}`,
          borderRadius: "12px",
          p: "12px 14px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.25 }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.45rem", color: rgba(accent, 0.42), letterSpacing: 3 }}>
            EDIT · {title}
          </Typography>
          <Box
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            sx={{ fontSize: "0.58rem", color: rgba(accent, 0.4), cursor: "pointer", lineHeight: 1, userSelect: "none", "&:hover": { color: rgba(accent, 0.85) } }}
          >
            ✓
          </Box>
        </Box>
        <Stack spacing={1.25}>
          {resources.map((r) => (
            <Box key={r.key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 16, display: "flex", justifyContent: "center", flexShrink: 0 }}>
                <Glyph name={r.glyph} color={r.color} size={14} />
              </Box>
              <TextField
                variant="standard"
                value={r.label}
                onChange={(e) => dispatch({ type: "set-label", domain, key: r.key, label: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  width: 70,
                  "& .MuiInput-input": { fontFamily: "monospace", fontSize: "0.6rem", color: rgba(r.color, 0.85), p: 0 },
                  "& .MuiInput-underline:before": { borderColor: rgba(accent, 0.2) },
                }}
              />
              <Slider
                size="small"
                value={r.value}
                min={0}
                max={100}
                onClick={(e) => e.stopPropagation()}
                onChange={(_, v) => dispatch({ type: "set-value", domain, key: r.key, value: v as number })}
                sx={{ flex: 1, color: r.color, "& .MuiSlider-thumb": { width: 11, height: 11 } }}
              />
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.6rem", color: rgba(r.color, 0.7), width: 22, textAlign: "right", flexShrink: 0 }}>
                {r.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
