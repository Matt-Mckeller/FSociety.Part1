"use client"
import { UserContext } from "expanse.ui/user"
import React, {
  useContext,
  useMemo,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react"
import {
  CoinClassification,
  EventsTempContext,
  GemClassification,
  GET_MY_OWNED_REWARDS,
  InventoryItemInterface,
  LootBoxInterface,
  LootBoxRewardClassifications,
  Rarity,
  RewardInterface,
  WalletClassifications,
  WalletContext,
} from "expanse.ui/game"
import { LootBox } from "../classes/lootBox"
import {
  INVENTORY_LOOT_DEMO_DATA,
  LOOT_BOX_DEMO_DATA,
} from "../mockData/demoMockData"
import { Reward } from "../classes/reward"
import { useQuery } from "@apollo/client"
import { getApolloClientEdu } from "../../application"

type InventoryContextType = {
  unopenedLootBoxes: LootBoxInterface[]
  openBox: (boxIds: string[]) => RewardInterface<LootBoxRewardClassifications>[]
  addManualLootBox: () => void
  inventory: InventoryItemInterface[]
  onFinishedAcceptingLoot: () => void
  lootBoxRewardsBeingAccepted: RewardInterface<LootBoxRewardClassifications>[]
  refetchOwnedRewards: () => void
  ownedRewards: RewardInterface<LootBoxRewardClassifications>[]
}

export const InventoryContext = React.createContext<InventoryContextType>(null)

type InventoryProviderProps = {
  children: ReactNode
}
export const InventoryProvider = ({ children }: InventoryProviderProps) => {
  const { user } = useContext(UserContext)
  const userIsAuthenticated: boolean = !!(user && user.id)
  const { addManualCoins, addManualGems } = useContext(WalletContext)
  const [ownedRewards, setOwnedRewards] = useState<
    RewardInterface<LootBoxRewardClassifications>[]
  >([]) // duplicate definition from inventory..? probably cleanup later but works for now
  const [unopenedLootBoxes, setUnopenedLootBoxes] = useState<
    LootBoxInterface[]
  >([
    LootBox.generateFake(),
    LootBox.generateFake(),
    LootBox.generateFake(),
    LootBox.generateFake(),
    LootBox.generateFake(),
    LootBox.generateFake(),
  ])

  const apolloClient = useMemo(() => getApolloClientEdu(), [])
  const {
    loading,
    error,
    data: ownedRewardsData,
    refetch: refetchOwnedRewards,
  } = useQuery(GET_MY_OWNED_REWARDS, {
    client: apolloClient,
  })

  useEffect(() => {
    const myOwnedRewards = ownedRewardsData?.myOwnedRewards
    if (!myOwnedRewards) {
      setOwnedRewards([])
      return
    }

    setOwnedRewards(myOwnedRewards)
    // todo when do i refresh lol, timer? subscription?
  }, [ownedRewardsData])

  const [
    redeemedDemoLootBoxRewardCountTracker,
    setRedeemedDemoLootBoxRewardCountTracker,
  ] = useState(0) // temporary for tracking during demo, does not track gems/coins
  const [inventory, setInventory] = useState<InventoryItemInterface[]>(
    INVENTORY_LOOT_DEMO_DATA.map((item) => item.toJson()),
  )

  const [boxIdsBeingOpened, setBoxIdsBeingOpened] = useState<string[]>([])
  const [lootBoxRewardsBeingAccepted, setLootBoxRewardsBeingAccepted] =
    useState<RewardInterface<LootBoxRewardClassifications>[]>([])

  // Manual for demo
  const filterRewardsForInventoryItems = (
    rewards: RewardInterface<LootBoxRewardClassifications>[],
  ): InventoryItemInterface[] => {
    const filteredItems: InventoryItemInterface[] = []
    for (const reward of rewards) {
      const InventoryRewardTypes = [
        "scholarship",
        "sponsorship",
        "lotteryTickets",
        "gameEssence",
        "gameEquipment",
        "gameItem",
        "gameConsumables",
        "gameTitle",
        "nft",
      ]
      if (InventoryRewardTypes.includes(reward.classification.category)) {
        filteredItems.push(reward as InventoryItemInterface)
      }
    }
    return filteredItems
  }

  // Manual for demo
  const filterRewardsForWalletItems = (
    rewards: RewardInterface<LootBoxRewardClassifications>[],
  ): RewardInterface<WalletClassifications>[] => {
    const filteredItems: RewardInterface<WalletClassifications>[] = []
    for (const reward of rewards) {
      const rewardTypes = ["gems", "coins", "tickets", "essences"]
      if (rewardTypes.includes(reward.classification.category)) {
        filteredItems.push(reward as RewardInterface<WalletClassifications>)
      }
    }
    return filteredItems
  }
  const onFinishedAcceptingLoot = () => {
    // Manual for demo
    const inventoryItems = filterRewardsForInventoryItems(
      lootBoxRewardsBeingAccepted,
    )
    setInventory((currentInventory) => {
      const updatedInventory = [...inventoryItems, ...currentInventory]
      return updatedInventory
    })
    const walletRewards = filterRewardsForWalletItems(
      lootBoxRewardsBeingAccepted,
    )
    walletRewards.forEach((reward) => {
      if (reward.classification.category === "coins") {
        addManualCoins(reward.classification.variant, reward.quantity as number)
      } else if (reward.classification.category === "gems") {
        addManualGems(reward.classification.variant, reward.quantity as number)
      }
    })
    setBoxIdsBeingOpened([])
    setLootBoxRewardsBeingAccepted([])
  }
  const handleAddManualLootBox = () => {
    console.log("should add a box")
    const createdLootBox = LootBox.generateFake()
    console.log({ createdLootBox })
    setUnopenedLootBoxes([...unopenedLootBoxes, createdLootBox])
  }

  const handleOpenBox = useCallback(
    (boxIds: string[]): RewardInterface<LootBoxRewardClassifications>[] => {
      let redeemedDemoLootBoxRewardCountTrackerThisIteration =
        redeemedDemoLootBoxRewardCountTracker
      const rewards: RewardInterface<LootBoxRewardClassifications>[] = []
      setBoxIdsBeingOpened(boxIds)
      boxIds.forEach((boxId) => {
        // Problem, getting the same rewards over and over
        const lootBoxToOpen = unopenedLootBoxes.find(({ id }) => id === boxId)
        if (!lootBoxToOpen || lootBoxToOpen.id !== boxId) {
          throw new Error("Unable to find all of the requested boxes to open.")
        }

        // on backend would validate loot boxes and handle related logic
        // also would determine how many items are in each box, and which items
        const rewardsPerBox = 3 // not counting gems/coins

        const lootBoxRewards: RewardInterface<LootBoxRewardClassifications>[] =
          []
        for (
          let i = redeemedDemoLootBoxRewardCountTrackerThisIteration;
          i <
          redeemedDemoLootBoxRewardCountTrackerThisIteration + rewardsPerBox;
          i++
        ) {
          lootBoxRewards.push(
            LOOT_BOX_DEMO_DATA[i % LOOT_BOX_DEMO_DATA.length].toJson(),
          )
        }
        redeemedDemoLootBoxRewardCountTrackerThisIteration += rewardsPerBox

        rewards.push(...lootBoxRewards)
      })

      setRedeemedDemoLootBoxRewardCountTracker(
        (prevCount) => prevCount + rewards.length,
      )

      const gemRewardQuantityOptions = [5, 10, 15]
      const gemReward: RewardInterface<GemClassification> = new Reward({
        id: crypto.randomUUID(),
        value: undefined,
        quantity:
          gemRewardQuantityOptions[
            Math.floor(Math.random() * gemRewardQuantityOptions.length)
          ] * boxIds.length,
        classification: {
          category: "gems",
          variant: "xgems",
          productAttributes: [],
        },
        uniqueRewardId: crypto.randomUUID(),
        currency: undefined,
        dictionaryIndex: "",
        rarity: Rarity.COMMON,
        tags: [],
        isTradeable: false,
      }).toJson()
      const coinRewardQuantityOptions = [25, 50, 100]
      const coinReward: RewardInterface<CoinClassification> = new Reward({
        id: crypto.randomUUID(),
        value: undefined,
        quantity:
          coinRewardQuantityOptions[
            Math.floor(Math.random() * coinRewardQuantityOptions.length)
          ] * boxIds.length,
        classification: {
          category: "coins",
          variant: "xcoins",
          productAttributes: [],
        },
        uniqueRewardId: crypto.randomUUID(),
        currency: undefined,
        dictionaryIndex: "",
        rarity: Rarity.COMMON,
        tags: [],
        isTradeable: false,
      }).toJson()

      rewards.unshift(coinReward, gemReward)

      setUnopenedLootBoxes((currentLootBoxes) =>
        currentLootBoxes.filter(
          (lootBox: LootBoxInterface) => !boxIds.includes(lootBox.id),
        ),
      )
      setLootBoxRewardsBeingAccepted(rewards)
      return rewards
    },
    [unopenedLootBoxes, redeemedDemoLootBoxRewardCountTracker],
  )

  const values = useMemo(
    () => ({
      unopenedLootBoxes,
      openBox: handleOpenBox,
      addManualLootBox: handleAddManualLootBox,
      inventory,
      onFinishedAcceptingLoot,
      lootBoxRewardsBeingAccepted,
      ownedRewards,
      refetchOwnedRewards,
    }),
    [
      unopenedLootBoxes,
      handleOpenBox,
      handleAddManualLootBox,
      inventory,
      onFinishedAcceptingLoot,
      lootBoxRewardsBeingAccepted,
      ownedRewards,
      refetchOwnedRewards,
    ],
  )

  return (
    <InventoryContext.Provider value={values}>
      {children}
    </InventoryContext.Provider>
  )
}
