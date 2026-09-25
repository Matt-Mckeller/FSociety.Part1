"use client"

import React, { useContext, useMemo, useState, useCallback } from "react"
import { UserContext } from "../../user"
import { InventoryContext } from "./Inventory.context"

export interface ProgressContextInterface {
  progressPercentage: number
  progressLevel: number
  addManualExperience: (amount: number) => void // temporary for demo purposes
}

export const ProgressContext =
  React.createContext<ProgressContextInterface>(null)

export function ProgressProvider({ children }: any) {
  const { user } = useContext(UserContext)
  const userIsAuthenticated: boolean = !!(user && user.id)
  const { addManualLootBox } = useContext(InventoryContext)

  const [experienceEarnedThisLevel, setExperienceEarnedThisLevel] = useState(0)
  const [progressLevel, setProgressLevel] = useState(1)

  const handleAddManualExperience = useCallback(
    (amount: number) => {
      console.log("adding manual experience", { amount })
      let newExperienceTotal = experienceEarnedThisLevel + amount
      let newProgressLevel = progressLevel

      while (newExperienceTotal >= 100) {
        newExperienceTotal -= 100
        newProgressLevel += 1
        console.log("The user has leveled up!")
        addManualLootBox() // Reward the user for leveling up
      }

      setExperienceEarnedThisLevel(newExperienceTotal)
      setProgressLevel(newProgressLevel)
    },
    [experienceEarnedThisLevel, progressLevel, addManualLootBox],
  )

  const value: ProgressContextInterface = useMemo(
    () => ({
      progressPercentage: experienceEarnedThisLevel,
      progressLevel,
      addManualExperience: handleAddManualExperience,
    }),
    [experienceEarnedThisLevel, progressLevel, handleAddManualExperience],
  )

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}
