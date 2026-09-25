"use client";

import { Box, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  LENS_TINTS,
  type LensExample,
} from "@4eye/web/Tiles/home/slides/see/state/lensExamples";
import type { TranslationMode } from "@4eye/web/Tiles/home/slides/see/state/seeTypes";

/**
 * WithCell — right half of a Without/With row. In Learn mode, shows the
 * translation reframe with an ⓘ tooltip explaining the move.
 */
export function WithCell({ ex, mode }: { ex: LensExample; mode: TranslationMode }) {
  const isCode = ex.flavor === "code";
  const tint = LENS_TINTS[ex.tint];
  const showLearn = mode === "learn" && !!ex.translation;

  const primary = showLearn
    ? `\u201C${ex.translation!.learn.reframe}\u201D`
    : ex.with.primary;
  const secondary = showLearn ? undefined : ex.with.secondary;
  const isReframe = showLearn;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        bgcolor: isReframe ? `${tint.fg}0F` : "#eef2ff",
        px: { xs: 2, sm: 2.5 },
        pr: showLearn ? { xs: 4.5, sm: 5 } : { xs: 2, sm: 2.5 },
        py: 2,
        minHeight: { xs: 90, sm: 100 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 0.75,
        height: "100%",
        transition: "background-color 0.2s",
      }}
    >
      <Typography
        sx={{
          fontFamily: isReframe ? "inherit" : isCode ? "monospace" : "inherit",
          fontStyle: isReframe ? "italic" : "normal",
          fontSize: isReframe
            ? { xs: 13.5, sm: 14.5 }
            : isCode
              ? { xs: 13.5, sm: 15 }
              : { xs: 14.5, sm: 16 },
          fontWeight: isReframe ? 500 : isCode ? 500 : 600,
          color: "rgba(15,23,42,0.92)",
          lineHeight: 1.45,
        }}
      >
        {primary}
      </Typography>
      {secondary ? (
        <Typography
          variant="caption"
          sx={{
            color: tint.fg,
            fontStyle: isCode ? "normal" : "italic",
            fontWeight: 600,
            lineHeight: 1.35,
            fontSize: "0.78rem",
          }}
        >
          {secondary}
        </Typography>
      ) : null}

      {showLearn && (
        <Tooltip
          title={
            <Box sx={{ p: 0.5, maxWidth: 320 }}>
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: tint.fg,
                  mb: 0.75,
                }}
              >
                Learn
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                {ex.translation!.learn.note}
              </Typography>
            </Box>
          }
          arrow
          placement="top"
          slotProps={{
            tooltip: {
              sx: {
                bgcolor: "rgba(15,23,42,0.96)",
                "& .MuiTooltip-arrow": { color: "rgba(15,23,42,0.96)" },
                p: 1.25,
                maxWidth: 360,
              },
            },
          }}
        >
          <Box
            tabIndex={0}
            role="button"
            aria-label="Why 4eye reframed this"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 22,
              height: 22,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "help",
              color: tint.fg,
              "&:hover": { bgcolor: `${tint.fg}14` },
              transition: "background-color 0.15s",
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 16 }} />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
}
