import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import SchoolIcon from "@mui/icons-material/School"
import GamepadIcon from "@mui/icons-material/Gamepad"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import React from "react"

// Import game views from ExpanseEdu (only simple ones)
import { TicketEventSampleDisplay } from "../../../../../../apps/expanseEdu/src/modules/game/views/TicketEventSampleDisplay.component"

/**
 * ExpanseEdu Game Views
 *
 * Full-page game views used in the ExpanseEdu application.
 * Complex views with heavy API/context dependencies are shown as
 * visual recreations or documentation to illustrate their purpose.
 */
const meta: Meta = {
  title: "ExpanseEdu/Game/Views",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

/**
 * TicketEventSampleDisplay - Sample ticket event display
 */
export const TicketEventSample: StoryObj = {
  render: () => (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <TicketEventSampleDisplay />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Sample display showing a TicketCard with TicketEventActions. Demonstrates the ticket/event UI pattern.",
      },
    },
  },
}

// =============================================================================
// StudentLandingPage Story
// =============================================================================

// Mock data for student landing page preview
const mockStudentClasses = [
  {
    id: "sc1",
    name: "Algebra II",
    teacher: "Mr. Thompson",
    assignments: 5,
    completedAssignments: 3,
  },
  {
    id: "sc2",
    name: "Biology",
    teacher: "Dr. Martinez",
    assignments: 3,
    completedAssignments: 2,
  },
  {
    id: "sc3",
    name: "English Literature",
    teacher: "Ms. Garcia",
    assignments: 4,
    completedAssignments: 4,
  },
]

const mockPendingRewards = [
  { id: "r1", assignment: "Chapter 5 Quiz", xp: 50, coins: 25 },
  { id: "r2", assignment: "Lab Report #3", xp: 75, coins: 35 },
]

/**
 * StudentLandingPage
 *
 * The main landing page for students in ExpanseEdu.
 * Shows enrolled classes, assignments, and pending rewards.
 *
 * Note: The actual component uses DemoEdLinkIntegrationStudentView
 * which requires ProfileContext and EdLink API access.
 */
export const StudentLandingPagePreview: StoryObj = {
  name: "StudentLandingPage",
  render: () => (
    <Box sx={{ p: 4 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <SchoolIcon fontSize="large" color="primary" />
        <Box>
          <Typography variant="h4">Welcome back, Alex! 👋</Typography>
          <Typography variant="body1" color="text.secondary">
            You have {mockPendingRewards.length} rewards waiting to be claimed!
          </Typography>
        </Box>
      </Box>

      {/* Pending Rewards Alert */}
      {mockPendingRewards.length > 0 && (
        <Paper
          sx={{
            p: 2,
            mb: 4,
            bgcolor: "success.light",
            borderLeft: 4,
            borderColor: "success.main",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            🎁 Unclaimed Rewards
          </Typography>
          <Grid container spacing={2}>
            {mockPendingRewards.map((reward) => (
              <Grid item xs={12} md={6} key={reward.id}>
                <Card variant="outlined">
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">
                        {reward.assignment}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        +{reward.xp} XP • +{reward.coins} coins
                      </Typography>
                    </Box>
                    <Button variant="contained" size="small" color="success">
                      Claim!
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Classes Overview */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Classes
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockStudentClasses.map((cls) => (
          <Grid item xs={12} md={4} key={cls.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{cls.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {cls.teacher}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={`${cls.completedAssignments}/${cls.assignments} complete`}
                    size="small"
                    color={
                      cls.completedAssignments === cls.assignments
                        ? "success"
                        : "default"
                    }
                  />
                  <Button size="small">View</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Progress
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="primary">
              12
            </Typography>
            <Typography variant="caption">Level</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="warning.main">
              1,250
            </Typography>
            <Typography variant="caption">Coins</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="success.main">
              45
            </Typography>
            <Typography variant="caption">Assignments Done</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="secondary.main">
              3
            </Typography>
            <Typography variant="caption">Loot Boxes</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 2, bgcolor: "info.light" }}>
        <Typography variant="caption">
          ℹ️ This is a visual preview. The actual StudentLandingPage wraps
          DemoEdLinkIntegrationStudentView, which connects to EdLink LMS for
          real class and assignment data.
        </Typography>
      </Paper>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Main landing page for students. Shows enrolled classes, pending rewards, and progress stats. Uses EdLink LMS integration for real data.",
      },
    },
  },
}

// Mock data for visual recreations
const mockStoreRewards = [
  {
    id: "1",
    name: "Extra Recess",
    description: "15 minutes of extra recess time",
    cost: 100,
    category: "Time",
  },
  {
    id: "2",
    name: "Homework Pass",
    description: "Skip one homework assignment",
    cost: 200,
    category: "Academic",
  },
  {
    id: "3",
    name: "Front of Line",
    description: "Front of lunch line for a day",
    cost: 50,
    category: "Privilege",
  },
]

/**
 * StudentStoreView (Visual Recreation)
 *
 * The actual component uses Apollo Client for data fetching and
 * WalletContext for purchase transactions.
 */
export const StudentStoreViewPreview: StoryObj = {
  name: "StudentStoreView (Preview)",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <ShoppingCartIcon fontSize="large" color="primary" />
        <Typography variant="h4">Class Store</Typography>
        <Chip label="Balance: 500 coins" color="success" sx={{ ml: "auto" }} />
      </Box>

      <Grid container spacing={3}>
        {mockStoreRewards.map((reward) => (
          <Grid item xs={12} md={4} key={reward.id}>
            <Card sx={{ height: "100%" }}>
              <Box
                sx={{
                  bgcolor: "primary.light",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardGiftcardIcon sx={{ fontSize: 48, color: "white" }} />
              </Box>
              <CardContent>
                <Typography variant="h6">{reward.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {reward.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Chip label={`${reward.cost} coins`} size="small" />
                  <Button variant="contained" size="small">
                    Buy
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 4, p: 2, bgcolor: "info.light" }}>
        <Typography variant="caption">
          ℹ️ This is a visual preview. The actual StudentStoreView component
          uses Apollo Client for fetching rewards and WalletContext for managing
          purchases.
        </Typography>
      </Paper>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Preview of the student store where students can spend earned coins on classroom rewards. Uses Apollo Client and WalletContext for real functionality.",
      },
    },
  },
}

/**
 * GameDemoView (Visual Recreation)
 *
 * Demo view showing all game components in action.
 */
export const GameDemoViewPreview: StoryObj = {
  name: "GameDemoView (Preview)",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <GamepadIcon fontSize="large" color="primary" />
        <Typography variant="h4">Game Demo</Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Progress Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Experience Progress
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <CircularProgress variant="determinate" value={65} size={60} />
              <Box>
                <Typography variant="h5">Level 5</Typography>
                <Typography variant="body2" color="text.secondary">
                  650 / 1000 XP
                </Typography>
              </Box>
            </Box>
            <Button variant="outlined" size="small">
              +10 XP
            </Button>
          </Paper>
        </Grid>

        {/* Event Triggers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Demo Event Triggers
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button variant="contained" startIcon={<SchoolIcon />}>
                Homework Completed
              </Button>
              <Button variant="contained" color="secondary">
                Test Passed
              </Button>
              <Button variant="contained" color="success">
                Achievement Earned
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Components Grid */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Included Components
          </Typography>
          <Grid container spacing={2}>
            {[
              "ProfileDisplay",
              "ProgressBarPreview",
              "CharacterPreview",
              "TicketEventSampleDisplay",
              "ChestOpening Animation",
              "RewardEventsTable",
            ].map((comp) => (
              <Grid item xs={6} md={4} key={comp}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="body2">{comp}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 2, bgcolor: "info.light" }}>
        <Typography variant="caption">
          ℹ️ This is a visual preview. The actual GameDemoView includes
          ProgressContext and EventsTempContext for managing game state.
        </Typography>
      </Paper>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demo page showcasing all game components together including progress bars, event triggers, animations, and more.",
      },
    },
  },
}

/**
 * TeacherRewardManagement (Visual Recreation)
 */
export const TeacherRewardManagementPreview: StoryObj = {
  name: "TeacherRewardManagement (Preview)",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <AdminPanelSettingsIcon fontSize="large" color="primary" />
        <Typography variant="h4">Reward Management</Typography>
        <Chip label="Teacher Dashboard" color="primary" sx={{ ml: "auto" }} />
      </Box>

      <Grid container spacing={4}>
        {/* Create Reward Form */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Create New Reward
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  bgcolor: "grey.200",
                  p: 2,
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  TeacherRewardForm Component
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Existing Rewards */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Created Rewards
            </Typography>
            <List>
              {mockStoreRewards.map((reward, index) => (
                <React.Fragment key={reward.id}>
                  <ListItem
                    secondaryAction={
                      <Button color="error" size="small">
                        Remove
                      </Button>
                    }
                  >
                    <ListItemIcon>
                      <CardGiftcardIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={reward.name}
                      secondary={`${reward.cost} coins - ${reward.description}`}
                    />
                  </ListItem>
                  {index < mockStoreRewards.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 2, bgcolor: "info.light" }}>
        <Typography variant="caption">
          ℹ️ This is a visual preview. The actual TeacherRewardManagement uses
          Apollo Client for CRUD operations and ProfileContext for class
          information.
        </Typography>
      </Paper>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Teacher dashboard for creating, viewing, and managing classroom rewards that students can purchase.",
      },
    },
  },
}
