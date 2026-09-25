"use client";

/**
 * SwipeRose — the 8-direction swipe-cast configuration, laid out as a
 * compass rose. Each direction holds one optional action; clicking a cell
 * opens the action picker.
 *
 * Above the rose: binding templates split into two families.
 *   Life           — Primary · Learn · Love
 *   Content Engine — Create · Engage · Influence · Content
 * Selecting a template loads its swipe map and switches the paired loadout page.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

import {
  ActionGlyph,
  ActionPickerDialog,
  BINDING_TEMPLATES,
  TEMPLATE_FAMILIES,
  EmptySlot,
  SWIPE_DIRECTION_META,
  useLoadout,
  isEngineTemplate,
  type BindingTemplateId,
  type SwipeDirection,
  CONTENT_TOPICS,
  contentTopicRef,
} from "@4eye/web/components/loadout";

/** Compass-rose grid order; null is the center cell. */
const GRID: (SwipeDirection | null)[] = [
  "up-left",
  "up",
  "up-right",
  "left",
  null,
  "right",
  "down-left",
  "down",
  "down-right",
];

function DirectionCell({
  direction,
  onOpen,
}: {
  direction: SwipeDirection;
  onOpen: () => void;
}) {
  const { state, resolve } = useLoadout();
  const meta = SWIPE_DIRECTION_META[direction];
  const ref = state.swipe[direction];
  const resolved = ref ? resolve(ref) : null;
  const engine = isEngineTemplate(state.activeBindingTemplateId);

  return (
    <Stack sx={{ alignItems: "center", gap: 0.25 }}>
      <ArrowUpwardRoundedIcon
        sx={{
          fontSize: 13,
          color: resolved ? resolved.color : "text.disabled",
          transform: `rotate(${meta.angle}deg)`,
        }}
      />
      {resolved ? (
        <ActionGlyph
          compact
          action={resolved}
          onClick={onOpen}
          wash={engine}
        />
      ) : (
        <EmptySlot compact label={`Assign Swipe ${meta.label}`} onClick={onOpen} />
      )}
    </Stack>
  );
}

function TemplatePicker() {
  const { state, dispatch, resolve } = useLoadout();
  const active = state.activeBindingTemplateId ?? "primary";

  return (
    <Stack sx={{ gap: 0.55, mb: 1.25 }}>
      <Typography
        sx={{
          fontSize: "0.58rem",
          fontWeight: 800,
          letterSpacing: "0.12em",
          color: "text.disabled",
        }}
      >
        TEMPLATE
      </Typography>
      {TEMPLATE_FAMILIES.map((family) => {
        const familyTemplates = BINDING_TEMPLATES.filter((t) => (family.ids as readonly string[]).includes(t.id));
        return (
          <Stack key={family.id} sx={{ gap: 0.35 }}>
            <Typography
              sx={{
                fontSize: "0.52rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: family.ink ?? "text.disabled",
                opacity: family.ink ? 0.9 : 0.7,
              }}
            >
              {family.label}
            </Typography>
            <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
              {familyTemplates.map((t) => {
                const selected = active === t.id;
                return (
                  <Tooltip key={t.id} title={t.blurb} arrow>
                    <Box
                      component="button"
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        dispatch({ type: "apply-binding-template", templateId: t.id as BindingTemplateId })
                      }
                      sx={{
                        border: "1px solid",
                        borderColor: selected ? alpha(t.accent, 0.4) : "divider",
                        bgcolor: selected ? alpha(t.accent, 0.1) : "transparent",
                        color: selected ? t.accent : "text.secondary",
                        borderRadius: 999,
                        px: 1,
                        py: 0.35,
                        cursor: "pointer",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        letterSpacing: 0.2,
                        lineHeight: 1.2,
                        "&:hover": {
                          borderColor: alpha(t.accent, 0.45),
                          bgcolor: alpha(t.accent, 0.08),
                          color: t.accent,
                        },
                        "&:focus-visible": { outline: `2px solid ${t.accent}`, outlineOffset: 2 },
                      }}
                    >
                      {t.label}
                    </Box>
                  </Tooltip>
                );
              })}
            </Stack>
          </Stack>
        );
      })}
      <Typography sx={{ fontSize: "0.62rem", color: "text.disabled", lineHeight: 1.35 }}>
        {BINDING_TEMPLATES.find((t) => t.id === active)?.blurb}
      </Typography>
      {active === "content" && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 56px)",
            gap: 0.5,
            mt: 0.35,
            justifyContent: "start",
          }}
        >
          {CONTENT_TOPICS.map((topic) => {
            const resolved = resolve(contentTopicRef(topic.id));
            return resolved ? (
              <Stack key={topic.id} sx={{ alignItems: "center", gap: 0.15 }}>
                <ActionGlyph compact action={resolved} wash />
                <Typography
                  sx={{
                    fontSize: "0.52rem",
                    fontWeight: 800,
                    letterSpacing: 0.15,
                    color: resolved.color,
                    lineHeight: 1.1,
                  }}
                >
                  {topic.label}
                </Typography>
              </Stack>
            ) : null;
          })}
        </Box>
      )}
    </Stack>
  );
}

export function SwipeRose() {
  const { state, dispatch } = useLoadout();
  const [open, setOpen] = React.useState<SwipeDirection | null>(null);
  const current = open ? state.swipe[open] : null;

  return (
    <Box>
      <TemplatePicker />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 64px)",
          gap: 0.75,
          justifyContent: "start",
        }}
      >
        {GRID.map((direction, i) =>
          direction ? (
            <DirectionCell key={direction} direction={direction} onOpen={() => setOpen(direction)} />
          ) : (
            <Stack key={`center-${i}`} sx={{ alignItems: "center", justifyContent: "center" }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 800, color: "text.disabled", letterSpacing: 0.6 }}
              >
                SWIPE
              </Typography>
            </Stack>
          ),
        )}
      </Box>

      <ActionPickerDialog
        open={open != null}
        title={open ? `Swipe ${SWIPE_DIRECTION_META[open].label}` : ""}
        current={current}
        onClose={() => setOpen(null)}
        onSelect={(ref) => {
          if (open) dispatch({ type: "assign-swipe", direction: open, ref });
        }}
        onClear={() => {
          if (open) dispatch({ type: "assign-swipe", direction: open, ref: null });
        }}
      />
    </Box>
  );
}
