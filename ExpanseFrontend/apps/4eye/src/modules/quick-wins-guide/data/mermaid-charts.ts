export const podsChart = `flowchart LR
  subgraph Pod_A[Pod A]
    A1[Team Lead]
    A2[Agent]
    A3[Agent]
    A1 --- A2
    A1 --- A3
  end
  subgraph Pod_B[Pod B]
    B1[Team Lead]
    B2[Agent]
    B3[Agent]
    B1 --- B2
    B1 --- B3
  end
  S1[Manager] --> Pod_A
  S1 --> Pod_B
  S2[QA] --> Pod_A
  S2 --> Pod_B`

export const inboundChart = `flowchart TD
  A[Receive Inbound] --> B[Greet & Verify]
  B --> C{Classify Issue}
  C -->|Scheduling| D[Open TP-Win Scheduler]
  C -->|Billing| E[Verify account]
  C -->|Incident| F[Open Incident Form]
  C -->|Other| G[Use KB + AI Q&A]
  D --> H{Resolve or Escalate}
  E --> H
  F --> H
  G --> H
  H -->|Resolve| I[Close + Summarize]
  H -->|Escalate| J[Notify Team Lead]`

export const promptChart = `flowchart TD
  A[Objective] --> B[Inputs]
  B --> C[Constraints]
  C --> D[Style]
  D --> E[Output Format]
  E --> F{Draft}
  F --> G[Review & Annotate]
  G --> H[Revise Prompt]
  H --> I{Generate Updated}
  I --> J[Self-check]
  J --> K{Done?}
  K -->|Yes| L[Publish]
  K -->|No| H`
