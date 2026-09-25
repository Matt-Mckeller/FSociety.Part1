"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import { Person, Favorite, Warning } from "@mui/icons-material"
import { RecipientProfile, CommunicationStrategy } from "@/types"

interface RecipientContextSidebarProps {
  profile: RecipientProfile
  strategy: CommunicationStrategy
}

export function RecipientContextSidebar({
  profile,
  strategy,
}: RecipientContextSidebarProps) {
  const highEngagementInterests = profile.interests
    .filter((i) => i.engagementLevel === "high")
    .flatMap((i) => i.items)
    .slice(0, 6)

  return (
    <Card sx={{ position: "sticky", top: 16 }}>
      <CardContent>
        {/* Mini Profile */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 1.5 }}>
            {profile.name[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {profile.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {profile.basicInfo.find((i) => i.field === "Age")?.value} •{" "}
              {profile.professional.find((i) => i.field === "Previous")?.value}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Engagement Hooks */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Favorite fontSize="small" sx={{ mr: 0.5 }} color="error" />
            <Typography variant="subtitle2">Engagement Hooks</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {highEngagementInterests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                size="small"
                color="error"
                variant="outlined"
                sx={{ fontSize: "0.7rem" }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Communication Preferences */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Person fontSize="small" sx={{ mr: 0.5 }} color="primary" />
            <Typography variant="subtitle2">Comm Preferences</Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 0.5 }}
          >
            ✓ Responds to:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
            {profile.psychological.communicationPreferences.respondsWellTo.map(
              (pref) => (
                <Chip
                  key={pref}
                  label={pref}
                  size="small"
                  color="success"
                  sx={{ fontSize: "0.65rem", height: 20 }}
                />
              ),
            )}
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 0.5 }}
          >
            ✗ Struggles with:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {profile.psychological.communicationPreferences.strugglesWith.map(
              (pref) => (
                <Chip
                  key={pref}
                  label={pref}
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{ fontSize: "0.65rem", height: 20 }}
                />
              ),
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Guards */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Warning fontSize="small" sx={{ mr: 0.5 }} color="warning" />
            <Typography variant="subtitle2">Guards</Typography>
          </Box>
          <List dense sx={{ py: 0 }}>
            {strategy.guards.map((guard) => (
              <ListItem key={guard} sx={{ py: 0, px: 0 }}>
                <ListItemText
                  primary={guard}
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  )
}
