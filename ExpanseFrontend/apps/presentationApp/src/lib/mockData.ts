import type { Presentation, Slide, ContentBlock } from '../types';

// === MOCK CONTENT BLOCKS ===

export const MOCK_BLOCKS: ContentBlock[] = [
  {
    id: 'block-1',
    type: 'text',
    baseContent: {
      markdown: `# Welcome to Expanse EDU

This is a **gamified learning platform** that combines:

- 📚 Presentation System with slide navigation
- 🎮 Game UI with XP, coins, and quests
- 🤖 AI-powered learning actions
- 👥 Real-time collaboration

Use the **action bars** below to transform this content!`,
    },
    version: 1,
  },
  {
    id: 'block-2',
    type: 'code',
    baseContent: {
      code: `// Example: Using the action system
const handleAction = async (action: Action) => {
  // Deduct coins
  if (!spendCoins(action.resourceCost)) return;
  
  // Execute AI transformation
  const result = await executeAction(action.id, content);
  
  // Display result
  showResult(result);
};`,
      language: 'typescript',
    },
    version: 1,
  },
  {
    id: 'block-3',
    type: 'text',
    baseContent: {
      markdown: `## Learning Strategies

The app supports multiple **AI learning strategies**:

| Strategy | Description |
|----------|-------------|
| **Active Recall** | Forces retrieval of information |
| **Chunking** | Breaks into progressive layers |
| **Application** | Applies to real scenarios |
| **Metacognition** | Think about how you learn |

Click the **Quiz Me** action to test your understanding!`,
    },
    version: 1,
  },
  {
    id: 'block-4',
    type: 'quiz',
    baseContent: {
      question: 'Which learning strategy involves breaking topics into progressive layers?',
      answers: [
        { id: 'a', text: 'Active Recall', isCorrect: false },
        { id: 'b', text: 'Chunking & Layering', isCorrect: true },
        { id: 'c', text: 'Metacognition', isCorrect: false },
        { id: 'd', text: 'Application Bias', isCorrect: false },
      ],
    },
    version: 1,
  },
  {
    id: 'block-5',
    type: 'text',
    baseContent: {
      markdown: `## The Action Bar System

Our **game-style action bars** are inspired by games like:
- League of Legends
- World of Warcraft
- Fortnite

Each action has:
- ⏱️ **Cooldowns** - Wait before using again
- 💰 **Costs** - Spend coins to use
- 🎯 **Effects** - Transform content in different ways`,
    },
    version: 1,
  },
  {
    id: 'block-6',
    type: 'text',
    baseContent: {
      markdown: `## Real-Time Collaboration

### Presenter Mode
- 📺 Share your screen with the audience
- 🔄 Sync slide navigation in real-time
- 📊 See audience reactions aggregated

### Self-Paced Mode
- 🚶 Navigate freely at your own pace
- 💬 Access presenter chat as overlay
- 📝 Take personal notes per slide`,
    },
    version: 1,
  },
  {
    id: 'block-7',
    type: 'text',
    baseContent: {
      markdown: `## Congratulations! 🎉

You've completed the introduction to **Expanse EDU**.

### What you learned:
- ✅ How the presentation system works
- ✅ Game UI elements (XP, coins, quests)
- ✅ Action bars and AI transformations
- ✅ Real-time collaboration features

### Next Steps:
1. Explore more action bars
2. Complete the quests
3. Try presenter mode`,
    },
    version: 1,
  },
];

// === MOCK SLIDES ===

export const MOCK_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    name: 'Welcome',
    presentationIds: ['intro'],
    audienceTypes: ['student', 'teacher', 'general'],
    order: 0,
    unlockLevel: 1,
    blocks: [{ id: 'sb-1', slideId: 'slide-1', blockId: 'block-1', order: 0 }],
  },
  {
    id: 'slide-2',
    name: 'Code Example',
    presentationIds: ['intro'],
    audienceTypes: ['student', 'teacher'],
    order: 1,
    unlockLevel: 1,
    blocks: [{ id: 'sb-2', slideId: 'slide-2', blockId: 'block-2', order: 0 }],
  },
  {
    id: 'slide-3',
    name: 'Learning Strategies',
    presentationIds: ['intro'],
    audienceTypes: ['student', 'teacher', 'general'],
    order: 2,
    unlockLevel: 1,
    blocks: [
      { id: 'sb-3', slideId: 'slide-3', blockId: 'block-3', order: 0 },
      { id: 'sb-4', slideId: 'slide-3', blockId: 'block-4', order: 1 },
    ],
  },
  {
    id: 'slide-4',
    name: 'Action Bars',
    presentationIds: ['intro'],
    audienceTypes: ['student', 'teacher', 'general'],
    order: 3,
    unlockLevel: 2,
    blocks: [{ id: 'sb-5', slideId: 'slide-4', blockId: 'block-5', order: 0 }],
  },
  {
    id: 'slide-5',
    name: 'Collaboration',
    presentationIds: ['intro'],
    audienceTypes: ['student', 'teacher', 'general'],
    order: 4,
    unlockLevel: 2,
    blocks: [{ id: 'sb-6', slideId: 'slide-5', blockId: 'block-6', order: 0 }],
  },
  {
    id: 'slide-6',
    name: 'Summary',
    presentationIds: ['intro'],
    audienceTypes: ['student', 'teacher', 'general'],
    order: 5,
    unlockLevel: 1,
    blocks: [{ id: 'sb-7', slideId: 'slide-6', blockId: 'block-7', order: 0 }],
  },
];

// === MOCK PRESENTATIONS ===

export const MOCK_PRESENTATIONS: Presentation[] = [
  {
    id: 'intro',
    name: 'Introduction to Expanse EDU',
    description: 'A gamified learning platform overview',
    slideIds: MOCK_SLIDES.map((s) => s.id),
    isPublic: true,
  },
];

// === HELPERS ===

export const getPresentation = (id: string): Presentation | undefined =>
  MOCK_PRESENTATIONS.find((p) => p.id === id);

export const getSlidesForPresentation = (presentationId: string): Slide[] =>
  MOCK_SLIDES.filter((s) => s.presentationIds.includes(presentationId)).sort(
    (a, b) => a.order - b.order
  );

export const getSlide = (slideId: string): Slide | undefined =>
  MOCK_SLIDES.find((s) => s.id === slideId);

export const getBlock = (blockId: string): ContentBlock | undefined =>
  MOCK_BLOCKS.find((b) => b.id === blockId);

export const getBlocksForSlide = (slideId: string): ContentBlock[] => {
  const slide = getSlide(slideId);
  if (!slide) return [];
  return slide.blocks
    .sort((a, b) => a.order - b.order)
    .map((sb) => getBlock(sb.blockId))
    .filter((b): b is ContentBlock => b !== undefined);
};
