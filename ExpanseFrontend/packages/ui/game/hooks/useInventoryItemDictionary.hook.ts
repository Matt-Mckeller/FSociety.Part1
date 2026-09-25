"use client"

import {
  RewardDictionaryDefaults,
  RewardDictionaryIndividualEntries,
} from "../config/RewardDictionary"
import { InventoryItemInterface } from "../types"

/* Takes in a reward and returns the appropriate dictionary entry for the reward */
interface UseInventoryItemDictionaryResponse {
  dictionaryEntry: { [key: string]: string } | any
  dictionaryType: "individual"
  category: string
  variant: string
  variantValue?: string // only returned for certain reward types, i.e. sponsorship that has many subtypes for variants
  dictionaryIndex: string
}
export function useInventoryItemDictionary(
  item: InventoryItemInterface,
): UseInventoryItemDictionaryResponse {
  const category = item.classification.category

  const variant =
    typeof item.classification.variant === "string"
      ? item.classification.variant
      : item.classification.variant.type
  const variantValue =
    typeof item.classification.variant !== "string"
      ? item.classification.variant.value
      : undefined
  const dictionaryIndex = item.dictionaryIndex

  const dictionaryEntry =
    variantValue === undefined
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
    dictionaryType: "individual",
  }
}
