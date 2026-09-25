"use client";

/**
 * Path strip with a type dropdown — same chip chrome, different rankings.
 *
 * Structure / Content / Teach / Build / Person / Deep read. The chips stay the
 * simple left-accent pills; only which set is active changes.
 */

import * as React from "react";
import Link from "next/link";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  DEFAULT_PATH_ID,
  PATH_VARIANTS,
  getPathVariant,
  type PathVariant,
} from "@yen/content/paths";

const STORAGE_KEY = "yen:path-variant:v1";

export function PrimaryPathStrip() {
  const [pathId, setPathId] = React.useState(DEFAULT_PATH_ID);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw && PATH_VARIANTS.some((p) => p.id === raw)) setPathId(raw);
    } catch {
      /* ignore */
    }
  }, []);

  const path: PathVariant = getPathVariant(pathId);

  const pick = (id: string) => {
    setPathId(id);
    setAnchor(null);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="path"
      style={{
        borderBottom: "1px solid #e7e5e4",
        background: "#fafaf9",
      }}
    >
      <div style={{ maxWidth: 1536, margin: "0 auto", padding: "20px 24px" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
            mb: 1.25,
          }}
        >
          <Typography
            component="button"
            type="button"
            onClick={(e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget)}
            aria-haspopup="menu"
            aria-expanded={Boolean(anchor)}
            sx={{
              m: 0,
              p: 0,
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.35,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: "#78716c",
              fontFamily: "inherit",
              "&:hover": { color: "#1c1917" },
            }}
          >
            {path.label} path
            <ExpandMoreRoundedIcon sx={{ fontSize: 16, opacity: 0.7 }} />
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: "#a8a29e", lineHeight: 1.35 }}>
            {path.blurb}
          </Typography>
        </Box>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {path.stops.map((p) => (
            <Link
              key={`${path.id}-${p.label}`}
              href={p.href}
              style={{
                padding: "9px 14px",
                borderRadius: 8,
                border: "1px solid #e7e5e4",
                borderLeft: `3px solid ${p.accent}`,
                background: "#fff",
                fontSize: 14,
                fontWeight: 650,
                color: "#1c1917",
                textDecoration: "none",
              }}
            >
              {p.label}
            </Link>
          ))}
          {path.aside && (
            <Link
              href={path.aside.href}
              style={{
                padding: "9px 14px",
                borderRadius: 8,
                border: "1px dashed #c4b5fd",
                background: "#f5f3ff",
                fontSize: 14,
                fontWeight: 650,
                color: path.aside.accent,
                textDecoration: "none",
              }}
            >
              {path.aside.label}
            </Link>
          )}
        </div>

        <Menu
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          slotProps={{ paper: { sx: { minWidth: 220, maxWidth: 340 } } }}
        >
          {PATH_VARIANTS.map((v) => (
            <MenuItem
              key={v.id}
              selected={v.id === pathId}
              onClick={() => pick(v.id)}
              sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0.25, py: 1.1 }}
            >
              <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>{v.label}</Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.4, whiteSpace: "normal" }}>
                {v.blurb}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </section>
  );
}
