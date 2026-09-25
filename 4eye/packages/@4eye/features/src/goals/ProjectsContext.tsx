"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  isPlanProject,
  MAX_SELECTED_PROJECTS,
  type Project,
  type SelectedProject,
} from "@4eye/types";
import { DEFAULT_PROJECTS } from "./defaults/projects";
import { useDomain } from "../domain";

const STORAGE_KEY = "4eye-selected-projects-v1";
const CUSTOM_KEY = "4eye-custom-projects-v1";

interface ProjectsContextValue {
  allProjects: Project[];
  /** Filtered by current domain (plus "default"-domain and saved plans) */
  projects: Project[];
  customProjects: Project[];
  selectedProjects: Project[];
  selectedProjectIds: string[];
  selectProject: (id: string) => void;
  deselectProject: (id: string) => void;
  toggleProject: (id: string) => void;
  clearSelectedProjects: () => void;
  addProject: (project: Omit<Project, "id" | "createdAt">) => Project;
  /** Insert or update a custom project, keeping a stable `id` when provided. */
  upsertCustomProject: (
    project: Omit<Project, "id" | "createdAt"> & Partial<Pick<Project, "id" | "createdAt">>,
  ) => Project;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
  canSelectMore: boolean;
  isProjectSelected: (id: string) => boolean;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(
  undefined,
);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const { currentDomain } = useDomain();
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [customProjects, setCustomProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sel = window.localStorage.getItem(STORAGE_KEY);
    if (sel) {
      try {
        const parsed = JSON.parse(sel) as SelectedProject[];
        setSelectedProjectIds(parsed.map((p) => p.projectId));
      } catch {}
    }
    const cust = window.localStorage.getItem(CUSTOM_KEY);
    if (cust) {
      try {
        setCustomProjects(JSON.parse(cust) as Project[]);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: SelectedProject[] = selectedProjectIds.map((id) => ({
      projectId: id,
      selectedAt: Date.now(),
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [selectedProjectIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CUSTOM_KEY, JSON.stringify(customProjects));
  }, [customProjects]);

  const allProjects = useMemo(
    () => [...DEFAULT_PROJECTS, ...customProjects],
    [customProjects],
  );

  const projects = useMemo(
    () =>
      allProjects.filter(
        (p) =>
          p.domain === currentDomain ||
          p.domain === "default" ||
          isPlanProject(p),
      ),
    [allProjects, currentDomain],
  );

  const selectedProjects = useMemo(
    () =>
      selectedProjectIds
        .map((id) => allProjects.find((p) => p.id === id))
        .filter((p): p is Project => Boolean(p)),
    [selectedProjectIds, allProjects],
  );

  const selectProject = useCallback((id: string) => {
    setSelectedProjectIds((prev) =>
      prev.includes(id) || prev.length >= MAX_SELECTED_PROJECTS
        ? prev
        : [...prev, id],
    );
  }, []);

  const deselectProject = useCallback((id: string) => {
    setSelectedProjectIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleProject = useCallback((id: string) => {
    setSelectedProjectIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_SELECTED_PROJECTS) return prev;
      return [...prev, id];
    });
  }, []);

  const clearSelectedProjects = useCallback(
    () => setSelectedProjectIds([]),
    [],
  );

  const addProject = useCallback(
    (project: Omit<Project, "id" | "createdAt">) => {
      const next: Project = {
        ...project,
        id: `project-custom-${Date.now()}`,
        createdAt: Date.now(),
      };
      setCustomProjects((prev) => [...prev, next]);
      return next;
    },
    [],
  );

  const upsertCustomProject = useCallback(
    (
      project: Omit<Project, "id" | "createdAt"> &
        Partial<Pick<Project, "id" | "createdAt">>,
    ) => {
      const id = project.id ?? `project-custom-${Date.now()}`;
      let saved: Project = { ...project, id, createdAt: project.createdAt ?? Date.now() };
      setCustomProjects((prev) => {
        const existing = prev.find((p) => p.id === id);
        saved = existing
          ? { ...existing, ...project, id, createdAt: existing.createdAt }
          : { ...project, id, createdAt: Date.now() };
        return existing
          ? prev.map((p) => (p.id === id ? saved : p))
          : [...prev, saved];
      });
      return saved;
    },
    [],
  );

  const updateProject = useCallback(
    (id: string, patch: Partial<Project>) => {
      setCustomProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      );
    },
    [],
  );

  const removeProject = useCallback((id: string) => {
    setCustomProjects((prev) => prev.filter((p) => p.id !== id));
    setSelectedProjectIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const isProjectSelected = useCallback(
    (id: string) => selectedProjectIds.includes(id),
    [selectedProjectIds],
  );

  const getProjectById = useCallback(
    (id: string) => allProjects.find((p) => p.id === id),
    [allProjects],
  );

  const value = useMemo<ProjectsContextValue>(
    () => ({
      allProjects,
      projects,
      customProjects,
      selectedProjects,
      selectedProjectIds,
      selectProject,
      deselectProject,
      toggleProject,
      clearSelectedProjects,
      addProject,
      upsertCustomProject,
      updateProject,
      removeProject,
      canSelectMore: selectedProjects.length < MAX_SELECTED_PROJECTS,
      isProjectSelected,
      getProjectById,
    }),
    [
      allProjects,
      projects,
      customProjects,
      selectedProjects,
      selectedProjectIds,
      selectProject,
      deselectProject,
      toggleProject,
      clearSelectedProjects,
      addProject,
      upsertCustomProject,
      updateProject,
      removeProject,
      isProjectSelected,
      getProjectById,
    ],
  );

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextValue {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within a ProjectsProvider");
  return ctx;
}
