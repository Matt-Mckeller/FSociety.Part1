"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import {
  Psychology,
  CheckCircleOutline,
  RadioButtonUnchecked,
  Shield,
} from "@mui/icons-material"
import { CommunicationStrategy } from "@/types"

interface StrategyCardProps {
  strategy: CommunicationStrategy
}

export function StrategyCard({ strategy }: StrategyCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Psychology sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Communication Strategy
          </Typography>
        </Box>

        {/* Psychological Approach */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          Psychological Approach
        </Typography>
        <Stepper
          orientation="vertical"
          sx={{
            mb: 3,
            "& .MuiStepIcon-root": { color: "primary.light" },
            "& .MuiStepIcon-root.Mui-active": { color: "primary.main" },
            "& .MuiStepConnector-line": { borderColor: "primary.light" },
          }}
        >
          {strategy.psychologicalApproach.map((step) => (
            <Step key={step.step} active expanded>
              <StepLabel>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ color: "text.primary" }}
                >
                  {step.title}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ my: 2 }} />

        {/* Content Requirements */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Content Requirements
        </Typography>
        <List dense>
          {strategy.contentRequirements.map((req) => (
            <ListItem key={req.id} sx={{ py: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                {req.completed ? (
                  <CheckCircleOutline
                    sx={{ color: "primary.main" }}
                    fontSize="small"
                  />
                ) : (
                  <RadioButtonUnchecked
                    sx={{ color: "grey.400" }}
                    fontSize="small"
                  />
                )}
              </ListItemIcon>
              <ListItemText primary={req.requirement} />
              <Chip
                label={req.priority}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.65rem",
                  bgcolor:
                    req.priority === "high"
                      ? "primary.main"
                      : req.priority === "medium"
                        ? "primary.light"
                        : "grey.300",
                  color:
                    req.priority === "high" || req.priority === "medium"
                      ? "white"
                      : "text.primary",
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Guards */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Shield fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="subtitle2" color="text.secondary">
            Guards & Boundaries
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {strategy.guards.map((guard) => (
            <Chip
              key={guard}
              label={guard}
              size="small"
              variant="outlined"
              sx={{ borderColor: "primary.main", color: "primary.main" }}
            />
          ))}
        </Box>

        {/* Pipelines */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mt: 2, mb: 1 }}
        >
          Pipelines
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {strategy.pipelines.map((pipeline) => (
            <Chip
              key={pipeline}
              label={pipeline}
              size="small"
              variant="outlined"
              sx={{ borderColor: "primary.light", color: "primary.main" }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
