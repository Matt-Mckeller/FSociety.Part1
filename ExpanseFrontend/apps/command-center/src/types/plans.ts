/**
 * Core type definitions for the Plans Viewer application
 * These types define the structure of all planning content
 */

// ============================================================================
// Status Types
// ============================================================================

export type StatusLevel = 'done' | 'partial' | 'planned';

export interface ImplementationStatus {
  data: StatusLevel;
  ui: StatusLevel;
  logic: StatusLevel;
}

export type OverallStatus = 'Done' | 'Partial' | 'Data Only' | 'Data + UI' | 'Planned';

// ============================================================================
// Content Block Types
// ============================================================================

export interface TextBlock {
  type: 'text';
  value: string;
}

export interface ListBlock {
  type: 'list';
  items: (string | ListBlock)[];
  ordered?: boolean;
}

export interface TableBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export interface MermaidBlock {
  type: 'mermaid';
  diagram: string;
  caption?: string;
}

export interface TasksBlock {
  type: 'tasks';
  items: Task[];
}

export interface CodeBlock {
  type: 'code';
  language?: string;
  code: string;
}

export interface HeadingBlock {
  type: 'heading';
  level: 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface QuoteBlock {
  type: 'quote';
  value: string;
}

export type ContentBlock =
  | TextBlock
  | ListBlock
  | TableBlock
  | MermaidBlock
  | TasksBlock
  | CodeBlock
  | HeadingBlock
  | QuoteBlock;

// ============================================================================
// Section & Module Types
// ============================================================================

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
  collapsed?: boolean;
  subsections?: Section[];
}

export interface RelatedDocument {
  id: string;
  title: string;
  path: string;
  description?: string;
}

export interface PlanModule {
  id: string;
  title: string;
  description: string;
  status?: ImplementationStatus;
  overallStatus?: OverallStatus;
  sections: Section[];
  relatedDocuments?: RelatedDocument[];
  children?: PlanModule[];
}

// ============================================================================
// Task Types
// ============================================================================

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'not-started' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: TaskPriority;
  module?: string;
  notes?: string;
}

export interface TaskGroup {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
  description?: string;
}

export interface TableOfContentsEntry {
  id: string;
  title: string;
  path: string;
  description: string;
  indent?: number;
}

// ============================================================================
// Implementation Status Table Types
// ============================================================================

export interface StatusTableRow {
  feature: string;
  category?: string;
  status: ImplementationStatus;
  overallStatus: OverallStatus;
}

// ============================================================================
// Module Summary Types
// ============================================================================

export interface ModuleSummary {
  id: string;
  title: string;
  description: string;
}
