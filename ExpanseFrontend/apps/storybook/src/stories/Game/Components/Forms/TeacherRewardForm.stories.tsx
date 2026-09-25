"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper } from "@mui/material"

/**
 * # TeacherRewardForm
 * 
 * A form component for teachers to create and configure rewards for their classes.
 * Teachers can specify reward details, select classes, and set purchase limits.
 * 
 * **Note:** This component requires GraphQL client setup and LayoutContext for snackbar notifications.
 */

const TeacherRewardFormDocumentation = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h5" gutterBottom>
        TeacherRewardForm
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          A comprehensive form for teachers to create rewards that students can earn/purchase.
          Features include:
        </Typography>
        
        <ul>
          <li>Reward name and description fields</li>
          <li>Cost selection from predefined point options</li>
          <li>Multi-select for assigning rewards to classes</li>
          <li>Select all classes option</li>
          <li>Optional maximum purchase quantity limit</li>
          <li>Form validation with error messages</li>
          <li>Success/error notifications via snackbar</li>
        </ul>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 3 }}>
          Props Interface:
        </Typography>
        
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`interface TeacherRewardFormProps {
  // Optional existing reward for editing
  reward?: RewardInterface<TeacherClassification>
  
  // Callback when reward is successfully saved
  onSuccess?: () => void
  
  // List of classes the teacher teaches
  taughtClasses: { elId: string; name: string }[]
  
  // Loading state for classes
  loadingTaughtClasses: boolean
}`}
        </Box>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 3 }}>
          Usage Example:
        </Typography>
        
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`import { TeacherRewardForm } from "expanse.ui/game"

<TeacherRewardForm
  taughtClasses={[
    { elId: "class-1", name: "Math 101" },
    { elId: "class-2", name: "Science 201" },
  ]}
  loadingTaughtClasses={false}
  onSuccess={() => console.log("Reward created!")}
/>`}
        </Box>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 3 }}>
          Form Fields:
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" paragraph>
            <strong>Name:</strong> The display name of the reward (required)
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Description:</strong> Optional description of what the reward is
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Cost:</strong> Point cost from predefined options (required)
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Classes:</strong> Select which classes can see/claim this reward (required)
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Limit Purchase:</strong> Optional checkbox to enable max purchase quantity
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Max Quantity:</strong> If limited, the maximum number students can purchase
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: "warning.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Requirements
        </Typography>
        <Typography variant="body2">
          This component requires:
        </Typography>
        <ul>
          <li>Apollo Client configured for GraphQL mutations</li>
          <li>LayoutContext providing showSnackbarSuccess and showSnackbarError</li>
          <li>Authentication context for teacher identification</li>
        </ul>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof TeacherRewardFormDocumentation> = {
  title: "Game/Components/Forms/TeacherRewardForm",
  component: TeacherRewardFormDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Form component for teachers to create and configure class rewards.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TeacherRewardFormDocumentation>

export const Documentation: Story = {}
