"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Stack, Typography, alpha } from "@mui/material";

/*
  The exhibit: a pair of screenshots presented as artefacts rather than as page
  furniture. Extracted from the home profile band so the backup page can be the
  same exhibit rather than a lookalike — one field, one set of window chrome,
  one hover, and any correction lands on both.

  The frame is deliberately unopinionated about what it holds. It knows about a
  title rail and a field to sit captures on; the version control on the profile
  band arrives through `actions`, because a second exhibit has no versions and
  should not carry the menu's weight to say so.
*/

/** Default capture proportions — the shape a 1500-wide window screenshot takes. */
export const CAPTURE_RATIO = "1500 / 781";

const TRAFFIC_LIGHTS = ["#f87171", "#fbbf24", "#34d399"];

export function ExhibitFrame({
  children,
  label,
  highlight,
  accent,
  actions,
}: {
  children: React.ReactNode;
  /** Monospace rail text — where the captures were taken from. */
  label: string;
  /** Emphasised tail of the rail: a handle, a host, the thing being shown. */
  highlight?: string;
  accent: string;
  /** Controls docked to the right of the rail, e.g. a version picker. */
  actions?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        mt: { zero: 3, laptop: 4 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          px: 1.75,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: (t) => alpha(t.palette.text.primary, 0.02),
        }}
      >
        {TRAFFIC_LIGHTS.map((c) => (
          <Box key={c} sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: c, opacity: 0.55 }} />
        ))}
        <Typography
          sx={{
            ml: 0.75,
            fontSize: 11,
            fontFamily: "monospace",
            color: "text.disabled",
            letterSpacing: "0.02em",
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
          {highlight && (
            <>
              {" · "}
              <Box component="span" sx={{ color: accent, fontWeight: 700 }}>
                {highlight}
              </Box>
            </>
          )}
        </Typography>

        <Box sx={{ flex: 1 }} />

        {actions}
      </Box>

      <Box
        sx={{
          p: { zero: 2.5, laptop: 4 },
          backgroundImage: (t) => {
            const rule = alpha(t.palette.text.primary, 0.045);
            return `linear-gradient(${rule} 1px, transparent 1px), linear-gradient(90deg, ${rule} 1px, transparent 1px)`;
          },
          backgroundSize: "30px 30px, 30px 30px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/** The pair, side by side, collapsing to one column on a phone. */
export function ExhibitPair({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { zero: 3, laptop: 4 },
        gridTemplateColumns: { zero: "1fr", tablet: "repeat(2, minmax(0, 1fr))" },
      }}
    >
      {children}
    </Box>
  );
}

/**
 * One capture with its caption.
 *
 * `href` is optional: a capture of something the reader can open is worth
 * linking, and a capture of something that only runs on one machine is not —
 * a link that cannot resolve is worse than no link.
 */
export function ShotCard({
  src,
  alt,
  caption,
  href,
  meta,
  ratio,
}: {
  src: string | null;
  alt: string;
  caption: string;
  href?: string;
  /** Small monospace note on the caption line — a version, a route. */
  meta?: string | null;
  ratio?: string;
}) {
  const capture = <Capture src={src} alt={alt} ratio={ratio} />;

  return (
    <Box>
      {href ? (
        <Box
          component={Link}
          href={href}
          sx={{
            display: "block",
            textDecoration: "none",
            color: "inherit",
            "&:hover .capture": { transform: "translateY(-3px)", boxShadow: 6 },
          }}
        >
          {capture}
        </Box>
      ) : (
        capture
      )}
      <Stack direction="row" sx={{ alignItems: "baseline", justifyContent: "space-between", gap: 1, mt: 1.25 }}>
        <Typography sx={{ fontSize: 13.5, color: "text.secondary" }}>{caption}</Typography>
        {meta && (
          <Typography sx={{ fontSize: 11, fontFamily: "monospace", color: "text.disabled", flexShrink: 0 }}>
            {meta}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

/**
 * One capture, in window chrome, with a placeholder when the file is missing.
 */
export function Capture({
  src,
  alt,
  ratio = CAPTURE_RATIO,
}: {
  src: string | null;
  alt: string;
  ratio?: string;
}) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <Box
      className="capture"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 3,
        bgcolor: "background.paper",
        transition: "transform 160ms ease, box-shadow 160ms ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 1,
          py: 0.6,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: (t) => alpha(t.palette.text.primary, 0.03),
        }}
      >
        {TRAFFIC_LIGHTS.map((c) => (
          <Box key={c} sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: c, opacity: 0.5 }} />
        ))}
      </Box>

      {!src || failed ? (
        <Box
          sx={{
            aspectRatio: ratio,
            display: "grid",
            placeItems: "center",
            gap: 0.5,
            px: 2,
            textAlign: "center",
            bgcolor: (t) => alpha(t.palette.text.primary, 0.03),
          }}
        >
          <Typography sx={{ fontSize: 12.5, fontWeight: 650, color: "text.disabled" }}>
            Capture not yet added
          </Typography>
          <Typography sx={{ fontSize: 11, fontFamily: "monospace", color: "text.disabled", opacity: 0.75 }}>
            {src ?? "no src"}
          </Typography>
        </Box>
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          sx={{
            display: "block",
            width: "100%",
            aspectRatio: ratio,
            objectFit: "cover",
            objectPosition: "top",
          }}
          onError={() => setFailed(true)}
        />
      )}
    </Box>
  );
}
