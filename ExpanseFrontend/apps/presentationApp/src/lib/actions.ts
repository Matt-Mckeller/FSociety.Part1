import type { ActionBar, Action } from '../types';

// === ACTION DEFINITIONS ===

const createAction = (
  id: string,
  name: string,
  description: string,
  barId: string,
  icon: string,
  cooldownMs = 3000,
  resourceCost = 10
): Action => ({
  id,
  name,
  description,
  barId,
  icon,
  cooldownMs,
  resourceCost,
  isEnabled: true,
});

// Learning Bar (Primary)
const LEARNING_ACTIONS: Action[] = [
  createAction('expand', 'Expand', 'Adds more detail and depth', 'learning', '📖'),
  createAction('simplify', 'Simplify', 'Reduces complexity, simpler language', 'learning', '✨'),
  createAction('research', 'Research', 'Pulls in additional context', 'learning', '🔍'),
  createAction('clarify', 'Clarify', 'Rephrases for clarity', 'learning', '💡'),
  createAction('visualize', 'Visualize', 'Converts to visual representation', 'learning', '🎨'),
  createAction('examples', 'Examples', 'Provides examples', 'learning', '📝'),
  createAction('step-by-step', 'Step-by-Step', 'Sequential breakdown', 'learning', '📋'),
  createAction('quiz-me', 'Quiz Me', 'Generates quiz on content', 'learning', '❓'),
];

// Visual Bar
const VISUAL_ACTIONS: Action[] = [
  createAction('svg', 'SVG', 'Generates SVG diagram', 'visual', '🖼️', 5000, 20),
  createAction('image', 'Image', 'Generates image', 'visual', '📷', 8000, 30),
  createAction('ascii', 'ASCII Art', 'Text-based visualization', 'visual', '🔤'),
  createAction('diagram', 'Diagram', 'Creates diagram', 'visual', '📊'),
];

// Spatial Bar
const SPATIAL_ACTIONS: Action[] = [
  createAction('mind-map', 'Mind Map', 'Connected node diagram', 'spatial', '🗺️'),
  createAction('timeline', 'Timeline', 'Chronological arrangement', 'spatial', '📅'),
  createAction('hierarchy', 'Hierarchy', 'Parent-child relationships', 'spatial', '🌳'),
  createAction('flowchart', 'Flowchart', 'Process flow visualization', 'spatial', '🔀'),
  createAction('compare', 'Compare', 'Side-by-side comparison', 'spatial', '⚖️'),
];

// Emotional Bar
const EMOTIONAL_ACTIONS: Action[] = [
  createAction('emotional-hook', 'Story', 'Connects to emotional story', 'emotional', '💖'),
  createAction('personal', 'Personal', 'Connects to your goals', 'emotional', '🎯'),
  createAction('inspire', 'Inspire', 'Motivational framing', 'emotional', '🌟'),
  createAction('reflect', 'Reflect', 'Prompts self-reflection', 'emotional', '🪞'),
];

// Memory Bar
const MEMORY_ACTIONS: Action[] = [
  createAction('flashcard', 'Flashcard', 'Generates flashcard format', 'memory', '🃏'),
  createAction('chunking', 'Chunk', 'Groups into memorable chunks', 'memory', '📦'),
  createAction('mnemonic', 'Mnemonic', 'Creates memory device', 'memory', '🧠'),
  createAction('spaced-rep', 'Schedule', 'Schedules review', 'memory', '⏰'),
];

// Critical Bar
const CRITICAL_ACTIONS: Action[] = [
  createAction('fact-check', 'Fact Check', 'Verifies claims', 'critical', '✅'),
  createAction('devils-advocate', "Devil's Advocate", 'Argues against', 'critical', '😈'),
  createAction('assumptions', 'Assumptions', 'Surfaces hidden assumptions', 'critical', '🔎'),
  createAction('bias', 'Bias Check', 'Identifies potential biases', 'critical', '⚠️'),
];

// Social Bar (Quick reactions - no cooldown/cost)
const SOCIAL_ACTIONS: Action[] = [
  createAction('confused', "I'm Confused", 'Signal confusion', 'social', '😕', 0, 0),
  createAction('get-it', 'I Get It', 'Confirm understanding', 'social', '✅', 0, 0),
  createAction('slow-down', 'Slow Down', 'Request slower pace', 'social', '🐢', 0, 0),
  createAction('speed-up', 'Speed Up', 'Ready for more', 'social', '🐇', 0, 0),
  createAction('thumbs-up', '👍', 'Positive feedback', 'social', '👍', 0, 0),
  createAction('thumbs-down', '👎', 'Negative feedback', 'social', '👎', 0, 0),
];

// === ACTION BARS ===

export const ACTION_BARS: ActionBar[] = [
  { id: 'learning', name: 'Learning', icon: '📚', actions: LEARNING_ACTIONS },
  { id: 'visual', name: 'Visual', icon: '🎨', actions: VISUAL_ACTIONS },
  { id: 'spatial', name: 'Spatial', icon: '🗺️', actions: SPATIAL_ACTIONS },
  { id: 'emotional', name: 'Emotional', icon: '💖', actions: EMOTIONAL_ACTIONS },
  { id: 'memory', name: 'Memory', icon: '🧠', actions: MEMORY_ACTIONS },
  { id: 'critical', name: 'Critical', icon: '🔍', actions: CRITICAL_ACTIONS },
  { id: 'social', name: 'Social', icon: '👥', actions: SOCIAL_ACTIONS },
];

export const getActionBar = (barId: string): ActionBar | undefined =>
  ACTION_BARS.find((bar) => bar.id === barId);

export const getAction = (actionId: string): Action | undefined => {
  for (const bar of ACTION_BARS) {
    const action = bar.actions.find((a) => a.id === actionId);
    if (action) return action;
  }
  return undefined;
};

export const getAllActions = (): Action[] =>
  ACTION_BARS.flatMap((bar) => bar.actions);
