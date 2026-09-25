import type { PlanModule } from '../../../../types/plans';

/**
 * Design Mockups
 * 
 * Storybook-based mockup system for generation module screens
 * Source: plans/generation/design/mockups-plan.md
 */

export const generationDesignMockups: PlanModule = {
  id: 'generation-design-mockups',
  title: 'Design Mockups',
  description: 'Storybook-based mockup system for generation module screens',
  status: { data: 'done', ui: 'partial', logic: 'planned' },
  overallStatus: 'Partial',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Create a design exploration environment using **Storybook** alongside the main Next.js app. This allows isolated screen mockups with multiple variations while sharing the same tech stack (React, MUI, TypeScript).',
        },
      ],
    },
    {
      id: 'why-storybook',
      title: 'Why Storybook?',
      content: [
        {
          type: 'table',
          headers: ['Benefit', 'Description'],
          rows: [
            ['Same Tech Stack', 'Uses existing React/MUI/TS components'],
            ['Variations Built-in', '"Stories" pattern supports multiple screen variations'],
            ['Isolated', 'Runs separately from main app, no interference'],
            ['Interactive', 'Click through, test states, responsive views'],
            ['Shareable', 'Can deploy as static site for team review'],
            ['Component Reuse', 'Mockup components can graduate to main app'],
          ],
        },
      ],
    },
    {
      id: 'implementation-phases',
      title: 'Implementation Phases',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Phase 1: Setup (P1) ✅',
        },
        {
          type: 'tasks',
          items: [
            { id: 'dm-1', title: 'Install Storybook', completed: true },
            { id: 'dm-2', title: 'Configure MUI theme integration', completed: true },
            { id: 'dm-3', title: 'Create mock data structure', completed: true },
            { id: 'dm-4', title: 'Set up shared mockup utilities', completed: true },
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 2: Core Screens (P1) ✅',
        },
        {
          type: 'tasks',
          items: [
            { id: 'dm-5', title: 'Dashboard mockup + 5 variations', completed: true },
            { id: 'dm-6', title: 'Create screen mockup + 4 variations', completed: true },
            { id: 'dm-7', title: 'Review Queue mockup + 3 variations', completed: true },
            { id: 'dm-8', title: 'Content Editor mockup + 5 variations', completed: true },
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 3: Secondary Screens (P2)',
        },
        {
          type: 'tasks',
          items: [
            { id: 'dm-9', title: 'Schedule Calendar mockup + 4 variations', completed: true },
            { id: 'dm-10', title: 'Content Library mockup + 4 variations', completed: true },
            { id: 'dm-11', title: 'Settings mockup', completed: false },
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 4: Extended Screens (P3)',
        },
        {
          type: 'tasks',
          items: [
            { id: 'dm-12', title: 'Teleprompter mockup', completed: false },
            { id: 'dm-13', title: 'Analytics mockup', completed: false },
            { id: 'dm-14', title: 'Team Management mockup', completed: false },
            { id: 'dm-15', title: 'Preset Prompt Builder mockup', completed: false },
          ],
        },
      ],
    },
    {
      id: 'variation-strategy',
      title: 'Variation Strategy',
      content: [
        {
          type: 'text',
          value: 'Each screen should have variations exploring:',
        },
        {
          type: 'table',
          headers: ['Variation Type', 'Purpose'],
          rows: [
            ['State Variations', 'Empty, loading, populated, error'],
            ['Layout Variations', 'Mobile, tablet, desktop'],
            ['UI Pattern Variations', 'Different interaction patterns (cards vs list)'],
            ['Density Variations', 'Minimal vs feature-rich'],
            ['Theme Variations', 'Light/dark mode'],
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'generation-screens', title: 'Screens', path: '/modules/generation/screens', description: 'All UI screens & status' },
    { id: 'generation-ux-ui', title: 'UX/UI', path: '/modules/generation/ux-ui', description: 'Interface patterns' },
  ],
};
