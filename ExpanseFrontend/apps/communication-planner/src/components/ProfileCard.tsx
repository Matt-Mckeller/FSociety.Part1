"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material"
import { CheckCircle, Help, Warning } from "@mui/icons-material"
import { ProfileField } from "@/types"

interface ProfileCardProps {
  name: string
  basicInfo: ProfileField[]
  professional: ProfileField[]
}

const confidenceIcon = (confidence: string) => {
  switch (confidence) {
    case "high":
      return <CheckCircle fontSize="small" sx={{ color: "primary.main" }} />
    case "medium":
      return <Help fontSize="small" sx={{ color: "primary.light" }} />
    case "low":
      return <Warning fontSize="small" sx={{ color: "grey.400" }} />
    default:
      return <Help fontSize="small" sx={{ color: "grey.300" }} />
  }
}

export function ProfileCard({
  name,
  basicInfo,
  professional,
}: ProfileCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "primary.main",
              fontSize: "1.5rem",
              mr: 2,
            }}
          >
            {name[0]}
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{ color: "text.primary" }}
            >
              {name}
            </Typography>
            <Chip
              label={basicInfo.find((i) => i.field === "Age")?.value || ""}
              size="small"
              sx={{ mr: 1, bgcolor: "primary.main", color: "white" }}
            />
            <Chip
              label={basicInfo.find((i) => i.field === "Location")?.value || ""}
              size="small"
              variant="outlined"
              sx={{ borderColor: "primary.main", color: "primary.main" }}
            />
          </Box>
        </Box>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mt: 2, mb: 1 }}
        >
          Basic Info
        </Typography>
        <Table size="small">
          <TableBody>
            {basicInfo.map((item) => (
              <TableRow key={item.field}>
                <TableCell
                  sx={{ border: 0, py: 0.5, pl: 0, color: "text.secondary" }}
                >
                  {item.field}
                </TableCell>
                <TableCell sx={{ border: 0, py: 0.5 }}>{item.value}</TableCell>
                <TableCell sx={{ border: 0, py: 0.5, pr: 0, width: 30 }}>
                  {confidenceIcon(item.confidence)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mt: 2, mb: 1 }}
        >
          Professional
        </Typography>
        <Table size="small">
          <TableBody>
            {professional.map((item) => (
              <TableRow key={item.field}>
                <TableCell
                  sx={{ border: 0, py: 0.5, pl: 0, color: "text.secondary" }}
                >
                  {item.field}
                </TableCell>
                <TableCell sx={{ border: 0, py: 0.5 }}>{item.value}</TableCell>
                <TableCell sx={{ border: 0, py: 0.5, pr: 0, width: 30 }}>
                  {confidenceIcon(item.confidence)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
