"use client";

import { useState } from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { LENS_EXAMPLES, LENS_TINTS } from "@4eye/web/Tiles/home/slides/see/state/lensExamples";

const GROW_IDS = ["memory", "capture", "reemerge"];

/** Maps each feature id to a filterable type */
const FEATURE_TYPE: Record<string, "memory" | "capture"> = {
  memory: "memory",
  reemerge: "memory",
  capture: "capture",
};

const FILTER_TABS = [
  { id: "all" as const, label: "All" },
  { id: "memory" as const, label: "Memory" },
  { id: "capture" as const, label: "Capture" },
];

type FilterId = (typeof FILTER_TABS)[number]["id"];

/**
 * GrowCards — tabbed feature list for memory/growth capabilities.
 * Tabs filter by type (All / Memory / Capture). Cards show both the
 * Before and With‑4eye sides so the contrast is immediately scannable.
 */
export function GrowCards() {
  const [filter, setFilter] = useState<FilterId>("all");

  const allItems = LENS_EXAMPLES.filter((e) => GROW_IDS.includes(e.id));
  const items =
    filter === "all"
      ? allItems
      : allItems.filter((e) => FEATURE_TYPE[e.id] === filter);

  const cols =
    items.length === 1 ? "1fr" : items.length === 2 ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <Box sx={{ pt: { xs: 3, md: 3.5 } }}>
      {/* Section header + filter tabs */}
      <Stack
        spacing={1.75}
        sx={{
          alignItems: "center",
          mb: 3
        }}>
        <Typography
          sx={{
            textAlign: "center",
            color: "text.disabled",
            letterSpacing: "0.36em",
            fontWeight: 700,
            fontSize: "0.7rem",
            textTransform: "uppercase",
          }}
        >
          Grow
        </Typography>

        <Box
          role="tablist"
          aria-label="Feature type filter"
          sx={{
            display: "inline-flex",
            bgcolor: "#eef2f7",
            borderRadius: 999,
            p: "4px",
            gap: "4px",
            border: "1px solid rgba(15,23,42,0.08)",
            boxShadow: "inset 0 1px 2px rgba(15,23,42,0.04)",
          }}
        >
          {FILTER_TABS.map(({ id, label }) => {
            const active = filter === id;
            return (
              <ButtonBase
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(id)}
                sx={{
                  px: { xs: 1.5, sm: 2 },
                  py: "6px",
                  borderRadius: 999,
                  fontSize: "0.8rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "primary.main" : "text.secondary",
                  letterSpacing: "-0.005em",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                  ...(active && {
                    bgcolor: "background.paper",
                    boxShadow:
                      "0 1px 4px rgba(15,23,42,0.1), 0 0 0 1px rgba(99,102,241,0.15)",
                  }),
                  "&:hover": {
                    bgcolor: active ? "background.paper" : "rgba(15,23,42,0.04)",
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: "0 0 0 2px rgba(99,102,241,0.55)",
                  },
                }}
              >
                {label}
              </ButtonBase>
            );
          })}
        </Box>
      </Stack>
      {/* Feature cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: cols },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {items.map((ex) => {
          const tint = LENS_TINTS[ex.tint];
          return (
            <Box
              key={ex.id}
              sx={{
                p: { xs: 2, md: 2.5 },
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 1.75,
              }}
            >
              {/* Header: icon + label */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                {ex.Icon ? (
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: 1.5,
                      bgcolor: tint.bg,
                      border: `1px solid ${tint.fg}28`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ex.Icon style={{ fontSize: 17, color: tint.fg }} />
                  </Box>
                ) : null}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "text.primary",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {ex.label}
                </Typography>
              </Box>

              {/* Before */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1.75,
                  bgcolor: "rgba(15,23,42,0.03)",
                  border: "1px solid rgba(15,23,42,0.06)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "text.disabled",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    mb: 0.6,
                  }}
                >
                  Before
                </Typography>
                <Typography
                  sx={{ fontSize: "0.8rem", color: "text.secondary", lineHeight: 1.55 }}
                >
                  {ex.without.primary}
                </Typography>
                {ex.without.secondary && (
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: "text.disabled",
                      mt: 0.5,
                      fontStyle: "italic",
                    }}
                  >
                    {ex.without.secondary}
                  </Typography>
                )}
              </Box>

              {/* With 4eye */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1.75,
                  bgcolor: tint.bg,
                  border: `1px solid ${tint.fg}28`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: tint.fg,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    mb: 0.6,
                  }}
                >
                  With 4eye
                </Typography>
                <Typography
                  sx={{ fontSize: "0.8rem", color: "text.primary", lineHeight: 1.55 }}
                >
                  {ex.with.primary}
                </Typography>
                {ex.with.secondary && (
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: tint.fg,
                      mt: 0.6,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {ex.with.secondary}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
