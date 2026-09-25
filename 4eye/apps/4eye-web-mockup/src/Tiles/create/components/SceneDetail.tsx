"use client";

/**
 * SceneDetail — right pane: everything seeded onto the selected scene.
 *
 * Sections: prompt scripts (editable), effective goals (resolved with
 * inheritance + weight/depth controls), target perspectives, and seeds
 * (references / text / assets). This is the core "seeding as UI" surface.
 */

import {
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";

import { useCreate } from "../store/CreateProvider";
import { GoalLinkCard } from "./GoalLinkCard";
import { StatusBadge, STATUS_COLOR, InfoChip } from "./visuals";
import { BrandIcon } from "./BrandIcon";
import { ActionBar } from "./ActionBar";
import { HistoryTimeline } from "./HistoryTimeline";
import { SendToChatButton, useSendToChat } from "../chat/SendToChat";
import { STATUS_LABEL } from "../model/types";
import type { GlyphName } from "./brand-glyphs";

const BRAND_FONT = "Xpens, Roboto, sans-serif";

function SectionLabel({
  glyph,
  children,
}: {
  glyph: GlyphName;
  children: React.ReactNode;
}) {
  return (
    <Stack
      spacing={0.75}
      sx={{ flexDirection: "row", alignItems: "center", mt: 1.75, mb: 0.75 }}
    >
      <Box component="span" sx={{ display: "inline-flex", color: "#64748b" }}>
        <BrandIcon name={glyph} size={16} />
      </Box>
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ letterSpacing: 1, lineHeight: 1.2, fontFamily: BRAND_FONT }}
      >
        {children}
      </Typography>
      <Divider sx={{ flex: 1 }} />
    </Stack>
  );
}

export function SceneDetail() {
  const { selectedScene, effectiveGoals, dispatch, state } = useCreate();
  const { send } = useSendToChat();

  if (!selectedScene) {
    return (
      <Box sx={{ p: 3, color: "text.secondary" }}>
        <Typography>Select a scene to view and edit its seeds.</Typography>
      </Box>
    );
  }

  const seeds = selectedScene.seedIds
    .map((id) => state.seeds.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <Box sx={{ p: 1.5 }}>
      {/* Sticky header (hero + actions) — always visible while the pane scrolls */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          bgcolor: "#ffffff",
          pb: 1,
          mb: 0.5,
          borderBottom: "1px solid #f0f2f5",
        }}
      >
        {/* Hero header with status color accent */}
        <Stack
          spacing={1.25}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            p: 1,
            borderRadius: 2,
            bgcolor: alpha(STATUS_COLOR[selectedScene.status], 0.1),
            borderLeft: "4px solid",
            borderColor: STATUS_COLOR[selectedScene.status],
          }}
        >
        <Box
          sx={{
            display: "inline-flex",
            color: STATUS_COLOR[selectedScene.status],
          }}
        >
          <BrandIcon name={selectedScene.glyph ?? "scene"} size={28} />
        </Box>
        <Typography
          variant="h6"
          sx={{ fontFamily: BRAND_FONT, fontWeight: 700, flex: 1, minWidth: 0 }}
        >
          {selectedScene.title}
        </Typography>
        <StatusBadge status={selectedScene.status} />
        <SendToChatButton
          size={26}
          item={{
            kind: "scene",
            id: selectedScene.id,
            label: selectedScene.title,
            detail: `Scene · ${STATUS_LABEL[selectedScene.status]}`,
            glyph: selectedScene.glyph ?? "scene",
            payload: selectedScene,
          }}
        />
      </Stack>

      {/* Actions — generate (broad or goal-directed) + promote status */}
      <Box sx={{ mt: 1 }}>
        <ActionBar
          status={selectedScene.status}
          goals={effectiveGoals}
          version={selectedScene.version}
          onPromote={(to) =>
            dispatch({ kind: "promote", id: selectedScene.id, to })
          }
          onGenerate={() =>
            dispatch({
              kind: "act",
              id: selectedScene.id,
              action: "generated",
              summary: "Ran generation across all goals",
            })
          }
          onGenerateForGoal={(goalId, goalTitle) =>
            dispatch({
              kind: "act",
              id: selectedScene.id,
              action: "generated",
              summary: `Generated toward “${goalTitle}”`,
              goalId,
            })
          }
          onSendToChat={() =>
            send({
              kind: "create:run",
              id: selectedScene.id,
              label: selectedScene.title,
              detail: `Scene · ${STATUS_LABEL[selectedScene.status]} · ${effectiveGoals.length} goals`,
              glyph: selectedScene.glyph ?? "scene",
              payload: {
                scene: selectedScene,
                goals: effectiveGoals,
                prompts: selectedScene.promptScripts,
              },
            })
          }
        />
      </Box>
      </Box>

      <SectionLabel glyph="prompt">Prompt Scripts</SectionLabel>
      <Stack spacing={1}>
        {selectedScene.promptScripts.map((script, i) => (
          <TextField
            key={i}
            value={script}
            multiline
            fullWidth
            size="small"
            onChange={(e) =>
              dispatch({
                kind: "edit-prompt",
                sceneId: selectedScene.id,
                index: i,
                body: e.target.value,
              })
            }
            sx={{ bgcolor: "#fafafa" }}
          />
        ))}
      </Stack>

      <SectionLabel glyph="goal">Goals (resolved · inheritance applied)</SectionLabel>
      <Stack spacing={1}>
        {effectiveGoals.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No goals linked yet.
          </Typography>
        )}
        {effectiveGoals.map((link) => (
          <GoalLinkCard
            key={link.goalId}
            link={link}
            onWeightChange={(weight) =>
              dispatch({
                kind: "link-goal",
                goalId: link.goalId,
                toId: selectedScene.id,
                toType: "scene",
                weight,
                depth: link.depth,
              })
            }
            onDepthChange={(depth) =>
              dispatch({
                kind: "link-goal",
                goalId: link.goalId,
                toId: selectedScene.id,
                toType: "scene",
                weight: link.weight,
                depth,
              })
            }
            onInstructionsChange={(instructions) =>
              dispatch({
                kind: "link-goal",
                goalId: link.goalId,
                toId: selectedScene.id,
                toType: "scene",
                weight: link.weight,
                depth: link.depth,
                instructions,
              })
            }
          />
        ))}
      </Stack>

      {selectedScene.perspectives && selectedScene.perspectives.length > 0 && (
        <>
          <SectionLabel glyph="perspective">Target Perspectives</SectionLabel>
          <Stack spacing={1}>
            {selectedScene.perspectives.map((p, i) => (
              <Box
                key={i}
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: "#f5f5f5",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Stack
                  spacing={1}
                  sx={{ flexDirection: "row", alignItems: "center" }}
                >
                  <InfoChip
                    label={p.type}
                    tooltip={`Perspective lens: ${p.type}`}
                    glyph="perspective"
                    color="#7c3aed"
                  />
                  {p.likelihood && (
                    <InfoChip
                      label={p.likelihood}
                      tooltip={`Interpretation likelihood: ${p.likelihood}`}
                      color="#64748b"
                    />
                  )}
                </Stack>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {p.interpretation}
                </Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}

      {seeds.length > 0 && (
        <>
          <SectionLabel glyph="seed">Seeds · References &amp; Assets</SectionLabel>
          <Stack spacing={1}>
            {seeds.map(
              (seed) =>
                seed && (
                  <Box
                    key={seed.id}
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      bgcolor: "#fafafa",
                      border: "1px solid #eee",
                    }}
                  >
                    <Stack
                      spacing={1}
                      sx={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <InfoChip
                        label={seed.kind}
                        tooltip={`Seed type: ${seed.kind}`}
                        glyph="seed"
                        color="#2c4f76"
                      />
                      <Typography sx={{ fontWeight: 600 }}>
                        {seed.title}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {seed.body}
                    </Typography>
                  </Box>
                ),
            )}
          </Stack>
        </>
      )}

      <SectionLabel glyph="history">
        Version History {selectedScene.version ? `· v${selectedScene.version}` : ""}
      </SectionLabel>
      <HistoryTimeline
        history={selectedScene.history}
        goals={state.goals}
        max={12}
      />

      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}
