"use client";

/**
 * LearningComposer — the actual input surface for a learning session.
 *
 * Adapts to the modality chosen in the Input Type picker:
 *   - text     → notes on the Plan document (when hosted by AI chat).
 *   - link     → URL attachment on the plan.
 *   - voice    → mock recording attachment.
 *   - image    → uploaded image attachment (data URL preview).
 *   - template → guided-structure attachment.
 *   - (none)   → a hint to choose an input type first.
 *
 * UI-first mockup — no backend.
 */

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MicRounded from "@mui/icons-material/MicRounded";
import PhotoCameraRounded from "@mui/icons-material/PhotoCameraRounded";
import DashboardCustomizeRounded from "@mui/icons-material/DashboardCustomizeRounded";
import { COLOR_MAP } from "@4eye/types";

import {
  LEARNING_INPUT_TYPE_META,
  type LearningInputType,
} from "../model/types";
import { useLearning } from "../store/LearningProvider";

function MockAffordance({
  accent,
  icon,
  title,
  hint,
  cta,
  onCta,
}: {
  accent: string;
  icon: React.ReactNode;
  title: string;
  hint: string;
  cta: string;
  onCta?: () => void;
}) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: `1.5px dashed ${alpha(accent, 0.5)}`,
        bgcolor: alpha(accent, 0.06),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        textAlign: "center",
      }}
    >
      <Box sx={{ color: accent, display: "flex" }}>{icon}</Box>
      <Typography sx={{ fontWeight: 800, fontSize: 14 }}>{title}</Typography>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {hint}
      </Typography>
      <Button
        size="small"
        variant="contained"
        onClick={onCta}
        disabled={!onCta}
        sx={{ mt: 0.5, textTransform: "none", fontWeight: 700, bgcolor: accent }}
      >
        {cta}
      </Button>
    </Box>
  );
}

const MOCK_TEMPLATES = [
  { id: "socratic", label: "Socratic lesson", value: "Question → probe → recap." },
  { id: "worked-example", label: "Worked example", value: "Show → fade → try." },
  { id: "teach-back", label: "Teach-back", value: "Explain it in your own words." },
] as const;

function linkLabel(url: string): string {
  try {
    return new URL(url.includes("://") ? url : `https://${url}`).hostname;
  } catch {
    return url;
  }
}

/**
 * What the Learn panel contributes to the Plan document.
 * Text becomes notes; every other input type becomes an attachment.
 */
export interface LearningPlanInput {
  kind: LearningInputType;
  label: string;
  value: string;
  dataUrl?: string;
}

export interface LearningComposerProps {
  /**
   * Set when the surface already has a real composer — the AI workbench, where
   * the HUD input bar sends the message. Text then routes there instead of
   * rendering a second box beside it: two text fields on one screen, only one of
   * which sends anything, is worse than none.
   *
   * The non-text affordances stay either way; voice, image, link and template
   * are genuinely different ways in, not duplicates of the chat input.
   */
  textHandledByChat?: boolean;
  /** Capture Learn-panel input onto the plan document (notes or attachments). */
  onSaveToPlan?: (input: LearningPlanInput) => void;
}

export function LearningComposer({
  textHandledByChat = false,
  onSaveToPlan,
}: LearningComposerProps = {}) {
  const { session } = useLearning();
  const [draft, setDraft] = React.useState("");
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const type = session.inputType;
  const attach = (input: LearningPlanInput) => {
    onSaveToPlan?.(input);
  };

  if (!type) {
    return (
      <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
        Choose an input type above to begin.
      </Typography>
    );
  }

  const accent = COLOR_MAP[LEARNING_INPUT_TYPE_META[type].accent];

  if (type === "text") {
    if (textHandledByChat && onSaveToPlan) {
      const saveNote = () => {
        if (!draft.trim()) return;
        attach({ kind: "text", label: "Note", value: draft.trim() });
        setDraft("");
      };
      return (
        <Box>
          <TextField
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add to the plan…"
            multiline
            minRows={2}
            maxRows={6}
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                saveNote();
              }
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ alignSelf: "flex-end", mb: 0.5 }}>
                    <IconButton
                      color="primary"
                      disabled={!draft.trim()}
                      onClick={saveNote}
                      aria-label="Save to plan"
                    >
                      <SendRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      );
    }
    if (textHandledByChat) {
      return (
        <Box>
          <Box
            sx={{
              px: 1.25,
              py: 1,
              borderRadius: 2,
              border: `1.5px dashed ${alpha(accent, 0.4)}`,
              bgcolor: alpha(accent, 0.05),
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SendRoundedIcon sx={{ fontSize: 16, color: accent }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Type in the chat composer below — it carries this session&apos;s settings.
            </Typography>
          </Box>
        </Box>
      );
    }
    return (
      <Box>
        <TextField
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What do you want to learn or work through?"
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={{ alignSelf: "flex-end", mb: 0.5 }}>
                  <IconButton
                    color="primary"
                    disabled={!draft.trim()}
                    onClick={() => setDraft("")}
                    aria-label="Send"
                  >
                    <SendRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    );
  }

  if (type === "link") {
    const addLink = () => {
      const url = draft.trim();
      if (!url) return;
      attach({ kind: "link", label: linkLabel(url), value: url });
      setDraft("");
    };
    return (
      <Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
          <TextField
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="https://…"
            fullWidth
            size="small"
            type="url"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addLink();
              }
            }}
          />
          <Button
            variant="contained"
            disabled={!draft.trim() || !onSaveToPlan}
            onClick={addLink}
            sx={{ textTransform: "none", fontWeight: 700, whiteSpace: "nowrap" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    );
  }

  if (type === "voice") {
    return (
      <Box>
        <MockAffordance
          accent={accent}
          icon={<MicRounded sx={{ fontSize: 32 }} />}
          title="Tap to record"
          hint="Speak what you want to learn — we'll transcribe it."
          cta="Start recording"
          onCta={
            onSaveToPlan
              ? () =>
                  attach({
                    kind: "voice",
                    label: `Voice note ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`,
                    value: "(mock recording — transcription not wired)",
                  })
              : undefined
          }
        />
      </Box>
    );
  }

  if (type === "image") {
    const pickImage = (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === "string" ? reader.result : undefined;
        attach({
          kind: "image",
          label: file.name,
          value: file.name,
          dataUrl,
        });
      };
      reader.readAsDataURL(file);
    };
    return (
      <Box>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) pickImage(file);
            e.target.value = "";
          }}
        />
        <MockAffordance
          accent={accent}
          icon={<PhotoCameraRounded sx={{ fontSize: 32 }} />}
          title="Add an image"
          hint="Snap a photo of notes, a page, or a diagram."
          cta="Capture or upload"
          onCta={onSaveToPlan ? () => imageInputRef.current?.click() : undefined}
        />
      </Box>
    );
  }

  return (
    <Box>
      {onSaveToPlan ? (
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: `1.5px dashed ${alpha(accent, 0.5)}`,
            bgcolor: alpha(accent, 0.06),
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: accent }}>
            <DashboardCustomizeRounded sx={{ fontSize: 20 }} />
            <Typography sx={{ fontWeight: 800, fontSize: 13 }}>Start from a template</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {MOCK_TEMPLATES.map((t) => (
              <Chip
                key={t.id}
                size="small"
                label={t.label}
                onClick={() => attach({ kind: "template", label: t.label, value: t.value })}
                sx={{
                  fontWeight: 700,
                  height: 26,
                  cursor: "pointer",
                  bgcolor: alpha(accent, 0.12),
                  border: `1px solid ${alpha(accent, 0.4)}`,
                }}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <MockAffordance
          accent={accent}
          icon={<DashboardCustomizeRounded sx={{ fontSize: 32 }} />}
          title="Start from a template"
          hint="Pick a guided structure to build on."
          cta="Browse templates"
        />
      )}
    </Box>
  );
}
