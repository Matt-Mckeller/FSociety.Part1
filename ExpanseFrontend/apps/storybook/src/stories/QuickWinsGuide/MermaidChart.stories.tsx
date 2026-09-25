import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"

/**
 * MermaidChart component displays Mermaid diagrams.
 * 
 * **Note:** This story shows a placeholder since Mermaid requires DOM rendering.
 * In the actual application, the MermaidChart component dynamically renders
 * Mermaid diagrams using the mermaid library.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { MermaidChart } from '@/modules/quick-wins-guide/components'
 * 
 * const chart = `flowchart LR
 *   A[Start] --> B[Process]
 *   B --> C[End]
 * `
 * 
 * <MermaidChart chart={chart} />
 * ```
 */

interface MermaidChartProps {
  chart: string
  className?: string
}

// Placeholder component for Storybook (actual uses mermaid library)
function MermaidChartPlaceholder({ chart, className }: MermaidChartProps) {
  return (
    <Box
      className={className}
      sx={{
        background: "#E3F2FD",
        border: "1px solid #90CAF9",
        borderRadius: "12px",
        padding: "16px",
        margin: "16px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#1976D2" }}>
        Mermaid Diagram Preview
      </Typography>
      <Box
        component="pre"
        sx={{
          backgroundColor: "#fff",
          p: 2,
          borderRadius: 1,
          fontSize: "12px",
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        {chart}
      </Box>
      <Typography variant="caption" sx={{ mt: 2, color: "#666" }}>
        In the actual app, this renders as an interactive SVG diagram
      </Typography>
    </Box>
  )
}

// Sample chart definitions
const podsChart = `flowchart LR
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

const inboundChart = `flowchart TD
  A[Receive Inbound] --> B[Greet & Verify]
  B --> C{Classify Issue}
  C -->|Scheduling| D[Open Scheduler]
  C -->|Billing| E[Verify account]
  C -->|Incident| F[Open Incident Form]
  C -->|Other| G[Use KB + AI Q&A]
  D --> H{Resolve or Escalate}
  E --> H
  F --> H
  G --> H
  H -->|Resolve| I[Close + Summarize]
  H -->|Escalate| J[Notify Team Lead]`

const meta: Meta<typeof MermaidChartPlaceholder> = {
  title: "QuickWinsGuide/MermaidChart",
  component: MermaidChartPlaceholder,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A component for rendering Mermaid flowcharts and diagrams. Used in the Quick Wins Guide to visualize pod structures, call flows, and processes.",
      },
    },
  },
  argTypes: {
    chart: {
      description: "Mermaid diagram definition string",
      control: "text",
    },
    className: {
      description: "Optional CSS class for styling",
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<typeof MermaidChartPlaceholder>

export const PodsStructure: Story = {
  args: {
    chart: podsChart,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Visualizes the pod team structure with managers, QA, and individual pods containing team leads and agents.",
      },
    },
  },
}

export const InboundCallFlow: Story = {
  args: {
    chart: inboundChart,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the decision tree for handling inbound calls, from greeting through classification to resolution or escalation.",
      },
    },
  },
}

export const SimpleFlow: Story = {
  args: {
    chart: `flowchart LR
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[Action A]
    C -->|No| E[Action B]
    D --> F[End]
    E --> F`,
  },
  parameters: {
    docs: {
      description: {
        story: "A simple flowchart example demonstrating basic Mermaid syntax.",
      },
    },
  },
}
