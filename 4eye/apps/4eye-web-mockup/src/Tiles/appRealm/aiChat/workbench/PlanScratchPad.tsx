"use client";

/**
 * Plan Document — wiki page of everything riding on the next send,
 * plus a formatted notes block. Reuses journal markdown primitives.
 * Does not mount the Journal tile.
 */

import * as React from "react";
import {
  Box,
  Collapse,
  Dialog,
  IconButton,
  InputBase,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import SpeedIcon from "@mui/icons-material/Speed";
import ChecklistIcon from "@mui/icons-material/Checklist";
import {
  accuracyLabel,
  ENTITY_KIND_BY_KEY,
  POWER_LEVEL_OPTIONS,
  PowerLevelIcon,
  Symbol,
  TIME_ASPECT_OPTIONS,
  TimeAspectIcon,
  includedTargets,
  useChatInputContext,
  type ChatInputContextPayload,
} from "@4eye/features";
import {
  COLOR_MAP,
  INCLUDED_CAST_META,
  PROFILE_ASPECT_META,
  TARGET_ROLE_META,
  type PlanAttachment,
  type PowerLevel,
  type SymbolColor,
  type SymbolName,
  type TimeAspect,
} from "@4eye/types";

import { useSurface } from "@4eye/web/components/surface";
import { MarkdownPreview } from "@4eye/web/Tiles/journal/components/MarkdownPreview";
import {
  InputTypeIcon,
  LEARNING_INPUT_TYPE_META,
  stepPosition,
  useLearning,
} from "@4eye/web/Tiles/learning";
import {
  downloadPlanJson,
  downloadPlanMarkdown,
  enabledContextGroups,
  serializePlanJson,
  serializePlanMarkdown,
  type PlanDraft,
} from "./planExport";
import { AudienceLayerStack } from "./AudienceLayerStack";
import { AuraGlyphs } from "@4eye/web/Tiles/character/components/shared/AuraGlyphs";
import { GearChip } from "@4eye/web/Tiles/character/components/shared/GearChip";

export type { PlanDraft } from "./planExport";

export function PlanBanner({
  draft,
  onChange,
  onDetach,
  onSave,
}: {
  draft: PlanDraft;
  onChange: (next: PlanDraft) => void;
  onDetach: () => void;
  onSave?: () => void;
}) {
  const surface = useSurface();
  const [open, setOpen] = React.useState(false);
  const title = draft.title.trim() || "Untitled plan";

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: surface.dividerBorder,
        borderRadius: 1.5,
        px: 1,
        py: 0.5,
        flexShrink: 0,
      }}
    >
      <Stack
        sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, cursor: "pointer" }}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        <DescriptionRoundedIcon sx={{ fontSize: 14, color: surface.text.lo }} />
        <Typography sx={{ fontSize: 11, fontWeight: 800, color: surface.text.hi, flex: 1 }} noWrap>
          Plan · {title}
        </Typography>
        <Tooltip title="Detach plan" arrow>
          <IconButton
            size="small"
            aria-label="Detach plan"
            onClick={(e) => {
              e.stopPropagation();
              onDetach();
            }}
            sx={{ color: surface.text.lo }}
          >
            <CloseRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Collapse in={open}>
        <PlanScratchPad draft={draft} onChange={onChange} onSave={onSave} compact />
      </Collapse>
    </Box>
  );
}

export function PlanScratchPad({
  draft,
  onChange,
  onClose,
  onSave,
  compact = false,
}: {
  draft: PlanDraft;
  onChange: (next: PlanDraft) => void;
  onClose?: () => void;
  onSave?: () => void;
  compact?: boolean;
}) {
  const surface = useSurface();
  const { payload } = useChatInputContext();
  const { session } = useLearning();
  const title = draft.title.trim() || "Untitled plan";
  const step = stepPosition(session);

  const exportCtx = {
    draft,
    payload,
    sessionTitle: session.title,
    stepLabel: `step ${step.index}/${step.total}`,
  };

  return (
    <Stack
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        alignItems: "center",
        py: compact ? 0.75 : 1.5,
        px: compact ? 0 : 0.5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: compact ? "100%" : 720,
          display: "flex",
          flexDirection: "column",
          gap: compact ? 1 : 1.75,
          px: compact ? 0.25 : 3.5,
          py: compact ? 0.5 : 2.5,
          borderRadius: compact ? 1 : 1.5,
          bgcolor: compact ? "transparent" : surface.chromeBg,
          border: compact ? "none" : "1px solid",
          borderColor: surface.dividerBorder,
          boxShadow: compact ? "none" : `0 1px 2px ${alpha("#000", 0.06)}, 0 12px 32px ${alpha("#000", 0.08)}`,
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
          <DescriptionRoundedIcon sx={{ fontSize: compact ? 14 : 18, color: surface.text.lo }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {!compact && (
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: surface.text.faint,
                  lineHeight: 1.2,
                  mb: 0.25,
                }}
              >
                Plan document
              </Typography>
            )}
            <InputBase
              value={draft.title}
              onChange={(e) => onChange({ ...draft, title: e.target.value })}
              placeholder="Untitled plan"
              disabled
              sx={{
                width: "100%",
                fontWeight: 800,
                fontSize: compact ? 13 : 20,
                color: surface.text.faint,
                "&.Mui-disabled": { color: surface.text.faint },
                "& input": {
                  p: 0,
                  WebkitTextFillColor: surface.text.faint,
                  cursor: "default",
                },
              }}
            />
          </Box>
          {onClose && (
            <Tooltip title="Close plan" arrow>
              <IconButton size="small" onClick={onClose} aria-label="Close plan">
                <CloseRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
          {onSave && (
            <Tooltip title={draft.id ? "Update in Projects" : "Save to Projects"} arrow>
              <IconButton size="small" onClick={onSave} aria-label="Save plan to Projects">
                <BookmarkAddRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Download Markdown" arrow>
            <IconButton
              size="small"
              onClick={() => downloadPlanMarkdown(serializePlanMarkdown(exportCtx), title)}
              aria-label="Download Markdown"
            >
              <FileDownloadRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download JSON" arrow>
            <IconButton
              size="small"
              onClick={() => downloadPlanJson(serializePlanJson(exportCtx), title)}
              aria-label="Download JSON"
            >
              <DataObjectRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Stack>

        <CastRow payload={payload} compact={compact} />

        {!compact && <DirectionBlock payload={payload} />}
        {!compact && <WorldBlock payload={payload} />}
        <MethodBlock payload={payload} compact={compact} />
        {!compact && <ContextBlock payload={payload} />}

        <AttachmentsBlock
          attachments={draft.attachments ?? []}
          compact={compact}
          onRemove={(id) =>
            onChange({
              ...draft,
              attachments: (draft.attachments ?? []).filter((a) => a.id !== id),
            })
          }
        />

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: surface.dividerBorder,
            pt: compact ? 0.75 : 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 0.75,
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: surface.text.faint,
            }}
          >
            Notes
          </Typography>
          {draft.body.trim() ? (
            <Box sx={{ px: 0.25, opacity: 0.45, pointerEvents: "none" }}>
              <MarkdownPreview source={draft.body} />
            </Box>
          ) : (
            <Typography sx={{ fontSize: 12, color: surface.text.faint, fontStyle: "italic", px: 0.25 }}>
              Plan notes are not ready yet.
            </Typography>
          )}
        </Box>
      </Box>
    </Stack>
  );
}

function CastRow({ payload, compact }: { payload: ChatInputContextPayload; compact: boolean }) {
  const actors = payload.targeting.actors;
  const targets = payload.targeting.targets;
  const audiences = payload.resolvedContext.audiences;
  const included = includedTargets(payload.resolvedContext.targets, targets);
  const actorMeta = TARGET_ROLE_META.actor;
  const targetMeta = TARGET_ROLE_META.target;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: compact ? 0.75 : 1,
        minHeight: compact ? 0 : 168,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <CastColumn
          label={actorMeta.pluralLabel}
          emptyLabel={actorMeta.emptyLabel}
          accent={actorMeta.color}
          radius="20px 6px 6px 20px"
          items={actors.map((t) => ({ id: t.id, name: t.name, symbol: t.symbol, symbolColor: t.symbolColor }))}
        />
      </Box>
      <CastArrow />
      <AudienceLayerStack
        compact={compact}
        items={audiences.map((a) => ({
          id: a.id,
          name: a.name,
          symbol: a.symbol,
          symbolColor: a.symbolColor,
        }))}
      />
      <CastArrow />
      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0.6 }}>
        <CastColumn
          label={targetMeta.actionLabel}
          emptyLabel={targetMeta.emptyLabel}
          accent={targetMeta.color}
          radius="6px 20px 20px 6px"
          items={targets.map((t) => ({ id: t.id, name: t.name, symbol: t.symbol, symbolColor: t.symbolColor }))}
        />
        {included.length > 0 && (
          <CastColumn
            label={INCLUDED_CAST_META.label}
            emptyLabel={INCLUDED_CAST_META.emptyLabel}
            accent={INCLUDED_CAST_META.color}
            radius="8px"
            items={included.map((t) => ({ id: t.id, name: t.name, symbol: t.symbol, symbolColor: t.symbolColor }))}
          />
        )}
      </Box>
    </Box>
  );
}

function CastArrow() {
  const surface = useSurface();
  return (
    <Box
      aria-hidden
      sx={{
        alignSelf: "center",
        color: surface.text.faint,
        fontSize: 16,
        lineHeight: 1,
        flexShrink: 0,
        px: 0.15,
      }}
    >
      →
    </Box>
  );
}

function CastColumn({
  label,
  emptyLabel,
  accent,
  radius,
  items,
}: {
  label: string;
  emptyLabel: string;
  accent: string;
  radius: string;
  items: Array<{ id: string; name: string; symbol: SymbolName; symbolColor: SymbolColor }>;
}) {
  const surface = useSurface();
  return (
    <Box
      sx={{
        p: 1.25,
        height: "100%",
        boxSizing: "border-box",
        borderRadius: radius,
        border: "1px solid",
        borderColor: alpha(accent, 0.35),
        bgcolor: alpha(accent, 0.08),
        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: surface.ink(accent),
          mb: 0.6,
        }}
      >
        {label}
      </Typography>
      {items.length === 0 ? (
        <Typography sx={{ fontSize: 12, color: surface.text.faint, fontStyle: "italic" }}>{emptyLabel}</Typography>
      ) : (
        <Stack sx={{ gap: 0.45 }}>
          {items.map((item) => (
            <EntityChip key={item.id} {...item} accent={accent} radius={radius} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

function EntityChip({
  name,
  symbol,
  symbolColor,
  accent,
  radius = "8px",
}: {
  name: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  accent: string;
  radius?: string;
}) {
  const surface = useSurface();
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.15,
        py: 0.55,
        maxWidth: "100%",
        borderRadius: radius,
        border: "1px solid",
        borderColor: alpha(accent, 0.4),
        bgcolor: alpha(accent, 0.1),
      }}
    >
      <Symbol name={symbol} color={symbolColor} size={16} variant="ghost" />
      <Typography
        noWrap
        sx={{ fontSize: 12, fontWeight: 650, color: surface.text.hi, lineHeight: 1.2 }}
      >
        {name}
      </Typography>
    </Box>
  );
}

function DirectionBlock({ payload }: { payload: ChatInputContextPayload }) {
  return (
    <DocSection title="Direction">
      <Stack sx={{ gap: 0.75 }}>
        <MetaLine label="Domain" value={payload.domain.label} accent={payload.domain.color} />
        <ChipRow
          label="Goals"
          accent="#a855f7"
          items={payload.goals.map((g) => ({
            id: g.id,
            name: g.word,
            symbol: g.symbol,
            symbolColor: g.symbolColor,
          }))}
        />
        <ChipRow
          label="Projects"
          accent="#6366f1"
          items={payload.projects.map((p) => ({
            id: p.id,
            name: p.name,
            symbol: p.symbol,
            symbolColor: p.symbolColor,
          }))}
        />
      </Stack>
    </DocSection>
  );
}

function WorldBlock({ payload }: { payload: ChatInputContextPayload }) {
  const groups: Array<{
    key: keyof ChatInputContextPayload["resolvedContext"];
    label: string;
    accent: string;
  }> = [
    { key: "locations", label: "Locations", accent: ENTITY_KIND_BY_KEY.locations.color },
    { key: "stories", label: "Stories", accent: ENTITY_KIND_BY_KEY.stories.color },
    { key: "scenes", label: "Scenes", accent: ENTITY_KIND_BY_KEY.scenes.color },
    { key: "sequences", label: "Sequences", accent: ENTITY_KIND_BY_KEY.sequences.color },
    { key: "animations", label: "Animations", accent: ENTITY_KIND_BY_KEY.animations.color },
  ];
  const filled = groups.filter((g) => payload.resolvedContext[g.key].length > 0);
  if (filled.length === 0) return null;

  return (
    <DocSection title="World">
      <Stack sx={{ gap: 0.75 }}>
        {filled.map((g) => (
          <ChipRow
            key={g.key}
            label={g.label}
            accent={g.accent}
            items={payload.resolvedContext[g.key].map((e) => ({
              id: e.id,
              name: e.name,
              symbol: e.symbol,
              symbolColor: e.symbolColor,
            }))}
          />
        ))}
      </Stack>
    </DocSection>
  );
}

function AttachmentsBlock({
  attachments,
  compact,
  onRemove,
}: {
  attachments: PlanAttachment[];
  compact: boolean;
  onRemove: (id: string) => void;
}) {
  const surface = useSurface();
  const [preview, setPreview] = React.useState<PlanAttachment | null>(null);
  if (attachments.length === 0) return null;

  if (compact) {
    return (
      <Typography sx={{ fontSize: 11, color: "text.secondary", lineHeight: 1.45 }}>
        {attachments.length} {attachments.length === 1 ? "attachment" : "attachments"}
        {`: ${attachments.map((a) => a.label).join(" · ")}`}
      </Typography>
    );
  }

  return (
    <DocSection title="Attachments">
      <Stack sx={{ gap: 0.6 }}>
        {attachments.map((a) => {
          const meta = LEARNING_INPUT_TYPE_META[a.kind];
          const accent = COLOR_MAP[meta.accent];
          const canPreview = a.kind === "image" && Boolean(a.dataUrl);
          return (
            <Box
              key={a.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1,
                py: 0.6,
                borderRadius: 1.25,
                border: "1px solid",
                borderColor: alpha(accent, 0.35),
                bgcolor: alpha(accent, 0.08),
                minWidth: 0,
              }}
            >
              {canPreview ? (
                <Box
                  component="button"
                  type="button"
                  aria-label={`View ${a.label}`}
                  onClick={() => setPreview(a)}
                  sx={{
                    p: 0,
                    m: 0,
                    border: "none",
                    bgcolor: "transparent",
                    cursor: "zoom-in",
                    flexShrink: 0,
                    borderRadius: 0.75,
                    lineHeight: 0,
                    "&:focus-visible": {
                      outline: `2px solid ${accent}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={a.dataUrl}
                    alt={a.label}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 0.75,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              ) : (
                <InputTypeIcon name={meta.icon} sx={{ fontSize: 16, color: accent, flexShrink: 0 }} />
              )}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography noWrap sx={{ fontSize: 12, fontWeight: 650, color: surface.text.hi, lineHeight: 1.2 }}>
                  {a.kind === "link" ? (
                    <Box
                      component="a"
                      href={a.value}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 2 }}
                    >
                      {a.label}
                    </Box>
                  ) : canPreview ? (
                    <Box
                      component="button"
                      type="button"
                      onClick={() => setPreview(a)}
                      sx={{
                        p: 0,
                        m: 0,
                        border: "none",
                        bgcolor: "transparent",
                        color: "inherit",
                        font: "inherit",
                        fontWeight: "inherit",
                        cursor: "pointer",
                        textAlign: "left",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        "&:hover": { textDecoration: "underline", textUnderlineOffset: 2 },
                      }}
                    >
                      {a.label}
                    </Box>
                  ) : (
                    a.label
                  )}
                </Typography>
                {a.value && a.value !== a.label && (
                  <Typography noWrap sx={{ fontSize: 10, color: surface.text.lo, lineHeight: 1.3 }}>
                    {a.value}
                  </Typography>
                )}
              </Box>
              <IconButton
                size="small"
                aria-label={`Remove ${a.label}`}
                onClick={() => onRemove(a.id)}
                sx={{ color: surface.text.lo, p: 0.25 }}
              >
                <CloseRoundedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          );
        })}
      </Stack>

      <Dialog
        open={Boolean(preview?.dataUrl)}
        onClose={() => setPreview(null)}
        maxWidth="desktop"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: alpha("#0b1220", 0.96),
              backgroundImage: "none",
              borderRadius: 2,
              overflow: "hidden",
            },
          },
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 1,
            borderBottom: "1px solid",
            borderColor: alpha("#fff", 0.08),
          }}
        >
          <Typography
            sx={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 700, color: alpha("#fff", 0.92) }}
            noWrap
          >
            {preview?.label ?? "Screenshot"}
          </Typography>
          <IconButton
            size="small"
            aria-label="Close preview"
            onClick={() => setPreview(null)}
            sx={{ color: alpha("#fff", 0.7) }}
          >
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
        {preview?.dataUrl && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 1, sm: 2 },
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <Box
              component="img"
              src={preview.dataUrl}
              alt={preview.label}
              sx={{
                maxWidth: "100%",
                maxHeight: "76vh",
                objectFit: "contain",
                borderRadius: 1,
              }}
            />
          </Box>
        )}
      </Dialog>
    </DocSection>
  );
}

function powerLabel(level: PowerLevel): string {
  if (level === "auto") return "Auto";
  return POWER_LEVEL_OPTIONS.find((o) => o.value === level)?.label ?? level;
}

function timeLabel(aspect: TimeAspect): string {
  if (aspect === "auto") return "Auto";
  return TIME_ASPECT_OPTIONS.find((o) => o.value === aspect)?.label ?? aspect;
}

function MethodBlock({
  payload,
  compact,
}: {
  payload: ChatInputContextPayload;
  compact: boolean;
}) {
  const settings = payload.aiSettings;
  const actions = payload.contextActions.map((a) => a.label);
  const profileLine =
    payload.profile.enabled && payload.profile.includedAspects.length > 0
      ? payload.profile.includedAspects
          .map((id) => PROFILE_ASPECT_META[id]?.label ?? id)
          .join(" · ")
      : null;
  const showAuras = payload.profile.enabled && payload.profile.includedAspects.includes("auras");
  const showGear = payload.profile.enabled && payload.profile.includedAspects.includes("equipment");

  if (compact) {
    return (
      <Typography sx={{ fontSize: 11, color: "text.secondary", lineHeight: 1.45 }}>
        {payload.domain.label}
        {payload.goals.length ? ` · ${payload.goals.length} goals` : ""}
        {sessionTitle ? ` · ${sessionTitle}` : ""}
      </Typography>
    );
  }

  return (
    <DocSection title="Method">
      <Stack sx={{ gap: 0.75 }}>
        <ChipRow
          label="Pipelines"
          accent={ENTITY_KIND_BY_KEY.pipelines.color}
          items={payload.resolvedContext.pipelines.map((p) => ({
            id: p.id,
            name: p.name,
            symbol: p.symbol,
            symbolColor: p.symbolColor,
          }))}
        />
        <MetaLine label="Actions" value={actions.length ? actions.join(" · ") : null} />
        <MetaLine label="Profile" value={profileLine} />
        {(showAuras || showGear) && (
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.25, pl: 0.25 }}>
            {showAuras && <AuraGlyphs size={18} />}
            {showGear && <GearChip size={24} />}
          </Stack>
        )}
        <AiSettingsMeta settings={settings} />
      </Stack>
    </DocSection>
  );
}

const CONTEXT_GROUP_ACCENT: Record<string, string> = {
  senses: "#38bdf8",
  presence: "#a78bfa",
  session: "#34d399",
  people: "#f472b6",
};

function ContextBlock({ payload }: { payload: ChatInputContextPayload }) {
  const surface = useSurface();
  const groups = enabledContextGroups(payload);

  return (
    <DocSection title="Context">
      {groups.length === 0 ? (
        <Typography sx={{ fontSize: 12, color: surface.text.faint, fontStyle: "italic" }}>
          No context sources selected.
        </Typography>
      ) : (
        <Stack sx={{ gap: 0.75 }}>
          {groups.map((group) => {
            const accent = CONTEXT_GROUP_ACCENT[group.id] ?? surface.text.lo;
            return (
              <Stack
                key={group.id}
                sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1 }}
              >
                <Typography
                  sx={{
                    width: 72,
                    flexShrink: 0,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: surface.text.lo,
                    pt: 0.35,
                  }}
                >
                  {group.label}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, minWidth: 0, flex: 1 }}>
                  {group.sources.map((source) => (
                    <Box
                      key={source.id}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        px: 0.85,
                        py: 0.4,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: alpha(accent, 0.4),
                        bgcolor: alpha(accent, 0.1),
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 650,
                          color: surface.ink(accent),
                          lineHeight: 1.2,
                        }}
                      >
                        {source.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Stack>
            );
          })}
        </Stack>
      )}
    </DocSection>
  );
}

function AiSettingsMeta({
  settings,
}: {
  settings: ChatInputContextPayload["aiSettings"];
}) {
  const surface = useSurface();
  const power = settings.powerLevel;
  const time = settings.timeAspect;

  return (
    <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1 }}>
      <Typography
        sx={{
          width: 72,
          flexShrink: 0,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: surface.text.lo,
          pt: 0.35,
        }}
      >
        AI
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, minWidth: 0, flex: 1 }}>
        <AiMetaChip
          icon={<SpeedIcon sx={{ fontSize: 14 }} />}
          label={accuracyLabel(settings.accuracy)}
          title="Accuracy"
        />
        <AiMetaChip
          icon={
            time === "auto" ? (
              <TimeAspectIcon aspect="max" size={14} />
            ) : (
              <TimeAspectIcon aspect={time} size={14} />
            )
          }
          label={`time ${timeLabel(time)}`}
          title="Time"
        />
        {settings.rewritePast && <AiMetaChip label="rewrite past" title="Rewrite past" />}
        <AiMetaChip
          icon={
            power === "auto" ? (
              <PowerLevelIcon level="aion" size={14} />
            ) : (
              <PowerLevelIcon level={power} size={14} />
            )
          }
          label={powerLabel(power)}
          title="Power + Model"
          emphasize
        />
        <AiMetaChip
          icon={<ChecklistIcon sx={{ fontSize: 14 }} />}
          label={`plan ${settings.planMode}`}
          title="Plan mode"
        />
      </Box>
    </Stack>
  );
}

function AiMetaChip({
  icon,
  label,
  title,
  emphasize = false,
}: {
  icon?: React.ReactNode;
  label: string;
  title: string;
  emphasize?: boolean;
}) {
  const surface = useSurface();
  const accent = emphasize ? "#f59e0b" : surface.text.lo;
  return (
    <Tooltip title={title} arrow>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.45,
          px: 0.85,
          py: 0.4,
          borderRadius: 1,
          border: "1px solid",
          borderColor: alpha(emphasize ? accent : surface.text.faint, emphasize ? 0.45 : 0.35),
          bgcolor: alpha(emphasize ? accent : surface.text.faint, emphasize ? 0.1 : 0.06),
          color: emphasize ? surface.ink(accent) : surface.text.hi,
        }}
      >
        {icon && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              color: "inherit",
              opacity: 0.9,
              lineHeight: 0,
            }}
          >
            {icon}
          </Box>
        )}
        <Typography sx={{ fontSize: 12, fontWeight: 650, lineHeight: 1.2 }}>{label}</Typography>
      </Box>
    </Tooltip>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  const surface = useSurface();
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: surface.text.faint,
          mb: 0.75,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function ChipRow({
  label,
  accent,
  items,
}: {
  label: string;
  accent: string;
  items: Array<{ id: string; name: string; symbol: SymbolName; symbolColor: SymbolColor }>;
}) {
  const surface = useSurface();
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1 }}>
      <Typography
        sx={{
          width: 72,
          flexShrink: 0,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: surface.text.lo,
          pt: 0.35,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, minWidth: 0, flex: 1 }}>
        {items.length === 0 ? (
          <Typography sx={{ fontSize: 12, color: surface.text.faint, fontStyle: "italic" }}>—</Typography>
        ) : (
          items.map((item) => <EntityChip key={item.id} {...item} accent={accent} />)
        )}
      </Box>
    </Stack>
  );
}

function MetaLine({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | null;
  accent?: string;
}) {
  const surface = useSurface();
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "baseline", gap: 1 }}>
      <Typography
        sx={{
          width: 72,
          flexShrink: 0,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: surface.text.lo,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: value ? 600 : 400,
          color: value ? (accent ? surface.ink(accent) : surface.text.hi) : surface.text.faint,
          fontStyle: value ? "normal" : "italic",
          lineHeight: 1.45,
        }}
      >
        {value ?? "—"}
      </Typography>
    </Stack>
  );
}
