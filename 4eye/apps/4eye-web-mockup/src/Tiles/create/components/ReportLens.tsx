"use client";

/**
 * ReportLens — a lens over Report (life-documentation) entities.
 *
 * Plan §1.4 (Lenses) + §2.2 (Report entities feed seeds / animation): browse
 * Symbols, Connections, Communications and Perspectives that can seed the
 * animation, and hand any of them to the 4eye chat with one click.
 *
 * Self-contained scaffold (fixture-backed). Each entity row carries the single
 * reusable {@link SendToChatButton} affordance.
 */

import { useState } from "react";
import { Box, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { BrandIcon } from "./BrandIcon";
import { SendToChatButton } from "../chat/SendToChat";
import {
  REPORT_KIND_META,
  groupReportEntities,
  reportEntityDetail,
  type ReportEntity,
  type ReportEntityKind,
} from "../model/report-entities";

const BRAND_FONT = "Xpens, Roboto, sans-serif";
const KIND_ORDER: ReportEntityKind[] = [
  "symbol",
  "connection",
  "communication",
  "perspective",
];

function ReportRow({ entity }: { entity: ReportEntity }) {
  const meta = REPORT_KIND_META[entity.kind];
  const detail = reportEntityDetail(entity);
  return (
    <Stack
      spacing={0.75}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        px: 0.75,
        py: 0.5,
        borderRadius: 1.5,
        "&:hover": { bgcolor: alpha(meta.color, 0.06) },
      }}
    >
      <Box sx={{ color: meta.color, display: "inline-flex", flexShrink: 0 }}>
        <BrandIcon name={entity.glyph ?? meta.glyph} size={15} />
      </Box>
      <Tooltip title={detail} arrow placement="top">
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2 }} noWrap>
            {entity.label}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: 10, lineHeight: 1.1, display: "block" }}
            noWrap
          >
            {detail}
          </Typography>
        </Box>
      </Tooltip>
      <SendToChatButton
        size={22}
        item={{
          kind: `report:${entity.kind}`,
          id: entity.id,
          label: entity.label,
          detail,
          glyph: entity.glyph ?? meta.glyph,
          payload: entity,
        }}
      />
    </Stack>
  );
}

export interface ReportLensProps {
  /** Start collapsed (default true to keep the no-scroll shell compact). */
  defaultOpen?: boolean;
}

export function ReportLens({ defaultOpen = false }: ReportLensProps) {
  const [open, setOpen] = useState(defaultOpen);
  const grouped = groupReportEntities();
  const total = Object.values(grouped).reduce((n, g) => n + g.length, 0);

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        border: "1px solid #eef1f5",
        borderRadius: 2,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Stack
        spacing={0.75}
        onClick={() => setOpen((o) => !o)}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          px: 1,
          py: 0.75,
          cursor: "pointer",
          userSelect: "none",
          "&:hover": { bgcolor: "#fafbfc" },
        }}
      >
        <Box sx={{ color: "#7c3aed", display: "inline-flex" }}>
          <BrandIcon name="vision" size={16} />
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontFamily: BRAND_FONT,
            fontWeight: 700,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            color: "#5b5570",
            flex: 1,
          }}
        >
          Report lens · {total}
        </Typography>
        <Box sx={{ color: "#9b8ec4", display: "inline-flex", transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }}>
          <BrandIcon name="promote" size={14} />
        </Box>
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ px: 0.5, pb: 0.75 }}>
          {KIND_ORDER.map((kind) => {
            const items = grouped[kind];
            if (items.length === 0) return null;
            const meta = REPORT_KIND_META[kind];
            return (
              <Box key={kind} sx={{ mb: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    color: meta.color,
                    px: 0.75,
                    display: "block",
                    mb: 0.25,
                  }}
                >
                  {meta.label}
                </Typography>
                <Stack spacing={0.1}>
                  {items.map((e) => (
                    <ReportRow key={e.id} entity={e} />
                  ))}
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}
