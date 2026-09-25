"use client";

/**
 * IdentityName — the "Human IP" readout: the address of a person rather than a
 * machine. Two state badges, a hover-scrambling numeric code, a handle, and a
 * pair of vitals glyphs.
 *
 * Previously these four parts sat loose on the header, separated only by
 * monospace dots, with nothing on the surface saying what they were. They are
 * now grouped into one labelled pill that reads as a single address: a HUMAN IP
 * eyebrow, a tooltip explaining each part (see {@link HUMAN_IP_BLURB}), and
 * click-to-copy. The scramble now triggers from anywhere on the pill, so the
 * thing you hover and the thing that reacts are the same object.
 *
 * Extracted from `Tiles/integration-layers/panels/HumanPanel.tsx` so the
 * app-realm profile page can show the same identity without the two copies
 * drifting. `palette` defaults reproduce the HumanPanel hues, so that surface
 * keeps its violet/amber pairing while the profile header passes its own
 * green-anchored set.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import IcecreamRoundedIcon from "@mui/icons-material/IcecreamRounded";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { SOFT_VIOLET, SOFT_AMBER } from "@expanse/theme";
import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import { useSurface } from "./surfaceTokens";

/** Decode numbers cycled on hover — same digit count throughout so nothing reflows. */
const CODE_NUMBERS = ["007230", "914827", "382051", "647193", "205984"];

/**
 * What the readout is, in the tooltip. Kept as an exported constant because it
 * is product copy two surfaces show — edit it here, not at either call site.
 */
export const HUMAN_IP_BLURB =
  "An IP address routes to a machine. This routes to a person.";

/** Per-part copy, shown as a legend under the blurb. */
const HUMAN_IP_PARTS: ReadonlyArray<[string, string]> = [
  ["Badges", "the state you are carrying right now"],
  ["Code", "your rotating identifier — it changes, so it can't be used to follow you"],
  ["Handle", "how other people address you"],
  ["Vitals", "standing and live condition"],
];

export interface IdentityPalette {
  /** First state badge. */
  badgeA: string;
  /** Second state badge. */
  badgeB: string;
  /** Vitals (heartbeat) glyph. */
  vitals: string;
}

/** The original HumanPanel hues. */
export const DEFAULT_IDENTITY_PALETTE: IdentityPalette = {
  badgeA: SOFT_VIOLET,
  badgeB: SOFT_AMBER,
  vitals: "#ff6f91",
};

function EmojiBadge({ color, children }: { color: string; children: React.ReactNode }) {
  const surface = useSurface();
  return (
    <Box
      sx={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: surface.ink(color),
        bgcolor: alpha(color, 0.16),
        border: `1px solid ${alpha(color, 0.4)}`,
        boxShadow: `0 0 10px ${alpha(color, 0.25)}`,
      }}
    >
      {children}
    </Box>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <Typography
      component="span"
      aria-hidden
      sx={{ fontFamily: "monospace", fontWeight: 700, color, fontSize: "1rem", lineHeight: 1 }}
    >
      .
    </Typography>
  );
}

function HumanIpTooltip({ address }: { address: string }) {
  return (
    <Box sx={{ py: 0.25 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em" }}>
        HUMAN IP
      </Typography>
      <Typography sx={{ fontSize: 11.5, lineHeight: 1.5, mt: 0.25 }}>
        {HUMAN_IP_BLURB}
      </Typography>
      <Stack sx={{ mt: 0.75, gap: 0.25 }}>
        {HUMAN_IP_PARTS.map(([term, meaning]) => (
          <Typography key={term} sx={{ fontSize: 11, lineHeight: 1.45, opacity: 0.85 }}>
            <Box component="span" sx={{ fontWeight: 800, opacity: 1 }}>
              {term}
            </Box>
            {" — "}
            {meaning}
          </Typography>
        ))}
      </Stack>
      <Typography sx={{ fontSize: 10.5, mt: 0.9, opacity: 0.7 }}>
        Hover to re-roll · click to copy {address}
      </Typography>
    </Box>
  );
}

export interface IdentityNameProps {
  accent: string;
  /** Handle shown after the code. */
  handle?: string;
  /** Codes cycled by the scramble animation on hover. The first is the resting value. */
  codes?: string[];
  /** Badge and vitals hues. Defaults to the HumanPanel pairing. */
  palette?: IdentityPalette;
  /** Show the "HUMAN IP" eyebrow. Off for tight surfaces where the tooltip carries it alone. */
  showLabel?: boolean;
}

export function IdentityName({
  accent,
  handle = "Ex~Nut",
  codes = CODE_NUMBERS,
  palette = DEFAULT_IDENTITY_PALETTE,
  showLabel = true,
}: IdentityNameProps) {
  const [hovering, setHovering] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const surface = useSurface();
  const ink = surface.ink(accent);

  // The resting code is always `codes[0]` — ScrambleText returns to it whenever
  // it goes inactive — so that, plus the handle, is the copyable address.
  const address = `${codes[0]}.${handle}`;

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = React.useCallback(() => {
    // Best-effort: no clipboard permission in some embeds, and the readout is
    // still legible on screen if this fails.
    navigator.clipboard?.writeText(address).then(
      () => setCopied(true),
      () => {},
    );
  }, [address]);

  return (
    <Tooltip title={<HumanIpTooltip address={address} />} arrow placement="bottom-start">
      <Stack
        role="button"
        tabIndex={0}
        aria-label={`Human IP ${address}. Activate to copy.`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onClick={copy}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            copy();
          }
        }}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: 0.4,
          columnGap: 0.5,
          px: 1,
          py: 0.4,
          borderRadius: 999,
          cursor: "pointer",
          border: "1px solid",
          borderColor: alpha(accent, hovering ? 0.5 : 0.28),
          bgcolor: alpha(accent, hovering ? 0.11 : 0.06),
          transition: "background-color 0.2s ease, border-color 0.2s ease",
          "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
        }}
      >
        {showLabel && (
          <Typography
            aria-hidden
            sx={{
              fontSize: 8.5,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: alpha(ink, 0.75),
              mr: 0.25,
              whiteSpace: "nowrap",
            }}
          >
            Human IP
          </Typography>
        )}

        <EmojiBadge color={palette.badgeA}>
          <AutoFixHighRoundedIcon sx={{ fontSize: 14 }} />
        </EmojiBadge>
        <EmojiBadge color={palette.badgeB}>
          <IcecreamRoundedIcon sx={{ fontSize: 14 }} />
        </EmojiBadge>

        <Dot color={alpha(ink, 0.6)} />

        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.3 }}>
          <MorphLabel
            motion="scramble"
            words={codes}
            color={ink}
            active={hovering}
            fontSize="1.05rem"
            weight={800}
            letterSpacing={0.3}
          />
          {copied ? (
            <CheckRoundedIcon sx={{ fontSize: 14, color: ink }} />
          ) : (
            <AutorenewRoundedIcon
              sx={{
                fontSize: 13,
                color: alpha(ink, hovering ? 0.9 : 0.7),
                transition: "transform 0.4s ease, color 0.2s ease",
                transform: hovering ? "rotate(180deg)" : "none",
              }}
            />
          )}
        </Box>

        <Dot color={alpha(ink, 0.6)} />

        <Typography
          component="span"
          sx={{ fontFamily: "monospace", fontWeight: 800, fontSize: "1.05rem", color: "text.primary" }}
        >
          {handle}
        </Typography>

        <Dot color={alpha(ink, 0.6)} />

        <DiamondRoundedIcon sx={{ fontSize: 17, color: ink }} />
        <MonitorHeartRoundedIcon sx={{ fontSize: 17, color: surface.ink(palette.vitals) }} />
      </Stack>
    </Tooltip>
  );
}
