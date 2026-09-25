"use client";

/**
 * SkinPreview — a self-contained mini NBA card stack used by the
 * "All 25 skins" gallery. Renders four direction cards with sample
 * content inside a `CardSkinProvider` for the supplied skin.
 *
 * Doesn't pull in the full overlay, navigation, or role providers
 * — pure visual preview so the gallery grid stays cheap and
 * scrolls well at 25 cells.
 */

import { Box, Chip, Stack, Typography } from "@mui/material";

import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";

import { CardSkinProvider, NextBestActionCard, NextBestActionCardHeader, NextBestActionCardDifficulty, useCardSkin } from "@expanse/hud"
import type { CardSkin, CardSkinConfig, CardSkinPreset } from "@expanse/hud"

const SAMPLE = [
  {
    Chevron: KeyboardArrowUpRoundedIcon,
    chevronLabel: "Up",
    question: "Why",
    pageLabel: "Strategy",
    PageIcon: InsightsRoundedIcon,
    chips: [
      { label: "Emotion", Icon: FavoriteRoundedIcon },
      { label: "Purpose", Icon: StarRoundedIcon },
    ],
    difficulty: 2 as const,
    isRecommended: true,
  },
  {
    Chevron: KeyboardArrowLeftRoundedIcon,
    chevronLabel: "Left",
    question: "What",
    pageLabel: "Edu",
    PageIcon: SchoolRoundedIcon,
    chips: [{ label: "Explore", Icon: ExploreRoundedIcon }],
    difficulty: 4 as const,
    isRecommended: false,
  },
  {
    Chevron: KeyboardArrowRightRoundedIcon,
    chevronLabel: "Right",
    question: "How",
    pageLabel: "Highlights",
    PageIcon: AutoAwesomeRoundedIcon,
    chips: [{ label: "Process", Icon: ExploreRoundedIcon }],
    difficulty: 3 as const,
    isRecommended: false,
  },
  {
    Chevron: KeyboardArrowDownRoundedIcon,
    chevronLabel: "Down",
    question: "Who",
    pageLabel: "Culture",
    PageIcon: Diversity3RoundedIcon,
    chips: [{ label: "Audience", Icon: StarRoundedIcon }],
    difficulty: 1 as const,
    isRecommended: false,
  },
];

export interface SkinPreviewProps {
  skin: CardSkinPreset | CardSkin | CardSkinConfig;
  /** Whether the first card gets the amber recommended glow. Default true. */
  showRecommended?: boolean;
  /** Optional caption above the stack (e.g. skin id). */
  caption?: string;
  /** Optional skin label. */
  label?: string;
}

export function SkinPreview({
  skin,
  showRecommended = true,
  caption,
  label,
}: SkinPreviewProps) {
  return (
    <CardSkinProvider skin={skin}>
      <PreviewBody caption={caption} label={label} showRecommended={showRecommended} />
    </CardSkinProvider>
  );
}

function PreviewBody({
  caption,
  label,
  showRecommended,
}: {
  caption?: string;
  label?: string;
  showRecommended: boolean;
}) {
  const resolved = useCardSkin();
  const band = resolved.panelBand;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
        // Cell frame so the gallery cells are easy to scan against white.
        border: "1px solid rgba(15,23,42,0.10)",
        borderRadius: 2,
        bgcolor: "#FFFFFF",
        p: 1.5,
        height: "100%",
      }}
    >
      {(caption || label) && (
        <Box sx={{ minHeight: 36 }}>
          {caption && (
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                color: "rgba(15,23,42,0.55)",
                letterSpacing: 0.3,
              }}
            >
              {caption}
            </Typography>
          )}
          {label && (
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#0B1626",
              }}
            >
              {label}
            </Typography>
          )}
        </Box>
      )}

      {/* The band the cards live on — paints behind the stack so skins
          with a panelBand read at their intended contrast. */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          bgcolor: band?.bg ?? "transparent",
          borderRadius: band?.radius ?? 1.5,
          border: band?.border ?? "none",
          boxShadow: band?.shadow,
          p: 1,
        }}
      >
        <Stack spacing={1.5} sx={{ p: 0.5 }}>
          {SAMPLE.map((datum, idx) => (
            <NextBestActionCard
              key={datum.question}
              topPickStyle={idx === 0 && showRecommended ? "glow-amber" : "none"}
              selected={idx === 0 && showRecommended}
              header={
                <NextBestActionCardHeader
                  Chevron={datum.Chevron}
                  chevronLabel={datum.chevronLabel}
                  question={datum.question}
                  pageLabel={datum.pageLabel}
                  PageIcon={datum.PageIcon}
                  selected={idx === 0 && showRecommended}
                />
              }
              body={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: "flex", gap: 0.75, flex: 1, minWidth: 0, flexWrap: "wrap" }}>
                    {datum.chips.map((chip) => {
                      const Icon = chip.Icon;
                      return (
                        <Chip
                          key={chip.label}
                          size="small"
                          icon={<Icon sx={{ fontSize: 12 }} />}
                          label={chip.label}
                          sx={{
                            height: 20,
                            bgcolor: resolved.chip.bg,
                            color: resolved.chip.color,
                            border: resolved.chip.border,
                            "& .MuiChip-icon": { color: resolved.chip.iconColor, ml: 0.5 },
                            "& .MuiChip-label": { fontSize: "0.65rem", fontWeight: 600, px: 0.5 },
                          }}
                        />
                      );
                    })}
                  </Box>
                  <NextBestActionCardDifficulty value={datum.difficulty} />
                </Box>
              }
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
