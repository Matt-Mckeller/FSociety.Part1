"use client";

/**
 * Create — interactive Storybook for the Create Tile.
 *
 * The Create workspace is centred on the active Project ("Animation").
 *
 * Tile-level variants:
 *   - FullTile:           the whole Create screen (header + viz rail + panes).
 *   - SceneDetailPane:    just the right pane (prompts/goals/seeds).
 *   - SceneMapPanel:      spatial minimap navigation over scenes.
 *   - ProjectPulse:       the data-viz rail (status + goal coverage).
 *   - ReportLensPanel:    Report-entity lens (symbols/connections/…).
 *   - SendToChatDemo:     the single "send to 4eye chat" affordance.
 *   - GoalInheritance:    same goal at sequence vs scene level (override demo).
 *
 * LinkCard (GoalLinkCard) variants:
 *   - LinkCardCollapsed / LinkCardExpanded / LinkCardStates / LinkCardWithImage
 *   - DepthTierScale:     all 7 depth tiers.
 *
 * White background per project Storybook conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Paper, Stack, Typography } from "@mui/material";

import CreateTile from "./CreateTile";
import { GoalLinkCard } from "./components/GoalLinkCard";
import { SceneDetail } from "./components/SceneDetail";
import { BrandIcon } from "./components/BrandIcon";
import { HistoryTimeline } from "./components/HistoryTimeline";
import { ContextBar } from "./components/ContextBar";
import type {
  ContextSegment,
  PipelineStep,
} from "./components/ContextBar";
import { SceneMap } from "./components/SceneMap";
import { ProjectOverview } from "./components/ProjectOverview";
import { ReportLens } from "./components/ReportLens";
import { SendToChatButton, SendToChatProvider } from "./chat/SendToChat";
import { GLYPH_MARKUP, type GlyphName } from "./components/brand-glyphs";
import {
  DepthDots,
  InfoChip,
  MediumChip,
  StatusBadge,
  WeightMeter,
} from "./components/visuals";
import { ActionBar } from "./components/ActionBar";
import { CreateProvider } from "./store/CreateProvider";
import { initialCreateState } from "./store/SeedStore";
import { goalImage } from "./store/goal-image";
import {
  DEPTH_TIERS,
  type ChangeEvent,
  type Goal,
  type ResolvedGoalLink,
} from "./model/types";

const WHITE_BG = {
  backgrounds: {
    default: "white",
    values: [{ name: "white", value: "#ffffff" }],
  },
};

const meta: Meta = {
  title: "Tiles/Create",
  parameters: { ...WHITE_BG, layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

// ── shared sample data ───────────────────────────────────────────────────────
const growGoal: Goal = {
  id: "g",
  slug: "goal-grow",
  type: "goal",
  symbol: "🌱",
  glyph: "grow",
  title: "Grow",
  focusArea: "Vision",
  imageUrl: goalImage({ glyph: "grow", from: "#34d399", to: "#059669" }),
};

function link(overrides: Partial<ResolvedGoalLink> = {}): ResolvedGoalLink {
  return {
    goalId: "g",
    toId: "scene",
    toType: "scene",
    weight: 90,
    depth: 5,
    goal: growGoal,
    inherited: false,
    ...overrides,
  };
}

function Frame({ children }: { children: React.ReactNode }) {
  return <Box sx={{ maxWidth: 560, p: 2, bgcolor: "#ffffff" }}>{children}</Box>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tile-level
// ─────────────────────────────────────────────────────────────────────────────
export const FullTile: Story = { render: () => <CreateTile /> };

export const SceneDetailPane: Story = {
  render: () => (
    <Box sx={{ maxWidth: 640, p: 2, bgcolor: "#ffffff" }}>
      <CreateProvider initialState={initialCreateState()}>
        <Paper elevation={0} sx={{ border: "1px solid #f0f0f0" }}>
          <SceneDetail />
        </Paper>
      </CreateProvider>
    </Box>
  ),
};

export const SceneMapPanel: Story = {
  name: "Scene map (minimap navigation)",
  render: () => (
    <Box sx={{ maxWidth: 360, p: 2, bgcolor: "#ffffff" }}>
      <CreateProvider initialState={initialCreateState()}>
        <SceneMap height={220} />
      </CreateProvider>
    </Box>
  ),
};

export const ProjectPulse: Story = {
  name: "Project pulse (data-viz rail)",
  render: () => (
    <Box sx={{ maxWidth: 720, p: 2, bgcolor: "#ffffff" }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        At-a-glance read of the active project: scene/sequence counts, live %,
        scene-status distribution, and top goals by aggregated weight.
      </Typography>
      <CreateProvider initialState={initialCreateState()}>
        <ProjectOverview />
      </CreateProvider>
    </Box>
  ),
};

export const ReportLensPanel: Story = {
  name: "Report lens (browsable entities)",
  render: () => (
    <Box sx={{ maxWidth: 360, p: 2, bgcolor: "#ffffff" }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Report entities (symbols, connections, communications, perspectives)
        that feed the animation. Each row hands off to 4eye chat.
      </Typography>
      <SendToChatProvider>
        <ReportLens defaultOpen />
      </SendToChatProvider>
    </Box>
  ),
};

export const SendToChatDemo: Story = {
  name: "Send to 4eye chat (affordance)",
  render: () => (
    <Box sx={{ maxWidth: 420, p: 2, bgcolor: "#ffffff" }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        The single reusable hand-off button (plan §4.1). Click logs a
        <code> 4eye:chat:send </code> event — the host app binds a real handler.
      </Typography>
      <SendToChatProvider>
        <Stack spacing={1.5} sx={{ flexDirection: "row", alignItems: "center" }}>
          <SendToChatButton
            item={{ kind: "scene", id: "demo-scene", label: "Scene 1 — Classroom Awakening", glyph: "scene" }}
          />
          <SendToChatButton
            item={{ kind: "goal", id: "demo-goal", label: "Grow", glyph: "grow" }}
          />
          <SendToChatButton
            item={{ kind: "report:symbol", id: "demo-symbol", label: "The Eye", glyph: "perspective" }}
          />
          <Typography variant="caption" color="text.secondary">
            scene · goal · symbol
          </Typography>
        </Stack>
      </SendToChatProvider>
    </Box>
  ),
};

export const GoalInheritance: Story = {
  render: () => {
    const state = initialCreateState();
    state.selectedSceneId = state.scenes[2]?.id; // Scene 3 — deep Grow override
    return (
      <Box sx={{ maxWidth: 640, p: 2, bgcolor: "#ffffff" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Scene 3 overrides the sequence-level “Grow” goal to weight 95 /
          depth 7. Sequence-only goals (e.g. Trust) appear marked
          <em> inherited</em>.
        </Typography>
        <CreateProvider initialState={state}>
          <Paper elevation={0} sx={{ border: "1px solid #f0f0f0" }}>
            <SceneDetail />
          </Paper>
        </CreateProvider>
      </Box>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LinkCard — collapsed (default dense row)
// ─────────────────────────────────────────────────────────────────────────────
export const LinkCardCollapsed: Story = {
  render: () => (
    <Frame>
      <Typography variant="overline" color="text.secondary">
        Collapsed · click a row to expand
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }}>
        <GoalLinkCard
          link={link({
            weight: 100,
            depth: 3,
            instructions: "Make Grow the dominant read.",
            associations: [{ label: "Seed: style ref", glyph: "seed" }],
          })}
        />
        <GoalLinkCard
          link={link({
            goalId: "t",
            weight: 60,
            depth: 4,
            inherited: true,
            goal: {
              ...growGoal,
              id: "t",
              title: "Build Trust",
              symbol: "🤝",
              glyph: "trust",
              focusArea: "Trust",
            },
          })}
        />
      </Stack>
    </Frame>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// LinkCard — expanded (instructions + associations visible)
// ─────────────────────────────────────────────────────────────────────────────
export const LinkCardExpanded: Story = {
  render: () => (
    <Frame>
      <GoalLinkCard
        defaultExpanded
        link={link({
          weight: 95,
          depth: 7,
          instructions:
            "Neural-sea dream sequence — push depth to Profound; abstract, embedded-data environment, emotional payoff.",
          associations: [
            { label: "Mood: hopeful", glyph: "grow", tone: "success", tooltip: "Emotional target for the close" },
            { label: "Perspective: business", glyph: "perspective", tone: "info", tooltip: "Targets the business interpretation" },
            { label: "Brand: 4ear", glyph: "trust", tooltip: "Aligned to the 4ear brand system" },
          ],
        })}
      />
    </Frame>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// LinkCard — states (all expanded for comparison)
// ─────────────────────────────────────────────────────────────────────────────
export const LinkCardStates: Story = {
  render: () => (
    <Frame>
      <Stack spacing={2}>
        <Typography variant="overline" color="text.secondary">
          Override (scene-level, editable)
        </Typography>
        <GoalLinkCard
          defaultExpanded
          link={link({ weight: 100, depth: 3, instructions: "Scene-level override." })}
        />
        <Typography variant="overline" color="text.secondary">
          Inherited (from sequence)
        </Typography>
        <GoalLinkCard defaultExpanded link={link({ weight: 60, depth: 4, inherited: true })} />
        <Typography variant="overline" color="text.secondary">
          Read-only
        </Typography>
        <GoalLinkCard
          defaultExpanded
          editable={false}
          link={link({ weight: 85, depth: 5, instructions: "Locked preview — controls disabled." })}
        />
      </Stack>
    </Frame>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// LinkCard — real image avatar + real asset-thumbnail badge
// (the one real asset that ships is public/videos/intro-opener.mp4)
// ─────────────────────────────────────────────────────────────────────────────
export const LinkCardWithImage: Story = {
  render: () => (
    <Frame>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        The avatar renders a real generated <code>&lt;img&gt;</code> from{" "}
        <code>goal.imageUrl</code> (deterministic SVG crest per goal). Badges
        can also carry asset references.
      </Typography>
      <GoalLinkCard
        defaultExpanded
        link={link({
          goal: {
            ...growGoal,
            imageUrl: goalImage({ glyph: "grow", from: "#34d399", to: "#059669" }),
          },
          instructions: "Demonstrates the real-image avatar slot + asset badge.",
          associations: [
            {
              label: "intro-opener.mp4",
              symbol: "🎬",
              glyph: "sequence",
              tooltip: "Real asset: public/videos/intro-opener.mp4",
            },
          ],
        })}
      />
    </Frame>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Depth tier scale (1–7)
// ─────────────────────────────────────────────────────────────────────────────
export const DepthTierScale: Story = {
  render: () => (
    <Frame>
      <Typography variant="overline" color="text.secondary">
        Depth tiers
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }}>
        {[1, 2, 3, 4, 5, 6, 7].map((tier) => (
          <GoalLinkCard
            key={tier}
            editable={false}
            link={link({
              depth: tier,
              weight: 70,
              goal: { ...growGoal, title: `${DEPTH_TIERS[tier]} (tier ${tier})` },
            })}
          />
        ))}
      </Stack>
    </Frame>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Visual vocabulary — the shared primitives used everywhere, in one place.
// ─────────────────────────────────────────────────────────────────────────────
export const VisualVocabulary: Story = {
  render: () => (
    <Frame>
      <Typography variant="overline" color="text.secondary">
        WeightMeter · importance 0–100 (gray → amber → blue → green)
      </Typography>
      <Stack spacing={1} sx={{ mt: 1, mb: 2 }}>
        {[15, 45, 70, 90, 100].map((w) => (
          <WeightMeter key={w} weight={w} width={140} />
        ))}
      </Stack>

      <Typography variant="overline" color="text.secondary">
        DepthDots · treatment depth 1–7 (light → dark)
      </Typography>
      <Stack spacing={1} sx={{ mt: 1, mb: 2 }}>
        {[1, 3, 5, 7].map((d) => (
          <Stack
            key={d}
            spacing={1}
            sx={{ flexDirection: "row", alignItems: "center" }}
          >
            <DepthDots depth={d} />
            <Typography variant="caption" color="text.secondary">
              tier {d}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Typography variant="overline" color="text.secondary">
        StatusBadge · draft / sequence / live
      </Typography>
      <Stack
        spacing={1}
        sx={{ mt: 1, flexDirection: "row", alignItems: "center" }}
      >
        <StatusBadge status="draft" />
        <StatusBadge status="sequence" />
        <StatusBadge status="live" />
      </Stack>

      <Typography variant="overline" color="text.secondary" sx={{ display: "block", mt: 2 }}>
        InfoChip · tooltip-backed metadata pill (hover for context)
      </Typography>
      <Stack
        spacing={1}
        useFlexGap
        sx={{ mt: 1, flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}
      >
        <InfoChip label="v6" tooltip="Current version" glyph="history" color="#64748b" />
        <InfoChip label="criminal" tooltip="Perspective lens" glyph="perspective" color="#7c3aed" />
        <InfoChip label="reference" tooltip="Seed type" glyph="seed" color="#2c4f76" />
        <InfoChip label="high" tooltip="Likelihood" color="#2e7d32" />
      </Stack>

      <Typography variant="overline" color="text.secondary" sx={{ display: "block", mt: 2 }}>
        MediumChip · project medium (animation / video / image / audio)
      </Typography>
      <Stack
        spacing={1}
        useFlexGap
        sx={{ mt: 1, flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}
      >
        <MediumChip medium="animation" />
        <MediumChip medium="video" />
        <MediumChip medium="image" />
        <MediumChip medium="audio" />
      </Stack>
    </Frame>
  ),
};

// ─────────────────────────────────────────────────────────────────
// ActionBar — primary Generate + optional Send & run + secondary icon actions.
// ─────────────────────────────────────────────────────────────────
export const ActionRow: Story = {
  name: "Action bar (generate / send & run / promote)",
  render: () => {
    const goals = [
      link({ weight: 90, depth: 5 }),
      link({
        goalId: "t",
        weight: 60,
        depth: 4,
        goal: { ...growGoal, id: "t", title: "Build Trust", glyph: "trust" },
      }),
    ];
    const noop = () => {};
    return (
      <Frame>
        <Typography variant="overline" color="text.secondary">
          Draft · with “Send & run” (hands scene + context to chat)
        </Typography>
        <Box sx={{ mt: 1, mb: 3 }}>
          <ActionBar
            status="draft"
            goals={goals}
            version={4}
            onPromote={noop}
            onGenerate={noop}
            onGenerateForGoal={noop}
            onSendToChat={noop}
          />
        </Box>

        <Typography variant="overline" color="text.secondary">
          In sequence · generate-only (no chat hand-off)
        </Typography>
        <Box sx={{ mt: 1, mb: 3 }}>
          <ActionBar
            status="sequence"
            goals={goals}
            version={7}
            onPromote={noop}
            onGenerate={noop}
            onGenerateForGoal={noop}
          />
        </Box>

        <Typography variant="overline" color="text.secondary">
          Live · no further promotion, no goals
        </Typography>
        <Box sx={{ mt: 1 }}>
          <ActionBar
            status="live"
            goals={[]}
            version={12}
            onPromote={noop}
            onGenerate={noop}
            onGenerateForGoal={noop}
          />
        </Box>
      </Frame>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Brand icons — custom company glyphs that replace emoji across the tile.
// ─────────────────────────────────────────────────────────────────────────────
export const BrandIcons: Story = {
  render: () => {
    const names = Object.keys(GLYPH_MARKUP) as GlyphName[];
    return (
      <Frame>
        <Typography sx={{ fontFamily: "Xpens, Roboto, sans-serif", fontWeight: 700, mb: 0.5 }}>
          Custom branded icons (Xpens type · currentColor SVG)
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
          One source of truth (brand-glyphs) — used inline and baked into goal crests.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 1.5,
          }}
        >
          {names.map((name) => (
            <Stack
              key={name}
              spacing={1}
              sx={{
                alignItems: "center",
                p: 1.5,
                borderRadius: 2,
                bgcolor: "#f5f5f5",
                border: "1px solid #e0e0e0",
              }}
            >
              <BrandIcon name={name} size={30} color="#2c4f76" />
              <Typography variant="caption" color="text.secondary">
                {name}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Typography variant="overline" color="text.secondary" sx={{ display: "block", mt: 3, mb: 1 }}>
          Color inherits from text
        </Typography>
        <Stack spacing={2} sx={{ flexDirection: "row", alignItems: "center" }}>
          <Box sx={{ color: "#34d399" }}><BrandIcon name="grow" size={28} /></Box>
          <Box sx={{ color: "#2563eb" }}><BrandIcon name="trust" size={28} /></Box>
          <Box sx={{ color: "#d97706" }}><BrandIcon name="engagement" size={28} /></Box>
          <Box sx={{ color: "#7c3aed" }}><BrandIcon name="connection" size={28} /></Box>
        </Stack>
      </Frame>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Version history — the audit log / versioning timeline for an item.
// ─────────────────────────────────────────────────────────────────────────────
export const VersionHistory: Story = {
  render: () => {
    const now = Date.now();
    const at = (mins: number) => new Date(now - mins * 60_000).toISOString();
    const history: ChangeEvent[] = [
      { id: "v1", at: at(60 * 24 * 6), actor: "you", kind: "created", summary: "Scene created from the See cut" },
      { id: "v2", at: at(60 * 24 * 4), actor: "you", kind: "goal-linked", summary: "Linked goal “Engagement”", goalId: "g" },
      { id: "v3", at: at(60 * 24 * 2), actor: "you", kind: "edited", summary: "Refined prompt scripts (lens + growth motif)" },
      { id: "v4", at: at(60 * 5), actor: "ai-pipeline", kind: "generated", summary: "Generated toward “Grow”", goalId: "g" },
      { id: "v5", at: at(20), actor: "you", kind: "promoted", summary: "Promoted draft → sequence", fromStatus: "draft", toStatus: "sequence" },
    ];
    return (
      <Frame>
        <Stack spacing={1} sx={{ flexDirection: "row", alignItems: "center", mb: 2 }}>
          <BrandIcon name="history" size={18} color="#2c4f76" />
          <Typography sx={{ fontFamily: "Xpens, Roboto, sans-serif", fontWeight: 700 }}>
            Version History · v6
          </Typography>
        </Stack>
        <HistoryTimeline history={history} goals={[growGoal]} />
      </Frame>
    );
  },
};

// ─────────────────────────────────────────────────────────────────
// ContextBar — selection breadcrumb + action pipeline (HUD header strip).
// ─────────────────────────────────────────────────────────────────
export const ContextBarStrip: Story = {
  render: () => {
    const context: ContextSegment[] = [
      {
        id: "seq",
        glyph: "sequence",
        label: "Opening: The See",
        detail: "5 scenes · In Sequence",
        color: "#2c4f76",
      },
      {
        id: "scene",
        glyph: "scene",
        label: "Scene 1 · Diamond Man",
        detail: "Draft · v4",
        color: "#1976d2",
      },
    ];
    const steps: PipelineStep[] = [
      { id: "browse", label: "Browse", glyph: "sequence", status: "done", detail: "Selected sequence + scene" },
      { id: "seed", label: "Seed", glyph: "seed", status: "done", detail: "Prompts & goals tuned" },
      { id: "generate", label: "Generate", glyph: "generate", status: "active", detail: "Running goal-directed generation" },
      { id: "review", label: "Review", glyph: "perspective", status: "upcoming", detail: "Review against goals" },
      { id: "promote", label: "Promote", glyph: "promote", status: "upcoming", detail: "Advance draft → sequence → live" },
    ];
    return (
      <Box sx={{ p: 2, bgcolor: "#ffffff" }}>
        <ContextBar
          eyebrow="Current context"
          context={context}
          steps={steps}
        />
      </Box>
    );
  },
};

