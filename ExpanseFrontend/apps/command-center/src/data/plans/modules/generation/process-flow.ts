import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Process Flow
 * Visual representation of the content generation lifecycle
 * 
 * Migrated from: plans/generation/process_flow.md
 */

export const generationProcessFlow: PlanModule = {
  id: 'generation-process-flow',
  title: 'Generation Module: Process Flow',
  description: 'Visual representation of the content generation lifecycle',
  sections: [
    {
      id: 'content-generation-process',
      title: 'Content Generation Process',
      content: [
        {
          type: 'mermaid',
          diagram: `flowchart LR
    subgraph Create["1. Create"]
        C1[Preset Prompts]
        C2[Manual Entry]
        C3[Auto Schedule]
    end

    subgraph Review["2. Review"]
        R1[AI Rating]
        R2[Human Review]
        R3[Edit/Revise]
        R4[Approve]
    end

    subgraph I18N["3. Internationalize"]
        I1[Translate]
        I2[Localize]
    end

    subgraph Schedule["4. Schedule"]
        S1[Auto Schedule]
        S2[Manual Schedule]
        S3[Instant Publish]
    end

    subgraph Library["5. Library"]
        L1[Published]
        L2[Analytics]
    end

    Create --> Review
    Review --> I18N
    I18N --> Schedule
    Schedule --> Library

    R3 --> R1`,
          caption: 'Content Generation Process - Linear Flow',
        },
      ],
    },
    {
      id: 'detailed-state-flow',
      title: 'Detailed State Flow',
      content: [
        {
          type: 'mermaid',
          diagram: `stateDiagram-v2
    [*] --> Draft: Create Content

    Draft --> PendingReview: Submit
    
    PendingReview --> AIReview: Auto
    AIReview --> HumanReview: Pass
    AIReview --> Draft: Fail (regenerate)
    
    HumanReview --> Approved: ✅ Approve
    HumanReview --> Draft: 📝 Edit
    HumanReview --> Rejected: ❌ Reject
    
    Approved --> Translation: i18n enabled
    Approved --> Scheduled: i18n disabled
    
    Translation --> Scheduled: Complete
    
    Scheduled --> Posted: Publish time
    Scheduled --> Draft: Unschedule
    
    Posted --> [*]
    Rejected --> [*]`,
          caption: 'Detailed State Flow - State Machine',
        },
      ],
    },
    {
      id: 'review-decision-flow',
      title: 'Review Decision Flow',
      content: [
        {
          type: 'mermaid',
          diagram: `flowchart TD
    START[Content Generated] --> AI_RATE[AI Rating]
    AI_RATE --> CHECK{AI Rating >= Min?}
    
    CHECK -->|No| REGEN[Regenerate/Edit]
    REGEN --> AI_RATE
    
    CHECK -->|Yes| HUMAN[Human Review]
    
    HUMAN --> HUMAN_RATE[Human Provides Rating]
    HUMAN_RATE --> DECISION{Decision}
    
    DECISION -->|❌ Reject| USER_RATE[User Provides Approximate Rating]
    USER_RATE --> DEL{Can Delete?}
    DEL -->|Rating < 3| DELETE[Remove]
    DEL -->|Rating >= 3| MUST_EDIT[Force Edit]
    MUST_EDIT --> AI_RATE
    
    DECISION -->|📝 Edit| EDIT[Open Editor]
    EDIT --> AI_RATE
    
    DECISION -->|✅ Approve| APPROVE_CHECK{Approvals Met?}
    
    APPROVE_CHECK -->|No| NEXT_REVIEWER[Next Reviewer]
    NEXT_REVIEWER --> HUMAN
    
    APPROVE_CHECK -->|Yes| APPROVED[Move to Scheduling]`,
          caption: 'Review Decision Flow - Decision Tree',
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'overview', title: 'Overview', path: '/modules/generation/overview', description: 'Goals and requirements' },
    { id: 'review-process', title: 'Review Process', path: '/modules/generation/review-process', description: 'Detailed review rules' },
    { id: 'configuration', title: 'Configuration', path: '/modules/generation/configuration', description: 'Configurable thresholds' },
    { id: 'scheduling', title: 'Scheduling', path: '/modules/generation/scheduling', description: 'Publishing flow' },
  ],
};
