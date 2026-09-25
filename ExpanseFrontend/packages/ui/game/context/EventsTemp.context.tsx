"use client"
import { UserContext } from "expanse.ui/user"
import React, { useContext, useMemo, ReactNode, useState } from "react"
import { useSubscription } from "@apollo/client"
import { CURRENCY_SUBSCRIPTION, ProgressContext } from "expanse.ui/game"
import {
  LootBoxRewardClassifications,
  Rarity,
  RewardableEventInterface,
  RewardInterface,
} from "../types"
import { randomUUID } from "crypto"
import { CoinClassification, GemClassification } from "../types"
import { WalletContext } from "./Wallet.context"
import { LOOT_BOX_DEMO_DATA } from "../mockData/demoMockData"
import { Reward } from "../classes/reward"

type EventsTempContextType = {
  rewardEvents: RewardableEventInterface[]
  handleAddEvent: (event: string) => void
}

export const EventsTempContext =
  React.createContext<EventsTempContextType>(null)

type EventsTempProviderProps = {
  children: ReactNode
}
export const EventsTempProvider = ({ children }: EventsTempProviderProps) => {
  // Note: Will want to track changes through the backend to support multiple applications, and devices, shared state and scalability.
  // Keep this built in such a way that it can be

  const { user } = useContext(UserContext)
  const userIsAuthenticated: boolean = !!(user && user.id)

  const { addManualExperience } = useContext(ProgressContext)

  const { addManualCoins, addManualGems } = useContext(WalletContext)

  const { addManualLevelUpReward } = () => {}

  const [rewardEvents, setRewardEvents] = useState<RewardableEventInterface[]>(
    [],
  )

  // takes in loot box ids and returns the loot
  const determineReward = (eventType: string) => {
    const rewards: RewardableEventRewardInterface[] = []
    switch (eventType) {
      // case "attendance":
      //   rewards.push({
      //     type: "experience",
      //     value: 1,
      //   })
      //   break
      case "homework":
        rewards.push({
          type: "experience",
          value: 1,
        })
        rewards.push({
          type: "coins",
          value: 1,
        })
        break
      case "test":
        rewards.push({
          type: "experience",
          value: Math.floor(Math.random() * 3) + 1,
        })
        rewards.push({
          type: "gems",
          value: Math.floor(Math.random() * 2) + 1,
        })
        rewards.push({
          type: "coins",
          value: Math.floor(Math.random() * 3) + 1,
        })
        break
      case "graduation":
        rewards.push({
          type: "experience",
          value: Math.floor(Math.random() * 10) + 20,
        })
        rewards.push({
          type: "coins",
          value: Math.floor(Math.random() * 10) + 20,
        })
        rewards.push({
          type: "gems",
          value: Math.floor(Math.random() * 5) + 2,
        })
        break
      case "teacherRecognition":
        rewards.push({
          type: "experience",
          value: Math.floor(Math.random() * 10) + 20,
        })
        rewards.push({
          type: "coins",
          value: Math.floor(Math.random() * 10) + 20,
        })
        rewards.push({
          type: "gems",
          value: Math.floor(Math.random() * 5) + 2,
        })
        break
    }
    return rewards
  }

  const handleAddEvent = (eventType: string) => {
    console.log({ handleAddEvent: eventType })
    const event: RewardableEventInterface = {
      id: crypto.randomUUID(),
      type: eventType,
      timestamp: new Date().toISOString(),
      // rewards: determineReward(eventType),
      rewardStatus: "rewarded",
    }

    // event.rewards
    //   .filter((e) => e.type === "experience")
    //   .forEach((experienceEvent) => {
    //     addManualExperience(experienceEvent.value)
    //   })
    // event.rewards
    //   .filter((e) => e.type === "coins")
    //   .forEach((coinEvent) => {
    //     addManualCoins(coinEvent.value)
    //   })
    // event.rewards
    //   .filter((e) => e.type === "gems")
    //   .forEach((gemEvent) => {
    //     addManualGems(gemEvent.value)
    //   })
    // console.log({ event })
    // console.log("new event to add", { event })
    // setRewardEvents((prevEvents) => [event, ...prevEvents])
  }

  const values = useMemo(
    () => ({
      rewardEvents,
      handleAddEvent,
    }),
    [rewardEvents, handleAddEvent],
  )

  return (
    <EventsTempContext.Provider value={values}>
      {children}
    </EventsTempContext.Provider>
  )
}
