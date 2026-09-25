import {
  AcademicStage,
  Classification,
  ClassInterface,
  Currency,
  Rarity,
  REWARD_POINT_OPTIONS,
  PersonInterface,
  Timestamped,
} from "."
import {
  InventoryItemClassifications,
  LootBoxRewardClassifications,
  RewardableEventRewardClassification,
} from "./rewardTypes"
import {
  CoinVariant,
  GemVariant,
  EssenceVariant,
  LotteryTicketsVariant,
} from "./variantTypes"

export interface CoinInterface {
  coinId: string
  quantity: number
  name: string
  coinIconText: string
  schoolId: string
  classId: string
  courseId?: string
}

interface WalletInterface {
  coins: { [key in CoinVariant]?: number }
  gems: { [key in GemVariant]?: number }
  essences: { [key in EssenceVariant]?: number }
  tickets: { [key in LotteryTicketsVariant]?: number }
}
export interface RedeemedEventRewardsInterface {
  id: string
  userId?: string
  lootBoxes: LootBoxInterface[]
  experienceIncrease: number
  walletIncrease: WalletInterface
}

export interface InventoryItemInterface
  extends RewardInterface<InventoryItemClassifications>,
    Timestamped {}

export interface LootBoxInterface extends Timestamped {
  id: string
  status: "opened" | "new"
  openedAt?: string // timestamp
  rewards?: RewardInterface<LootBoxRewardClassifications>[]
}

export interface ExperienceInterface {
  userId?: string
  currentExperience: number
  totalExperience: number
}

export interface ExperienceContextInterface {
  currentLevel: number
  currentLevelExperience: number
  totalExperienceForCurrentLevel: number
  totalExperienceEarned: number
  previousLevel: number
  nextLevel: number
  experiencePercentage: number
  // experienceEventHistory: ExperienceEvent[]
  addManualExperience: (amount: number) => void // temporary for demo purposes
}

export interface RewardableEventInterface {
  id?: string
  userId: string
  type: "assignment" | "graduation" | "teacherRecognition" | "attendance"
  timestamp: string
  status:
    | "NOT_READY" // This reward is not yet ready to be claimed, i.e. the assignment may not be submitted yet
    | "PROCESSING" // This reward is currently being processed
    | "CLAIMABLE" // This reward is ready to be claimed
    | "CLAIMED" // This reward has been claimed
  // | "REOPENED"
  studentElId: string
  // revision: boolean
  // rewards?: RewardInterface<RewardableEventRewardClassification>[]
  assignmentId?: string
  submissionId?: string
  // graduationId?: string
  // teacherRecognitionId?: string
  // attendanceTimeframeId?: string
}

export interface RedeemedEventRewardsInterface {
  userId?: string
  gameEventId?: string
  lootBoxes: LootBoxInterface[]
  experienceIncrease: number
  walletIncrease: WalletInterface
}

export interface RewardInterface<T extends Classification> {
  id?: string
  userId?: string
  redeemedRewardsId?: string
  value?: number | string // may not apply to all? or may be a unique coupon id
  quantity?: number
  category?: string // cutting corners to match backend, needs to be moved to classification on backend and this index removed, or vise versa but typing
  variant?: string // cutting corners to match backend, needs to be moved to classification on backend and this index removed, or vise versa but typing
  classification: T
  uniqueRewardId: string // if there is a unique association with this reward, i.e. one time sponsorship rewards
  currency?: Currency
  dictionaryIndex: string // where to find the text for the item in the dictionary, may need backend dictionary when scaling for versioning
  description?: string
  name?: string
  cost?: REWARD_POINT_OPTIONS
  maxPurchaseQuantity?: number
  // universityNameIndex?: string // can be nested in the dictionary
  rarity?: Rarity
  tags?: string[] // later
  isTradeable: boolean
  classStoreId?: string
  coinId?: string
  classStore?: ClassInterface
  coin?: CoinInterface

  // academicStage?: AcademicStage
  // asset data is found in the dictionary entry
}

export interface Equipment {}
export interface Consumables {}
export interface Item {}
export interface Nft {}
