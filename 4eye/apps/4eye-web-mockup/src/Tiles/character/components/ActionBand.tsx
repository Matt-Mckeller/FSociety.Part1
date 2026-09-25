"use client";

/**
 * ActionBand — the top of the Character lens: what you can fire, and what your
 * gestures are bound to.
 *
 * These two were one undifferentiated band with two labels on it, which read as
 * "here are some more buttons". They are not the same thing:
 *
 *   **Actions** are *invoked*. You tap one and it happens now.
 *   **Swipe Cast** is a *binding surface*. Tapping a cell never fires anything —
 *   it opens a picker and assigns which action a gesture will fire later.
 *
 * A control you press and a control you configure should not look alike, so they
 * no longer do: each sits in its own bordered card with the verb in its
 * subtitle ("tap to invoke" / "assign what each gesture fires"), the rose is
 * drawn in neutral chrome with colour reserved for the cells that actually have
 * something bound, and the Actions card carries the invoked-channel hue from
 * `characterPalette` that the spell book and active perks share.
 *
 * They stay side by side rather than stacking, because the lens has the width
 * and because the pair *is* the answer to "what can I do right now" — the split
 * is about telling two kinds of control apart, not about putting them on
 * separate screens.
 *
 * Which side each takes is genuinely arguable, so it ships as a control rather
 * than as a decision. `cast-left` is the default: the rose is a fixed-width
 * object and the action bar is elastic, so putting the rose first gives the
 * buttons the remaining space. The choice persists per browser, like the other
 * display preferences on this surface.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { CycleControl, usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";

import { useChannelInks } from "../theme/characterPalette";
import { EquippedActionsBar } from "./EquippedActionsBar";
import { SwipeRose } from "./SwipeRose";
import {
  useLoadoutOptional,
  isEngineTemplate,
  bindingTemplateById,
} from "@4eye/web/components/loadout";

export const ACTION_BAND_LAYOUTS = ["cast-left", "cast-right", "stacked"] as const;
export type ActionBandLayout = (typeof ACTION_BAND_LAYOUTS)[number];

/** The rose is a fixed 3×64 grid plus gaps and its card padding. */
const ROSE_WIDTH = 248;

/**
 * The two treatments are deliberately *not* one component with a prop.
 *
 * They were, and that is exactly why the split failed to land: same border,
 * same radius, same paper fill, same header rhythm, differing only in a dot and
 * a line of text. Two things rendered by one component look like two instances
 * of one thing, whatever the labels say — the shared style teaches sameness
 * faster than the caption teaches difference.
 *
 * So the difference is now structural. A thing you press is a raised card: solid
 * border, paper fill, channel tone. A thing you configure is a recessed well:
 * inset fill, dashed edge, no tone at all, and a BINDINGS tag saying what kind
 * of surface it is. You can tell them apart with the text blurred out.
 */
function InvokeCard({
  label,
  verb,
  tone,
  children,
  sx,
}: {
  label: string;
  verb: string;
  tone: string;
  children: React.ReactNode;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        minWidth: 0,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(tone, 0.3),
        bgcolor: "background.paper",
        boxShadow: `0 1px 2px ${alpha("#000", 0.05)}`,
        p: 1.5,
        ...sx,
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 0.75, mb: 1.25 }}>
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: tone,
            boxShadow: `0 0 6px ${alpha(tone, 0.55)}`,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: tone,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: "0.66rem", color: "text.secondary", minWidth: 0, flexGrow: 1 }}>
          {verb}
        </Typography>
      </Stack>
      {children}
    </Box>
  );
}

function BindingWell({
  label,
  verb,
  children,
  sx,
}: {
  label: string;
  verb: string;
  children: React.ReactNode;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        minWidth: 0,
        borderRadius: 2,
        // Recessed rather than raised, dashed rather than solid: the visual
        // grammar of a slot you fill in, not a control you operate.
        border: "1px dashed",
        borderColor: (theme) => alpha(theme.palette.text.primary, 0.18),
        bgcolor: (theme) => alpha(theme.palette.text.primary, 0.035),
        boxShadow: "none",
        p: 1.5,
        ...sx,
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 0.75, mb: 1.25 }}>
        <Typography
          sx={{
            fontSize: 8.5,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "text.disabled",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 999,
            px: 0.6,
            py: 0.1,
            flexShrink: 0,
          }}
        >
          Bindings
        </Typography>
        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "text.secondary",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: "0.66rem", color: "text.disabled", minWidth: 0, flexGrow: 1 }}>
          {verb}
        </Typography>
      </Stack>
      {children}
    </Box>
  );
}

export function ActionBand({ accent }: { accent: string }) {
  const [layout, setLayout] = usePersistedChoice<ActionBandLayout>(
    "4eye.character.actionBandLayout",
    "cast-left",
    ACTION_BAND_LAYOUTS,
  );
  const channels = useChannelInks();
  const loadout = useLoadoutOptional();
  const engine = isEngineTemplate(loadout?.state.activeBindingTemplateId);
  const engineAccent =
    engine && loadout?.state.activeBindingTemplateId
      ? bindingTemplateById(loadout.state.activeBindingTemplateId).accent
      : undefined;
  const actionTone = engineAccent ?? channels.invoked.ink;

  const stacked = layout === "stacked";

  const cast = (
    <BindingWell
      label="Swipe Cast"
      verb="pick a life or content-engine template, then assign what each gesture fires"
      sx={stacked ? undefined : { flexShrink: 0, width: { zero: "100%", laptop: ROSE_WIDTH } }}
    >
      <SwipeRose />
    </BindingWell>
  );

  const actions = (
    <InvokeCard
      label="Actions"
      verb="tap to invoke"
      tone={actionTone}
      sx={{
        ...(stacked ? undefined : { flex: 1, minWidth: 0 }),
        ...(engineAccent
          ? { bgcolor: alpha(engineAccent, 0.04), borderColor: alpha(engineAccent, 0.22) }
          : {}),
      }}
    >
      {/*
        Side by side, the band has less room, so the two groups stack within
        the actions card and the captions stay — they are what makes the split
        legible once the divider is horizontal. The second group arrives
        minimised: it acts on other people rather than on the thing in front of
        you, and four more hero-sized rings would be most of the lens. The
        action title stays on every button either way — collapse only shrinks
        the ring, it does not hide the name.
      */}
      <EquippedActionsBar
        prominent
        stacked={!stacked}
        collapseSecondary
        accent={actionTone}
      />
    </InvokeCard>
  );

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "flex-end", alignItems: "center", gap: 0.75, mb: 0.75 }}
      >
        <Tooltip
          title="Actions fire when you tap them. Swipe Cast only binds them to a gesture — nothing casts from that grid."
          arrow
        >
          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "text.disabled",
              cursor: "help",
              mr: "auto",
            }}
          >
            Two kinds of control
          </Typography>
        </Tooltip>
        <CycleControl
          label="Action layout"
          value={layout}
          options={ACTION_BAND_LAYOUTS}
          accent={accent}
          onChange={setLayout}
        />
      </Stack>

      {stacked ? (
        <Stack sx={{ gap: 2 }}>
          {actions}
          {cast}
        </Stack>
      ) : (
        <Stack
          sx={{
            flexDirection: { zero: "column", laptop: "row" },
            gap: 2,
            alignItems: "stretch",
          }}
        >
          {layout === "cast-left" ? cast : actions}
          {layout === "cast-left" ? actions : cast}
        </Stack>
      )}
    </Box>
  );
}
