"use client";

import type { KeyboardEvent } from "react";
import { Box, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Symbol, useProjects } from "@4eye/features";
import { isPlanProject, type Project } from "@4eye/types";
import { ContextSelectorPanel } from "./ContextSelectorPanel";
import { PROJECTS_ACCENT } from "./tokens";

interface ProjectsSelectorPanelViewProps {
  projects: Project[];
  activeId: string | null;
  onPick: (id: string) => void;
  onClose: () => void;
}

function ProjectRow({
  project,
  selected,
  onPick,
}: {
  project: Project;
  selected: boolean;
  onPick: (id: string) => void;
}) {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={() => onPick(project.id)}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPick(project.id);
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        px: 1,
        py: 0.75,
        borderRadius: 1.5,
        cursor: "pointer",
        bgcolor: selected ? "rgba(168,85,247,0.18)" : "transparent",
        border: "1px solid",
        borderColor: selected ? "rgba(168,85,247,0.45)" : "transparent",
        transition: "background-color 120ms, border-color 120ms",
        "&:hover": {
          bgcolor: selected ? "rgba(168,85,247,0.26)" : "rgba(255,255,255,0.04)",
        },
      }}
    >
      <Symbol name={project.symbol} color={project.symbolColor} size={28} variant="ghost" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.2,
          }}
        >
          {project.name}
        </Typography>
        {project.description && (
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.2,
              display: "block",
            }}
          >
            {project.description}
          </Typography>
        )}
      </Box>
      {selected && (
        <CheckRoundedIcon fontSize="small" sx={{ color: PROJECTS_ACCENT, flex: "0 0 auto" }} />
      )}
    </Box>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography
      sx={{
        fontSize: 9.5,
        fontWeight: 800,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.55)",
        px: 1,
        py: 0.5,
      }}
    >
      {children}
    </Typography>
  );
}

/** Presentational variant for portal use. */
export function ProjectsSelectorPanelView({
  projects,
  activeId,
  onPick,
  onClose,
}: ProjectsSelectorPanelViewProps) {
  const catalog = projects.filter((p) => !isPlanProject(p));
  const plans = projects
    .filter(isPlanProject)
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <ContextSelectorPanel
      title="Project"
      subtitle="Pick one to focus on — saved plans live here"
      onClose={onClose}
    >
      {catalog.length === 0 && plans.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.5)", px: 1, py: 2 }}
        >
          No projects available in this domain.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {catalog.length > 0 && (
            <>
              <SectionLabel>Projects</SectionLabel>
              {catalog.map((p) => (
                <ProjectRow
                  key={p.id}
                  project={p}
                  selected={p.id === activeId}
                  onPick={onPick}
                />
              ))}
            </>
          )}
          <SectionLabel>Plans</SectionLabel>
          {plans.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.5)", px: 1, py: 1.25 }}
            >
              Plans you save from the document appear here.
            </Typography>
          ) : (
            plans.map((p) => (
              <ProjectRow
                key={p.id}
                project={p}
                selected={p.id === activeId}
                onPick={onPick}
              />
            ))
          )}
        </Box>
      )}
    </ContextSelectorPanel>
  );
}

interface ProjectsSelectorPanelProps {
  onClose: () => void;
}

/** Connected variant. */
export function ProjectsSelectorPanel({ onClose }: ProjectsSelectorPanelProps) {
  const {
    projects,
    selectedProjects,
    selectProject,
    clearSelectedProjects,
    isProjectSelected,
  } = useProjects();
  const activeId = selectedProjects[0]?.id ?? null;
  const handlePick = (id: string) => {
    if (isProjectSelected(id)) clearSelectedProjects();
    else {
      clearSelectedProjects();
      selectProject(id);
    }
  };
  return (
    <ProjectsSelectorPanelView
      projects={projects}
      activeId={activeId}
      onPick={handlePick}
      onClose={onClose}
    />
  );
}
