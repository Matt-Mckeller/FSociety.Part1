import React, { useRef, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material"
import { AngelWingsHalo, RocketLaunch, ChestOpening1Animation } from "./index"

// Themed Lotties (using createLottieComponent)
import { Homework } from "./Homework/Homework"
import { SwingingShoppingBag } from "./SwingingShoppingBag/SwingingShoppingBag"

// Simple Lotties (direct lottie-web usage)
import { SprintVelocityAnimation } from "./SprintVelocity/SprintVelocityAnimation"
import { GlobalThumbsUpBoy } from "./GlobalThumbsUp/GlobalThumbsUpBoy"
import { DesignCollaborationAnimation } from "./DesignCollaboration/DesignCollaborationAnimation"
import { ModernTechnologyAnimation } from "./ModernTechnology/ModernTechnologyAnimation"
import { Crown } from "./Crown/Crown"

/**
 * Lottie Animation Gallery
 *
 * This gallery showcases the themed Lottie animations available in the project.
 * These animations support dynamic theming and can be customized with different
 * color themes and variants.
 *
 * ## Animation Architecture
 * - Animations are loaded from JSON files and rendered using lottie-web
 * - Theme support via the `theme` prop (e.g., "purple-light", "blue-dark")
 * - Variant support via the `variant` prop for different color schemes
 *
 * ## Adding New Animations
 * See the lottie architecture docs for instructions on adding new themed animations.
 */
const meta: Meta = {
  title: "DynamicAssets/Lotties",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta

// ============================================================================
// Individual Animation Stories
// ============================================================================

export const AngelWingsHaloStory: StoryObj = {
  name: "AngelWingsHalo",
  render: () => {
    const [theme, setTheme] = useState<string>("purple-light")
    return (
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Angel Wings Halo Animation
        </Typography>
        <FormControl size="small" sx={{ mb: 2, minWidth: 150 }}>
          <InputLabel>Theme</InputLabel>
          <Select
            value={theme}
            label="Theme"
            onChange={(e) => setTheme(e.target.value)}
          >
            <MenuItem value="purple-light">Purple Light</MenuItem>
            <MenuItem value="purple-dark">Purple Dark</MenuItem>
            <MenuItem value="blue-light">Blue Light</MenuItem>
            <MenuItem value="blue-dark">Blue Dark</MenuItem>
            <MenuItem value="green-light">Green Light</MenuItem>
            <MenuItem value="orange-light">Orange Light</MenuItem>
            <MenuItem value="teal-light">Teal Light</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ width: 300, height: 300 }}>
          <AngelWingsHalo width="100%" theme={theme} />
        </Box>
      </Box>
    )
  },
}

export const RocketLaunchStory: StoryObj = {
  name: "RocketLaunch",
  render: () => {
    const [theme, setTheme] = useState<string>("purple-light")
    const [variant, setVariant] = useState<string>("default")
    return (
      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h6" mb={2}>
          Rocket Launch Animation
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={theme}
              label="Theme"
              onChange={(e) => setTheme(e.target.value)}
            >
              <MenuItem value="purple-light">Purple Light</MenuItem>
              <MenuItem value="purple-dark">Purple Dark</MenuItem>
              <MenuItem value="blue-light">Blue Light</MenuItem>
              <MenuItem value="blue-dark">Blue Dark</MenuItem>
              <MenuItem value="green-light">Green Light</MenuItem>
              <MenuItem value="orange-light">Orange Light</MenuItem>
              <MenuItem value="red-light">Red Light</MenuItem>
              <MenuItem value="teal-light">Teal Light</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Variant</InputLabel>
            <Select
              value={variant}
              label="Variant"
              onChange={(e) => setVariant(e.target.value)}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="ImprovedMonochromeColoring">
                Improved Monochrome
              </MenuItem>
              <MenuItem value="ImprovedDualToneColor">
                Improved Dual Tone
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 400, height: 400 }}>
          <RocketLaunch width="100%" theme={theme} variant={variant} />
        </Box>
      </Box>
    )
  },
}

export const ChestOpeningStory: StoryObj = {
  name: "ChestOpening1",
  render: () => {
    const animationRef = useRef<any>(null)

    const handlePlay = () => {
      if (animationRef.current?.playAnimation) {
        animationRef.current.playAnimation()
      }
    }

    return (
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="h6" mb={2}>
          Chest Opening Animation
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Click the button to play the chest opening animation.
        </Typography>
        <Button variant="contained" onClick={handlePlay} sx={{ mb: 2 }}>
          Play Animation
        </Button>
        <Box sx={{ width: 300, height: 300 }}>
          <ChestOpening1Animation ref={animationRef} width="100%" />
        </Box>
      </Box>
    )
  },
}

// ============================================================================
// Theme Comparison
// ============================================================================

export const ThemeComparison: StoryObj = {
  name: "Theme Comparison",
  render: () => {
    const themes = [
      "purple-light",
      "purple-dark",
      "blue-light",
      "blue-dark",
      "green-light",
      "orange-light",
    ]

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" mb={3}>
          Theme Comparison - RocketLaunch
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 3,
          }}
        >
          {themes.map((theme) => (
            <Paper key={theme} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="subtitle2" mb={1}>
                {theme}
              </Typography>
              <Box sx={{ height: 200 }}>
                <RocketLaunch width="100%" theme={theme} />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    )
  },
}

// ============================================================================
// Gallery
// ============================================================================

export const AllAnimations: StoryObj = {
  name: "Gallery - All Animations",
  render: () => {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" mb={3}>
          Lottie Animations Gallery
        </Typography>

        <Typography variant="body1" paragraph color="text.secondary">
          These are the main themed Lottie animations exported from the project.
          Each animation supports theming via the theme prop.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 4,
          }}
        >
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              AngelWingsHalo
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Decorative angel wings with halo animation. Supports multiple
              theme colors.
            </Typography>
            <Box
              sx={{ height: 200, display: "flex", justifyContent: "center" }}
            >
              <AngelWingsHalo width={200} theme="purple-light" />
            </Box>
          </Paper>

          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              RocketLaunch
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Character with launching rocket and particle effects. Multiple
              variants available.
            </Typography>
            <Box
              sx={{ height: 200, display: "flex", justifyContent: "center" }}
            >
              <RocketLaunch width={200} theme="blue-light" />
            </Box>
          </Paper>

          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              ChestOpening1
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Treasure chest opening animation. Used for loot box reveals.
            </Typography>
            <Box
              sx={{ height: 200, display: "flex", justifyContent: "center" }}
            >
              <ChestOpening1Animation width={200} staticZoom />
            </Box>
          </Paper>
        </Box>

        <Paper sx={{ p: 3, mt: 4, bgcolor: "info.light" }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Note: Additional Animations
          </Typography>
          <Typography variant="body2">
            The project contains 60+ additional Lottie animations in the lotties
            directory. Many are imported directly from their JSON files without
            theming support. To add theming to an animation, follow the lottie
            architecture pattern with .expanse-lottie.ts schema files.
          </Typography>
        </Paper>
      </Box>
    )
  },
}

// ============================================================================
// Additional Themed Lotties
// ============================================================================

export const HomeworkStory: StoryObj = {
  name: "Homework (Themed)",
  render: () => {
    const [theme, setTheme] = useState<string>("purple-light")
    const [variant, setVariant] = useState<string>("default")
    return (
      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h6" mb={2}>
          Homework Animation
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          A book with pencil and sparkle effects. Supports full theming.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={theme}
              label="Theme"
              onChange={(e) => setTheme(e.target.value)}
            >
              <MenuItem value="purple-light">Purple Light</MenuItem>
              <MenuItem value="purple-dark">Purple Dark</MenuItem>
              <MenuItem value="blue-light">Blue Light</MenuItem>
              <MenuItem value="blue-dark">Blue Dark</MenuItem>
              <MenuItem value="green-light">Green Light</MenuItem>
              <MenuItem value="orange-light">Orange Light</MenuItem>
              <MenuItem value="teal-light">Teal Light</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Variant</InputLabel>
            <Select
              value={variant}
              label="Variant"
              onChange={(e) => setVariant(e.target.value)}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="minimal">Minimal</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 350, height: 350 }}>
          <Homework width="100%" theme={theme} variant={variant} />
        </Box>
      </Box>
    )
  },
}

export const SwingingShoppingBagStory: StoryObj = {
  name: "SwingingShoppingBag (Themed)",
  render: () => {
    const [theme, setTheme] = useState<string>("purple-light")
    return (
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Swinging Shopping Bag Animation
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          A swinging shopping bag animation. Supports theming.
        </Typography>
        <FormControl size="small" sx={{ mb: 2, minWidth: 150 }}>
          <InputLabel>Theme</InputLabel>
          <Select
            value={theme}
            label="Theme"
            onChange={(e) => setTheme(e.target.value)}
          >
            <MenuItem value="purple-light">Purple Light</MenuItem>
            <MenuItem value="purple-dark">Purple Dark</MenuItem>
            <MenuItem value="blue-light">Blue Light</MenuItem>
            <MenuItem value="blue-dark">Blue Dark</MenuItem>
            <MenuItem value="green-light">Green Light</MenuItem>
            <MenuItem value="orange-light">Orange Light</MenuItem>
            <MenuItem value="teal-light">Teal Light</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ width: 300, height: 300 }}>
          <SwingingShoppingBag width="100%" theme={theme} />
        </Box>
      </Box>
    )
  },
}

// ============================================================================
// Simple Lotties (Non-themed)
// ============================================================================

export const SprintVelocityStory: StoryObj = {
  name: "SprintVelocity",
  render: () => (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h6" mb={2}>
        Sprint Velocity Animation
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        A sprint velocity chart animation. Automatically adapts to light/dark
        mode.
      </Typography>
      <Box sx={{ width: 400, height: 300 }}>
        <SprintVelocityAnimation width="100%" height="100%" />
      </Box>
    </Box>
  ),
}

export const GlobalThumbsUpStory: StoryObj = {
  name: "GlobalThumbsUp",
  render: () => (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h6" mb={2}>
        Global Thumbs Up Animation
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        A character giving a thumbs up. Adapts to theme context (blue, red,
        purple).
      </Typography>
      <Box sx={{ width: 300, height: 300 }}>
        <GlobalThumbsUpBoy width="100%" />
      </Box>
    </Box>
  ),
}

export const DesignCollaborationStory: StoryObj = {
  name: "DesignCollaboration",
  render: () => (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h6" mb={2}>
        Design Collaboration Animation
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        A design collaboration scene. Has light and dark mode variants.
      </Typography>
      <Box sx={{ width: 500, height: 350 }}>
        <DesignCollaborationAnimation width="100%" />
      </Box>
    </Box>
  ),
}

export const ModernTechnologyStory: StoryObj = {
  name: "ModernTechnology",
  render: () => (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h6" mb={2}>
        Modern Technology Animation
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        A technology/computer scene animation.
      </Typography>
      <Box sx={{ width: 400, height: 300 }}>
        <ModernTechnologyAnimation width="100%" />
      </Box>
    </Box>
  ),
}

export const CrownStory: StoryObj = {
  name: "Crown",
  render: () => (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" mb={2}>
        Crown Animation
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        A golden crown animation. Used for achievements and rewards.
      </Typography>
      <Box sx={{ width: 200, height: 200 }}>
        <Crown width="100%" />
      </Box>
    </Box>
  ),
}

// ============================================================================
// Extended Gallery
// ============================================================================

export const ThemedAnimationsGallery: StoryObj = {
  name: "Gallery - Themed Animations",
  render: () => {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" mb={1}>
          Themed Lottie Animations
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          These animations use the createLottieComponent factory and support
          dynamic theming via the theme prop.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 3,
          }}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              AngelWingsHalo
            </Typography>
            <Box
              sx={{ height: 180, display: "flex", justifyContent: "center" }}
            >
              <AngelWingsHalo width={180} theme="purple-light" />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              RocketLaunch
            </Typography>
            <Box
              sx={{ height: 180, display: "flex", justifyContent: "center" }}
            >
              <RocketLaunch width={180} theme="blue-light" />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              ChestOpening1
            </Typography>
            <Box
              sx={{ height: 180, display: "flex", justifyContent: "center" }}
            >
              <ChestOpening1Animation width={180} staticZoom />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Homework
            </Typography>
            <Box
              sx={{ height: 180, display: "flex", justifyContent: "center" }}
            >
              <Homework width={180} theme="green-light" />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              SwingingShoppingBag
            </Typography>
            <Box
              sx={{ height: 180, display: "flex", justifyContent: "center" }}
            >
              <SwingingShoppingBag width={180} theme="orange-light" />
            </Box>
          </Paper>
        </Box>
      </Box>
    )
  },
}

export const SimpleAnimationsGallery: StoryObj = {
  name: "Gallery - Simple Animations",
  render: () => {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" mb={1}>
          Simple Lottie Animations
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          These animations use lottie-web directly and may have light/dark mode
          support or theme context awareness.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 3,
          }}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              SprintVelocity
            </Typography>
            <Box sx={{ height: 200 }}>
              <SprintVelocityAnimation width="100%" height="100%" />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              GlobalThumbsUp
            </Typography>
            <Box
              sx={{ height: 200, display: "flex", justifyContent: "center" }}
            >
              <GlobalThumbsUpBoy width={180} />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              DesignCollaboration
            </Typography>
            <Box sx={{ height: 200 }}>
              <DesignCollaborationAnimation width="100%" />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              ModernTechnology
            </Typography>
            <Box sx={{ height: 200 }}>
              <ModernTechnologyAnimation width="100%" />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Crown
            </Typography>
            <Box
              sx={{ height: 200, display: "flex", justifyContent: "center" }}
            >
              <Crown width={150} />
            </Box>
          </Paper>
        </Box>
      </Box>
    )
  },
}
