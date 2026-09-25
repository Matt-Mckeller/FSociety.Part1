"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Box, IconButton, InputBase, Paper, Tooltip, Typography } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import {
  COMPOSER_COLLAPSED_HEIGHT,
  COMPOSER_EXPANDED_HEIGHT,
} from "./workbench/planExport";
import { ComposerSmileHandle } from "./ComposerSmileHandle";

interface AiChatComposerProps {
  onSend: (message: string) => void;
  /** Live plan notes — the document writes from this field. */
  value: string;
  onChange: (next: string) => void;
  /** Human-readable context summary shown below the pill. */
  summary: string;
  onClearAll: () => void;
  onToggleContext?: () => void;
  onToggleSettings?: () => void;
  /** Open the Learn dock panel / Learn tab. */
  onOpenLearn?: () => void;
  contextOpen?: boolean;
  settingsOpen?: boolean;
  learnOpen?: boolean;
  /** Number of active context sources — shows a small count badge. */
  contextSourceCount?: number;
  disabled?: boolean;
  placeholder?: string;
  expanded?: boolean;
  onToggleExpand?: () => void;
}

/**
 * AiChatComposer — the plan's writing surface, docked as the HUD input.
 *
 * Collapsed: compact pill. Expanded: a multiline field with room to write.
 * Expand / collapse lives under the pill as a nested Expanse smile, so the
 * top of this surface can sit flush with Actors, Who else, and Aim.
 */
export function AiChatComposer({
  onSend,
  value,
  onChange,
  summary,
  onClearAll,
  onToggleContext,
  onToggleSettings,
  onOpenLearn,
  contextOpen = false,
  settingsOpen = false,
  learnOpen = false,
  contextSourceCount = 0,
  disabled = false,
  placeholder = "Ask anything…",
  expanded = false,
  onToggleExpand,
}: AiChatComposerProps) {
  const hasContext = Boolean(summary);
  const canSend = Boolean(value.trim()) && !disabled;

  const submit = () => {
    if (!canSend) return;
    onSend(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: expanded ? "stretch" : "center",
          gap: 0.5,
          px: 1.15,
          py: expanded ? 1 : 0.75,
          minHeight: expanded ? COMPOSER_EXPANDED_HEIGHT : COMPOSER_COLLAPSED_HEIGHT,
          bgcolor: "rgba(22, 22, 28, 0.92)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: expanded ? 3 : 99,
          transition: "min-height 180ms ease, border-radius 180ms ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: expanded ? "column" : "row",
            alignItems: "center",
            gap: 0.25,
            pt: expanded ? 0.25 : 0,
          }}
        >
          <Tooltip title={settingsOpen ? "Hide AI settings" : "AI settings"} arrow>
            <IconButton
              size="small"
              onClick={onToggleSettings}
              sx={{
                color: settingsOpen ? "#a855f7" : "rgba(255,255,255,0.45)",
                bgcolor: settingsOpen ? "rgba(168,85,247,0.15)" : "transparent",
                "&:hover": { color: "#a855f7", bgcolor: "rgba(168,85,247,0.1)" },
              }}
            >
              <TuneRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={contextOpen ? "Context sources (open)" : "Context sources"} arrow>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <IconButton
                size="small"
                onClick={onToggleContext}
                sx={{
                  color: contextOpen ? "#22c55e" : "rgba(255,255,255,0.45)",
                  bgcolor: contextOpen ? "rgba(34,197,94,0.15)" : "transparent",
                  "&:hover": { color: "#22c55e", bgcolor: "rgba(34,197,94,0.1)" },
                }}
              >
                <CategoryRoundedIcon fontSize="small" />
              </IconButton>
              {contextSourceCount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 1,
                    right: 1,
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    bgcolor: contextOpen ? "#22c55e" : "rgba(34,197,94,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 800,
                    color: "#000",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  {contextSourceCount}
                </Box>
              )}
            </Box>
          </Tooltip>

          {onOpenLearn && (
            <Tooltip title={learnOpen ? "Learn panel (open)" : "Open Learn"} arrow>
              <IconButton
                size="small"
                onClick={onOpenLearn}
                aria-label="Open Learn"
                sx={{
                  color: learnOpen ? "#34d399" : "rgba(255,255,255,0.45)",
                  bgcolor: learnOpen ? "rgba(52,211,153,0.15)" : "transparent",
                  "&:hover": { color: "#34d399", bgcolor: "rgba(52,211,153,0.1)" },
                }}
              >
                <SchoolRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ width: "1px", alignSelf: "stretch", minHeight: 20, bgcolor: "rgba(255,255,255,0.1)", mx: 0.25 }} />

        <InputBase
          fullWidth
          multiline
          minRows={expanded ? 7 : 1}
          maxRows={expanded ? 14 : 3}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            if (expanded) {
              if (e.metaKey || e.ctrlKey) {
                e.preventDefault();
                submit();
              }
              return;
            }
            if (!e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          sx={{
            flex: 1,
            alignSelf: expanded ? "stretch" : "center",
            color: "white",
            fontSize: "0.9rem",
            px: 0.75,
            py: expanded ? 0.5 : 0,
            "& textarea": {
              alignSelf: "stretch",
              overflow: "auto !important",
            },
            "& ::placeholder": { color: "rgba(255,255,255,0.35)", opacity: 1 },
            opacity: disabled ? 0.5 : 1,
          }}
        />

        <Box sx={{ width: "1px", alignSelf: "stretch", minHeight: 20, bgcolor: "rgba(255,255,255,0.1)", mx: 0.25 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: expanded ? "column" : "row",
            alignItems: "center",
            justifyContent: expanded ? "flex-end" : "center",
            gap: 0.25,
            pt: expanded ? 0.25 : 0,
            pb: expanded ? 0.25 : 0,
          }}
        >
          <Tooltip title={expanded ? "Send & download Markdown + JSON (⌘↵)" : "Send & download Markdown + JSON (↵)"} arrow>
            <span>
              <IconButton
                size="small"
                onClick={submit}
                disabled={!canSend}
                sx={{
                  bgcolor: canSend ? "primary.main" : "transparent",
                  color: canSend ? "white" : "rgba(255,255,255,0.25)",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <SendRoundedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Paper>

      {onToggleExpand && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ComposerSmileHandle expanded={expanded} onToggle={onToggleExpand} />
        </Box>
      )}

      <AnimatePresence initial={false}>
        {hasContext && (
          <motion.div
            key="context-strip"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 2,
                py: 0.45,
                mt: 0.25,
                bgcolor: "rgba(255,255,255,0.04)",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "0.7rem",
                }}
              >
                {summary}
              </Typography>
              <Tooltip title="Clear all context" arrow>
                <span>
                  <IconButton
                    size="small"
                    onClick={onClearAll}
                    sx={{ color: "rgba(255,255,255,0.35)", p: 0.25, "&:hover": { color: "#ef4444" } }}
                  >
                    <ClearAllIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
