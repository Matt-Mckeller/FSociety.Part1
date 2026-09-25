"use client";

/**
 * TerminalMark — the evolved terminal "/" that precedes the crown (`/👑`).
 * A prompt + animated slash + blinking cursor, with tiny multi-input glyphs
 * (voice · type · gesture) converging into the command.
 */

import { Box, Typography } from "@mui/material";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";

const RED = "#ff5c7a";

export function TerminalMark({ scale = 1 }: { scale?: number }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.1 * scale,
          py: 0.6 * scale,
          borderRadius: 1.5,
          bgcolor: "rgba(6,10,24,0.9)",
          border: `1px solid ${RED}66`,
          boxShadow: `0 0 16px ${RED}44, inset 0 0 10px ${RED}22`,
          fontFamily: "monospace",
        }}
      >
        <Typography component="span" sx={{ fontFamily: "monospace", fontSize: 20 * scale, fontWeight: 800, color: "#7be0c0", lineHeight: 1 }}>
          ❯
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: "monospace",
            fontSize: 26 * scale,
            fontWeight: 900,
            color: RED,
            lineHeight: 1,
            textShadow: `0 0 10px ${RED}`,
            "@keyframes slashPulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.6 } },
            animation: "slashPulse 1.4s ease-in-out infinite",
          }}
        >
          /
        </Typography>
        <Box
          sx={{
            width: 9 * scale,
            height: 20 * scale,
            bgcolor: RED,
            borderRadius: "1px",
            boxShadow: `0 0 8px ${RED}`,
            "@keyframes curBlink": { "0%,49%": { opacity: 1 }, "50%,100%": { opacity: 0 } },
            animation: "curBlink 1s step-end infinite",
          }}
        />
      </Box>
      {/* multi-input glyphs */}
      <Box sx={{ display: "flex", gap: 0.75, opacity: 0.7 }}>
        {[MicNoneRoundedIcon, KeyboardRoundedIcon, TouchAppRoundedIcon].map((Icon, i) => (
          <Icon key={i} sx={{ fontSize: 13 * scale, color: "#b06cff" }} />
        ))}
      </Box>
    </Box>
  );
}
