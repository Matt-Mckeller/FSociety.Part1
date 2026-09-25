import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import React, { useState } from "react"

// Import actual components
import { DemoCompleteEventButtons } from "../../../../../../apps/expanseEdu/src/modules/game/views/DemoViews/DemoCompleteEventButtons.component"

// Import mock providers
import { EventsTempContext } from "expanse.ui/game"

/**
 * ExpanseEdu Demo Views
 *
 * Demo and testing views used for internal development and showcasing features.
 * These components are primarily used for demonstrating integrations and testing.
 */
const meta: Meta = {
  title: "ExpanseEdu/Game/DemoViews",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta

// ============================================================================
// DemoCompleteEventButtons - Working Story with Mock Context
// ============================================================================

/**
 * DemoCompleteEventButtons
 *
 * A dropdown and button component for triggering sample reward events.
 * Used for testing the reward system during development.
 */
export const DemoCompleteEventButtonsStory: StoryObj = {
  name: "DemoCompleteEventButtons",
  render: () => {
    const [triggeredEvents, setTriggeredEvents] = useState<string[]>([])

    const mockEventsTempContext = {
      rewardEvents: triggeredEvents.map((type, i) => ({
        id: `event-${i}`,
        type,
        timestamp: new Date().toISOString(),
      })),
      handleAddEvent: (eventType: string) => {
        console.log("[Storybook] Event triggered:", eventType)
        setTriggeredEvents((prev) => [...prev, eventType])
      },
    }

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Demo Event Trigger
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select an event type and click &quot;Trigger Event&quot; to simulate
          reward events.
        </Typography>

        <EventsTempContext.Provider value={mockEventsTempContext as any}>
          <DemoCompleteEventButtons />
        </EventsTempContext.Provider>

        {triggeredEvents.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Triggered Events:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {triggeredEvents.map((event, i) => (
                <Chip
                  key={i}
                  label={event}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Working demo of the event trigger component. Select event types and trigger them to see the reward system in action.",
      },
    },
  },
}

// ============================================================================
// DemoEdLinkIntegrationView - Visual Preview
// ============================================================================

// Mock data for EdLink visual preview
const mockSchools = [
  { id: "1", name: "Springfield Elementary", district: "Springfield USD" },
  { id: "2", name: "Central High School", district: "Central District" },
]

const mockClasses = [
  { id: "c1", name: "Math 101", teacher: "Mr. Johnson", students: 28 },
  { id: "c2", name: "Science 202", teacher: "Ms. Smith", students: 32 },
  { id: "c3", name: "English 301", teacher: "Mrs. Davis", students: 25 },
]

const mockAssignments = [
  {
    id: "a1",
    title: "Chapter 5 Quiz",
    dueDate: "2026-01-25",
    status: "Active",
    submissions: 18,
  },
  {
    id: "a2",
    title: "Lab Report #3",
    dueDate: "2026-01-28",
    status: "Active",
    submissions: 22,
  },
  {
    id: "a3",
    title: "Essay Draft",
    dueDate: "2026-01-30",
    status: "Upcoming",
    submissions: 0,
  },
]

/**
 * DemoEdLinkIntegrationView (Preview)
 *
 * Admin-facing view for EdLink LMS integration.
 * Shows connected LMS providers, schools, classes, and assignment sync status.
 */
export const DemoEdLinkIntegrationViewPreview: StoryObj = {
  name: "EdLink Integration View (Preview)",
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        EdLink LMS Integration
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Connect and sync data from supported Learning Management Systems.
      </Typography>

      {/* Integration Selector */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Connected Integrations
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip label="Canvas" color="primary" />
          <Chip label="Google Classroom" variant="outlined" />
          <Chip label="Schoology" variant="outlined" />
          <Chip label="Blackboard" variant="outlined" />
        </Box>
      </Paper>

      {/* Schools Table */}
      <Typography variant="h6" gutterBottom>
        Schools
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>School Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSchools.map((school) => (
              <TableRow key={school.id}>
                <TableCell>{school.name}</TableCell>
                <TableCell>{school.district}</TableCell>
                <TableCell>
                  <Button size="small">View Classes</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Classes Table */}
      <Typography variant="h6" gutterBottom>
        Classes
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Class Name</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockClasses.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.name}</TableCell>
                <TableCell>{cls.teacher}</TableCell>
                <TableCell>{cls.students}</TableCell>
                <TableCell>
                  <Button size="small">View Assignments</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Assignments Table */}
      <Typography variant="h6" gutterBottom>
        Assignments
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Assignment</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>
                  <Chip
                    label={assignment.status}
                    size="small"
                    color={
                      assignment.status === "Active" ? "success" : "default"
                    }
                  />
                </TableCell>
                <TableCell>{assignment.submissions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
        <Typography variant="body2">
          <strong>Note:</strong> This is a visual preview. The actual component
          connects to the EdLink API for real-time LMS data synchronization.
        </Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Visual preview of the admin EdLink integration view. Shows the UI for managing LMS connections, schools, classes, and assignments.",
      },
    },
  },
}

// ============================================================================
// DemoEdLinkIntegrationStudentView - Visual Preview
// ============================================================================

const mockStudentClasses = [
  { id: "sc1", name: "Algebra II", teacher: "Mr. Thompson", assignments: 5 },
  { id: "sc2", name: "Biology", teacher: "Dr. Martinez", assignments: 3 },
]

const mockStudentAssignments = [
  {
    id: "sa1",
    title: "Quadratic Equations Quiz",
    className: "Algebra II",
    dueDate: "2026-01-25",
    status: "Completed",
    reward: "claimed",
  },
  {
    id: "sa2",
    title: "Cell Division Lab",
    className: "Biology",
    dueDate: "2026-01-26",
    status: "Completed",
    reward: "unclaimed",
  },
  {
    id: "sa3",
    title: "Polynomial Practice",
    className: "Algebra II",
    dueDate: "2026-01-28",
    status: "In Progress",
    reward: null,
  },
  {
    id: "sa4",
    title: "Genetics Worksheet",
    className: "Biology",
    dueDate: "2026-01-30",
    status: "Not Started",
    reward: null,
  },
]

/**
 * DemoEdLinkIntegrationStudentView (Preview)
 *
 * Student-facing view for viewing assignments and claiming rewards.
 */
export const DemoEdLinkIntegrationStudentViewPreview: StoryObj = {
  name: "EdLink Student View (Preview)",
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Welcome, Alex! 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Below you can find your list of assignments and redeem your currency and
        rewards for any completed events!
      </Typography>

      {/* Classes Overview */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {mockStudentClasses.map((cls) => (
          <Grid item xs={12} md={6} key={cls.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{cls.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {cls.teacher}
                </Typography>
                <Chip
                  label={`${cls.assignments} assignments`}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Assignments with Rewards */}
      <Typography variant="h6" gutterBottom>
        Your Assignments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assignment</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockStudentAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.className}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>
                  <Chip
                    label={assignment.status}
                    size="small"
                    color={
                      assignment.status === "Completed"
                        ? "success"
                        : assignment.status === "In Progress"
                          ? "warning"
                          : "default"
                    }
                  />
                </TableCell>
                <TableCell>
                  {assignment.reward === "claimed" && (
                    <Chip
                      label="Claimed ✓"
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  )}
                  {assignment.reward === "unclaimed" && (
                    <Button size="small" variant="contained" color="primary">
                      Claim Reward! 🎁
                    </Button>
                  )}
                  {assignment.reward === null && (
                    <Typography variant="body2" color="text.disabled">
                      —
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
        <Typography variant="body2">
          <strong>Tip:</strong> Complete assignments to earn XP, coins, and
          unlock loot boxes!
        </Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Visual preview of the student EdLink view. Shows how students view their assignments and claim rewards for completed work.",
      },
    },
  },
}

// ============================================================================
// Overview Story
// ============================================================================

/**
 * Demo Views Overview
 */
export const DemoViewsOverview: StoryObj = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Demo Views
      </Typography>
      <Typography variant="body1" paragraph>
        These views are used for internal development and testing of ExpanseEdu
        features.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Available Demo Views
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">DemoCompleteEventButtons</Typography>
              <Typography variant="body2" color="text.secondary">
                Trigger sample reward events for testing the game system.
              </Typography>
              <Chip
                label="Working"
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">EdLink Integration (Admin)</Typography>
              <Typography variant="body2" color="text.secondary">
                Admin view for managing LMS connections and data sync.
              </Typography>
              <Chip label="Preview" color="info" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">EdLink Student View</Typography>
              <Typography variant="body2" color="text.secondary">
                Student view for assignments and reward claiming.
              </Typography>
              <Chip label="Preview" color="info" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Overview of all demo views available in the ExpanseEdu game module.",
      },
    },
  },
}
