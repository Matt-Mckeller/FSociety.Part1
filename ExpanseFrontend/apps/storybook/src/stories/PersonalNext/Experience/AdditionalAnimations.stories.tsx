import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Grid } from "@mui/material"
import { GlobeNavigationAnimation } from "../../../../../../apps/personalNext/src/modules/content/experience/components/GlobeNavigationAnimation.component"
import { LegoBuildingBlocksAnimation } from "../../../../../../apps/personalNext/src/modules/content/experience/components/LegoBuildingBlockAnimation"
import { ProductManagementAnimation } from "../../../../../../apps/personalNext/src/modules/content/experience/components/ProductManagement.component"

/**
 * Additional Lottie animations used in the Experience section of personalNext.
 * These animations visualize different aspects of development experience.
 */
const meta: Meta = {
  title: "PersonalNext/Experience/AdditionalAnimations",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Lottie animations for visualizing product management, global reach, and modular architecture concepts.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

// =============================================================================
// Globe Navigation Animation
// =============================================================================

/**
 * Globe navigation animation showing global connectivity.
 * Used to represent international experience or global reach.
 */
export const GlobeNavigation: StoryObj = {
  render: () => (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Globe Navigation
      </Typography>
      <Box sx={{ width: "300px", height: "300px", margin: "0 auto" }}>
        <GlobeNavigationAnimation maxWidth="300px" height="300px" />
      </Box>
    </Box>
  ),
}

/**
 * Globe animation at different sizes.
 */
export const GlobeNavigationSizes: StoryObj = {
  render: () => (
    <Grid container spacing={4} justifyContent="center" alignItems="flex-end">
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Small (150px)
        </Typography>
        <Box sx={{ width: "150px", height: "150px" }}>
          <GlobeNavigationAnimation maxWidth="150px" height="150px" />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Medium (250px)
        </Typography>
        <Box sx={{ width: "250px", height: "250px" }}>
          <GlobeNavigationAnimation maxWidth="250px" height="250px" />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Large (350px)
        </Typography>
        <Box sx={{ width: "350px", height: "350px" }}>
          <GlobeNavigationAnimation maxWidth="350px" height="350px" />
        </Box>
      </Grid>
    </Grid>
  ),
}

// =============================================================================
// Lego Building Blocks Animation
// =============================================================================

/**
 * Lego building blocks animation representing modular architecture.
 * Visualizes component-based development and building blocks approach.
 */
export const LegoBuildingBlocks: StoryObj = {
  render: () => (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Lego Building Blocks
      </Typography>
      <Box sx={{ width: "300px", height: "300px", margin: "0 auto" }}>
        <LegoBuildingBlocksAnimation maxWidth="300px" height="300px" />
      </Box>
    </Box>
  ),
}

/**
 * Lego animation at different sizes.
 */
export const LegoBuildingBlocksSizes: StoryObj = {
  render: () => (
    <Grid container spacing={4} justifyContent="center" alignItems="flex-end">
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Small (150px)
        </Typography>
        <Box sx={{ width: "150px", height: "150px" }}>
          <LegoBuildingBlocksAnimation maxWidth="150px" height="150px" />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Medium (250px)
        </Typography>
        <Box sx={{ width: "250px", height: "250px" }}>
          <LegoBuildingBlocksAnimation maxWidth="250px" height="250px" />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Large (350px)
        </Typography>
        <Box sx={{ width: "350px", height: "350px" }}>
          <LegoBuildingBlocksAnimation maxWidth="350px" height="350px" />
        </Box>
      </Grid>
    </Grid>
  ),
}

// =============================================================================
// Product Management Animation
// =============================================================================

/**
 * Product management animation showing PM workflows.
 * Represents product management experience and agile methodologies.
 */
export const ProductManagement: StoryObj = {
  render: () => (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Product Management
      </Typography>
      <Box sx={{ width: "300px", height: "300px", margin: "0 auto" }}>
        <ProductManagementAnimation maxWidth="300px" height="300px" />
      </Box>
    </Box>
  ),
}

/**
 * Product Management animation at different sizes.
 */
export const ProductManagementSizes: StoryObj = {
  render: () => (
    <Grid container spacing={4} justifyContent="center" alignItems="flex-end">
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Small (150px)
        </Typography>
        <Box sx={{ width: "150px", height: "150px" }}>
          <ProductManagementAnimation maxWidth="150px" height="150px" />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Medium (250px)
        </Typography>
        <Box sx={{ width: "250px", height: "250px" }}>
          <ProductManagementAnimation maxWidth="250px" height="250px" />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="caption" display="block" textAlign="center" mb={1}>
          Large (350px)
        </Typography>
        <Box sx={{ width: "350px", height: "350px" }}>
          <ProductManagementAnimation maxWidth="350px" height="350px" />
        </Box>
      </Grid>
    </Grid>
  ),
}

// =============================================================================
// All Animations Together
// =============================================================================

/**
 * All three animations displayed side by side for comparison.
 */
export const AllAnimations: StoryObj = {
  render: () => (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} md={4}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Globe Navigation
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Global connectivity and reach
          </Typography>
          <Box sx={{ width: "200px", height: "200px", margin: "0 auto" }}>
            <GlobeNavigationAnimation maxWidth="200px" height="200px" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Building Blocks
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Modular architecture
          </Typography>
          <Box sx={{ width: "200px", height: "200px", margin: "0 auto" }}>
            <LegoBuildingBlocksAnimation maxWidth="200px" height="200px" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Product Management
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Agile workflows
          </Typography>
          <Box sx={{ width: "200px", height: "200px", margin: "0 auto" }}>
            <ProductManagementAnimation maxWidth="200px" height="200px" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  ),
}
