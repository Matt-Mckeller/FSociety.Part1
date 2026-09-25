/**
 * NextBestActionCard — playground story.
 *
 * Renders the production `<NextBestActionCard />` (lives in
 * `@expanse/shell/hud-components/shared/`) which bakes the R9
 * "glass + breathing pulse" surface in as the *baseline* — every
 * card in the stack breathes equally. The columns below show the
 * recommended-pick affordance variations layered on top of that
 * baseline (`topPickStyle`).
 *
 * The "Glass-breathing base + Top Pick variations" view is the
 * canonical spec the production map overlay should match pixel-for-pixel.
 */

import type { ComponentType } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Chip,
  Stack,
  Tooltip,
  Typography,
  type SvgIconProps,
} from "@mui/material";

// Direction chevron glyphs
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import {
  NextBestActionCard,
  NextBestActionCardHeader,
  NextBestActionCardDifficulty,
  type TopPickStyle,
} from "../hud-components/next-best-action";

// Destination page icons
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";

// Chip icons
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SmartDisplayRoundedIcon from "@mui/icons-material/SmartDisplayRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";

type SvgIconLike = ComponentType<SvgIconProps>;
type Direction = "up" | "down" | "left" | "right";

interface CardDatum {
  direction: Direction;
  Chevron: SvgIconLike;
  question: string;
  pageLabel: string;
  PageIcon: SvgIconLike;
  chips: Array<{ label: string; Icon: SvgIconLike }>;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

const BLUE = "#3B82F6";

const SAMPLE: CardDatum[] = [
  {
    direction: "up",
    Chevron: KeyboardArrowUpRoundedIcon,
    question: "Why",
    pageLabel: "Strategy",
    PageIcon: InsightsRoundedIcon,
    chips: [
      { label: "Emotion", Icon: FavoriteRoundedIcon },
      { label: "Purpose", Icon: StarRoundedIcon },
      { label: "Highlights", Icon: AutoAwesomeRoundedIcon },
    ],
    difficulty: 2,
  },
  {
    direction: "left",
    Chevron: KeyboardArrowLeftRoundedIcon,
    question: "What",
    pageLabel: "Edu",
    PageIcon: SchoolRoundedIcon,
    chips: [
      { label: "Explore", Icon: ExploreRoundedIcon },
      { label: "Details", Icon: MenuBookRoundedIcon },
      { label: "Demo", Icon: SmartDisplayRoundedIcon },
    ],
    difficulty: 4,
  },
  {
    direction: "right",
    Chevron: KeyboardArrowRightRoundedIcon,
    question: "How",
    pageLabel: "Highlights",
    PageIcon: AutoAwesomeRoundedIcon,
    chips: [
      { label: "Process", Icon: RouteRoundedIcon },
      { label: "Media", Icon: SmartDisplayRoundedIcon },
    ],
    difficulty: 3,
  },
  {
    direction: "down",
    Chevron: KeyboardArrowDownRoundedIcon,
    question: "Who",
    pageLabel: "Culture",
    PageIcon: Diversity3RoundedIcon,
    chips: [
      { label: "Audience", Icon: GroupsRoundedIcon },
      { label: "Brand", Icon: PaymentsRoundedIcon },
    ],
    difficulty: 1,
  },
];

const TOP_PICK_OPTIONS: Array<{
  style: TopPickStyle;
  title: string;
  caption: string;
}> = [
  { style: "none", title: "T0 — None", caption: "Base only — every card breathes equally" },
  { style: "glow-amber", title: "T1 — Glow amber", caption: "Same loop, halo shifts to gold" },
  { style: "glow-pink", title: "T2 — Glow pink", caption: "Hot-pink halo — playful hero" },
  { style: "halo-ring", title: "T3 — Halo ring", caption: "Static gold ring outside the card" },
  { style: "shimmer", title: "T4 — Shimmer", caption: "Glass + light sweep (2.8s)" },
  { style: "floating-chip", title: "T5 — Floating chip", caption: "Gold pill pinned outside top edge" },
  { style: "corner-mark", title: "T6 — Corner mark", caption: "Gold corner triangle, top-right" },
];

function GlassBreathingColumn({
  title,
  caption,
  topPickStyle,
}: {
  title: string;
  caption: string;
  topPickStyle: TopPickStyle;
}) {
  return (
    <Stack spacing={1.5} sx={{ width: 360 }}>
      <Box>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", mt: 0.25 }}
        >
          {caption}
        </Typography>
      </Box>

      <Typography
        sx={{
          color: "#fff",
          fontSize: "1.15rem",
          fontWeight: 800,
          letterSpacing: 0.3,
          mt: 1,
        }}
      >
        Next best actions
      </Typography>

      {/* Generous vertical padding + gap so breathing halos don't clip. */}
      <Stack spacing={2.5} sx={{ pt: 2, pb: 2, px: 0.5 }}>
        {SAMPLE.map((datum, idx) => (
          <NextBestActionCard
            key={datum.direction}
            topPickStyle={idx === 0 ? topPickStyle : "none"}
            header={
              <NextBestActionCardHeader
                Chevron={datum.Chevron}
                chevronLabel={datum.direction}
                chevronColor={BLUE}
                question={datum.question}
                pageLabel={datum.pageLabel}
                PageIcon={datum.PageIcon}
              />
            }
            body={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {datum.chips.map((chip) => {
                    const Icon = chip.Icon;
                    return (
                      <Chip
                        key={chip.label}
                        size="small"
                        icon={<Icon sx={{ fontSize: 14 }} />}
                        label={chip.label}
                        sx={{
                          height: 22,
                          bgcolor: "rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.92)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          "& .MuiChip-icon": {
                            color: "rgba(255,255,255,0.7)",
                            ml: 0.75,
                          },
                          "& .MuiChip-label": {
                            fontSize: "0.7rem",
                            fontWeight: 600,
                          },
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
    </Stack>
  );
}

const meta: Meta = {
  title: "Playground / NextBestActionCard Variants",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "overlay",
      values: [
        { name: "overlay", value: "#2C4F76" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const GlassBreathingBase: Story = {
  name: "Glass-breathing base + Top Pick variations",
  render: () => (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        bgcolor: "#2C4F76",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.4rem",
              letterSpacing: 0.3,
            }}
          >
            Glass-breathing base + Top Pick variations
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.85rem",
              maxWidth: 720,
              mt: 0.5,
            }}
          >
            Every card breathes (R9 baseline). Each column shows a
            different <code>topPickStyle</code> applied to the first card
            to flag the recommended pick.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {TOP_PICK_OPTIONS.map((opt) => (
            <GlassBreathingColumn
              key={opt.style}
              title={opt.title}
              caption={opt.caption}
              topPickStyle={opt.style}
            />
          ))}
        </Box>
      </Box>
    </Box>
  ),
};

// Suppress unused-tooltip-export-only lint hits (kept for parity with
// other stories that import the same set).
void Tooltip;
