"use client";

import { useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HistoryIcon from "@mui/icons-material/History";
import SpeedIcon from "@mui/icons-material/Speed";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TimerIcon from "@mui/icons-material/Timer";
import BugReportIcon from "@mui/icons-material/BugReport";
import ChecklistIcon from "@mui/icons-material/Checklist";
import type {
  AccuracyLevel,
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

interface OptionsMenuProps<T extends string> {
  label: string;
  icon: React.ReactNode;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}

function OptionsMenu<T extends string>({
  label,
  icon,
  value,
  options,
  onChange,
}: OptionsMenuProps<T>) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const current = options.find((o) => o.value === value);
  return (
    <>
      <Tooltip title={label} arrow>
        <Chip
          icon={icon as React.ReactElement}
          label={`${label}: ${current?.label ?? value}`}
          size="small"
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{
            cursor: "pointer",
            color: "#374151",
            bgcolor: "#ffffff",
            border: "1px solid #d1d5db",
            "& .MuiChip-icon": { color: "#6b7280" },
          }}
        />
      </Tooltip>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {options.map((o) => (
          <MenuItem
            key={o.value}
            selected={o.value === value}
            onClick={() => {
              onChange(o.value);
              setAnchor(null);
            }}
          >
            {o.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

const ACCURACY: { value: AccuracyLevel; label: string }[] = ACCURACY_OPTIONS;
const TIME_ASPECT: { value: TimeAspect; label: string }[] = TIME_ASPECT_OPTIONS;
const POWER: { value: PowerLevel; label: string }[] = POWER_LEVEL_OPTIONS;
const AUTONOMOUS: { value: AutonomousMode; label: string }[] = AUTONOMOUS_OPTIONS;
const PLAN: { value: PlanMode; label: string }[] = PLAN_OPTIONS;
const TESTING: { value: TestingMode; label: string }[] = TESTING_OPTIONS;
const ASK: { value: AskQuestionsMode; label: string }[] = ASK_OPTIONS;
const REVIEW: { value: ReviewMode; label: string }[] = REVIEW_OPTIONS;
const DURATION: { value: DurationMode; label: string }[] = DURATION_OPTIONS;
const TIME: { value: TimeMode; label: string }[] = TIME_OPTIONS;

/**
 * AISettingsBar — view component for the AI settings context.
 * Renders chip-menus for every multi-option mode plus a randomness
 * slider. All state lives in `AISettingsContext`.
 */
export function AISettingsBar() {
  const {
    settings,
    setAccuracy,
    setRandomness,
    setTimeAspect,
    setPowerLevel,
    setAutonomousMode,
    setPlanMode,
    setTestingMode,
    setAskQuestionsMode,
    setReviewMode,
    setDurationMode,
    setTimeMode,
    setImportPermissionSettings,
    toggleContextSource,
    resetToDefaults,
  } = useAISettings();

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1.25,
        bgcolor: "#f3f4f6",
        border: "1px solid #d1d5db",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: "#6b7280", fontSize: 18 }} />
          <Typography variant="subtitle2" sx={{ color: "#1f2937", fontWeight: 600 }}>
            AI Settings
          </Typography>
        </Box>
        <Tooltip title="Reset to defaults" arrow>
          <IconButton
            size="small"
            onClick={resetToDefaults}
            sx={{ color: "#6b7280" }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
        <OptionsMenu
          label="Accuracy"
          icon={<SpeedIcon />}
          value={settings.accuracy}
          options={ACCURACY}
          onChange={setAccuracy}
        />
        <OptionsMenu
          label="Time"
          icon={<HistoryIcon />}
          value={settings.timeAspect}
          options={TIME_ASPECT}
          onChange={setTimeAspect}
        />
        <OptionsMenu
          label="Power + Model"
          icon={
            <PowerLevelIcon
              level={settings.powerLevel === "auto" ? "aion" : settings.powerLevel}
            />
          }
          value={settings.powerLevel}
          options={POWER}
          onChange={setPowerLevel}
        />
        <OptionsMenu
          label="Mode"
          icon={<SmartToyIcon />}
          value={settings.autonomousMode}
          options={AUTONOMOUS}
          onChange={setAutonomousMode}
        />
        <OptionsMenu
          label="Plan"
          icon={<ChecklistIcon />}
          value={settings.planMode}
          options={PLAN}
          onChange={setPlanMode}
        />
        <OptionsMenu
          label="Testing"
          icon={<BugReportIcon />}
          value={settings.testingMode}
          options={TESTING}
          onChange={setTestingMode}
        />
        <OptionsMenu
          label="Ask"
          icon={<QuestionAnswerIcon />}
          value={settings.askQuestionsMode}
          options={ASK}
          onChange={setAskQuestionsMode}
        />
        <OptionsMenu
          label="Review"
          icon={<RateReviewIcon />}
          value={settings.reviewMode}
          options={REVIEW}
          onChange={setReviewMode}
        />
        <OptionsMenu
          label="Duration"
          icon={<TimerIcon />}
          value={settings.durationMode}
          options={DURATION}
          onChange={setDurationMode}
        />
        <OptionsMenu
          label="Schedule"
          icon={<ScheduleIcon />}
          value={settings.timeMode}
          options={TIME}
          onChange={setTimeMode}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 0.5 }}>
        <Typography variant="caption" sx={{ color: "#6b7280", minWidth: 80 }}>
          Randomness
        </Typography>
        <Slider
          size="small"
          value={settings.randomness}
          min={0}
          max={1}
          step={0.05}
          onChange={(_, v) => setRandomness(v as number)}
          sx={{ color: "#8b5cf6" }}
        />
        <Typography variant="caption" sx={{ color: "#6b7280", minWidth: 30 }}>
          {settings.randomness.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.5, px: 0.25 }}>
        <Box
          component="label"
          sx={{ display: "inline-flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}
        >
          <Checkbox
            size="small"
            checked={settings.importPermissionSettings}
            onChange={(e) => setImportPermissionSettings(e.target.checked)}
            sx={{
              p: 0.35,
              color: "#9ca3af",
              "&.Mui-checked": { color: "#8b5cf6" },
            }}
          />
          <Typography variant="caption" sx={{ color: "#374151", fontWeight: 600 }}>
            Imports permission settings
          </Typography>
        </Box>
        <Tooltip title={INCLUDE_CORE_DESCRIPTION} arrow>
          <Box
            component="span"
            sx={{ display: "inline-flex", alignItems: "center", userSelect: "none" }}
          >
            <Checkbox
              size="small"
              checked
              disabled
              sx={{ p: 0.35, "&.Mui-disabled": { color: "#34d399" } }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "#374151",
                fontWeight: 700,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              {INCLUDE_CORE_COMMAND}
            </Typography>
          </Box>
        </Tooltip>
      </Box>

      {/* ── Context sources ─────────────────────────────────────────── */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="caption" sx={{ color: "#6b7280", minWidth: 80, fontWeight: 600 }}>
          Context
        </Typography>
        {CHAT_CONTEXT_SOURCE_GROUPS.map((group) => {
          const ids = CHAT_CONTEXT_SOURCE_IDS.filter(
            (id) => CHAT_CONTEXT_SOURCE_META[id].group === group,
          );
          return (
            <Box key={group} sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.25 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#9ca3af",
                  fontSize: 9,
                  minWidth: 52,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {CHAT_CONTEXT_SOURCE_GROUP_LABEL[group]}
              </Typography>
              {ids.map((id) => {
                const meta = CHAT_CONTEXT_SOURCE_META[id];
                const on = settings.contextSources[id] ?? meta.defaultOn;
                return (
                  <Tooltip key={id} title={meta.gloss} arrow>
                    <Box
                      component="label"
                      sx={{ display: "inline-flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}
                    >
                      <Checkbox
                        size="small"
                        checked={on}
                        onChange={() => toggleContextSource(id)}
                        sx={{
                          p: 0.35,
                          color: "#9ca3af",
                          "&.Mui-checked": { color: "#22c55e" },
                        }}
                      />
                      <Typography variant="caption" sx={{ color: "#374151", fontWeight: 600 }}>
                        {meta.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
