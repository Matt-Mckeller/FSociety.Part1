"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import { People, History } from "@mui/icons-material"
import { RelationshipContext } from "@/types"

interface RelationshipCardProps {
  context: RelationshipContext
}

export function RelationshipCard({ context }: RelationshipCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <People sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Relationship Context
          </Typography>
        </Box>

        {/* Interaction History */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <History fontSize="small" sx={{ mr: 1, color: "primary.light" }} />
          <Typography variant="subtitle2" color="text.secondary">
            Interaction History
          </Typography>
        </Box>
        <List dense>
          {context.interactionHistory.map((item, index) => (
            <ListItem key={index} sx={{ py: 0 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.primary",
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Current Dynamic */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Current Dynamic
        </Typography>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  border: 0,
                  py: 0.5,
                  pl: 0,
                  color: "text.secondary",
                  width: 80,
                }}
              >
                Sender
              </TableCell>
              <TableCell sx={{ border: 0, py: 0.5, color: "text.primary" }}>
                {context.currentDynamic.sender}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ border: 0, py: 0.5, pl: 0, color: "text.secondary" }}
              >
                Recipient
              </TableCell>
              <TableCell sx={{ border: 0, py: 0.5, color: "text.primary" }}>
                {context.currentDynamic.recipient}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Divider sx={{ my: 2 }} />

        {/* Potential Outcomes */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Potential Outcomes
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {context.potentialOutcomes.map((outcome) => (
            <Box
              key={outcome.scenario}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Chip
                label={outcome.scenario}
                size="small"
                sx={{
                  minWidth: 80,
                  bgcolor: "primary.main",
                  color: "white",
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {outcome.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
