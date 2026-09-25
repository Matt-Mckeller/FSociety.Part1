"use client";

/**
 * ProcessesPage — cyphertext entities (people, symbols, fields) each owning
 * expandable goal cards and operational process playbooks.
 */

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  GOALS_LAYOUTS,
  ONGOING_GOALS,
  OTHER_PEOPLE_GOALS,
  type GoalsLayout,
} from "@4eye/web/Tiles/integration-layers/goals";
import { CycleControl, usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";
import { JANNA_PROFILE_ID } from "@4eye/web/Tiles/character/store/useCharacterPresentation";
import { useProfiles } from "@4eye/web/Tiles/profiles/store/ProfileProvider";
import { useProfileStore } from "../store/CharacterProfileStore";
import {
  PROCESS_ENTITIES,
  type ProcessEntry,
  type ProcessGroup,
} from "../model/processes";
import { ProcessDetailDialog } from "./ProcessDetailDialog";
import { ProcessEntitySection } from "./ProcessEntitySection";
import { ProcessFormDialog } from "./ProcessFormDialog";
import {
  ProcessRunnerModelPicker,
  RUNNER_POWER_LABEL,
  useProcessRunnerPower,
} from "./ProcessRunnerModelPicker";

const PROFILE_ACCENT = "#35c99b";

export function ProcessesPage() {
  const { profile } = useProfiles();
  const isJanna = profile.id === JANNA_PROFILE_ID;
  const { state, dispatch } = useProfileStore();
  const { processes, processGroups } = state;
  const [runnerPower] = useProcessRunnerPower();

  const [goalLayout, setGoalLayout] = usePersistedChoice(
    "4eye.profile.processesGoalsLayout",
    "stack" as GoalsLayout,
    GOALS_LAYOUTS,
  );

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [formEntry, setFormEntry] = React.useState<ProcessEntry | null | undefined>(undefined);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [namespaceFilter, setNamespaceFilter] = React.useState<string | null>(null);
  const [tagFilter, setTagFilter] = React.useState<string | null>(null);
  const [runNotice, setRunNotice] = React.useState<string | null>(null);

  const selected = processes.find((p) => p.id === selectedId) ?? null;
  const selectedGroup = selected?.groupId
    ? processGroups.find((g) => g.id === selected.groupId)
    : undefined;

  const namespaces = React.useMemo(() => {
    const set = new Set(processes.map((p) => p.namespace));
    return [...set].sort();
  }, [processes]);

  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    for (const p of processes) for (const t of p.tags) set.add(t);
    return [...set].sort();
  }, [processes]);

  const filteredProcesses = React.useMemo(() => {
    return processes.filter((p) => {
      if (namespaceFilter && p.namespace !== namespaceFilter) return false;
      if (tagFilter && !p.tags.includes(tagFilter)) return false;
      return true;
    });
  }, [processes, namespaceFilter, tagFilter]);

  const entities = React.useMemo(() => {
    const ordered = [...PROCESS_ENTITIES].sort((a, b) => a.sortOrder - b.sortOrder);
    if (isJanna) {
      return [ordered.find((e) => e.id === "entity-janna")!, ordered.find((e) => e.id === "entity-self")!].filter(Boolean);
    }
    return ordered;
  }, [isJanna]);

  const openDetail = (entry: ProcessEntry) => {
    setSelectedId(entry.id);
    setDetailOpen(true);
  };

  const openAdd = () => {
    setFormEntry(null);
    setFormOpen(true);
  };

  const openEdit = () => {
    setDetailOpen(false);
    setFormEntry(selected);
    setFormOpen(true);
  };

  const handleSave = (
    draft: Omit<ProcessEntry, "id" | "updatedAt" | "logs"> & { id?: string },
  ) => {
    if (draft.id) {
      dispatch({
        type: "process-update",
        id: draft.id,
        patch: {
          expression: draft.expression,
          namespace: draft.namespace,
          name: draft.name,
          tags: draft.tags,
          description: draft.description,
          autoPlay: draft.autoPlay,
          active: draft.active,
          groupId: draft.groupId,
          entityId: draft.entityId,
          sortOrder: draft.sortOrder,
        },
      });
    } else {
      dispatch({
        type: "process-add",
        entry: {
          id: `proc-${Date.now()}`,
          expression: draft.expression,
          namespace: draft.namespace,
          name: draft.name,
          tags: draft.tags,
          description: draft.description,
          autoPlay: draft.autoPlay,
          active: draft.active,
          groupId: draft.groupId,
          entityId: draft.entityId ?? "entity-self",
          sortOrder: draft.sortOrder,
          updatedAt: Date.now(),
          logs: [],
        },
      });
    }
  };

  const handleCreateGroup = (
    draft: Omit<ProcessGroup, "id" | "sortOrder"> & { id?: string },
  ): ProcessGroup => {
    const group: ProcessGroup = {
      id: draft.id ?? `pgroup-${Date.now()}`,
      namespace: draft.namespace,
      name: draft.name,
      tags: draft.tags ?? [],
      description: draft.description,
      sortOrder: processGroups.length + 1,
      entityId: draft.entityId ?? "entity-self",
    };
    dispatch({ type: "process-group-add", group });
    return group;
  };

  const handleRun = () => {
    if (!selectedId || !selected) return;
    const powerLabel = RUNNER_POWER_LABEL[runnerPower];
    const body =
      `Stub run via **${powerLabel}** — process queued for Aion inject.\n\n` +
      `\`${selected.expression}\`\n\n` +
      `_Live execution is not wired yet; this log marks the runner as active._`;
    dispatch({
      type: "process-log-add",
      processId: selectedId,
      entry: {
        id: `plog-${Date.now()}`,
        kind: "result",
        label: `Run · ${powerLabel}`,
        body,
        expression: selected.expression,
        emoji: "⚡",
        createdAt: Date.now(),
      },
    });
    setRunNotice(`Ran stub on ${powerLabel} — see process log.`);
    window.setTimeout(() => setRunNotice(null), 4000);
  };

  return (
    <Stack sx={{ gap: 2.5 }}>
      <Stack sx={{ gap: 1.5 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          sx={{ alignItems: { lg: "flex-start" }, justifyContent: "space-between", gap: 1.5 }}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Processes
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, maxWidth: 640, lineHeight: 1.55 }}>
              Every symbol, person, and entity owns cyphertext goals and operational playbooks —
              expand to read targets, logs, and responses.
            </Typography>
          </Box>

          <ProcessRunnerModelPicker accent="#f59e0b" />
        </Stack>

        {(namespaces.length > 0 || allTags.length > 0) && (
          <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap", alignItems: "center" }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mr: 0.5 }}>
              Filter
            </Typography>
            <Chip
              size="small"
              label="All"
              color={!namespaceFilter && !tagFilter ? "primary" : "default"}
              onClick={() => {
                setNamespaceFilter(null);
                setTagFilter(null);
              }}
            />
            {namespaces.map((ns) => (
              <Chip
                key={ns}
                size="small"
                label={ns}
                variant={namespaceFilter === ns ? "filled" : "outlined"}
                color={namespaceFilter === ns ? "primary" : "default"}
                onClick={() => setNamespaceFilter((prev) => (prev === ns ? null : ns))}
              />
            ))}
            {allTags.map((t) => (
              <Chip
                key={`tag-${t}`}
                size="small"
                label={`#${t}`}
                variant={tagFilter === t ? "filled" : "outlined"}
                onClick={() => setTagFilter((prev) => (prev === t ? null : t))}
              />
            ))}
          </Stack>
        )}

        <Stack
          direction="row"
          sx={{ gap: 1, flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end" }}
        >
          {runNotice && (
            <Typography variant="caption" sx={{ color: "warning.main", fontWeight: 700, mr: "auto" }}>
              {runNotice}
            </Typography>
          )}
          <CycleControl
            label="Goal layout"
            value={goalLayout}
            options={GOALS_LAYOUTS}
            accent={PROFILE_ACCENT}
            onChange={setGoalLayout}
          />
          <Button variant="contained" size="small" startIcon={<AddRoundedIcon />} onClick={openAdd}>
            Add process
          </Button>
        </Stack>
      </Stack>

      <Stack sx={{ gap: 2 }}>
        {entities.map((entity, i) => (
          <ProcessEntitySection
            key={entity.id}
            entity={entity}
            accent={PROFILE_ACCENT}
            goalLayout={goalLayout}
            processGroups={processGroups}
            processes={filteredProcesses}
            defaultOpen={i === 0}
            onProcessClick={openDetail}
            goals={
              entity.id === "entity-janna"
                ? OTHER_PEOPLE_GOALS
                : []
            }
            ongoingGoals={entity.id === "entity-self" ? ONGOING_GOALS : undefined}
          />
        ))}
      </Stack>

      {filteredProcesses.length === 0 && (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {processes.length === 0
              ? "No operational processes yet. Add a script or Aion invocation."
              : "No processes match this filter."}
          </Typography>
        </Box>
      )}

      <ProcessDetailDialog
        open={detailOpen}
        entry={selected}
        group={selectedGroup}
        onClose={() => setDetailOpen(false)}
        onEdit={openEdit}
        onRun={handleRun}
        onAddLog={(draft) => {
          if (!selectedId) return;
          dispatch({
            type: "process-log-add",
            processId: selectedId,
            entry: {
              id: `plog-${Date.now()}`,
              ...draft,
              createdAt: Date.now(),
            },
          });
        }}
        onDeleteLog={(logId) => {
          if (!selectedId) return;
          dispatch({ type: "process-log-delete", processId: selectedId, logId });
        }}
      />

      <ProcessFormDialog
        open={formOpen}
        entry={formEntry ?? null}
        groups={processGroups}
        onSave={handleSave}
        onCreateGroup={handleCreateGroup}
        onDelete={
          formEntry?.id
            ? (id) => {
                dispatch({ type: "process-delete", id });
                setFormOpen(false);
              }
            : undefined
        }
        onClose={() => setFormOpen(false)}
      />
    </Stack>
  );
}
