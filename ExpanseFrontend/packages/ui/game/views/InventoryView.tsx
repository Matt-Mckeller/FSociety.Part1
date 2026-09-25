"use client"
import {
  Badge,
  Button,
  Grid,
  Paper,
  Typography,
  Drawer,
  Slide,
} from "@mui/material"
import { Box } from "@mui/system"
import { ChestOpening1Animation } from "expanse.dynamicAssets"
import {
  InventoryContext,
  InventoryItemImage,
  InventoryItemInterface,
  InventoryRewardDetailView,
  OpenLootView,
  ProfileContext,
  RewardCard,
  RewardInterface,
  useInventoryItemDictionary,
  WalletContext,
} from "expanse.ui/game"
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"
import { SectionSpacer } from "../../theme"

const ClassRoomRewardView = ({ selectedReward, setSelectedReward }) => {
  const { inventory, ownedRewards, unopenedLootBoxes } =
    useContext(InventoryContext)
  const { coins } = useContext(WalletContext)
  const { classes } = useContext(ProfileContext)
  const [classroomRewards, setClassroomRewards] = useState<
    RewardInterface<any>[]
  >([])
  // const studentClassEnrollments = classes.filter((c) =>
  //   c.enrollments.includes((e) => e.role === "student"),
  // )
  console.log(
    "student classes",
    classes && classes?.length
      ? classes[0].enrollments.includes((e) => e.role === "student")
      : null,
  )

  useEffect(() => {
    const mappedRewards = ownedRewards
      .filter((i) => i.category === "teacher")
      .map((i) => {
        const updatedReward = { ...i }
        console.log({ coinId: i.coinId, coins, coinsOfId: coins[i.coinId] })
        updatedReward.classStore = classes.find((c) => c.id === i.classStoreId)
        updatedReward.coin =
          i.coinId && coins[i.coinId] ? coins[i.coinId] : undefined
        return updatedReward
      })
    console.log("in use effect", { ownedRewards, mappedRewards })

    setClassroomRewards(mappedRewards)
  }, [ownedRewards, coins, classes])

  console.log({ classroomRewards, ownedRewards })
  console.log({ classes })

  // console.log("Inventory view Panel", {
  //   inventory,
  // })
  return (
    <Grid
      container
      key={"classroom"}
      // spacing={2}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px",
      }}
    >
      {classroomRewards.map((reward, index) => (
        <Grid item sx={{ width: "100%" }} key={index}>
          <RewardCard
            reward={reward}
            state={
              selectedReward && selectedReward.id === reward.id
                ? "selected"
                : undefined
            }
            onClick={() => setSelectedReward(reward)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

const ExpanseItemRewardView = () => {
  const { inventory, unopenedLootBoxes } = useContext(InventoryContext)
  const getText = (item: InventoryItemInterface) => {
    const { dictionaryEntry } = useInventoryItemDictionary(item)

    const name = dictionaryEntry?.name
    const description = dictionaryEntry?.description
    return { name, description }
  }
  return (
    inventory?.length > 0 &&
    inventory.map((item, index) => (
      <Grid item zero={12} key={index}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InventoryItemImage item={item} width={50} height={50} />

          <Typography variant="body1" ml={2}>
            {getText(item).name}
          </Typography>
        </Paper>
      </Grid>
    ))
  )
}
export const InventoryView = () => {
  const { inventory, unopenedLootBoxes } = useContext(InventoryContext)
  const [currentView, setCurrentView] = React.useState("classroom")
  const [showSidePanel, setShowSidePanel] = React.useState(false)
  const [sidePanelView, setSidePanelView] = React.useState<
    "reward" | "lootbox"
  >("reward")
  const [borderEnabled, setBorderEnabled] = React.useState(false)
  const [lootBoxIsSelected, setLootBoxIsSelected] =
    React.useState<boolean>(null)
  const [selectedReward, setSelectedReward] =
    React.useState<RewardInterface<any>>(null)

  const handleSetSelectedReward = (reward: RewardInterface<any>) => {
    if (reward && reward?.id === selectedReward?.id) {
      setShowSidePanel(false)
      setSelectedReward(null)
    } else {
      setLootBoxIsSelected(false)
      setSelectedReward(reward)
    }
  }

  const handleSetLootBoxIsSelected = () => {
    if (lootBoxIsSelected) {
      setShowSidePanel(false)
      setLootBoxIsSelected(false)
    } else {
      setLootBoxIsSelected(true)
      setSelectedReward(null)
    }
  }

  useLayoutEffect(() => {
    if (selectedReward || lootBoxIsSelected) {
      setShowSidePanel(true)
      setBorderEnabled(true)
      setSidePanelView(selectedReward ? "reward" : "lootbox")
    } else {
      setShowSidePanel(false)
      setBorderEnabled(false)
    }
  }, [
    lootBoxIsSelected,
    selectedReward,
    setShowSidePanel,
    setBorderEnabled,
    setSidePanelView,
  ])

  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100%"
      width="100%"
      flexGrow={1}
      p={4}
    >
      <Box
        borderRight={(theme) =>
          borderEnabled ? `1px solid ${theme.palette.divider}` : ""
        }
        pr={showSidePanel ? 4 : 0}
        mr={showSidePanel ? 4 : 0}
        flexGrow={showSidePanel ? 0 : 1}
        minWidth={"320px"}
      >
        <Typography fontWeight="bold" variant="h3" textAlign="center" mb={4}>
          Inventory
        </Typography>
        <Grid container mt={2}>
          {unopenedLootBoxes?.length > 0 && (
            <Grid
              item
              zero={12}
              key={"lootbox"}
              onClick={handleSetLootBoxIsSelected}
            >
              <Badge
                badgeContent={unopenedLootBoxes?.length}
                color="primary"
                sx={{ width: "100%" }}
                invisible={unopenedLootBoxes?.length <= 1}
              >
                <Paper
                  elevation={3}
                  sx={(theme) => ({
                    width: "100%",
                    padding: 2,
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    border: lootBoxIsSelected
                      ? `5px solid ${theme.palette.primary.light}`
                      : ``,
                    cursor: "pointer",
                  })}
                >
                  <Box width={50} height={50}>
                    <ChestOpening1Animation />
                  </Box>
                  <Typography variant="body1" ml={2}>
                    Chests
                  </Typography>
                </Paper>
              </Badge>
            </Grid>
          )}
          <SectionSpacer size="xs"></SectionSpacer>
          {currentView === "classroom" && (
            <ClassRoomRewardView
              selectedReward={selectedReward}
              setSelectedReward={handleSetSelectedReward}
            />
          )}
          {currentView === "expanse" && <ExpanseItemRewardView />}
        </Grid>
      </Box>
      <Slide direction="left" in={!!showSidePanel} mountOnEnter unmountOnExit>
        <Box minWidth="300px" width="100%" flexGrow={1}>
          <Typography fontWeight="bold" variant="h3" textAlign="center" mb={4}>
            Selection View
          </Typography>
          {showSidePanel && sidePanelView === "lootbox" && (
            <OpenLootView></OpenLootView>
          )}
          {showSidePanel &&
            sidePanelView === "reward" &&
            selectedReward &&
            selectedReward?.id && (
              <InventoryRewardDetailView
                reward={selectedReward}
              ></InventoryRewardDetailView>
            )}
        </Box>
      </Slide>
    </Box>
  )
}
