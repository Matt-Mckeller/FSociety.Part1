import type { AIGuidedEditorV6Props } from '../AIGuidedEditorV6/types';

export type V7ShellId = 'calm-workbench' | 'focused-write' | 'character-studio';

/** Which feedback surface is active. Panel = original V6 FeedbackPanel (chips + details). */
export type FeedbackMode = 'panel' | 'score' | 'explorer' | 'actions';

export interface EditorProfile {
  name: string;
  subtitle?: string;
  initials?: string;
  avatarUrl?: string;
  accent?: string;
}

export interface AIGuidedEditorV7Props extends AIGuidedEditorV6Props {
  shell?: V7ShellId;
  /** Default feedback surface. Panel keeps V6 chips/options/sections. */
  initialFeedbackMode?: FeedbackMode;
  profile?: EditorProfile;
  onProfileClick?: () => void;
  /** Character Studio only — static display props */
  moodLabel?: string;
  energyLabel?: string;
}
