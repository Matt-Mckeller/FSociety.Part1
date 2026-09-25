import { Reward } from "../classes/reward"

import { Rarity, Currency } from "../types"

// Manually define each reward option
export const coinRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: 100,
    classification: {
      category: "coins",
      variant: "xcoins",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "",
    currency: undefined,
    dictionaryIndex: "",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: true,
  }),
]

export const gemRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: 50,
    classification: {
      category: "gems",
      variant: "xgem",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "",
    currency: undefined,
    dictionaryIndex: "",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: true,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 75,
    classification: {
      category: "gems",
      variant: "diamonds",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "",
    currency: Currency.USD,
    dictionaryIndex: "diamond-dictionary-index",
    rarity: Rarity.EPIC,
    tags: [],
    isTradeable: true,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 60,
    classification: {
      category: "gems",
      variant: "ruby",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "https://example.com/ruby-asset.png",
    currency: Currency.USD,
    dictionaryIndex: "ruby-dictionary-index",
    rarity: Rarity.LEGENDARY,
    tags: [],
    isTradeable: true,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 65,
    classification: {
      category: "gems",
      variant: "emerald",
      productAttributes: ["green", "precious"],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "https://example.com/emerald-asset.png",
    currency: Currency.USD,
    dictionaryIndex: "emerald-dictionary-index",
    rarity: Rarity.LEGENDARY,
    tags: ["currency", "emerald"],
    isTradeable: true,
  }),
]

export const experienceRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: 200,
    classification: {
      category: "experience",
      variant: "amount",
      productAttributes: ["level-up", "bonus"],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "https://example.com/experience-asset.png",
    currency: Currency.USD,
    dictionaryIndex: "experience-dictionary-index",
    rarity: Rarity.COMMON,
    tags: ["experience", "level-up"],
    isTradeable: false,
  }),
]

export const recognitionRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: "recognitionAnimation1",
    classification: {
      category: "recognition",
      variant: "animation",
      productAttributes: ["animated", "visual"],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "",
    currency: Currency.USD,
    dictionaryIndex: "recognitionAnimation1_v2",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "recognitionText1",
    classification: {
      category: "recognition",
      variant: "text",
      productAttributes: ["progress"],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "",
    currency: Currency.USD,
    dictionaryIndex: "",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "recognitionBadge1",
    classification: {
      category: "recognition",
      variant: "badge",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "",
    currency: Currency.USD,
    dictionaryIndex: "recognitionBadge1",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "homeworkAchiever10",
    classification: {
      category: "recognition",
      variant: "certificate",
      productAttributes: ["homework"],
    },
    uniqueRewardId: crypto.randomUUID(),
    assetUrl: "",
    currency: Currency.USD,
    dictionaryIndex: "",
    rarity: Rarity.EPIC,
    tags: [],
    isTradeable: false,
  }),
]

export const rewardableEventRewardMockData = [
  ...coinRewards,
  ...gemRewards,
  ...experienceRewards,
  ...recognitionRewards,
]

export default rewardableEventRewardMockData
