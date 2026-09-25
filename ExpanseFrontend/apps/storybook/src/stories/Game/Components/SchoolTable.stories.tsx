"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { SchoolTable } from "expanse.ui/game"

const meta: Meta<typeof SchoolTable> = {
  title: "Game/Components/SchoolTable",
  component: SchoolTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Table component for displaying schools and their associated students.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SchoolTable>

const mockSchools = [
  { id: "sch-001", name: "Lincoln Elementary" },
  { id: "sch-002", name: "Washington Middle School" },
  { id: "sch-003", name: "Jefferson High School" },
  { id: "sch-004", name: "Roosevelt Academy" },
]

const mockStudents = [
  { id: "stu-001", name: "Alice Johnson" },
  { id: "stu-002", name: "Bob Smith" },
  { id: "stu-003", name: "Charlie Brown" },
]

export const Default: Story = {
  args: {
    schools: mockSchools,
    students: [],
    fetchStudents: (schoolId: string) => console.log("Fetching students for:", schoolId),
  },
}

export const WithStudents: Story = {
  args: {
    schools: mockSchools,
    students: mockStudents,
    fetchStudents: (schoolId: string) => console.log("Fetching students for:", schoolId),
  },
}

export const Empty: Story = {
  args: {
    schools: [],
    students: [],
    fetchStudents: (schoolId: string) => console.log("Fetching students for:", schoolId),
  },
}

export const SingleSchool: Story = {
  args: {
    schools: [mockSchools[0]],
    students: mockStudents,
    fetchStudents: (schoolId: string) => console.log("Fetching students for:", schoolId),
  },
}
