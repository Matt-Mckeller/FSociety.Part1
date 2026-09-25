"use client";

import { useState } from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import TryInApp from "@4eye/web/components/marketing/TryInApp";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TranslationType = "enable" | "learn";

export interface TranslationVariant {
  output: string;
  note?: string;
  reframe?: string;
}

export interface TranslationSample {
  input: string;
  variants: Record<TranslationType, TranslationVariant>;
}

export interface TranslationDemoProps {
  defaultType?: TranslationType;
  sample?: TranslationSample;
}

// ─── Default sample ──────────────────────────────────────────────────────────

const DEFAULT_SAMPLE: TranslationSample = {
  input: "🤧🚪😍 — Whose ready for bed?",
  variants: {
    enable: {
      output: "🤧🚪😍 — Whose ready for bed?",
    },
    learn: {
      output: "🤧🚪😍 — Whose ready for bed?",
      note: "Emotion is typically heightened here — it feels awkward to ask people for things. If they're engaged in an activity, pulling away is frustrating; emotion gets mixed in. Over time we've been trained to associate this kind of request with a negative reaction. We can reframe it as a reward system and surface subtle alternative decision-making cues.",
      reframe:
        "Careful with how you speak. I know sometimes there are things we don't like, but look forward to everyone's happy faces and a treat.",
    },
  },
};

const TYPE_LABELS: Record<TranslationType, string> = {
  enable: "Enable",
  learn: "Learn",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function TranslationDemo({
  defaultType = "enable",
  sample = DEFAULT_SAMPLE,
}: TranslationDemoProps = {}) {
  const [activeType, setActiveType] = useState<TranslationType>(defaultType);
  const variant = sample.variants[activeType];

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(15,23,42,0.08)",
        bgcolor: "background.paper",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Type selector header */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          px: { xs: 2, sm: 2.5 },
          py: 1.5,
          borderBottom: "1px solid rgba(15,23,42,0.06)",
          bgcolor: "#f8fafc",
          flexWrap: "wrap",
          rowGap: 1
        }}>
        <Typography
          variant="overline"
          sx={{
            color: "text.secondary",
            letterSpacing: "0.2em",
            fontWeight: 700,
            fontSize: "0.7rem",
            whiteSpace: "nowrap",
          }}
        >
          Translation type
        </Typography>
        <Stack direction="row" spacing={0.75} role="radiogroup" aria-label="Translation type">
          {(["enable", "learn"] as TranslationType[]).map((type) => {
            const isActive = type === activeType;
            return (
              <Box
                key={type}
                role="radio"
                aria-checked={isActive}
                tabIndex={0}
                onClick={() => setActiveType(type)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveType(type);
                }}
                sx={{
                  px: 1.5,
                  py: 0.35,
                  borderRadius: 999,
                  cursor: "pointer",
                  border: "1.5px solid",
                  borderColor: isActive ? "primary.main" : "rgba(15,23,42,0.12)",
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "common.white" : "text.secondary",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.8rem",
                  userSelect: "none",
                  transition: "all 0.15s",
                  "&:hover": {
                    borderColor: "primary.main",
                    color: isActive ? "common.white" : "primary.main",
                  },
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: 2,
                  },
                }}
              >
                {TYPE_LABELS[type]}
                {type === "enable" && (
                  <Box
                    component="span"
                    sx={{
                      ml: 0.5,
                      fontSize: "0.65rem",
                      opacity: 0.75,
                      fontStyle: "normal",
                    }}
                  >
                    (default)
                  </Box>
                )}
              </Box>
            );
          })}
        </Stack>
      </Stack>
      {/* I/O body */}
      <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 2 }}>
        {/* Input */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "text.disabled",
            letterSpacing: "0.15em",
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          Input
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: 1.5,
            bgcolor: "#f1f5f9",
            mb: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
            {sample.input}
          </Typography>
        </Box>

        {/* Output */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "text.disabled",
            letterSpacing: "0.15em",
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          Output
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: 1.5,
            border: "1.5px solid",
            borderColor: activeType === "learn" ? "primary.light" : "rgba(15,23,42,0.08)",
            bgcolor: activeType === "learn" ? "#f0f4ff" : "#f8fafc",
            mb: activeType === "learn" ? 2 : 0,
            transition: "all 0.2s",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
            {variant.output}
          </Typography>
        </Box>

        {/* Context consideration block — Learn mode only */}
        {activeType === "learn" && variant.note && (
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: "#fafbff",
              border: "1px solid rgba(99,102,241,0.15)",
              p: { xs: 1.5, sm: 2 },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                display: "block",
                color: "primary.main",
                fontWeight: 800,
                letterSpacing: "0.18em",
                mb: 1,
                fontSize: "0.68rem",
              }}
            >
              Context consideration
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.65, mb: variant.reframe ? 1.5 : 0 }}
            >
              {variant.note}
            </Typography>

            {variant.reframe && (
              <>
                <Divider sx={{ my: 1.25, borderColor: "rgba(99,102,241,0.12)" }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontStyle: "italic",
                    color: "text.primary",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    "&::before": {
                      content: '"""',
                      color: "primary.light",
                      fontStyle: "normal",
                      mr: 0.25,
                    },
                    "&::after": {
                      content: '"""',
                      color: "primary.light",
                      fontStyle: "normal",
                      ml: 0.25,
                    },
                  }}
                >
                  {variant.reframe}
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
      {/* CTA footer */}
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 1.5,
          borderTop: "1px solid rgba(15,23,42,0.06)",
          bgcolor: "#f8fafc",
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary", flex: 1, minWidth: 120 }}>
          Try some transformations yourself...
        </Typography>
        <TryInApp />
      </Box>
    </Box>
  );
}
