"use client"
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Typography,
  Button,
} from "@mui/material"
import React, { useContext } from "react"
import { AnalyticsContext } from "../../application"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"
import { ClaimEventRewardDisplayContext } from "../context/ClaimEventRewardDisplay.context"
import { CloseModalButton } from "expanse.ui/theme"
import { ClaimEventRewardsView } from "./ClaimEventRewardsView"

export function ClaimEventRewardDisplayModal() {
  const {
    isModalOpen,
    dictionary,
    exitClaimEventRewardDisplay,
    redeemedEventRewards,
    navigateToOpenLoot,
  } = useContext(ClaimEventRewardDisplayContext)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)

  const handleClose = (event?: any, reason?: string) => {
    if (reason === "backdropClick") {
      // Do nothing
    } else {
      exitClaimEventRewardDisplay()

      registerAnalyticsEvent({
        variables: {
          event: "exit-claim-rewards-display",
          analyticsEventContext,
          params: null,
        },
      })
    }
  }

  return (
    <Dialog onClose={handleClose} open={isModalOpen}>
      <DialogTitle id="reward-dialog-title">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          width="100%"
          height="100%"
          position="relative"
        >
          <Box textAlign="center">
            <Typography component="h3">
              {dictionary?.title || "Unknown"}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: -7,
            }}
          >
            <CloseModalButton handleClose={handleClose} />
          </Box>
        </Box>
      </DialogTitle>
      <Box
        overflow="scroll"
        sx={{
          paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: 8,
          width: "483.7px",
        }}
      >
        <ClaimEventRewardsView displayActions={false} displayTitle={false} />
      </Box>
      <DialogActions>
        {redeemedEventRewards?.lootBoxes &&
          redeemedEventRewards?.lootBoxes.length > 0 && (
            <Button onClick={navigateToOpenLoot}>
              {dictionary?.openLootButton || "Open Loot"}
            </Button>
          )}
        <Button onClick={handleClose}>
          {dictionary?.finishedButton || "Done"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
