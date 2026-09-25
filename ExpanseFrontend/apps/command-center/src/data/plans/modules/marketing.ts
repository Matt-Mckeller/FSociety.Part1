import type { PlanModule } from '../../../types/plans';

/**
 * Marketing Module
 * 
 * 4up marketing approaches and messaging concepts
 * Source: plans/marketing/local-business.md
 */

export const marketing: PlanModule = {
  id: 'marketing',
  title: 'Marketing',
  description: '4up marketing approaches, messaging concepts, and go-to-market strategies',
  status: { data: 'partial', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'local-networking',
      title: 'Local Networking Groups',
      content: [
        {
          type: 'text',
          value: 'Approach for connecting with local business communities and networking groups.',
        },
      ],
    },
    {
      id: 'local-business-entry',
      title: 'Local Business Entry Approach (Shops)',
      content: [
        {
          type: 'text',
          value: 'Simple entry workflow for local businesses:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Take video of the business',
            'Enter details into 4up',
            'Suggest feedback and improvements for how to grow, scale, and convert more customers',
          ],
        },
      ],
    },
    {
      id: 'second-best-messaging',
      title: '"Second Best Gets Dramatically Less"',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Core Insight',
        },
        {
          type: 'text',
          value: 'In competitive markets, being "second best" often results in dramatically less reward than being first. The gap between first and second place isn\'t linear—it\'s exponential.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Why This Matters for 4up',
        },
        {
          type: 'list',
          items: [
            'Encourages businesses to invest in proper marketing support rather than "good enough" efforts',
            'Highlights the cost of mediocre content in a crowded digital landscape',
            'Positions 4up as the tool that helps you compete at the top level',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Messaging Angles',
        },
        {
          type: 'list',
          items: [
            '"In a sea of content, second place is invisible"',
            '"Your competitors are using AI. Are you using it better?"',
            '"Good enough isn\'t good enough anymore"',
            '"The difference between seen and ignored is smaller than you think"',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Supporting Points',
        },
        {
          type: 'list',
          items: [
            'Top search results get 90%+ of clicks',
            'First impressions happen in seconds',
            'Consistency beats sporadic brilliance',
            'Professional-quality content is now table stakes',
          ],
        },
      ],
    },
    {
      id: 'trained-marketing-professionals',
      title: 'Trained Marketing Professionals',
      content: [
        {
          type: 'text',
          value: 'Adding people who are trained on marketing provides even higher value to the 4up platform and its users.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Value Proposition',
        },
        {
          type: 'list',
          items: [
            '**Idea generation**: Creative brainstorming and content ideation that AI can then execute on',
            '**Audience identification**: Expertise in defining and understanding target audiences',
            '**Goals & strategy**: Helping determine business goals and marketing objectives',
            '**Pain point discovery**: Identifying customer pain points and how to address them',
            '**Implementation options**: Seeing multiple paths forward and recommending best approaches',
            '**Accurate alignment**: Ensuring content truly matches brand voice, goals, and audience expectations',
            '**Time savings**: Professionals can quickly identify issues and guide AI more effectively',
            '**Cultural alignment**: Human expertise catches nuances AI may miss across different cultures and contexts',
            '**Response quality**: Better handling of customer interactions, comments, and engagement',
            '**AI guidance**: Experts can craft better prompts and refine AI output more efficiently',
            '**Human-in-the-loop review**: Critical oversight for sensitive or high-stakes content',
            '**Clarity & messaging**: Professional polish on all communications',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Service Tiers',
        },
        {
          type: 'table',
          headers: ['Tier', 'Description'],
          rows: [
            ['Self-Service', 'AI-only with user review'],
            ['Assisted', 'AI + occasional professional review'],
            ['Managed', 'AI + dedicated marketing professional oversight'],
            ['Full-Service', 'Complete marketing management with AI acceleration'],
          ],
        },
      ],
    },
    {
      id: 'website',
      title: '4up Website',
      content: [
        {
          type: 'text',
          value: '**Placeholder** — Details for the 4up marketing website to be added.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Planned Sections',
        },
        {
          type: 'list',
          items: [
            'Landing page & value proposition',
            'Feature showcase',
            'Pricing tiers',
            'Case studies / testimonials',
            'Blog / content marketing',
            'Documentation / help center',
            'Contact / demo request',
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'future-ideas', title: 'Future Ideas', path: '/future-ideas', description: 'Backlog and expansion concepts' },
  ],
};
