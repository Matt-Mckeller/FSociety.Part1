import { Timestamped } from "."

export interface GameRewardEvent extends Timestamped {
  value: number
  type: "reward"
  userId: string
  rewardableEventId: string
  redeemedRewardsId: string
}
