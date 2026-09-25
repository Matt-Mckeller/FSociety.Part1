import type { PlanModule } from '../../../../../types/plans';

/**
 * Cultural Alignment & Language Translation Pipeline
 * 
 * Ensuring content resonates across cultures and languages
 */

export const pipelinesCulturalAlignment: PlanModule = {
  id: 'pipelines-cultural-alignment',
  title: 'Cultural Alignment & Translation',
  description: 'Pipeline for cultural adaptation and language translation of content',
  status: { data: 'planned', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Content that works in one culture or language may not translate effectively to another. This pipeline ensures cultural resonance and accurate localization.',
        },
      ],
    },
    {
      id: 'cultural-review-phases',
      title: 'Cultural Review Phases',
      content: [
        {
          type: 'table',
          headers: ['Phase', 'Description'],
          rows: [
            ['Cultural Context Analysis', 'Identify cultural assumptions, idioms, and references in source content'],
            ['Sensitivity Review', 'Flag potentially offensive or misunderstood elements for target culture'],
            ['Adaptation', 'Modify content to resonate with target cultural values and norms'],
            ['Local Expert Review', 'Human verification by someone familiar with target culture'],
          ],
        },
      ],
    },
    {
      id: 'translation-pipeline',
      title: 'Translation Pipeline',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Phase 1 — Initial Translation',
        },
        {
          type: 'text',
          value: 'Generate initial translation preserving meaning and intent.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 2 — Cultural Adaptation',
        },
        {
          type: 'text',
          value: 'Adapt idioms, references, and tone for target culture.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 3 — Brand Voice Alignment',
        },
        {
          type: 'text',
          value: 'Ensure translated content maintains brand voice characteristics.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 4 — Native Review',
        },
        {
          type: 'text',
          value: 'Review by native speaker for natural flow and accuracy.',
        },
      ],
    },
    {
      id: 'cultural-dimensions',
      title: 'Cultural Dimensions to Consider',
      content: [
        {
          type: 'table',
          headers: ['Dimension', 'Considerations'],
          rows: [
            ['Formality', 'Formal vs casual tone expectations'],
            ['Directness', 'Direct vs indirect communication styles'],
            ['Humor', 'What types of humor translate well'],
            ['Visual references', 'Colors, symbols, imagery that carry meaning'],
            ['Values emphasis', 'Individualism vs collectivism, hierarchy, etc.'],
            ['Religious/political sensitivity', 'Topics to avoid or handle carefully'],
          ],
        },
      ],
    },
    {
      id: 'prompt-examples',
      title: 'Example Prompts',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Cultural Adaptation Prompt',
        },
        {
          type: 'quote',
          value: '"Review this content for cultural appropriateness in [target culture]. Identify any idioms, references, or assumptions that may not translate. Suggest adaptations that preserve the core message while resonating with [target audience]."',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Translation with Context',
        },
        {
          type: 'quote',
          value: '"Translate this content to [language] for a [formal/casual] business context. Maintain the brand voice characteristics: [voice traits]. Adapt cultural references as needed while preserving the emotional impact."',
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'pipelines-overview', title: 'Pipelines Overview', path: '/modules/generation/pipelines', description: 'Pipeline methodology overview' },
    { id: 'pipelines-audience-reviews', title: 'Audience Reviews', path: '/modules/generation/pipelines/audience-reviews', description: 'Multi-perspective evaluation' },
    { id: 'generation-internationalization', title: 'Internationalization', path: '/modules/generation/internationalization', description: 'Translation phase' },
  ],
};
