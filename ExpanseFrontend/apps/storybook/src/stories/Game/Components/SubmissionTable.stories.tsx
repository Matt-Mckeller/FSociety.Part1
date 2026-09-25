"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { SubmissionTable } from "expanse.ui/game"

const meta: Meta<typeof SubmissionTable> = {
  title: "Game/Components/SubmissionTable",
  component: SubmissionTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Table component for displaying assignment submissions with pagination.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 900 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SubmissionTable>

const mockSubmissions = [
  { id: "sub-001", student_id: "stu-001", assignment_id: "asg-001", status: "Submitted", grade: "A" },
  { id: "sub-002", student_id: "stu-002", assignment_id: "asg-001", status: "Submitted", grade: "B+" },
  { id: "sub-003", student_id: "stu-003", assignment_id: "asg-001", status: "Graded", grade: "A-" },
  { id: "sub-004", student_id: "stu-004", assignment_id: "asg-002", status: "Pending", grade: "-" },
  { id: "sub-005", student_id: "stu-005", assignment_id: "asg-002", status: "Late", grade: "C" },
  { id: "sub-006", student_id: "stu-006", assignment_id: "asg-003", status: "Submitted", grade: "B" },
  { id: "sub-007", student_id: "stu-007", assignment_id: "asg-003", status: "Graded", grade: "A" },
  { id: "sub-008", student_id: "stu-008", assignment_id: "asg-003", status: "Pending", grade: "-" },
  { id: "sub-009", student_id: "stu-009", assignment_id: "asg-004", status: "Submitted", grade: "B-" },
  { id: "sub-010", student_id: "stu-010", assignment_id: "asg-004", status: "Late", grade: "D" },
  { id: "sub-011", student_id: "stu-011", assignment_id: "asg-005", status: "Graded", grade: "A+" },
  { id: "sub-012", student_id: "stu-012", assignment_id: "asg-005", status: "Submitted", grade: "B+" },
]

export const Default: Story = {
  args: {
    submissions: mockSubmissions,
  },
}

export const FewSubmissions: Story = {
  args: {
    submissions: mockSubmissions.slice(0, 4),
  },
}

export const Empty: Story = {
  args: {
    submissions: [],
  },
}

export const AllGraded: Story = {
  args: {
    submissions: mockSubmissions.map(s => ({ ...s, status: "Graded" })),
  },
}

export const AllPending: Story = {
  args: {
    submissions: mockSubmissions.map(s => ({ ...s, status: "Pending", grade: "-" })),
  },
}
