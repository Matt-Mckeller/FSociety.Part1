/**
 * Storybook stories for the small SVG glyphs in `src/display/icons/`.
 *
 * One file covers all five icons so they live next to their source and
 * appear together in the sidebar under `BrandCore/Display/Icons`.
 *
 * Notes:
 * - `GemIcon` and `ExperienceIcon` read variants from MUI theme
 *   (`theme.components.Gem` / `theme.components.ExperienceIcon`). The
 *   brand-core preview already injects those via factories, so no extra
 *   `ThemeProvider` is needed here.
 * - Default background is white per project preference; theme background
 *   is still selectable from the toolbar.
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import { CoinIcon } from "../../composites/CoinIcon/CoinIcon";
import {
  CoinStackIcon,
  COIN_BLACK,
  COIN_BLACK_SHADOW,
  COIN_PALETTES,
  type CoinStackPaletteName,
} from "./CoinStackIcon";
import { ExperienceIcon } from "./ExperienceIcon";
import { GemIcon } from "./GemIcon";
import { XpIcon } from "./XpIcon";

const meta: Meta = {
  title: "BrandCore/Display/Icons",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "light-gray", value: "#f5f5f5" },
        { name: "dark", value: "#121212" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

const Cell = ({
  label,
  size = 64,
  background = "transparent",
  children,
}: {
  label: string;
  size?: number;
  background?: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ textAlign: "center" }}>
    <Box
      sx={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        p: 1,
      }}
    >
      {children}
    </Box>
    <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
      {label}
    </Typography>
  </Box>
);

// ---------------------------------------------------------------------------
// Overview – all icons at a glance
// ---------------------------------------------------------------------------

export const AllIcons: Story = {
  name: "All Icons",
  render: () => (
    <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
      <Cell label="CoinIcon" size={64}>
        <CoinIcon color="#E8B339" />
      </Cell>
      <Cell label="CoinStackIcon" size={80}>
        <CoinStackIcon size={72} />
      </Cell>
      <Cell label="ExperienceIcon" size={64}>
        <Box sx={{ height: 56 }}>
          <ExperienceIcon />
        </Box>
      </Cell>
      <Cell label="GemIcon" size={96}>
        <Box sx={{ width: 56, height: 92 }}>
          <GemIcon />
        </Box>
      </Cell>
      <Cell label="XpIcon" size={64}>
        <XpIcon color="#1976d2" />
      </Cell>
    </Stack>
  ),
};

// ---------------------------------------------------------------------------
// CoinIcon
// ---------------------------------------------------------------------------

export const CoinIconStory: Story = {
  name: "CoinIcon",
  render: () => {
    const paletteNames = Object.keys(COIN_PALETTES) as CoinStackPaletteName[];
    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline">Sizes</Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
            {[24, 40, 64, 96].map((s) => (
              <Cell key={s} label={`${s}px`} size={s + 16}>
                <Box sx={{ height: s }}>
                  <CoinIcon color={COIN_PALETTES.gold.color} />
                </Box>
              </Cell>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline">Palettes — Light</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            {paletteNames.map((name) => (
              <Cell key={name} label={name} size={72} background="#ffffff">
                <Box sx={{ height: 56 }}>
                  <CoinIcon color={COIN_PALETTES[name].color} />
                </Box>
              </Cell>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline">Palettes — Dark</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            {paletteNames.map((name) => (
              <Cell key={name} label={name} size={72} background="#121212">
                <Box sx={{ height: 56 }}>
                  <CoinIcon color={COIN_PALETTES[name].color} />
                </Box>
              </Cell>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline">With Text</Typography>
          <Stack direction="row" spacing={2}>
            <Cell label='text="XP"' size={80}>
              <Box sx={{ height: 64 }}>
                <CoinIcon color={COIN_PALETTES.gold.color} text="XP" />
              </Box>
            </Cell>
            <Cell label='text="100"' size={80}>
              <Box sx={{ height: 64 }}>
                <CoinIcon color={COIN_PALETTES.gold.color} text="100" />
              </Box>
            </Cell>
            <Cell label="dark text" size={80}>
              <Box sx={{ height: 64 }}>
                <CoinIcon
                  color={COIN_PALETTES.gold.color}
                  text="$"
                  textColor="#1a1a1a"
                />
              </Box>
            </Cell>
          </Stack>
        </Box>
      </Stack>
    );
  },
};

// ---------------------------------------------------------------------------
// CoinStackIcon
// ---------------------------------------------------------------------------

export const CoinStackIconStory: Story = {
  name: "CoinStackIcon",
  render: () => {
    const paletteNames = Object.keys(COIN_PALETTES) as CoinStackPaletteName[];
    const sizes = [24, 36, 60, 90, 120, 160];
    const backgrounds = [
      { label: "white", value: "#ffffff" },
      { label: "paper", value: "#f5f5f5" },
      { label: "brand dark", value: "#0e1430" },
      { label: "neon", value: "#021118" },
    ];
    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="overline">Sizes ladder</Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
            {sizes.map((s) => (
              <Cell key={s} label={`size=${s}`} size={s + 24}>
                <CoinStackIcon size={s} />
              </Cell>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline">Palettes — Light</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            {paletteNames.map((name) => (
              <Cell key={name} label={name} size={120} background="#ffffff">
                <CoinStackIcon size={90} {...COIN_PALETTES[name]} />
              </Cell>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline">Palettes — Dark</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            {paletteNames.map((name) => (
              <Cell key={name} label={name} size={120} background="#121212">
                <CoinStackIcon size={90} {...COIN_PALETTES[name]} />
              </Cell>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline">Background matrix (silver)</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            {backgrounds.map((bg) => (
              <Cell
                key={bg.label}
                label={bg.label}
                size={120}
                background={bg.value}
              >
                <CoinStackIcon size={90} ringFaceFill={bg.value} />
              </Cell>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline">Custom overrides</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <Cell label="centerColor=gold" size={120}>
              <CoinStackIcon size={90} centerColor="#E8B339" />
            </Cell>
            <Cell label="ring + center dark" size={120} background="#1a1a2e">
              <CoinStackIcon
                size={90}
                color="#E8B339"
                shadowColor="#9B6E1A"
                ringFaceFill="#1a1a2e"
              />
            </Cell>
            <Cell label="auto-dark when color=BLACK" size={120}>
              <CoinStackIcon
                size={90}
                color={COIN_BLACK}
                shadowColor={COIN_BLACK_SHADOW}
              />
            </Cell>
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline">Accessibility</Typography>
          <Stack direction="row" spacing={2}>
            <Cell label='title="Treasure"' size={120}>
              <CoinStackIcon size={90} title="Treasure" />
            </Cell>
            <Cell label="title={null} (decorative)" size={120}>
              <CoinStackIcon size={90} title={null} />
            </Cell>
          </Stack>
        </Box>
      </Stack>
    );
  },
};

// ---------------------------------------------------------------------------
// CoinStackIcon — Rounded Arcs
// ---------------------------------------------------------------------------

export const CoinStackRounded: Story = {
  name: "CoinStackIcon / Rounded Arcs",
  render: () => {
    const paletteNames = Object.keys(COIN_PALETTES) as CoinStackPaletteName[];
    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="overline" gutterBottom>
            Sharp vs Rounded — All Palettes
          </Typography>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
            {paletteNames.map((name) => (
              <Stack key={name} spacing={1} sx={{ alignItems: "center" }}>
                <Cell label={`${name} — sharp`} size={120} background="#ffffff">
                  <CoinStackIcon size={90} {...COIN_PALETTES[name]} />
                </Cell>
                <Cell
                  label={`${name} — rounded`}
                  size={120}
                  background="#ffffff"
                >
                  <CoinStackIcon size={90} {...COIN_PALETTES[name]} rounded />
                </Cell>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    );
  },
};

// ---------------------------------------------------------------------------
// CoinPillBar
// ---------------------------------------------------------------------------

export const CoinPillBarStory: Story = {
  name: "Coin Pill Bar",
  render: () => {
    const Divider = () => (
      <Box
        sx={{
          width: "1px",
          height: 48,
          background: "rgba(255,255,255,0.12)",
          alignSelf: "center",
        }}
      />
    );

    const lightTiers: { palette: CoinStackPaletteName; value: string }[] = [
      { palette: "gold", value: "★★★" },
      { palette: "silver", value: "★★" },
      { palette: "bronze", value: "★" },
      { palette: "platinum", value: "MAX" },
    ];

    const darkTiers: { palette: CoinStackPaletteName; value: string }[] = [
      { palette: "neon", value: "+XP" },
      { palette: "gold", value: "500" },
      { palette: "ruby", value: "100" },
      { palette: "sapphire", value: "250" },
    ];

    const jewelTiers: { palette: CoinStackPaletteName; value: string }[] = [
      { palette: "emerald", value: "+500" },
      { palette: "sapphire", value: "+250" },
      { palette: "ruby", value: "+100" },
      { palette: "rose", value: "+50" },
    ];

    return (
      <>
        <Typography
          variant="h2"
          sx={{ color: "#555", fontWeight: 600, textAlign: "center" }}
        >
          Web 4 Coins Example
        </Typography>
        <Stack spacing={5} sx={{ alignItems: "center", py: 4 }}>
          {/* Light Tier */}
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "#555", letterSpacing: 1 }}
            >
              LIGHT TIER
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                borderRadius: "999px",
                background: "#f5f5f5",
                border: "1px solid #e0e0e0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                px: 3.5,
                py: 1.5,
                gap: 2,
                alignItems: "center",
              }}
            >
              {lightTiers.map((item, i) => (
                <Stack
                  key={item.palette}
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Stack spacing={0.5} sx={{ alignItems: "center" }}>
                    <CoinStackIcon size={44} {...COIN_PALETTES[item.palette]} />
                    <Typography
                      variant="caption"
                      sx={{ fontSize: 10, color: "#555", fontWeight: 600 }}
                    >
                      {item.value}
                    </Typography>
                  </Stack>
                  {i < lightTiers.length - 1 && (
                    <Box
                      sx={{
                        width: "1px",
                        height: 40,
                        background: "#d0d0d0",
                        alignSelf: "center",
                      }}
                    />
                  )}
                </Stack>
              ))}
            </Box>
          </Stack>

          {/* Dark Game HUD */}
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "#555", letterSpacing: 1 }}
            >
              DARK GAME HUD
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #0e1430 0%, #1a1a2e 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.5), 0 0 16px rgba(0,212,255,0.08)",
                px: 3.5,
                py: 1.5,
                gap: 2,
                alignItems: "center",
              }}
            >
              {darkTiers.map((item, i) => (
                <Stack
                  key={item.palette}
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Stack spacing={0.5} sx={{ alignItems: "center" }}>
                    <CoinStackIcon size={44} {...COIN_PALETTES[item.palette]} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 600,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Stack>
                  {i < darkTiers.length - 1 && <Divider />}
                </Stack>
              ))}
            </Box>
          </Stack>

          {/* Neon Jewel */}
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "#555", letterSpacing: 1 }}
            >
              NEON JEWEL
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                borderRadius: "999px",
                background: "#021118",
                border: "1px solid rgba(0,212,255,0.25)",
                boxShadow:
                  "0 0 0 1px rgba(0,212,255,0.08), 0 0 24px rgba(0,212,255,0.15), 0 4px 16px rgba(0,0,0,0.6)",
                px: 3.5,
                py: 1.5,
                gap: 2,
                alignItems: "center",
              }}
            >
              {jewelTiers.map((item, i) => (
                <Stack
                  key={item.palette}
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Stack spacing={0.5} sx={{ alignItems: "center" }}>
                    <CoinStackIcon size={44} {...COIN_PALETTES[item.palette]} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: 10,
                        color: "rgba(0,212,255,0.7)",
                        fontWeight: 600,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Stack>
                  {i < jewelTiers.length - 1 && <Divider />}
                </Stack>
              ))}
            </Box>
          </Stack>
        </Stack>
      </>
    );
  },
};

// ---------------------------------------------------------------------------
// ExperienceIcon
// ---------------------------------------------------------------------------

export const ExperienceIconStory: Story = {
  name: "ExperienceIcon",
  render: () => (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
        {[40, 80, 120, 160].map((h) => (
          <Cell key={h} label={`${h}px tall`} size={h / 2 + 24}>
            <Box sx={{ height: h }}>
              <ExperienceIcon />
            </Box>
          </Cell>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        <Cell label='variant="contrast"' size={100}>
          <Box sx={{ height: 80 }}>
            <ExperienceIcon variant="contrast" />
          </Box>
        </Cell>
        <Cell label='variant="default"' size={100}>
          <Box sx={{ height: 80 }}>
            <ExperienceIcon variant="default" />
          </Box>
        </Cell>
        <Cell label="ringOpacity=0.3" size={100}>
          <Box sx={{ height: 80 }}>
            <ExperienceIcon ringOpacity={0.3} />
          </Box>
        </Cell>
      </Stack>
    </Stack>
  ),
};

// ---------------------------------------------------------------------------
// GemIcon
// ---------------------------------------------------------------------------

export const GemIconStory: Story = {
  name: "GemIcon",
  render: () => (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
        {[80, 140, 200, 260].map((h) => (
          <Cell key={h} label={`${h}px tall`} size={h / 2 + 32}>
            <Box sx={{ width: (h * 167) / 272, height: h }}>
              <GemIcon />
            </Box>
          </Cell>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        <Cell label='variant="default"' size={140}>
          <Box sx={{ width: 80, height: 130 }}>
            <GemIcon variant="default" />
          </Box>
        </Cell>
        <Cell label='variant="contrastBG"' size={140} background="#1a1a2e">
          <Box sx={{ width: 80, height: 130 }}>
            <GemIcon variant="contrastBG" />
          </Box>
        </Cell>
      </Stack>
    </Stack>
  ),
};

// ---------------------------------------------------------------------------
// XpIcon
// ---------------------------------------------------------------------------

export const XpIconStory: Story = {
  name: "XpIcon",
  render: () => (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
        {[24, 40, 64, 96].map((s) => (
          <Cell key={s} label={`${s}px`} size={s + 16}>
            <Box sx={{ width: s, height: s }}>
              <XpIcon color="#1976d2" />
            </Box>
          </Cell>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        {["#1976d2", "#7C4DFF", "#E8B339", "#2e7d32", "#000000"].map((c) => (
          <Cell key={c} label={c} size={72}>
            <Box sx={{ width: 48, height: 48 }}>
              <XpIcon color={c} />
            </Box>
          </Cell>
        ))}
      </Stack>
    </Stack>
  ),
};
