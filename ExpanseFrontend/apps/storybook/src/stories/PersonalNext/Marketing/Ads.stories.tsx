import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, Typography, Button } from "@mui/material"

// Note: Ad components use browser-specific APIs (document.querySelector, html2canvas, canvas)
// and Next.js image assets that don't work well in Storybook.
// We create representative mock stories instead.

// Mock Ad Layout for storybook demonstration
const MockAdLayout = ({
  title,
  subtitle,
  dimensions,
  profileImagePlaceholder = true,
  variant = "v1",
}: {
  title: string
  subtitle: string
  dimensions: { width: number; height: number }
  profileImagePlaceholder?: boolean
  variant?: "v1" | "v2"
}) => {
  return (
    <Box
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        border: "3px solid #333",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Border */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          right: 8,
          bottom: 8,
          border: variant === "v2" ? "2px solid #1976d2" : "none",
          borderRadius: "4px",
          pointerEvents: "none",
        }}
      />

      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}
      >
        {subtitle}
      </Typography>

      {/* Mock graphics area */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Box
          sx={{
            width: 80,
            height: 60,
            bgcolor: "primary.light",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption">Web Apps</Typography>
        </Box>
        <Box
          sx={{
            width: 80,
            height: 60,
            bgcolor: "secondary.light",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption">APIs</Typography>
        </Box>
        <Box
          sx={{
            width: 80,
            height: 60,
            bgcolor: "info.light",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption">Mobile</Typography>
        </Box>
      </Box>

      {profileImagePlaceholder && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "grey.400",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption">Photo</Typography>
          </Box>
          <Box>
            <Typography variant="body1" fontWeight="bold">
              Matthew Mckeller
            </Typography>
            <Typography variant="body2" color="text.secondary">
              www.expanseservices.com
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

// Mock ReactAd component
const MockReactAd = ({ svgDataID }: { svgDataID: string }) => {
  return (
    <Box>
      <Box
        sx={{
          width: 600,
          height: 400,
          border: "1px solid #000",
          bgcolor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Canvas Screenshot Area</Typography>
        <Typography variant="body2" color="text.secondary">
          SVG Data ID: {svgDataID}
        </Typography>
        <Typography variant="caption" sx={{ mt: 2, textAlign: "center", px: 2 }}>
          This component captures SVG elements and renders them to a canvas for
          screenshot/download functionality.
        </Typography>
      </Box>
      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button variant="contained" size="small" disabled>
          Take Screenshot
        </Button>
        <Button variant="outlined" size="small" disabled>
          Download Image
        </Button>
      </Box>
    </Box>
  )
}

const meta: Meta = {
  title: "PersonalNext/Marketing/Ads",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Ad layout components for marketing materials.

These components are designed for generating marketing images and screenshots:
- **ReactAd_V1**: SVG to Canvas screenshot utility
- **ReactAd_v2_Google**: Google Ads format (750x750)
- **SquareImageAdLayout_V1/V2**: LinkedIn and social media ads (1000x1000)

Note: Real components use html2canvas and browser APIs that don't work in Storybook.
These stories show representative layouts.
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj

/** ReactAd V1 - SVG to Canvas screenshot utility */
export const ReactAdV1: Story = {
  render: () => <MockReactAd svgDataID="sample-svg" />,
  parameters: {
    docs: {
      description: {
        story:
          "ReactAd V1 captures an SVG element from the DOM and renders it to a canvas for screenshot functionality.",
      },
    },
  },
}

/** Square Image Ad Layout V1 - Standard LinkedIn ad format */
export const SquareAdLayoutV1: Story = {
  render: () => (
    <MockAdLayout
      title="Senior React JS Developer"
      subtitle="Web Applications, APIs, and Integrations"
      dimensions={{ width: 500, height: 500 }}
      variant="v1"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Square image ad layout (1000x1000 scaled down) for LinkedIn and social media marketing.",
      },
    },
  },
}

/** Square Image Ad Layout V2 - With expanding border */
export const SquareAdLayoutV2: Story = {
  render: () => (
    <MockAdLayout
      title="UI Development Services For The Utilities Industry"
      subtitle="Modern Technology, Frontend, Backend, and Data Visualizations"
      dimensions={{ width: 500, height: 500 }}
      variant="v2"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Square image ad layout V2 with expanding border effect for enhanced visual appeal.",
      },
    },
  },
}

/** Google Ads Format - 750x750 square format */
export const GoogleAdsFormat: Story = {
  render: () => (
    <MockAdLayout
      title="Software Development Expert"
      subtitle="Web Applications, APIs, and Integrations"
      dimensions={{ width: 375, height: 375 }}
      variant="v1"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Google Ads format at 750x750 (scaled down for display).",
      },
    },
  },
}

/** Ad without profile image */
export const AdWithoutProfile: Story = {
  render: () => (
    <MockAdLayout
      title="React Development Services"
      subtitle="TypeScript, GraphQL, REST APIs"
      dimensions={{ width: 400, height: 400 }}
      profileImagePlaceholder={false}
      variant="v1"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Ad layout variant without profile image placeholder.",
      },
    },
  },
}

/** Content customization example */
export const CustomContent: Story = {
  render: () => (
    <MockAdLayout
      title="Custom Service Title"
      subtitle="Custom subtitle with specific offering details"
      dimensions={{ width: 450, height: 450 }}
      variant="v2"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how ad content can be customized through props.",
      },
    },
  },
}
