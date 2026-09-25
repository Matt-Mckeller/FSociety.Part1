/**
 * Strategic Focus Types
 * Data model for the decision-support system
 */

// === SWOT Item ===
export interface SWOTItem {
  id: string;
  title: string;
  description?: string;
  impact?: 'low' | 'medium' | 'high';
  mitigations?: string[];
}

// === Problem ===
export interface Problem {
  id: string;
  title: string;
  description?: string;
  severity: number; // 1-10
  isActive: boolean;
}

// === Goal ===
export interface FocusGoal {
  id: string;
  title: string;
  description?: string;
  timeframe: 'short' | 'medium' | 'long';
  status: 'not-started' | 'in-progress' | 'achieved';
  targetDate?: string;
  successCriteria?: string[];
}

// === Strategy ===
export interface Strategy {
  id: string;
  title: string;
  description?: string;
  speed: string; // "7d", "30d", "90d", etc.
  reward: 'low' | 'medium' | 'high' | 'very-high';
  risk: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high' | 'very-high';
  sustainable: boolean;
  implementationNotes?: string;
  linkedCampaignIds?: string[];
  linkedStorylineIds?: string[];
}

// === Checkpoint ===
export interface FocusCheckpoint {
  id: string;
  title: string;
  description?: string;
  triggeredWeight: number;
  status: 'pending' | 'reached';
  reachedAt?: string;
}

// === Weight Factors ===
export type FactorLevel = 'low' | 'medium' | 'high' | 'critical';
export type FeasibilityLevel = 'low' | 'medium' | 'high';
export type ContextLevel = 'unfavorable' | 'neutral' | 'favorable';

export interface WeightFactors {
  urgency: FactorLevel;
  urgencyNotes?: string;
  importance: FactorLevel;
  importanceNotes?: string;
  feasibility: FeasibilityLevel;
  feasibilityNotes?: string;
  context: ContextLevel;
  contextNotes?: string;
}

// === Weight History Entry ===
export interface WeightHistoryEntry {
  date: string;
  weight: number;
  reason?: string;
}

// === Strategic Focus ===
export interface StrategicFocus {
  id: string;
  name: string;
  icon: string;
  description: string;

  // Weight
  currentWeight: number;
  previousWeight?: number;
  weightUpdatedAt?: string;
  weightHistory?: WeightHistoryEntry[];

  // Weight Factors
  weightFactors: WeightFactors;

  // SWOT
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  risks: SWOTItem[];

  // Problems & Goals
  problems: Problem[];
  goals: FocusGoal[];

  // Strategies
  strategies: Strategy[];
  currentStrategyId?: string;
  currentStrategyNotes?: string;

  // Checkpoints
  checkpoints: FocusCheckpoint[];

  // Connections
  connectedCampaignIds?: string[];
  connectedStorylineIds?: string[];
  connectedQuestIds?: string[];

  // Metadata
  level: 'umbrella' | 'campaign';
  campaignId?: string;
  createdAt: string;
  updatedAt: string;
}

// === Global SWOT ===
export interface GlobalSWOT {
  title: string;
  description: string;
  updatedAt: string;
  lastUpdated?: string;
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  risks: SWOTItem[];
}

// === Data File Structures ===
export interface StrategicFocusData {
  focuses: StrategicFocus[];
}

export interface GlobalSWOTData {
  globalSwot: GlobalSWOT;
}
