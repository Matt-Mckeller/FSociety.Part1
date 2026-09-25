"use client"

import {
  RewardDictionaryDefaults,
  RewardDictionaryIndividualEntries,
} from "../config/RewardDictionary"
import { Classification, RewardInterface } from "../types"

/* Takes in a reward and returns the appropriate dictionary entry for the reward */
interface UseRewardDictionaryResponse {
  dictionaryEntry: { [key: string]: string } | any
  dictionaryType: "default" | "individual"
  category: string
  variant: string
  variantValue?: string // only returned for certain reward types, i.e. sponsorship that has many subtypes for variants
  dictionaryIndex: string
}
export function useRewardDictionary(
  reward: RewardInterface<Classification>,
): UseRewardDictionaryResponse {
  const category = reward.classification.category

  const variant =
    typeof reward.classification.variant === "string"
      ? reward.classification.variant
      : reward.classification.variant.type
  const variantValue =
    typeof reward.classification.variant !== "string"
      ? reward.classification.variant.value
      : undefined
  const dictionaryIndex = reward.dictionaryIndex

  const defaultEntries = [
    "coins",
    "gems",
    "experience",
    "lotteryTickets",
    "gameEssence",
  ]
  const useDefaultDictionary = defaultEntries.includes(category)
  const dictionaryEntry = useDefaultDictionary
    ? RewardDictionaryDefaults.en[category][variant]
    : variantValue === undefined
      ? RewardDictionaryIndividualEntries.en[category][variant][dictionaryIndex]
      : RewardDictionaryIndividualEntries.en[category][variant][variantValue][
          dictionaryIndex
        ]

  return {
    dictionaryEntry,
    category,
    variant,
    variantValue,
    dictionaryIndex,
    dictionaryType: useDefaultDictionary ? "default" : "individual",
  }
}
