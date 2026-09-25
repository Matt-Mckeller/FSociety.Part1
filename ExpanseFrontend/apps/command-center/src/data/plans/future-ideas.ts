import type { PlanModule } from '../../types/plans';

/**
 * Future Ideas - Backlog, brainstorm, and expansion concepts
 * 
 * Migrated from: plans/future_ideas.md
 */

export const futureIdeas: PlanModule = {
  id: 'future-ideas',
  title: 'Future Ideas',
  description: 'Backlog, brainstorm, and expansion concepts',
  sections: [
    {
      id: 'guiding-principles',
      title: 'Guiding Principles',
      content: [],
      subsections: [
        {
          id: 'things-to-avoid',
          title: 'Things to Avoid',
          content: [
            {
              type: 'list',
              items: [
                '**Agency exploitation prevention**: Prevent other agencies from taking advantage of the system',
                '**Fair compensation**: Ensure people are paid fairly; don\'t enable underpaying creators/workers',
                'Build protections into the platform model as it scales',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'mvp-scope',
      title: 'MVP Scope',
      content: [
        {
          type: 'list',
          items: [
            'Initial MVP is primarily for personal use',
            '**Multi-business architecture**: Design to support multiple businesses from the start, but build with single business for simplicity first',
            'Keep initial complexity low; expand later',
          ],
        },
      ],
    },
    {
      id: 'ux-design-goals',
      title: 'UX Design Goals',
      content: [],
      subsections: [
        {
          id: 'purpose-goals-first',
          title: 'Purpose & Goals First',
          content: [
            {
              type: 'list',
              items: [
                'Make **purpose and goals** the priority for businesses to fill out',
                'Ensure every company has clearly defined:',
                {
                  type: 'list',
                  items: ['Purpose', 'Goals', 'Values', 'Things they care about'],
                },
                'These should be prominent and required, not buried in settings',
              ],
            },
          ],
        },
        {
          id: 'content-differentiation',
          title: 'Content Differentiation',
          content: [
            {
              type: 'list',
              items: [
                'Some types of information resonate more with certain audiences than others',
                'This can be used to attract particular crowds',
                '**Brand Themes** serve this purpose, but also consider:',
                {
                  type: 'list',
                  items: ['Uniqueness', 'Differentiation', 'Identity'],
                },
                'Help businesses stand out by emphasizing what makes them distinct',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'perspectives',
      title: 'Perspectives',
      content: [
        {
          type: 'text',
          value: 'Support different perspectives and views tailored to the type of user/entity using the platform.',
        },
      ],
      subsections: [
        {
          id: 'corporation-perspective',
          title: 'Corporation Perspective',
          content: [
            {
              type: 'list',
              items: [
                'Dashboard views optimized for business-level metrics and multi-user management',
                'Team collaboration features with role-based access',
                'Brand consistency enforcement across all content',
                'Aggregate analytics and reporting across campaigns',
                'Budget and resource allocation tracking',
                'Compliance and approval workflows',
                'Multi-location/department content management',
              ],
            },
          ],
        },
        {
          id: 'individual-perspective',
          title: 'Individual Perspective',
          content: [
            {
              type: 'list',
              items: [
                'Simplified UI focused on personal brand building',
                'Solo creator workflows without team overhead',
                'Personal analytics and growth tracking',
                'Direct, streamlined content creation flow',
                'Lower barrier to entry with guided onboarding',
                'Personal scheduling and posting preferences',
                'Individual monetization and audience growth focus',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'platform-ideas',
      title: 'Platform Ideas',
      content: [],
      subsections: [
        {
          id: 'plans-viewer-app',
          title: 'Plans Viewer App',
          content: [
            {
              type: 'quote',
              value: 'Standalone React + MUI application for viewing and managing project plans',
            },
            { type: 'heading', level: 4, text: 'Overview' },
            {
              type: 'list',
              items: [
                '**Separate standalone app** (not part of main 4up app)',
                '**App becomes source of truth** for all planning content',
                'Content structured for both human readability and AI reference',
                'Preserves all existing content verbatim during migration',
              ],
            },
            { type: 'heading', level: 4, text: 'Tech Stack' },
            {
              type: 'list',
              items: [
                'React + TypeScript',
                'MUI (Material UI) components',
                'Mermaid diagram rendering (embedded, interactive)',
                'JSON/TypeScript data files as source of truth',
              ],
            },
            { type: 'heading', level: 4, text: 'UI Features' },
            {
              type: 'list',
              items: [
                '**Collapsible sections**: Accordion-style content organization',
                '**Status indicators**: Visual ✅ 🟡 🔴 with filtering',
                '**Interactive Mermaid diagrams**: Embedded, zoomable, clickable nodes',
                '**Search**: Full-text search across all content',
                '**Task management**: Check off tasks, filter by status/priority/module',
                '**Cross-linking**: In-app navigation between related modules',
                '**Progress dashboards**: Visual progress by module',
                '**Responsive**: Works on desktop and tablet',
              ],
            },
            { type: 'heading', level: 4, text: 'Migration Rules' },
            {
              type: 'list',
              items: [
                '**No content changes**: Wording remains exactly as-is',
                '**No content loss**: Every piece of information is preserved',
                '**Structure only**: Convert format from Markdown → TypeScript data structures',
                '**Preserve relationships**: All cross-references become typed links',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'business-opportunities',
      title: 'Business Opportunities',
      content: [
        {
          type: 'list',
          items: [
            'Sell to other businesses',
            'Manage content for clients / have staff manage it',
            'Sell subscriptions to the app (or simple versions)',
          ],
        },
      ],
    },
    {
      id: 'additional-features',
      title: 'Additional Features',
      content: [
        {
          type: 'list',
          items: [
            'Feedback Functionality likely high value, for websites, existing content ,etc',
            'And being able to provide or auto detect few shot examples',
            'And simplicity to get started, ability for anyone to create their own brand etc. Not having to know how to edit audio, not having to know how to edit video, not having to know how to edit images, etc, just knowing what they want ( and also being told what to do instead of what they want, and the ability to simplify a request / take a step back rather than being direct, combination also good )',
            'CTA Options, Custom CTA Pages, Custom CTA Options',
            'Ranked data values / content values and topics (initially rank certain things, let weighted aspects and analytics be done later)',
            'Multi-model samples - join responses from multiple models to see which ones we like best',
            'See multiple variations of response with quality/effectiveness rating from AI',
            'Ability to interact and edit',
            'Best Content Type Recommendations from AI',
            'Options for advanced editing of audio etc? I mean exporting and then reuploading, but this also can be added later',
          ],
        },
      ],
    },
    {
      id: 'data-prompting-concepts',
      title: 'Data & Prompting Concepts',
      content: [
        {
          type: 'text',
          value: 'Data Expansion on a per company basis. Stored as schemas in the DB or freeform and scripts/commands for each. Starter point with data that can be expanded on specific to each company.',
        },
        {
          type: 'text',
          value: '**Example**: Geometric Shapes -> 2d vs 3d, and samples of styles.',
        },
        {
          type: 'text',
          value: '**Context & No Context Results** Can utilize background info and existing info to display multiple types of results and allow the user to communicate with either. Also obviously can utilize JSON responses and structured format to improve ux.',
        },
        {
          type: 'text',
          value: '**Multiple Models** Can Choose the Highest Value Options (in the AI\'s option) and combine results from multiple models displaying their highest valued results, merging overlapping results etc.',
        },
        {
          type: 'text',
          value: '**Randomness & Non Randomness**',
        },
      ],
    },
    {
      id: 'personal-use-additions',
      title: 'Personal Use Additions',
      content: [
        {
          type: 'list',
          items: [
            'Grow Social Media Network',
            'Respond, Comment, and outreach support',
          ],
        },
      ],
    },
    {
      id: 'other-ideas',
      title: 'Other Ideas',
      content: [
        {
          type: 'list',
          items: [
            'Business chat AI with context',
            'Guidance, innovation, app ideas',
            'Asset Library',
            'Asset Marketplace',
            'Asset Marketplace Search with AI to find best assets/graphics for your business',
            'Automatically generate metadata/rank assets for a fee',
            'Recolor assets',
            'Eventually also utilize this as a learning experience and ability to create movies and other forms of content',
            'Scenes & Sets',
          ],
        },
      ],
    },
    {
      id: 'technical-improvements',
      title: 'Technical Improvements',
      content: [
        {
          type: 'list',
          items: ['Error handling/retries'],
        },
      ],
    },
    {
      id: 'learning-integrations',
      title: 'Learning Integrations',
      content: [
        {
          type: 'text',
          value: 'Chat agents & screens with auto feedback for learning and training purposes.',
        },
        {
          type: 'list',
          items: [
            'Interactive AI chat interfaces with real-time feedback loops',
            'Training screens that help users improve their content creation skills',
            'Auto-feedback mechanisms that learn from user preferences',
            'Integration with generation module for practice and improvement',
          ],
        },
      ],
    },
    {
      id: 'edge-cases',
      title: 'Edge Cases & Implementation Requirements',
      content: [
        {
          type: 'list',
          items: [
            '**Product offerings varying by area**: Companies may have different products, services, or pricing based on geographic location. Need to support location-based content variations and targeting.',
            'Regional compliance and messaging differences',
            'Multi-location business support with location-specific content',
          ],
        },
      ],
    },
    {
      id: 'outreach-networking',
      title: 'Outreach, Networking & Engagement',
      content: [
        {
          type: 'list',
          items: [
            '**Outreach support**: Automated or assisted outreach to potential customers, partners, and influencers',
            '**Networking features**: Tools to identify and connect with relevant contacts and communities',
            '**Comment responding**: AI-assisted responses to comments across platforms with brand voice consistency',
            'Engagement tracking and follow-up reminders',
            'Relationship management integration',
          ],
        },
      ],
    },
    {
      id: 'notes',
      title: 'Notes',
      content: [
        {
          type: 'list',
          items: [
            'Audience seems generally ok',
            'Overall layout not being perfect is kind of annoying',
            'Would like to use React Context rather than stores (unsure)',
            'Content Pillars - need to understand better',
            'Campaigns - need to understand how they work and play into effect',
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'generation-overview', title: 'Generation Overview', path: '/modules/generation/overview', description: 'Core generation features' },
    { id: 'assets', title: 'Assets', path: '/modules/assets', description: 'Asset management base' },
  ],
};
