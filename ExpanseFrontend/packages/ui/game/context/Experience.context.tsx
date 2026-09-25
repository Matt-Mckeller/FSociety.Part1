"use client"

import React, { useContext, useMemo, useState } from "react"
import { UserContext } from "../../user"
import { ExperienceContextInterface } from "../types"
import { Experience } from "../classes/experience"
import { EXPERIENCE_SUBSCRIPTION } from "../gql"
import { useSubscription } from "@apollo/client"
import { InventoryContext } from "./Inventory.context"

// @todo update to enumerable decorators
// Object.defineProperties(this, {
//   level: { enumerable: true },
//   experienceToNextLevel: { enumerable: true },
//   totalExperienceForNextLevel: { enumerable: true },
//   previousLevel: { enumerable: true },
//   totalExperienceForPreviousLevel: { enumerable: true },
//   requiredExperienceForNextLevel: { enumerable: true },
// })

// const ExperienceContext: ExperienceContextInterface = React.createContext({
//   level: 3,
//   experienceToNextLevel: 50,
//   totalExperienceEarned: 105,
//   totalExperienceForNextLevel: 110,
//   totalExperienceForPreviousLevel: 100,
//   requiredExperienceForNextLevel: () => this.totalExperienceForNextLevel - this.totalExperienceEarned as number,
//   //   progressPercent: () => this.
// //   experience: {},
// })

// const SampleUser = new User({ name: 'Sample User', level: 3 })

export const ExperienceContext =
  React.createContext<ExperienceContextInterface>(null)

export function ExperienceProvider({ children }: any) {
  const { user } = useContext(UserContext)
  const userIsAuthenticated: boolean = !!(user && user.id)
  const { addManualLootBox } = useContext(InventoryContext)

  /*
  Actually used:
  currentLevelExperience
    totalExperienceForCurrentLevel: totalExperienceForNextLevel,
    currentLevel: level

  */
  // todo convert to expanse api sending
  // const {
  //   data: {
  //     experienceRequiredForNextLevel,
  //     totalExperienceEarned: fetchedTotalExperienceEarned,
  //     totalExperienceForLevel,
  //   },
  //   loading,
  // } = useSubscription(EXPERIENCE_SUBSCRIPTION, {
  //   variables: { userID: userIsAuthenticated ? user?.id : null },
  // })

  const [_manualTotalExperienceEarned, setTotalExperienceEarned] = useState(190)

  const ExperienceObject = new Experience({
    totalExperienceEarned: _manualTotalExperienceEarned,
  })

  // todo may move some of these values to backend, but maybe in both places
  const {
    currentLevel,
    currentLevelExperience,
    totalExperienceForCurrentLevel,
    totalExperienceEarned,
    previousLevel,
    nextLevel,
    experiencePercentage,
    // experienceEventHistory,
  } = ExperienceObject.toJson()

  console.log({
    currentLevel,
    currentLevelExperience,
    totalExperienceForCurrentLevel,
    totalExperienceEarned,
    totalExperienceForPreviousLevel:
      ExperienceObject.totalExperienceForPreviousLevel,
    previousLevel,
    nextLevel,
    experiencePercentage,
    // experienceEventHistory,
  })

  const handleAddManualExperience = (amount: number) => {
    console.log("adding manual experience", { amount })
    const newExperienceTotal = _manualTotalExperienceEarned + amount

    const updatedExperienceObject = new Experience({
      totalExperienceEarned: newExperienceTotal,
    })
    // Todo this logic should happen on the backend along with other manual functionality across context
    if (updatedExperienceObject.currentLevel > currentLevel) {
      console.log("The user has leveled up!")
      addManualLootBox() // Reward the user for leveling up
    }

    setTotalExperienceEarned(newExperienceTotal)
  }

  const value: ExperienceContextInterface = useMemo(
    () => ({
      currentLevel,
      currentLevelExperience,
      totalExperienceForCurrentLevel,
      totalExperienceEarned,
      previousLevel,
      nextLevel,
      experiencePercentage,
      // experienceEventHistory,
      addManualExperience: handleAddManualExperience,
    }),
    [
      currentLevel,
      currentLevelExperience,
      totalExperienceForCurrentLevel,
      totalExperienceEarned,
      previousLevel,
      nextLevel,
      experiencePercentage,
      // experienceEventHistory,
      handleAddManualExperience,
    ],
  )

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  )
}
