/**
 * TaskCard Storybook Stories
 *
 * Comprehensive stories for the TaskCard component system.
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"
import {
  TaskCard,
  TaskCardWithProvider,
  TaskCardProvider,
  HomeworkTaskCard,
  QuizTaskCard,
  ReadingTaskCard,
  ProjectTaskCard,
  TaskType,
  TaskStatus,
  createTaskData,
  DescriptionBars,
  HeartMeter,
  PointsDisplay,
  XPLevelDisplay,
  StatusBadge,
  TaskProgressBar,
} from "./index"
import { TICKET_POINT_OPTIONS, TICKET_POINT_OPTIONS_MAP } from "expanse.ui/points"

// ============================================================
// STORYBOOK CONFIGURATION
// ============================================================

const meta: Meta<typeof TaskCard> = {
  title: "BrandCore/Game/Points/TaskCard",
  component: TaskCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0a0a14" },
        { name: "navy", value: "#1a1a2e" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TaskCard>

// ============================================================
// HELPER DATA
// ============================================================

const sampleTasks = {
  homework: createTaskData({
    id: "hw-1",
    title: "Chapter 5 Problems",
    description: "Complete problems 1-20 from the textbook",
    subject: "Math",
    type: TaskType.HOMEWORK,
    status: TaskStatus.IN_PROGRESS,
    points: TICKET_POINT_OPTIONS.THREE_POINTS,
    progress: 45,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  }),
  quiz: createTaskData({
    id: "quiz-1",
    title: "Chapter 3 Quiz",
    description: "15 questions • 20 minutes",
    subject: "Science",
    type: TaskType.QUIZ,
    status: TaskStatus.NOT_STARTED,
    points: TICKET_POINT_OPTIONS.FIVE_POINTS,
    progress: 0,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  }),
  reading: createTaskData({
    id: "read-1",
    title: "To Kill a Mockingbird",
    description: "Chapter 12 • Pages 201-225",
    subject: "English",
    type: TaskType.READING,
    status: TaskStatus.COMPLETED,
    points: TICKET_POINT_OPTIONS.THREE_POINTS,
    progress: 100,
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  }),
  project: createTaskData({
    id: "proj-1",
    title: "Science Fair Project",
    description: "Team of 3 • 2/5 milestones",
    subject: "Science",
    type: TaskType.PROJECT,
    status: TaskStatus.IN_PROGRESS,
    points: TICKET_POINT_OPTIONS.EIGHTEEN_POINTS,
    progress: 40,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  }),
}

// ============================================================
// BASE TASK CARD STORIES
// ============================================================

export const Default: Story = {
  args: {
    task: sampleTasks.homework,
  },
  render: (args) => (
    <TaskCardWithProvider {...args} />
  ),
}

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "#00d4ff" }}>
        Task Card Variants
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        <HomeworkTaskCard
          title="Chapter 5 Problems"
          subject="Math"
          description="Complete problems 1-20"
          points={TICKET_POINT_OPTIONS.THREE_POINTS}
          status={TaskStatus.IN_PROGRESS}
          progress={45}
        />
        <QuizTaskCard
          title="Chapter 3 Quiz"
          subject="Science"
          questionCount={15}
          timeLimit={20}
          points={TICKET_POINT_OPTIONS.FIVE_POINTS}
        />
        <ReadingTaskCard
          title="To Kill a Mockingbird"
          subject="English"
          chapter={12}
          startPage={201}
          endPage={225}
          status={TaskStatus.COMPLETED}
          progress={100}
        />
        <ProjectTaskCard
          title="Science Fair Project"
          subject="Science"
          totalMilestones={5}
          completedMilestones={2}
          teamSize={3}
          points={TICKET_POINT_OPTIONS.EIGHTEEN_POINTS}
        />
      </Stack>
    </Stack>
  ),
}

// ============================================================
// POINT LEVELS
// ============================================================

export const PointLevels: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "#00d4ff" }}>
        Point Levels (Difficulty)
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        {[
          TICKET_POINT_OPTIONS.ONE_POINT,
          TICKET_POINT_OPTIONS.TWO_POINTS,
          TICKET_POINT_OPTIONS.THREE_POINTS,
          TICKET_POINT_OPTIONS.FIVE_POINTS,
          TICKET_POINT_OPTIONS.NINE_POINTS,
          TICKET_POINT_OPTIONS.EIGHTEEN_POINTS,
          TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS,
        ].map((points) => (
          <HomeworkTaskCard
            key={points}
            title={`${points} Point Task`}
            subject="Example"
            description={`Worth ${TICKET_POINT_OPTIONS_MAP[points]} XP`}
            points={points}
          />
        ))}
      </Stack>
    </Stack>
  ),
}

// ============================================================
// STATUS VARIATIONS
// ============================================================

export const StatusVariations: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "#00d4ff" }}>
        Task Status Variations
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        <HomeworkTaskCard
          title="Not Started"
          subject="Math"
          status={TaskStatus.NOT_STARTED}
          points={TICKET_POINT_OPTIONS.THREE_POINTS}
        />
        <HomeworkTaskCard
          title="In Progress"
          subject="Math"
          status={TaskStatus.IN_PROGRESS}
          progress={45}
          points={TICKET_POINT_OPTIONS.THREE_POINTS}
        />
        <HomeworkTaskCard
          title="Completed"
          subject="Math"
          status={TaskStatus.COMPLETED}
          progress={100}
          points={TICKET_POINT_OPTIONS.THREE_POINTS}
        />
        <HomeworkTaskCard
          title="Overdue"
          subject="Math"
          status={TaskStatus.OVERDUE}
          progress={30}
          points={TICKET_POINT_OPTIONS.THREE_POINTS}
        />
      </Stack>
    </Stack>
  ),
}

// ============================================================
// INTERACTIVE FEATURES
// ============================================================

export const InteractiveDemo: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "#00d4ff" }}>
        Interactive Features
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
        • Hover for glow effect and elevation<br />
        • Click to flip and see details
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        <HomeworkTaskCard
          title="Hover Over Me"
          subject="Demo"
          description="Watch the glow effect"
          points={TICKET_POINT_OPTIONS.FIVE_POINTS}
          status={TaskStatus.IN_PROGRESS}
          progress={60}
        />
      </Stack>
    </Stack>
  ),
}

// ============================================================
// QUIZ CARDS
// ============================================================

export const QuizCards: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "#00d4ff" }}>
        Quiz Cards
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        <QuizTaskCard
          title="Pop Quiz"
          subject="History"
          questionCount={5}
          points={TICKET_POINT_OPTIONS.TWO_POINTS}
        />
        <QuizTaskCard
          title="Chapter Test"
          subject="Math"
          questionCount={20}
          timeLimit={45}
          points={TICKET_POINT_OPTIONS.NINE_POINTS}
        />
        <QuizTaskCard
          title="Final Exam"
          subject="Science"
          questionCount={50}
          timeLimit={90}
          points={TICKET_POINT_OPTIONS.EIGHTEEN_POINTS}
        />
      </Stack>
    </Stack>
  ),
}

// ============================================================
// PROJECT CARDS
// ============================================================

export const ProjectCards: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "#00d4ff" }}>
        Project Cards with Milestones
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        <ProjectTaskCard
          title="Book Report"
          subject="English"
          totalMilestones={3}
          completedMilestones={0}
          points={TICKET_POINT_OPTIONS.FIVE_POINTS}
        />
        <ProjectTaskCard
          title="History Poster"
          subject="History"
          totalMilestones={4}
          completedMilestones={2}
          teamSize={2}
          points={TICKET_POINT_OPTIONS.NINE_POINTS}
        />
        <ProjectTaskCard
          title="Science Fair"
          subject="Science"
          totalMilestones={6}
          completedMilestones={5}
          teamSize={3}
          points={TICKET_POINT_OPTIONS.EIGHTEEN_POINTS}
          status={TaskStatus.IN_PROGRESS}
          progress={83}
        />
      </Stack>
    </Stack>
  ),
}

// ============================================================
// READING CARDS
// ============================================================

export const ReadingCards: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "#00d4ff" }}>
        Reading Assignment Cards
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        <ReadingTaskCard
          title="The Great Gatsby"
          subject="English"
          chapter={3}
          startPage={45}
          endPage={67}
          points={TICKET_POINT_OPTIONS.TWO_POINTS}
        />
        <ReadingTaskCard
          title="Biology Textbook"
          subject="Science"
          chapter="Cell Division"
          startPage={120}
          endPage={145}
          points={TICKET_POINT_OPTIONS.THREE_POINTS}
          status={TaskStatus.IN_PROGRESS}
          progress={50}
        />
        <ReadingTaskCard
          title="World War II"
          subject="History"
          chapter={8}
          startPage={200}
          endPage={240}
          points={TICKET_POINT_OPTIONS.FIVE_POINTS}
          status={TaskStatus.COMPLETED}
          progress={100}
        />
      </Stack>
    </Stack>
  ),
}

// ============================================================
// SUBCOMPONENTS SHOWCASE
// ============================================================

export const Subcomponents: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "#00d4ff" }}>
        Subcomponents
      </Typography>

      <Box sx={{ p: 2, bgcolor: "#1a1a2e", borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#fff", mb: 2 }}>
          Description Bars
        </Typography>
        <DescriptionBars count={3} />
      </Box>

      <Box sx={{ p: 2, bgcolor: "#1a1a2e", borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#fff", mb: 2 }}>
          Heart Meters (Difficulty)
        </Typography>
        <Stack spacing={2}>
          {[
            { label: "1 point", points: TICKET_POINT_OPTIONS.ONE_POINT },
            { label: "2 points", points: TICKET_POINT_OPTIONS.TWO_POINTS },
            { label: "3 points", points: TICKET_POINT_OPTIONS.THREE_POINTS },
            { label: "5 points", points: TICKET_POINT_OPTIONS.FIVE_POINTS },
            { label: "9 points", points: TICKET_POINT_OPTIONS.NINE_POINTS },
            { label: "18 points", points: TICKET_POINT_OPTIONS.EIGHTEEN_POINTS },
            { label: "81 points", points: TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS },
          ].map(({ label, points }) => (
            <Stack key={points} direction="row" spacing={2} sx={{
              alignItems: "center"
            }}>
              <Typography sx={{ color: "#fff", width: 70 }}>{label}:</Typography>
              <HeartMeter points={points} showEmpty />
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box sx={{ p: 2, bgcolor: "#1a1a2e", borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#fff", mb: 2 }}>
          Points Display
        </Typography>
        <Stack direction="row" spacing={4}>
          <PointsDisplay points={TICKET_POINT_OPTIONS.THREE_POINTS} />
          <PointsDisplay points={TICKET_POINT_OPTIONS.NINE_POINTS} />
          <PointsDisplay points={TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS} />
        </Stack>
      </Box>

      <Box sx={{ p: 2, bgcolor: "#1a1a2e", borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#fff", mb: 2 }}>
          XP Level Display
        </Typography>
        <Stack direction="row" spacing={4}>
          <XPLevelDisplay points={TICKET_POINT_OPTIONS.ONE_POINT} />
          <XPLevelDisplay points={TICKET_POINT_OPTIONS.FIVE_POINTS} />
          <XPLevelDisplay points={TICKET_POINT_OPTIONS.EIGHTEEN_POINTS} />
        </Stack>
      </Box>

      <Box sx={{ p: 2, bgcolor: "#1a1a2e", borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#fff", mb: 2 }}>
          Status Badges
        </Typography>
        <Stack direction="row" spacing={2}>
          <StatusBadge status={TaskStatus.NOT_STARTED} />
          <StatusBadge status={TaskStatus.IN_PROGRESS} />
          <StatusBadge status={TaskStatus.COMPLETED} />
          <StatusBadge status={TaskStatus.OVERDUE} />
        </Stack>
      </Box>

      <Box sx={{ p: 2, bgcolor: "#1a1a2e", borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#fff", mb: 2 }}>
          Progress Bar
        </Typography>
        <Stack spacing={2}>
          <TaskProgressBar progress={0} />
          <TaskProgressBar progress={25} />
          <TaskProgressBar progress={50} />
          <TaskProgressBar progress={75} />
          <TaskProgressBar progress={100} />
        </Stack>
      </Box>
    </Stack>
  ),
}

// ============================================================
// GRID LAYOUT
// ============================================================

export const GridLayout: Story = {
  render: () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 3,
        width: "100%",
        maxWidth: 1200,
      }}
    >
      <HomeworkTaskCard
        title="Algebra Worksheet"
        subject="Math"
        points={TICKET_POINT_OPTIONS.THREE_POINTS}
        status={TaskStatus.IN_PROGRESS}
        progress={60}
      />
      <QuizTaskCard
        title="Vocabulary Quiz"
        subject="English"
        questionCount={10}
        points={TICKET_POINT_OPTIONS.TWO_POINTS}
      />
      <ReadingTaskCard
        title="Romeo and Juliet"
        subject="English"
        chapter="Act 2"
        points={TICKET_POINT_OPTIONS.THREE_POINTS}
        status={TaskStatus.COMPLETED}
        progress={100}
      />
      <ProjectTaskCard
        title="Ecosystem Model"
        subject="Science"
        totalMilestones={4}
        completedMilestones={1}
        points={TICKET_POINT_OPTIONS.NINE_POINTS}
      />
      <HomeworkTaskCard
        title="Essay Draft"
        subject="English"
        points={TICKET_POINT_OPTIONS.FIVE_POINTS}
        status={TaskStatus.OVERDUE}
        progress={20}
      />
      <QuizTaskCard
        title="Periodic Table"
        subject="Chemistry"
        questionCount={25}
        timeLimit={30}
        points={TICKET_POINT_OPTIONS.FIVE_POINTS}
      />
    </Box>
  ),
}
