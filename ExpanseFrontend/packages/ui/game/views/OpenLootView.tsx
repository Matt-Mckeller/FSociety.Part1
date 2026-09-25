"use client"
import { Badge, Button, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ChestOpening1Animation } from "expanse.dynamicAssets"
import {
  InventoryContext,
  LootBoxRewardClassifications,
  RewardInterface,
  RewardImage,
  useRewardDictionary,
} from "expanse.ui/game"
import React, { useCallback, useContext, useRef, useState } from "react"

export const OpenLootView = () => {
  const {
    openBox,
    unopenedLootBoxes,
    openedLootBoxes,
    onFinishedAcceptingLoot,
    lootBoxRewardsBeingAccepted,
  } = useContext(InventoryContext)
  // const [rewardsFromOpenedBoxes, setRewardsFromOpenedBoxes] = useState<
  //   RewardInterface<LootBoxRewardClassifications>[]
  // >([])
  const [viewingRewardsIndex, setViewingRewardsIndex] = useState(0)
  const [screen, setScreen] = useState<"openBox" | "viewRewards">("openBox")
  const [chestAnimationIsPlaying, setChestAnimationIsPlaying] = useState(false)
  const chestAnimationRef = useRef<any>(null)

  const { dictionaryEntry } =
    lootBoxRewardsBeingAccepted && lootBoxRewardsBeingAccepted.length > 0
      ? useRewardDictionary(lootBoxRewardsBeingAccepted[viewingRewardsIndex])
      : { dictionaryEntry: undefined }

  const rewardQuantity =
    lootBoxRewardsBeingAccepted[viewingRewardsIndex]?.quantity
  const rewardNameText =
    `${dictionaryEntry?.name}` +
    (rewardQuantity && rewardQuantity > 1 ? ` x${rewardQuantity}` : "")

  const rewardDescriptionText = dictionaryEntry?.description

  const handleChestAnimationComplete = useCallback(() => {
    console.log("chest animation completed")
    setChestAnimationIsPlaying(false)
    setScreen("viewRewards")
  }, [])

  const handleOpenBox = useCallback(
    (count: number) => {
      if (chestAnimationRef.current) {
        if (count === 1) {
          openBox([unopenedLootBoxes[0].id])
        } else {
          if (count <= unopenedLootBoxes.length) {
            const boxesToOpen = unopenedLootBoxes
              .slice(0, count)
              .map(({ id }) => id)
            openBox(boxesToOpen)
          } else {
            throw new Error("Invalid loot box count")
          }
        }

        setChestAnimationIsPlaying(true)
        chestAnimationRef.current.playAnimation()
      }
    },
    [unopenedLootBoxes],
  )

  const handleAcceptLoot = useCallback(() => {
    if (viewingRewardsIndex + 1 >= lootBoxRewardsBeingAccepted.length) {
      setScreen("openBox")
      setViewingRewardsIndex(0)
      onFinishedAcceptingLoot()
    } else {
      // Finished accepting loot
      setViewingRewardsIndex((currentIndex) => currentIndex + 1)
    }
  }, [viewingRewardsIndex, lootBoxRewardsBeingAccepted])

  if (screen === "openBox") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {unopenedLootBoxes?.length === 0 && !chestAnimationIsPlaying && (
          <Typography px={4}>
            Claim more rewards to receive more loot boxes!
          </Typography>
        )}
        {(unopenedLootBoxes?.length > 0 || chestAnimationIsPlaying) && (
          <>
            <Badge badgeContent={unopenedLootBoxes?.length} color="primary">
              <Paper
                sx={{ width: "200px", height: "200px", mb: 2 }}
                elevation={1}
              >
                <ChestOpening1Animation
                  ref={chestAnimationRef}
                  onComplete={handleChestAnimationComplete}
                />
              </Paper>
            </Badge>
            <Button
              onClick={() => handleOpenBox(1)}
              disabled={chestAnimationIsPlaying}
            >
              Open
            </Button>
            {unopenedLootBoxes.length >= 5 && (
              <Button
                onClick={() => handleOpenBox(5)}
                disabled={chestAnimationIsPlaying}
              >
                Open 5
              </Button>
            )}
          </>
        )}
      </Box>
    )
  }
  if (screen === "viewRewards") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Paper
          sx={{
            width: "200px",
            mb: 2,
          }}
          elevation={1}
        >
          <RewardImage
            reward={lootBoxRewardsBeingAccepted[viewingRewardsIndex]}
          />
        </Paper>
        <Typography textAlign="center" mt={2}>
          {viewingRewardsIndex + 1} / {lootBoxRewardsBeingAccepted.length}
        </Typography>
        <Typography textAlign="center" fontWeight="bold">
          {rewardNameText}
        </Typography>
        <Typography>{rewardDescriptionText}</Typography>

        <Button onClick={() => handleAcceptLoot()}>Accept</Button>
      </Box>
    )
  }
  // Shouldnt happen
  return null
}
