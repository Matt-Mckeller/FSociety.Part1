"use client";

import { useEffect, useState } from "react";
import {
  Box,
  ButtonBase,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HistoryIcon from "@mui/icons-material/History";
import BoltIcon from "@mui/icons-material/Bolt";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TimerIcon from "@mui/icons-material/Timer";
import BugReportIcon from "@mui/icons-material/BugReport";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedIcon from "@mui/icons-material/Speed";
import CasinoIcon from "@mui/icons-material/Casino";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { AnimatePresence, motion } from "framer-motion";
import type {
  AskQuestionsMode,
  AutonomousMode,
  DurationMode,
  PlanMode,
  PowerLevel,
  ReviewMode,
  TestingMode,
  TimeAspect,
  TimeMode,
} from "@4eye/types";
import {
  CHAT_CONTEXT_SOURCE_GROUPS,
  CHAT_CONTEXT_SOURCE_GROUP_LABEL,
  CHAT_CONTEXT_SOURCE_META,
  CHAT_CONTEXT_SOURCE_IDS,
} from "@4eye/types";
import { useOptionalProfileContext } from "../profile";
import { useAISettings } from "./AISettingsContext";
import {
  ACCURACY_OPTIONS,
  ASK_OPTIONS,
  AUTONOMOUS_OPTIONS,
  DURATION_OPTIONS,
  INCLUDE_CORE_COMMAND,
  INCLUDE_CORE_DESCRIPTION,
  PLAN_OPTIONS,
  POWER_LEVEL_OPTIONS,
  REVIEW_OPTIONS,
  TESTING_OPTIONS,
  TIME_ASPECT_OPTIONS,
  TIME_OPTIONS,
} from "./aiSettingsConfig";
import { PowerLevelIcon } from "./AionModeIcons";
import { TimeAspectIcon } from "./TimeAspectIcons";

/** Acting-as role ids may be bare (`neo`) or prefixed (`equipped:Neo`). */
function canRewritePastAs(roles: string[] | undefined): boolean {
  if (!roles?.length) return false;
  return roles.some((id) => {
    const bare = id.includes(":") ? (id.split(":").pop() ?? id) : id;
    const key = bare.toLowerCase();
    return key === "neo" || key === "won";
  });
}

const REWRITE_PAST_TOOLTIP_ALLOWED =
  "When past is in scope — rewrite history, or only read it. Restricted to Neo or Won.";
const REWRITE_PAST_TOOLTIP_LOCKED =
  "Rewrite past is restricted to Neo or Won. Act as Neo or Won to change history when past is in scope.";

// ─── Reusable chip-menu ───────────────────────────────────────────────────────

interface ChipMenuProps<T extends string> {
  label: string;
  icon: React.ReactNode;
  value: T;
  options: { value: T; label: string; description?: string }[];
  onChange: (v: T) => void;
  activeColor?: string;
}

function ChipMenu<T extends string>({
  label,
  icon,
  value,
  options,
  onChange,
  activeColor = "#8b5cf6",
}: ChipMenuProps<T>) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const current = options.find((o) => o.value === value);
  return (
    <>
      <Tooltip title={label} arrow>
        <Chip
          icon={icon as React.ReactElement}
          label={current?.label ?? value}
          size="small"
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{
            cursor: "pointer",
            color: "rgba(255,255,255,0.88)",
            bgcolor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            "& .MuiChip-icon": { color: activeColor },
          }}
        />
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "rgba(24,24,32,0.98)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
            },
          },
        }}
      >
        {options.map((o) => (
          <MenuItem
            key={o.value}
            selected={o.value === value}
            onClick={() => {
              onChange(o.value);
              setAnchor(null);
            }}
            sx={{ flexDirection: "column", alignItems: "flex-start", py: 0.75 }}
          >
            <Typography variant="body2" sx={{ fontWeight: o.value === value ? 600 : 400, color: "white" }}>
              {o.label}
            </Typography>
            {o.description && (
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                {o.description}
              </Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

// ─── Aspect picker (Time / Power) ─────────────────────────────────────────────

function AspectPicker<T extends string>({
  label,
  icon,
  value,
  options,
  onChange,
  accent,
  autoRestore,
  renderIcon,
  extra,
}: {
  label: string;
  icon: React.ReactNode;
  value: T | "auto";
  options: { value: T; label: string; description?: string }[];
  onChange: (v: T | "auto") => void;
  accent: string;
  autoRestore: T;
  renderIcon: (value: T) => React.ReactNode;
  extra?: React.ReactNode;
}) {
  const auto = value === "auto";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
        flex: 1,
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <Tooltip
          title={auto ? `${label} Auto on — click to restore ${String(autoRestore)}` : `${label}: click icon for Auto`}
          arrow
        >
          <IconButton
            size="small"
            onClick={() => onChange(auto ? autoRestore : "auto")}
            aria-label={`${label} auto`}
            aria-pressed={auto}
            sx={{
              color: auto ? accent : "rgba(255,255,255,0.5)",
              bgcolor: auto ? `${accent}24` : "transparent",
              border: "1px solid",
              borderColor: auto ? `${accent}99` : "rgba(255,255,255,0.12)",
              width: 28,
              height: 28,
              "&:hover": { bgcolor: `${accent}18`, color: accent },
            }}
          >
            {icon}
          </IconButton>
        </Tooltip>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {label}
        </Typography>
        {!auto && (
          <Box
            aria-hidden
            sx={{
              display: "inline-flex",
              color: accent,
              opacity: 0.95,
              lineHeight: 0,
              "& > svg": { width: 16, height: 16 },
            }}
          >
            {renderIcon(value as T)}
          </Box>
        )}
        {auto && (
          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            Auto
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(4, minmax(0, 1fr))" },
          gap: 0.6,
          flex: 1,
          minHeight: 72,
        }}
      >
        {options.map((o) => {
          const selected = !auto && value === o.value;
          return (
            <Tooltip key={o.value} title={o.description ?? o.label} arrow>
              <ButtonBase
                onClick={() => onChange(o.value)}
                aria-pressed={selected}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.45,
                  px: 0.5,
                  py: 0.85,
                  minHeight: "100%",
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: selected ? `${accent}99` : "rgba(255,255,255,0.1)",
                  bgcolor: selected ? `${accent}1f` : "rgba(255,255,255,0.04)",
                  color: selected ? accent : "rgba(255,255,255,0.7)",
                  transition: "background-color 120ms, border-color 120ms, color 120ms",
                  "&:hover": {
                    bgcolor: selected ? `${accent}2b` : "rgba(255,255,255,0.08)",
                    color: selected ? accent : "rgba(255,255,255,0.92)",
                  },
                }}
              >
                {renderIcon(o.value)}
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    lineHeight: 1.15,
                    textAlign: "center",
                    color: "inherit",
                  }}
                >
                  {o.label}
                </Typography>
              </ButtonBase>
            </Tooltip>
          );
        })}
      </Box>
      {extra}
    </Box>
  );
}

// ─── Row label ────────────────────────────────────────────────────────────────

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption"
      sx={{
        color: "rgba(255,255,255,0.40)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontSize: 9,
        minWidth: 62,
        userSelect: "none",
      }}
    >
      {children}
    </Typography>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function VDiv() {
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
    />
  );
}

// ─── Row container ────────────────────────────────────────────────────────────

function Row({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
        minHeight: 32,
      }}
    >
      {children}
    </Box>
  );
}

function IncludeCheck({
  checked,
  onChange,
  disabled,
  label,
  tooltip,
  locked,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  tooltip?: string;
  locked?: boolean;
}) {
  const control = (
    <Box
      component="label"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.25,
        cursor: disabled ? "default" : "pointer",
        userSelect: "none",
      }}
    >
      <Checkbox
        size="small"
        checked={checked}
        disabled={disabled}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        sx={{
          p: 0.35,
          color: "rgba(255,255,255,0.35)",
          "&.Mui-checked": { color: locked ? "#34d399" : "#8b5cf6" },
          "&.Mui-disabled": {
            color: locked
              ? "#34d399"
              : checked
                ? "rgba(139,92,246,0.35)"
                : "rgba(255,255,255,0.2)",
          },
        }}
      />
      <Typography
        sx={{
          fontSize: locked ? 11 : 10.5,
          fontWeight: 700,
          letterSpacing: locked ? "0.01em" : 0,
          fontFamily: locked
            ? "ui-monospace, SFMono-Regular, Menlo, monospace"
            : "inherit",
          color: disabled
            ? "rgba(255,255,255,0.38)"
            : "rgba(255,255,255,0.82)",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      <Box component="span" sx={{ display: "inline-flex" }}>
        {control}
      </Box>
    </Tooltip>
  ) : (
    control
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────

/**
 * AISettingsPanel — redesigned settings surface for the AI Chat HUD.
 *
 * Layout (top → bottom):
 *  1. Header: "AI Settings" + master reset
 *  2. Time + Power + Model (temporal scope · Ion → Unlimited; section icon toggles Auto)
 *  3. Divider
 *  4. Basic row: Accuracy · Mode
 *  5. Divider
 *  6. Workflow row (collapsible): Plan · Test · Ask · Review
 *  7. Divider
 *  8. When row: Duration · Schedule
 *  9. Divider
 * 10. Randomness slider
 * 11. Include row: import permissions · Include(Core.*) (locked)
 * 12. Context sources: Senses / Presence / Session / People
 *
 * Intended to be rendered inside `AISettingsPanelShell` from `@expanse/shell`
 * which provides the DUSK_HORIZON_BACKGROUND, rounded-top border, etc.
 */
export function AISettingsPanel() {
  const {
    settings,
    setAccuracy,
    setRandomness,
    setTimeAspect,
    setRewritePast,
    setPowerLevel,
    setAutonomousMode,
    setPlanMode,
    setTestingMode,
    setAskQuestionsMode,
    setReviewMode,
    setDurationMode,
    setDurationMinutes,
    setTimeMode,
    setScheduledTime,
    setImportPermissionSettings,
    toggleContextSource,
    resetToDefaults,
  } = useAISettings();
  const profile = useOptionalProfileContext();
  const canRewritePast = canRewritePastAs(profile?.settings.actingAsRoles);

  const [workflowExpanded, setWorkflowExpanded] = useState(false);

  useEffect(() => {
    if (!canRewritePast && settings.rewritePast) {
      setRewritePast(false);
    }
  }, [canRewritePast, settings.rewritePast, setRewritePast]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        p: 1.5,
        height: "100%",
        minHeight: 0,
        flex: 1,
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: "#8b5cf6", fontSize: 17 }} />
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: 13 }}
          >
            AI Settings
          </Typography>
        </Box>
        <Tooltip title="Reset all to defaults" arrow>
          <IconButton size="small" onClick={resetToDefaults} sx={{ color: "rgba(255,255,255,0.4)" }}>
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />

      {/* ── Time + Power ───────────────────────────────────────────── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1.25,
          flex: 1,
          minHeight: 0,
          alignContent: "stretch",
        }}
      >
        <AspectPicker
          label="Time"
          icon={<HistoryIcon sx={{ fontSize: 16 }} />}
          value={settings.timeAspect}
          options={TIME_ASPECT_OPTIONS}
          onChange={setTimeAspect}
          accent="#3b82f6"
          autoRestore="max"
          renderIcon={(v) => <TimeAspectIcon aspect={v} size={22} />}
          extra={
            settings.timeAspect === "past" ||
            settings.timeAspect === "max" ||
            settings.timeAspect === "auto" ? (
              <IncludeCheck
                checked={canRewritePast && settings.rewritePast}
                onChange={setRewritePast}
                disabled={!canRewritePast}
                label="Rewrite past"
                tooltip={
                  canRewritePast
                    ? REWRITE_PAST_TOOLTIP_ALLOWED
                    : REWRITE_PAST_TOOLTIP_LOCKED
                }
              />
            ) : null
          }
        />
        <AspectPicker
          label="Power + Model"
          icon={<BoltIcon sx={{ fontSize: 16 }} />}
          value={settings.powerLevel}
          options={POWER_LEVEL_OPTIONS}
          onChange={setPowerLevel}
          accent="#f59e0b"
          autoRestore="aion-plus"
          renderIcon={(v) => <PowerLevelIcon level={v} size={22} />}
        />
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />

      {/* ── Basic row ──────────────────────────────────────────────────── */}
      <Row>
        <RowLabel>Basic</RowLabel>

        {/* Accuracy slider (0–3 steps) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flex: 1, minWidth: 140 }}>
          <Tooltip title="Accuracy" arrow>
            <SpeedIcon sx={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }} />
          </Tooltip>
          <Slider
            size="small"
            value={ACCURACY_OPTIONS.findIndex((o) => o.value === settings.accuracy)}
            onChange={(_, v) => setAccuracy(ACCURACY_OPTIONS[v as number].value)}
            step={1}
            marks={ACCURACY_OPTIONS.map((o, i) => ({ value: i, label: o.label }))}
            min={0}
            max={3}
            sx={{
              flex: 1,
              color: "#3b82f6",
              "& .MuiSlider-markLabel": { fontSize: 9, color: "rgba(255,255,255,0.4)" },
            }}
          />
        </Box>

        <VDiv />

        {/* Autonomous mode */}
        <ChipMenu
          label="Mode"
          icon={<SmartToyIcon sx={{ fontSize: 14 }} />}
          value={settings.autonomousMode}
          options={AUTONOMOUS_OPTIONS}
          onChange={(v) => setAutonomousMode(v as AutonomousMode)}
          activeColor="#06b6d4"
        />
      </Row>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />

      {/* ── Workflow row (collapsible) ──────────────────────────────────── */}
      <Row>
        <RowLabel>Workflow</RowLabel>

        <ChipMenu
          label="Plan"
          icon={<ChecklistIcon sx={{ fontSize: 14 }} />}
          value={settings.planMode}
          options={PLAN_OPTIONS}
          onChange={(v) => setPlanMode(v as PlanMode)}
          activeColor="#22c55e"
        />
        <ChipMenu
          label="Test"
          icon={<BugReportIcon sx={{ fontSize: 14 }} />}
          value={settings.testingMode}
          options={TESTING_OPTIONS}
          onChange={(v) => setTestingMode(v as TestingMode)}
          activeColor="#f43f5e"
        />

        {/* Expand/collapse Ask + Review */}
        <Tooltip title={workflowExpanded ? "Collapse Ask/Review" : "Show Ask/Review"} arrow>
          <IconButton
            size="small"
            onClick={() => setWorkflowExpanded((v) => !v)}
            sx={{ color: "rgba(255,255,255,0.35)", ml: -0.5 }}
          >
            {workflowExpanded ? (
              <ExpandLessIcon sx={{ fontSize: 16 }} />
            ) : (
              <ExpandMoreIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>
        </Tooltip>

        <AnimatePresence initial={false}>
          {workflowExpanded && (
            <Box
              component={motion.div}
              key="ask-review"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              style={{ overflow: "hidden", display: "flex", alignItems: "center", gap: 8 }}
            >
              <ChipMenu
                label="Ask"
                icon={<QuestionAnswerIcon sx={{ fontSize: 14 }} />}
                value={settings.askQuestionsMode}
                options={ASK_OPTIONS}
                onChange={(v) => setAskQuestionsMode(v as AskQuestionsMode)}
                activeColor="#a78bfa"
              />
              <ChipMenu
                label="Review"
                icon={<RateReviewIcon sx={{ fontSize: 14 }} />}
                value={settings.reviewMode}
                options={REVIEW_OPTIONS}
                onChange={(v) => setReviewMode(v as ReviewMode)}
                activeColor="#fb923c"
              />
            </Box>
          )}
        </AnimatePresence>
      </Row>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />

      {/* ── Time row ───────────────────────────────────────────────────── */}
      <Row>
        <RowLabel>When</RowLabel>
        <ChipMenu
          label="Duration"
          icon={<TimerIcon sx={{ fontSize: 14 }} />}
          value={settings.durationMode}
          options={DURATION_OPTIONS}
          onChange={(v) => setDurationMode(v as DurationMode)}
          activeColor="#38bdf8"
        />
        {/* Manual minutes override — shown only when duration is "manual" */}
        {settings.durationMode === "manual" && (
          <OutlinedInput
            size="small"
            type="number"
            value={settings.durationMinutes ?? ""}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setDurationMinutes(isNaN(val) || val <= 0 ? undefined : val);
            }}
            placeholder="min"
            endAdornment={
              <InputAdornment position="end">
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>
                  min
                </Typography>
              </InputAdornment>
            }
            inputProps={{ min: 1, max: 9999 }}
            sx={{
              height: 26,
              width: 72,
              fontSize: 12,
              color: "rgba(255,255,255,0.8)",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#38bdf8" },
              "& input": { p: "4px 8px", MozAppearance: "textfield" },
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { WebkitAppearance: "none" },
            }}
          />
        )}
        <ChipMenu
          label="Schedule"
          icon={<ScheduleIcon sx={{ fontSize: 14 }} />}
          value={settings.timeMode}
          options={TIME_OPTIONS}
          onChange={(v) => setTimeMode(v as TimeMode)}
          activeColor="#818cf8"
        />
        {/* Manual time override — shown only when timeMode is "manual" */}
        {settings.timeMode === "manual" && (
          <OutlinedInput
            size="small"
            type="time"
            value={settings.scheduledTime ?? ""}
            onChange={(e) =>
              setScheduledTime(e.target.value || undefined)
            }
            inputProps={{ step: 300 }}
            sx={{
              height: 26,
              width: 96,
              fontSize: 12,
              color: "rgba(255,255,255,0.8)",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#818cf8" },
              "& input": {
                p: "4px 8px",
                colorScheme: "dark",
              },
            }}
          />
        )}
      </Row>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />

      {/* ── Randomness row ─────────────────────────────────────────────── */}
      <Row>
        <RowLabel>Rand.</RowLabel>
        <CasinoIcon sx={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }} />
        <Slider
          size="small"
          value={settings.randomness}
          min={0}
          max={1}
          step={0.05}
          onChange={(_, v) => setRandomness(v as number)}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => v.toFixed(2)}
          sx={{
            flex: 1,
            maxWidth: 180,
            color: "#f97316",
            "& .MuiSlider-valueLabel": { fontSize: 10, bgcolor: "rgba(249,115,22,0.9)" },
          }}
        />
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", minWidth: 32, textAlign: "right" }}>
          {settings.randomness.toFixed(2)}
        </Typography>
      </Row>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />

      {/* ── Include row ──────────────────────────────────────────────── */}
      <Row>
        <RowLabel>Include</RowLabel>
        <IncludeCheck
          checked={settings.importPermissionSettings}
          onChange={setImportPermissionSettings}
          label="Imports permission settings"
          tooltip="Pull AI permission settings into this chat"
        />
        <VDiv />
        <IncludeCheck
          checked
          disabled
          locked
          label={INCLUDE_CORE_COMMAND}
          tooltip={INCLUDE_CORE_DESCRIPTION}
        />
      </Row>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />

      {/* ── Context sources ─────────────────────────────────────────── */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <RowLabel>Context</RowLabel>
        </Box>
        {CHAT_CONTEXT_SOURCE_GROUPS.map((group) => {
          const ids = CHAT_CONTEXT_SOURCE_IDS.filter(
            (id) => CHAT_CONTEXT_SOURCE_META[id].group === group,
          );
          return (
            <Box key={group}>
              <Typography
                sx={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  mb: 0.5,
                }}
              >
                {CHAT_CONTEXT_SOURCE_GROUP_LABEL[group]}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {ids.map((id) => {
                  const meta = CHAT_CONTEXT_SOURCE_META[id];
                  const on = settings.contextSources[id] ?? meta.defaultOn;
                  return (
                    <IncludeCheck
                      key={id}
                      checked={on}
                      onChange={() => toggleContextSource(id)}
                      label={meta.label}
                      tooltip={meta.gloss}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
