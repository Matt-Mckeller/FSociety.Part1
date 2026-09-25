"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { AISettingsPanelShell, TileContainer } from "@expanse/hud";
import { SOFT_EMERALD, SOFT_INDIGO } from "@expanse/theme";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FeaturedPlayListRoundedIcon from "@mui/icons-material/FeaturedPlayListRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  AISettingsPanel,
  ApplyPresetDialog,
  ContextBar,
  useChatInputContext,
  useContextActionBar,
  useProjects,
} from "@4eye/features";
import type { SelectedContextKey } from "@4eye/types";

import { useInk, useSurface } from "@4eye/web/components/surface";
import { CycleControl, usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";
import {
  LearningRail,
  LearningSurface,
  composerPlaceholder,
  stepPosition,
  summarizeLearningSession,
  useLearning,
  type LearningPlanInput,
} from "@4eye/web/Tiles/learning";
import { AiChatGridNav, type AiChatNavTile } from "./AiChatGridNav";
import { AiChatViewport, type ViewportPanel } from "./AiChatViewport";
import { AiChatTranscript, type AiChatMessage } from "./AiChatTranscript";
import { AiChatActionBar } from "./AiChatActionBar";
import { AiChatInputBar } from "./AiChatInputBar";
import { AiChatHeaderContextBar } from "./AiChatHeaderContextBar";
import { AiChatPipelineRailRegistrar } from "./pipelines/AiChatPipelineRailRegistrar";
import { LearnDockPanel } from "./workbench/LearnDockPanel";
import { WorkbenchDock, type DockPanelDescriptor } from "./workbench/WorkbenchDock";
import { PlanBanner, PlanScratchPad, type PlanDraft } from "./workbench/PlanScratchPad";
import {
  COMPOSER_SIZES,
  createPlanAttachment,
  downloadPlanExports,
  excerptPlanBody,
  hasPlanContent,
  loadPlanDraft,
  planDraftToProjectInput,
  savePlanDraft,
  shouldPersistPlan,
  type ComposerSize,
} from "./workbench/planExport";
import {
  DOCK_WIDTHS,
  WORKBENCH_LAYOUTS,
  type DockWidth,
  type WorkbenchLayout,
} from "./workbench/workbenchLayouts";

/**
 * The workbench's own accent pair, and the session's.
 *
 * Two rather than one because the surface has two halves that should stay
 * distinguishable at a glance: the conversation and the session that shapes it.
 * Both are anchor *pairs* (`useInk` flips which is text and which is fill per
 * mode) rather than single hexes, so neither blazes in one theme and recedes in
 * the other — the lesson the profile page's jade came out of.
 */
const WORKBENCH_ANCHORS = { color: "#242c66", accentColor: SOFT_INDIGO } as const;
const LEARN_ANCHORS = { color: "#0f5a45", accentColor: SOFT_EMERALD } as const;

const LEARN_PANEL_ID = "learn";

/**
 * AiChatDashboard — the chat and the learning session as one workbench.
 *
 * They used to be two tabs. That made the Learn tab a form you filled in and
 * then navigated away from, with no way to see it apply to anything, and it
 * gave the surface two composers — one docked in the HUD that sent messages,
 * one inside Learn whose send button cleared the draft and did nothing else.
 * Here the session is context: it rides on every message, its active step is
 * what the composer invites you to type, and sending ticks that step off.
 *
 * Three arrangements ship behind a toggle (see `workbenchLayouts.ts`), `stack`
 * being the original tabbed surface, because which one is right is a judgement
 * about real widths.
 */
export function AiChatDashboard() {
  const { summary, payload } = useChatInputContext();
  const { enabledActions } = useContextActionBar();
  const { session, dispatch } = useLearning();
  const { upsertCustomProject, updateProject, clearSelectedProjects, selectProject } =
    useProjects();
  const surface = useSurface();
  const { ink, tint } = useInk(WORKBENCH_ANCHORS);
  const accent = WORKBENCH_ANCHORS.accentColor;
  const learnAccent = LEARN_ANCHORS.accentColor;

  const [layout, setLayout] = usePersistedChoice<WorkbenchLayout>(
    "4eye.aiChat.layout.v2",
    "dock",
    WORKBENCH_LAYOUTS,
  );
  const [dockWidth, setDockWidth] = usePersistedChoice<DockWidth>(
    "4eye.aiChat.dockWidth",
    "dock",
    DOCK_WIDTHS,
  );

  const [activePanelId, setActivePanelId] = useState<string | null>(LEARN_PANEL_ID);
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [planOpen, setPlanOpen] = useState(true);
  const [planDraft, setPlanDraft] = useState<PlanDraft>({
    title: "Untitled plan",
    body: "",
    attachments: [],
  });
  const [planReady, setPlanReady] = useState(false);
  const [composerSize, setComposerSize] = usePersistedChoice<ComposerSize>(
    "4eye.aiChat.composerSize",
    "collapsed",
    COMPOSER_SIZES,
  );
  // Composer toggle states — synced to the panel selector AND the HUD orb bar.
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  /** `stack` only: which of the two full-width tabs is showing. */
  const [stackTab, setStackTab] = useState<"chat" | "learn">("chat");
  const responseTimeouts = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => () => {
    responseTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    responseTimeouts.current.clear();
  }, []);

  useEffect(() => {
    setPlanDraft(loadPlanDraft());
    setPlanReady(true);
  }, []);

  useEffect(() => {
    if (!planReady) return;
    savePlanDraft(planDraft);
    if (planDraft.id) {
      updateProject(planDraft.id, {
        name: planDraft.title.trim() || "Untitled plan",
        description: excerptPlanBody(planDraft.body),
        planBody: planDraft.body,
        planAttachments: planDraft.attachments,
      });
    }
  }, [planDraft, planReady, updateProject]);

  const stepsLeft = session.checklist.filter((c) => !c.done).length;

  /** The five context panels, plus Learn — one list, one dock. */
  const contextPanels = useMemo<DockPanelDescriptor[]>(
    () => [
      {
        id: "context-actions",
        label: "Actions",
        description: "Equipped spells from the character spell book",
        Icon: AutoStoriesRoundedIcon,
        color: "#5b21b6",
        badge: enabledActions.length || undefined,
      },
      {
        id: "plan",
        label: "Plan",
        description: "Projects & epics (PM in chat)",
        Icon: AccountTreeIcon,
        color: "#a855f7",
        disabled: true,
      },
      {
        id: "profile",
        label: "Profile",
        description: "What of you rides on the next reply",
        Icon: PersonOutlineIcon,
        color: "#94a3b8",
      },
      {
        id: "presets",
        label: "Presets",
        description: "Saved context recipes",
        Icon: BookmarksIcon,
        color: "#f43f5e",
      },
      {
        id: "sequences",
        label: "Stories",
        description: "Scene storyboards & shot sequences",
        Icon: FeaturedPlayListRoundedIcon,
        color: "#10b981",
      },
      {
        id: "settings",
        label: "AI Settings",
        description: "Model, plan mode, and chat actions",
        Icon: AutoAwesomeIcon,
        color: "#8b5cf6",
      },
    ],
    [enabledActions.length],
  );

  const learnPanel = useMemo<DockPanelDescriptor>(
    () => ({
      id: LEARN_PANEL_ID,
      label: "Learn",
      description: "The session shaping every reply",
      Icon: SchoolRoundedIcon,
      color: learnAccent,
      badge: stepsLeft || undefined,
    }),
    [learnAccent, stepsLeft],
  );

  const dockPanels = useMemo(
    () => [learnPanel, ...contextPanels],
    [learnPanel, contextPanels],
  );

  /** `split` docks Learn only; the context panels stay on the grid nav there. */
  const gridTiles = useMemo<AiChatNavTile[]>(
    () => contextPanels.map(({ id, label, description, Icon, color, disabled }) => ({
      id,
      label,
      description,
      Icon,
      color,
      disabled,
    })),
    [contextPanels],
  );

  const viewportPanel: ViewportPanel | null = useMemo(() => {
    if (!activePanelId || activePanelId === LEARN_PANEL_ID) return null;
    if (activePanelId.startsWith("entity:")) {
      const key = activePanelId.split(":")[1] as SelectedContextKey;
      return { kind: "entity", key };
    }
    if (activePanelId === "context-actions") return { kind: "context-actions" };
    if (activePanelId === "settings") return { kind: "settings" };
    if (activePanelId === "plan") return { kind: "plan" };
    if (activePanelId === "profile") return { kind: "profile" };
    if (activePanelId === "presets") return { kind: "presets" };
    if (activePanelId === "sequences") return { kind: "sequences" };
    return null;
  }, [activePanelId]);

  /**
   * The session's line, appended to the chat's own context summary. Composed
   * here rather than inside `ChatInputContextProvider` — that provider lives in
   * `@4eye/features` and composing app tile stores into it would point the
   * dependency the wrong way.
   */
  const learningSummary = useMemo(() => summarizeLearningSession(session), [session]);
  const fullSummary = useMemo(
    () => [summary, learningSummary].filter(Boolean).join(" · "),
    [summary, learningSummary],
  );
  const placeholder = useMemo(() => composerPlaceholder(session), [session]);

  const persistPlanToProjects = useCallback(
    (draft: PlanDraft): PlanDraft => {
      if (!shouldPersistPlan(draft)) return draft;
      const saved = upsertCustomProject(
        planDraftToProjectInput(draft, payload.domain.id),
      );
      clearSelectedProjects();
      selectProject(saved.id);
      return { ...draft, id: saved.id };
    },
    [upsertCustomProject, clearSelectedProjects, selectProject, payload.domain.id],
  );

  const savePlanToProjects = useCallback(() => {
    const saved = upsertCustomProject(
      planDraftToProjectInput(planDraft, payload.domain.id),
    );
    clearSelectedProjects();
    selectProject(saved.id);
    setPlanDraft({ ...planDraft, id: saved.id });
  }, [
    planDraft,
    payload.domain.id,
    upsertCustomProject,
    clearSelectedProjects,
    selectProject,
  ]);

  const handleSelectPlan = useCallback((draft: PlanDraft) => {
    setPlanDraft(draft);
    setPlanOpen(true);
  }, []);

  const handleSend = (text: string) => {
    const now = Date.now();
    const nextDraft = persistPlanToProjects({
      ...planDraft,
      body: text.trim() || planDraft.body,
    });
    setPlanDraft(nextDraft);
    savePlanDraft(nextDraft);
    downloadPlanExports({
      draft: nextDraft,
      payload,
      sessionTitle: session.title,
      stepLabel: (() => {
        const { index, total } = stepPosition(session);
        return `step ${index}/${total}`;
      })(),
    });
    const planLine = `Plan: ${nextDraft.title.trim() || "Untitled plan"}`;
    setIsLoading(true);
    setPlanOpen(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        role: "user",
        text,
        contextSummary: [fullSummary, planLine].filter(Boolean).join(" · "),
        timestamp: now,
      },
    ]);
    // Working the session is what advances it — the checklist records what you
    // did rather than waiting to be ticked by hand.
    dispatch({ type: "complete-active-step" });
    // Simulate AI response latency — replace with real streaming when backend is wired.
    const responseTimeout = setTimeout(() => {
      responseTimeouts.current.delete(responseTimeout);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          role: "assistant",
          text: "(AI response is not wired up yet — but the prompt was assembled with the context shown above.)",
          timestamp: Date.now(),
        },
      ]);
    }, 1200);
    responseTimeouts.current.add(responseTimeout);
  };

  const handleOpenKind = (kind: SelectedContextKey) =>
    setActivePanelId(`entity:${kind}`);

  const handleNewChat = () => {
    responseTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    responseTimeouts.current.clear();
    setMessages([]);
    setIsLoading(false);
    setPlanOpen(true);
  };

  const handleToggleSettings = () => {
    if (layout === "dock") {
      setActivePanelId((prev) => (prev === "settings" ? LEARN_PANEL_ID : "settings"));
      setSettingsOpen(false);
      return;
    }
    setSettingsOpen((v) => !v);
  };

  const handleOpenLearn = () => {
    if (layout === "stack") {
      setStackTab("learn");
      return;
    }
    setActivePanelId(LEARN_PANEL_ID);
    setSettingsOpen(false);
    if (layout === "dock" && dockWidth === "rail") {
      setDockWidth("dock");
    }
  };

  const learnOpen =
    layout === "stack" ? stackTab === "learn" : activePanelId === LEARN_PANEL_ID;

  const appendToPlan = (input: LearningPlanInput) => {
    if (input.kind === "text") {
      const trimmed = input.value.trim();
      if (!trimmed) return;
      setPlanDraft((d) => ({
        ...d,
        body: d.body.trim() ? `${d.body.trim()}\n\n${trimmed}` : trimmed,
      }));
      setPlanOpen(true);
      return;
    }
    const attachment = createPlanAttachment(input.kind, input.label, input.value, {
      dataUrl: input.dataUrl,
    });
    setPlanDraft((d) => ({
      ...d,
      attachments: [...(d.attachments ?? []), attachment],
    }));
    setPlanOpen(true);
  };

  const detachPlan = () => {
    setPlanOpen(false);
    setPlanDraft({ title: "Untitled plan", body: "", attachments: [] });
  };

  const showPlanPad = planOpen && messages.length === 0 && !isLoading;
  const showPlanBanner = !showPlanPad && hasPlanContent(planDraft);

  /** Chat chrome is live in every layout except the Learn tab of `stack`. */
  const chatChromeActive = layout !== "stack" || stackTab === "chat";

  const transcriptCard = (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: surface.cardBg,
        backdropFilter: "blur(12px)",
        border: "1px solid",
        borderColor: surface.dividerBorder,
        borderRadius: 2,
        px: 1.5,
      }}
    >
      {showPlanPad ? (
        <PlanScratchPad
          draft={planDraft}
          onChange={setPlanDraft}
          onClose={() => setPlanOpen(false)}
          onSave={savePlanToProjects}
        />
      ) : (
        <AiChatTranscript
          messages={messages}
          isLoading={isLoading}
          onOpenPlan={() => setPlanOpen(true)}
          planButtonLabel={
            hasPlanContent(planDraft)
              ? `Plan · ${planDraft.title.trim() || "Untitled plan"}`
              : "Plan document"
          }
          banner={
            showPlanBanner ? (
              <PlanBanner
                draft={planDraft}
                onChange={setPlanDraft}
                onDetach={detachPlan}
                onSave={savePlanToProjects}
              />
            ) : undefined
          }
        />
      )}
    </Box>
  );

  const settingsPanel = (
    <AnimatePresence initial={false}>
      {settingsOpen && (
        <motion.div
          key="ai-settings-panel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <AISettingsPanelShell>
            <AISettingsPanel />
          </AISettingsPanelShell>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /** The drop-in panel above the transcript — `split` and `stack` only. */
  const dropPanel = (
    <AnimatePresence initial={false}>
      {viewportPanel && (
        <motion.div
          key={activePanelId}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ overflow: "hidden" }}
        >
          <Box
            sx={{
              maxHeight: 320,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid",
              borderColor: surface.dividerBorder,
              bgcolor: surface.cardBg,
              backdropFilter: "blur(10px)",
            }}
          >
            <AiChatViewport panel={viewportPanel} onNewChat={handleNewChat} />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const dockBody =
    activePanelId === LEARN_PANEL_ID || !viewportPanel ? (
      <LearnDockPanel accent={learnAccent} onSaveToPlan={appendToPlan} />
    ) : (
      <AiChatViewport panel={viewportPanel} onNewChat={handleNewChat} />
    );

  return (
    <>
      {/* Chat-mode-only HUD chrome registrars */}
      {chatChromeActive && (
        <>
          {/* HUD right-rail FAB — chat actions fan out around a chat button */}
          <AiChatActionBar
            onNewChat={handleNewChat}
            onToggleSettings={handleToggleSettings}
            onToggleContext={() => setContextOpen((v) => !v)}
            settingsOpen={layout === "dock" ? activePanelId === "settings" : settingsOpen}
            contextOpen={contextOpen}
          />

          {/* HUD AI input bar — [Actors][Composer][Targets][Audiences] */}
          <AiChatInputBar
            onSend={handleSend}
            onToggleSettings={handleToggleSettings}
            onToggleContext={() => setContextOpen((v) => !v)}
            settingsOpen={layout === "dock" ? activePanelId === "settings" : settingsOpen}
            contextOpen={contextOpen}
            onOpenAudiences={() => handleOpenKind("audiences")}
            onOpenLearn={handleOpenLearn}
            learnOpen={learnOpen}
            disabled={isLoading || activePanelId === "plan"}
            learningSummary={learningSummary}
            placeholder={activePanelId === "plan" ? "Plan is not ready yet" : placeholder}
            planText={planDraft.body}
            onPlanTextChange={(body) => setPlanDraft((d) => ({ ...d, body }))}
            composerExpanded={composerSize === "expanded"}
            onToggleComposerExpand={() =>
              setComposerSize(composerSize === "expanded" ? "collapsed" : "expanded")
            }
          />

          {/* HUD top-center context picker (Domains / Goals / Projects) */}
          <AiChatHeaderContextBar onSelectPlan={handleSelectPlan} />

          {/* HUD left rail — pipeline layers pill (sits below the spellbook) */}
          <AiChatPipelineRailRegistrar />
        </>
      )}

      {/* Page body — bounded by HUD insets via TileContainer mode="fit" */}
      <TileContainer
        mode="fit"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1.5,
          minHeight: 0,
          // Follows the app's theme instead of forcing a dark page that made
          // every panel inside it render as a white island.
          background: `linear-gradient(150deg, ${alpha(tint, 0.18)} 0%, ${surface.panelWash} 46%, ${surface.panelWash} 100%)`,
        }}
      >
        {/* Surface chrome: what this is, and how it is arranged. */}
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, flexShrink: 0 }}>
          {layout === "stack" ? (
            <StackTabs tab={stackTab} onChange={setStackTab} accent={accent} learnAccent={learnAccent} />
          ) : (
            <Tooltip
              title="A screen for creating and sending commands and plans"
              arrow
            >
              <Typography
                sx={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: ink,
                  whiteSpace: "nowrap",
                  cursor: "help",
                }}
              >
                AI Chat Command Center
              </Typography>
            </Tooltip>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 0.75,
              minWidth: 0,
              px: 0.75,
              py: 0.35,
              borderLeft: `2px solid ${alpha(learnAccent, 0.7)}`,
            }}
          >
            <Typography
              sx={{
                flexShrink: 0,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: learnAccent,
              }}
            >
              Session
            </Typography>
            <Typography
              sx={{
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 11,
                fontWeight: 800,
                color: surface.text.hi,
              }}
            >
              {session.title}
            </Typography>
          </Box>
          <Box
            aria-hidden
            sx={{
              flex: 1,
              height: "1px",
              background: `linear-gradient(90deg, ${alpha(accent, 0.4)}, transparent)`,
            }}
          />
          {/* In `stack` the session has no column of its own, so its metrics ride here. */}
          {layout === "stack" && stackTab === "chat" && (
            <LearningRail accent={learnAccent} orientation="horizontal" />
          )}
          <CycleControl
            label="Layout"
            value={layout}
            options={WORKBENCH_LAYOUTS}
            accent={accent}
            onChange={setLayout}
          />
        </Stack>

        {layout === "stack" ? (
          /* ── stack: the original two full-width tabs ── */
          stackTab === "learn" ? (
            <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
              <LearningSurface />
            </Box>
          ) : (
            <>
              <AiChatGridNav
                tiles={gridTiles}
                activeTileId={activePanelId}
                onSelectTile={(id) =>
                  setActivePanelId((prev) => (prev === id ? null : id))
                }
              />
              {dropPanel}
              {transcriptCard}
              <ContextBar onOpenKind={handleOpenKind} />
              {settingsPanel}
            </>
          )
        ) : (
          /* ── dock / split: transcript beside a dock ── */
          <Stack sx={{ flexDirection: "row", gap: 1, flex: 1, minHeight: 0 }}>
            <Stack sx={{ flex: 1, minWidth: 0, minHeight: 0, gap: 1 }}>
              {layout === "split" && (
                <>
                  <AiChatGridNav
                    tiles={gridTiles}
                    activeTileId={activePanelId}
                    onSelectTile={(id) =>
                      setActivePanelId((prev) => (prev === id ? null : id))
                    }
                  />
                  {dropPanel}
                </>
              )}
              {transcriptCard}
              <ContextBar onOpenKind={handleOpenKind} />
              {layout !== "dock" && settingsPanel}
            </Stack>

            <WorkbenchDock
              // `split` keeps the context panels on the grid nav above the
              // transcript, so the dock there is the session and nothing else.
              panels={layout === "split" ? [learnPanel] : dockPanels}
              activePanelId={layout === "split" ? LEARN_PANEL_ID : activePanelId}
              // In `split` the dock holds one panel and always shows it, so its
              // selector has nothing to select — clicking it would otherwise
              // deselect whichever context panel is open above the transcript.
              onSelectPanel={layout === "split" ? () => {} : setActivePanelId}
              width={dockWidth}
              onWidthChange={setDockWidth}
              accent={accent}
            >
              {layout === "split" ? (
                <LearnDockPanel accent={learnAccent} onSaveToPlan={appendToPlan} />
              ) : (
                dockBody
              )}
            </WorkbenchDock>
          </Stack>
        )}
      </TileContainer>

      {/* Apply Preset dialog — rendered outside TileContainer so it's above all HUD layers */}
      {chatChromeActive && <ApplyPresetDialog />}
    </>
  );
}

/** The Chat | Learn tabs, kept for the `stack` layout only. */
function StackTabs({
  tab,
  onChange,
  accent,
  learnAccent,
}: {
  tab: "chat" | "learn";
  onChange: (t: "chat" | "learn") => void;
  accent: string;
  learnAccent: string;
}) {
  const surface = useSurface();
  const tabs = [
    { id: "chat" as const, label: "Chat", color: accent },
    { id: "learn" as const, label: "Learn", color: learnAccent },
  ];

  return (
    <Stack sx={{ flexDirection: "row", gap: 0.5, flexShrink: 0 }}>
      {tabs.map((t) => {
        const active = tab === t.id;
        const tabInk = surface.ink(t.color);
        return (
          <Box
            key={t.id}
            role="tab"
            tabIndex={0}
            aria-selected={active}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onChange(t.id);
              }
            }}
            sx={{
              px: 1.5,
              py: 0.4,
              borderRadius: 1.5,
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "1px solid",
              borderColor: active ? alpha(t.color, 0.7) : surface.dividerBorder,
              color: active ? tabInk : surface.text.lo,
              bgcolor: active ? alpha(t.color, 0.12) : "transparent",
              transition: "all 120ms ease",
              "&:hover": { borderColor: alpha(t.color, 0.6), color: tabInk },
              "&:focus-visible": { outline: `2px solid ${tabInk}`, outlineOffset: 2 },
            }}
          >
            {t.label}
          </Box>
        );
      })}
    </Stack>
  );
}
