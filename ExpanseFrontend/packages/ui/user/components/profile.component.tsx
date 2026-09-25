"use client"
import React, { useContext } from "react"
import { Box, useTheme } from "@mui/system"
import { Divider, Typography } from "@mui/material"
import { LogoutButton } from "expanse.ui/auth"
import { UserContext } from "expanse.ui/user"
import { SectionSpacer } from "expanse.ui/theme"

export function UserProfile() {
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const previousLogInDisplay =
    user && user.lastLogIn ? new Date(user?.lastLogIn).toLocaleString() : "~"
  const accountCreatedDisplay =
    user && user.createdAt ? new Date(user?.createdAt).toLocaleString() : "~"
  const ellipsisOverflow = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  }
  return (
    <Box mt={8} mb={8} flexGrow={1}>
      <Typography variant="h3" mb={3}>
        Account Information
      </Typography>
      <Box
        p={4}
        sx={{
          borderRadius: "7px",
          boxShadow: 1,
          backgroundImage:
            theme.palette.mode === "dark"
              ? "linear-gradient(rgba(255,255,255, 0.05), rgba(255,255,255, 0.05))"
              : null,
        }}
      >
        <Typography variant="h4">Name</Typography>
        <Typography variant="body1" sx={{ ...ellipsisOverflow }}>
          {user?.fullName || "~"}
        </Typography>

        <SectionSpacer size="xs" />
        <Divider />
        <SectionSpacer size="xs" />
        <Typography variant="h4">Email</Typography>
        <Typography variant="body1" sx={{ ...ellipsisOverflow }}>
          {user?.email || "~"}
        </Typography>

        <SectionSpacer size="xs" />
        <Divider />
        <SectionSpacer size="xs" />
        <Typography variant="h4">Previous Sign In</Typography>
        <Typography variant="body1" mb={1}>
          {previousLogInDisplay}
        </Typography>
        <Typography variant="h4">Account Created</Typography>
        <Typography variant="body1">{accountCreatedDisplay}</Typography>
        <SectionSpacer size="xs" />
        <LogoutButton variant="text" />
      </Box>
      {/* <Typography variant="body1"><pre>{JSON.stringify(user || {}, null, 2)}</pre></Typography> */}
    </Box>
  )
}
