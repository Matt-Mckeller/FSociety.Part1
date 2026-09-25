"use client";

import { useCallback, useRef, useState, useMemo, type ReactNode } from "react";
import { Box, ButtonBase, ClickAwayListener, Popper, Tooltip, Typography, alpha } from "@mui/material";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { DEFAULT_BOTTOM_BAR_ORDER, useRegisterBottomBar, useRegisterHudChromeHide } from "@expanse/hud";
import {
  AimReticle,
  ContextSourcesPicker,
  ENTITY_ICONS,
  FitHalo,
  TargetingPanelView,
  includedTargets,
  useAISettings,
  useChatInputContext,
  useContextData,
  useTargeting,
} from "@4eye/features";
import {
  AUDIENCE_CAST_META,
  INCLUDED_CAST_META,
  TARGET_ROLE_META,
  type Audience,
} from "@4eye/types";
import { usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";
import { AiChatComposer } from "./AiChatComposer";
import { AudienceLayerStack } from "./workbench/AudienceLayerStack";

const WhoIcon = ENTITY_ICONS.targets;

/**
 * How much of the bar is showing.
 *
 * `full` is the original: who acts, who else, composer, and aim all
 * expanded and flanking each other. It is the right thing when you are
 * deliberately setting up who is speaking to whom, and it is a lot of
 * chrome to keep on screen the rest of the time.
 *
 * `simple` keeps the composer and reduces the three relations to chips
 * flanking it, tops aligned with the input. Aim is the cursor. Who else
 * is the room we are fitting into. Included only appears when targets
 * ride along without being the focus.
 */
const CHAT_BAR_MODES = ["simple", "full"] as const;
type ChatBarMode = (typeof CHAT_BAR_MODES)[number];

interface AiChatInputBarProps {
  onSend: (text: string) => void;
  onToggleSettings: () => void;
  onToggleContext: () => void;
  settingsOpen: boolean;
  contextOpen: boolean;
  /** Open the Audiences entity panel in the dashboard. */
  onOpenAudiences: () => void;
  /** Open the Learn dock panel / Learn tab. */
  onOpenLearn: () => void;
  /** Whether the Learn panel is currently showing. */
  learnOpen?: boolean;
  /** Disables the composer while the AI is generating a response. */
  disabled?: boolean;
  /**
   * The learning session's contribution to the context summary, e.g.
   * "Super Sonic · 200 APM · auto · 3 modalities · step 3/5". Passed in rather than read
   * from a hook because it is composed in the app layer — `ChatInputContext`
   * lives in `@4eye/features` and does not know about this app's tile stores.
   */
  learningSummary?: string;
  /** What the composer invites you to type — the session's active step. */
  placeholder?: string;
  /** Plan notes — typing here writes the document. */
  planText: string;
  onPlanTextChange: (next: string) => void;
  composerExpanded: boolean;
  onToggleComposerExpand: () => void;
}

/**
 * AiChatInputBar — registers a custom HUD bottom bar that flanks the
 * AI chat composer with Actor, Who else, and Aim.
 * Flow: who acts → who else we fit into → composer → the cursor on the aim.
 * Cast columns share a top edge with the composer so expand/collapse
 * never shoves Actors, Who else, or Aim.
 * Included targets ride on the aim side without taking the cursor.
 *
 * Hides the default `aiInputBar` chrome so this bar replaces it,
 * and registers itself at the same `aiInput` slot order so it sits
 * in the standard bottom-bar stack.
 *
 * The registered `node` is rendered at the HUD slot location, which
 * is *outside* the AiChat provider tree — so we capture every piece
 * of state via hooks here and pass it down via props to presentational
 * components (`TargetingPanelView`, `AiChatComposer`).
 *
 * Renders nothing in the DOM directly.
 */
export function AiChatInputBar({
  onSend,
  onToggleSettings,
  onToggleContext,
  settingsOpen,
  contextOpen,
  onOpenAudiences,
  onOpenLearn,
  learnOpen = false,
  disabled = false,
  learningSummary = "",
  placeholder,
  planText,
  onPlanTextChange,
  composerExpanded,
  onToggleComposerExpand,
}: AiChatInputBarProps) {
  // Hide the default AIInputBar — we replace it with the flanking version.
  useRegisterHudChromeHide({
    id: "ai-chat-hide-default-input",
    hide: ["aiInputBar"],
    label: "AI chat replaces default AI input bar",
  });

  const { targets, audiences, selectedContext, toggleSelect } = useContextData();
  const {
    resolvedActors,
    resolvedTargets,
    addAssignment,
    removeAssignment,
    isAssigned,
  } = useTargeting();
  const { summary, clearAll } = useChatInputContext();
  const { settings: aiSettings, toggleContextSource } = useAISettings();

  // Context sources popover anchor
  const contextAnchorRef = useRef<HTMLDivElement | null>(null);
  const [contextPickerOpen, setContextPickerOpen] = useState(false);
  const handleToggleContextPicker = useCallback(() => {
    setContextPickerOpen((v) => !v);
  }, []);
  const handleCloseContextPicker = useCallback(() => {
    setContextPickerOpen(false);
  }, []);

  // Defaults to simple. The bar is docked to every page, so the expanded
  // targeting panels should be something you opt into for a session where you
  // are actually wiring up actors and aims.
  const [mode, setMode] = usePersistedChoice<ChatBarMode>(
    "4eye.aiChat.barMode",
    "simple",
    CHAT_BAR_MODES,
  );

  const selectedAudiences = useMemo<Audience[]>(
    () =>
      selectedContext.audiences
        .map((id) => audiences.find((a) => a.id === id))
        .filter((a): a is Audience => Boolean(a)),
    [audiences, selectedContext.audiences],
  );

  const aimed = useMemo(
    () => resolvedTargets.map((r) => r.target),
    [resolvedTargets],
  );
  const selectedTargetEntities = useMemo(
    () =>
      selectedContext.targets
        .map((id) => targets.find((t) => t.id === id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t)),
    [selectedContext.targets, targets],
  );
  const included = useMemo(
    () => includedTargets(selectedTargetEntities, aimed),
    [selectedTargetEntities, aimed],
  );

  const availableForActors = useMemo(
    () => targets.filter((t) => !isAssigned("actor", t.id)),
    [targets, isAssigned],
  );
  const availableForTargets = useMemo(
    () => targets.filter((t) => !isAssigned("target", t.id)),
    [targets, isAssigned],
  );

  // The strip above the pill states everything riding on the next message, so
  // the session belongs in it alongside the domain, goals and entities.
  const fullSummary = useMemo(
    () => [summary, learningSummary].filter(Boolean).join(" · "),
    [summary, learningSummary],
  );

  // Count of active context sources — drives the dot badge on the Context button.
  const activeSourceCount = useMemo(() => {
    return Object.values(aiSettings.contextSources).filter(Boolean).length;
  }, [aiSettings.contextSources]);

  const composer = useMemo(
    () => (
      <Box ref={contextAnchorRef} sx={{ position: "relative", flex: 1, minWidth: 0, maxWidth: 640 }}>
        <AiChatComposer
          onSend={onSend}
          value={planText}
          onChange={onPlanTextChange}
          summary={fullSummary}
          onClearAll={clearAll}
          onToggleSettings={onToggleSettings}
          onToggleContext={handleToggleContextPicker}
          onOpenLearn={onOpenLearn}
          settingsOpen={settingsOpen}
          contextOpen={contextPickerOpen}
          learnOpen={learnOpen}
          contextSourceCount={activeSourceCount}
          disabled={disabled}
          placeholder={placeholder}
          expanded={composerExpanded}
          onToggleExpand={onToggleComposerExpand}
        />
        <Popper
          open={contextPickerOpen}
          anchorEl={contextAnchorRef.current}
          placement="top-start"
          modifiers={[
            { name: "offset", options: { offset: [0, 6] } },
            { name: "preventOverflow", options: { padding: 8 } },
          ]}
          sx={{ zIndex: (t) => t.zIndex.modal }}
        >
          <ClickAwayListener onClickAway={handleCloseContextPicker}>
            <Box>
              <ContextSourcesPicker
                sources={aiSettings.contextSources}
                onToggle={toggleContextSource}
              />
            </Box>
          </ClickAwayListener>
        </Popper>
      </Box>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSend, fullSummary, clearAll, onToggleSettings, onOpenLearn, handleToggleContextPicker, handleCloseContextPicker, settingsOpen, contextPickerOpen, learnOpen, activeSourceCount, aiSettings.contextSources, toggleContextSource, disabled, placeholder, planText, onPlanTextChange, composerExpanded, onToggleComposerExpand],
  );

  const node = useMemo(
    () =>
      mode === "simple" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 0.75,
            width: "100%",
            maxWidth: 880,
            mx: "auto",
            px: 1,
            pb: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5, flexShrink: 0, pt: 0 }}>
            <CastSlot
              label={TARGET_ROLE_META.actor.pluralLabel}
              count={resolvedActors.length}
              color={TARGET_ROLE_META.actor.color}
              emptyHint={TARGET_ROLE_META.actor.hint}
              filledHint={TARGET_ROLE_META.actor.hint}
              onClick={() => setMode("full")}
              icon={<WhoIcon sx={{ fontSize: 12 }} />}
            />
            <CastSlot
              label={AUDIENCE_CAST_META.label}
              count={selectedAudiences.length}
              color={AUDIENCE_CAST_META.color}
              emptyHint={AUDIENCE_CAST_META.hint}
              filledHint={AUDIENCE_CAST_META.hint}
              onClick={onOpenAudiences}
              icon={<FitHalo sx={{ fontSize: 12 }} />}
            />
          </Box>
          {composer}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5, flexShrink: 0 }}>
            <CastSlot
              label={TARGET_ROLE_META.target.actionLabel}
              count={resolvedTargets.length}
              color={TARGET_ROLE_META.target.color}
              emptyHint={TARGET_ROLE_META.target.hint}
              filledHint={TARGET_ROLE_META.target.hint}
              emphasis
              onClick={() => setMode("full")}
              icon={<AimReticle sx={{ fontSize: 12 }} />}
            />
            {included.length > 0 && (
              <CastSlot
                label={INCLUDED_CAST_META.label}
                count={included.length}
                color={INCLUDED_CAST_META.color}
                emptyHint={INCLUDED_CAST_META.hint}
                filledHint={INCLUDED_CAST_META.hint}
                dashed
                quiet
                onClick={() => setMode("full")}
              />
            )}
            <ModeToggle mode={mode} onChange={setMode} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 0.75,
            width: "100%",
            maxWidth: 1080,
            mx: "auto",
            px: 1,
            pb: 0.5,
          }}
        >
          <TargetingPanelView
            role="actor"
            assigned={resolvedActors}
            available={availableForActors}
            onAdd={(targetId) => addAssignment("actor", targetId)}
            onRemove={(assignmentId) => removeAssignment("actor", assignmentId)}
            compact
          />
          <AudienceSummaryPanel
            selected={selectedAudiences}
            onOpen={onOpenAudiences}
          />
          {composer}
          <TargetingPanelView
            role="target"
            assigned={resolvedTargets}
            available={availableForTargets}
            onAdd={(targetId) => addAssignment("target", targetId)}
            onRemove={(assignmentId) => removeAssignment("target", assignmentId)}
            included={included}
            onExcludeIncluded={(targetId) => toggleSelect("targets", targetId)}
            compact
          />
          <Box sx={{ flexShrink: 0, pt: 0.15 }}>
            <ModeToggle mode={mode} onChange={setMode} />
          </Box>
        </Box>
      ),
    [
      mode,
      setMode,
      composer,
      resolvedActors,
      resolvedTargets,
      availableForActors,
      availableForTargets,
      addAssignment,
      removeAssignment,
      selectedAudiences,
      onOpenAudiences,
      included,
      toggleSelect,
    ],
  );

  useRegisterBottomBar({
    id: "ai-chat-input-bar",
    order: DEFAULT_BOTTOM_BAR_ORDER.aiInput,
    node,
    label: "AI Chat input",
    enabled: true,
  });

  return null;
}

/**
 * One relation in simplified mode — Who, Who else, Aim, Included.
 *
 * Empty is greyed rather than hidden so the shape of the strip stays
 * put, except Included: that lane is optional, so it only appears when
 * something is riding along without being the cursor.
 */
function CastSlot({
  label,
  count,
  color,
  onClick,
  icon,
  emptyHint,
  filledHint,
  dashed = false,
  emphasis = false,
  quiet = false,
}: {
  label: string;
  count: number;
  color: string;
  onClick: () => void;
  icon?: ReactNode;
  emptyHint: string;
  filledHint: string;
  dashed?: boolean;
  emphasis?: boolean;
  quiet?: boolean;
}) {
  const empty = count === 0;
  return (
    <Tooltip title={empty ? emptyHint : `${count} — ${filledHint}`} arrow>
      <ButtonBase
        onClick={onClick}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.45,
          px: emphasis ? 1 : 0.85,
          py: 0.25,
          borderRadius: 99,
          border: empty ? "1px dashed" : dashed ? "1.5px dashed" : emphasis ? "1.5px solid" : "1px solid",
          borderColor: empty ? "divider" : alpha(color, emphasis ? 0.7 : 0.4),
          bgcolor: empty ? "transparent" : alpha(color, emphasis ? 0.16 : 0.1),
          color: empty ? "text.disabled" : color,
          boxShadow: emphasis && !empty ? `0 0 0 1px ${alpha(color, 0.18)}` : "none",
          "&:hover": { bgcolor: alpha(color, empty ? 0.06 : 0.18) },
        }}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              lineHeight: 0,
              opacity: empty ? 0.55 : 1,
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="caption"
          sx={{
            fontSize: quiet ? "0.55rem" : "0.6rem",
            fontWeight: emphasis ? 900 : 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontSize: "0.65rem", fontWeight: 900, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
        >
          {count}
        </Typography>
      </ButtonBase>
    </Tooltip>
  );
}

/** Switches the bar between simplified and full. */
function ModeToggle({
  mode,
  onChange,
}: {
  mode: ChatBarMode;
  onChange: (m: ChatBarMode) => void;
}) {
  const simple = mode === "simple";
  const Icon = simple ? UnfoldMoreRoundedIcon : UnfoldLessRoundedIcon;
  return (
    <Tooltip title={simple ? "Expand targeting panels" : "Simplify the bar"} arrow>
      <ButtonBase
        onClick={() => onChange(simple ? "full" : "simple")}
        aria-label={simple ? "Expand chat bar" : "Simplify chat bar"}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.4,
          px: 0.7,
          py: 0.25,
          borderRadius: 99,
          border: "1px dashed",
          borderColor: "divider",
          color: "text.secondary",
          "&:hover": { color: "text.primary", bgcolor: "action.hover" },
        }}
      >
        <Icon sx={{ fontSize: 13 }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {simple ? "Full" : "Simple"}
        </Typography>
      </ButtonBase>
    </Tooltip>
  );
}

interface AudienceSummaryPanelProps {
  selected: Audience[];
  onOpen: () => void;
}

/** Who else — the fit layer between who acts and the composer. */
function AudienceSummaryPanel({ selected, onOpen }: AudienceSummaryPanelProps) {
  return (
    <AudienceLayerStack
      compact
      onOpen={onOpen}
      items={selected.map((a) => ({
        id: a.id,
        name: a.name,
        symbol: a.symbol,
        symbolColor: a.symbolColor,
      }))}
    />
  );
}
