"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { StudentTable } from "expanse.ui/game"

const meta: Meta<typeof StudentTable> = {
  title: "Game/Components/StudentTable",
  component: StudentTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Table component for displaying student information with pagination.",
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
type Story = StoryObj<typeof StudentTable>

const mockStudents = [
  { id: "stu-001", first_name: "Alice", last_name: "Johnson", email: "alice@school.edu", grade_levels: "5th Grade" },
  { id: "stu-002", first_name: "Bob", last_name: "Smith", email: "bob@school.edu", grade_levels: "5th Grade" },
  { id: "stu-003", first_name: "Charlie", last_name: "Brown", email: "charlie@school.edu", grade_levels: "6th Grade" },
  { id: "stu-004", first_name: "Diana", last_name: "Prince", email: "diana@school.edu", grade_levels: "6th Grade" },
  { id: "stu-005", first_name: "Edward", last_name: "Norton", email: "edward@school.edu", grade_levels: "7th Grade" },
  { id: "stu-006", first_name: "Fiona", last_name: "Apple", email: "fiona@school.edu", grade_levels: "7th Grade" },
  { id: "stu-007", first_name: "George", last_name: "Lucas", email: "george@school.edu", grade_levels: "8th Grade" },
  { id: "stu-008", first_name: "Hannah", last_name: "Montana", email: "hannah@school.edu", grade_levels: "8th Grade" },
  { id: "stu-009", first_name: "Ivan", last_name: "Drago", email: "ivan@school.edu", grade_levels: "9th Grade" },
  { id: "stu-010", first_name: "Julia", last_name: "Roberts", email: "julia@school.edu", grade_levels: "9th Grade" },
  { id: "stu-011", first_name: "Kevin", last_name: "Hart", email: "kevin@school.edu", grade_levels: "10th Grade" },
  { id: "stu-012", first_name: "Laura", last_name: "Palmer", email: "laura@school.edu", grade_levels: "10th Grade" },
]

export const Default: Story = {
  args: {
    students: mockStudents,
  },
}

export const FewStudents: Story = {
  args: {
    students: mockStudents.slice(0, 3),
  },
}

export const Empty: Story = {
  args: {
    students: [],
  },
}

export const ManyStudents: Story = {
  args: {
    students: [
      ...mockStudents,
      ...mockStudents.map((s, i) => ({ ...s, id: `stu-${100 + i}`, first_name: `Student${100 + i}` })),
    ],
  },
}
