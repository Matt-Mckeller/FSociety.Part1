import {
  InventoryItemClassifications,
  LootBoxInterface,
  LootBoxRewardClassifications,
  Rarity,
  RewardableEventRewardInterface,
  RewardInterface,
} from "../types"
import { Reward } from "./reward"
import { Scholarship } from "./scholarship"

// todo some of this will be moved to the backend
export class LootBox implements LootBoxInterface {
  id: string
  status: "opened" | "new"
  openedAt?: string // timestamp
  rewards?: RewardInterface<LootBoxRewardClassifications>[]
  createdAt: string
  updatedAt: string
  deletedAt?: string

  constructor({
    id = crypto.randomUUID(),
    status = "new",
    openedAt = undefined,
    rewards = [],
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    deletedAt = undefined,
  }: Partial<LootBoxInterface> = {}) {
    this.id = id
    this.status = status
    this.openedAt = openedAt
    this.rewards = []
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  toJson(): LootBoxInterface {
    return {
      id: this.id,
      status: this.status,
      openedAt: this.openedAt,
      rewards: this.rewards,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }

  static generateFake(): LootBoxInterface {
    return {
      id: crypto.randomUUID(),
      status: "new",
      openedAt: undefined,
      rewards: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: undefined,
    }
  }
}
