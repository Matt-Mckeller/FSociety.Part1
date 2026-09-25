// ============================================================================
// PresentationApp Types
// ============================================================================

// === ENUMS & CONSTANTS ===

export type AudienceType =
  | 'student'
  | 'teacher'
  | 'parent'
  | 'administration'
  | 'general'
  | 'employee'
  | 'applicant';

export type AccessibilityMode = 'default' | 'adhd' | 'autism' | 'dyslexia';

export type ContentBlockType =
  | 'text'
  | 'code'
  | 'quiz'
  | 'media'
  | 'interactive'
  | 'ai-transform';

export type PanelPosition = 'left' | 'right' | 'top' | 'bottom';

export type FeedbackType =
  | 'confused'
  | 'help'
  | 'understand'
  | 'slow-down'
  | 'speed-up'
  | 'like'
  | 'great'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'agree'
  | 'disagree';

// === USER ===

export interface UserPreferences {
  accessibilityMode: AccessibilityMode;
  audioEnabled: boolean;
  audioVolume: number;
  theme: 'light' | 'dark' | 'system';
  locale: string;
  panelLayout: Record<string, PanelState>;
}

export interface PanelState {
  isOpen: boolean;
  position: PanelPosition;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  level: number;
  xp: number;
  coins: number;
  preferences: UserPreferences;
  equippedItems: string[];
}

// === PRESENTATIONS ===

export interface Presentation {
  id: string;
  name: string;
  description: string;
  slideIds: string[];
  isPublic: boolean;
}

export interface Slide {
  id: string;
  name: string;
  presentationIds: string[];
  audienceTypes: AudienceType[];
  order: number;
  unlockLevel: number;
  blocks: SlideBlock[];
}

export interface SlideBlock {
  id: string;
  slideId: string;
  blockId: string;
  order: number;
  overrides?: Partial<ContentBlock>;
}

// === CONTENT ===

export interface QuizAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ContentData {
  text?: string;
  markdown?: string;
  code?: string;
  language?: string;
  executable?: boolean;
  question?: string;
  answers?: QuizAnswer[];
  correctAnswerId?: string;
  mediaType?: 'image' | 'video' | 'svg' | 'lottie';
  src?: string;
  alt?: string;
  componentType?: string;
  componentProps?: Record<string, unknown>;
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  baseContent: ContentData;
  version: number;
}

export interface ContentVariant {
  id: string;
  blockId: string;
  variantType: 'audience' | 'accessibility' | 'language';
  locale?: string;
  audienceType?: AudienceType;
  accessibilityMode?: AccessibilityMode;
  content: ContentData;
  isAIGenerated: boolean;
}

// === SESSIONS ===

export interface SessionParticipant {
  userId: string;
  isActive: boolean;
  joinedAt: Date;
}

export interface PresentationSession {
  id: string;
  presenterId: string;
  presentationId: string;
  currentSlideId: string;
  participants: SessionParticipant[];
  isLive: boolean;
}

// === QUESTS ===

export interface QuestCriteria {
  type: 'slides_viewed' | 'interactions' | 'actions_sent' | 'quiz_completed';
  target: number;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  criteria: QuestCriteria;
  rewardXp: number;
  rewardCoins: number;
  isRepeatable: boolean;
}

export interface UserQuestProgress {
  questId: string;
  progress: number;
  isComplete: boolean;
  completedAt?: Date;
}

// === ACTIONS ===

export interface Action {
  id: string;
  name: string;
  description: string;
  barId: string;
  icon: string;
  cooldownMs: number;
  resourceCost: number;
  isEnabled: boolean;
}

export interface ActionBar {
  id: string;
  name: string;
  icon: string;
  actions: Action[];
}

// === FEEDBACK ===

export interface Feedback {
  id: string;
  userId?: string;
  sourceType: 'slide' | 'quiz' | 'action' | 'presentation' | 'block';
  sourceId: string;
  type: FeedbackType;
  content?: string;
  rating?: number;
  createdAt: Date;
}

// === ANALYTICS ===

export interface SessionAnalytics {
  sessionId: string;
  userId: string;
  presentationId: string;
  totalDuration: number;
  slidesViewed: number;
  actionsTriggered: number;
  feedbackSubmitted: number;
}

export interface SlideAnalytics {
  slideId: string;
  timeSpent: number;
  actionsUsed: string[];
  feedbackGiven: FeedbackType[];
}

// === APP STATE ===

export interface AppState {
  user: User | null;
  presentation: {
    current: Presentation | null;
    slides: Slide[];
    currentSlideIndex: number;
    completedSlides: string[];
  };
  session: {
    id: string | null;
    isLive: boolean;
    isPresenter: boolean;
    participants: SessionParticipant[];
  };
  ui: {
    panels: Record<string, PanelState>;
    activeActionBar: string;
    cooldowns: Record<string, number>;
    sidebarOpen: boolean;
  };
  quests: {
    active: Quest[];
    progress: UserQuestProgress[];
  };
}
