import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, Typography, Button, Grid } from "@mui/material"
import { useTheme } from "@mui/material/styles"

// Note: These components use browser-specific APIs (canvas, html2canvas)
// and Next.js image assets. We create representative mock stories.

// Mock LinkedIn Banner component
const MockLinkedInBanner = () => {
  const theme = useTheme()
  const containerWidth = 792 // Scaled down from 1584
  const containerHeight = 198 // Scaled down from 396
  const contentAreaMargin = containerHeight / 10
  const graphicHeight = 60

  return (
    <Box>
      <Box
        sx={{
          width: containerWidth,
          height: containerHeight,
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          sx={{
            border: "2px solid black",
            borderRadius: "5px",
            m: `${contentAreaMargin}px`,
            height: containerHeight - contentAreaMargin * 2,
            width: containerWidth - contentAreaMargin * 2,
          }}
        >
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            py={1}
          >
            <Typography
              variant="h5"
              textAlign="center"
              fontSize="1.25rem"
              mt={1}
            >
              Matthew Mckeller
            </Typography>
            <Box display="flex" gap={2} my={1}>
              <Box
                sx={{
                  height: graphicHeight,
                  width: 60,
                  bgcolor: "primary.light",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" textAlign="center">
                  Web Apps
                </Typography>
              </Box>
              <Box
                sx={{
                  height: graphicHeight,
                  width: 60,
                  bgcolor: "secondary.light",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" textAlign="center">
                  APIs
                </Typography>
              </Box>
              <Box
                sx={{
                  height: graphicHeight,
                  width: 60,
                  bgcolor: "info.light",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" textAlign="center">
                  Web Dev
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" fontSize="0.75rem">
              React, GraphQL, Restful APIs, TypeScript
            </Typography>
            <Typography variant="body2" fontSize="0.75rem">
              www.expanseservices.com
            </Typography>
          </Box>
          <Box
            sx={{
              width: 60,
              bgcolor: "grey.200",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              borderLeft: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="caption" sx={{ mb: 1 }}>
              Profile
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button variant="contained" size="small" sx={{ mt: 1 }} disabled>
        Download Screenshot
      </Button>
    </Box>
  )
}

// Mock Canvas Filter component
const MockCanvasFilter = () => {
  const theme = useTheme()

  return (
    <Box>
      <Box
        sx={{
          width: 300,
          height: 300,
          border: "1px solid black",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Base image simulation */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "grey.400",
            filter: "grayscale(0.75)",
          }}
        />
        {/* Color overlay simulation */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            bgcolor: theme.palette.primary.main,
            opacity: 0.15,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" color="white" fontWeight="bold">
            Profile Image + Filter
          </Typography>
        </Box>
      </Box>
      <Button variant="outlined" size="small" sx={{ mt: 1 }} disabled>
        Apply Filters and Save
      </Button>
    </Box>
  )
}

// Mock Screenshot Wrapper component
const MockScreenshotWrapper = ({
  width = 400,
  height = 300,
  showBorder = true,
  children,
}: {
  width?: number
  height?: number
  showBorder?: boolean
  children?: React.ReactNode
}) => {
  return (
    <Box>
      <Box
        sx={{
          width: width + (showBorder ? 2 : 0),
          height: height + (showBorder ? 2 : 0),
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: width + (showBorder ? 2 : 0),
            height: height + (showBorder ? 2 : 0),
            border: showBorder ? "1px solid black" : undefined,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
          }}
        >
          {children || (
            <>
              <Typography variant="h6">Screenshot Content Area</Typography>
              <Typography variant="body2" color="text.secondary">
                {width} x {height}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Button variant="contained" size="small" sx={{ mt: 1 }} disabled>
        Download Screenshot
      </Button>
    </Box>
  )
}

const meta: Meta = {
  title: "PersonalNext/Marketing/Images",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Marketing image generation components.

These utility components help create marketing materials:
- **LinkedInBanner**: Banner image generator (1584x396)
- **CanvasFilter**: Image filter utility with grayscale and color overlay
- **ScreenshotWrapper**: Reusable wrapper for capturing component screenshots

Note: Real components use html2canvas and canvas APIs that don't work in Storybook.
These stories show representative layouts.
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj

/** LinkedIn Banner - Profile header banner format */
export const LinkedInBanner: Story = {
  render: () => <MockLinkedInBanner />,
  parameters: {
    docs: {
      description: {
        story:
          "LinkedIn banner generator at 1584x396 (scaled down for display). Shows profile info, service graphics, and contact details.",
      },
    },
  },
}

/** Canvas Filter - Image processing utility */
export const CanvasFilter: Story = {
  render: () => <MockCanvasFilter />,
  parameters: {
    docs: {
      description: {
        story:
          "Canvas-based image filter that applies grayscale and a semi-transparent primary color overlay to profile images.",
      },
    },
  },
}

/** Screenshot Wrapper - Basic usage */
export const ScreenshotWrapperBasic: Story = {
  render: () => <MockScreenshotWrapper width={400} height={300} showBorder />,
  parameters: {
    docs: {
      description: {
        story:
          "ScreenshotWrapper provides a container that can be captured as an image using html2canvas.",
      },
    },
  },
}

/** Screenshot Wrapper - Without border */
export const ScreenshotWrapperNoBorder: Story = {
  render: () => (
    <MockScreenshotWrapper width={400} height={300} showBorder={false} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Screenshot wrapper without visible border for clean exports.",
      },
    },
  },
}

/** Screenshot Wrapper - With custom content */
export const ScreenshotWrapperWithContent: Story = {
  render: () => (
    <MockScreenshotWrapper width={500} height={400} showBorder>
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Custom Marketing Content
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Any React content can be placed inside the screenshot wrapper for
          export as an image.
        </Typography>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: "primary.main",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: "secondary.main",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: "success.main",
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
    </MockScreenshotWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Screenshot wrapper with custom content demonstrating flexibility for various marketing materials.",
      },
    },
  },
}

/** Square format for social media */
export const SquareFormat: Story = {
  render: () => (
    <MockScreenshotWrapper width={500} height={500} showBorder>
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Social Media Post
        </Typography>
        <Typography variant="body1" color="text.secondary">
          1000x1000 format for Instagram, LinkedIn, etc.
        </Typography>
      </Box>
    </MockScreenshotWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Square format (1:1 aspect ratio) commonly used for social media posts.",
      },
    },
  },
}
