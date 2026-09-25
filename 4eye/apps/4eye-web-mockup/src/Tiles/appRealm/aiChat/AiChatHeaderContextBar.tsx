"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Box, ClickAwayListener, Popper, Typography, alpha, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { ContextBar, type ContextBarContext, type ContextBarItem, useRegisterCenterContent } from "@expanse/hud"
import HubIcon from "@mui/icons-material/Hub";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import { Symbol, useDomain, useGoals, useProfileContext, useProjects } from "@4eye/features";
import { COLOR_MAP, isPlanProject, type Goal } from "@4eye/types";
import { ProfileProvider, useProfiles } from "@4eye/web/Tiles/profiles";
import { projectToPlanDraft, type PlanDraft } from "./workbench/planExport";
import {
  ActingAsSelectorPanelView,
  DomainSelectorPanelView,
  DomainTabContent,
  GoalsSelectorPanelView,
  MorphingTabContent,
  ProjectsSelectorPanelView,
  VisionGoalsIcon,
  equippedRolesFromTitles,
  resolveActingAsRoles,
  useGoalChipShape,
  GOALS_ACCENT,
  MAX_SELECTED_ROLES,
  PROJECTS_ACCENT,
} from "./contextSelectors";
import { DUSK_HORIZON_BACKGROUND } from "@expanse/theme";

const GOALS_MAX = 3;
const PROJECTS_MAX = 3;

// Fixed tab width so all tabs are equal.
// Content = KindIcon(18) + gap(8) + slotW(84). With px:1.5 padding (12px×2):
//   Desktop: 18+8+84 = 110px content + 24px padding = 134px
//   Mobile:  18+6+48 = 72px content + 24px padding = 96px
const TAB_W_DESKTOP = 134;
const TAB_W_MOBILE = 96;

function AiChatHeaderContextBarInner({
  onSelectPlan,
}: {
  onSelectPlan?: (draft: PlanDraft) => void;
}) {
  const isMobile = useMediaQuery("(max-width:599px)");
  const tabW = isMobile ? TAB_W_MOBILE : TAB_W_DESKTOP;
  const tabSxDivider = useMemo(
    () => ({ width: tabW, minWidth: 0, borderRight: "1px solid rgba(255,255,255,0.1)" } as const),
    [tabW],
  );
  const tabSx = useMemo(
    () => ({ width: tabW, minWidth: 0 } as const),
    [tabW],
  );

  const { currentDomain, domainConfig, domains, setDomain } = useDomain();
  const {
    goals,
    promptGoals,
    isGoalSelected,
    toggleGoal,
    selectedGoals,
    canSelectMore: canSelectMoreGoals,
    addPromptGoal,
    removePromptGoal,
  } = useGoals();
  const {
    projects,
    selectedProjects,
    selectProject,
    clearSelectedProjects,
    isProjectSelected,
    getProjectById,
  } = useProjects();
  const { settings, toggleActingAsRole } = useProfileContext();
  const { profile } = useProfiles();
  const equippedRoles = useMemo(
    () => equippedRolesFromTitles(profile.titles),
    [profile.titles],
  );
  const selectedActingAs = useMemo(
    () => resolveActingAsRoles(settings.actingAsRoles ?? [], profile.titles),
    [settings.actingAsRoles, profile.titles],
  );

  const [goalChipShape, setGoalChipShape] = useGoalChipShape();
  const [open, setOpen] = useState<ContextBarContext | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const projectActiveId = selectedProjects[0]?.id ?? null;
  const handleProjectPick = useCallback(
    (id: string) => {
      if (isProjectSelected(id)) {
        clearSelectedProjects();
        return;
      }
      clearSelectedProjects();
      selectProject(id);
      const project = getProjectById(id);
      if (project && isPlanProject(project)) {
        onSelectPlan?.(projectToPlanDraft(project));
      }
    },
    [isProjectSelected, clearSelectedProjects, selectProject, getProjectById, onSelectPlan],
  );

  const DomainIcon = HubIcon;

  const goalTabEntries = useMemo(
    () =>
      selectedGoals.map((g) => ({
        symbol: g.symbol,
        symbolColor: g.symbolColor,
        label: g.word,
      })),
    [selectedGoals],
  );

  const items = useMemo<ContextBarItem[]>(
    () => [
      {
        id: "domains",
        label: "",
        icon: (
          <DomainTabContent
            DomainIcon={DomainIcon}
            label={domainConfig?.label ?? "Domains"}
            compact={isMobile}
          />
        ),
        sx: tabSxDivider,
      },
      {
        id: "goals",
        label: "",
        icon: (
          <MorphingTabContent
            KindIcon={VisionGoalsIcon}
            label="Goals"
            selected={goalTabEntries}
            max={GOALS_MAX}
            shape={goalChipShape}
            compact={isMobile}
            glyphColor="slate"
          />
        ),
        sx: tabSxDivider,
      },
      {
        id: "acting-as",
        label: "",
        icon: (
          <MorphingTabContent
            KindIcon={TheaterComedyRoundedIcon}
            label="Acting as"
            selected={selectedActingAs}
            max={MAX_SELECTED_ROLES}
            shape="circle"
            compact={isMobile}
            glyphColor="slate"
          />
        ),
        sx: tabSxDivider,
      },
      {
        id: "projects",
        label: "",
        icon: (
          <MorphingTabContent
            KindIcon={FolderSpecialIcon}
            label="Projects"
            selected={selectedProjects}
            max={PROJECTS_MAX}
            compact={isMobile}
          />
        ),
        sx: tabSx,
      },
    ],
    [
      domainConfig?.label,
      DomainIcon,
      goalTabEntries,
      selectedActingAs,
      selectedProjects,
      goalChipShape,
      isMobile,
      tabSx,
      tabSxDivider,
    ],
  );

  const handleChange = useCallback((next: ContextBarContext) => {
    setOpen((prev) => (prev === next ? null : next));
  }, []);

  const handleClickAway = useCallback((e: MouseEvent | TouchEvent) => {
    const target = e.target as Node | null;
    if (target && anchorRef.current?.contains(target)) return;
    setOpen(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.stopPropagation();
        close();
      }
    },
    [open, close],
  );

  const node = useMemo(
    () => (
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Box
          ref={anchorRef}
          onKeyDown={handleKeyDown}
          sx={{ position: "relative", display: "inline-flex" }}
        >
          <ContextBar
            mode="custom"
            items={items}
            value={open ?? undefined}
            onChange={handleChange}
            labelDisplay="icon-label-right"
            sx={
              open
                ? {
                    background: DUSK_HORIZON_BACKGROUND,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }
                : undefined
            }
          />
          <Popper
            open={Boolean(open)}
            anchorEl={anchorRef.current}
            placement="bottom"
            modifiers={[
              { name: "offset", options: { offset: [0, 0] } },
              { name: "preventOverflow", options: { padding: 8 } },
            ]}
            sx={{
              zIndex: (t: Theme) => t.zIndex.modal,
              width: anchorRef.current?.offsetWidth,
              minWidth: 320,
              maxWidth: 600,
            }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box>
                <AnimatePresence mode="wait" initial={false}>
                  {open === "domains" && (
                    <motion.div
                      key="domains"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <DomainSelectorPanelView
                        domains={domains}
                        currentDomain={currentDomain}
                        onSelect={setDomain}
                        onClose={close}
                      />
                    </motion.div>
                  )}
                  {open === "goals" && (
                    <motion.div
                      key="goals"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <GoalsSelectorPanelView
                        goals={goals}
                        promptGoals={promptGoals}
                        selectedCount={selectedGoals.length}
                        isSelected={isGoalSelected}
                        canSelectMore={canSelectMoreGoals}
                        onToggle={toggleGoal}
                        onAddPromptGoal={addPromptGoal}
                        onRemovePromptGoal={removePromptGoal}
                        onClose={close}
                        chipShape={goalChipShape}
                        onChipShapeChange={setGoalChipShape}
                        accent={GOALS_ACCENT}
                      />
                    </motion.div>
                  )}
                  {open === "acting-as" && (
                    <motion.div
                      key="acting-as"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <ActingAsSelectorPanelView
                        equipped={equippedRoles}
                        selectedIds={settings.actingAsRoles ?? []}
                        onToggle={toggleActingAsRole}
                        onClose={close}
                      />
                    </motion.div>
                  )}
                  {open === "projects" && (
                    <motion.div
                      key="projects"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <ProjectsSelectorPanelView
                        projects={projects}
                        activeId={projectActiveId}
                        onPick={handleProjectPick}
                        onClose={close}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </ClickAwayListener>
          </Popper>
        </Box>
        <SelectedGoalsStrip goals={selectedGoals} />
      </Box>
    ),
    [
      items,
      open,
      handleChange,
      handleKeyDown,
      handleClickAway,
      close,
      domains,
      currentDomain,
      setDomain,
      goals,
      selectedGoals,
      isGoalSelected,
      canSelectMoreGoals,
      toggleGoal,
      addPromptGoal,
      removePromptGoal,
      promptGoals,
      goalChipShape,
      setGoalChipShape,
      equippedRoles,
      settings.actingAsRoles,
      toggleActingAsRole,
      projects,
      projectActiveId,
      handleProjectPick,
    ],
  );

  useRegisterCenterContent({
    id: "ai-chat-header-context-bar",
    priority: 50,
    node,
    label: "AI Chat header context bar",
  });

  return null;
}

/**
 * AiChatHeaderContextBar — registers the @expanse ContextBar (Domains /
 * Goals / Acting as / Projects) into the HUD top-center slot.
 */
export function AiChatHeaderContextBar({
  onSelectPlan,
}: {
  onSelectPlan?: (draft: PlanDraft) => void;
}) {
  return (
    <ProfileProvider>
      <AiChatHeaderContextBarInner onSelectPlan={onSelectPlan} />
    </ProfileProvider>
  );
}

/** Named chips for pulled-in / selected goals under the center ContextBar. */
function SelectedGoalsStrip({ goals }: { goals: Goal[] }) {
  if (goals.length === 0) return null;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 0.5,
        maxWidth: "min(100vw - 48px, 560px)",
        px: 0.5,
      }}
    >
      {goals.map((g) => {
        const accent = COLOR_MAP[g.symbolColor];
        return (
          <Box
            key={g.id}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.45,
              px: 0.85,
              py: 0.3,
              borderRadius: 999,
              border: "1px solid",
              borderColor: alpha(accent, 0.45),
              bgcolor: alpha("#0b1220", 0.72),
              backdropFilter: "blur(10px)",
              maxWidth: 160,
            }}
          >
            <Symbol name={g.symbol} color={g.symbolColor} size={12} variant="ghost" />
            <Typography
              noWrap
              sx={{
                fontSize: 10.5,
                fontWeight: 700,
                color: alpha("#fff", 0.92),
                lineHeight: 1.2,
              }}
            >
              {g.word}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
