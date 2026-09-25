"use client"
import React from "react"
import { styled, Theme } from "@mui/material/styles"
import { Box } from "@mui/system"
import { Tooltip, Typography } from "@mui/material"
import {
  TICKET_POINT_OPTIONS,
  getPointXPLabel,
} from "expanse.ui/points"
import EngineeringIcon from "@mui/icons-material/Engineering"

const PREFIX = "expanse-pricing-xp-tier-component"

const classes = {
  root: `${PREFIX}-root`,
  xpText: `${PREFIX}-xpText`,
}

type Props = {
  ticketPoints?: TICKET_POINT_OPTIONS
}
const ComponentRoot = styled(Box)(({ theme }: { theme: Theme }) => ({
  [`&.${classes.root}`]: {},
  [`.${classes.xpText}`]: {},
}))

export function XPTierDisplay({
  ticketPoints = TICKET_POINT_OPTIONS.ONE_POINT,
}: Props) {
  const textDescription = getPointXPLabel(ticketPoints)

  return (
    <Tooltip title="XP Reward">
      <ComponentRoot
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <SpeedIcon sx={{ width: "18px", height: "18px" }} /> */}
        {/* <ElevatorIcon sx={{ width: "18px", height: "18px" }} /> */}
        <EngineeringIcon sx={{ width: "18px", height: "18px" }} />
        <Typography
          sx={{
            pl: 1,
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: 700,
            textShadow: "none",
          }}
        >
          {textDescription}
        </Typography>
      </ComponentRoot>
    </Tooltip>
  )
}
