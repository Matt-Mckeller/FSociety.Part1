import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import { TechnicalDetailsSlider } from "../../../../../../apps/personalNext/src/modules/content/process/components/technicalDetailsSlider"
import { JiraSamplesSlider } from "../../../../../../apps/personalNext/src/modules/content/process/components/jiraSamplesSlider"

// Swiper CSS imports - needed for proper slider styling
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"

const meta: Meta = {
  title: "PersonalNext/Process/Sliders",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Image sliders using Swiper.js with fade effects, navigation, and pagination. Used to showcase technical documentation and Jira workflow examples.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

/**
 * TechnicalDetailsSlider displays technical documentation screenshots
 * with GraphQL and documentation samples.
 */
export const TechnicalDetails: StoryObj = {
  render: () => (
    <Box sx={{ width: "500px", height: "400px" }}>
      <Typography variant="h6" gutterBottom>
        Technical Details Slider
      </Typography>
      <TechnicalDetailsSlider />
    </Box>
  ),
}

/**
 * JiraSamplesSlider shows Jira workflow examples including
 * sprint boards and product backlog views.
 */
export const JiraSamples: StoryObj = {
  render: () => (
    <Box sx={{ width: "600px", height: "500px" }}>
      <Typography variant="h6" gutterBottom>
        Jira Samples Slider
      </Typography>
      <JiraSamplesSlider />
    </Box>
  ),
}

/**
 * Side by side comparison of both sliders.
 */
export const BothSliders: StoryObj = {
  render: () => (
    <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      <Box sx={{ width: "450px", height: "400px" }}>
        <Typography variant="h6" gutterBottom>
          Technical Details
        </Typography>
        <TechnicalDetailsSlider />
      </Box>
      <Box sx={{ width: "450px", height: "400px" }}>
        <Typography variant="h6" gutterBottom>
          Jira Samples
        </Typography>
        <JiraSamplesSlider />
      </Box>
    </Box>
  ),
}
