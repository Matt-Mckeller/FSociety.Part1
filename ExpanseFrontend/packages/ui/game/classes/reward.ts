import {
  Currency,
  LootBoxRewardClassifications,
  Rarity,
  RewardableEventRewardClassification,
  RewardInterface,
} from "../types"

// todo some of this will be moved to the backend
export type RewardType = RewardInterface<
  RewardableEventRewardClassification | LootBoxRewardClassifications
>

export class Reward implements RewardType {
  id?: string
  value?: number | string // may not apply to all? or may be a unique coupon id
  classification:
    | RewardableEventRewardClassification
    | LootBoxRewardClassifications
  uniqueRewardId: string // if there is a unique association with this reward, i.e. one time sponsorship rewards
  currency?: Currency
  dictionaryIndex: string // where to find the text for the item in the dictionary, may need backend dictionary when scaling for versioning
  rarity?: Rarity
  tags?: string[] // later
  quantity?: number | undefined
  isTradeable: boolean

  constructor({
    id = crypto.randomUUID(),
    value = 0,
    quantity = 1,
    classification = {
      category: "coins",
      variant: "xcoins",
      productAttributes: [],
    },
    uniqueRewardId = "",
    currency = undefined,
    dictionaryIndex = "",
    rarity = Rarity.COMMON,
    tags = [],
    isTradeable = false,
  }: Partial<RewardType> = {}) {
    this.id = id
    this.value = value
    this.quantity = quantity
    this.classification = classification
    this.uniqueRewardId = uniqueRewardId
    this.currency = currency
    this.dictionaryIndex = dictionaryIndex
    this.rarity = rarity
    this.tags = tags
    this.isTradeable = isTradeable
  }

  static generateFake(): RewardType {
    return new Reward({
      id: crypto.randomUUID(),
      value: 100,
      classification: {
        category: "coins",
        variant: "xcoins",
        productAttributes: [],
      },
      uniqueRewardId: crypto.randomUUID(),
      currency: Currency.USD,
      dictionaryIndex: "fake-dictionary-index",
      rarity: Rarity.COMMON,
      tags: ["fake-tag"],
      isTradeable: true,
    })
  }

  toJson(): any {
    return {
      id: this.id,
      value: this.value,
      quantity: this.quantity,
      classification: this.classification,
      uniqueRewardId: this.uniqueRewardId,
      currency: this.currency,
      dictionaryIndex: this.dictionaryIndex,
      rarity: this.rarity,
      tags: this.tags,
      isTradeable: this.isTradeable,
    }
  }
}
