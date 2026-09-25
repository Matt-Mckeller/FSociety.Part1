"use client";

import { Box, Chip, Typography } from "@mui/material";
import {
  REACH_COUNTS,
  REACH_META,
  REALM_META,
  SURFACES,
  surfacesInRealm,
  type Surface,
  type SurfaceRealm,
} from "@yen/content/surfaces";

const REALMS: SurfaceRealm[] = ["app", "website", "technical", "unrouted"];

function SurfaceRow({ surface }: { surface: Surface }) {
  const reach = REACH_META[surface.reach];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        gap: 1.25,
        flexWrap: "wrap",
        py: 1.25,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: reach.color, flexShrink: 0 }} />

      <Typography sx={{ fontSize: 15, fontWeight: 650, minWidth: 150 }}>
        {surface.label}
      </Typography>

      <Typography
        component="code"
        sx={{ fontSize: 12.5, color: "text.secondary", fontFamily: "monospace" }}
      >
        {surface.path ?? "— no route —"}
      </Typography>

      {surface.size && (
        <Typography sx={{ fontSize: 12, color: "text.disabled" }}>{surface.size}</Typography>
      )}

      <Box sx={{ flex: 1 }} />

      {surface.note && (
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", fontStyle: "italic", flexBasis: { zero: "100%", laptop: "auto" } }}>
          {surface.note}
        </Typography>
      )}

      {surface.reach !== "linked" && (
        <Chip
          size="small"
          label={reach.label}
          sx={{
            height: 20,
            fontSize: 11,
            fontWeight: 700,
            color: reach.color,
            bgcolor: `${reach.color}18`,
          }}
        />
      )}
    </Box>
  );
}

export function SurfaceInventory() {
  const hidden = REACH_COUNTS.unlinked + REACH_COUNTS.noRoute;

  return (
    <Box>
      <Box
        sx={{
          p: 2.5,
          mb: 4,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "#f59e0b55",
          bgcolor: "#f59e0b0f",
          maxWidth: "76ch",
        }}
      >
        <Typography sx={{ fontSize: 15, lineHeight: 1.65 }}>
          Of {SURFACES.length} surfaces built, <strong>{REACH_COUNTS.linked}</strong> are reachable
          from navigation. <strong>{REACH_COUNTS.unlinked}</strong> have a route that nothing links
          to, and <strong>{REACH_COUNTS.noRoute}</strong> have no route at all — {hidden} finished
          surfaces a visitor cannot find.
        </Typography>
      </Box>

      {REALMS.map((realm) => {
        const meta = REALM_META[realm];
        const rows = surfacesInRealm(realm);
        return (
          <Box key={realm} component="section" sx={{ mb: 4.5 }}>
            <Typography
              sx={{ fontSize: 12.5, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "text.secondary" }}
            >
              {meta.label}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 0.5, mb: 1, maxWidth: "72ch" }}>
              {meta.blurb}
            </Typography>

            <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
              {rows.map((s) => (
                <SurfaceRow key={s.id} surface={s} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
