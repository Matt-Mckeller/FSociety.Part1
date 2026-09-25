"use client"

import { Grid, Card, Typography } from "@mui/material"

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

export function OverviewCards() {
  return (
    <Grid container spacing={2}>
      {overviewData.map((item, index) => (
        <Grid item zero={12} laptop={4} key={item.title} className={`qw-stagger-${index + 1}`}>
          <Card
            className="qw-hover-lift"
            sx={{
              p: 3,
              height: "100%",
              bgcolor: "#4285f4",
              color: "white",
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.7,
                fontStyle: item.isItalic ? "italic" : "normal",
              }}
            >
              {item.content}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
