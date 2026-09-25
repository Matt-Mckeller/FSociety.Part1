import {
  CoinClassification,
  GemClassification,
  ExperienceClassification,
  RecognitionClassification,
  LotteryTicketsClassification,
  GameEssenceClassification,
  GameEquipmentClassification,
  GameItemClassification,
  GameConsumablesClassification,
  GameTitleClassification,
  NftClassification,
  ScholarshipClassification,
  SponsorshipClassification,
  TeacherClassification,
  SchoolClassification,
} from "./classificationTypes"

export type RewardableEventRewardClassification =
  | CoinClassification
  | GemClassification
  | ExperienceClassification
  | RecognitionClassification

export type LootBoxRewardTypes =
  | "scholarship"
  | "coins"
  | "gems"
  | "experience"
  | "recognition"
  | "lotteryTicket"
  | "gameEssence"
  | "gameEquipment"
  | "gameItem"
  | "gameConsumable"
  | "gameTitle"
  | "nft"

export type WalletClassifications =
  | CoinClassification
  | GemClassification
  | LotteryTicketsClassification
  | GameEssenceClassification

export type LootBoxRewardClassifications =
  | ScholarshipClassification
  | SponsorshipClassification
  | CoinClassification
  | GemClassification
  | ExperienceClassification
  //   | RecognitionClassification
  | LotteryTicketsClassification
  | GameEssenceClassification
  | GameEquipmentClassification
  | GameItemClassification
  | GameConsumablesClassification
  | GameTitleClassification
  | NftClassification

export type InventoryItemClassifications =
  | TeacherClassification
  | SchoolClassification
  | ScholarshipClassification
  | SponsorshipClassification
  | LotteryTicketsClassification
  | GameEssenceClassification
  | GameEquipmentClassification
  | GameItemClassification
  | GameConsumablesClassification
  | GameTitleClassification
  | NftClassification
