"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Collapse, IconButton, InputBase, Switch, Tooltip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Symbol, useGoals } from "@4eye/features";
import {
  COLOR_MAP,
  MAX_SELECTED_GOALS,
  type Goal,
  type GoalSection,
  type SymbolName,
} from "@4eye/types";
import { CHIP_SHAPE_GEOMETRY, type ChipShape } from "@expanse/brand-core";
import { ContextSelectorPanel } from "./ContextSelectorPanel";
import { ChipShapePicker, useGoalChipShape } from "./ChipShapePicker";
import { GOAL_CENTER_MARK, GOALS_ACCENT } from "./tokens";
import { GOAL_SECTION_META, GOAL_SECTION_ORDER } from "./profileGoals";
import { SoftCenterMark } from "./SoftGoalGlyph";
import { processesHref, PROCESS_HASH } from "@4eye/web/Tiles/profiles/lib/profileDeepLink";
import NextLink from "next/link";

const SOURCES_KEY = "4eye.aiChat.goalSources";

const DEFAULT_SOURCES: Record<GoalSection, boolean> = {
  now: true,
  vision: true,
  ongoing: true,
  others: false,
  relationships: false,
};

function useGoalSources(): [
  Record<GoalSection, boolean>,
  (section: GoalSection, on: boolean) => void,
] {
  const [sources, setSources] = useState(DEFAULT_SOURCES);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SOURCES_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<Record<GoalSection, boolean>>;
      setSources({ ...DEFAULT_SOURCES, ...parsed });
    } catch {
      /* storage unavailable — sources still work, they just won't persist */
    }
  }, []);

  const setSource = useCallback((section: GoalSection, on: boolean) => {
    setSources((prev) => {
      const next = { ...prev, [section]: on };
      try {
        window.localStorage.setItem(SOURCES_KEY, JSON.stringify(next));
      } catch {
        /* ignored */
      }
      return next;
    });
  }, []);

  return [sources, setSource];
}

function CenterMark({ symbol }: { symbol: SymbolName }) {
  if (symbol === "Square" || symbol === "Triangle" || symbol === "Circle") {
    return (
      <g transform="translate(12 12) scale(0.68) translate(-12 -12)">
        <SoftCenterMark symbol={symbol} fill={GOAL_CENTER_MARK} />
      </g>
    );
  }
  return null;
}

function OuterSilhouette({ shape, stroke }: { shape: ChipShape; stroke: string }) {
  const geo = CHIP_SHAPE_GEOMETRY[shape];
  const pad = 1.7;
  const w = 24;
  const h = 24;
  const px = (x: number) => pad + x * (w - 2 * pad);
  const py = (y: number) => pad + y * (h - 2 * pad);
  const ring = {
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeDasharray: "3.1 2.15",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (!geo.points) {
    return <circle cx={12} cy={12} r={(Math.min(w, h) - 2 * pad) / 2} {...ring} />;
  }
  if (geo.radius) {
    return (
      <rect
        x={pad}
        y={pad}
        width={w - 2 * pad}
        height={h - 2 * pad}
        rx={geo.radius * h}
        {...ring}
      />
    );
  }
  return (
    <polygon
      points={geo.points.map(([x, y]) => `${px(x)},${py(y)}`).join(" ")}
      {...ring}
    />
  );
}

function GoalMark({ goal, chipShape }: { goal: Goal; chipShape: ChipShape }) {
  const hex = COLOR_MAP[goal.symbolColor];
  const shift = CHIP_SHAPE_GEOMETRY[chipShape].glyphShift * 24;
  const geometric =
    goal.symbol === "Circle" || goal.symbol === "Square" || goal.symbol === "Triangle";

  return (
    <Box
      sx={{
        width: 22,
        height: 22,
        flexShrink: 0,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden focusable="false">
        <OuterSilhouette shape={chipShape} stroke={hex} />
        {geometric && (
          <g transform={shift ? `translate(0 ${shift})` : undefined}>
            <CenterMark symbol={goal.symbol} />
          </g>
        )}
      </svg>
      {!geometric && (
        <Box
          sx={{
            position: "absolute",
            display: "inline-flex",
            transform: shift ? `translateY(${shift * (22 / 24)}px)` : undefined,
          }}
        >
          <Symbol name={goal.symbol} color="slate" size={14} variant="ghost" />
        </Box>
      )}
    </Box>
  );
}

function CompactGoalRow({
  goal,
  selected,
  disabled,
  expanded,
  chipShape,
  onToggle,
  onExpand,
  onRemove,
}: {
  goal: Goal;
  selected: boolean;
  disabled: boolean;
  expanded: boolean;
  chipShape: ChipShape;
  onToggle: () => void;
  onExpand: () => void;
  onRemove?: () => void;
}) {
  const expandable = Boolean(goal.detail || goal.code);

  return (
    <Box
      sx={{
        borderRadius: 1.5,
        bgcolor: selected ? "rgba(59,130,246,0.15)" : "transparent",
        border: "1px solid",
        borderColor: selected ? "rgba(59,130,246,0.4)" : "transparent",
        opacity: disabled ? 0.4 : 1,
        transition: "background-color 120ms, border-color 120ms",
        "&:hover": {
          bgcolor: disabled
            ? undefined
            : selected
              ? "rgba(59,130,246,0.22)"
              : "rgba(255,255,255,0.04)",
        },
      }}
    >
      <Box
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && onToggle()}
        onKeyDown={(e: React.KeyboardEvent) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            onToggle();
          }
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1,
          py: 0.65,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <GoalMark goal={goal} chipShape={chipShape} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {goal.word}
          </Typography>
          {goal.description && (
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.25,
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {goal.description}
            </Typography>
          )}
        </Box>
        {expandable && (
          <IconButton
            size="small"
            aria-label={expanded ? "Hide details" : "Show details"}
            aria-expanded={expanded}
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            sx={{
              color: "rgba(255,255,255,0.45)",
              p: 0.35,
              transform: expanded ? "rotate(180deg)" : "none",
              transition: "transform 120ms",
            }}
          >
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
        {selected && (
          <CheckRoundedIcon fontSize="small" sx={{ color: "#3b82f6", flex: "0 0 auto" }} />
        )}
        {onRemove && (
          <IconButton
            size="small"
            aria-label={`Remove ${goal.word}`}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            sx={{ color: "rgba(255,255,255,0.45)", p: 0.35 }}
          >
            <CloseRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>
      {expandable && (
        <Collapse in={expanded} unmountOnExit>
          <Box sx={{ px: 1, pb: 1, pl: 5.25 }}>
            {goal.code && (
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 10.5,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.4,
                  mb: goal.detail ? 0.5 : 0,
                }}
              >
                {goal.code}
              </Typography>
            )}
            {goal.detail && (
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.45, display: "block" }}
              >
                {goal.detail}
              </Typography>
            )}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}

interface GoalsSelectorPanelViewProps {
  goals: Goal[];
  promptGoals: Goal[];
  selectedCount: number;
  isSelected: (id: string) => boolean;
  canSelectMore: boolean;
  onToggle: (id: string) => void;
  onAddPromptGoal: (text: string) => boolean;
  onRemovePromptGoal: (id: string) => void;
  onClose: () => void;
  /** Silhouette used for the goal chips in the ContextBar tab. */
  chipShape: ChipShape;
  onChipShapeChange: (shape: ChipShape) => void;
  /** Accent used by the picker's selected state — the Goals tab blue. */
  accent: string;
}

function PromptGoalComposer({
  disabled,
  onAdd,
}: {
  disabled: boolean;
  onAdd: (text: string) => boolean;
}) {
  const [draft, setDraft] = useState("");
  const canSubmit = Boolean(draft.trim()) && !disabled;

  const submit = () => {
    if (!canSubmit) return;
    if (onAdd(draft)) setDraft("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        px: 0.75,
        py: 0.35,
        borderRadius: 1.5,
        border: "1px solid rgba(255,255,255,0.08)",
        bgcolor: "rgba(255,255,255,0.03)",
      }}
    >
      <InputBase
        fullWidth
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Type a goal for this prompt…"
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            submit();
          }
        }}
        sx={{
          color: "rgba(255,255,255,0.92)",
          fontSize: 13,
          px: 0.5,
          "& ::placeholder": { color: "rgba(255,255,255,0.38)", opacity: 1 },
          opacity: disabled ? 0.45 : 1,
        }}
      />
      <IconButton
        size="small"
        aria-label="Add prompt goal"
        disabled={!canSubmit}
        onClick={submit}
        sx={{
          color: canSubmit ? GOALS_ACCENT : "rgba(255,255,255,0.28)",
          p: 0.4,
        }}
      >
        <AddRoundedIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
}

/** Presentational variant for portal use. */
export function GoalsSelectorPanelView({
  goals,
  promptGoals,
  selectedCount,
  isSelected,
  canSelectMore,
  onToggle,
  onAddPromptGoal,
  onRemovePromptGoal,
  onClose,
  chipShape,
  onChipShapeChange,
  accent,
}: GoalsSelectorPanelViewProps) {
  const [sources, setSource] = useGoalSources();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [openSections, setOpenSections] = useState<Record<GoalSection, boolean>>({
    now: true,
    vision: true,
    ongoing: false,
    others: false,
    relationships: false,
  });

  const grouped = useMemo(() => {
    const map: Record<GoalSection | "other", Goal[]> = {
      now: [],
      vision: [],
      ongoing: [],
      others: [],
      relationships: [],
      other: [],
    };
    for (const g of goals) {
      if (g.section && sources[g.section]) map[g.section].push(g);
      else if (!g.section) map.other.push(g);
    }
    return map;
  }, [goals, sources]);

  const handleSource = (section: GoalSection, on: boolean) => {
    if (!on) {
      for (const g of goals) {
        if (g.section === section && isSelected(g.id)) onToggle(g.id);
      }
    }
    setSource(section, on);
    if (on) setOpenSections((prev) => ({ ...prev, [section]: true }));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderRows = (rows: Goal[]) =>
    rows.map((g) => {
      const selected = isSelected(g.id);
      return (
        <CompactGoalRow
          key={g.id}
          goal={g}
          selected={selected}
          disabled={!selected && !canSelectMore}
          expanded={expandedIds.has(g.id)}
          chipShape={chipShape}
          onToggle={() => onToggle(g.id)}
          onExpand={() => toggleExpand(g.id)}
        />
      );
    });

  const visibleCount =
    grouped.now.length + grouped.vision.length + grouped.ongoing.length + grouped.other.length;

  return (
    <ContextSelectorPanel
      title="Vision · Goals"
      subtitle="Type one for this prompt, or pull in Now / Vision / Ongoing — pick up to 3"
      onClose={onClose}
      footer={
        <ChipShapePicker
          value={chipShape}
          onChange={onChipShapeChange}
          accent={accent}
        />
      }
      headerRight={
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.55)",
            fontVariantNumeric: "tabular-nums",
            mr: 0.5,
          }}
        >
          {selectedCount} / {MAX_SELECTED_GOALS}
        </Typography>
      }
    >
      <Box sx={{ mb: 0.75 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            px: 0.75,
            py: 0.35,
          }}
        >
          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            This prompt
          </Typography>
          {promptGoals.length > 0 && (
            <Typography
              sx={{
                fontSize: 9.5,
                color: "rgba(255,255,255,0.32)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {promptGoals.length}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4, pl: 0.25 }}>
          {promptGoals.map((g) => {
            const selected = isSelected(g.id);
            return (
              <CompactGoalRow
                key={g.id}
                goal={g}
                selected={selected}
                disabled={!selected && !canSelectMore}
                expanded={expandedIds.has(g.id)}
                chipShape={chipShape}
                onToggle={() => onToggle(g.id)}
                onExpand={() => toggleExpand(g.id)}
                onRemove={() => onRemovePromptGoal(g.id)}
              />
            );
          })}
          <PromptGoalComposer disabled={!canSelectMore} onAdd={onAddPromptGoal} />
          {!canSelectMore && (
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.38)", px: 1, py: 0.25 }}
            >
              Deselect a goal to add another
            </Typography>
          )}
        </Box>
      </Box>

      {visibleCount === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.5)", px: 1, py: 2 }}
        >
          Pull in a section to attach goals to this session.
        </Typography>
      ) : null}

      {GOAL_SECTION_ORDER.map((section) => {
        const meta = GOAL_SECTION_META[section];
        const included = sources[section];
        const open = included && openSections[section];
        const rows = grouped[section];
        return (
          <Box key={section} sx={{ mb: 0.75 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 0.75,
                py: 0.35,
              }}
            >
              <Box
                role="button"
                tabIndex={included ? 0 : -1}
                onClick={() =>
                  included &&
                  setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
                }
                onKeyDown={(e: React.KeyboardEvent) => {
                  if ((e.key === "Enter" || e.key === " ") && included) {
                    e.preventDefault();
                    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
                  }
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  flex: 1,
                  minWidth: 0,
                  cursor: included ? "pointer" : "default",
                  opacity: included ? 1 : 0.45,
                }}
              >
                <KeyboardArrowDownRoundedIcon
                  sx={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.4)",
                    transform: open ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: "transform 120ms",
                    visibility: included ? "visible" : "hidden",
                  }}
                />
                <Tooltip title={meta.hint} arrow placement="top">
                  <Typography
                    sx={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {meta.label}
                  </Typography>
                </Tooltip>
                {included && (
                  <Typography
                    sx={{
                      fontSize: 9.5,
                      color: "rgba(255,255,255,0.32)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {rows.length}
                  </Typography>
                )}
                {(section === "ongoing" || section === "others") && (
                  <Typography
                    component={NextLink}
                    href={
                      section === "others"
                        ? processesHref(PROCESS_HASH.jannaVision)
                        : processesHref(PROCESS_HASH.selfOngoing)
                    }
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    sx={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: GOALS_ACCENT,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Processes
                  </Typography>
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: included ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.32)",
                }}
              >
                Pull in
              </Typography>
              <Switch
                size="small"
                checked={included}
                onChange={(_, on) => handleSource(section, on)}
                slotProps={{ input: { "aria-label": `Pull in ${meta.label}` } }}
                sx={{
                  ml: -0.5,
                  "& .MuiSwitch-switchBase.Mui-checked": { color: GOALS_ACCENT },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: GOALS_ACCENT,
                  },
                }}
              />
            </Box>
            <Collapse in={open} unmountOnExit>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4, pl: 0.25 }}>
                {renderRows(rows)}
              </Box>
            </Collapse>
          </Box>
        );
      })}

      {grouped.other.length > 0 && (
        <Box sx={{ mt: 0.5 }}>
          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              px: 1,
              py: 0.5,
            }}
          >
            Other
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            {renderRows(grouped.other)}
          </Box>
        </Box>
      )}
    </ContextSelectorPanel>
  );
}

interface GoalsSelectorPanelProps {
  onClose: () => void;
}

/** Connected variant. */
export function GoalsSelectorPanel({ onClose }: GoalsSelectorPanelProps) {
  const {
    goals,
    promptGoals,
    isGoalSelected,
    toggleGoal,
    selectedGoals,
    canSelectMore,
    addPromptGoal,
    removePromptGoal,
  } = useGoals();
  const [chipShape, setChipShape] = useGoalChipShape();
  return (
    <GoalsSelectorPanelView
      goals={goals}
      promptGoals={promptGoals}
      selectedCount={selectedGoals.length}
      isSelected={isGoalSelected}
      canSelectMore={canSelectMore}
      onToggle={toggleGoal}
      onAddPromptGoal={addPromptGoal}
      onRemovePromptGoal={removePromptGoal}
      onClose={onClose}
      chipShape={chipShape}
      onChipShapeChange={setChipShape}
      accent={GOALS_ACCENT}
    />
  );
}
