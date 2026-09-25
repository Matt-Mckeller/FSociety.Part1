"use client";

/**
 * ProcessEntitySection — one cyphertext entity (person, symbol, field) with
 * expandable goal cards and operational process grids beneath.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import { GoalsIcon } from "@4eye/icons";

import { SectionDisclosure } from "@4eye/web/components/surface";
import {
  GoalsShowcase,
  GoalGlyphs,
  type GoalsLayout,
  type VisionGoal,
} from "@4eye/web/Tiles/integration-layers/goals";
import {
  groupsForEntity,
  processesForEntity,
  type ProcessEntityDef,
  type ProcessEntry,
  type ProcessGroup,
} from "../model/processes";
import { ProcessCard } from "./ProcessCard";
import { ProcessGroupBanner } from "./ProcessGroupBanner";

const KIND_ICON = {
  person: PersonRoundedIcon,
  symbol: AutoAwesomeRoundedIcon,
  entity: HubRoundedIcon,
} as const;

function ProcessGrid({
  entries,
  onProcessClick,
}: {
  entries: ProcessEntry[];
  onProcessClick: (entry: ProcessEntry) => void;
}) {
  if (entries.length === 0) return null;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 1.25,
      }}
    >
      {entries.map((entry) => (
        <ProcessCard key={entry.id} entry={entry} onClick={() => onProcessClick(entry)} />
      ))}
    </Box>
  );
}

export function ProcessEntitySection({
  entity,
  goals,
  ongoingGoals,
  goalLayout,
  processGroups,
  processes,
  accent,
  defaultOpen = false,
  onProcessClick,
}: {
  entity: ProcessEntityDef;
  /** Primary cyphertext goals — shown as full GoalRow cards. */
  goals: VisionGoal[];
  /** Optional second tier (ongoing / living practice). */
  ongoingGoals?: VisionGoal[];
  goalLayout: GoalsLayout;
  processGroups: ProcessGroup[];
  processes: ProcessEntry[];
  accent: string;
  defaultOpen?: boolean;
  onProcessClick: (entry: ProcessEntry) => void;
}) {
  const entityAccent = entity.accent;
  const KindIcon = KIND_ICON[entity.kind];
  const entityGroups = groupsForEntity(processGroups, entity.id);
  const entityProcesses = processesForEntity(processes, entity.id);
  const allGoals = [...goals, ...(ongoingGoals ?? [])];
  const goalCount = allGoals.length;
  const processCount = entityProcesses.length;
  const goalsLabel = entity.id === "entity-janna" ? "Goals" : "Vision · Goals";

  return (
    <Box
      sx={{
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: alpha(entityAccent, 0.28),
        bgcolor: (t) => alpha(entityAccent, t.palette.mode === "dark" ? 0.04 : 0.025),
        p: { xs: 1.25, sm: 1.5 },
      }}
    >
      <SectionDisclosure
        id={`process-entity-${entity.id}`}
        label={entity.cypher}
        accent={entityAccent}
        Icon={KindIcon}
        meta={`${entity.kind} · ${goalCount} goals · ${processCount} ops`}
        adornment={goalCount > 0 ? <GoalGlyphs goals={allGoals} size={16} /> : undefined}
        hint={entity.description ?? `${entity.label} — cyphertext goals and operational processes`}
        defaultOpen={defaultOpen}
      >
        <Stack sx={{ gap: 1.5 }}>
          {entity.description && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55, maxWidth: 720 }}>
              {entity.description}
            </Typography>
          )}

          {goals.length > 0 && (
            <SectionDisclosure
              id={`process-entity-${entity.id}-vision-goals`}
              label={goalsLabel}
              accent={entityAccent}
              Icon={GoalsIcon}
              meta={`${goals.length} coded`}
              adornment={<GoalGlyphs goals={goals} size={14} />}
              hint="Cyphertext targets — click a card to expand meaning, art, and notes"
              defaultOpen
            >
              <GoalsShowcase goals={goals} layout={goalLayout} variant="paper" />
            </SectionDisclosure>
          )}

          {ongoingGoals && ongoingGoals.length > 0 && (
            <SectionDisclosure
              id={`process-entity-${entity.id}-ongoing-goals`}
              label="Ongoing · Practice"
              accent={entityAccent}
              Icon={GoalsIcon}
              meta={`${ongoingGoals.length} living`}
              adornment={<GoalGlyphs goals={ongoingGoals} size={14} />}
              hint="Heart.Evolve and daily loops — living processes in cypher form"
              defaultOpen={entity.id === "entity-self"}
            >
              <GoalsShowcase goals={ongoingGoals} layout={goalLayout} variant="paper" />
            </SectionDisclosure>
          )}

          {(entityGroups.length > 0 || entityProcesses.length > 0) && (
            <SectionDisclosure
              id={`process-entity-${entity.id}-operational`}
              label="Operational"
              accent={accent}
              meta={`${processCount} scripts`}
              hint="Aion invocations, Scripts autoplay, performance loops — with logs and responses"
              defaultOpen={entity.id === "entity-self"}
            >
              <Stack sx={{ gap: 2 }}>
                {entityGroups.map((group) => {
                  const entries = entityProcesses.filter((p) => p.groupId === group.id);
                  if (entries.length === 0) return null;
                  return (
                    <Stack key={group.id} sx={{ gap: 1 }}>
                      <ProcessGroupBanner group={group} accent={entityAccent} compact />
                      <ProcessGrid entries={entries} onProcessClick={onProcessClick} />
                    </Stack>
                  );
                })}

                {entityProcesses.filter((p) => !p.groupId || !entityGroups.some((g) => g.id === p.groupId)).length > 0 && (
                  <ProcessGrid
                    entries={entityProcesses.filter(
                      (p) => !p.groupId || !entityGroups.some((g) => g.id === p.groupId),
                    )}
                    onProcessClick={onProcessClick}
                  />
                )}
              </Stack>
            </SectionDisclosure>
          )}
        </Stack>
      </SectionDisclosure>
    </Box>
  );
}
