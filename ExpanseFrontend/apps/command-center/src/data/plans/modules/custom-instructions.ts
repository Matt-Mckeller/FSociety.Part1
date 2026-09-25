import type { PlanModule } from '../../../types/plans';

/**
 * Custom Instructions Module
 * 
 * User-defined rules and guidelines for content generation.
 * Source: data-architecture/core/custom-instructions.ts
 */

export const customInstructions: PlanModule = {
  id: 'custom-instructions',
  title: 'Custom Instructions',
  description: 'User-defined rules that AI must always follow or never violate during content generation',
  status: { data: 'done', ui: 'planned', logic: 'planned' },
  overallStatus: 'Data Only',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Custom Instructions are HARD RULES that the AI must always follow or never violate. These provide user control over content generation beyond the automatic context.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Purpose',
        },
        {
          type: 'list',
          items: [
            'Define global rules (alwaysDo, neverDo, formatRules)',
            'Set platform-specific instructions',
            'Establish content-type specific guidelines',
            'Allow persona-specific adjustments',
          ],
        },
      ],
    },
    {
      id: 'instruction-types',
      title: 'Instruction Types',
      content: [
        {
          type: 'table',
          headers: ['Type', 'Scope', 'Example'],
          rows: [
            ['alwaysDo', 'Global', '"Always mention our free tier"'],
            ['neverDo', 'Global', '"Never use competitor names"'],
            ['formatRules', 'Global', '"Start with emoji", "End with question"'],
            ['platformInstructions', 'Per platform', '"On LinkedIn, use professional tone"'],
            ['contentTypeInstructions', 'Per content type', '"For promotional: always include pricing"'],
            ['personaInstructions', 'Per audience', '"For CTOs: use technical language"'],
          ],
        },
      ],
    },
    {
      id: 'ai-usage',
      title: 'AI Usage',
      content: [
        {
          type: 'text',
          value: 'These are HARD RULES that override other considerations:',
        },
        {
          type: 'list',
          items: [
            '**Always apply** alwaysDo rules to every piece of content',
            '**Never violate** neverDo rules under any circumstances',
            '**Apply formatRules** to content structure',
            '**Layer platform and content-type instructions** over global rules',
          ],
        },
      ],
    },
    {
      id: 'typescript-definition',
      title: 'TypeScript Definition',
      collapsed: true,
      content: [
        {
          type: 'code',
          language: 'typescript',
          code: `interface CustomInstructions extends BusinessEntity {
  global: {
    alwaysDo: string[];
    neverDo: string[];
    formatRules: string[];
  };
  platformInstructions?: PlatformInstruction[];
  contentTypeInstructions?: ContentTypeInstruction[];
  personaInstructions?: PersonaInstruction[];
  additionalNotes?: string;
}

interface PlatformInstruction {
  platform: string;
  instructions: string[];
}

interface ContentTypeInstruction {
  contentType: string;
  instructions: string[];
}

interface PersonaInstruction {
  personaId: string;
  instructions: string[];
}`,
        },
      ],
    },
    {
      id: 'tasks',
      title: 'Tasks',
      content: [
        {
          type: 'tasks',
          items: [
            { id: 'ci-1', title: 'Create instructions management UI', completed: false },
            { id: 'ci-2', title: 'Add platform instruction builder', completed: false },
            { id: 'ci-3', title: 'Implement instruction validation', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'business-profile', title: 'Business Profile', path: '/modules/business-profile', description: 'Parent entity' },
    { id: 'prompt-examples', title: 'Prompt Examples', path: '/modules/prompt-examples', description: 'How instructions are used' },
  ],
};
