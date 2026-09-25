import { create } from 'zustand';
import type {
  User,
  Presentation,
  Slide,
  PanelState,
  SessionParticipant,
  Quest,
  UserQuestProgress,
  FeedbackType,
} from '../types';

// === MOCK USER ===

const mockUser: User = {
  id: 'user-1',
  email: 'demo@expanse.edu',
  displayName: 'Demo User',
  level: 5,
  xp: 2340,
  coins: 150,
  preferences: {
    accessibilityMode: 'default',
    audioEnabled: true,
    audioVolume: 0.7,
    theme: 'dark',
    locale: 'en',
    panelLayout: {},
  },
  equippedItems: [],
};

// === USER STORE ===

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: mockUser,
  setUser: (user) => set({ user }),
  addXp: (amount) =>
    set((state) => {
      if (!state.user) return state;
      const newXp = state.user.xp + amount;
      const xpPerLevel = 1000;
      const newLevel = Math.floor(newXp / xpPerLevel) + 1;
      return {
        user: {
          ...state.user,
          xp: newXp,
          level: Math.max(state.user.level, newLevel),
        },
      };
    }),
  addCoins: (amount) =>
    set((state) => {
      if (!state.user) return state;
      return { user: { ...state.user, coins: state.user.coins + amount } };
    }),
  spendCoins: (amount) => {
    const { user } = get();
    if (!user || user.coins < amount) return false;
    set({ user: { ...user, coins: user.coins - amount } });
    return true;
  },
}));

// === PRESENTATION STORE ===

interface PresentationStore {
  presentation: Presentation | null;
  slides: Slide[];
  currentSlideIndex: number;
  completedSlides: Set<string>;
  setPresentation: (presentation: Presentation, slides: Slide[]) => void;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  markSlideComplete: (slideId: string) => void;
}

export const usePresentationStore = create<PresentationStore>((set, get) => ({
  presentation: null,
  slides: [],
  currentSlideIndex: 0,
  completedSlides: new Set(),
  setPresentation: (presentation, slides) =>
    set({ presentation, slides, currentSlideIndex: 0 }),
  goToSlide: (index) => {
    const { slides } = get();
    if (index >= 0 && index < slides.length) {
      set({ currentSlideIndex: index });
    }
  },
  nextSlide: () => {
    const { currentSlideIndex, slides } = get();
    if (currentSlideIndex < slides.length - 1) {
      set({ currentSlideIndex: currentSlideIndex + 1 });
    }
  },
  prevSlide: () => {
    const { currentSlideIndex } = get();
    if (currentSlideIndex > 0) {
      set({ currentSlideIndex: currentSlideIndex - 1 });
    }
  },
  markSlideComplete: (slideId) =>
    set((state) => {
      const newCompleted = new Set(state.completedSlides);
      newCompleted.add(slideId);
      return { completedSlides: newCompleted };
    }),
}));

// === SESSION STORE ===

interface SessionStore {
  sessionId: string | null;
  isLive: boolean;
  isPresenter: boolean;
  participants: SessionParticipant[];
  reactions: Record<FeedbackType, number>;
  startSession: (presentationId: string) => void;
  endSession: () => void;
  joinSession: (sessionId: string) => void;
  addReaction: (type: FeedbackType) => void;
  clearReactions: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessionId: null,
  isLive: false,
  isPresenter: false,
  participants: [],
  reactions: {} as Record<FeedbackType, number>,
  startSession: (presentationId) =>
    set({
      sessionId: `session-${Date.now()}`,
      isLive: true,
      isPresenter: true,
    }),
  endSession: () =>
    set({
      sessionId: null,
      isLive: false,
      isPresenter: false,
      participants: [],
    }),
  joinSession: (sessionId) =>
    set({
      sessionId,
      isLive: true,
      isPresenter: false,
    }),
  addReaction: (type) =>
    set((state) => ({
      reactions: {
        ...state.reactions,
        [type]: (state.reactions[type] || 0) + 1,
      },
    })),
  clearReactions: () => set({ reactions: {} as Record<FeedbackType, number> }),
}));

// === UI STORE ===

interface UIStore {
  panels: Record<string, PanelState>;
  activeActionBar: string;
  cooldowns: Record<string, number>;
  sidebarOpen: boolean;
  togglePanel: (panelId: string) => void;
  setActiveActionBar: (barId: string) => void;
  setCooldown: (actionId: string, endsAt: number) => void;
  clearCooldown: (actionId: string) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  panels: {
    chat: { isOpen: false, position: 'right' },
    quests: { isOpen: false, position: 'right' },
    notes: { isOpen: false, position: 'bottom' },
    feedback: { isOpen: false, position: 'bottom' },
  },
  activeActionBar: 'learning',
  cooldowns: {},
  sidebarOpen: true,
  togglePanel: (panelId) =>
    set((state) => ({
      panels: {
        ...state.panels,
        [panelId]: {
          ...state.panels[panelId],
          isOpen: !state.panels[panelId]?.isOpen,
        },
      },
    })),
  setActiveActionBar: (barId) => set({ activeActionBar: barId }),
  setCooldown: (actionId, endsAt) =>
    set((state) => ({
      cooldowns: { ...state.cooldowns, [actionId]: endsAt },
    })),
  clearCooldown: (actionId) =>
    set((state) => {
      const { [actionId]: _, ...rest } = state.cooldowns;
      return { cooldowns: rest };
    }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// === QUEST STORE ===

interface QuestStore {
  quests: Quest[];
  progress: UserQuestProgress[];
  updateProgress: (questId: string, amount: number) => void;
  completeQuest: (questId: string) => void;
}

const mockQuests: Quest[] = [
  {
    id: 'q1',
    name: 'View 3 Slides',
    description: 'View at least 3 slides in this presentation',
    criteria: { type: 'slides_viewed', target: 3 },
    rewardXp: 50,
    rewardCoins: 10,
    isRepeatable: false,
  },
  {
    id: 'q2',
    name: 'Use 3 Actions',
    description: 'Trigger 3 learning actions',
    criteria: { type: 'actions_sent', target: 3 },
    rewardXp: 75,
    rewardCoins: 15,
    isRepeatable: false,
  },
  {
    id: 'q3',
    name: 'Complete a Quiz',
    description: 'Answer a quiz question correctly',
    criteria: { type: 'quiz_completed', target: 1 },
    rewardXp: 100,
    rewardCoins: 25,
    isRepeatable: true,
  },
];

export const useQuestStore = create<QuestStore>((set) => ({
  quests: mockQuests,
  progress: mockQuests.map((q) => ({
    questId: q.id,
    progress: 0,
    isComplete: false,
  })),
  updateProgress: (questId, amount) =>
    set((state) => ({
      progress: state.progress.map((p) =>
        p.questId === questId ? { ...p, progress: p.progress + amount } : p
      ),
    })),
  completeQuest: (questId) =>
    set((state) => ({
      progress: state.progress.map((p) =>
        p.questId === questId
          ? { ...p, isComplete: true, completedAt: new Date() }
          : p
      ),
    })),
}));
