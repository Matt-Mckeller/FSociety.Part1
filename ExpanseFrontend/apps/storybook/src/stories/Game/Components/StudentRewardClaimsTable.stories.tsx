"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper } from "@mui/material"

/**
 * # StudentRewardClaimsTable
 * 
 * A complex table component for displaying student reward claims with expandable rows,
 * pagination, and reward claiming functionality.
 * 
 * **Note:** This component requires several context providers and GraphQL setup to function.
 * It is designed to be used within the full application context.
 */

// Documentation component since the real component requires complex context
const StudentRewardClaimsTableDocumentation = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h5" gutterBottom>
        StudentRewardClaimsTable
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          This is a complex table component for displaying and managing student reward claims.
          It features:
        </Typography>
        
        <ul>
          <li>Expandable rows showing assignment details</li>
          <li>Pagination for large datasets</li>
          <li>Integration with ProfileContext for loading states</li>
          <li>Reward claiming functionality via GraphQL mutations</li>
          <li>Class and assignment hierarchy display</li>
        </ul>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
          Required Props:
        </Typography>
        
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`interface StudentRewardClaimsTableProps {
  classes: ClassInterface[]
  classesAssignmentsMap: Record<string, AssignmentInterface[]>
  fetchSubmissionsAndRewardableEventsForMyAssignments: (
    assignmentIdAndClassIdInput: {
      elAssignmentId: string
      elClassId: string
    }[]
  ) => Promise<{
    submission: SubmissionInterface
    rewardableEvent: RewardableEventInterface
    assignmentId: string
    elAssignmentId: string
  }[]>
  claimReward: (rewardableEvents: RewardableEventInterface[]) => void
  loadingAssignments: boolean
}`}
        </Box>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 3 }}>
          Usage Example:
        </Typography>
        
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`<StudentRewardClaimsTable
  classes={myClasses}
  classesAssignmentsMap={assignmentsMap}
  fetchSubmissionsAndRewardableEventsForMyAssignments={fetchFn}
  claimReward={handleClaimReward}
  loadingAssignments={isLoading}
/>`}
        </Box>

        <Typography variant="body2" color="warning.main" sx={{ mt: 3 }}>
          ⚠️ This component requires ProfileContext to be available in the component tree.
        </Typography>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof StudentRewardClaimsTableDocumentation> = {
  title: "Game/Components/StudentRewardClaimsTable",
  component: StudentRewardClaimsTableDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Complex table for student reward claims management with expandable rows and pagination.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof StudentRewardClaimsTableDocumentation>

export const Documentation: Story = {}
