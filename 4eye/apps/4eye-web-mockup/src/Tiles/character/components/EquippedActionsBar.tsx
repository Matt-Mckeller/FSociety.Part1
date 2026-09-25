"use client";

/**
 * EquippedActionsBar — the character's equipped actions (action bar).
 *
 * A horizontal row of action buttons. Cast opens the Spellbook; Emotion opens
 * the inspect HUD; Engage and Human switch Content Engine templates; the rest
 * log to the character feed.
 *
 * The bar carries **one** hue: the channel it belongs to. Every action here is
 * invoked — that is what an action bar is — so eight different accent hues were
 * eight answers to a question the section had already answered, and they read as
 * a row of unrelated app icons competing for the eye. `characterPalette` states
 * the rule this lens is built on (hue = channel, and nothing else) and names
 * this bar's old `COLOR_MAP` accents as one of the systems it replaced; the bar
 * now actually follows it. Engine modes still recolour the whole bar, because
 * switching template genuinely switches channel tone.
 *
 * With hue spent, the glyph and the caption do the telling-apart, so both are
 * drawn to be read rather than to attract: marks sit in the same 44px ring the
 * binding rose next door uses, at the same 22px, and the button itself has no
 * card chrome of its own until you hover. Position still means *what it acts
 * on* — the rule between the thirds and the group caption carry that.
 */

import * as React from "react";
import { Box, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { ChevronIcon } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";
import { usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";

import type { ActionGroup, EquippedAction } from "../model/types";
import { useChannelInks } from "../theme/characterPalette";
import { useCharacter } from "../store/CharacterProvider";
import { useOptionalProfileStore } from "../store/CharacterProfileStore";
import { useOpenEmotionInspect } from "@4eye/web/components/hud/state";
import { ActionIcon } from "./ActionIcon";
import { Empty } from "./shared/EquipSlot";
import {
  useLoadoutOptional,
  EQUIPPED_ACTIONS_BY_TEMPLATE,
  withCraftActions,
} from "@4eye/web/components/loadout";

type ButtonSize = "prominent" | "regular";

/**
 * Ring geometry, matched to the binding rose's cells at the hero size so the two
 * halves of the band read as one vocabulary at two scales. The widths are set by
 * the longest label rather than by the ring, so the pitch stays even instead of
 * "Communicate" bleeding past its own button.
 */
const RING = {
  prominent: { width: 92, cell: 44, glyph: 22, label: "0.72rem" },
  regular: { width: 72, cell: 36, glyph: 19, label: "0.66rem" },
} as const;

/**
 * One handler for all three sizes: the tap does the same thing whether the
 * action is a hero button or a minimised glyph, which is what makes minimising
 * the second group safe — nothing becomes unreachable, it just gets smaller.
 */
function useActionHandler(action: EquippedAction, accent: string) {
  const { state, dispatch } = useCharacter();
  const store = useOptionalProfileStore();
  const loadout = useLoadoutOptional();
  const openEmotionInspect = useOpenEmotionInspect();
  const opensSpellbook = action.id === "act-cast" || action.icon === "AutoFixHighRounded";
  const opensEmotionInspectAction = action.id === "act-inspect-emotion";

  return React.useCallback(() => {
    if (opensSpellbook) {
      dispatch({ type: "open-spellbook" });
      return;
    }
    if (opensEmotionInspectAction) {
      openEmotionInspect(state.activeEmotionId);
      return;
    }
    if (action.id === "act-engage") {
      loadout?.dispatch({ type: "apply-binding-template", templateId: "engage" });
    } else if (action.id === "act-human") {
      loadout?.dispatch({ type: "apply-binding-template", templateId: "content" });
    }
    store?.dispatch({
      type: "add-feed-event",
      event: {
        id: `action-${action.id}-${Date.now()}`,
        type: "action-used",
        label: `${action.label} used`,
        detail: action.hint,
        occurredAt: Date.now(),
        color: accent,
      },
    });
  }, [
    opensSpellbook,
    opensEmotionInspectAction,
    openEmotionInspect,
    state.activeEmotionId,
    dispatch,
    loadout,
    store,
    action.id,
    action.label,
    action.hint,
    accent,
  ]);
}

/**
 * One ring, one hue, one mark.
 *
 * The button has no card of its own: the Actions card is already a card, and
 * nesting eight more inside it drew eight frames to say what the ring says
 * quieter. Hover is where the chrome appears, so the resting state is a row of
 * glyphs and their names.
 */
function ActionButton({
  action,
  size = "regular",
  tone,
}: {
  action: EquippedAction;
  size?: ButtonSize;
  /** Channel ink for the whole bar — the only hue on the button. */
  tone: string;
}) {
  const onClick = useActionHandler(action, tone);
  const { width, cell, glyph, label } = RING[size];

  return (
    <Tooltip title={action.hint ?? action.label} arrow>
      <Box
        component="button"
        onClick={onClick}
        sx={{
          appearance: "none",
          cursor: "pointer",
          width,
          p: 0.5,
          border: "none",
          borderRadius: 2,
          bgcolor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.6,
          transition: "background-color 150ms ease, transform 100ms ease",
          "&:hover": {
            bgcolor: alpha(tone, 0.06),
            "& .action-ring": { borderColor: alpha(tone, 0.6), bgcolor: alpha(tone, 0.18) },
          },
          "&:focus-visible": { outline: `2px solid ${tone}`, outlineOffset: 2 },
          "&:active": { transform: "scale(0.96)" },
        }}
      >
        <Box
          className="action-ring"
          sx={{
            width: cell,
            height: cell,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1.5px solid ${alpha(tone, 0.38)}`,
            bgcolor: alpha(tone, 0.1),
            transition: "border-color 150ms ease, background-color 150ms ease",
          }}
        >
          <ActionIcon name={action.icon} sx={{ fontSize: glyph, color: tone, opacity: 0.85 }} />
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: "text.secondary",
            fontSize: label,
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          {action.label}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/**
 * The minimised form: still the action title, just denser.
 *
 * Used for the collapsed People group. Expansion restores the full rings;
 * collapse must not drop the name — the Character lens is where you learn
 * which glyph is which.
 */
function MiniAction({ action, tone }: { action: EquippedAction; tone: string }) {
  const onClick = useActionHandler(action, tone);

  return (
    <Tooltip title={action.hint ?? action.label} arrow>
      <Box
        component="button"
        onClick={onClick}
        aria-label={action.label}
        sx={{
          appearance: "none",
          cursor: "pointer",
          width: 52,
          p: 0.4,
          border: "none",
          borderRadius: 1.5,
          bgcolor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.3,
          transition: "background-color 150ms ease, transform 100ms ease",
          "&:hover": {
            bgcolor: alpha(tone, 0.06),
            "& .action-ring": { borderColor: alpha(tone, 0.6), bgcolor: alpha(tone, 0.18) },
          },
          "&:focus-visible": { outline: `2px solid ${tone}`, outlineOffset: 2 },
          "&:active": { transform: "scale(0.94)" },
        }}
      >
        <Box
          className="action-ring"
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1.5px solid ${alpha(tone, 0.38)}`,
            bgcolor: alpha(tone, 0.1),
            transition: "border-color 150ms ease, background-color 150ms ease",
          }}
        >
          <ActionIcon name={action.icon} sx={{ fontSize: 15, color: tone, opacity: 0.85 }} />
        </Box>
        <Typography
          sx={{
            fontSize: "0.52rem",
            fontWeight: 700,
            lineHeight: 1.1,
            textAlign: "center",
            color: "text.secondary",
            whiteSpace: "nowrap",
          }}
        >
          {action.label}
        </Typography>
      </Box>
    </Tooltip>
  );
}

const GROUP_LABEL: Record<ActionGroup, string> = {
  direct: "On what is in front of you",
  craft: "On the piece you are making",
  people: "On the people around you",
};

const GROUP_SHORT: Record<ActionGroup, string> = {
  direct: "In front of you",
  craft: "Make",
  people: "People",
};

/** Caption row for a group; doubles as the expand control when collapsible. */
function GroupCaption({
  group,
  count,
  accent,
  open,
  onToggle,
}: {
  group: ActionGroup;
  count: number;
  accent: string;
  open?: boolean;
  onToggle?: () => void;
}) {
  const interactive = Boolean(onToggle);
  return (
    <Stack
      {...(interactive
        ? {
            role: "button" as const,
            tabIndex: 0,
            "aria-expanded": open,
            onClick: onToggle,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle?.();
              }
            },
          }
        : {})}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 0.5,
        mb: 0.75,
        width: "fit-content",
        borderRadius: 1,
        cursor: interactive ? "pointer" : "default",
        "&:hover": interactive ? { bgcolor: alpha(accent, 0.08) } : undefined,
        "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 2 },
        px: interactive ? 0.4 : 0,
        mx: interactive ? -0.4 : 0,
      }}
    >
      {interactive && (
        <Box
          component={ChevronIcon}
          size={11}
          sx={{
            color: accent,
            flexShrink: 0,
            transition: "transform 180ms ease",
            transform: open ? "rotate(90deg)" : "none",
          }}
        />
      )}
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.58rem",
          fontWeight: 800,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: "text.disabled",
          whiteSpace: "nowrap",
        }}
      >
        {open === false ? GROUP_SHORT[group] : GROUP_LABEL[group]}
      </Typography>
      <Typography
        variant="caption"
        sx={{ fontSize: "0.58rem", fontWeight: 700, color: "text.disabled", fontVariantNumeric: "tabular-nums" }}
      >
        {count}
      </Typography>
    </Stack>
  );
}

export interface EquippedActionsBarProps {
  /**
   * Scales the bar up into a hero element: larger rings and bigger glyphs.
   * The visible label is always the action title; the hint stays in the tooltip
   * so expansion can grow the targets without swapping the name for a sentence.
   *
   * Used on the Character lens, where acting is the point of the page. Defaults
   * off so the compact bar is unchanged everywhere else.
   */
  prominent?: boolean;
  /**
   * Stack the two groups vertically instead of side by side. Set automatically
   * by the narrow column layouts, where eight buttons in one row would wrap
   * into an unreadable ragged block.
   */
  stacked?: boolean;
  /**
   * Hide the group captions. The divider alone carries the split when the bar
   * is compact and the labels would cost more than they explain.
   */
  hideGroupLabels?: boolean;
  /**
   * Minimise the People group to a dense labeled row, expandable in place and
   * remembered. Craft stays full-size — those six are the ones you reach for
   * while making — and Direct stays the hero row. Collapse never hides the
   * action title.
   */
  collapseSecondary?: boolean;
  /**
   * The bar's single hue — rings, glyphs, captions and controls all take it.
   * Defaults to the invoked channel ink, which is what an action bar is;
   * `ActionBand` overrides it with the engine template's accent when one is
   * active, so the whole bar recolours together rather than per button.
   */
  accent?: string;
}

/**
 * The bar splits into its three groups with a rule between them.
 *
 * Direct · Craft · People. Four and six and four with dividers is a choice you
 * can see. The grouping is meaningful rather than cosmetic — left acts on the
 * thing in front of you, middle on the piece you are making, right on other
 * people — so the divider marks a real boundary and the captions name it.
 */
export function EquippedActionsBar({
  prominent = false,
  stacked = false,
  hideGroupLabels = false,
  collapseSecondary = false,
  accent,
}: EquippedActionsBarProps = {}) {
  const { character } = useCharacter();
  const loadout = useLoadoutOptional();
  const channels = useChannelInks();
  const surface = useSurface();
  const activeTemplate = loadout?.state.activeBindingTemplateId;
  // Derive actions from the active template when it has an override set;
  // otherwise fall back to the character seed (Primary / Learn / Love / unset).
  const templateActions = activeTemplate ? EQUIPPED_ACTIONS_BY_TEMPLATE[activeTemplate] : undefined;
  const actions: EquippedAction[] = withCraftActions(templateActions ?? character.equippedActions);
  // Callers pass a raw template accent; the channel default is already ink.
  const tone = accent ? surface.ink(accent) : channels.invoked.ink;
  const [secondary, setSecondary] = usePersistedChoice(
    "4eye.character.secondaryActions",
    "shut" as "open" | "shut",
    ["open", "shut"] as const,
  );

  if (actions.length === 0) {
    return <Empty label="No actions equipped." />;
  }

  const groups: ActionGroup[] = ["direct", "craft", "people"];
  const byGroup = groups
    .map((g) => ({ group: g, items: actions.filter((a) => (a.group ?? "direct") === g) }))
    .filter((g) => g.items.length > 0);

  // Nothing to divide — render the plain row rather than a group of one.
  if (byGroup.length < 2) {
    return (
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: prominent ? 1.5 : 1 }}>
        {actions.map((a) => (
          <ActionButton
            key={a.id}
            action={a}
            size={a.group === "craft" ? "regular" : prominent ? "prominent" : "regular"}
            tone={tone}
          />
        ))}
      </Stack>
    );
  }

  const gap = prominent ? 1.5 : 1;
  const open = secondary === "open";

  return (
    <Stack
      sx={{
        flexDirection: stacked ? "column" : { zero: "column", laptop: "row" },
        alignItems: "stretch",
        gap: stacked ? 1.5 : { zero: 1.5, laptop: gap },
      }}
    >
      {byGroup.map((g, i) => {
        // Only groups past the first minimise, and only when asked.
        const minimisable = collapseSecondary && g.group === "people";
        const showFull = !minimisable || open;
        const buttonSize =
          g.group === "craft" ? "regular" : prominent ? "prominent" : "regular";

        return (
          <React.Fragment key={g.group}>
            {i > 0 && (
              <Box
                // Vertical rule between the halves when they sit side by side,
                // horizontal when they stack. Same boundary, drawn the way the
                // layout needs it.
                sx={{
                  flexShrink: 0,
                  alignSelf: "stretch",
                  bgcolor: "divider",
                  ...(stacked
                    ? { height: "1px", width: "100%" }
                    : {
                        zero: { height: "1px", width: "100%" },
                        laptop: { width: "1px", height: "auto", mx: 0.5 },
                      }),
                }}
              />
            )}
            <Box sx={{ minWidth: 0 }}>
              {!hideGroupLabels && (
                <GroupCaption
                  group={g.group}
                  count={g.items.length}
                  accent={tone}
                  open={minimisable ? open : undefined}
                  onToggle={minimisable ? () => setSecondary(open ? "shut" : "open") : undefined}
                />
              )}
              {minimisable && (
                <Collapse in={!open} unmountOnExit>
                  <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75, pb: 0.25 }}>
                    {g.items.map((a) => (
                      <MiniAction key={a.id} action={a} tone={tone} />
                    ))}
                  </Stack>
                </Collapse>
              )}
              <Collapse in={showFull} unmountOnExit>
                <Stack sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap }}>
                    {g.items.map((a) => (
                      <ActionButton key={a.id} action={a} size={buttonSize} tone={tone} />
                    ))}
                </Stack>
              </Collapse>
            </Box>
          </React.Fragment>
        );
      })}
    </Stack>
  );
}
