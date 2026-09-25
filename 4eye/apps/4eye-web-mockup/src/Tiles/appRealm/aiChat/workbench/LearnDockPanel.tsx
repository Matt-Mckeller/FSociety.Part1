"use client";

/**
 * LearnDockPanel — the learning session as a dock panel.
 *
 * `LearningSurface` renders the same four sections as one long column, which is
 * right for a full-width tab and wrong for a 340px dock. Input and Checklist
 * sit first (both open) so the session steps stay in reach; Modalities and
 * Options collapse. Each section is a `SectionDisclosure` that remembers
 * whether you keep it open.
 *
 * The header states the session name. The directive this session contributes
 * to the chat is hidden until the card is expanded — a collapsed card should
 * read as a title, not a generated paragraph.
 */

import * as React from "react";
import { Box, Collapse, Stack, Typography, alpha } from "@mui/material";
import { ChevronIcon, StudentIcon } from "@4eye/icons";

import { SectionDisclosure, useSurface } from "@4eye/web/components/surface";
import { usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";
import {
  InputTypePicker,
  LearningChecklist,
  LearningComposer,
  LearningOptions,
  ModalityGrid,
  formatApm,
  learningDirective,
  selectedOptions,
  stepPosition,
  taggedContextFacets,
  useLearning,
  type LearningPlanInput,
} from "@4eye/web/Tiles/learning";

const DIRECTIVE_STATES = ["shut", "open"] as const;

export function LearnDockPanel({
  accent,
  onSaveToPlan,
}: {
  accent: string;
  onSaveToPlan?: (input: LearningPlanInput) => void;
}) {
  const { session, progress, modalityCovered, modalityTotal } = useLearning();
  const surface = useSurface();
  const ink = surface.ink(accent);
  const { total } = stepPosition(session);
  const opts = selectedOptions(session);
  const contextOn = taggedContextFacets(session).length;
  const [directive, setDirective] = usePersistedChoice(
    "4eye.aiChat.learnDirective",
    "shut",
    DIRECTIVE_STATES,
  );
  const directiveOpen = directive === "open";

  return (
    <Stack sx={{ gap: 1 }}>
      {/* Session identity — directive expands on demand. */}
      <Box
        role="button"
        tabIndex={0}
        aria-expanded={directiveOpen}
        onClick={() => setDirective(directiveOpen ? "shut" : "open")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDirective(directiveOpen ? "shut" : "open");
          }
        }}
        sx={{
          p: 1.25,
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(accent, 0.28),
          bgcolor: alpha(accent, 0.06),
          cursor: "pointer",
          "&:hover": { bgcolor: alpha(accent, 0.1) },
          "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, mb: 0.5 }}>
          <Box component={StudentIcon} size={14} sx={{ color: ink, flexShrink: 0 }} />
          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: ink,
            }}
          >
            Session
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box
            component={ChevronIcon}
            size={14}
            sx={{
              color: ink,
              flexShrink: 0,
              transition: "transform 180ms ease",
              transform: directiveOpen ? "rotate(90deg)" : "none",
            }}
          />
        </Stack>
        <Typography sx={{ fontWeight: 800, fontSize: 14, lineHeight: 1.25, color: surface.text.hi }}>
          {session.title}
        </Typography>
        <Collapse in={directiveOpen}>
          <Typography
            sx={{
              mt: 0.75,
              pt: 0.75,
              fontSize: "0.68rem",
              lineHeight: 1.5,
              color: surface.text.lo,
              borderTop: "1px solid",
              borderColor: alpha(accent, 0.2),
            }}
          >
            {learningDirective(session)}
          </Typography>
        </Collapse>
      </Box>

      <SectionDisclosure
        id="ai-learn-input"
        label="Input"
        accent={accent}
        meta={[
          session.inputType ?? "none chosen",
          session.autoImportContext && "ORC auto",
        ]
          .filter(Boolean)
          .join(" · ")}
        hint="What you bring in, plus auto-imported optimally relevant context"
        defaultOpen
      >
        <InputTypePicker />
        <Box sx={{ mt: 1.5 }}>
          <LearningComposer textHandledByChat onSaveToPlan={onSaveToPlan} />
        </Box>
      </SectionDisclosure>

      <SectionDisclosure
        id="ai-learn-checklist"
        label="Checklist"
        accent={accent}
        meta={`${Math.round(progress * 100)}%`}
        hint="The steps for this session — sending a message ticks the current one"
        defaultOpen
      >
        <LearningChecklist />
      </SectionDisclosure>

      <SectionDisclosure
        id="ai-learn-modalities"
        label="Modalities"
        accent={accent}
        meta={[
          `${modalityCovered}/${modalityTotal} covered`,
          contextOn > 0 && `${contextOn} context`,
          session.shapes.length > 0 && `${session.shapes.length} shapes`,
        ]
          .filter(Boolean)
          .join(" · ")}
        hint="Ways of engaging, plus named learner-context chips and shapes"
      >
        <ModalityGrid />
      </SectionDisclosure>

      <SectionDisclosure
        id="ai-learn-options"
        label="Options"
        accent={accent}
        meta={
          [
            ...opts.map((o) => o.label),
            session.throughput && session.throughput.apm > 0 && formatApm(session.throughput.apm),
          ]
            .filter(Boolean)
            .join(" · ") || "defaults"
        }
        hint="Pace as a 200 APM rating, Auto depth, combination support, and a custom output note"
      >
        <LearningOptions />
      </SectionDisclosure>
    </Stack>
  );
}
