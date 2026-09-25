import {
  ScholarshipVariant,
  CoinVariant,
  GemVariant,
  ExperienceVariant,
  RecognitionVariant,
  LotteryTicketsVariant,
  EssenceVariant,
  GameEquipmentVariant,
  GameItemVariant,
  GameConsumablesVariant,
  GameTitleVariant,
  NftVariant,
  SponsorshipRewardVariantTypes,
  TeacherVariant,
  SchoolVariant,
} from "./variantTypes"

export interface Classification {
  category: string
  variant: string | { type: string; value: string }
  productAttributes: string[] // later
}

export interface ScholarshipClassification extends Classification {
  category: "scholarship"
  variant: ScholarshipVariant
  productAttributes: string[]
}

type SponsorshipVariant<T extends keyof SponsorshipRewardVariantTypes> = {
  type: T
  value: SponsorshipRewardVariantTypes[T]
}
export interface SponsorshipClassification extends Classification {
  category: "sponsorship"
  variant: SponsorshipVariant<keyof SponsorshipRewardVariantTypes>
  productAttributes: string[]
}

export interface CoinClassification extends Classification {
  category: "coins"
  variant: CoinVariant
  productAttributes: string[]
}

export interface GemClassification extends Classification {
  category: "gems"
  variant: GemVariant
  productAttributes: string[]
}

export interface ExperienceClassification extends Classification {
  category: "experience"
  variant: ExperienceVariant
  productAttributes: string[]
}

export interface RecognitionClassification extends Classification {
  category: "recognition"
  variant: RecognitionVariant // may need reworked?
  productAttributes: string[]
}

export interface LotteryTicketsClassification extends Classification {
  category: "lotteryTickets"
  variant: LotteryTicketsVariant
  productAttributes: string[]
}

export interface GameEssenceClassification extends Classification {
  category: "gameEssence"
  variant: EssenceVariant
  productAttributes: string[]
}

export interface GameEquipmentClassification extends Classification {
  category: "gameEquipment"
  variant: GameEquipmentVariant
  productAttributes: string[]
}

export interface GameItemClassification extends Classification {
  category: "gameItem"
  variant: GameItemVariant
  productAttributes: string[]
}

export interface GameConsumablesClassification extends Classification {
  category: "gameConsumables"
  variant: GameConsumablesVariant
  productAttributes: string[]
}

export interface GameTitleClassification extends Classification {
  category: "gameTitle"
  variant: GameTitleVariant
  productAttributes: string[]
}

export interface NftClassification extends Classification {
  category: "nft"
  variant: NftVariant
  productAttributes: string[]
}

export interface TeacherClassification extends Classification {
  category: "teacher"
  variant: TeacherVariant
  productAttributes: string[]
}

export interface SchoolClassification extends Classification {
  category: "school"
  variant: SchoolVariant
  productAttributes: string[]
}
export interface FamilyClassification extends Classification {
  category: "family"
  variant: SchoolVariant
  productAttributes: string[]
}
