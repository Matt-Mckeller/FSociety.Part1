/**
 * @4eye/features/goals
 *
 * Goals + Projects (sibling concepts that share UI patterns).
 * Both contexts depend on `useDomain` to filter by current scope.
 */
export { GoalsProvider, useGoals } from "./GoalsContext";
export { ProjectsProvider, useProjects } from "./ProjectsContext";
export { GoalsBar } from "./GoalsBar";
export { ProjectsBar } from "./ProjectsBar";
export { DEFAULT_GOALS } from "./defaults/goals";
export { DEFAULT_PROJECTS } from "./defaults/projects";
