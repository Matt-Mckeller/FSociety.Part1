import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import { ClassTable } from "./ClassTable"
import { CourseTable } from "./CourseTable"
import { AssignmentTable } from "./AssignmentTable"
import ExperienceProgressBar from "./ExperienceProgressBar"
import ExperienceProgressBarSimple from "./ExperienceProgressBarSimple"

/**
 * Game data tables and progress bar components.
 * Tables display classes, courses, and assignments with pagination.
 * Progress bars show animated experience progression.
 */
const meta: Meta = {
  title: "Game/Components/TablesAndProgress",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

// ============================================================================
// Mock Data
// ============================================================================

const mockClasses = [
  { id: "class-1", name: "Introduction to Programming" },
  { id: "class-2", name: "Data Structures" },
  { id: "class-3", name: "Algorithms" },
  { id: "class-4", name: "Web Development" },
  { id: "class-5", name: "Database Systems" },
]

const mockCourses = [
  { id: "course-1", name: "Computer Science 101" },
  { id: "course-2", name: "Software Engineering" },
  { id: "course-3", name: "Machine Learning Basics" },
  { id: "course-4", name: "Cloud Computing" },
]

const mockAssignments = [
  {
    id: "assign-1",
    title: "Hello World Project",
    due_date: "2026-01-25",
    status: "active",
  },
  {
    id: "assign-2",
    title: "Array Manipulation",
    due_date: "2026-01-28",
    status: "active",
  },
  {
    id: "assign-3",
    title: "Linked List Implementation",
    due_date: "2026-02-01",
    status: "pending",
  },
  {
    id: "assign-4",
    title: "Binary Search Tree",
    due_date: "2026-02-05",
    status: "completed",
  },
]

const mockAssignmentSubmissionMap = {
  "assign-1": [
    {
      person_id: "student-1",
      assignment_id: "assign-1",
      status: "submitted",
      grade: "A",
    },
    {
      person_id: "student-2",
      assignment_id: "assign-1",
      status: "submitted",
      grade: "B+",
    },
  ],
  "assign-2": [
    {
      person_id: "student-1",
      assignment_id: "assign-2",
      status: "pending",
      grade: "",
    },
  ],
  "assign-3": [],
  "assign-4": [
    {
      person_id: "student-1",
      assignment_id: "assign-4",
      status: "graded",
      grade: "A-",
    },
    {
      person_id: "student-2",
      assignment_id: "assign-4",
      status: "graded",
      grade: "A",
    },
    {
      person_id: "student-3",
      assignment_id: "assign-4",
      status: "graded",
      grade: "B",
    },
  ],
}

// ============================================================================
// Class Table
// ============================================================================

export const ClassTableStory: StoryObj = {
  name: "ClassTable",
  render: () => (
    <Box sx={{ width: 500 }}>
      <ClassTable classes={mockClasses} />
    </Box>
  ),
}

// ============================================================================
// Course Table
// ============================================================================

export const CourseTableStory: StoryObj = {
  name: "CourseTable",
  render: () => (
    <Box sx={{ width: 500 }}>
      <CourseTable courses={mockCourses} />
    </Box>
  ),
}

// ============================================================================
// Assignment Table
// ============================================================================

export const AssignmentTableStory: StoryObj = {
  name: "AssignmentTable",
  render: () => (
    <Box sx={{ width: 700 }}>
      <AssignmentTable
        assignments={mockAssignments}
        assignmentSubmissionMap={mockAssignmentSubmissionMap}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Expandable table showing assignments with nested submission details.",
      },
    },
  },
}

// ============================================================================
// Experience Progress Bars
// ============================================================================

export const ExperienceProgressBarStory: StoryObj = {
  name: "ExperienceProgressBar",
  render: () => (
    <Box sx={{ width: 400 }}>
      <Typography variant="subtitle2" mb={1}>
        Animated Experience Progress (uses ExperienceContext)
      </Typography>
      <ExperienceProgressBar
        aspectRatio={8}
        displayLevelText={true}
        animationDuration={500}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Animated progress bar that shows experience toward next level. Uses ExperienceContext.",
      },
    },
  },
}

export const ExperienceProgressBarSimpleStory: StoryObj = {
  name: "ExperienceProgressBarSimple",
  render: () => (
    <Box sx={{ width: 400 }}>
      <Typography variant="subtitle2" mb={1}>
        Simple Progress Bar (uses ProgressContext)
      </Typography>
      <ExperienceProgressBarSimple
        aspectRatio={8}
        displayLevelText={true}
        animationDuration={500}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Simplified progress bar using ProgressContext instead of ExperienceContext.",
      },
    },
  },
}

// ============================================================================
// Gallery
// ============================================================================

export const AllTablesGallery: StoryObj = {
  name: "Gallery - All Tables",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <Typography variant="h5">Game Tables Gallery</Typography>

      <Box>
        <Typography variant="h6" mb={2}>
          ClassTable
        </Typography>
        <Box sx={{ width: 500 }}>
          <ClassTable classes={mockClasses} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mb={2}>
          CourseTable
        </Typography>
        <Box sx={{ width: 500 }}>
          <CourseTable courses={mockCourses} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mb={2}>
          AssignmentTable
        </Typography>
        <Box sx={{ width: 700 }}>
          <AssignmentTable
            assignments={mockAssignments}
            assignmentSubmissionMap={mockAssignmentSubmissionMap}
          />
        </Box>
      </Box>
    </Box>
  ),
}

export const AllProgressBarsGallery: StoryObj = {
  name: "Gallery - Progress Bars",
  render: () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 2,
        width: 500,
      }}
    >
      <Typography variant="h5">Experience Progress Bars</Typography>

      <Box>
        <Typography variant="subtitle2" mb={1}>
          ExperienceProgressBar
        </Typography>
        <ExperienceProgressBar aspectRatio={8} displayLevelText={true} />
      </Box>

      <Box>
        <Typography variant="subtitle2" mb={1}>
          ExperienceProgressBarSimple
        </Typography>
        <ExperienceProgressBarSimple aspectRatio={8} displayLevelText={true} />
      </Box>

      <Box>
        <Typography variant="subtitle2" mb={1}>
          Without Level Text
        </Typography>
        <ExperienceProgressBar aspectRatio={10} displayLevelText={false} />
      </Box>

      <Box>
        <Typography variant="subtitle2" mb={1}>
          Different Aspect Ratio (12)
        </Typography>
        <ExperienceProgressBar aspectRatio={12} displayLevelText={true} />
      </Box>
    </Box>
  ),
}
