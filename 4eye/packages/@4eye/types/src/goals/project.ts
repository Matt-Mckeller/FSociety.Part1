import type { SymbolColor, SymbolName } from "../symbols";
import type { DomainType } from "../domain";

export type ProjectStatus = "active" | "paused" | "archived" | "completed";

/** How a learning-panel input landed on a Plan document. */
export type PlanAttachmentKind = "text" | "voice" | "image" | "link" | "template";

export interface PlanAttachment {
  id: string;
  kind: PlanAttachmentKind;
  /** Filename, URL host, template name, or a short caption. */
  label: string;
  /** URL, transcript, template id, or notes snippet. */
  value: string;
  /** Image preview (data URL) when `kind` is `"image"`. */
  dataUrl?: string;
  addedAt: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  domain: DomainType;
  status: ProjectStatus;
  /** Linked goal IDs */
  goalIds?: string[];
  createdAt: number;
  /** Chat Plan documents saved into the Projects picker. */
  source?: "plan";
  /** Markdown notes from the Plan document, when `source` is `"plan"`. */
  planBody?: string;
  /** Learning-panel inputs attached to this plan. */
  planAttachments?: PlanAttachment[];
}

export function isPlanProject(p: Project): boolean {
  return p.source === "plan" || typeof p.planBody === "string";
}

export interface SelectedProject {
  projectId: string;
  selectedAt: number;
}

export const MAX_SELECTED_PROJECTS = 3;
