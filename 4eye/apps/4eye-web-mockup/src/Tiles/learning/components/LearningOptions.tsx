"use client";

/**
 * LearningOptions — grouped, single-choice experience toggles.
 *
 * Pace is a throughput rating (Super Sonic = 200 APM), not a click counter. Depth
 * defaults to Auto. Support defaults to a combination of approaches. Output
 * is a custom note with a short list of saved formats you can reuse.
 */

import * as React from "react";
import { Box, Button, Chip, Stack, TextField, Typography, alpha } from "@mui/material";

import {
  LEARNING_OPTION_GROUPS,
  LEARNING_OPTION_GROUP_LABEL,
  OPT_OUTPUT_CUSTOM,
  type LearningOption,
  type LearningOptionGroup,
  type OutputNote,
} from "../model/types";
import {
  APM_CHANNELS,
  APM_CHANNEL_LABEL,
  PACE_BANDS,
  PACE_BAND_META,
  apmRangeLabel,
  formatApm,
  formatLiteralApm,
  type ApmSnapshot,
  type PaceBand,
} from "../model/apm";
import { useLearning } from "../store/LearningProvider";

function OptionChip({ option }: { option: LearningOption }) {
  const { dispatch } = useLearning();
  const band = option.apmBand;
  const color = band ? PACE_BAND_META[band].color : undefined;
  return (
    <Chip
      label={option.label}
      onClick={() => dispatch({ type: "select-option", id: option.id })}
      variant={option.selected ? "filled" : "outlined"}
      color={option.selected && !color ? "primary" : "default"}
      sx={{
        fontWeight: 700,
        ...(option.selected && color
          ? {
              bgcolor: alpha(color, 0.18),
              color,
              border: "1px solid",
              borderColor: alpha(color, 0.45),
            }
          : option.selected
            ? {}
            : { bgcolor: (t) => alpha(t.palette.text.primary, 0.02) }),
      }}
    />
  );
}

function ApmScale({
  throughput,
  target,
}: {
  throughput?: ApmSnapshot;
  target?: PaceBand;
}) {
  const live = throughput ?? null;
  const marker = live ? live.relative : target ? PACE_BAND_META[target].minRelative + 1 : 0;

  return (
    <Box sx={{ mt: 1 }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          height: 8,
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        {PACE_BANDS.map((band) => {
          const meta = PACE_BAND_META[band];
          const width = meta.maxRelative - meta.minRelative;
          const isTarget = band === target;
          return (
            <Box
              key={band}
              sx={{
                width: `${width}%`,
                bgcolor: alpha(meta.color, isTarget ? 0.55 : 0.22),
              }}
            />
          );
        })}
      </Box>
      <Box sx={{ position: "relative", height: 10, mt: 0.15 }}>
        <Box
          sx={{
            position: "absolute",
            left: `${marker}%`,
            top: 0,
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: "7px solid",
            borderBottomColor: live ? PACE_BAND_META[live.band].color : "#94a3b8",
            transform: "translateX(-50%)",
          }}
        />
      </Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", mt: 0.15, px: 0.1 }}
      >
        {PACE_BANDS.map((band) => (
          <Typography
            key={band}
            sx={{
              fontSize: 9,
              fontWeight: band === target ? 800 : 600,
              color: band === target ? PACE_BAND_META[band].color : "text.disabled",
              letterSpacing: 0.2,
            }}
          >
            {PACE_BAND_META[band].shortLabel}
          </Typography>
        ))}
      </Stack>
      {live && (
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mt: 0.6, display: "block" }}
        >
          {formatApm(live.apm)} · {formatLiteralApm(live.literalApm)} ·{" "}
          {APM_CHANNELS.map(
            (ch) => `${live.counts[ch]} ${APM_CHANNEL_LABEL[ch].toLowerCase()}`,
          ).join(" · ")}
        </Typography>
      )}
    </Box>
  );
}

function OutputNoteEditor({
  selected,
  text,
  saved,
}: {
  selected?: LearningOption;
  text: string;
  saved: OutputNote[];
}) {
  const { dispatch } = useLearning();
  const custom = selected?.id === OPT_OUTPUT_CUSTOM;
  const alreadySaved = saved.some((n) => n.text === text.trim());
  const canSave = Boolean(text.trim()) && !alreadySaved;

  return (
    <Box sx={{ mt: 1 }}>
      <TextField
        value={text}
        onChange={(e) => dispatch({ type: "set-output-note", text: e.target.value })}
        placeholder={
          custom
            ? "What should the reply look like? A list, a recap, a check…"
            : "Optional note on this format"
        }
        multiline
        minRows={2}
        maxRows={4}
        fullWidth
        size="small"
      />
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", mt: 0.75, gap: 0.75 }}
      >
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700 }}>
          Saved
        </Typography>
        <Button
          size="small"
          disabled={!canSave}
          onClick={() => dispatch({ type: "save-output-note" })}
          sx={{ textTransform: "none", fontWeight: 700, minWidth: 0, px: 1, py: 0.25 }}
        >
          Save note
        </Button>
      </Stack>
      {saved.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
          {saved.map((note) => (
            <Chip
              key={note.id}
              label={note.label}
              size="small"
              variant={text.trim() === note.text ? "filled" : "outlined"}
              onClick={() => dispatch({ type: "apply-output-note", id: note.id })}
              onDelete={() => dispatch({ type: "remove-output-note", id: note.id })}
              sx={{ fontWeight: 700 }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export function LearningOptions() {
  const { session } = useLearning();

  return (
    <Stack spacing={1.5}>
      {LEARNING_OPTION_GROUPS.map((group: LearningOptionGroup) => {
        const opts = session.options.filter((o) => o.group === group);
        if (opts.length === 0) return null;
        const selected = opts.find((o) => o.selected);
        return (
          <Box key={group}>
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", fontWeight: 800, letterSpacing: 0.4 }}
            >
              {LEARNING_OPTION_GROUP_LABEL[group]}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 0.25 }}>
              {opts.map((o) => (
                <OptionChip key={o.id} option={o} />
              ))}
            </Box>
            {selected?.description && (
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
                {selected.description}
                {group === "pace" && selected.apmBand && !selected.description.includes("APM")
                  ? ` ${apmRangeLabel(selected.apmBand)}.`
                  : ""}
              </Typography>
            )}
            {group === "pace" && (
              <ApmScale
                throughput={session.throughput}
                target={selected?.apmBand}
              />
            )}
            {group === "output" && (
              <OutputNoteEditor
                selected={selected}
                text={session.outputNote ?? ""}
                saved={session.savedOutputNotes ?? []}
              />
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
