import type { StatusTableRow, ModuleSummary, TableOfContentsEntry } from '../../types/plans';

/**
 * Implementation Status - Central tracking of all feature implementation progress
 * 
 * Migrated from: plans/_index.md
 */

export const implementationStatus: StatusTableRow[] = [
  // Core
  { feature: 'Business Profile', category: 'Core', status: { data: 'done', ui: 'partial', logic: 'partial' }, overallStatus: 'Partial' },
  { feature: 'Brand Voice', category: 'Core', status: { data: 'done', ui: 'partial', logic: 'planned' }, overallStatus: 'Data + UI' },
  { feature: 'Custom Instructions', category: 'Core', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  { feature: 'Personal Profile', category: 'Core', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  { feature: 'Company Goals', category: 'Core', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  
  // Audience
  { feature: 'Audience Segments', category: 'Audience', status: { data: 'done', ui: 'partial', logic: 'planned' }, overallStatus: 'Data + UI' },
  { feature: 'User Personas', category: 'Audience', status: { data: 'done', ui: 'partial', logic: 'planned' }, overallStatus: 'Data + UI' },
  { feature: 'Pain Points / Goals', category: 'Audience', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  
  // Content Strategy
  { feature: 'Content Pillars', category: 'Content Strategy', status: { data: 'done', ui: 'partial', logic: 'planned' }, overallStatus: 'Data + UI' },
  { feature: 'Topics / Themes', category: 'Content Strategy', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  { feature: 'Key Messages', category: 'Content Strategy', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  { feature: 'Campaigns', category: 'Content Strategy', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  
  // Platforms
  { feature: 'Platform Config', category: 'Platforms', status: { data: 'done', ui: 'partial', logic: 'planned' }, overallStatus: 'Data + UI' },
  { feature: 'Schedule Config', category: 'Platforms', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  
  // Products
  { feature: 'Products', category: 'Products', status: { data: 'done', ui: 'partial', logic: 'planned' }, overallStatus: 'Data + UI' },
  { feature: 'Benefits / Solutions', category: 'Products', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  
  // AI Config
  { feature: 'Prompt Templates', category: 'AI Config', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  { feature: 'Content Pipelines', category: 'AI Config', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  
  // Visual
  { feature: 'Visual Identity', category: 'Visual', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  { feature: 'Image Preferences', category: 'Visual', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  
  // Examples
  { feature: 'Few Shot Examples', category: 'Examples', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
  
  // Generation Module
  { feature: 'Create Phase', category: 'Generation Module', status: { data: 'partial', ui: 'planned', logic: 'planned' }, overallStatus: 'Planned' },
  { feature: 'Review Phase', category: 'Generation Module', status: { data: 'partial', ui: 'planned', logic: 'planned' }, overallStatus: 'Planned' },
  { feature: 'Internationalization', category: 'Generation Module', status: { data: 'planned', ui: 'planned', logic: 'planned' }, overallStatus: 'Planned' },
  { feature: 'Scheduling', category: 'Generation Module', status: { data: 'partial', ui: 'planned', logic: 'planned' }, overallStatus: 'Planned' },
  { feature: 'Content Library', category: 'Generation Module', status: { data: 'done', ui: 'planned', logic: 'planned' }, overallStatus: 'Data Only' },
];

export const moduleSummaries: ModuleSummary[] = [
  {
    id: 'generation',
    title: 'Generation Module',
    description: 'The core content creation system. Enables creating and scheduling consistent content aligned with business data, themes, and goals. Supports posts, images, short-form video, conversation scripts & audio. Features AI pipelines with human creativity preserved.',
  },
  {
    id: 'personal-profile',
    title: 'Personal Profile',
    description: 'User identity data including attributes, themes, personality, interests, and long-term memory.',
  },
  {
    id: 'assets',
    title: 'Assets',
    description: 'Image management and storage.',
  },
  {
    id: 'few-shot-examples',
    title: 'Few Shot Examples',
    description: 'Personal & business example content for AI training - images, posts, style descriptions.',
  },
  {
    id: 'content-library',
    title: 'Content Library',
    description: 'Existing posts, common topics, example content, prioritized/ranked.',
  },
  {
    id: 'audience',
    title: 'Audience',
    description: 'Demographics, psychographics, group types, target audience definitions.',
  },
];

export const tableOfContents: TableOfContentsEntry[] = [
  { id: 'tasks', title: 'Tasks', path: '/tasks', description: 'High priority & pending tasks' },
  { id: 'generation', title: 'Generation Module', path: '/modules/generation', description: '' },
  { id: 'gen-overview', title: 'Overview', path: '/modules/generation/overview', description: 'Goals, requirements, data context', indent: 1 },
  { id: 'gen-content-types', title: 'Content Type Flows', path: '/modules/generation/content-type-flows', description: 'Per-type editing processes & pipelines', indent: 1 },
  { id: 'gen-process-flow', title: 'Process Flow', path: '/modules/generation/process-flow', description: 'Visual process diagrams', indent: 1 },
  { id: 'gen-ux-ui', title: 'UX/UI', path: '/modules/generation/ux-ui', description: 'Interface, navigation, FABs', indent: 1 },
  { id: 'gen-review', title: 'Review Process', path: '/modules/generation/review-process', description: 'Ratings, approvals, version control', indent: 1 },
  { id: 'gen-scheduling', title: 'Scheduling', path: '/modules/generation/scheduling', description: 'Publishing flow & automation', indent: 1 },
  { id: 'gen-i18n', title: 'Internationalization', path: '/modules/generation/internationalization', description: 'Translation phase', indent: 1 },
  { id: 'gen-library', title: 'Content Library', path: '/modules/generation/content-library', description: 'Generated content views', indent: 1 },
  { id: 'gen-config', title: 'Configuration', path: '/modules/generation/configuration', description: 'All configurable settings', indent: 1 },
  { id: 'gen-questions', title: 'Questions', path: '/modules/generation/questions', description: 'Open decisions to resolve', indent: 1 },
  { id: 'gen-screens', title: 'Screens', path: '/modules/generation/screens', description: 'All UI screens & status', indent: 1 },
  { id: 'personal-profile', title: 'Personal Profile', path: '/modules/personal-profile', description: 'User profile features' },
  { id: 'assets', title: 'Assets', path: '/modules/assets', description: 'Image management' },
  { id: 'few-shot-examples', title: 'Few Shot Examples', path: '/modules/few-shot-examples', description: 'AI training examples' },
  { id: 'content-library', title: 'Content Library', path: '/modules/content-library', description: 'Existing posts & content' },
  { id: 'audience', title: 'Audience', path: '/modules/audience', description: 'Demographics & targeting' },
  { id: 'future-ideas', title: 'Future Ideas', path: '/future-ideas', description: 'Guiding principles, MVP scope, UX goals, backlog' },
];
