"use client";

/**
 * ChatProfilePanel — what of you rides on the next reply.
 *
 * The dock used to mount the full Profiles tile (eight views, 720px) into a
 * 340px column. This is the chat-sized lens: identity, inject toggle, aspect
 * chips, acting-as / active goal, and a link out to the Profile page.
 */

import NextLink from "next/link";
import {
  Box,
  Chip,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  PROFILE_ASPECT_GROUP_META,
  PROFILE_ASPECT_GROUPS,
  PROFILE_ASPECT_META,
  COLOR_MAP,
  aspectsInGroup,
  type ProfileAspect,
} from "@4eye/types";
import { useProfileContext } from "@4eye/features";

import { useSurface } from "@4eye/web/components/surface";
import { ProfileProvider, useProfiles } from "@4eye/web/Tiles/profiles";
import { AuraGlyphs } from "@4eye/web/Tiles/character/components/shared/AuraGlyphs";
import { GearChip } from "@4eye/web/Tiles/character/components/shared/GearChip";
import { ActingAsGoalsBlock } from "../contextSelectors/ActingAsGoalsBlock";
import { processesHref } from "@4eye/web/Tiles/profiles/lib/profileDeepLink";
import { formatLevelMark } from "@yen/content/character/types";

const WORKBENCH_ACCENT = "#818cf8";

const DEFAULT_INJECT: ProfileAspect[] = [
  "characteristics",
  "attributes",
  "perks",
  "equipment",
  "auras",
  "skills",
  "currentGoal",
  "relationships",
];

function ChatProfileInner() {
  const surface = useSurface();
  const ink = surface.ink(WORKBENCH_ACCENT);
  const { profile, state } = useProfiles();
  const { settings, setEnabled, toggleAspect, setIncludedAspects, reset } =
    useProfileContext();

  const displayName = state.showRealNames && profile.realName ? profile.realName : profile.username;
  const accent = COLOR_MAP[profile.accent ?? "slate"];
  const initial = displayName.slice(0, 1).toUpperCase();

  const handleEnable = (_: unknown, enabled: boolean) => {
    setEnabled(enabled);
    if (enabled && settings.includedAspects.length === 0) {
      setIncludedAspects(DEFAULT_INJECT);
    }
  };

  const preview =
    settings.enabled && settings.includedAspects.length > 0
      ? `Next reply carries ${settings.includedAspects.length} aspect${
          settings.includedAspects.length === 1 ? "" : "s"
        }`
      : "Profile is not riding on the next reply";

  return (
    <Stack sx={{ gap: 1.25, p: 1.25, color: surface.text.hi }}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 14,
            bgcolor: alpha(accent, 0.18),
            color: surface.ink(accent),
            border: "1px solid",
            borderColor: alpha(accent, 0.4),
          }}
        >
          {initial}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 14, lineHeight: 1.2 }} noWrap>
            {displayName}
          </Typography>
          <Typography sx={{ fontSize: 11, color: surface.text.lo }} noWrap>
            {profile.titles[0] ?? profile.username} · {formatLevelMark(profile.level, "lvl")}
          </Typography>
        </Box>
        <Tooltip title="Reset profile context" arrow>
          <IconButton
            size="small"
            onClick={reset}
            aria-label="Reset profile context"
            sx={{ color: surface.text.lo }}
          >
            <RestartAltIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <FormControlLabel
          sx={{ ml: 0, mr: 0, gap: 1, flex: 1 }}
          control={
            <Switch size="small" checked={settings.enabled} onChange={handleEnable} />
          }
          label={
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: surface.text.hi }}>
              Inject into this chat
            </Typography>
          }
        />
        <Tooltip title="Optimally injects the user" arrow>
          <Box
            component="span"
            aria-label="Optimally injects the user"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.35,
              height: 22,
              px: 0.65,
              flexShrink: 0,
              borderRadius: 1,
              border: "1px solid",
              borderColor: surface.dividerBorder,
              color: surface.text.lo,
              cursor: "help",
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 13 }} />
            <Typography
              component="span"
              sx={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.12em",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                lineHeight: 1,
              }}
            >
              IV
            </Typography>
          </Box>
        </Tooltip>
      </Stack>

      <Box sx={{ opacity: settings.enabled ? 1 : 0.45, pointerEvents: settings.enabled ? "auto" : "none" }}>
        <Stack sx={{ gap: 1 }}>
          {PROFILE_ASPECT_GROUPS.map((group) => {
            const groupMeta = PROFILE_ASPECT_GROUP_META[group];
            return (
              <Box key={group}>
                <Tooltip title={groupMeta.hint} arrow placement="top">
                  <Typography
                    sx={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: ink,
                      mb: 0.5,
                      width: "fit-content",
                    }}
                  >
                    {groupMeta.label}
                  </Typography>
                </Tooltip>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {aspectsInGroup(group).map((aspect) => {
                    const meta = PROFILE_ASPECT_META[aspect];
                    const on = settings.includedAspects.includes(aspect);
                    return (
                      <Tooltip key={aspect} title={meta.description} arrow>
                        <Chip
                          size="small"
                          label={meta.label}
                          clickable
                          onClick={() => toggleAspect(aspect)}
                          variant={on ? "filled" : "outlined"}
                          sx={{
                            height: 22,
                            fontSize: 11,
                            fontWeight: 700,
                            color: on ? ink : surface.text.lo,
                            bgcolor: on ? alpha(WORKBENCH_ACCENT, 0.16) : "transparent",
                            borderColor: on ? alpha(WORKBENCH_ACCENT, 0.55) : surface.dividerBorder,
                            "& .MuiChip-label": { px: 0.9 },
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Stack>

        {settings.includedAspects.includes("auras") || settings.includedAspects.includes("equipment") ? (
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.5, mt: 1 }}>
            {settings.includedAspects.includes("auras") && <AuraGlyphs size={20} />}
            {settings.includedAspects.includes("equipment") && <GearChip size={26} />}
          </Stack>
        ) : null}

        <ActingAsGoalsBlock accent={WORKBENCH_ACCENT} />
      </Box>

      <Typography sx={{ fontSize: "0.68rem", color: surface.text.faint, lineHeight: 1.4 }}>
        {preview}
      </Typography>

      <Box
        component={NextLink}
        href={processesHref()}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          fontSize: 11,
          fontWeight: 700,
          color: ink,
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Open Processes
        <OpenInNewRoundedIcon sx={{ fontSize: 12 }} />
      </Box>
    </Stack>
  );
}

export function ChatProfilePanel() {
  return (
    <ProfileProvider>
      <ChatProfileInner />
    </ProfileProvider>
  );
}
