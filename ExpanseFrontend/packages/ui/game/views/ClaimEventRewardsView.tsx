"use client"
import { useMutation } from "@apollo/client"
import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ChestOpening1Animation } from "expanse.dynamicAssets"
import { useContext, useEffect } from "react"
import { AnalyticsContext, REGISTER_ANALYTICS_EVENT } from "../../application"
import {
  ExperienceIcon,
  CoinStackIcon,
  GemIcon,
  CharacterState,
  StaticCharacter,
} from "../../theme"
import { ClaimEventRewardDisplayContext } from "../context"
import LocalActivityIcon from "@mui/icons-material/LocalActivity"
import FlareIcon from "@mui/icons-material/Flare"
import ExperienceProgressBar from "../components/ExperienceProgressBar"
import ExperienceProgressBarSimple from "../components/ExperienceProgressBarSimple"

export const ClaimEventRewardsView = ({
  displayActions = true,
  displayTitle = true,
}: {
  displayActions?: boolean
  displayTitle?: boolean
}) => {
  const {
    exitClaimEventRewardDisplay,
    dictionary,
    claimableEventRewardElements,
    redeemedEventRewards,
    redeemEventRewards,
    loadingEventRewards,
    navigateToOpenLoot,
  } = useContext(ClaimEventRewardDisplayContext)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)

  useEffect(() => {
    console.log("calling redeem rewards with ", {
      claimableEventRewardElements: JSON.stringify(
        claimableEventRewardElements,
      ),
    })
    redeemEventRewards(claimableEventRewardElements)
  }, [])

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      {displayTitle && (
        <Typography component="h3" fontWeight="bold">
          {dictionary?.title || "Unknown"}
        </Typography>
      )}
      <Box width="300px" pb={2}>
        <Grid container justifyContent="center" alignItems={"center"}>
          <Grid item zero={3} height="100px">
            <StaticCharacter
              state={CharacterState.celebration1}
              containerPaddingX={0}
              containerPaddingY={0}
              limbOpacity={0.95}
            />
          </Grid>
          <Grid item zero={9}>
            <ExperienceProgressBarSimple
              displayLevelText={true}
              aspectRatio={6}
            ></ExperienceProgressBarSimple>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {loadingEventRewards ? (
          <Typography>Loading rewards...</Typography>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <Box
                width={20}
                height={20}
                display="flex"
                justifyContent="center"
              >
                <ExperienceIcon variant="default" />
              </Box>
              <Typography ml={1}>
                Experience: +{redeemedEventRewards?.experienceIncrease}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Box
                width={20}
                height={20}
                display="flex"
                justifyContent="center"
                sx={{ transform: "scale(0.8)" }}
              >
                <CoinStackIcon />
              </Box>
              <Typography ml={1}>
                Coins: +{redeemedEventRewards?.walletIncrease?.coins?.xcoins}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Box
                width={20}
                height={20}
                display="flex"
                justifyContent="center"
              >
                <GemIcon />
              </Box>
              <Typography ml={1}>
                Gems: +{redeemedEventRewards?.walletIncrease?.gems?.xgems}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Box
                width={20}
                height={20}
                display="flex"
                justifyContent="center"
              >
                <FlareIcon sx={{ width: 20, height: 20 }} />
              </Box>
              <Typography ml={1}>
                Scholarship Essences: +
                {redeemedEventRewards?.walletIncrease?.essences?.scholarship}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Box
                width={20}
                height={20}
                display="flex"
                justifyContent="center"
              >
                <LocalActivityIcon sx={{ width: 20, height: 20 }} />
              </Box>

              <Box display="flex" flexDirection="row">
                <Typography ml={1}>
                  Expanse Weekly Drawing: +{" "}
                  {redeemedEventRewards?.walletIncrease?.tickets?.weeklyLottery}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Box
                width={20}
                height={20}
                display="flex"
                justifyContent="center"
              >
                <LocalActivityIcon
                  sx={{ width: 20, height: 20 }}
                  color="primary"
                />
              </Box>

              <Box display="flex" flexDirection="row">
                <Typography ml={1}>
                  Expanse Monthly Drawing: +{" "}
                  {
                    redeemedEventRewards?.walletIncrease?.tickets
                      ?.monthlyLottery
                  }
                </Typography>
              </Box>
            </Box>
            {redeemedEventRewards?.lootBoxes &&
            redeemedEventRewards?.lootBoxes.length ? (
              <Box display="flex" alignItems="center" mb={1}>
                <Box
                  width={20}
                  height={20}
                  display="flex"
                  justifyContent="center"
                >
                  <ChestOpening1Animation staticZoom={true} />
                </Box>
                <Typography ml={1}>
                  Loot Boxes: +{redeemedEventRewards?.lootBoxes.length}
                </Typography>
              </Box>
            ) : null}
          </Box>
        )}
      </Box>
      {displayActions && (
        <>
          {redeemedEventRewards?.lootBoxes &&
            redeemedEventRewards?.lootBoxes.length > 0 && (
              <Button onClick={navigateToOpenLoot}>
                {dictionary?.openLootButton || "Open Loot"}
              </Button>
            )}
          <Button onClick={() => exitClaimEventRewardDisplay()}>
            {dictionary?.finishedButton || "Done"}
          </Button>
        </>
      )}
    </Box>
  )
}
