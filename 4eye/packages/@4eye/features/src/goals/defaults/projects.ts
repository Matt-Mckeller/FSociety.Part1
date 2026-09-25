import type { Project } from "@4eye/types";

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "project-default",
    name: "General",
    description: "Catch-all for anything not yet categorized",
    symbol: "Square",
    symbolColor: "slate",
    domain: "default",
    status: "active",
    createdAt: 0,
  },
  {
    id: "project-personal-growth",
    name: "Personal Growth",
    description: "Self-improvement work",
    symbol: "Triangle",
    symbolColor: "purple",
    domain: "life",
    status: "active",
    createdAt: 0,
  },
  {
    id: "project-current-class",
    name: "Current Class",
    description: "Active learning module",
    symbol: "AutoStories",
    symbolColor: "blue",
    domain: "learning",
    status: "active",
    createdAt: 0,
  },
];
