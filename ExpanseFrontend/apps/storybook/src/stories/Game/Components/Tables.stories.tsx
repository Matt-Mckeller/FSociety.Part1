import type { Meta, StoryObj } from "@storybook/react"
import { SchoolTable } from "expanse.ui/game"
import { StudentTable } from "../../../../../../packages/ui/game/components/StudentTable"
import { AssignmentTable } from "../../../../../../packages/ui/game/components/AssignmentTable"
import { ClassTable } from "../../../../../../packages/ui/game/components/ClassTable"
import { SubmissionTable } from "../../../../../../packages/ui/game/components/SubmissionTable"
import type {
  SchoolInterface,
  ClassInterface,
  EnrollmentInterface,
} from "../../../../../../packages/ui/game/types"

// =============================================================================
// Mock Data
// =============================================================================

const mockSchools: SchoolInterface[] = [
  { id: "school-1", name: "Lincoln High School" },
  { id: "school-2", name: "Washington Middle School" },
  { id: "school-3", name: "Jefferson Elementary" },
  { id: "school-4", name: "Roosevelt Academy" },
  { id: "school-5", name: "Kennedy Charter School" },
]

// StudentTable expects inline type with email field
const mockStudents = [
  {
    id: "student-1",
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@school.edu",
    grade_levels: "9",
  },
  {
    id: "student-2",
    first_name: "Bob",
    last_name: "Smith",
    email: "bob.smith@school.edu",
    grade_levels: "10",
  },
  {
    id: "student-3",
    first_name: "Carol",
    last_name: "Williams",
    email: "carol.williams@school.edu",
    grade_levels: "9",
  },
  {
    id: "student-4",
    first_name: "David",
    last_name: "Brown",
    email: "david.brown@school.edu",
    grade_levels: "11",
  },
  {
    id: "student-5",
    first_name: "Emma",
    last_name: "Davis",
    email: "emma.davis@school.edu",
    grade_levels: "10",
  },
]

const mockEnrollments: EnrollmentInterface[] = [
  {
    id: "enroll-1",
    person_id: "student-1",
    class_id: "class-1",
    role: "student",
    section_id: "section-1",
    state: "active",
    primary: true,
    start_date: "2024-08-15",
    end_date: "2025-05-30",
  },
  {
    id: "enroll-2",
    person_id: "student-2",
    class_id: "class-1",
    role: "student",
    section_id: "section-1",
    state: "active",
    primary: true,
    start_date: "2024-08-15",
    end_date: "2025-05-30",
  },
  {
    id: "enroll-3",
    person_id: "teacher-1",
    class_id: "class-1",
    role: "teacher",
    section_id: "section-1",
    state: "active",
    primary: true,
    start_date: "2024-08-15",
    end_date: "2025-05-30",
  },
]

const mockClasses: ClassInterface[] = [
  {
    id: "class-1",
    elId: "el-class-1",
    name: "Algebra I",
    enrollments: mockEnrollments,
  },
  {
    id: "class-2",
    elId: "el-class-2",
    name: "English Literature",
    enrollments: [],
  },
  { id: "class-3", elId: "el-class-3", name: "Biology", enrollments: [] },
  {
    id: "class-4",
    elId: "el-class-4",
    name: "World History",
    enrollments: [],
  },
  { id: "class-5", elId: "el-class-5", name: "Chemistry", enrollments: [] },
]

// AssignmentTable uses inline type { id, title, due_date, status }
const mockAssignments = [
  {
    id: "assignment-1",
    title: "Chapter 1 Quiz - Linear Equations",
    due_date: "2024-09-15",
    status: "active",
  },
  {
    id: "assignment-2",
    title: "Essay: The Great Gatsby Analysis",
    due_date: "2024-09-20",
    status: "active",
  },
  {
    id: "assignment-3",
    title: "Lab Report: Cell Structure",
    due_date: "2024-09-18",
    status: "active",
  },
  {
    id: "assignment-4",
    title: "World War II Timeline",
    due_date: "2024-09-22",
    status: "closed",
  },
  {
    id: "assignment-5",
    title: "Periodic Table Quiz",
    due_date: "2024-09-25",
    status: "draft",
  },
]

// SubmissionTable uses inline type { id, student_id, assignment_id, status, grade }
const mockSubmissions = [
  {
    id: "sub-1",
    student_id: "student-1",
    assignment_id: "assignment-1",
    status: "submitted",
    grade: "A",
  },
  {
    id: "sub-2",
    student_id: "student-2",
    assignment_id: "assignment-1",
    status: "submitted",
    grade: "B+",
  },
  {
    id: "sub-3",
    student_id: "student-3",
    assignment_id: "assignment-2",
    status: "pending",
    grade: "",
  },
  {
    id: "sub-4",
    student_id: "student-1",
    assignment_id: "assignment-3",
    status: "submitted",
    grade: "A-",
  },
  {
    id: "sub-5",
    student_id: "student-4",
    assignment_id: "assignment-4",
    status: "late",
    grade: "C",
  },
]

// AssignmentSubmissionMap uses inline type for submissions
const mockAssignmentSubmissionMap: Record<
  string,
  { person_id: string; assignment_id: string; status: string; grade: string }[]
> = {
  "assignment-1": [
    {
      person_id: "student-1",
      assignment_id: "assignment-1",
      status: "submitted",
      grade: "A",
    },
    {
      person_id: "student-2",
      assignment_id: "assignment-1",
      status: "submitted",
      grade: "B+",
    },
  ],
  "assignment-2": [
    {
      person_id: "student-3",
      assignment_id: "assignment-2",
      status: "pending",
      grade: "",
    },
  ],
  "assignment-3": [
    {
      person_id: "student-1",
      assignment_id: "assignment-3",
      status: "submitted",
      grade: "A-",
    },
  ],
  "assignment-4": [
    {
      person_id: "student-4",
      assignment_id: "assignment-4",
      status: "late",
      grade: "C",
    },
  ],
}

// =============================================================================
// SchoolTable Stories
// =============================================================================

const SchoolTableMeta: Meta<typeof SchoolTable> = {
  title: "Game/Tables/SchoolTable",
  component: SchoolTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Table component for displaying schools and their students.",
      },
    },
  },
}

export default SchoolTableMeta

type SchoolTableStory = StoryObj<typeof SchoolTable>

export const Default: SchoolTableStory = {
  args: {
    schools: mockSchools,
    fetchStudents: (schoolId: string) =>
      console.log("[Storybook] Fetching students for school:", schoolId),
    students: [],
  },
}

export const WithStudents: SchoolTableStory = {
  args: {
    schools: mockSchools.slice(0, 2),
    fetchStudents: (schoolId: string) =>
      console.log("[Storybook] Fetching students for school:", schoolId),
    students: mockStudents,
  },
}

export const SingleSchool: SchoolTableStory = {
  args: {
    schools: [mockSchools[0]],
    fetchStudents: (schoolId: string) =>
      console.log("[Storybook] Fetching students for school:", schoolId),
    students: mockStudents.slice(0, 3),
  },
}

export const EmptySchools: SchoolTableStory = {
  args: {
    schools: [],
    fetchStudents: (schoolId: string) =>
      console.log("[Storybook] Fetching students for school:", schoolId),
    students: [],
  },
}

// =============================================================================
// StudentTable Stories
// =============================================================================

export const StudentTableDefault: StoryObj<typeof StudentTable> = {
  render: () => <StudentTable students={mockStudents} />,
  name: "StudentTable - Default",
}

export const StudentTableEmpty: StoryObj<typeof StudentTable> = {
  render: () => <StudentTable students={[]} />,
  name: "StudentTable - Empty",
}

export const StudentTableSingleStudent: StoryObj<typeof StudentTable> = {
  render: () => <StudentTable students={[mockStudents[0]]} />,
  name: "StudentTable - Single Student",
}

// =============================================================================
// ClassTable Stories
// =============================================================================

export const ClassTableDefault: StoryObj<typeof ClassTable> = {
  render: () => <ClassTable classes={mockClasses} />,
  name: "ClassTable - Default",
}

export const ClassTableEmpty: StoryObj<typeof ClassTable> = {
  render: () => <ClassTable classes={[]} />,
  name: "ClassTable - Empty",
}

export const ClassTableSingleClass: StoryObj<typeof ClassTable> = {
  render: () => <ClassTable classes={[mockClasses[0]]} />,
  name: "ClassTable - Single Class",
}

// =============================================================================
// AssignmentTable Stories
// =============================================================================

export const AssignmentTableDefault: StoryObj<typeof AssignmentTable> = {
  render: () => (
    <AssignmentTable
      assignments={mockAssignments}
      assignmentSubmissionMap={mockAssignmentSubmissionMap}
    />
  ),
  name: "AssignmentTable - Default",
}

export const AssignmentTableEmpty: StoryObj<typeof AssignmentTable> = {
  render: () => (
    <AssignmentTable assignments={[]} assignmentSubmissionMap={{}} />
  ),
  name: "AssignmentTable - Empty",
}

export const AssignmentTableNoSubmissions: StoryObj<typeof AssignmentTable> = {
  render: () => (
    <AssignmentTable
      assignments={mockAssignments}
      assignmentSubmissionMap={{}}
    />
  ),
  name: "AssignmentTable - No Submissions",
}

// =============================================================================
// SubmissionTable Stories
// =============================================================================

export const SubmissionTableDefault: StoryObj<typeof SubmissionTable> = {
  render: () => <SubmissionTable submissions={mockSubmissions} />,
  name: "SubmissionTable - Default",
}

export const SubmissionTableEmpty: StoryObj<typeof SubmissionTable> = {
  render: () => <SubmissionTable submissions={[]} />,
  name: "SubmissionTable - Empty",
}

export const SubmissionTableMixedStatus: StoryObj<typeof SubmissionTable> = {
  render: () => (
    <SubmissionTable
      submissions={[
        { ...mockSubmissions[0], status: "submitted" },
        { ...mockSubmissions[1], status: "pending" },
        { ...mockSubmissions[2], status: "late" },
        { ...mockSubmissions[3], status: "graded" },
      ]}
    />
  ),
  name: "SubmissionTable - Mixed Statuses",
}

// =============================================================================
// RewardEventsTable Stories
// =============================================================================

import { EventsTempContext } from "expanse.ui/game"
import { RewardEventsTable } from "../../../../../../apps/expanseEdu/src/modules/game/components/RewardEventTable.component"
import React from "react"

// Mock reward events data
const mockRewardEvents = [
  {
    id: "event-1",
    type: "homework",
    timestamp: new Date("2026-01-20T10:30:00").toISOString(),
    status: "completed",
    xpReward: 50,
    coinReward: 25,
  },
  {
    id: "event-2",
    type: "test",
    timestamp: new Date("2026-01-19T14:00:00").toISOString(),
    status: "completed",
    xpReward: 100,
    coinReward: 50,
  },
  {
    id: "event-3",
    type: "graduation",
    timestamp: new Date("2026-01-18T09:00:00").toISOString(),
    status: "completed",
    xpReward: 500,
    coinReward: 200,
  },
  {
    id: "event-4",
    type: "teacherRecognition",
    timestamp: new Date("2026-01-17T15:30:00").toISOString(),
    status: "completed",
    xpReward: 75,
    coinReward: 30,
  },
  {
    id: "event-5",
    type: "homework",
    timestamp: new Date("2026-01-16T11:00:00").toISOString(),
    status: "pending",
    xpReward: 50,
    coinReward: 25,
  },
]

// Mock EventsTempContext provider wrapper
const MockEventsTempProvider = ({
  children,
  events = mockRewardEvents,
}: {
  children: React.ReactNode
  events?: any[]
}) => {
  const mockContext = {
    rewardEvents: events,
    handleAddEvent: (eventType: string) =>
      console.log("[Storybook] Event added:", eventType),
  }

  return (
    <EventsTempContext.Provider value={mockContext as any}>
      {children}
    </EventsTempContext.Provider>
  )
}

export const RewardEventsTableDefault: StoryObj = {
  render: () => (
    <MockEventsTempProvider>
      <RewardEventsTable />
    </MockEventsTempProvider>
  ),
  name: "RewardEventsTable - Default",
  parameters: {
    docs: {
      description: {
        story:
          "Displays a table of reward events (homework, tests, achievements, etc.) with pagination.",
      },
    },
  },
}

export const RewardEventsTableEmpty: StoryObj = {
  render: () => (
    <MockEventsTempProvider events={[]}>
      <RewardEventsTable />
    </MockEventsTempProvider>
  ),
  name: "RewardEventsTable - Empty",
}

export const RewardEventsTableManyItems: StoryObj = {
  render: () => {
    const manyEvents = Array.from({ length: 25 }, (_, i) => ({
      id: `event-${i + 1}`,
      type: ["homework", "test", "graduation", "teacherRecognition"][i % 4],
      timestamp: new Date(Date.now() - i * 86400000).toISOString(),
      status: i % 3 === 0 ? "pending" : "completed",
      xpReward: 50 + i * 10,
      coinReward: 25 + i * 5,
    }))

    return (
      <MockEventsTempProvider events={manyEvents}>
        <RewardEventsTable />
      </MockEventsTempProvider>
    )
  },
  name: "RewardEventsTable - Many Items (Pagination)",
}
