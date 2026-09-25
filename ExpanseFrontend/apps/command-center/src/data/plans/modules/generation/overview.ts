import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Overview
 * Core content creation system for posts, images, video, scripts & audio
 * 
 * Migrated from: plans/generation/overview.md
 */

export const generationOverview: PlanModule = {
  id: 'generation-overview',
  title: 'Generation Module: Overview',
  description: 'Core content creation system for posts, images, video, scripts & audio',
  sections: [
    {
      id: 'initial-scope',
      title: 'Initial Scope',
      content: [
        {
          type: 'text',
          value: 'Posts / Social Media / Digital Assets / Content / Educational Material. Being able to provide context for anything that I want to generate with AI.',
        },
      ],
    },
    {
      id: 'primary-goals',
      title: 'Primary Goals',
      content: [
        {
          type: 'list',
          items: [
            'Easily create and schedule consistent content that aligns with business data, theme, goals, etc.',
          ],
        },
      ],
    },
    {
      id: 'secondary-goals',
      title: 'Secondary Goals',
      content: [
        {
          type: 'list',
          items: [
            'Utilize AI Pipelines to create the best results',
            'Utilize People assisted by AI to create the best results',
            'Still allow for human creativity, and manual editing',
          ],
        },
      ],
    },
    {
      id: 'requirements',
      title: 'Requirements',
      content: [
        {
          type: 'list',
          items: [
            'Appropriately pull from and utilize business (or personal) context from business profile. Each prompt/request type may have specificly defined context to pull or logic determining which content type is included and pulled at random. We should save a copy of the selected and generated prompt when one is used to the database',
            'Varying Content Types: Posts, Images, Short Form Video, Conversation Scripts & Audio',
            'Internationalization',
            'Configurability',
            'Optimized for different social media platforms',
          ],
        },
      ],
    },
    {
      id: 'data-context',
      title: 'Data Context',
      content: [
        {
          type: 'text',
          value: 'Depending on the variant selected, data will be prepopulated for the individual or the business as defined by the prompt or set up by the user.',
        },
        { type: 'heading', level: 4, text: 'Data Sources' },
        {
          type: 'list',
          items: [
            'Business Profile',
            'Personal Profile',
            'Preset Prompts',
            'User-defined configurations',
          ],
        },
        { type: 'heading', level: 4, text: 'Poster Types' },
        {
          type: 'list',
          items: [
            'Business',
            'Personal For Business (CEO, etc.)',
            'Personal For Personal',
          ],
        },
      ],
    },
    {
      id: 'content-types',
      title: 'Content Types',
      content: [
        {
          type: 'table',
          headers: ['Type', 'Description', 'Flow'],
          rows: [
            ['Posts', 'Social media text content', 'Standard'],
            ['Images', 'With/without labels, multi-language, formatted/cropped for platform', 'Standard'],
            ['Scripts (Audio)', 'Voice/audio scripts', 'Script → Audio'],
            ['Scripts (Video)', 'Self-recording or AI-generated video', 'Script → Video'],
            ['Scripts (Audio/Visual)', 'Combined audio and visual sync', 'Multi-stage'],
            ['Visual Scripts', 'Scripts with symbols, environment, scene specs', 'Visual → Video'],
          ],
        },
        {
          type: 'text',
          value: 'See Content Type Flows for detailed per-type editing processes and transformation pipelines.',
        },
        { type: 'heading', level: 4, text: 'Content Pillar Types' },
        {
          type: 'text',
          value: 'Learning, Selling, Engagement, Thought Leadership, etc.',
        },
        { type: 'heading', level: 4, text: 'Content Styles' },
        {
          type: 'text',
          value: 'Visual, Engaging, Story, Educational, How-To, Tutorial, Explainer, Tips, Listicle, Case Study, Behind-the-Scenes, Q&A, ...',
        },
      ],
    },
    {
      id: 'pipelines',
      title: 'Pipelines',
      content: [
        {
          type: 'list',
          items: [
            'Joining goals and other data into prompt',
            'Multi-model samples - join responses from multiple models to compare',
            'Transformation pipelines (see Content Type Flows)',
            'Best Content Type Recommendations from AI',
          ],
        },
      ],
    },
    {
      id: 'tasks',
      title: 'Tasks',
      content: [
        { type: 'heading', level: 4, text: 'Additional Requirements/Details' },
        {
          type: 'list',
          items: [
            'For all plans, include links and descriptions regarding which ones have associated data types',
            'We will be using TypeScript interfaces with descriptions to define all data',
          ],
        },
        {
          type: 'tasks',
          items: [
            { id: 'gen-task-1', title: 'Utilize AI to organize content into process, configuration options, and screens', completed: false },
            { id: 'gen-task-2', title: 'Generate Plan for Improved feature documentation and planning for the generation module - Generate plan files/markdown files documenting the required UI components and screens and their details', completed: false },
            { id: 'gen-task-3', title: 'Generate Plan for Process Flow Visualizations', completed: false },
            { id: 'gen-task-4', title: 'Generate Plan for Data, Logic, Pipelines', completed: false },
            { id: 'gen-task-5', title: 'Define content type transformation pipelines (script → audio, etc.)', completed: false },
            { id: 'gen-task-6', title: 'Generate Plan for Architecture', completed: false },
            { id: 'gen-task-7', title: 'Generate Plan to create some Prompts and describe prompt combination logic including how to specify which data to pull and from where and for which prompts etc. I also want to have a list of all the types of prompts and configuration options that the UI may have', completed: false },
            { id: 'gen-task-8', title: 'Create TypeScript interfaces for AI feedback and improvements', completed: false },
            { id: 'gen-task-9', title: 'Generate Plan for APIs', completed: false },
            { id: 'gen-task-10', title: 'Generate Screen Samples / Mockups Etc', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'content-type-flows', title: 'Content Type Flows', path: '/modules/generation/content-type-flows', description: 'Per-type editing processes and pipelines' },
    { id: 'process-flow', title: 'Process Flow', path: '/modules/generation/process-flow', description: 'Visual process diagrams' },
    { id: 'ux-ui', title: 'UX/UI', path: '/modules/generation/ux-ui', description: 'Interface and navigation' },
    { id: 'screens', title: 'Screens', path: '/modules/generation/screens', description: 'All UI screens and implementation status' },
    { id: 'review-process', title: 'Review Process', path: '/modules/generation/review-process', description: 'Approval workflow' },
    { id: 'configuration', title: 'Configuration', path: '/modules/generation/configuration', description: 'Settings' },
  ],
};
