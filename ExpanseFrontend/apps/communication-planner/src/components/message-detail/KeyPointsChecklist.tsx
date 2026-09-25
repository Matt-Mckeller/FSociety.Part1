"use client"

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { CheckCircle } from "@mui/icons-material"

interface KeyPointsChecklistProps {
  keyPoints: string[]
}

export function KeyPointsChecklist({ keyPoints }: KeyPointsChecklistProps) {
  return (
    <Card sx={{ mb: 3, boxShadow: "none", border: 1, borderColor: "divider" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="overline"
          sx={{ color: "primary.main", letterSpacing: 1.2, fontWeight: 600 }}
        >
          Key points
        </Typography>
        <List dense sx={{ mt: 1 }}>
          {keyPoints.map((point, index) => (
            <ListItem key={index} sx={{ py: 0.75, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircle sx={{ color: "primary.main" }} fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={point}
                primaryTypographyProps={{ color: "text.primary" }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
