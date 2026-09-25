"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material"
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material"
import { ContentRequirement } from "@/types"

interface RequirementsFulfilledProps {
  allRequirements: ContentRequirement[]
  addressedIds: string[]
}

export function RequirementsFulfilled({
  allRequirements,
  addressedIds,
}: RequirementsFulfilledProps) {
  const fulfilled = allRequirements.filter((r) => addressedIds.includes(r.id))
  const notFulfilled = allRequirements.filter(
    (r) => !addressedIds.includes(r.id),
  )

  return (
    <Card sx={{ mb: 2, boxShadow: "none", border: 1, borderColor: "divider" }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: 1.2, fontWeight: 600 }}
          >
            Requirements
          </Typography>
          <Chip
            label={`${fulfilled.length}/${allRequirements.length}`}
            size="small"
            sx={{
              bgcolor:
                fulfilled.length === allRequirements.length
                  ? "primary.main"
                  : "primary.light",
              color: "white",
            }}
          />
        </Box>

        <List dense>
          {fulfilled.map((req) => (
            <ListItem key={req.id} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircle sx={{ color: "primary.main" }} fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={req.requirement}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.primary",
                }}
              />
              <Chip
                label={req.priority}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.6rem",
                  bgcolor:
                    req.priority === "high" ? "primary.dark" : "primary.light",
                  color: "white",
                }}
              />
            </ListItem>
          ))}
          {notFulfilled.map((req) => (
            <ListItem key={req.id} sx={{ py: 0.5, opacity: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <RadioButtonUnchecked
                  sx={{ color: "primary.light" }}
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText
                primary={req.requirement}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
              <Chip
                label={req.priority}
                size="small"
                variant="outlined"
                sx={{
                  height: 18,
                  fontSize: "0.6rem",
                  borderColor: "primary.light",
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
