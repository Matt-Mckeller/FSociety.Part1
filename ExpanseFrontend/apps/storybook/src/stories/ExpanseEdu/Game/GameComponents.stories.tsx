import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import React from "react"

// Import game components from ExpanseEdu
import { ExpandingBar } from "../../../../../../apps/expanseEdu/src/modules/game/components/ExpandingBar.component"
import { WalkingCharacter } from "../../../../../../apps/expanseEdu/src/modules/game/components/WalkingCharacter"
// Note: RewardEventsTable and DemoCompleteEventButtons require hooks/context
// We create visual recreations below

// Import required providers
import { CharacterPositionProvider } from "expanse.ui/theme"

/**
 * ExpanseEdu Game Components
 *
 * Game-related components used in the ExpanseEdu application including
 * progress bars, character animations, and reward displays.
 */
const meta: Meta = {
  title: "ExpanseEdu/Game/Components",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta

/**
 * ExpandingBar - Animated SVG progress bar container
 */
export const ExpandingBarStory: StoryObj = {
  name: "ExpandingBar",
  render: () => (
    <Box sx={{ width: "100%", height: 100 }}>
      <ExpandingBar aspectRatio={6}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" color="white">
            Content inside bar
          </Typography>
        </Box>
      </ExpandingBar>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "An SVG-based expanding bar component that can contain child content. Uses theme colors for styling.",
      },
    },
  },
}

/**
 * ExpandingBar with different aspect ratios
 */
export const ExpandingBarAspectRatios: StoryObj = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <Typography variant="subtitle2" mb={1}>
          Aspect Ratio: 4
        </Typography>
        <Box sx={{ width: "100%", height: 80 }}>
          <ExpandingBar aspectRatio={4}>
            <Box />
          </ExpandingBar>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" mb={1}>
          Aspect Ratio: 6
        </Typography>
        <Box sx={{ width: "100%", height: 80 }}>
          <ExpandingBar aspectRatio={6}>
            <Box />
          </ExpandingBar>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" mb={1}>
          Aspect Ratio: 8
        </Typography>
        <Box sx={{ width: "100%", height: 80 }}>
          <ExpandingBar aspectRatio={8}>
            <Box />
          </ExpandingBar>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ExpandingBar with different aspect ratios showing width variations.",
      },
    },
  },
}

/**
 * WalkingCharacter - Animated character with progress
 */
export const WalkingCharacterStory: StoryObj = {
  name: "WalkingCharacter",
  render: () => (
    <CharacterPositionProvider>
      <Box sx={{ width: "100%", height: 300 }}>
        <WalkingCharacter />
      </Box>
    </CharacterPositionProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Animated character that walks and pushes a progress bar. Requires CharacterPositionProvider context.",
      },
    },
  },
}

// Note: RewardEventsTable requires useEventsData hook which needs API context
// It will be added when mock providers are implemented

// Mock event data for visual recreation
const mockEvents = [
  {
    id: "evt-001",
    type: "homework",
    timestamp: new Date("2024-01-15T10:30:00").toISOString(),
  },
  {
    id: "evt-002",
    type: "test",
    timestamp: new Date("2024-01-14T14:20:00").toISOString(),
  },
  {
    id: "evt-003",
    type: "graduation",
    timestamp: new Date("2024-01-13T09:00:00").toISOString(),
  },
  {
    id: "evt-004",
    type: "teacherRecognition",
    timestamp: new Date("2024-01-12T11:45:00").toISOString(),
  },
  {
    id: "evt-005",
    type: "homework",
    timestamp: new Date("2024-01-11T16:00:00").toISOString(),
  },
]

/**
 * RewardEventsTable (Visual Recreation)
 *
 * The actual component uses useEventsData hook. This is a visual representation
 * showing the table structure and data display.
 */
export const RewardEventsTableStory: StoryObj = {
  name: "RewardEventsTable",
  render: () => {
    const [page, setPage] = React.useState(0)
    const rowsPerPage = 5

    return (
      <Box>
        <Typography variant="h6" mb={2}>
          Reward Events
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event ID</TableCell>
                <TableCell>Event Type</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.id}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>
                    {new Date(event.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={mockEvents.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table displaying reward events with pagination. Shows event ID, type, and timestamp. The actual component uses useEventsData hook for data fetching.",
      },
    },
  },
}

/**
 * DemoCompleteEventButtons (Visual Recreation)
 *
 * The actual component uses EventsTempContext. This shows the UI for
 * triggering different event types.
 */
export const DemoCompleteEventButtonsStory: StoryObj = {
  name: "DemoCompleteEventButtons",
  render: () => {
    const [selectedType, setSelectedType] = React.useState("test")
    const [lastTriggered, setLastTriggered] = React.useState<string | null>(
      null,
    )

    return (
      <Box display="flex" flexDirection="column" width={300} gap={2}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-select-label">
            Sample Reward Event Types
          </InputLabel>
          <Select
            labelId="demo-select-label"
            id="demo-select"
            value={selectedType}
            label="Reward Event Type"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="homework">Homework Completed</MenuItem>
            <MenuItem value="test">Test Completed</MenuItem>
            <MenuItem value="graduation">Graduation</MenuItem>
            <MenuItem value="teacherRecognition">Teacher Recognition</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => {
            setLastTriggered(selectedType)
          }}
        >
          Trigger Event
        </Button>
        {lastTriggered && (
          <Typography variant="body2" color="success.main">
            ✓ Triggered: {lastTriggered}
          </Typography>
        )}
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demo component for triggering reward events. In the actual app, this uses EventsTempContext to dispatch events to the game system.",
      },
    },
  },
}
