import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Grid, Card, Typography } from "@mui/material"

// Styled card data
const overviewData = [
  {
    title: "Documentation Purpose",
    content:
      "Improve training, operations, and culture so teams move with confidence, perform consistently, and feel supported.",
  },
  {
    title: "Example Company Purpose",
    content:
      '"Ensure safe, fair, and timely support for every customer and partner."',
    isItalic: true,
  },
  {
    title: "Expected Outcomes",
    content:
      "Improved performance, reduced errors, and increased profit through better-trained teams, streamlined operations, and a culture of continuous improvement.",
  },
]

interface OverviewCardProps {
  title: string
  content: string
  isItalic?: boolean
}

function OverviewCard({ title, content, isItalic = false }: OverviewCardProps) {
  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        bgcolor: "#4285f4",
        color: "white",
        boxShadow: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          lineHeight: 1.7,
          fontStyle: isItalic ? "italic" : "normal",
        }}
      >
        {content}
      </Typography>
    </Card>
  )
}

function OverviewCards() {
  return (
    <Grid container spacing={2}>
      {overviewData.map((item, index) => (
        <Grid item xs={12} md={4} key={item.title}>
          <OverviewCard
            title={item.title}
            content={item.content}
            isItalic={item.isItalic}
          />
        </Grid>
      ))}
    </Grid>
  )
}

const meta: Meta<typeof OverviewCards> = {
  title: "QuickWinsGuide/OverviewCards",
  component: OverviewCards,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A grid of overview cards displaying the key purposes and outcomes of the Quick Wins Guide. Features hover lift animation and a blue theme.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof OverviewCards>

export const Default: Story = {}

export const SingleCard: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <OverviewCard
          title="Custom Card Title"
          content="This is a single overview card that can be customized with any title and content."
        />
      </Grid>
    </Grid>
  ),
}

export const ItalicCard: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <OverviewCard
          title="Quote Card"
          content='"This is an example of italicized content for quotes or emphasized text."'
          isItalic={true}
        />
      </Grid>
    </Grid>
  ),
}
