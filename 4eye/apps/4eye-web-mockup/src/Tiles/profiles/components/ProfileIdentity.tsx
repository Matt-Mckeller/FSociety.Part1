"use client";

/**
 * ProfileIdentity — the single identity header for the app-realm profile page.
 *
 * The page previously showed two competing headers: `ProfileHeader` on the
 * Profile tab and `CharacterHeader` on the Character tab. Switching tabs swapped
 * the identity chrome, which read as navigating to a different person. This is
 * the one header that stays put across every lens.
 *
 * It composes the pieces that already existed rather than inventing new ones:
 * the avatar + bottom-left level badge and the name/titles/roles/value strip from
 * `ProfileHeader`, plus the coded {@link IdentityName} treatment lifted out of the
 * integration-layers Human panel so the two surfaces read as one system.
 *
 * **Colour.** The header is anchored on the page's green accent and little else.
 * The level badge, title chips, avatar frame, logo rings and the Human IP pill
 * all draw from `accent`; before, each pulled from a different source
 * (`secondary.main`, the profile's personal `COLOR_MAP` hue, hard-coded white,
 * violet/amber), so the header carried five unrelated hues before a single
 * content chip was drawn. Role chips render `quiet` here. Highest-value themes
 * live on Surfaced / Core, not in this band. The vitals glyph is the one
 * deliberate warm counterpoint.
 *
 * The avatar doubles as a mark toggle — character portrait ⇄ the 4Eye mark —
 * and remembers the choice, like the page's other display preferences.
 *
 * `ProfileHeader` is intentionally left in place — `ProfilesTile` still uses it
 * when rendered standalone (Storybook, embedded use).
 */

import * as React from "react";
import {
  Box,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { ProfileFrame, type TierLevel } from "@expanse/character/2d";
import { CHARACTER_PERSONAS } from "@expanse/character/2d";
import { ExpanseLogoV5 } from "@expanse/brand-core";
import { SOFT_CYAN } from "@expanse/theme";

import { IdentityName, type IdentityPalette } from "@4eye/web/components/surface";
import { GoalGlyphs, VISION_GOALS } from "@4eye/web/Tiles/integration-layers/goals";
import { useProfiles } from "../store/ProfileProvider";
import { usePersistedChoice } from "./ProfileControls";
import { IdentityMarks } from "./shared/IdentityMarks";
import { formatLevelMark } from "@yen/content/character/types";

/** Avatar edge length. The mark renders into the same box, so toggling reflows nothing. */
const AVATAR_SIZE = 72;

const MARKS = ["character", "logo"] as const;
type Mark = (typeof MARKS)[number];

export interface ProfileIdentityProps {
  accent: string;
  /**
   * Show the three signature goals as glyphs in the identity band. The page
   * passes `true` only on lenses that don't render the Goals bracket, so the
   * trio appears exactly once wherever you are.
   */
  showGoalGlyphs?: boolean;
  /** Where a glyph click goes — the lens that hosts the full goals showcase. */
  onGoalsClick?: () => void;
}

export function ProfileIdentity({ accent, showGoalGlyphs = false, onGoalsClick }: ProfileIdentityProps) {
  const { profile, state, dispatch } = useProfiles();
  const theme = useTheme();
  const displayName = state.showRealNames && profile.realName ? profile.realName : profile.username;

  const [mark, setMark] = usePersistedChoice<Mark>("4eye.profile.identityMark", "logo", MARKS);

  // Level-based progression tier, matching the map page's character quality. The
  // frame colour now follows the page accent rather than the profile's personal
  // `COLOR_MAP` hue — a blue ring around a green header was the loudest of the
  // header's colour collisions.
  const tier = Math.min(5, Math.max(1, Math.ceil(profile.level / 4))) as TierLevel;

  /**
   * Green-anchored Human IP: the two state badges sit in the accent's own family
   * instead of violet/amber, leaving the vitals glyph as the single warm note.
   * `HumanPanel` keeps the original pairing via the component's defaults.
   */
  const identityPalette: IdentityPalette = React.useMemo(
    () => ({ badgeA: accent, badgeB: SOFT_CYAN, vitals: "#ff6f91" }),
    [accent],
  );

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        pb: 1.25,
        borderBottom: "1px solid",
        borderColor: alpha(accent, 0.22),
      }}
    >
      <Box sx={{ position: "relative", display: "flex" }}>
        <Tooltip
          arrow
          placement="bottom-start"
          title={mark === "character" ? "Show the 4Eye mark" : "Show the character portrait"}
        >
          <Box
            component="button"
            type="button"
            aria-pressed={mark === "logo"}
            aria-label={
              mark === "character"
                ? "Character portrait. Activate to show the 4Eye mark."
                : "4Eye mark. Activate to show the character portrait."
            }
            onClick={() => setMark(mark === "character" ? "logo" : "character")}
            sx={{
              display: "flex",
              p: 0,
              border: 0,
              bgcolor: "transparent",
              borderRadius: "50%",
              cursor: "pointer",
              "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 3 },
            }}
          >
            {mark === "character" ? (
              <ProfileFrame
                {...CHARACTER_PERSONAS.hero}
                size={AVATAR_SIZE}
                zoom="head"
                tier={tier}
                customColors={{ primary: accent, accent, glow: alpha(accent, 0.35) }}
                background="transparent"
              />
            ) : (
              <LogoMark size={AVATAR_SIZE} accent={accent} />
            )}
          </Box>
        </Tooltip>

        {/* Level badge — bottom-left per the userProfile improvement note. */}
        <Box
          sx={{
            position: "absolute",
            bottom: -2,
            left: -2,
            zIndex: 2,
            px: 0.75,
            height: 20,
            display: "flex",
            alignItems: "center",
            borderRadius: 1,
            pointerEvents: "none",
            bgcolor: accent,
            color: theme.palette.getContrastText(accent),
            fontSize: 11,
            fontWeight: 800,
            boxShadow: 1,
          }}
        >
          {formatLevelMark(profile.level)}
        </Box>
      </Box>

      <Box sx={{ flex: 1, minWidth: 220 }}>
        {/*
          Human IP — the coded identity line, shared with the integration-layers
          Human panel. The mark used to sit here as well as on the avatar; with
          the face now carrying it, a second copy one line away was the same
          logo twice in 80px. The Human IP reads better as the whole line.
        */}
        <Box sx={{ display: "flex", mb: 0.4, flexWrap: "wrap", gap: 0.75, alignItems: "center" }}>
          <IdentityName accent={accent} palette={identityPalette} />
          {profile.coordinates && (
            <Tooltip
              arrow
              title={
                <Box sx={{ py: 0.25 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em" }}>
                    COORDINATES
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, mt: 0.25 }}>
                    {profile.coordinates.label}
                    {profile.coordinates.timezone ? ` · ${profile.coordinates.timezone}` : ""}
                  </Typography>
                  {profile.coordinates.coded && (
                    <Typography sx={{ fontSize: 11, mt: 0.35, fontFamily: "monospace", opacity: 0.85 }}>
                      {profile.coordinates.coded}
                    </Typography>
                  )}
                </Box>
              }
            >
              <Stack
                component="span"
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1,
                  py: 0.35,
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: alpha(accent, 0.28),
                  bgcolor: alpha(accent, 0.06),
                  cursor: "default",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 8.5,
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: alpha(accent, 0.85),
                  }}
                >
                  Loc
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  {profile.coordinates.coded ?? profile.coordinates.label}
                </Typography>
              </Stack>
            </Tooltip>
          )}
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
          {displayName}
        </Typography>
        {state.showRealNames && profile.realName && (
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
            @{profile.username}
          </Typography>
        )}

        <Select
          size="small"
          value={state.activeProfileId}
          onChange={(e) => dispatch({ kind: "set-profile", id: String(e.target.value) })}
          aria-label="Select profile user"
          sx={{
            mt: 0.5,
            minWidth: 168,
            fontSize: 12.5,
            fontWeight: 600,
            "& .MuiSelect-select": { py: 0.5 },
          }}
        >
          {state.profiles.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.realName ? `${p.realName} (@${p.username})` : p.username}
            </MenuItem>
          ))}
        </Select>

        <IdentityMarks
          titles={profile.titles}
          roles={profile.roles}
          activeRoleGoal={profile.activeRoleGoal}
          accent={accent}
          quietRoles
        />
      </Box>

      <Stack sx={{ alignItems: "flex-end", gap: 0.75 }}>
        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Switch
              size="small"
              checked={state.showRealNames}
              onChange={() => dispatch({ kind: "toggle-real-name" })}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: accent,
                  "&:hover": { bgcolor: alpha(accent, 0.1) },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: accent },
              }}
            />
          }
          label={
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Real name
            </Typography>
          }
        />

        {/*
          Goals close the trailing column, under the switch: identity is who you
          are, and the three things you are aiming at belong to that read. The
          column was otherwise one toggle over empty space, so on any width
          where the header doesn't already wrap the trio costs no height.
        */}
        {showGoalGlyphs && (
          <Stack sx={{ alignItems: "flex-end", gap: 0.25 }}>
            <Typography
              sx={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "text.secondary",
                lineHeight: 1,
              }}
            >
              Goals
            </Typography>
            <GoalGlyphs
              goals={VISION_GOALS}
              size={18}
              onSelect={onGoalsClick ? () => onGoalsClick() : undefined}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

/**
 * The 4Eye mark as the face — same box and ring weight as `ProfileFrame`, so
 * toggling swaps the content without moving anything around it. It carries the
 * comet orbital rings the inline copy used to have: at avatar size they read as
 * the mark's own frame, which is why the mark no longer needs a second showing
 * next to the Human IP.
 */
function LogoMark({ size, accent }: { size: number; accent: string }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${alpha(accent, 0.55)}`,
        background: `radial-gradient(circle at 50% 40%, ${alpha(accent, 0.24)}, ${alpha(accent, 0.05)})`,
        boxShadow: `0 0 16px ${alpha(accent, 0.3)}`,
      }}
    >
      <ExpanseLogoV5
        variant="minimal"
        height={size * 0.72}
        showOrbitalRings
        showPrimaryRings
        ringStyle="comet"
        ringFill={accent}
        orbitalFill={accent}
        ringStrokeWidth={1.6}
        orbitalOpacity={0.92}
        pupilStrokeColor={accent}
        pupilStrokeWidth={1.4}
      />
    </Box>
  );
}
