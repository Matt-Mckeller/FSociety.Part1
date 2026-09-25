export * from "./rewardTypes"
export * from "./classificationTypes"
export * from "./variantTypes"
export * from "./gameInterfaces"
export * from "./schoolTypes"

// export enum GameRole {
//   Knight = 'knight',
//   Wizard = 'wizard'
// }
export enum Currency {
  USD = "usd",
  AUD = "aud",
  CAD = "cad",
}

export enum Rarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

// Estimated complexity levels for ticket points
export enum REWARD_POINT_VALUES {
  ONE_POINT = 1,
  TWO_POINTS = 4,
  THREE_POINTS = 8,
  FIVE_POINTS = 16,
  NINE_POINTS = 45,
  EIGHTEEN_POINTS = 95,
  EIGHTY_ONE_POINTS = Infinity,
}

// Ticket point options
export enum REWARD_POINT_OPTIONS {
  ONE_POINT = 1,
  TWO_POINTS = 2,
  THREE_POINTS = 3,
  FIVE_POINTS = 5,
  NINE_POINTS = 9,
  EIGHTEEN_POINTS = 18,
  EIGHTY_ONE_POINTS = 81,
}

// List of ticket point options
export const REWARD_POINT_OPTIONS_LIST = [
  REWARD_POINT_OPTIONS.ONE_POINT,
  REWARD_POINT_OPTIONS.TWO_POINTS,
  REWARD_POINT_OPTIONS.THREE_POINTS,
  REWARD_POINT_OPTIONS.FIVE_POINTS,
  REWARD_POINT_OPTIONS.NINE_POINTS,
  REWARD_POINT_OPTIONS.EIGHTEEN_POINTS,
  REWARD_POINT_OPTIONS.EIGHTY_ONE_POINTS,
]
export const REWARD_POINT_OPTIONS_MAP = {
  [REWARD_POINT_OPTIONS.ONE_POINT]: REWARD_POINT_VALUES.ONE_POINT,
  [REWARD_POINT_OPTIONS.TWO_POINTS]: REWARD_POINT_VALUES.TWO_POINTS,
  [REWARD_POINT_OPTIONS.THREE_POINTS]: REWARD_POINT_VALUES.THREE_POINTS,
  [REWARD_POINT_OPTIONS.FIVE_POINTS]: REWARD_POINT_VALUES.FIVE_POINTS,
  [REWARD_POINT_OPTIONS.NINE_POINTS]: REWARD_POINT_VALUES.NINE_POINTS,
  [REWARD_POINT_OPTIONS.EIGHTEEN_POINTS]: REWARD_POINT_VALUES.EIGHTEEN_POINTS,
  [REWARD_POINT_OPTIONS.EIGHTY_ONE_POINTS]:
    REWARD_POINT_VALUES.EIGHTY_ONE_POINTS,
}

export enum AcademicStage {
  // Need to figure out how to handle a global audience and have further refinement here
  ALL = "all",
  HIGHER_EDUCATION = "higherEducation",
  SECONDARY = "secondary",
  PRIMARY = "primary",
}

export type Level = number

export interface Timestamped {
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type EventFilters = {
  eventType?: string
  dateFrom?: string
  dateTo?: string
  rewardStatus?: "rewarded" | "pending"
}
