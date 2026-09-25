export type PhysicalItemVariant =
  | "schoolSupplies"
  | "toy"
  | "tshirt"
  | "mug"
  | "backpack"
export type GiftCardVariant = "standard"
export type FreeMealVariant = "pizza" | "burger"
export type TicketVariant =
  | "event"
  | "activity"
  | "zoo"
  | "amusementPark"
  | "concert"
export type SubscriptionVariant =
  | "standard"
  | "edu"
  | "game"
  | "entertainment"
  | "other"
export type ExternalGameVariant = "gameSkin" | "other"
export type ScholarshipVariant = "standard"
export type CoinVariant = "xcoins"
export type GemVariant = "xgems" | "diamonds" | "rubys" | "emeralds"
export type ExperienceVariant = "amount"
export type RecognitionVariant = "animation" | "text" | "badge" | "certificate"
export type LotteryTicketsVariant = "weeklyLottery" | "monthlyLottery"
export type EssenceVariant = "fire" | "water" | "scholarship"
export type GameEquipmentVariant = "sword" | "shield"
export type GameItemVariant = "potion" | "scroll"
export type GameConsumablesVariant = "food" | "drink"
export type GameTitleVariant = "default"
export type NftVariant = "default"
export type TeacherVariant = "default"
export type SchoolVariant = "default"
export type ExpanseFoodVariant =
  | "cookie"
  | "cake"
  | "wings"
  | "pizza"
  | "snack"
  | "candy"
  | "candyBar"
export type ExpansePhysicalItemVariant = "toy" | "schoolSupplies"

export type SponsorshipRewardVariantTypes = {
  physicalItem: PhysicalItemVariant
  giftCard: GiftCardVariant
  freeMeal: FreeMealVariant
  ticket: TicketVariant
  subscription: SubscriptionVariant
  externalGame: ExternalGameVariant
  expanseFood: ExpanseFoodVariant
  expansePhysicalItem: ExpansePhysicalItemVariant
}
