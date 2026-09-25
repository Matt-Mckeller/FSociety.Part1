import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography, Paper } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  HomeworkCard,
  AssignmentCard,
  QuizCard,
  ReadingCard,
  ProjectCard,
} from "./HomeworkCard"
import {
  neonDarkPalette,
  NEON_NAVY,
  NEON_PURPLE,
} from "@expanse/theme"

/**
 * Homework Cards - Assignment cards combining document shapes with gamification
 *
 * These cards use the document shape primitives (FoldedPaperShape, NotebookPageShape,
 * ClipboardShape) and integrate with the XP/points system.
 */
const meta: Meta<typeof HomeworkCard> = {
  title: "BrandCore/Game/HomeworkCards",
  component: HomeworkCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: NEON_NAVY },
        {
          name: "gradient",
          value: `linear-gradient(135deg, ${NEON_NAVY} 0%, ${NEON_PURPLE} 100%)`,
        },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof HomeworkCard>

const cloudTheme = createTheme({ palette: cloudDarkThemePalette })

// ============================================================================
// Base HomeworkCard Stories
// ============================================================================

export const Default: Story = {
  args: {
    title: "Complete Chapter 5 Reading",
    description: "Read pages 120-145 and take notes on the key concepts",
    subject: "English",
    xpValue: 50,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    progress: 30,
  },
}

export const PaperVariant: Story = {
  name: "Variant: Paper (Folded Corner)",
  args: {
    title: "Math Worksheet",
    description: "Complete problems 1-20 on page 156",
    subject: "Math",
    xpValue: 35,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    variant: "paper",
  },
}

export const NotebookVariant: Story = {
  name: "Variant: Notebook (Spiral)",
  args: {
    title: "History Notes",
    description: "Take notes on the Industrial Revolution",
    subject: "History",
    xpValue: 40,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    variant: "notebook",
  },
}

export const ClipboardVariant: Story = {
  name: "Variant: Clipboard",
  args: {
    title: "Science Quiz",
    description: "10 questions on photosynthesis",
    subject: "Science",
    xpValue: 60,
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    variant: "clipboard",
  },
}

export const Completed: Story = {
  args: {
    title: "Essay Draft",
    description: "Write a 500-word essay about climate change",
    subject: "English",
    xpValue: 75,
    isCompleted: true,
    progress: 100,
  },
}

// ============================================================================
// Specialized Card Variants
// ============================================================================

export const AssignmentCardStory: Story = {
  name: "AssignmentCard",
  render: () => (
    <ThemeProvider theme={cloudTheme}>
      <AssignmentCard
        title="Algebra Homework"
        subject="Math"
        xpValue={40}
        dueDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
        progress={50}
      />
    </ThemeProvider>
  ),
}

export const QuizCardStory: Story = {
  name: "QuizCard",
  render: () => (
    <ThemeProvider theme={cloudTheme}>
      <Stack direction="row" spacing={3}>
        <QuizCard
          title="Chapter 3 Quiz"
          subject="Science"
          xpValue={80}
          questionCount={10}
          timeLimit={15}
          dueDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}
        />
        <QuizCard
          title="Pop Quiz"
          subject="History"
          xpValue={50}
          questionCount={5}
          dueDate={new Date()}
        />
      </Stack>
    </ThemeProvider>
  ),
}

export const ReadingCardStory: Story = {
  name: "ReadingCard",
  render: () => (
    <ThemeProvider theme={cloudTheme}>
      <Stack direction="row" spacing={3}>
        <ReadingCard
          title="To Kill a Mockingbird"
          subject="English"
          xpValue={45}
          chapter={12}
          startPage={201}
          endPage={225}
          dueDate={new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)}
          progress={25}
        />
        <ReadingCard
          title="Biology Textbook"
          subject="Science"
          xpValue={30}
          chapter="Cellular Respiration"
          startPage={88}
          endPage={102}
        />
      </Stack>
    </ThemeProvider>
  ),
}

export const ProjectCardStory: Story = {
  name: "ProjectCard",
  render: () => (
    <ThemeProvider theme={cloudTheme}>
      <Stack direction="row" spacing={3}>
        <ProjectCard
          title="Science Fair Project"
          subject="Science"
          xpValue={200}
          totalMilestones={5}
          completedMilestones={2}
          dueDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
        />
        <ProjectCard
          title="Group Presentation"
          subject="History"
          xpValue={150}
          totalMilestones={4}
          completedMilestones={3}
          teamSize={4}
          dueDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
        />
      </Stack>
    </ThemeProvider>
  ),
}

// ============================================================================
// Showcase Stories
// ============================================================================

export const AllVariantsShowcase: Story = {
  name: "All Variants - Showcase",
  render: () => (
    <ThemeProvider theme={cloudTheme}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 4 }}>
          Homework Card Variants
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "grey.400", mb: 2 }}>
              Document Style Variants
            </Typography>
            <Stack direction="row" spacing={3} sx={{
              flexWrap: "wrap"
            }}>
              <HomeworkCard
                title="Paper Style"
                description="Folded corner effect"
                subject="Demo"
                variant="paper"
                xpValue={25}
              />
              <HomeworkCard
                title="Notebook Style"
                description="Spiral binding effect"
                subject="Demo"
                variant="notebook"
                xpValue={25}
              />
              <HomeworkCard
                title="Clipboard Style"
                description="Clipboard clip effect"
                subject="Demo"
                variant="clipboard"
                xpValue={25}
              />
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: "grey.400", mb: 2 }}>
              Specialized Cards
            </Typography>
            <Stack direction="row" spacing={3} sx={{
              flexWrap: "wrap"
            }}>
              <AssignmentCard
                title="Assignment"
                subject="General"
                xpValue={40}
              />
              <QuizCard
                title="Quiz"
                subject="Test"
                questionCount={15}
                timeLimit={20}
                xpValue={60}
              />
              <ReadingCard
                title="Reading"
                subject="Literature"
                chapter={5}
                startPage={100}
                endPage={125}
                xpValue={35}
              />
              <ProjectCard
                title="Project"
                subject="Applied"
                totalMilestones={6}
                completedMilestones={2}
                xpValue={150}
              />
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: "grey.400", mb: 2 }}>
              Progress States
            </Typography>
            <Stack direction="row" spacing={3} sx={{
              flexWrap: "wrap"
            }}>
              <HomeworkCard
                title="Not Started"
                subject="Status"
                xpValue={50}
                progress={0}
              />
              <HomeworkCard
                title="In Progress"
                subject="Status"
                xpValue={50}
                progress={45}
              />
              <HomeworkCard
                title="Almost Done"
                subject="Status"
                xpValue={50}
                progress={85}
              />
              <HomeworkCard
                title="Completed!"
                subject="Status"
                xpValue={50}
                isCompleted={true}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  ),
}

export const DueDateStates: Story = {
  name: "Due Date States",
  render: () => (
    <ThemeProvider theme={cloudTheme}>
      <Stack direction="row" spacing={3}>
        <HomeworkCard
          title="Overdue!"
          subject="Urgent"
          xpValue={50}
          dueDate={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)} // 2 days ago
        />
        <HomeworkCard
          title="Due Today"
          subject="Urgent"
          xpValue={50}
          dueDate={new Date()}
        />
        <HomeworkCard
          title="Due Tomorrow"
          subject="Soon"
          xpValue={50}
          dueDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}
        />
        <HomeworkCard
          title="Due in 5 Days"
          subject="Upcoming"
          xpValue={50}
          dueDate={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)}
        />
        <HomeworkCard
          title="Due Next Week"
          subject="Later"
          xpValue={50}
          dueDate={new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)}
        />
      </Stack>
    </ThemeProvider>
  ),
}
