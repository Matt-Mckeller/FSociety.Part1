"use client";

import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
  createTheme,
  useTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ProfilePhoto } from "@expanse/character/2d";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

// ─── Red character helper ────────────────────────────────────────────────────

function BlueCharacter({ size }: { size?: number }) {
  const base = useTheme();
  const blueTheme = createTheme(base, {
    components: {
      ExpanseCharacter: {
        variants: {
          default: {
            headColor: "#93c5fd",
            limbColor: "#93c5fd",
            bodyColor: "#1d4ed8",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={blueTheme}>
      <ProfilePhoto
        variant="friendly"
        eyeGlowColor="#3b82f6"
        secondaryColor="#60a5fa"
        size={size ?? 56}
        zoom="head"
        background="transparent"
        shadow={false}
      />
    </ThemeProvider>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface ProfileStatsCardProps {
  name?: string;
  level?: number;
  xpCurrent?: number;
  xpNext?: number;
  learnScore?: number;
  earnScore?: number;
  competeScore?: number;
  focus?: string;
  /** Hide the small avatar in the header (when paired with a larger character). */
  hideAvatar?: boolean;
}

const STAT_CHIPS = [
  {
    key: "learn",
    label: "Learn",
    Icon: AutoStoriesIcon,
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    key: "earn",
    label: "Earn",
    Icon: EmojiEventsIcon,
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    key: "compete",
    label: "Compete",
    Icon: SportsScoreIcon,
    color: "#059669",
    bg: "#ecfdf5",
  },
] as const;

export default function ProfileStatsCard({
  name = "Sample Human",
  level = 7,
  xpCurrent = 620,
  xpNext = 1000,
  learnScore = 84,
  earnScore = 310,
  competeScore = 42,
  focus = "relationships",
  hideAvatar = false,
}: ProfileStatsCardProps = {}) {
  const scores: Record<string, number> = {
    learn: learnScore,
    earn: earnScore,
    compete: competeScore,
  };

  const xpPct = Math.round((xpCurrent / xpNext) * 100);

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(15,23,42,0.08)",
        bgcolor: "background.paper",
        p: { xs: 2, sm: 2.5 },
        maxWidth: 300,
        width: "100%",
      }}
    >
      {/* Avatar + name + level row */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          mb: 1.5
        }}>
        {!hideAvatar && <BlueCharacter size={56} />}
        <Box
          sx={{
            flex: 1,
            minWidth: 0
          }}>
          <Typography variant="subtitle1" noWrap sx={{
            fontWeight: 700
          }}>
            {name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            Level {level}
          </Typography>
        </Box>
      </Stack>
      {/* XP bar */}
      <Stack spacing={0.5} sx={{
        mb: 2
      }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            XP
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {xpCurrent.toLocaleString()} / {xpNext.toLocaleString()}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={xpPct}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "#f1f5f9",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              background: "linear-gradient(90deg, #6366f1, #ef4444)",
            },
          }}
        />
      </Stack>
      {/* Stat chips */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap: "wrap",
          rowGap: 1,
          mb: 1.5
        }}>
        {STAT_CHIPS.map(({ key, label, Icon, color, bg }) => (
          <Box
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.4,
              borderRadius: 999,
              bgcolor: bg,
              border: `1px solid ${color}22`,
            }}
          >
            <Icon sx={{ fontSize: 14, color }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color, lineHeight: 1 }}
            >
              {label}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "text.secondary",
                fontSize: "0.7rem",
              }}
            >
              {scores[key]}
            </Typography>
          </Box>
        ))}
      </Stack>
      {/* Focus line */}
      {focus ? (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          Focus:{" "}
          <Box component="span" sx={{ color: "text.primary", fontStyle: "normal", fontWeight: 600 }}>
            {focus}
          </Box>
        </Typography>
      ) : null}
    </Box>
  );
}
