"use client";

import * as React from "react";
import { Box, Button, Stack, TextField, Typography, alpha } from "@mui/material";
import { FLYING_PURPLE_BALL_SEED } from "@4eye/types";
import { latestDelta, useRlEpisode } from "./useRlEpisode";

const PURPLE = "#c026d3";

export function PurpleBallPlay() {
  const {
    episode,
    sendBall,
    occlude,
    pullCurtain,
    guessHidden,
    runSearch,
    reset,
  } = useRlEpisode();
  const [query, setQuery] = React.useState("purple ball");
  const flying = Boolean(episode.vision && !episode.vision.occluded && !episode.curtainPulled);
  const hidden = Boolean(episode.vision?.occluded);
  const sent = Boolean(episode.vision);

  React.useEffect(() => {
    if (!episode.vision?.flying || episode.vision.occluded || episode.curtainPulled) return;
    const t = window.setTimeout(() => occlude(), 1800);
    return () => window.clearTimeout(t);
  }, [episode.vision, episode.curtainPulled, occlude]);

  return (
    <Stack spacing={1.5} sx={{ height: "100%", minHeight: 0 }}>
      <Typography
        variant="overline"
        sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1 }}
      >
        Technical · Data · Seed 0
      </Typography>
      <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.25 }}>
        {FLYING_PURPLE_BALL_SEED.line}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        Vision first. One beat. Pull the curtain. Search the sound.
      </Typography>

      <Box
        sx={{
          position: "relative",
          flex: 1,
          minHeight: 220,
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "#07040c",
          border: "1px solid",
          borderColor: alpha(PURPLE, 0.35),
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 80%, rgba(192,38,211,0.18), transparent 55%)",
          }}
        />
        {sent && (
          <Box
            sx={{
              position: "absolute",
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: PURPLE,
              boxShadow: `0 0 28px ${PURPLE}`,
              top: "42%",
              left: flying || hidden ? "72%" : "18%",
              transform: "translate(-50%, -50%)",
              transition: "left 1.6s cubic-bezier(.2,.8,.2,1), top 1.6s ease-in-out",
              animation: flying ? "ballArc 1.6s ease-in-out forwards" : "none",
              "@keyframes ballArc": {
                "0%": { left: "16%", top: "62%" },
                "45%": { left: "48%", top: "22%" },
                "100%": { left: "78%", top: "46%" },
              },
            }}
          />
        )}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: alpha("#4c1d95", hidden ? 0.92 : 0),
            backdropFilter: hidden ? "blur(10px)" : "none",
            transition: "background-color .4s, backdrop-filter .4s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: hidden ? "auto" : "none",
          }}
        >
          {hidden && (
            <Typography sx={{ fontWeight: 800, letterSpacing: 2, color: alpha("#fff", 0.7) }}>
              CURTAIN
            </Typography>
          )}
        </Box>
      </Box>

      {episode.receipt ? (
        <Typography sx={{ fontWeight: 700, color: PURPLE }}>
          {episode.receipt}
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          Send it. I will answer in one line.
        </Typography>
      )}

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
        <Button variant="contained" onClick={sendBall} sx={{ bgcolor: PURPLE, "&:hover": { bgcolor: "#a21caf" } }}>
          Send
        </Button>
        <Button variant="outlined" disabled={!hidden} onClick={pullCurtain}>
          Pull
        </Button>
        <Button variant="outlined" color="warning" disabled={!hidden} onClick={guessHidden}>
          Guess
        </Button>
        <Button variant="text" onClick={reset} sx={{ ml: "auto" }}>
          Reset
        </Button>
      </Stack>

      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          fullWidth
          label="Search audio"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") runSearch(query);
          }}
        />
        <Button variant="outlined" onClick={() => runSearch(query)}>
          Search
        </Button>
      </Stack>

      {episode.audioHits.length > 0 && (
        <Stack spacing={0.5}>
          {episode.audioHits.map((hit) => (
            <Typography key={`${hit.kind}-${hit.tSec}`} variant="caption" sx={{ color: "text.secondary" }}>
              {hit.tSec.toFixed(1)}s · {hit.kind} · {hit.snippet}
            </Typography>
          ))}
        </Stack>
      )}

      <Stack direction="row" spacing={1}>
        {(["vision", "concise", "curtain", "search"] as const).map((signal) => {
          const d = latestDelta(episode, signal);
          return (
            <Box
              key={signal}
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                border: "1px solid",
                borderColor: d === 1 ? alpha("#22c55e", 0.5) : d === -1 ? alpha("#f59e0b", 0.5) : "divider",
                color: d === 1 ? "#22c55e" : d === -1 ? "#f59e0b" : "text.disabled",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.4,
                textTransform: "uppercase",
              }}
            >
              {signal} {d === 1 ? "+" : d === -1 ? "−" : "·"}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}
